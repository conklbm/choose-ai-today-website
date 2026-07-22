# SETUP-TODO — ChooseAIToday.com

Everything the code can't do for you. Work top to bottom.

## 1. Google Sheet + Apps Script — ✅ DONE (verified 2026-07-21)

Web App deployed and `SHEET_WEBHOOK_URL` set in `.env.local`. Both forms were
tested end-to-end against the live endpoint and rows landed in the correct
tabs. **Delete the test rows** (named `TEST ROW …`) from both tabs before launch.

Still to do: add the same `SHEET_WEBHOOK_URL` value to Vercel's environment
variables when you set the project up (§3) — local and prod are separate.

> ⚠️ **If you ever redeploy the Apps Script, its URL changes** and forms go
> silently dead until you update `SHEET_WEBHOOK_URL` in both `.env.local` and
> Vercel. See [docs/APPS-SCRIPT-WEBHOOK.md](docs/APPS-SCRIPT-WEBHOOK.md) — it
> also shows how to publish edits *without* changing the URL.

<details>
<summary>Original setup steps (for reference / if you ever redeploy)</summary>

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

</details>

## 2. GA4 — property created, ID = `G-8CH585QDC5`

- [x] Property created; ID set in `.env.local` and verified loading (2026-07-22).
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8CH585QDC5` in Vercel env vars too.
- [ ] Mark `community_signup` and `lead_submit` as key events in GA4
      (Admin → Events) once they've fired at least once — they fire
      automatically on form success and will appear in the events list.

## 3. Vercel + domain — ✅ deployed (www.chooseaitoday.com live 2026-07-22)

- [ ] **BLOCKING: add env vars in Vercel** (Settings → Environment Variables),
      then redeploy — until then, production forms fail with a 500 and GA4
      does not load:
      - `SHEET_WEBHOOK_URL` = the Apps Script `/exec` URL (copy from `.env.local`)
      - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-8CH585QDC5`

<details>
<summary>Original setup steps</summary>

1. Import the GitHub repo (`conklbm/choose-ai-today-website`) into Vercel.
2. Add both env vars (above) before or right after first deploy.
3. Add custom domain `chooseaitoday.com` (+ `www` redirect) → follow Vercel's
   DNS instructions at your registrar. SSL is automatic.

</details>

## 4. Launch blockers (PRD §6/§7)

- [ ] **Anthropic Ambassador wording** — confirm exact approved phrasing with
      Paul. Edit `AMBASSADOR_LINE` and `AMBASSADOR_TITLE` in `lib/copy.ts`
      (one file changes both the hero and About). **Do not launch until confirmed.**
- [ ] **Meetup platform URL** — once chosen (Luma / Meetup.com / Eventbrite),
      set `MEETUP_URL` in `lib/copy.ts`. The community success message will
      automatically show a "See upcoming meetups →" button.
- [ ] **First meetup photo** — Brooks has a photo from a recent event Paul
      led. Drop it in `public/` (any filename) and tell Claude — it gets
      optimized and wired into the community section as the first piece of
      social proof. After meetup #1, replace with our own room.
- [x] ~~**Headshots**~~ — done. `public/brooks-conkle.jpg` and
      `public/paul-lockett.jpg`, rendered as circular avatars in the About
      cards. To swap either, replace the file and keep the filename.
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
