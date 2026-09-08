import Link from "next/link";
import { profile, mailtoHref } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import RotatingTagline from "@/components/ui/rotating-tagline";
import CopyEmailButton from "@/components/ui/copy-email-button";
import LinkPreviewCard from "@/components/ui/link-preview-card";

/** The only thing above the fold, so it answers "who is this and what do they
 *  do" before a single pixel is scrolled.
 *
 *  No background image and no pinned parallax: the grid paper in globals.css
 *  is the whole backdrop, which means the h1 is the LCP element and there is
 *  nothing queued in front of it. */
export default function Hero() {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-4xl px-5 pt-10 pb-20 sm:pt-16"
    >
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
          className="mb-6 size-24 rounded-2xl object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="mb-6 flex size-24 items-center justify-center rounded-2xl bg-lime text-3xl font-bold text-on-bright"
        >
          {initials}
        </span>
      )}

      <h1
        id="hero-heading"
        className="text-4xl font-semibold tracking-tight text-fg sm:text-6xl"
      >
        {profile.name}
      </h1>

      <RotatingTagline
        phrases={profile.taglines}
        className="mt-3 text-xl font-medium text-accent-2 sm:text-2xl"
      />

      <CopyEmailButton email={profile.email} className="mt-6" />

      <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-fg">
        {profile.intro}{" "}
        {profile.flagship ? (
          <>
            Most recently{" "}
            <LinkPreviewCard
              href={profile.flagship.href}
              meta={{
                title: profile.flagship.title,
                pitch: profile.flagship.pitch,
                image: profile.flagship.image,
                cta: profile.flagship.cta,
              }}
            >
              {profile.flagship.title}
            </LinkPreviewCard>
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

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <SocialLinks />
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
