import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { cn, heading1, pageShell, proseMeasure } from "@/lib/utils";
import ViewsTable from "@/components/sections/ViewsTable";

export const metadata: Metadata = {
  title: "Views",
  // Unlisted, and excluded from the sitemap. Worth being blunt about what that
  // is and is not: noindex keeps this out of search results, it does not keep
  // anyone with the URL out of the page. There is nothing sensitive here — if
  // that ever changes, this needs a real check in worker.ts, not a meta tag.
  robots: { index: false, follow: false },
  alternates: { canonical: "/views" },
};

export default async function ViewsPage() {
  // Titles come from the MDX files at build time; the counts are fetched in the
  // browser. That split is deliberate — the page is still readable, and still
  // lists every post, when the counter backend is unreachable.
  const posts = await getPosts();

  return (
    <div className={pageShell}>
      <h1 className={heading1}>Popular posts</h1>
      <p className={cn("mt-3 text-muted", proseMeasure)}>
        Read counts, deduplicated per visitor per day.
      </p>

      <ViewsTable posts={posts.map((p) => ({ slug: p.slug, title: p.title }))} />
    </div>
  );
}
