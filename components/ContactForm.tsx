"use client";

import { FormEvent, useState } from "react";
import { CONTACT } from "@/lib/copy";
import { trackConversion } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-white/20 bg-navy-light px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-soft focus:border-accent focus:ring-2 focus:ring-accent/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      trackConversion("lead_submit");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl">
          {status === "success" ? (
            <div role="status" className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight">
                {CONTACT.success.heading}
              </h2>
              <p className="mt-3 text-lg text-slate-soft">
                {CONTACT.success.body}
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {CONTACT.heading}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-soft">
                {CONTACT.body}
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                {/* Honeypot — hidden from real users, bots fill it */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="lead-website">Website</label>
                  <input
                    id="lead-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lead-company"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Company
                  </label>
                  <input
                    id="lead-company"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-needs"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    What do you need help with?
                  </label>
                  <textarea
                    id="lead-needs"
                    name="needs"
                    required
                    rows={4}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-timeline"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Timeline
                  </label>
                  <select
                    id="lead-timeline"
                    name="timeline"
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select one…
                    </option>
                    {CONTACT.timelineOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm font-medium text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-deep disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : CONTACT.button}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
