import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { StacksList, TechnologiesList } from "@/components/sections/Skills";
import { displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Skills",
  // Keyword-matchable in the search description as well as the page body.
  description: `${profile.name} works with ${Object.values(skills.technologies)
    .flat()
    .slice(0, 12)
    .join(", ")}.`,
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <article>
      <h1 className={displayHeading}>Skills</h1>
      <p className="mt-2 text-muted">
        Stacks are what I build with regularly. Technologies is everything
        I&apos;ve worked in — honestly labelled.
      </p>

      <h2 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        Stacks
      </h2>
      <StacksList />

      <h2 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
        Technologies worked
      </h2>
      <TechnologiesList />
    </article>
  );
}
