import Link from "next/link";
import { profile, mailtoHref } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import { cn, heading1, pageShell, proseMeasure } from "@/lib/utils";

/** The only thing above the fold, so it answers "who is this and what do they
 *  do" before a single pixel is scrolled.
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
      <div className="flex flex-row items-center gap-4 sm:block">
        {profile.avatar ? (
          // Images are unoptimized on Workers; next/image would only add markup.
          // Explicit width and height so the reserved box is right on first
          // paint: this sits directly above the LCP element, and a photo that
          // arrives late without a box pushes the h1 down. That is CLS.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar}
            alt={profile.name}
            width={96}
            height={96}
            className="avatar-photo size-16 shrink-0 rounded-2xl object-cover sm:mb-6 sm:size-24"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-lime text-2xl font-bold text-on-bright sm:mb-6 sm:size-24 sm:text-3xl"
          >
            {initials}
          </span>
        )}

        {/* contents on sm+ so this wrapper doesn't affect the stacked desktop
            layout — only the mobile row above opts in to flex placement. */}
        <div className="sm:contents">
          <h1 id="hero-heading" className={heading1}>
            {profile.name}
          </h1>

          <p className={cn("mt-1 text-base font-medium text-accent-2 sm:mt-3 sm:text-xl", proseMeasure)}>
            {tagline}
          </p>
        </div>
      </div>

      <div data-fade-in className="mt-6 motion-safe:animate-[fade-up_500ms_ease-out_both] motion-safe:[animation-delay:100ms]">
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
        >
          View my Projects
        </Link>
      </div>

      <p
        data-fade-in
        className={cn(
          "mt-6 text-lg leading-relaxed text-fg motion-safe:animate-[fade-up_500ms_ease-out_both] motion-safe:[animation-delay:180ms]",
          proseMeasure,
        )}
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

      <div
        data-fade-in
        className="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-[fade-up_500ms_ease-out_both] motion-safe:[animation-delay:260ms]"
      >
        <SocialLinks showResume={false} />
        <Link
          href="/resume"
          className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
        >
          Resume
        </Link>
      </div>
    </section>
  );
}
