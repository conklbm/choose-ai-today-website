import Link from "next/link";
import { FOOTER, SITE } from "@/lib/copy";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-slate-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-sm sm:flex-row sm:justify-between sm:px-6">
        <Link
          href="/"
          className="font-display flex items-center gap-2 font-bold text-white transition-colors hover:text-slate-soft"
        >
          <LogoMark className="h-6 w-6" />
          {SITE.name}
        </Link>
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <div className="flex gap-5">
          {FOOTER.links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
