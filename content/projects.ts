import type { Project } from "./types";

// TODO(you): every entry below is a placeholder. A recruiter reads this section
// before your experience, so the rule is one real project with a live URL beats
// four described ones. Numbers in **asterisks** render bold on the card.
//
// Screenshots: leave `shots` empty and the card draws a monogram panel. The
// weekly workflow in .github/workflows/project-shots.yml fills them in from the
// live URL, so you never commit a stale PNG by hand.
export const projects: Project[] = [
  {
    name: "Match Tracker",
    href: "https://example.com",
    logo: "React",
    description:
      "Live scoring and standings for a college football league. Officials update a match from their phone at the touchline; everyone else watches the table move.",
    highlights: [
      "Score updates reach every open device in **under 400ms** over a single WebSocket",
      "Cut the post-match reporting round trip from **two days to the final whistle**",
      "Ran a full **12-team** season with no manual spreadsheet",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Cloudflare"],
    shots: [],
  },
  {
    name: "This Portfolio",
    href: "https://myportfolio.singhsokhiarvinder.workers.dev",
    repo: "https://github.com/assokhi/myPortfolio",
    logo: "Cloudflare",
    description:
      "The site you are reading. Static export on Cloudflare Workers, with the one genuinely dynamic endpoint running in a Worker beside it.",
    highlights: [
      "**882ms** Largest Contentful Paint on a throttled mid-range phone",
      "**0.00** Cumulative Layout Shift, measured not estimated",
      "Live GitHub, LeetCode and Codeforces stats, baked at build time so they cost **zero** runtime requests",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare", "Motion"],
    shots: [],
  },
];
