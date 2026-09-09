/** The shape of every content file. Edit the data files, not the components. */

export type Social = {
  label: string;
  href: string;
  /** lucide-react icon name, resolved in components/sections/Contact.tsx */
  icon: "github" | "linkedin" | "mail" | "instagram";
};

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
  /** Path under public/ for the footer avatar, e.g. "/avatar.jpg". Omit it and
   *  the footer draws a monogram instead, which is why it stays optional. */
  avatar?: string;
  /** Short phrases the hero cycles through under your name. Three to five is
   *  the range: fewer reads as a typo, more and nobody waits for the loop. */
  taglines: string[];
  /** Options in the contact form's subject dropdown. The first is the
   *  default. */
  contactSubjects: string[];
  /** The one project worth interrupting the bio to mention. Rendered as an
   *  inline link that unfurls a preview card on hover. */
  flagship?: {
    href: string;
    title: string;
    /** One line. A pitch, not a paragraph. */
    pitch: string;
    /** Path under public/, or an absolute URL. */
    image?: string;
    cta?: string;
  };
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
  /** Same panel, for the day theme. Only needed when the logo file is drawn
   *  for a dark ground — a white wordmark is invisible on a white page. Omit
   *  it and `image` is used in both themes, which is right for any mark that
   *  already reads on either. */
  imageLight?: string;
  /** "contain" for logo files, so the generated panel stays visible behind
   *  them. Defaults to "cover", for full-bleed artwork. */
  imageFit?: "cover" | "contain";
};

export type Skills = {
  /** Group name -> technologies. */
  technologies: Record<string, string[]>;
};

export type Education = {
  institution: string;
  qualification: string;
  start: string;
  end?: string;
  location?: string;
  notes?: string[];
  /** Picks the row's icon. Defaults to "university" — the common case for a
   *  portfolio, and the only reason this is optional. */
  kind?: "university" | "school";
  /** Path under public/, e.g. "/education/pec.png". Overrides `kind` when
   *  set; the icon is the fallback for institutions with no logo file. */
  logo?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  /** ISO date, e.g. "2026-03-14". */
  issuedOn: string;
  credentialId?: string;
  verifyUrl: string;
};

/** An online course completed but not formally certified — no credential ID,
 *  no verify link, so it lives in its own bento row on Education rather than
 *  the verified Certifications card, which shows nothing rather than a badge
 *  nobody can check. */
export type Course = {
  name: string;
  issuer: string;
  instructor?: string;
  href?: string;
  /** Two hex colours for the card's cover — no real thumbnail file exists for
   *  any of these, and DeepLearning.AI's own course tiles are exactly this: a
   *  two-tone diagonal wash with the title set on top. A CSS gradient gets
   *  the same look with no image request and nobody else's asset. */
  gradient: [string, string];
};

export type Book = {
  title: string;
  author: string;
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
  /** Whole minutes, from the body word count. */
  readingTime: number;
  /** Path under public/ for the card image, e.g. "/blog/my-post.jpg". Posts
   *  without one fall back to a flat colour block, so it stays optional. */
  cover?: string;
};

export type Project = {
  name: string;
  /** The live URL. This is the point of the card — a project a reader cannot
   *  open is a claim, not proof. */
  href: string;
  /** One or two sentences. What it is and who it is for. */
  description: string;
  /** Outcomes with numbers in them. Wrap the number in **asterisks** and the
   *  card renders it bold — the data decides what is emphasised, not the
   *  component. */
  highlights: string[];
  tech: string[];
  /** A brand title from simple-icons, or omitted for a monogram. */
  logo?: string;
  /** Path under public/ to the project's own mark — wins over `logo` when
   *  both are set, same precedence as CardLogo's image/brand/monogram order. */
  image?: string;
  /** Source, when it is public. */
  repo?: string;
  /** "wip" shows an "In progress" badge instead of implying a finished,
   *  demoable product — for a repo that exists but isn't done yet. */
  status?: "wip";
};
