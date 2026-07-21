// GA4 conversion events. No-ops until NEXT_PUBLIC_GA_MEASUREMENT_ID is set.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: "community_signup" | "lead_submit") {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, { event_category: "conversion" });
  }
}
