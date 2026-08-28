/** Column spans for a 6-column bento grid.
 *
 *  The rhythm is 6/3/3: the lead tile takes a full row — it is the newest role
 *  and the one a recruiter reads — and the next two share the row beneath it as
 *  equal halves, which is what sibling roles should look like. It tiles exactly
 *  however many tiles it is given, and the final tile is widened to whatever its
 *  row has left, which is the only place a gap could otherwise appear.
 *
 *  Returns spans out of 6; see COL_SPAN in Experience.tsx for the class map
 *  (Tailwind cannot see a class name built by string interpolation). */
export function bentoSpans(count: number): number[] {
  const RHYTHM = [6, 3, 3];
  const spans = Array.from(
    { length: count },
    (_, i) => RHYTHM[i % RHYTHM.length],
  );

  let used = 0;
  for (let i = 0; i < spans.length; i++) {
    if (i === spans.length - 1) spans[i] = 6 - used;
    used = (used + spans[i]) % 6;
  }
  return spans;
}
