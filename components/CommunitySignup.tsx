"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { COMMUNITY, MEETUP_URL } from "@/lib/copy";
import { trackConversion } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function CommunitySignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      trackConversion("community_signup");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section id="community" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-10">
        {status === "success" ? (
          <div role="status" className="text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              {COMMUNITY.success.heading}
            </h2>
            <p className="mt-3 text-lg text-muted">{COMMUNITY.success.body}</p>
            {MEETUP_URL && (
              <a
                href={MEETUP_URL}
                className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                {COMMUNITY.success.meetupLinkLabel}
              </a>
            )}
          </div>
        ) : (
          <>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {COMMUNITY.heading}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {COMMUNITY.facts.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1 text-sm font-semibold text-accent"
                >
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-muted">{COMMUNITY.body}</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              {/* Honeypot — hidden from real users, bots fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="community-website">Website</label>
                <input
                  id="community-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="community-name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="community-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-ink/20 bg-cream px-4 py-3 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="community-email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="community-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-ink/20 bg-cream px-4 py-3 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-deep disabled:opacity-60"
              >
                {status === "submitting" ? "Joining…" : COMMUNITY.button}
              </button>

              <p className="text-center text-xs text-muted">
                {COMMUNITY.consent}
              </p>
            </form>
          </>
        )}
      </div>

      <figure className="mx-auto mt-6 max-w-2xl">
        <Image
          src={COMMUNITY.photo.src}
          alt={COMMUNITY.photo.alt}
          width={COMMUNITY.photo.width}
          height={COMMUNITY.photo.height}
          sizes="(max-width: 704px) 100vw, 672px"
          className="w-full rounded-2xl border border-ink/10 object-cover"
        />
        <figcaption className="mt-2 text-center text-xs text-muted">
          {COMMUNITY.photo.caption}
        </figcaption>
      </figure>
    </section>
  );
}
