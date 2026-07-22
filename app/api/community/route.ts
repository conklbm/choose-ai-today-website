import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, isValidEmail, writeSubmission } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Lots of submissions at once — wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, website } = body as Record<string, string>;

    // Honeypot: bots fill the hidden "website" field. Pretend success.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim() || !isValidEmail(email ?? "")) {
      return NextResponse.json(
        { error: "Please enter your name and a valid email." },
        { status: 400 }
      );
    }

    await writeSubmission({
      formType: "community",
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 254),
      source: "chooseaitoday-community",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Community submission failed:", err);
    return NextResponse.json(
      { error: "Couldn't save your signup. Try again in a minute." },
      { status: 500 }
    );
  }
}
