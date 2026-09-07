import Image from "next/image";
import { BrandMark, brandHex } from "./tech-icon";
import { cn } from "@/lib/utils";

/** The visual header on a bento cell: a dot grid and a wash in the company's
 *  own colour, with either a supplied image or the generated brand mark on
 *  top. `fit="contain"` is for logo files — the grid stays visible behind
 *  them; `cover` is for full-bleed artwork. Either way the panel is a fixed
 *  height, so it cannot shift the layout while it loads. */
export default function IntroPanel({
  brand,
  src,
  srcLight,
  alt,
  fit = "cover",
  className,
}: {
  brand: string;
  src?: string;
  /** A day-theme version of `src`, for logo files drawn for a dark ground.
   *  Defaults to `src`, which is right for any mark that reads on either. */
  srcLight?: string;
  alt?: string;
  fit?: "cover" | "contain";
  className?: string;
}) {
  const hex = brandHex(brand);

  return (
    <div
      className={cn(
        "relative h-40 shrink-0 overflow-hidden rounded-xl bg-bg",
        className,
      )}
    >
      {/* Dot grid, the way the reference panels are built. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* A wash in the company's own colour, so cards read apart at a glance. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 90% at 50% 115%, ${
            hex ?? "var(--color-fg)"
          }38 0%, transparent 70%)`,
        }}
      />

      {src ? (
        /* Two files only when the logo needs them. The theme is a CSS
           attribute rather than React state, so the swap has to be CSS too:
           both are lazy and exactly one is displayed, so the hidden one is
           never fetched, and display:none keeps it out of the accessibility
           tree — the alt is announced once either way. */
        (srcLight && srcLight !== src ? [src, srcLight] : [src]).map(
          (source, i, all) => (
            <Image
              key={source}
              src={source}
              alt={alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                fit === "contain" ? "object-contain p-6" : "object-cover",
                all.length === 2 && (i === 0 ? "light:hidden" : "night:hidden"),
              )}
            />
          ),
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          {hex ? (
            <BrandMark name={brand} className="size-14 drop-shadow-lg" />
          ) : (
            // No brand mark: the name itself is the panel, set large. Beats a
            // four-letter stub floating in an empty box.
            <span className="text-center font-mono text-lg font-semibold tracking-tight text-fg/70">
              {brand}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
