import { AMBASSADOR_LINE, HERO } from "@/lib/copy";

export default function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <h1 className="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          {HERO.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-soft sm:text-xl">
          {HERO.subhead}
        </p>
        <a
          href="#community"
          className="mt-8 inline-block rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          {HERO.cta}
        </a>
        <p className="mt-6 flex items-center gap-2 text-sm text-slate-soft">
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
