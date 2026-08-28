import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #0a0a0b 0%, #141417 55%, #26262b 100%)",
          color: "#ededef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#ffffff" }}>{profile.location}</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 8 }}>{profile.role}</div>
        <div style={{ fontSize: 26, color: "#a2a2ad", marginTop: 28, maxWidth: 900 }}>
          {profile.tagline}
        </div>
      </div>
    ),
    size,
  );
}
