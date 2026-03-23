// public/_worker.js
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      // Handle /api/resume requests
      if (url.pathname === '/api/resume') {
        const method = request.method;
        const RESEND_API_KEY = env.RESEND_API_KEY || 're_placeholder';
        const JWT_SECRET = env.JWT_SECRET || 'resume_secret_123';
        const SITE_URL = new URL(request.url).origin;

        const resend = new Resend(RESEND_API_KEY);

        // 1. INITIAL LEAD SUBMISSION (POST)
        if (method === 'POST') {
          try {
            console.log("POST /api/resume triggered");
            console.log("RESEND_API_KEY status:", RESEND_API_KEY === 're_placeholder' ? "MISSING" : "FOUND (" + RESEND_API_KEY.substring(0, 5) + "...)");
            
            const { name, email, company } = await request.json();
            if (!email) return new Response("Email required", { status: 400 });

            const verificationToken = jwt.sign(
              { email, name, company: company || 'N/A', action: 'verify_resume' },
              JWT_SECRET,
              { expiresIn: '1h' }
            );

            const verifyLink = `${SITE_URL}/api/resume?verify=${verificationToken}`;

            if (RESEND_API_KEY !== 're_placeholder') {
              console.log("Attempting to send email to", email);
              const resendResponse = await resend.emails.send({
                from: 'Resume <onboarding@resend.dev>',
                to: email,
                subject: 'Verify your email to download Pranita\'s Resume',
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                    <h2 style="font-weight: 300; letter-spacing: -1px;">Pranita Laddha resume</h2>
                    <p style="margin: 30px 0; line-height: 1.6;">Hello ${name},</p>
                    <p style="line-height: 1.6;">Thank you for your interest. Click the link to verify and download.</p>
                    <a href="${verifyLink}" style="display: inline-block; background: #000; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 2px; margin: 20px 0;">VERIFY & DOWNLOAD</a>
                  </div>
                `
              });
              console.log("Resend API response:", JSON.stringify(resendResponse));
            } else {
              console.log("SKIP EMAIL: RESEND_API_KEY is missing/placeholder");
            }

            return new Response(JSON.stringify({ message: "Verification email sent", debug: { apiKeyFound: RESEND_API_KEY !== 're_placeholder' } }), {
              headers: { 'Content-Type': 'application/json' }
            });
          } catch (error) {
            console.error("Resend Error:", error.message);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          }
        }

        // 2. VERIFICATION & DOWNLOAD (GET)
        if (method === 'GET') {
          const verify = url.searchParams.get('verify');
          const token = url.searchParams.get('token');
          const download = url.searchParams.get('download');
          const verificationToken = verify || token;

          if (verify || (token && !download)) {
            try {
              const decoded = jwt.verify(verificationToken, JWT_SECRET);
              if (env.LEADS_KV) {
                await env.LEADS_KV.put(`lead_${decoded.email}_${Date.now()}`, JSON.stringify({
                  ...decoded, timestamp: new Date().toISOString(), status: "verified"
                }));
              }
              return Response.redirect(`${SITE_URL}/api/resume?token=${verificationToken}&download=true`, 302);
            } catch (err) {
              return new Response("Invalid or expired verification link", { status: 403 });
            }
          }

          if (token && download === 'true') {
            try {
              jwt.verify(token, JWT_SECRET);
              return Response.redirect(`${SITE_URL}/resume.pdf`, 302);
            } catch (err) {
              return new Response("Download session expired or invalid", { status: 403 });
            }
          }

          return new Response("Missing parameters", { status: 400 });
        }

        return new Response("Method Not Allowed", { status: 405 });
      }

      // Default: Serve static assets from Cloudflare Pages
      let response = await env.ASSETS.fetch(request);
      
      // SPA Routing: Redirect subpage refreshes to the home page (as requested)
      if (response.status === 404 && !url.pathname.includes('.')) {
        return Response.redirect(`${url.origin}/`, 302);
      }

      return response;
    } catch (e) {
      // Catch all to prevent 1101 Error and provide debug info
      return new Response(`Worker Error: ${e.message}\n${e.stack}`, { status: 500 });
    }
  }
}
