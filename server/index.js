// Support running multiple environments (staging, production) from the same
// checkout on one host: each PM2 app sets ENV_FILE to point at its own env
// file (e.g. .env.staging / .env.production) so they never share a port,
// origin allow-list, or Brevo key. Falls back to the plain .env for local dev.
import dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_FILE || '.env' });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import validator from 'validator';

const {
  BREVO_API_KEY,
  CONTACT_TO_EMAIL = 'care@decirclesolar.com',
  CONTACT_FROM_EMAIL,
  CONTACT_FROM_NAME = 'DeCircle Solar Website',
  ALLOWED_ORIGINS = '',
  PORT = 6100,
} = process.env;

if (!BREVO_API_KEY) {
  console.error(
    'FATAL: BREVO_API_KEY is not set. Create a .env file (see .env.example) with your Brevo API key.'
  );
  process.exit(1);
}

if (!CONTACT_FROM_EMAIL) {
  console.error(
    'FATAL: CONTACT_FROM_EMAIL is not set. This must be a sender verified in your Brevo account.'
  );
  process.exit(1);
}

const app = express();

// Trust the first proxy hop (needed for correct client IPs / rate limiting behind
// a reverse proxy such as Nginx, Render, Railway, etc.) — adjust if your
// deployment topology differs.
app.set('trust proxy', 1);

// --- Security headers ---
app.use(
  helmet({
    contentSecurityPolicy: false, // the API serves JSON only, not HTML
  })
);

// --- CORS: only allow the configured origin(s) to call this API ---
const allowedOrigins = ALLOWED_ORIGINS.split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow same-origin / server-to-server requests (no Origin header)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['POST', 'GET', 'OPTIONS'],
  })
);

// --- Body parsing with a strict size limit (defense against huge payloads) ---
app.use(express.json({ limit: '20kb' }));

// --- Rate limiting: protects the email endpoint from abuse / spam floods ---
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // max 8 submissions per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const ENQUIRY_OPTIONS = new Set([
  'Solar Project Development',
  'Project Finance',
  'Asset Sale / Acquisition',
  'EPC / Execution Partnership',
  'Investment Opportunity',
  'Strategic Partnership',
  'Other',
]);

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot: bots that fill hidden fields are silently dropped
    if (body.company_website) {
      return res.json({ success: true });
    }

    const name = validator.trim(String(body.name || ''));
    const email = validator.trim(String(body.email || ''));
    const phone = validator.trim(String(body.phone || ''));
    const enquiry = validator.trim(String(body.enquiry || ''));
    const message = validator.trim(String(body.message || ''));

    // --- Server-side validation (never trust the client) ---
    if (!name || name.length < 2 || name.length > 120) {
      return res.status(400).json({ error: 'Please provide a valid name.' });
    }
    if (!email || !validator.isEmail(email) || email.length > 180) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (phone && (!validator.isLength(phone, { max: 30 }) || !/^[0-9+\-\s()]*$/.test(phone))) {
      return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }
    if (!enquiry || !ENQUIRY_OPTIONS.has(enquiry)) {
      return res.status(400).json({ error: 'Please select a valid enquiry type.' });
    }
    if (message && message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long.' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || '—');
    const safeEnquiry = escapeHtml(enquiry);
    const safeMessage = escapeHtml(message || '—').replace(/\n/g, '<br>');

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;font-size:15px;color:#0A1B38;line-height:1.6;">
        <h2 style="color:#0A1B38;">New enquiry from decirclesolar.com</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
          <tr><td style="font-weight:bold;">Name</td><td>${safeName}</td></tr>
          <tr><td style="font-weight:bold;">Email</td><td>${safeEmail}</td></tr>
          <tr><td style="font-weight:bold;">Phone</td><td>${safePhone}</td></tr>
          <tr><td style="font-weight:bold;">Enquiry Type</td><td>${safeEnquiry}</td></tr>
          <tr><td style="font-weight:bold;vertical-align:top;">Message</td><td>${safeMessage}</td></tr>
        </table>
      </div>
    `;

    const brevoPayload = {
      sender: { name: CONTACT_FROM_NAME, email: CONTACT_FROM_EMAIL },
      to: [{ email: CONTACT_TO_EMAIL }],
      replyTo: { email, name },
      subject: `New website enquiry: ${enquiry} — ${name}`,
      htmlContent,
    };

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text().catch(() => '');
      console.error('Brevo API error:', brevoRes.status, errText);
      return res.status(502).json({
        error: 'We could not send your message right now. Please try again shortly.',
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Unexpected server error. Please try again.' });
  }
});

// Generic error handler (e.g. CORS rejection)
app.use((err, _req, res, _next) => {
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`DeCircle Solar contact API listening on port ${PORT}`);
});
