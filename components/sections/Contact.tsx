import { Mail } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import ContactSocials from "@/components/sections/ContactSocials";
import VisitorCounter from "@/components/sections/VisitorCounter";
import { cn, cardSurface, displayHeading } from "@/lib/utils";

/** The closer. It gets the lamp because this is the last thing a recruiter
 *  sees and the one moment worth being memorable — and because sitting below
 *  the fold, it costs nothing against the LCP budget.
 *
 *  LampContainer is a client component; everything inside it here is still
 *  server-rendered, so the links are in the HTML for scrapers either way. */
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
    >
      <LampContainer className="min-h-[46rem] [--lamp-offset:8rem]">
        {/* transform, not margin: shifts this group up visually without
            changing its layout height, so LampContainer's flex-1 beam graphic
            (sized off the content block's height) doesn't move. */}
        <div className="flex -translate-y-6 flex-col items-center">
          {/* Solid text-fg, not the fg-to-muted gradient Aceternity ships: a
              script face is already thin strokes, and fading half of them to
              --color-muted against the lamp's glow read as a washed-out grey
              smear rather than a heading. */}
          <h2
            id="contact-heading"
            className={cn(displayHeading, "text-center md:text-7xl")}
          >
            Get in touch
          </h2>
          <ContactSocials />
          <VisitorCounter />
        </div>

        {/* Invisible clone of the removed subtitle line, margin bumped from
            mt-4 (its own) to mt-10 (what the icon row's margin used to be) so
            moving the icon row closer to the heading doesn't shorten the
            section — that would shift LampContainer's flex-1 beam graphic,
            which grows to fill whatever space this content block frees up. */}
        <p aria-hidden="true" className="invisible mt-10 max-w-md text-center font-serif">
          Open to full-time roles. Email is fastest — I read everything.
        </p>

        {/* Invisible spacer, same markup/size as the removed resume card: keeps
            LampContainer's flex-centered block at its original height so the
            heading/paragraph/icon row don't shift after the card's removal. */}
        <div
          aria-hidden="true"
          className={cn(cardSurface, "invisible mt-6 flex w-full max-w-2xl items-center gap-4 p-5")}
        >
          <Mail className="size-5 shrink-0" />
          <span>
            <span className="block font-semibold">Resume</span>
            <span className="block text-sm">Open PDF</span>
          </span>
        </div>
      </LampContainer>
    </section>
  );
}
