import Link from "next/link";
import { profile, mailtoHref } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import { cn, heading1, pageShell, proseMeasure } from "@/lib/utils";

/** The only thing above the fold, so it answers "who is this and what do they
 *  do" before a single pixel is scrolled.
 *
 *  Two columns on desktop — text left, portrait right — because a single
 *  608px text column inside the 1140px shell left half the first screen
 *  empty. The portrait is what fills that space, in the manner of the
 *  reference: one large clean frame, no ring, no shadow, no halo.
 *
 *  A server component: the h1 and bio are the LCP element and paint
 *  immediately with no hydration wait. Everything below gets a CSS fade-up
 *  (globals.css) with a small stagger instead of a JS animation library, so
 *  the entrance still runs at first paint rather than after the JS bundle
 *  parses. `data-fade-in` keeps every staggered block visible under
 *  `scripting: none` via the rule already in globals.css.
 *
 *  The line under the name is the strongest entry in `profile.taglines`
 *  (previously cycled by RotatingTagline), held still rather than rotating —
 *  the reference positions one line under the name, not several in
 *  sequence. */
export default function Hero() {
  const tagline = profile.taglines[0];
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className={cn("relative", pageShell)}
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className={cn("min-w-0", proseMeasure)}>
          <h1 id="hero-heading" className={heading1}>
            {profile.name}
          </h1>

          {/* Flat 18px, deliberately under the bio's desktop 20px: the name,
              the bio and this line need three distinct sizes or the block
              reads as one grey mass. */}
          <p className="mt-1 text-lg font-medium text-accent-2 sm:mt-3">
            {tagline}
          </p>

          <p
            data-fade-in
            className="mt-6 text-[1.125rem] leading-[1.5] text-fg motion-safe:animate-[fade-up_500ms_ease-out_both] motion-safe:[animation-delay:100ms] sm:text-xl"
          >
            {profile.intro}{" "}
            {profile.flagship ? (
              <>
                Most recently{" "}
                <a
                  href={profile.flagship.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-fg underline decoration-accent-2 decoration-2 underline-offset-4 transition-colors hover:text-accent-2"
                >
                  {profile.flagship.title}
                </a>
                .{" "}
              </>
            ) : null}
            Reach me at{" "}
            <a
              href={mailtoHref}
              className="font-semibold text-fg underline decoration-accent-2 decoration-2 underline-offset-4 transition-colors hover:text-accent-2"
            >
              {profile.email}
            </a>
            , or on{" "}
            <a
              href={
                profile.socials.find((s) => s.icon === "linkedin")?.href ??
                "https://www.linkedin.com/"
              }
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-fg underline decoration-accent-2 decoration-2 underline-offset-4 transition-colors hover:text-accent-2"
            >
              LinkedIn
            </a>
            .
          </p>

          {/* One action row, not two. "View my Projects" used to sit in its own
              block between the tagline and the bio, splitting the text column
              in half — the reference runs name, bio, then a single row of
              controls. Primary action, secondary action, then contact. */}
          <div
            data-fade-in
            className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-[fade-up_500ms_ease-out_both] motion-safe:[animation-delay:180ms]"
          >
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
            >
              View my Projects
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-fg transition-colors duration-200 hover:bg-surface"
            >
              Resume
            </Link>
            <SocialLinks showResume={false} />
          </div>
        </div>

        {/* order-first puts the portrait above the name on a phone and
            `sm:order-none` returns it to the right of the text column — one
            element, one DOM position, no duplicated markup. Not focusable, so
            the visual/DOM order difference costs nothing in focus order. */}
        {profile.avatar ? (
          // Images are unoptimized on Workers; next/image would only add markup.
          // Explicit width and height so the reserved box is right on first
          // paint: this sits beside the LCP element, and a photo that arrives
          // late without a box reflows the whole row. That is CLS. The numbers
          // match the LARGEST rendered box (lg:size-72 = 288px) so the
          // intrinsic ratio is 1:1 at every breakpoint.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar}
            alt={profile.name}
            width={288}
            height={288}
            className="avatar-photo order-first size-28 shrink-0 rounded-3xl object-cover sm:order-none sm:size-64 lg:size-72"
          />
        ) : (
          <span
            aria-hidden="true"
            className="order-first flex size-28 shrink-0 items-center justify-center rounded-3xl bg-lime text-4xl font-bold text-on-bright sm:order-none sm:size-64 sm:text-7xl lg:size-72"
          >
            {initials}
          </span>
        )}
      </div>
    </section>
  );
}
