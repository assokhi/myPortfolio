"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/** A looping clip with no player chrome that runs only while it is on screen.
 *
 *  Same IntersectionObserver pattern as the nav's scroll spy. The threshold is
 *  half the clip: stop scrolling on the section and it plays, scroll far enough
 *  that less than half of it is left and it pauses. Half is the "past a point"
 *  line — a threshold of 0 keeps it playing off the bottom edge, and 1 stops it
 *  the moment a single pixel clips.
 *
 *  It starts muted because that is the only autoplay any browser allows; sound
 *  needs a user gesture. So the one control is a mute toggle, a real <button>
 *  rather than a click handler on the video, because it has to be reachable by
 *  keyboard and announce its state. Unmuting sticks — scroll away and back and
 *  it resumes with sound.
 *
 *  `prefers-reduced-motion` keeps the clip and drops only the autoplay: the
 *  preference is against motion starting on its own, not against the clip
 *  existing. Nothing plays or streams until the toggle is pressed.
 *
 *  Hidden parents (`hidden lg:block`) never intersect, so on phones this stays
 *  paused and, with preload="none", undownloaded.
 *
 *  The edges are a mask rather than a border: a hard rounded rectangle framed
 *  the clip as a second card competing with the real ones, where a radial fade
 *  lets it dissolve into the page. Mask, not a gradient overlay, because the
 *  overlay would have to know the page background and would break the moment
 *  the theme flips. */
const FADE = "radial-gradient(ellipse at center, #000 30%, transparent 78%)";

export default function InViewVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // play() rejects if the element is torn down mid-promise; the clip is
        // decorative, so a failure to start is not worth surfacing.
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    // Under reduced motion nothing has started yet, so the toggle is also the
    // play gesture — otherwise unmuting a paused clip would still be silent.
    if (el.paused) void el.play().catch(() => {});
  };

  return (
    <div className={cn("group relative", className)}>
      <video
        ref={ref}
        src={src}
        className="size-full object-cover"
        // Opaque only to 30% of the radius and fully gone by 78%, so the fade
        // is most of the frame rather than a soft edge. Both spellings:
        // Safari still wants the prefixed property.
        style={{
          maskImage: FADE,
          WebkitMaskImage: FADE,
        }}
        muted
        loop
        playsInline
        preload={reduced ? "none" : "metadata"}
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Unmute clip" : "Mute clip"}
        aria-pressed={!muted}
        className="absolute right-2 bottom-2 rounded-md bg-ink/60 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        {muted ? (
          <VolumeX className="size-4" strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Volume2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
