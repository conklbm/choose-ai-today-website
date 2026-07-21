# ChooseAIToday.com

Single-page marketing site for the Choose AI Today partnership (Erase Friction
× Pim & Co.) serving the Mobile, AL business community. Grows a community
email list (primary) and captures consulting leads (secondary), both into a
shared Google Sheet.

- **Stack:** Next.js (App Router) · Tailwind CSS v4 · TypeScript
- **Hosting:** Vercel → chooseaitoday.com
- **Forms:** POST to internal API routes → forwarded server-side to a Google
  Apps Script Web App → Google Sheet (two tabs: `Community`, `Leads`)
- **Spec:** see [ChooseAIToday-PRD.md](./ChooseAIToday-PRD.md)
- **Setup steps & launch blockers:** see [SETUP-TODO.md](./SETUP-TODO.md)

## Develop

```bash
npm install
cp .env.example .env.local   # fill in values (forms + analytics stay dormant if empty)
npm run dev
```

## Where things live

| What | Where |
|---|---|
| All copy (incl. Ambassador line + meetup URL) | `lib/copy.ts` |
| Form destination (swappable: Sheet → ESP) | `lib/sheets.ts` |
| API routes | `app/api/community`, `app/api/lead` |
| Apps Script to paste into the Sheet | `google-apps-script/Code.gs` |
| GA4 conversion events | `lib/analytics.ts` |
