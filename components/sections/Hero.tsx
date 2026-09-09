"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { profile, mailtoHref } from "@/content/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import RotatingTagline from "@/components/ui/rotating-tagline";
import LinkPreviewCard from "@/components/ui/link-preview-card";
import HeroDoodle from "@/components/ui/hero-doodle";
import BoldOnHover from "@/components/ui/bold-on-hover";

// One cascade, four steps: avatar+name, CTA, bio, social row. Each step is a
// motion.* with `variants` only (no own initial/animate) so it inherits the
// hidden/visible cycle from the container below and staggers automatically —
// that propagation is what lets one animate() call drive the whole sequence.
const container = {
  hidden: {},
  visible: (staggerChildren: number) => ({
    transition: { staggerChildren, delayChildren: staggerChildren ? 0.05 : 0 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: (duration: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration, ease: "easeOut" as const },
  }),
};

/** The only thing above the fold, so it answers "who is this and what do they
 *  do" before a single pixel is scrolled.
 *
 *  No background image and no pinned parallax: the grid paper in globals.css
 *  is the whole backdrop, which means the h1 is the LCP element and there is
 *  nothing queued in front of it.
 *
 *  The entrance below never hides content from anyone who can't run it: each
 *  animated block carries `data-fade-in`, and the `[data-fade-in]` rule in
 *  globals.css forces it visible under `scripting: none`. For reduced motion,
 *  duration and stagger collapse to 0 rather than skipping the animation —
 *  same end state, no wait, and no server/client `initial` mismatch since
 *  `initial`/`animate` themselves never change, only the numbers passed in. */
export default function Hero() {
  const reduce = useReducedMotion();
  const duration = reduce ? 0 : 0.55;
  const stagger = reduce ? 0 : 0.12;

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative mx-auto w-full max-w-4xl px-5 pt-10 pb-20 sm:pt-16"
    >
      {/* Sits in the page margin outside this column — 2xl+ only, so there is
          always empty gutter to occupy and it can never overlap the copy. */}
      <HeroDoodle className="absolute top-10 left-0 -translate-x-[140%]" />

      <motion.div
        initial="hidden"
        animate="visible"
        custom={stagger}
        variants={container}
      >
        <motion.div
          data-fade-in
          custom={duration}
          variants={item}
          className="flex flex-row items-center gap-4 sm:block"
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
            <h1
              id="hero-heading"
              className="text-2xl font-semibold tracking-tight text-fg sm:text-6xl"
            >
              {/* Same weight-sweep already used on blog titles — one motion
                  system, reused rather than a new entrance animation. */}
              <BoldOnHover text={profile.name} from={600} to={800} />
            </h1>

            <RotatingTagline
              phrases={profile.taglines}
              className="mt-1 text-base font-medium text-accent-2 sm:mt-3 sm:text-2xl"
            />
          </div>
        </motion.div>

        <motion.div data-fade-in custom={duration} variants={item}>
          <Link
            href="/projects"
            className="mt-6 inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            View my Projects
          </Link>
        </motion.div>

        <motion.p
          data-fade-in
          custom={duration}
          variants={item}
          className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-fg"
        >
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
        </motion.p>

        <motion.div
          data-fade-in
          custom={duration}
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <SocialLinks showResume={false} />
          <Link
            href="/resume"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-90"
          >
            Resume
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
