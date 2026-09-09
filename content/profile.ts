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
  avatar: "/assets/photo.jpg",
  location: "India",
  email: "singhsokhiarvinder@gmail.com",
  emailSubject: "Opportunity — via your portfolio",
  resumePath: "/assets/arvinder-singh-sokhi-resume.pdf",
  // TODO(you): the hero cycles these under your name, one every few seconds.
  // Keep them short and specific — "AI Enthusiast" says nothing, "Ships on
  // Fridays" says something.
  taglines: [
    "Full-Stack Engineer",
    "TypeScript on both sides",
    "Open to full-time SDE roles",
    "Mathematics geek",
  ],
  // First one is the form's default.
  contactSubjects: ["Say Hello", "Project Inquiry", "Collaboration", "Other"],
  flagship: {
    href: "https://github.com/assokhi/myPortfolio",
    title: "This portfolio",
    pitch: "Static export on Cloudflare Workers. 882ms LCP, 0.00 CLS.",
    cta: "View source",
  },
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
  siteUrl: "https://myportfolio.singhsokhiarvinder.workers.dev",
};

/** mailto: with the subject prefilled. Used by Contact and the Footer. */
export const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
  profile.emailSubject,
)}`;
