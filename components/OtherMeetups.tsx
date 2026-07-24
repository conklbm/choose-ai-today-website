import { OTHER_MEETUPS } from "@/lib/copy";
import ArrowRight from "./ArrowRight";

export default function OtherMeetups() {
  return (
    <section id="meetups" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {OTHER_MEETUPS.heading}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {OTHER_MEETUPS.body}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {OTHER_MEETUPS.groups.map((g) => (
            <div
              key={g.name}
              className="rounded-2xl border border-ink/10 bg-cream p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold">{g.name}</h3>
              <p className="mt-2 text-muted">{g.schedule}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {g.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    <ArrowRight />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
