import Link from "next/link";
import { profile, mailtoHref } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";

/** The 21st.dev "footer-01" block, rebuilt on this repo's tokens and this
 *  site's actual content. What the published version assumes and this does
 *  not:
 *
 *  - `@/components/ui/separator` is shadcn, and this is not a shadcn project
 *    (see CLAUDE.md — `shadcn init` would overwrite globals.css). A 1px rule
 *    is one div.
 *  - `text-muted-foreground` / `text-foreground` are shadcn tokens; here they
 *    are `text-muted` / `text-fg`.
 *  - `animate-in slide-in-from-bottom-10` needs tailwindcss-animate, which is
 *    not installed. A footer does not need an entrance animation.
 *  - Its Sitemap column (Pricing, Services, Terms, 404) and Contact block
 *    (street address, phone) are marketing-site furniture. Links here point at
 *    pages that exist; the contact rows are the real ones from profile.ts. */

// Every entry must be a route that exists. Education is absent on purpose:
// its detail page was removed, and it lives only as a home-page section now.
const sitemap = [
  { title: "About", href: "/about" },
  { title: "Experience", href: "/experience" },
  { title: "Skills", href: "/skills" },
  { title: "Blog", href: "/blog" },
];

const profiles = [
  ...profile.socials.map((s) => ({ title: s.label, href: s.href })),
  {
    title: "LeetCode",
    href: `https://leetcode.com/u/${profile.leetcodeUsername}/`,
  },
  {
    title: "Codeforces",
    href: `https://codeforces.com/profile/${profile.codeforcesHandle}`,
  },
];

const linkClass =
  "text-sm text-muted transition-colors hover:text-fg focus-visible:text-fg";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-fg">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map(({ title, href }) => (
          <li key={title}>
            {/* Internal routes get next/link for client navigation; the
                profile links are off-site and stay plain anchors. */}
            {href.startsWith("/") ? (
              <Link href={href} className={linkClass}>
                {title}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                {title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="col-span-full flex flex-col gap-5 lg:col-span-5">
            <div>
              <p className="text-base font-semibold tracking-tight text-fg">
                {profile.name}
              </p>
              <p className="mt-1 text-sm text-muted">{profile.role}</p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>
            <SocialLinks />
          </div>

          <div className="hidden lg:col-span-1 lg:block" />

          <div className="col-span-1 lg:col-span-2">
            <LinkColumn title="Sitemap" links={sitemap} />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <LinkColumn title="Profiles" links={profiles} />
          </div>

          <div className="col-span-2 lg:col-span-2">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-fg">Contact</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={mailtoHref} className={linkClass}>
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a
                    href={profile.resumePath}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Resume (PDF)
                  </a>
                </li>
                <li className="text-sm text-muted">{profile.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-border" />

        <div className="mt-6 flex flex-col gap-2 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js, Tailwind CSS and Motion. Icons by{" "}
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-fg"
            >
              Lucide
            </a>{" "}
            (ISC).
          </p>
        </div>
      </div>
    </footer>
  );
}
