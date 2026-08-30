# DeCircle Solar — React Website

A pixel-faithful React conversion of the original DeCircle Solar static HTML site, with a working contact form that emails **care@decirclesolar.com** via **Brevo** (formerly Sendinblue).

The project has two parts:

- **`/` (root)** — the React + Vite frontend (all original design, layout, copy and CSS preserved exactly).
- **`/server`** — a small, hardened Node/Express API that receives contact-form submissions and sends them through Brevo's transactional email API. Your Brevo API key **never** reaches the browser.

Rollout plan: this codebase is built to go live in two stages —

1. **Staging** — `https://website-staging.decirclesolar.com/`
2. **Production** — `https://decirclesolar.com/`

Everything below (ports, env files, CORS) is set up so the same code deploys to both with only the environment file swapped.

## Ports

All local/dev ports for this project are **6000 and above**, per hosting policy:

| Service | Port |
|---|---|
| Frontend dev server (`npm run dev`) | `6173` |
| Frontend preview server (`npm run preview`) | `6174` |
| Backend API (`server/`) | `6100` (configurable via `PORT` in `server/.env`) |

These are set in `vite.config.js` (frontend) and default in `server/index.js` (backend, overridable via the `PORT` env var). If a host platform assigns its own port (some PaaS providers inject `PORT` at runtime), the backend will still respect that — the `6100` default only applies when nothing else sets it.

## 1. Frontend setup (local development)

```bash
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:6173`. `VITE_API_BASE_URL` in `.env` should point at wherever the backend runs locally (`http://localhost:6100`).

## 2. Backend setup (contact form → Brevo)

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

- `BREVO_API_KEY` — create one at [Brevo → SMTP & API → API Keys](https://app.brevo.com/settings/keys/api).
- `CONTACT_FROM_EMAIL` — the "from" address. **This must be a sender you've verified in Brevo** (Brevo → Senders, Domains & Dedicated IPs), otherwise sends will be rejected. Using a `no-reply@decirclesolar.com` address with the domain verified (SPF/DKIM) is recommended over a free-mail address for deliverability.
- `CONTACT_TO_EMAIL` — defaults to `care@decirclesolar.com`.
- `ALLOWED_ORIGINS` — comma-separated list of the exact frontend origins allowed to call this API. Set this per environment (see the staging/production sections below) — do not list unrelated environments together.
- `PORT` — defaults to `6100`.

Run it:

```bash
npm start
```

The API exposes:

- `GET /api/health` — liveness check.
- `POST /api/contact` — accepts `{ name, email, phone, enquiry, message }`, validates everything server-side, and sends the notification email via Brevo with the visitor's address set as `replyTo` (so hitting "Reply" in your inbox goes straight to them).

## 3. Security measures already built in

- **Secrets stay server-side.** The Brevo key lives only in `server/.env`, which is git-ignored.
- **Server-side validation.** Every field is re-validated on the backend (name length, real email format, phone characters, enquiry type is restricted to a fixed allow-list, message length capped) — client-side checks are only a UX convenience and are never trusted alone.
- **Output escaping.** All user input is HTML-escaped before being placed into the outgoing email body, preventing HTML/script injection into the email you receive.
- **Rate limiting.** Each IP is limited to 8 contact submissions per 15 minutes, blunting spam floods and scripted abuse.
- **CORS allow-list.** Only the origins you list in `ALLOWED_ORIGINS` may call the API — set separately per environment so staging and production don't trust each other's origin.
- **Honeypot field.** A hidden `company_website` field traps simple bots; submissions that fill it are silently discarded without an email being sent.
- **Security headers.** `helmet` sets standard hardening headers (`X-Content-Type-Options`, etc.) on every API response.
- **Request size limits.** JSON bodies are capped at 20 KB to prevent oversized-payload abuse.
- **No inline secrets in the frontend.** `.env` / `.env.*` files are git-ignored everywhere except the checked-in `.env*.example` templates.

### Recommended for production hardening (beyond this codebase)

- Serve the frontend over HTTPS only, and run the API behind HTTPS too (a reverse proxy like Nginx/Caddy with a TLS cert, or a platform that terminates TLS for you).
- Add a CAPTCHA (e.g. Cloudflare Turnstile or hCaptcha) if spam volume grows beyond what the honeypot + rate limit stop.
- Rotate the Brevo API key periodically and scope it to "transactional email send" only if Brevo's key permissions allow it.

## 4. Design fidelity

Every section (header/nav, hero, marquee, about, platform pillars, flywheel, leadership glance, team grid with expandable cards, audience row, contact + offices, footer) was translated 1:1 from the original HTML/CSS into React components under `src/components/`, reusing the **exact same CSS** (`src/index.css`, copied from the original `<style>` block, byte-for-byte for every existing rule). No visual styles were changed. All original interactive behavior — mobile burger menu, team card expand/collapse, CTA chip pre-filling the enquiry dropdown and scrolling to the contact section — is reimplemented with React state instead of vanilla DOM scripting, producing the same effect.

A small number of **additive-only** mobile breakpoints (`max-width: 480px` and `380px`) were appended at the end of `index.css` to further improve small-phone layouts (spacing, grid columns, font sizes) — these only apply below the original site's smallest breakpoint and do not alter any existing rule or the tablet/desktop experience.

## 5. Mobile / tablet responsiveness

The original CSS already included breakpoints at `980px` (tablet — collapses nav into a hamburger menu, single/two-column grids) and `600px` (mobile). This conversion preserves those exactly and adds extra rules at `480px`/`380px` for very small phones. Verified visually at 1440px (desktop), 820px (tablet), and 390px (mobile) viewports.

## 6. Deployment: staging first, then production

The same build, run the same way, on two different domains. Deploy to staging, verify everything (especially the contact form actually delivering email), then repeat the same steps for production.

### 6.1 One-time Brevo setup (do this before staging)

1. In Brevo, verify the sending domain `decirclesolar.com` (SPF + DKIM records) so mail from `no-reply@decirclesolar.com` has good deliverability instead of landing in spam.
2. Create an API key under **SMTP & API → API Keys**. Keep it secret — it goes only into `server/.env` on the server, never into git, never into the frontend.
3. Decide whether staging and production share one Brevo account/key or use separate keys. Separate keys are recommended so a staging misconfiguration can't affect production sending limits or reputation.

### 6.2 Staging deployment — `https://website-staging.decirclesolar.com/`

**Frontend:**

```bash
cp .env.staging.example .env.staging
# edit .env.staging: set VITE_API_BASE_URL to where the staging API will live
npm install
npm run build -- --mode staging
```

This produces `dist/` built against the staging API URL. Deploy `dist/` to whatever serves `website-staging.decirclesolar.com` (static hosting, Nginx, etc.).

**Backend:**

```bash
cd server
cp .env.staging.example .env
# edit .env: fill in the real BREVO_API_KEY, set CONTACT_FROM_EMAIL,
# confirm ALLOWED_ORIGINS=https://website-staging.decirclesolar.com
npm install --omit=dev
pm2 start ecosystem.config.cjs --env staging
```

Point your reverse proxy so that requests to `https://website-staging.decirclesolar.com/api/*` forward to `http://localhost:6100/api/*` (or wherever `PORT` is set), and requests to everything else serve the built frontend from `dist/`. (See the sample Nginx config in section 6.4.)

**Verify on staging before moving on:**

- Load the site on desktop, tablet, and phone widths — confirm it looks identical to the original design.
- Submit the contact form with a real email address and confirm `care@decirclesolar.com` receives it, and that replying reaches the visitor's address.
- Check `https://website-staging.decirclesolar.com/api/health` returns `{"status":"ok"}`.
- Try submitting the form more than 8 times quickly to confirm rate limiting kicks in (you should see a "Too many requests" message).

### 6.3 Production deployment — `https://decirclesolar.com/`

Once staging is verified, repeat the same steps with the production files:

**Frontend:**

```bash
cp .env.production.example .env.production
# edit .env.production: set VITE_API_BASE_URL to where the production API will live
npm run build
```

(`npm run build` uses Vite's default "production" mode automatically, which picks up `.env.production`.) Deploy the resulting `dist/` to whatever serves `decirclesolar.com`.

**Backend:**

```bash
cd server
cp .env.production.example .env
# edit .env: fill in the real BREVO_API_KEY (production key if using separate
# keys), set CONTACT_FROM_EMAIL, confirm
# ALLOWED_ORIGINS=https://decirclesolar.com,https://www.decirclesolar.com
npm install --omit=dev
pm2 start ecosystem.config.cjs --env production
```

If staging and production run on the same physical host, give the production backend a different `PORT` (e.g. `6101`) than staging (`6100`) so they don't collide, and update the reverse-proxy rule accordingly.

### 6.4 Sample Nginx reverse-proxy config (per domain)

Use one server block per domain (staging and production each get their own, pointing at their own `dist/` folder and their own backend port):

```nginx
server {
    listen 443 ssl http2;
    server_name website-staging.decirclesolar.com;

    # ssl_certificate / ssl_certificate_key here (e.g. via certbot)

    root /var/www/decircle-staging/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:6100/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri /index.html;
    }
}
```

Duplicate this block for `decirclesolar.com` / `www.decirclesolar.com`, pointing `root` at the production `dist/` folder and `proxy_pass` at the production backend's port.

### 6.5 Post-cutover checklist (when moving from staging to production)

- Confirm DNS for `decirclesolar.com` points at the production server/host.
- Confirm the SSL certificate covers `decirclesolar.com` and `www.decirclesolar.com`.
- Confirm production `server/.env` has `ALLOWED_ORIGINS` set to the production domain(s) only — not staging's.
- Send one final test enquiry on production and confirm delivery to `care@decirclesolar.com`.
- Consider disabling or restricting public access to the staging URL once production is live, so it isn't indexed or mistaken for the real site.
