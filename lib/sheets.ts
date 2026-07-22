// Single write path for form submissions. The destination (Google Apps
// Script → Sheet today, Beehiiv or another ESP later) is swappable here
// without touching the forms or API routes. (PRD §4)

type SheetPayload = {
  formType: "community" | "lead";
  name: string;
  email: string;
  source: string;
  company?: string;
  needs?: string;
  timeline?: string;
};

export async function writeSubmission(payload: SheetPayload): Promise<void> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    throw new Error("SHEET_WEBHOOK_URL is not configured");
  }

  // Apps Script web apps respond with a 302 to a googleusercontent URL;
  // fetch follows it by default, which is what we want.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Sheet webhook responded ${res.status}`);
  }

  // Apps Script returns HTTP 200 even when the append fails (bad tab name,
  // script error), so the body is the real success signal — without this a
  // failed write would show the visitor a success message.
  const result = await res.json().catch(() => null);
  if (!result?.ok) {
    throw new Error(
      `Sheet webhook rejected the write: ${result?.error ?? "unrecognized response"}`
    );
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254;
}

// Light in-memory rate limit: max N submissions per IP per minute. Resets on
// cold start, which is fine — this only needs to blunt naive bots. (PRD §4)
const hits = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}
