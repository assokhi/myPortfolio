import SiteNav from "@/components/ui/site-nav";

/** Sticky but transparent: the strip reserves its own height, so nothing has to
 *  be padded around a fixed bar, while the nav inside it does the flat-to-pill
 *  move on scroll. All the glass lives on the nav — the strip stays fully
 *  see-through so the grid paper behind it is never boxed in. */
export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-3">
        <SiteNav />
      </div>
    </header>
  );
}
