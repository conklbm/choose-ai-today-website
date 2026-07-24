import { BRIDGE, SERVICES } from "@/lib/copy";
import ArrowRight from "./ArrowRight";

export default function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Bridge line — carries the funnel from community to services */}
        <p className="mx-auto max-w-2xl border-l-4 border-accent pl-5 text-lg font-medium leading-relaxed text-ink sm:text-xl">
          {BRIDGE}
        </p>

        <h2 className="font-display mt-12 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {SERVICES.heading}
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SERVICES.items.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="text-lg font-medium">{SERVICES.softCta.lead}</p>
          <div className="flex flex-wrap gap-3">
            {SERVICES.softCta.actions.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-accent px-5 py-2.5 font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                <ArrowRight />
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
