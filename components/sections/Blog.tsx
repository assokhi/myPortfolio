import Link from "next/link";
import type { PostMeta } from "@/content/types";
import { formatDate } from "@/lib/dates";
import Section from "./Section";
import BoldOnHover from "@/components/ui/bold-on-hover";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="space-y-4">
      {posts.map((p) => (
        <li key={p.slug}>
          <article className="rounded-xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/60">
            <h3 className="font-semibold text-fg">
              <Link
                href={`/blog/${p.slug}`}
                className="underline-offset-4 hover:underline"
              >
                <BoldOnHover text={p.title} />
              </Link>
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              {p.tags.length ? ` · ${p.tags.join(", ")}` : ""}
            </p>
            <p className="mt-3 font-serif text-sm leading-relaxed text-muted">{p.summary}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** Hidden entirely when there are no posts — an empty blog reads worse than
 *  no blog. */
export default function Blog({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <Section
      id="blog"
      title="Writing"
      intro="Things I worked out the hard way and wrote down."
      href="/blog"
      hrefLabel="All posts"
    >
      <PostList posts={posts.slice(0, 3)} />
    </Section>
  );
}
