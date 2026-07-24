"use client";

import { useEffect, useState } from "react";

// Current year, rendered client-side so it's always correct for the viewer —
// not frozen at build time the way a statically-generated server component
// would be. The build-time year ships in the HTML (good for SEO/no flash),
// then hydration corrects it if the viewer has crossed into a new year.
export default function Year() {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span suppressHydrationWarning>{year}</span>;
}
