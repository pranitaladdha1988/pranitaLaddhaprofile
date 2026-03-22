const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');

exports.handler = async (event, context) => {
  const { httpMethod, body, queryStringParameters, headers } = event;

  // Configuration - Dynamic Site URL
  const host = headers['x-forwarded-host'] || headers.host || 'pranitaladdhaprofile.netlify.app';
  const protocol = headers['x-forwarded-proto'] || 'https';
  const SITE_URL = process.env.URL || `${protocol}://${host}`;
  const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_placeholder';
  const JWT_SECRET = process.env.JWT_SECRET || 'resume_secret_123';

  const resend = new Resend(RESEND_API_KEY);

  // 1. INITIAL LEAD SUBMISSION (POST)
  // Generates verification email
  if (httpMethod === 'POST') {
    try {
      const { name, email, company } = JSON.parse(body);
      
      if (!email) return { statusCode: 400, body: "Email required" };

      // Create a Verification Token (JWT) - valid for 1 hour
      const verificationToken = jwt.sign(
        { email, name, company: company || 'N/A', action: 'verify_resume' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const verifyLink = `${SITE_URL}/api/resume?verify=${verificationToken}`;

      // Send Verification Email
      // Note: In development/without key, this will log to console instead of failing
      if (RESEND_API_KEY !== 're_placeholder') {
        await resend.emails.send({
          from: 'Resume <onboarding@resend.dev>', // Use verified domain in prod
          to: email,
          subject: 'Verify your email to download Pranita\'s Resume',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
              <h2 style="font-weight: 300; letter-spacing: -1px;">Pranita Laddha resume</h2>
              <p style="margin: 30px 0; line-height: 1.6;">Hello ${name},</p>
              <p style="line-height: 1.6;">Thank you for your interest in my portfolio. To complete your resume download, please click the button below to verify your email address.</p>
              <a href="${verifyLink}" style="display: inline-block; background: #000; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 2px; margin: 20px 0;">VERIFY & DOWNLOAD</a>
              <p style="font-size: 12px; color: #666; margin-top: 40px;">If the button doesn't work, copy this link: <br/> ${verifyLink}</p>
            </div>
          `
        });
      } else {
        console.log("MOCK EMAIL SENT TO:", email);
        console.log("VERIFY LINK:", verifyLink);
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "Verification email sent" })
      };
    } catch (error) {
      console.error("Resend Error:", error);
      return { 
        statusCode: 500, 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: error.message || "Failed to process request" }) 
      };
    }
  }

  // 2. VERIFICATION & DOWNLOAD (GET)
  if (httpMethod === 'GET') {
    const { verify, token } = queryStringParameters;

    // A. Handling the Verification Link Click (backward compatibility with verify param if needed)
    const verificationToken = verify || token;
    
    // If it's a verification request (we can check the JWT purpose or just rely on the verify param)
    if (verify || (token && !event.path.includes('download'))) {
      try {
        const decoded = jwt.verify(verificationToken, JWT_SECRET);
        
        // Mark as verified and store in Netlify Forms
        try {
          await fetch(SITE_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              "form-name": "resume-leads",
              "name": decoded.name,
              "email": decoded.email,
              "company": decoded.company,
              "status": "verified"
            }).toString()
          });
        } catch (err) {
          console.error("Form submission failed:", err);
        }

        // Redirect to actual download
        return {
          statusCode: 302,
          headers: { Location: `${SITE_URL}/api/resume?token=${verificationToken}&download=true` }
        };
      } catch (err) {
        return { statusCode: 403, body: "Invalid or expired verification link" };
      }
    }

    // B. Handling the Actual File Serving
    if (token && queryStringParameters.download === 'true') {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const filePath = path.join(__dirname, 'resume.pdf');
        const fileBuffer = fs.readFileSync(filePath);

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Pranita_Laddha_Resume.pdf"'
          },
          body: fileBuffer.toString('base64'),
          isBase64Encoded: true
        };
      } catch (err) {
        return { statusCode: 403, body: "Download session expired or invalid" };
      }
    }

    return { statusCode: 400, body: "Missing parameters" };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
