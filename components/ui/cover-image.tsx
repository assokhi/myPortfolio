"use client";

/** A cover image that gets out of the way when it cannot load.
 *
 *  Every project tile paints its tinted wordmark first and lays the image over
 *  the top, so a file that 404s or a visitor with no connection sees the same
 *  wordmark card as a project with no image at all — never the browser's
 *  broken-image glyph. Removing the element is the whole fallback: no state, no
 *  re-render, and the layer underneath was already painted. */
export default function CoverImage({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={1600}
      height={900}
      loading="lazy"
      onError={(e) => e.currentTarget.remove()}
      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );
}
