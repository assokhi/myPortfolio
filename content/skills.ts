import type { Skills } from "./types";

// TODO(you): be honest here. A recruiter forgives "familiar with";
// an interviewer does not forgive a bluff.
export const skills: Skills = {
  stacks: [
    {
      name: "Next.js + TypeScript + PostgreSQL",
      description:
        "My default for anything with users and data. Server components for the reads, route handlers for the writes, SQL I can actually explain.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Vercel"],
    },
    {
      name: "React + Tailwind CSS",
      description:
        "Interface work: design systems, accessible components, and animation that survives prefers-reduced-motion.",
      tech: ["React", "Tailwind CSS", "Motion", "Radix UI"],
    },
    {
      name: "Node.js + REST APIs",
      description:
        "Services, integrations and the caching layer that keeps third-party rate limits off my back.",
      tech: ["Node.js", "Express", "Zod", "Redis", "Docker"],
    },
  ],
  technologies: {
    Languages: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Motion", "Vite"],
    Backend: ["Node.js", "Express", "REST", "GraphQL", "Zod"],
    Data: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    Tooling: ["Git", "Docker", "GitHub Actions", "Vercel", "Vitest", "Figma"],
  },
};
