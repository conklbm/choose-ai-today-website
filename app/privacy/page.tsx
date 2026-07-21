import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Privacy Policy — Choose AI Today",
  description:
    "How Choose AI Today collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-ink/10">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" className="font-display text-lg font-extrabold">
            {SITE.name}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted">Last updated: July 20, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 [&_p]:text-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted">
          <section>
            <h2>Who we are</h2>
            <p>
              Choose AI Today is a partnership between Erase Friction and Pim
              &amp; Co., serving the Mobile, Alabama business community. You can
              reach us through the contact form on our homepage.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Community signup:</strong> your name and email address.
              </li>
              <li>
                <strong>Consulting inquiries:</strong> your name, email,
                company, a description of what you need help with, and your
                timeline.
              </li>
              <li>
                <strong>Analytics:</strong> standard usage data (pages viewed,
                device type, approximate location) via Google Analytics.
              </li>
            </ul>
          </section>

          <section>
            <h2>How we use it</h2>
            <ul>
              <li>
                To send you meetup invites and occasional practical AI notes
                (community list).
              </li>
              <li>To respond to your consulting inquiry.</li>
              <li>To understand how the site is used and improve it.</li>
            </ul>
            <p>
              We do not sell your information. We do not share it with anyone
              outside the partnership except the service providers below.
            </p>
          </section>

          <section>
            <h2>Who processes your data</h2>
            <ul>
              <li>
                <strong>Vercel</strong> — hosts this website.
              </li>
              <li>
                <strong>Google</strong> — form submissions are stored in Google
                Sheets; site analytics use Google Analytics.
              </li>
            </ul>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              Every email we send includes a way to unsubscribe. To have your
              information removed entirely, reply to any of our emails or use
              the contact form and we&apos;ll delete it.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              If this policy changes, we&apos;ll update this page and the date
              above.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
