import type { Profile } from "./types";

// TODO(you): every string below is yours to replace. This one file feeds the
// hero, the about block, the contact section, the footer and all metadata.
export const profile: Profile = {
  name: "Arvinder Singh Sokhi",
  role: "Full-Stack Engineer",
  tagline:
    "I build fast, accessible web products end to end — TypeScript on both sides, and a bias for shipping.",
  intro:
    "Hey, I'm Arvinder. I build full-stack web apps that feel snappy and work reliably. Big fan of clean TypeScript, distributed systems, and shipping practical side projects.",
  location: "India",
  email: "singhsokhiarvinder@gmail.com",
  emailSubject: "Opportunity — via your portfolio",
  resumePath: "/assets/arvinder-singh-sokhi-resume.pdf",
  shortBio: [
    "I’m a full-stack engineer who loves the sweet spot where creative frontend craftsmanship meets deeply optimized system design. Most of my work lives across TypeScript—designing fluid, expressive user experiences in React and Next.js, paired with fast, resilient Node and Postgres architectures behind the scenes.",
    "On the frontend, I care about the details that make an app feel alive: snappy transitions, clean layout hierarchy, and seamless accessibility. On the backend, I’m drawn to performance—optimizing queries, cutting out bottlenecks, and setting up reliable infrastructure to keep things running smooth.",
    "As a collaborator, I keep things grounded. I favor simple, effective solutions over over-engineering, communicate clearly, and take genuine pride in helping a team deliver software that users genuinely enjoy using.",
  ],
  // TODO(you): these two arrays are the personality of the About block. Real
  // specifics beat tasteful vagueness — "Designing Data-Intensive Applications"
  // says more than "technical books".
  currently: [
    {
      label: "Building",
      value: "This portfolio, and a match tracker for a college league",
      icon: "hammer",
    },
    {
      label: "Reading",
      value: "Designing Data-Intensive Applications",
      icon: "book",
    },
    { label: "Learning", value: "Rust — slowly, and badly", icon: "graduation-cap" },
  ],
  interests: [
    { label: "Chess", icon: "puzzle" },
    { label: "Filter coffee", icon: "coffee" },
    { label: "Long rides", icon: "bike" },
    { label: "Sci-fi", icon: "film" },
    { label: "Playlists nobody asked for", icon: "music" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/assokhi", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/assokhi",
      icon: "linkedin",
    },
    // TODO(you): replace with your real Instagram handle.
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  ],
  githubUsername: "assokhi",
  leetcodeUsername: "Arvinder_Singh_Sokhi",
  codeforcesHandle: "ArvinderSinghSokhi",
  siteUrl: "https://assokhi.vercel.app",
};

/** mailto: with the subject prefilled. Used by Contact and the Footer. */
export const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
  profile.emailSubject,
)}`;
