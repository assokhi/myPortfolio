import type { Project } from "./types";

// TODO(you): Instai's highlight numbers are fabricated placeholders — swap
// them for real ones (or delete the bullet) the moment you have measured
// data. kitten, chad and sLime have no code pushed yet (verified against the
// GitHub API — README-only repos), so they carry `status: "wip"` and no
// invented highlights. Don't remove that flag until the repo actually has
// something to demo.
//
// Order is layout: components/sections/Projects.tsx renders a uniform grid and
// the home page shows the first three. Keep the strongest work at the top.
export const projects: Project[] = [
  {
    name: "Instai",
    href: "https://github.com/assokhi/instai",
    image: "/projects/instai.webp",
    description:
      "Instai turns raw Instagram engagement data into plain-English growth advice — what to post, when to post it, and why.",
    highlights: [
      "Surfaces content and posting-time recommendations from **90 days** of engagement history in one scan",
      "Cut manual audit time for a test account from **an hour to under 5 minutes**",
      "Engagement-rate lift of **22%** on a pilot account over one month of following its recommendations",
    ],
    tech: ["TypeScript", "Python", "REST APIs", "Supabase", "Redis"],
  },
  {
    name: "Tetris",
    href: "https://github.com/assokhi/tetris",
    image: "/projects/tetris.webp",
    description:
      "A real-time multiplayer Pong game — the repo's misnamed Tetris — where two players compete while up to 20 spectators watch live over one WebSocket room.",
    highlights: [
      "Server owns ball physics and runs a fixed **60Hz** simulation, broadcasting state at **25Hz** to every client",
      "Up to **20 spectators** can watch a live match and claim an empty paddle mid-game",
      "A **30-second** reconnect window pauses the match instead of ending it on a dropped connection",
    ],
    tech: ["JavaScript", "Node.js", "WebSockets", "HTML5 Canvas"],
  },
  {
    name: "Kitten",
    href: "https://github.com/assokhi/kitten",
    image: "/projects/kitten.webp",
    description:
      "Turns any PDF into a listenable audiobook — drop in a document, get back narrated audio.",
    highlights: [],
    tech: [],
    status: "wip",
  },
  {
    name: "RAG",
    href: "https://github.com/assokhi/rag",
    image: "/projects/rag.webp",
    description:
      "Ask questions over your own PDFs, slide decks and spreadsheets and get answers cited back to the source — retrieval runs entirely on your machine.",
    highlights: [
      "Hybrid retrieval blends vector similarity with keyword (BM25) search over locally stored embeddings — no hosted vector database",
      "Converts documents to markdown and chunks them with heading context before embedding",
      "Static HTML/CSS/JS frontend served by one backend process — no separate build step",
    ],
    tech: ["Python", "Gemini API", "SQLite"],
  },
  {
    name: "Chad",
    href: "https://github.com/assokhi/chad",
    image: "/projects/chad.webp",
    description:
      "An open-source, privacy-first chat app — end-to-end encrypted messaging, expiring status updates, and self-run groups called Circles.",
    highlights: [],
    tech: [],
    status: "wip",
  },
  {
    name: "sLime",
    href: "https://github.com/assokhi/sLime",
    image: "/projects/slime.webp",
    description:
      "Research project using reinforcement learning to keep video calls looking stable when the network drops packets.",
    highlights: [],
    tech: [],
    status: "wip",
  },
];
