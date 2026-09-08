import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { displayHeading } from "@/lib/utils";
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
    <div className="mx-auto w-full max-w-2xl px-5 pt-10 pb-20">
      <h1 className={displayHeading}>Popular posts</h1>
      <p className="mt-3 font-serif text-muted">
        Read counts, deduplicated per visitor per day.
      </p>

      <ViewsTable posts={posts.map((p) => ({ slug: p.slug, title: p.title }))} />
    </div>
  );
}
