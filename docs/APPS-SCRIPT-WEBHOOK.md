# Apps Script Webhook — how the forms reach the Google Sheet

Both site forms (community signup + consulting leads) write to a Google Sheet
through a Google Apps Script Web App. This doc is the one place that explains
how it's wired and the one gotcha that will silently break it.

## The flow

```
Form on site → Next.js API route (/api/community or /api/lead)
             → SHEET_WEBHOOK_URL (Apps Script Web App)
             → appends a row to the Community or Leads tab
```

- Script source lives in [`../google-apps-script/Code.gs`](../google-apps-script/Code.gs).
- Server-side write logic is in [`../lib/sheets.ts`](../lib/sheets.ts).
- The URL is stored as the `SHEET_WEBHOOK_URL` environment variable.

## ⚠️ THE GOTCHA: redeploying the script changes the URL

**The Web App URL is tied to a specific deployment. If you redeploy the Apps
Script, the URL changes — and forms will silently stop saving until you update
`SHEET_WEBHOOK_URL` in BOTH places:**

1. **Local:** `.env.local` in the project root — then restart `npm run dev`.
2. **Vercel:** Project → Settings → Environment Variables — then redeploy.

If you forget, submissions fail with "Couldn't save your signup. Try again in
a minute." and nothing reaches the Sheet.

### How to avoid changing the URL at all

When you edit the script, you do NOT have to create a *new* deployment. Instead
update the existing one, which keeps the same URL:

- Apps Script editor → **Deploy → Manage deployments**
- Click the pencil (edit) on the active deployment
- **Version → New version** → **Deploy**

That publishes your changes under the same URL, so nothing downstream breaks.
Only "New deployment" mints a new URL.

## Current deployment

- `SHEET_WEBHOOK_URL` is set in `.env.local` (verified working 2026-07-21).
- Not yet set in Vercel — there's no Vercel project yet. Add it when you import
  the repo, or prod forms will fail.

## Deployment settings that must stay put

- **Execute as:** Me
- **Who has access:** Anyone (required — the site's server calls it
  unauthenticated). The endpoint only appends rows and holds no secrets.
- Use the URL ending in **`/exec`**, never `/dev` (the `/dev` URL only works
  while you're logged into your own Google account and fails from the server).

## Quick health check (no test row written)

Send a junk `formType` — the script replies without appending anything:

```bash
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"formType":"__ping__"}' "$SHEET_WEBHOOK_URL"
# → {"ok":false,"error":"Unknown formType"}  ← reachable and running
```
