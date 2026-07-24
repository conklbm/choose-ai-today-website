import { AMBASSADOR_LINE, HERO } from "@/lib/copy";

export default function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="hero-rise hero-rise-1 text-sm font-semibold uppercase tracking-widest text-accent-bright">
          {HERO.eyebrow}
        </p>
        <h1 className="hero-rise hero-rise-2 font-display mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {HERO.headline}
        </h1>
        <p className="hero-rise hero-rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-slate-soft sm:text-xl">
          {HERO.subhead}
        </p>
        <a
          href="#community"
          className="hero-rise hero-rise-4 group mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          <span aria-hidden className="cta-arrow">
            →
          </span>
          {HERO.cta}
        </a>
        <p className="mt-6 flex items-center gap-2 text-sm italic text-slate-soft">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent-bright"
          />
          {AMBASSADOR_LINE}
        </p>
      </div>
    </section>
  );
}
