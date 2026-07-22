import { BRIDGE, SERVICES } from "@/lib/copy";

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

        <p className="mt-10 text-lg">
          {SERVICES.softCta.lead}{" "}
          <a
            href="#community"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            {SERVICES.softCta.community}
          </a>
          ,{" "}
          <a
            href="#contact"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            {SERVICES.softCta.contact}
          </a>
        </p>
      </div>
    </section>
  );
}
