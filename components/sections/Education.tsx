import { education } from "@/content/education";
import Section from "./Section";
import { formatRange } from "@/lib/dates";
import Image from "next/image";
import { University, School, MapPin } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import InViewVideo from "@/components/ui/in-view-video";
import { existsSync } from "node:fs";
import { join } from "node:path";

/** Line icons rather than real institution logos: no asset pipeline, no
 *  trademark question, and they stay sharp at any size on any background —
 *  a scraped PNG crest would fail all three. */
const ICON = { university: University, school: School } as const;

/** The gutter the narrowed cards leave on wide screens, filled with one film
 *  about school. Drop any file at this path and it shows up; leave it out and
 *  the column is not rendered at all, so a missing file can never render as a
 *  broken element.
 *
 *  An mp4 rather than a gif on purpose: a gif of this length would be tens of
 *  megabytes and could not be paused, and the clip has to pause when it scrolls
 *  out of view. */
const FILM_SRC = "/education/dead.mp4";
const hasFilm = existsSync(join(process.cwd(), "public", FILM_SRC));

/** Aceternity's Tracing Beam down the left, cards to the right. The logo tile
 *  lives inside the card rather than out in the gutter: the beam is already
 *  the vertical line, and two of them fight each other.
 *
 *  Geist throughout — Sans at 600 for the institution and 400 for the
 *  qualification, Mono for the dates/location/grade row so the metadata still
 *  reads as metadata. Weight and colour carry the hierarchy, so nothing has to
 *  be decorated to stand out.
 *
 *  Grades and coursework sit in the card itself — a recruiter skimming for a
 *  CGPA should not have to open anything to find it. */
export function EducationList() {
  // max-w-lg, not the section's full max-w-7xl: an education row is one short
  // line of text, and stretched across 1280px it reads as a mostly empty bar.
  // Narrower than it needs to be on purpose — the leftover gutter is the film.
  return (
    <div className="flex items-start gap-8">
      <TracingBeam className="max-w-lg">
        <ol className="space-y-2">
          {education.map((e) => {
            const Icon = ICON[e.kind ?? "university"];
            const hasNotes = Boolean(e.notes?.length);

            return (
              <li
                key={`${e.institution}-${e.start}`}
                className="rounded-xl border border-ink/[0.06] bg-ink/[0.02] p-4 transition-colors duration-200 hover:border-ink/15 hover:bg-ink/[0.04]"
              >
                <div className="flex items-center gap-4">
                  {/* 56px, not 80px: the tile is the tallest thing in the row, so
                      it alone sets the card's floor height. Logo tiles go white
                      because institution marks are drawn for paper and mostly
                      ship on a white or transparent ground — dropped onto
                      #0a0a0b they either vanish or show as a white box anyway.
                      The icon fallback keeps the dark tile. */}
                  <span
                    aria-hidden="true"
                    className={
                      e.logo
                        ? "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink/[0.08] bg-white p-1"
                        : "flex size-14 shrink-0 items-center justify-center rounded-lg border border-ink/[0.08] bg-surface text-accent-2"
                    }
                  >
                    {e.logo ? (
                      <Image
                        src={e.logo}
                        alt=""
                        width={56}
                        height={56}
                        className="size-full object-contain"
                      />
                    ) : (
                      <Icon className="size-6" strokeWidth={1.5} />
                    )}
                  </span>

                  {/* One column, not two. The date/location stack floated in a
                      right-hand column with nothing to align to, and being two
                      lines tall it also set the row height. Inline under the
                      qualification, it reads as one block and the card collapses
                      to the height of its content. */}
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold tracking-tight text-fg">
                      {e.institution}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-muted">
                      {e.qualification}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted/60">
                      <span>{formatRange(e.start, e.end)}</span>
                      {e.location ? (
                        <span className="flex items-center gap-1">
                          <MapPin
                            className="size-3 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          {e.location}
                        </span>
                      ) : null}
                      {/* Plain text, not a pill: a note is as likely to be a
                          sentence of coursework as a two-word grade, and a long
                          sentence in a pill wraps into a blob. */}
                      {hasNotes
                        ? e.notes!.map((n) => <span key={n}>{n}</span>)
                        : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </TracingBeam>

      {/* Landscape tablet and up only: below 1024px the cards already use the
          full width, so there is no gutter to fill — and a hidden parent never
          intersects, so the clip also never plays or downloads there. */}
      {hasFilm ? (
        <div className="hidden shrink-0 lg:block">
          <InViewVideo src={FILM_SRC} className="w-[33rem]" />
        </div>
      ) : null}
    </div>
  );
}

export default function Education() {
  return (
    <Section id="education" title="Education">
      <EducationList />
    </Section>
  );
}
