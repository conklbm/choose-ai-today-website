import type { MetadataRoute } from "next";
import { SITE } from "@/lib/copy";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.domain, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.domain}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
