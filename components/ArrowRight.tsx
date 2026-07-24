// Right-pointing arrow as inline SVG. Unlike the Unicode "→" glyph — whose
// vertical position varies by font and reads slightly off-center in buttons —
// an SVG is drawn at the exact center of its box, so flexbox centers it
// perfectly. Sized in em, so it scales with the button's text size.
export default function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`h-[1.1em] w-[1.1em] shrink-0 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
