"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV, SITE } from "@/lib/copy";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight"
        >
          {SITE.name}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#community"
            className="rounded-lg bg-cobalt px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt-deep"
          >
            {NAV.cta}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-cream px-4 pb-4 md:hidden">
          {NAV.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#community"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-cobalt px-4 py-3 text-center text-base font-semibold text-white"
          >
            {NAV.cta}
          </a>
        </div>
      )}
    </header>
  );
}
