import SiteNav from "@/components/ui/site-nav";

/** Sticky but transparent on desktop: the strip reserves its own height, so
 *  nothing has to be padded around a fixed bar, while the nav inside it does
 *  the flat-to-pill move on scroll. All the glass lives on the nav there — the
 *  strip stays fully see-through so the grid paper behind it is never boxed in.
 *
 *  On a phone the glass moves out to THIS element instead: it is the only
 *  thing spanning the full viewport width, so it is the one that has to carry
 *  an edge-to-edge tint. Putting it on the inner, padded row (as the nav is)
 *  insets it and reads as a floating rectangle rather than a bar. */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 max-sm:border-b max-sm:border-ink/[0.06] max-sm:bg-surface/40 max-sm:backdrop-blur-sm max-sm:backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-3">
        <SiteNav />
      </div>
    </header>
  );
}
