import type { Experience } from "./types";

// Newest first. Each highlight is an OUTCOME with a number where a number exists.
// TODO(you): add `href` to each role — the Scriptivox verification link and the
// two Apache pull-request URLs from the resume. Omitted rather than guessed, so
// nothing here renders a dead link.
export const experience: Experience[] = [
  {
    company: "Scriptivox",
    logo: "Scriptivox",
    image: "/experience/scriptivox.png",
    // Logo file, not artwork: contain keeps the whole mark in frame instead of
    // cropping it to fill the panel.
    imageFit: "contain",
    role: "Full Stack Developer Intern",
    start: "2026-03",
    end: "2026-06",
    location: "Remote",
    highlights: [
      "Migrated a bot application from embedded (Raspberry Pi) infrastructure to cloud, rebuilding core services for scalability.",
      "Designed the relational schema and managed SQL migrations on Supabase/PostgreSQL, including Row-Level Security policies.",
      "Worked across hardware, backend and frontend stacks (Python, React, REST APIs) to deliver a production-ready application.",
      "Investigated platform security mechanisms, API rate-limiting and bot detection evasion strategies.",
    ],
    stack: ["Python", "React", "REST APIs", "Supabase", "PostgreSQL", "Raspberry Pi"],
  },
  {
    company: "Apache Software Foundation — Apache SeaTunnel",
    logo: "Apache",
    image: "/experience/apache-seatunnel.png",
    imageFit: "contain",
    role: "Open Source Contributor",
    start: "2026-02",
    end: "2026-03",
    location: "Remote",
    highlights: [
      "Developed an MQTT sink connector for Apache SeaTunnel, implementing core connection lifecycle management and fault-tolerance mechanisms.",
      "Engineered E2E test suites validating real-world message delivery and reliable data streaming to external brokers.",
      "Managed the automated CI/CD build, resolving checkstyle and integration failures to meet Apache open-source standards.",
      "Collaborated with project maintainers to finalise the pull request for merge.",
    ],
    stack: ["Java", "MQTT", "Apache SeaTunnel", "E2E Testing", "CI/CD"],
  },
  {
    company: "Apache Software Foundation — Apache Maven",
    logo: "Apache Maven",
    image: "/experience/apache-maven.png",
    imageFit: "contain",
    role: "Open Source Contributor",
    start: "2026-01",
    end: "2026-02",
    location: "Remote",
    highlights: [
      "Implemented a CLI enhancement for time zone configuration.",
      "Feature accepted and merged into Apache Maven core.",
      "Backported to the 4.0.0 stable branch.",
      "Added unit tests and followed Apache release standards.",
    ],
    stack: ["Java", "Apache Maven", "JUnit", "CLI"],
  },
];
