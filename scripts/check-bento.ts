// Run: node scripts/check-bento.ts
// The one thing that can silently break the bento layout is a row that does not
// add up to 6 — it shows as a hole in the grid. Assert the tiling directly.
import assert from "node:assert/strict";
import { bentoSpans } from "../lib/bento.ts";

for (let n = 1; n <= 12; n++) {
  const spans = bentoSpans(n);

  assert.equal(spans.length, n, `expected ${n} spans`);
  assert.ok(
    spans.every((s) => [2, 3, 4, 6].includes(s)),
    `n=${n}: span outside the class map: ${spans.join(",")}`,
  );

  // Every row except the last one the grid is still filling must total exactly 6.
  let row = 0;
  for (const s of spans) {
    row += s;
    assert.ok(row <= 6, `n=${n}: row overflows 6 (${spans.join(",")})`);
    if (row === 6) row = 0;
  }
  assert.equal(row, 0, `n=${n}: trailing gap of ${6 - row} (${spans.join(",")})`);
}

assert.deepEqual(bentoSpans(1), [6]);
assert.deepEqual(bentoSpans(3), [6, 3, 3]);
assert.deepEqual(bentoSpans(4), [6, 3, 3, 6]);

console.log("bento spans: every row fills 6 for n = 1..12 ✓");
