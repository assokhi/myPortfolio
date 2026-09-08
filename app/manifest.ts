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
    // One SVG rather than a 192/512 PNG pair. A vector is every size at once,
    // it is under a kilobyte, and it cannot go blurry on a display this site
    // has not been tested on. Chrome and Edge accept SVG here; the browsers
    // that do not fall back to the <link rel="icon"> from app/icon.svg, which
    // is the same mark.
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
