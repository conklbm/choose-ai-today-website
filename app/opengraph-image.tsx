import { ImageResponse } from "next/og";

export const alt = "Choose AI Today — Mobile is learning AI together";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b111e",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 32,
            color: "#8996a9",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 64 64">
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
          Choose AI Today · Mobile, Alabama
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Mobile is learning AI together.
        </div>
        <div style={{ marginTop: 32, fontSize: 34, color: "#8996a9" }}>
          Meetups, community, and practical AI help for local businesses.
        </div>
      </div>
    ),
    { ...size }
  );
}
