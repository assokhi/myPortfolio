import { profile } from "@/content/profile";
import NoiseBackground from "@/components/ui/noise-background";
import SocialLinks from "@/components/ui/SocialLinks";
import FadeInText from "@/components/ui/fade-in-text";
import ScrollCue from "@/components/ui/scroll-cue";

// The background is CSS gradients plus an inline SVG grain — no image request,
// so it cannot be the LCP element and cannot shift the layout.
export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      // -mt-19/pt-19 is the 76px header height: the hero is pulled up so its
      // background runs behind the navbar instead of starting below it, which
      // left a hard seam under the pill. The matching padding keeps the content
      // exactly where it was.
      //
      // min-h-svh is what stops the next section showing under the hero at rest.
      // svh, not vh: on mobile `100vh` is the tallest the viewport ever gets, so
      // the browser chrome would cover the bottom of the hero and eat the cue.
      className="hero-sticky sticky top-0 z-0 isolate -mt-19 flex min-h-svh flex-col overflow-hidden pt-19"
    >
      <NoiseBackground />

      {/* The three delays read top to bottom: name, role, summary. They are
          deliberately short — the h1 is the LCP element, and every second of
          delay before it paints is a second on the performance budget. */}
      <div className="hero-recede mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-20">
        <FadeInText
          as="h1"
          id="hero-heading"
          text={profile.name}
          once
          className="text-4xl font-semibold tracking-tight text-fg sm:text-6xl"
        />
        <FadeInText
          as="p"
          text={profile.role}
          delay={0.12}
          once
          className="mt-3 text-xl font-medium text-fg sm:text-2xl"
        />
        {/* Measured, not guessed: at 20px Times italic this sentence wraps to
            four lines anywhere from 384px to ~500px wide, three above that and
            five below. max-w-md (448px) sits in the middle of that band rather
            than on its edge. Rewrite the intro and the count changes. */}
        <FadeInText
          as="p"
          text={`"${profile.intro}"`}
          delay={0.24}
          once
          className="mt-5 max-w-md font-serif text-lg italic leading-relaxed text-fg sm:text-xl"
        />

        <SocialLinks className="mt-8" />
      </div>

      {/* Also .hero-recede, so the cue fades out with the rest of the hero as
          the page slides over it instead of hovering there after you scroll. */}
      <ScrollCue className="hero-recede mb-8 self-center" />
    </section>
  );
}
