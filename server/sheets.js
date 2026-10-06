// Google Sheets push for the lead-capture modal — no credentials at all.
// A Google Apps Script web app owns the sheet access; we just POST JSON to it.
// Env vars are read lazily (at call time) so dotenv.config() in index.js
// has already run by then.
const WEBHOOK_TIMEOUT_MS = 10000;

export async function appendLeadRow(lead) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    throw new Error('GOOGLE_SHEET_WEBHOOK_URL is not set (see server/.env.example).');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Webhook responded ${res.status}: ${text.slice(0, 300)}`);
  }
}
