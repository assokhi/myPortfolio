/**
 * Screenshots every project's live URL into public/projects/.
 *
 * Run by .github/workflows/project-shots.yml once a week, and by hand with:
 *
 *   npx playwright install --with-deps chromium
 *   node scripts/shoot-projects.ts
 *
 * Why this rather than a screenshot API: the output is a committed file, so the
 * project cards cost no third-party request, no API key and no per-call fee,
 * and the image is cached by the same rules as everything else in public/.
 *
 * A project whose site is down is skipped, loudly, and the previous screenshot
 * stays in place — a stale image beats a broken one on a page whose job is to
 * make the work look real.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { projects } from "../content/projects.ts";

const OUT_DIR = path.join(process.cwd(), "public", "projects");

/** Desktop and phone. Both are committed so a card can show either without a
 *  second run. */
const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

/** Long enough for a cold start on a free tier, short enough that one dead
 *  project cannot hang the whole job. */
const TIMEOUT_MS = 30_000;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
let failures = 0;

for (const project of projects) {
  const slug = slugify(project.name);

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
      // Some sites serve a different layout to headless agents. Ask for the
      // page a person would get.
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      // Screenshots of a site mid-animation are the usual cause of a blurry or
      // half-drawn capture.
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    try {
      await page.goto(project.href, {
        waitUntil: "networkidle",
        timeout: TIMEOUT_MS,
      });
      // networkidle can fire before webfonts have swapped in.
      await page.waitForTimeout(1200);

      const file = path.join(OUT_DIR, `${slug}-${viewport.name}.webp`);
      const buffer = await page.screenshot({
        type: "jpeg",
        quality: 82,
        // Above the fold only. A full-page capture of a long landing page
        // renders as an unreadable sliver in a card.
        fullPage: false,
      });
      // Playwright writes jpeg or png; the card wants the smaller file, so the
      // extension follows the encoder actually used.
      await writeFile(file.replace(/\.webp$/, ".jpg"), buffer);
      console.log(`OK   ${project.name} (${viewport.name})`);
    } catch (error) {
      failures++;
      console.error(
        `FAIL ${project.name} (${viewport.name}) — ${
          error instanceof Error ? error.message : error
        }`,
      );
    } finally {
      await context.close();
    }
  }
}

await browser.close();

// A failure is reported but does not fail the job: one unreachable project
// must not stop the others from being committed.
console.log(
  failures === 0
    ? "\nAll screenshots captured."
    : `\n${failures} capture(s) failed; previous images left in place.`,
);
