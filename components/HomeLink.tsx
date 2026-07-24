"use client";

import Link from "next/link";

// Logo/wordmark link. When already on the homepage, Next treats a click on
// href="/" as a no-op if a hash like #services is in the URL — leaving the
// user parked mid-page. Here we clear the hash and scroll to top instead.
export default function HomeLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname === "/") {
      e.preventDefault();
      history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // On any other route, let Link navigate home normally.
  }

  return (
    <Link href="/" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
