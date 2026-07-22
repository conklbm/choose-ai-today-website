// Brand mark: orange tile + checkmark ("choose" = decision made).
// Works on light and dark backgrounds; favicon and public/logo*.svg mirror it.
export default function LogoMark({
  className = "h-8 w-8",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#c2410c" />
      <path
        d="M18 34l10 10 18-21"
        fill="none"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
