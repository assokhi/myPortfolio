import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

// Metadata routes must opt in explicitly under `output: "export"`.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name.split(" ")[0],
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    // Same portrait as app/icon.jpg (the browser-tab favicon) and the hero
    // avatar — one photo, three places, so a change to it never needs to be
    // made twice. 480x480 is the source photo's real size; browsers that want
    // a larger home-screen icon upscale it themselves.
    icons: [
      {
        src: "/icon.jpg",
        sizes: "480x480",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
