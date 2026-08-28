import { cn } from "@/lib/utils";

/* Scroll cue for the bottom of the hero.
 *
 * A real <a> to the next section, not a decorative div: it works with the
 * keyboard, it works with JS off, and a screen reader announces it as the skip
 * it is. The wheel dot animates in plain CSS (see `.scroll-cue-dot` in
 * globals.css) — an infinitely repeating motion.div would drag the whole hero
 * into a client boundary and keep a JS animation running for the life of the
 * page, for a 4px dot.
 */
export default function ScrollCue({
  href = "#about",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label="Scroll to the About section"
      className={cn(
        "group flex flex-col items-center gap-2 rounded-full py-2 text-muted transition-colors duration-200 hover:text-fg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-5.5 justify-center rounded-full border border-border pt-1.5 transition-colors duration-200 group-hover:border-accent-2/60"
      >
        <span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span className="text-[0.7rem] font-medium tracking-widest uppercase">
        Scroll
      </span>
    </a>
  );
}
