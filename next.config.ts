import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next regenerates CLAUDE.md/AGENTS.md on dev start; this repo maintains its
  // own CLAUDE.md by hand.
  agentRules: false,
};

export default nextConfig;
