const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Simulated token store (for actual production, use a more persistent method or short-lived JWT)
// Note: Netlify functions are ephemeral, so we'll use a simple time-based validation for this demo
// or just allow valid UUIDs for now since lead capture is already done via Netlify Forms.

exports.handler = async (event, context) => {
  const { path: urlPath, httpMethod, body, queryStringParameters } = event;

  // 1. LEAD CAPTURE (POST)
  if (httpMethod === 'POST') {
    try {
      const data = JSON.parse(body);
      const { name, email, company } = data;

      // Generate a simple token (UUID)
      const token = crypto.randomUUID();

      // IMPORTANT: We forward this to Netlify Forms so it shows up in the dashboard
      // This is the "Local" storage requested by the user
      const formUrl = process.env.URL || 'http://localhost:8888';
      
      // We don't await this to keep the response fast, or we can await for certainty
      try {
        await fetch(formUrl, {
          method: 'POST',
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            "form-name": "resume-leads",
            "name": name,
            "email": email,
            "company": company || 'N/A'
          }).toString()
        });
      } catch (err) {
        console.error("Form submission failed:", err);
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      };
    } catch (error) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };
    }
  }

  // 2. DOWNLOAD (GET)
  if (httpMethod === 'GET') {
    const token = queryStringParameters.token;
    
    if (!token) {
      return { statusCode: 403, body: "Forbidden: Token required" };
    }

    // In a real system, you'd verify the token against a DB.
    // For this migration, we'll allow any valid UUID format to ensure it works on Netlify immediately.
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      return { statusCode: 403, body: "Invalid token" };
    }

    try {
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
      return { statusCode: 500, body: "Error reading file" };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
