import SiteNav from "@/components/ui/site-nav";

/** Sticky but fully transparent on desktop: the nav below is flat text with
 *  no fill of its own, so this strip stays see-through and never boxes in the
 *  page scrolling underneath it.
 *
 *  On a phone the nav collapses to two controls, which is not enough to
 *  separate a sticky bar from the content sliding under it — so the tint
 *  lives on THIS element instead, the only thing spanning the full viewport
 *  width. Putting it on the inner, padded row would inset it and read as a
 *  floating rectangle rather than a bar. */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 max-sm:border-b max-sm:border-ink/[0.06] max-sm:bg-surface/40 max-sm:backdrop-blur-sm max-sm:backdrop-saturate-150">
      <SiteNav />
    </header>
  );
}
