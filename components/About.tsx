import { ABOUT } from "@/lib/copy";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-display max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
        {ABOUT.heading}
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {ABOUT.partners.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8"
          >
            {/* Placeholder avatar — swap for headshot <Image> when supplied */}
            <div
              aria-hidden
              className="font-display flex h-16 w-16 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white"
            >
              {p.initials}
            </div>
            <h3 className="font-display mt-4 text-xl font-bold">{p.name}</h3>
            <p className="text-sm font-medium text-cobalt">{p.role}</p>
            <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold text-cobalt underline-offset-4 hover:underline"
            >
              {p.link.label} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
