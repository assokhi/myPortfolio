import { GraduationCap, School } from "lucide-react";
import { education } from "@/content/education";
import { courses } from "@/content/courses";
import { books } from "@/content/books";
import { formatRange } from "@/lib/dates";
import { cn, cardSurface, heading2, pageShell } from "@/lib/utils";
import CardLogo from "@/components/ui/card-logo";

/** Same flat-row pattern as Experience, on purpose: two sections that behave
 *  differently for no reason is a thing a reader has to learn twice. Nothing
 *  collapses here either — the notes were the only thing behind the toggle,
 *  and a row with no notes used to render as a different element entirely.
 *  One shape now, notes or not. */
export default async function Education({ id = "education" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("reveal", pageShell)}
    >
      <h2 id={`${id}-heading`} className={cn(heading2, "mb-8 block")}>
        Education
      </h2>

      {/* Same rhythm as Experience: no inter-row gap, each row's own pt-6/pb-6
          centres the hairline. */}
      <div>
        {education.map((entry) => {
          const Icon = entry.kind === "school" ? School : GraduationCap;

          return (
            <div
              key={`${entry.institution}-${entry.qualification}`}
              className={cn(cardSurface, "reveal pb-6")}
            >
              <div className="flex items-center gap-4">
                {entry.logo ? (
                  // bg-white: the PEC crest is a transparent PNG drawn for a
                  // light backing — the site's own dark tint behind it turned
                  // its yellow/red into a muddy smear, so it gets a real white
                  // circle instead. Hill Top's crest is already opaque, so this
                  // is a no-op for that row.
                  <CardLogo
                    image={entry.logo}
                    shape="circle"
                    className="size-14 bg-white [&_img]:size-11"
                  />
                ) : (
                  // No logo file: the same 56px box with a Lucide glyph at the
                  // brand-mark size, so a row without a crest lines up with the
                  // rows that have one.
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-ink/[0.08] bg-ink/5">
                    <Icon size={26} aria-hidden="true" className="text-muted" />
                  </span>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-fg">{entry.institution}</p>
                  <p className="text-sm text-muted">
                    {entry.qualification}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </p>
                </div>

                <time className="ml-auto hidden shrink-0 text-sm text-muted sm:block">
                  {formatRange(entry.start, entry.end)}
                </time>
              </div>

              {entry.notes?.length ? (
                <ul className="mt-5 space-y-3">
                  {entry.notes.map((note) => (
                    <li
                      key={note}
                      className="relative pl-6 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.45rem] left-0 size-2 rounded-full bg-accent-2"
                      />
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Courses, not certifications: no credential ID and no verify link,
          so these get their own bento row instead of the Certifications
          card, which shows nothing rather than a badge nobody can check. */}
      {courses.length ? (
        <div className="mt-4">
          <p className="mb-3 text-sm font-medium text-fg">Courses</p>
          <div className="grid gap-8 sm:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.name}
                className={cn(cardSurface, "reveal overflow-hidden p-0")}
              >
                {/* No real thumbnail file exists for any of these — a
                    two-tone diagonal wash with the title set on top is
                    DeepLearning.AI's own course-tile look, not a stand-in
                    graphic invented for this page. */}
                <div
                  className="relative aspect-[16/10] w-full"
                  style={{
                    background: `linear-gradient(135deg, ${course.gradient[0]}, ${course.gradient[1]})`,
                  }}
                >
                  <p className="absolute inset-x-4 bottom-4 text-lg font-bold leading-snug text-white [text-shadow:0_1px_8px_rgb(0_0_0_/_0.35)]">
                    {course.name}
                  </p>
                  <CardLogo
                    brand="Coursera"
                    shape="circle"
                    className="absolute right-3 top-3 size-8 bg-white"
                  />
                </div>

                <p className="pt-4 text-sm text-muted">
                  {course.issuer}
                  {course.instructor ? ` · ${course.instructor}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {books.length ? (
        <div className="mt-4">
          {books.map((b) => (
            <div
              key={`${b.title}-${b.author}`}
              className={cn(cardSurface, "pb-4")}
            >
              <p className="font-semibold text-fg">{b.title}</p>
              <p className="text-sm text-muted">{b.author}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
