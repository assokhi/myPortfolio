import BottomNavBar from "@/components/ui/bottom-nav-bar";

/** Sticky but transparent: the strip reserves its own height, so nothing has to
 *  be padded around a fixed bar, while the pill inside it reads as floating.
 *  The glass lives on the pill itself — the strip stays fully see-through. */
export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-3">
        <BottomNavBar />
      </div>
    </header>
  );
}
