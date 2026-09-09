import type { Skills } from "./types";

// TODO(you): be honest here. A recruiter forgives "familiar with";
// an interviewer does not forgive a bluff.
export const skills: Skills = {
  technologies: {
    Languages: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Motion", "Vite"],
    Backend: ["Node.js", "Express", "REST", "GraphQL", "Zod"],
    Data: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    Tooling: ["Git", "Docker", "GitHub Actions", "Cloudflare", "Vitest", "Figma"],
  },
};
