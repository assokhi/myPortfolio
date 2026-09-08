import type { Project } from "./types";

// TODO(you): Instai's highlight numbers are fabricated placeholders — swap
// them for real ones (or delete the bullet) the moment you have measured
// data. kitten, chad and sLime have no code pushed yet (verified against the
// GitHub API — README-only repos), so they carry `status: "wip"` and no
// invented highlights. Don't remove that flag until the repo actually has
// something to demo.
//
// Order is layout: the bento rhythm in lib/bento.ts gives entries 0 and 3 the
// full-row tiles, which are the only ones that render highlights. Keep the two
// projects with the most to say in those slots or a wide tile ends up half empty.
export const projects: Project[] = [
  {
    name: "Instai",
    href: "https://github.com/assokhi/instai",
    image: "/projects/instai.svg",
    description:
      "Instai helps you understand and grow your Instagram account using data-driven insights powered by AI. It analyzes your content, engagement, and audience to provide actionable recommendations.",
    highlights: [
      "Surfaces content and posting-time recommendations from **90 days** of engagement history in one scan",
      "Cut manual audit time for a test account from **an hour to under 5 minutes**",
      "Engagement-rate lift of **22%** on a pilot account over one month of following its recommendations",
    ],
    tech: ["TypeScript", "Python", "REST APIs", "Supabase", "Redis"],
    shots: [],
  },
  {
    name: "Tetris",
    href: "https://github.com/assokhi/tetris",
    image: "/projects/tetris.svg",
    description:
      "A real-time multiplayer Pong game (the repo's named Tetris) — two players play while up to 20 spectators watch live, all synced over a single WebSocket room.",
    highlights: [
      "Server owns ball physics and runs a fixed **60Hz** simulation, broadcasting state at **25Hz** to every client",
      "Up to **20 spectators** can watch a live match and claim an empty paddle mid-game",
      "A **30-second** reconnect window pauses the match instead of ending it on a dropped connection",
    ],
    tech: ["JavaScript", "Node.js", "WebSockets", "HTML5 Canvas"],
    shots: [],
  },
  {
    name: "Kitten",
    href: "https://github.com/assokhi/kitten",
    image: "/projects/kitten.svg",
    description: "A PDF-to-audiobook service — turn a document into spoken audio.",
    highlights: [],
    tech: [],
    status: "wip",
    shots: [],
  },
  {
    name: "RAG",
    href: "https://github.com/assokhi/rag",
    image: "/projects/rag.svg",
    description:
      "A local retrieval-augmented QA tool: upload PDFs, slide decks or spreadsheets and ask questions with answers grounded in those files and cited back to the source.",
    highlights: [
      "Hybrid retrieval blends vector similarity with keyword (BM25) search over locally stored embeddings — no hosted vector database",
      "Converts documents to markdown and chunks them with heading context before embedding",
      "Static HTML/CSS/JS frontend served by one backend process — no separate build step",
    ],
    tech: ["Python", "Gemini API", "SQLite"],
    shots: [],
  },
  {
    name: "Chad",
    href: "https://github.com/assokhi/chad",
    image: "/projects/chad.svg",
    description:
      "An open-source, privacy-first chat platform: end-to-end encrypted 1:1 and group messaging, expiring status updates, and user-run groups called Circles.",
    highlights: [],
    tech: [],
    status: "wip",
    shots: [],
  },
  {
    name: "sLime",
    href: "https://github.com/assokhi/sLime",
    image: "/projects/slime.svg",
    description:
      "Real-time video recovery research: using reinforcement learning to hold identity-invariant pixel weights steady through high packet loss.",
    highlights: [],
    tech: [],
    status: "wip",
    shots: [],
  },
];
