import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/JS/CSS/JSON to out/, which
  // Cloudflare Workers Static Assets serves. There is no server side — the
  // LeetCode/Codeforces numbers in Education.tsx are baked in at build time and
  // refreshed by rebuilding (.github/workflows/refresh-stats.yml).
  output: "export",

  // No Node image optimizer exists on Workers, so next/image serves files from
  // public/ as-authored (it still handles layout, sizing and lazy loading).
  images: { unoptimized: true },
};

export default nextConfig;
