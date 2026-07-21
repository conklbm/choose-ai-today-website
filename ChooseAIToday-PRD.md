# PRD — ChooseAIToday.com (v1)

**Owner:** Brooks Conkle
**Partner:** Paul (Pim & Co.) — Anthropic Ambassador, Mobile AL
**Domain:** chooseaitoday.com (purchased)
**Status:** Ready for dev
**Last updated:** July 19, 2026

---

## 1. Summary

A single-page marketing site for a joint venture between Brooks Conkle (Erase Friction) and Paul (Pim & Co.). The site positions the two as a partnership serving the Mobile, AL business community around practical AI. It has two jobs:

1. **Primary:** Grow an email/community list of people interested in local AI meetups and connection.
2. **Secondary:** Softly advertise AI consulting services and capture inbound leads.

Both form submissions write directly to a shared Google Sheet (two tabs) so the partners can track community signups and consulting leads separately.

---

## 2. Goals & non-goals

**Goals**
- Ship a clean, credible single page fast.
- Capture community emails (low friction) and consulting leads (higher intent) into a Google Sheet.
- Leverage the Anthropic Ambassador credential as a trust signal.
- Leave room to grow into a multi-page site without a rebuild.

**Non-goals (v1)**
- No blog, no CMS, no member login.
- No payment/booking.
- No email automation or double opt-in (Sheet capture only for now).
- No event/RSVP system — meetup link points out to an external tool (TBD).

**Deferred but required soon (not blockers for launch, but don't ship email sends without them):**
- Privacy policy page (what's collected, how it's used) — needed because we collect emails.
- If/when we email the list: CAN-SPAM basics (physical mailing address + working unsubscribe).

---

## 3. Tech stack

- **Framework:** Next.js (App Router)
- **Hosting:** Vercel (custom domain: chooseaitoday.com)
- **Styling:** Tailwind CSS
- **Form backend:** Google Sheet via Google Apps Script Web App
  - Forms POST to a **Next.js API route** (server-side), which forwards to the Apps Script endpoint. This avoids browser CORS issues with Apps Script and keeps the endpoint URL out of client code.
- **Analytics:** Vercel Analytics (or Plausible if preferred)

**Why this stack:** Brooks already hosts on Vercel. The server-side API route makes the Sheet integration reliable (browser-direct POSTs to Apps Script frequently hit CORS/redirect problems).

---

## 4. Google Sheet integration (detail for dev)

**Sheet structure — one Sheet, two tabs:**

- Tab `Community`: `timestamp | name | email | source`
- Tab `Leads`: `timestamp | name | email | company | needs | timeline | source`

**`source` field:** identifies which form/section the submission came from, for later attribution. Populate server-side, e.g. `chooseaitoday-community` and `chooseaitoday-lead` (extend if we run campaigns later).

**Sheet ownership:** decide whose Google account owns the Sheet before launch — it holds the leads and email list, which is the actual asset of this JV. Recommend a shared/JV-owned account, or at minimum both partners with edit access. (See open question on ownership.)

**Apps Script (`doPost`)** reads a `formType` param and appends to the correct tab.

**Flow:**
1. Visitor submits form on page.
2. Client POSTs to Next.js route (`/api/community` or `/api/lead`).
3. Server route validates + forwards to Apps Script Web App URL (stored as an env var, e.g. `SHEET_WEBHOOK_URL`).
4. Apps Script appends the row; returns success.

**Anti-spam:**
- Honeypot hidden field on both forms (reject if filled).
- Basic email format validation server-side.
- Optional: light rate limit on the API route.

**Env vars:** `SHEET_WEBHOOK_URL` (the Apps Script deployment URL).

*Note: Apps Script Web App must be deployed with access "Anyone." Don't store secrets in the script since the endpoint is publicly reachable — it only appends rows.*

**Future consideration:** the Sheet is the v1 speed play. Later we may route submissions straight to an email platform like Beehiiv (or send to both Sheet + ESP) for automated welcome emails, meetup invites, and list management. Build the form → API route → destination flow so the *destination is swappable* — i.e. keep the write logic behind the Next.js API route so switching from Apps Script to a Beehiiv API call is a one-file change, not a rebuild.

---

## 5. Page structure (single page, anchored sections)

### 5.1 Nav (sticky, minimal)
- Left: "Choose AI Today" wordmark.
- Right anchor links: Community · Services · About · Contact.
- CTA button: **"Join the community →"** (scrolls to signup).

### 5.2 Hero
- Headline + subhead (see copy).
- Primary CTA: email signup (name + email inline, or button scrolling to it).
- Trust line referencing the Anthropic Ambassador credential.

### 5.3 Community signup (PRIMARY conversion block)
- Short form: **name + email**.
- `type="email"` input (correct mobile keyboard); real `<label>`s for accessibility.
- Brief consent line under the form (e.g. "We'll only email you about meetups and practical AI. Unsubscribe anytime.").
- Clear promise of what they get (meetup invites + practical local AI notes).
- **Success state must deliver on the promise:** confirmation message links to the meetup page (once the platform is chosen) so the "meetup invites" promise isn't left dangling with no next step.
- Writes to `Community` tab.

### 5.4 "How we help" — services (soft sell)
- 4 service cards as outcomes (see copy).
- Preceded by the **bridge line** (§6) so services read as the natural next step *after* the community, not a separate cold pitch.
- Soft CTA into the contact form.

> **Page-narrative note for dev:** The two goals are one funnel, not two. A business owner (or their employee) should feel they belong at the meetup — the meetup is top-of-funnel for consulting, not a separate audience. Sequence the page so it reads as a single story: *join the community (easy yes) → some businesses want to move faster → here's how we help*. The community and services sections should feel continuous, connected by the bridge line — avoid any visual or copy treatment that walls off "hobbyists" from "serious businesses."

### 5.5 About — the partnership
- Two short bios: Brooks (Erase Friction) + Paul (Pim & Co., Anthropic Ambassador).
- Links out to both agencies.
- Photos (to be supplied).

### 5.6 Consulting contact (SECONDARY conversion block)
- Form: **name, email, company, "what do you need help with," timeline**.
- Writes to `Leads` tab.

### 5.7 Footer
- Copyright, both business links, city (Mobile, AL), optional contact email.

---

## 6. Draft copy (starting point — partners to review/edit)

> Voice note for dev: keep it direct and outcome-first, matching Erase Friction's tone. Short sentences. No corporate fluff.

> **⚠️ BLOCKER — do not ship the "official Anthropic Ambassador" line until Paul confirms the exact approved wording.** It appears in the hero trust line and the About block. If the allowed phrasing differs, it changes in both places. Treat this as a gate, not an asset checkbox.

### Hero
**Headline:** Mobile is learning AI together.
**Subhead:** A local community for founders, teams, and the curious — plus hands-on help when your business is ready to put AI to work. Come to a meetup. Bring your team.
**CTA:** Get Local AI meetup invites + practical AI notes →
**Trust line:** Led by the official Anthropic Ambassador for Mobile, AL.

*(Alt headline option: "Practical AI for Mobile businesses — and the people building them.")*

### Community signup block (PRIMARY)
**Heading:** You belong here.
**Body:** Whether you're just AI-curious or running a company that needs to move faster, this is where Mobile figures it out together — meetups, connections, and a short note now and then on using AI in the real world. No hype, no jargon. Free to join, and yes — bring your team.
**Button:** Get Local AI meetup invites + practical AI notes →

### Bridge line (between community and services — carries the funnel)
> Some businesses want to move faster than a monthly meetup allows. When you're ready to actually implement, that's where we come in.

### Services — "When you're ready to go further"
1. **See where AI fits.** We assess your business and show you where AI creates real leverage — and where it doesn't.
2. **Get it implemented.** From idea to working tool. We build and deploy AI that earns its keep.
3. **Train your team.** Hands-on AI training so your staff uses it with confidence, not fear.
4. **Build an AI strategy.** A clear roadmap for adopting AI without betting the business on hype.

**Soft CTA:** Not sure where to start? Come to a meetup first, or tell us your situation → *(links to community + contact)*

### About block
**Heading:** Two locals, one mission: help Mobile use AI well.

**Paul** — Anthropic Ambassador for Mobile and founder of Pim & Co., a boutique software consulting practice helping founders and enterprises build MVPs, AI-powered products, and full-scale software systems.

**Brooks** — founder of Erase Friction, where he helps teams kill busywork with custom software, workflow automation, and practical AI. 17 years building and scaling businesses.

### Contact block
**Heading:** Bring us your bottleneck.
**Body:** Tell us what you're trying to do with AI. We'll come back with a real, useful response — no pitch.
**Button:** Send it →

### Footer
Choose AI Today · Mobile, Alabama · [Erase Friction] · [Pim & Co.]

---

## 7. Assets needed from partners
- [ ] Logo / wordmark (or dev uses a clean text wordmark)
- [ ] Headshots: Brooks + Paul
- [ ] Meetup platform URL (Luma / Meetup.com / Eventbrite) — for the community CTA + success-state link
- [ ] **[BLOCKER]** Confirmed exact wording allowed for "Anthropic Ambassador" (verify brand-usage rules) — see §6
- [ ] Google Sheet created + Apps Script deployed → `SHEET_WEBHOOK_URL`
- [ ] Sheet + Vercel ownership decided (JV asset — see §8)
- [ ] Contact email for footer (shared JV inbox recommended)
- [ ] OG/social share image + favicon (for when the link is shared in texts/Slack)
- [ ] Final copy sign-off

---

## 8. Open questions
1. **Meetup tool** — which platform? Affects whether the community CTA links out or just collects email.
2. **Brand rules** — any Anthropic guidelines on how the Ambassador title / Anthropic name can appear on a commercial JV site?
3. **Lead routing** — do both partners get notified on new `Leads` rows (e.g. Apps Script email trigger), or just check the Sheet?
4. **Ownership** — whose Vercel account hosts it, and whose Google account owns the Sheet? (Both are JV assets — decide up front. Consider shared accounts or clear written ownership.)
5. **Logo/brand** — is there a "Choose AI Today" visual identity, or should dev keep it type-only for v1?

---

## 8b. Ops reminder (not a dev task)

The Sheet is the launch shortcut — great. But a list that never gets emailed dies. **Decide now: who exports the `Community` tab and sends the first meetup invite, and when?** This is an ops/owner decision, not a build item, but it's the difference between a growing community and a dead spreadsheet. Suggest assigning an owner and a cadence (even a manual "email the list 5 days before each meetup") before launch.

---

## 9. Acceptance criteria
- Page loads fast, responsive on mobile.
- Both forms submit successfully and append correctly-formatted rows to the right Sheet tabs.
- Honeypot rejects bot submissions.
- Success + error states shown to the user on submit; community success state links to the meetup page.
- Email inputs use `type="email"`; all form fields have accessible labels.
- Form submissions fire a conversion event in analytics (so we can measure what's working).
- Anthropic Ambassador credential visible above the fold — **only after wording is confirmed (§6 blocker).**
- OG image + favicon present.
- Deployed to chooseaitoday.com with working SSL.
