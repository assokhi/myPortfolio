import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* Aceternity's "hover border gradient" / "moving border" idea, rebuilt in CSS.
 *
 * The published versions run a requestAnimationFrame loop through
 * useAnimationFrame for the life of the page, which means a client boundary and
 * a JS animation that never stops. A registered @property angle does the same
 * rotation on the compositor for nothing — and, unlike the JS version, it stops
 * when the visitor asks for reduced motion. Keyframes are in globals.css.
 *
 * The border is two backgrounds: a flat fill clipped to padding-box over a
 * rotating conic gradient clipped to border-box. The 1px transparent border is
 * what the gradient shows through, so it is load-bearing, not decoration.
 */
export default function ExploreButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "explore-btn group relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-fg",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
