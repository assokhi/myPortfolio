import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    // The whole site is meant to be read, including by ATS scrapers.
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${profile.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
