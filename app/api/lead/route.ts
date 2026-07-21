import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, isValidEmail, writeSubmission } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, company, needs, timeline, website } = body as Record<
      string,
      string
    >;

    // Honeypot: bots fill the hidden "website" field. Pretend success.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim() || !isValidEmail(email ?? "") || !needs?.trim()) {
      return NextResponse.json(
        {
          error:
            "Please enter your name, a valid email, and what you need help with.",
        },
        { status: 400 }
      );
    }

    await writeSubmission({
      formType: "lead",
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 254),
      company: (company ?? "").trim().slice(0, 200),
      needs: needs.trim().slice(0, 2000),
      timeline: (timeline ?? "").trim().slice(0, 100),
      source: "chooseaitoday-lead",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message. Try again in a minute." },
      { status: 500 }
    );
  }
}
