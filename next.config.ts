import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next regenerates CLAUDE.md/AGENTS.md on dev start; this repo maintains its
  // own CLAUDE.md by hand.
  agentRules: false,

  // Static export: `next build` writes plain HTML/JS/CSS/JSON to out/, which
  // Cloudflare Workers Static Assets serves. Nothing but /api/visitors runs
  // server code — see worker.ts. Consequence: no ISR, stats are baked at build
  // time and refreshed by rebuilding (see README).
  output: "export",

  // No Node image optimizer exists on Workers. Images are served from public/
  // as-authored; next/image still handles layout, sizing and lazy loading.
  images: { unoptimized: true },
};

export default nextConfig;
