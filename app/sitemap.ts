import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { getPosts } from "@/lib/blog";

// Metadata routes must opt in explicitly under `output: "export"`.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = profile.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const pages = ["", "/about", "/experience", "/skills", "/blog"];
  const posts = await getPosts();

  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      priority: p === "" ? 1 : 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      priority: 0.6,
    })),
  ];
}
