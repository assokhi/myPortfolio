import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { displayHeading } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, ${profile.role}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl">
      <h1 className={displayHeading}>About me</h1>

      <div className="mt-6 space-y-5 font-serif text-lg leading-relaxed text-muted">
        {profile.shortBio.map((p) => (
          <p key={p}>{p}</p>
        ))}

        {/* TODO(you): the long version. How you got into this, what kind of
            problems you like, what you're looking for next. */}
        <h2 className="pt-4 text-xl font-semibold text-fg">How I got here</h2>
        <p>
          I started by breaking things — a school project that needed a database
          it did not have, then a side project that needed to be fast on a phone
          with two bars of signal. Both taught me more than any tutorial did, and
          both are why I reach for the boring, well-understood tool first.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">
          What I like working on
        </h2>
        <p>
          Problems with a measurable before and after. A slow endpoint, a page
          that fails an audit, a flow nobody can complete with a keyboard. I like
          the ones where you can point at a number and say it moved.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-fg">
          What I&apos;m looking for
        </h2>
        <p>
          A team that ships to real users and reviews each other&apos;s work
          honestly. I want ownership of features end to end — from the schema to
          whatever the person on the other end actually sees.
        </p>
      </div>
    </article>
  );
}
