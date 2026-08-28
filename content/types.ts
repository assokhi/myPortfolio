/** The shape of every content file. Edit the data files, not the components. */

export type Social = {
  label: string;
  href: string;
  /** lucide-react icon name, resolved in components/sections/Contact.tsx */
  icon: "github" | "linkedin" | "mail" | "instagram";
};

/** Icon keys resolved in components/sections/About.tsx. Add a key there and
 *  here together, or TypeScript will not let the content file compile. */
export type AboutIcon =
  | "hammer"
  | "book"
  | "graduation-cap"
  | "coffee"
  | "music"
  | "bike"
  | "camera"
  | "puzzle"
  | "film"
  | "map-pin";

export type Profile = {
  name: string;
  /** The job title you want, in plain words. Not "passionate innovator". */
  role: string;
  /** One sentence on your specialism. Feeds the meta description, the OG
   *  image and the page <title> — write it for a crawler, not a visitor. */
  tagline: string;
  /** The spoken-voice summary under the hero name and role. First person —
   *  the tagline above is the crawler's copy, this one is the visitor's. */
  intro: string;
  location: string;
  email: string;
  /** Prefilled subject so portfolio mail is easy to spot in your inbox. */
  emailSubject: string;
  /** Path under public/ */
  resumePath: string;
  /** 3-4 sentences. The first two run in the home About block; /about runs
   *  all of them. Keep the first two the ones that stand alone. */
  shortBio: string[];
  /** What you are actually doing right now. Dated by nature — three rows is
   *  the most anyone reads, and a stale one is worse than none. */
  currently: { label: string; value: string; icon: AboutIcon }[];
  /** The non-work half. Short labels, not sentences. */
  interests: { label: string; icon: AboutIcon }[];
  socials: Social[];
  /** Public handles. Not secrets — see prd/03-api.md. */
  githubUsername: string;
  leetcodeUsername: string;
  codeforcesHandle: string;
  /** Absolute site URL, used for metadata and the sitemap. */
  siteUrl: string;
};

export type Experience = {
  company: string;
  role: string;
  /** ISO-ish, e.g. "2024-06". Used for sorting and <time>. */
  start: string;
  /** Omit for "Present". */
  end?: string;
  location?: string;
  /** Outcomes, not duties. "Cut p95 from 800ms to 120ms" beats "owned backend". */
  highlights: string[];
  stack: string[];
  href?: string;
  /** A brand title from simple-icons, e.g. "Apache Maven". Anything without a
   *  mark falls back to a monogram, so this is optional. */
  logo?: string;
  /** Path under public/ for the card's intro panel, e.g.
   *  "/experience/seatunnel.png". Drop a file in and it replaces the generated
   *  panel — no code change. */
  image?: string;
  /** "contain" for logo files, so the generated panel stays visible behind
   *  them. Defaults to "cover", for full-bleed artwork. */
  imageFit?: "cover" | "contain";
};

export type Stack = {
  name: string;
  /** What you actually build with this combination. */
  description: string;
  tech: string[];
};

export type Skills = {
  stacks: Stack[];
  /** Broader list. Group name -> technologies. */
  technologies: Record<string, string[]>;
};

export type Education = {
  institution: string;
  qualification: string;
  start: string;
  end?: string;
  location?: string;
  notes?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  /** ISO date, e.g. "2026-03-14". */
  issuedOn: string;
  credentialId?: string;
  verifyUrl: string;
};

export type Extra = {
  title: string;
  description: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};
