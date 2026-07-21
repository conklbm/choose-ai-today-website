# SETUP-TODO — ChooseAIToday.com

Everything the code can't do for you. Work top to bottom.

## 1. Google Sheet + Apps Script (forms don't save until this is done)

1. Create a new Google Sheet named **Choose AI Today — Signups & Leads**.
   - Decide ownership first (PRD §8): it holds the JV's email list and leads.
     Recommend a shared account, or at minimum both partners with edit access.
2. Create two tabs (exact names matter):
   - `Community` — header row: `timestamp | name | email | source`
   - `Leads` — header row: `timestamp | name | email | company | needs | timeline | source`
3. In the Sheet: **Extensions → Apps Script**. Delete the default code and
   paste in the contents of `google-apps-script/Code.gs` from this repo.
4. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the Web App URL (ends in `/exec`).
5. Add it as an env var:
   - Local: create `.env.local` with `SHEET_WEBHOOK_URL=<url>`
   - Vercel: Project → Settings → Environment Variables → `SHEET_WEBHOOK_URL`
6. Test both forms on the live site and confirm rows land in the right tabs.

> Note: the endpoint is publicly reachable by design (Apps Script requirement).
> It only appends rows and holds no secrets. If you ever redeploy the script,
> the URL changes — update the env var.

## 2. GA4

1. Create a GA4 property for chooseaitoday.com → copy the Measurement ID (`G-…`).
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel env vars (and `.env.local`).
3. Conversion events fire automatically on form success:
   `community_signup` and `lead_submit`. Mark both as key events in GA4
   (Admin → Events) so they show as conversions.

## 3. Vercel + domain

1. Import the GitHub repo (`conklbm/choose-ai-today-website`) into Vercel.
2. Add both env vars (above) before or right after first deploy.
3. Add custom domain `chooseaitoday.com` (+ `www` redirect) → follow Vercel's
   DNS instructions at your registrar. SSL is automatic.

## 4. Launch blockers (PRD §6/§7)

- [ ] **Anthropic Ambassador wording** — confirm exact approved phrasing with
      Paul. Edit `AMBASSADOR_LINE` and `AMBASSADOR_TITLE` in `lib/copy.ts`
      (one file changes both the hero and About). **Do not launch until confirmed.**
- [ ] **Meetup platform URL** — once chosen (Luma / Meetup.com / Eventbrite),
      set `MEETUP_URL` in `lib/copy.ts`. The community success message will
      automatically show a "See upcoming meetups →" button.
- [ ] **Headshots** — replace the initials avatars in `components/About.tsx`
      with real photos (drop files in `public/`, swap the placeholder div for
      a `next/image`).
- [ ] **Final copy sign-off** — all copy lives in `lib/copy.ts`.
- [ ] **Contact email for footer** — add once the JV inbox exists
      (`FOOTER` in `lib/copy.ts` + mention it on the privacy page).

## 5. Before you email the list (not launch blockers)

- [ ] CAN-SPAM basics: physical mailing address + working unsubscribe in
      every send.
- [ ] Assign an owner + cadence for emailing the `Community` tab (PRD §8b) —
      e.g. "email the list 5 days before each meetup."

## 6. Later / optional

- [ ] Swap Sheet destination for Beehiiv (or Sheet + ESP dual-write) — the
      write logic is isolated in `lib/sheets.ts` (`writeSubmission`), so this
      is a one-file change.
- [ ] Lead notifications: in Apps Script, add a `MailApp.sendEmail` call in
      `doPost` for `formType === "lead"` if you want instant pings instead of
      checking the Sheet.
