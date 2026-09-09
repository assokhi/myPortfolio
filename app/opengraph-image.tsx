import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Rendered once at build time into out/opengraph-image.png — metadata routes
// must opt in explicitly under `output: "export"`.
export const dynamic = "force-static";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ponytail: system sans-serif, not Jost — Satori needs actual font bytes
// (an ImageResponse `fonts` fetch), which is real work for a card almost
// nobody sees at full size. Upgrade by fetching the Jost .ttf at build time
// if brand fidelity here ever matters.
export default function OpengraphImage() {
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
          background: "#fdfdfd",
          color: "#1E2740",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#565571" }}>{profile.location}</div>
        <div style={{ fontSize: 76, fontWeight: 900, marginTop: 16 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 8 }}>{profile.role}</div>
        <div style={{ fontSize: 26, color: "#565571", marginTop: 28, maxWidth: 900 }}>
          {profile.tagline}
        </div>
      </div>
    ),
    size,
  );
}
