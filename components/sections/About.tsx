import { MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import ExploreButton from "@/components/ui/explore-button";
import Mascot from "@/components/ui/mascot";
import Section from "./Section";

/* The heading is set in Great Vibes, the OFL stand-in for Geraldine — Geraldine
 * is licensed for personal use only and is not on Google Fonts. To use the real
 * one: drop the .otf in public/assets, swap the Great_Vibes import in
 * app/layout.tsx for next/font/local pointing at it, and keep the CSS variable
 * name. Nothing else here changes.
 *
 * A connected script is unreadable at body sizes, so it is confined to the
 * heading and the signature. Both are real text, not images, so the h2 still
 * reads as "About" to a screen reader and to whatever scrapes this page.
 */

export default function About() {
  // The long version lives on /about. Two sentences is what a recruiter reads
  // before deciding whether to scroll to the projects.
  const blurb = profile.shortBio.slice(0, 2);
  const firstName = profile.name.split(" ")[0];

  return (
    <Section
      id="about"
      title="About"
      action={<ExploreButton href="/about">Explore more</ExploreButton>}
    >
      <div className="flex flex-col">
        <div className="max-w-xl space-y-4 font-serif text-lg leading-relaxed text-muted">
          {blurb.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <p className="mt-6 flex items-baseline gap-3 text-muted">
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span className="font-script text-4xl text-fg">{firstName}</span>
          <span className="inline-flex items-center gap-1.5 font-serif text-sm">
            <MapPin aria-hidden="true" className="size-3.5" />
            {profile.location}
          </span>
        </p>

        <Mascot className="pt-8" />
      </div>
    </Section>
  );
}
