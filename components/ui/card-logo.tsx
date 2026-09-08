import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/ui/tech-icon";

/** The 48×48 mark on the left of every card — experience, education, projects.
 *
 *  One component for all three so the sizing cannot drift: the container is
 *  fixed, and only what goes inside it changes. Three sizes, deliberately
 *  different:
 *
 *    container   48px   never changes, whatever it holds
 *    logo file   36px   object-contain, so a wordmark keeps its aspect ratio
 *    brand SVG   28px   a glyph reads at a smaller size than a wordmark
 *
 *  `fit: "cover"` is the exception: full-bleed artwork fills the whole box
 *  rather than sitting inside the padding.
 *
 *  Order of preference is image, then brand mark, then a monogram. That order
 *  matters — an entry with a logo file that fell through to the monogram is
 *  exactly the bug this replaced ("Scriptivox" has no Simple Icons entry, so
 *  it rendered as the text "Script"). */
export default function CardLogo({
  image,
  imageLight,
  brand,
  fit = "contain",
  shape = "square",
  className,
}: {
  /** Path under public/. Wins over `brand` when both are given. */
  image?: string;
  /** Day-theme variant, for a mark drawn for a dark ground. */
  imageLight?: string;
  /** A Simple Icons brand title, or any name — falls back to a monogram. */
  brand?: string;
  fit?: "cover" | "contain";
  /** "circle" is Projects' own treatment (a channel-icon look) — everywhere
   *  else (Experience, Education) keeps the default rounded square. */
  shape?: "square" | "circle";
  className?: string;
}) {
  const cover = fit === "cover";

  const imageClass = cn(
    cover ? "size-full object-cover" : "size-9 object-contain",
  );

  return (
    <span
      className={cn(
        // Fixed box, centred content, clipped so nothing can bleed past the
        // rounded corner.
        "flex size-12 shrink-0 items-center justify-center overflow-hidden border border-ink/[0.08] bg-ink/5",
        shape === "circle" ? "rounded-full" : "rounded-lg",
        className,
      )}
    >
      {image ? (
        <>
          {/* alt="" throughout: every card states the company, institution or
              project in text right beside this, so a described image would be
              the same name announced twice.

              width/height are the rendered size, so the box is reserved before
              the file arrives — these sit in long lists and a late-loading
              logo would otherwise shift every row below it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            width={cover ? 48 : 36}
            height={cover ? 48 : 36}
            loading="lazy"
            className={cn(imageClass, imageLight && "light:hidden")}
          />
          {imageLight ? (
            // The day-theme twin. Only one is ever displayed, so the hidden
            // one is never fetched.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageLight}
              alt=""
              width={cover ? 48 : 36}
              height={cover ? 48 : 36}
              loading="lazy"
              className={cn(imageClass, "night:hidden")}
            />
          ) : null}
        </>
      ) : (
        <BrandMark name={brand ?? ""} className="size-7" />
      )}
    </span>
  );
}
