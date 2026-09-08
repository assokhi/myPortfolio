import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/content/types";
import { formatDate } from "@/lib/dates";
import BoldOnHover from "@/components/ui/bold-on-hover";

/** date · N min read — the one metadata line every post surface uses, so the
 *  three views cannot drift apart. Tags moved to pills, so they are opt-out. */
export function PostMetaLine({
  post,
  withTags = true,
}: {
  post: PostMeta;
  withTags?: boolean;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true" className="text-border">/</span>
      <span>{post.readingTime} min read</span>
      {withTags && post.tags.length ? (
        <>
          <span aria-hidden="true" className="text-border">/</span>
          <span className="text-accent-2">{post.tags.join(" · ")}</span>
        </>
      ) : null}
    </p>
  );
}

/** Uppercase category chips, the editorial-grid convention. They repeat the
 *  tags already in the metadata line, so wherever both appear the line drops
 *  its copy instead of reading the same words twice. */
export function TagPills({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full bg-surface px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** The circular arrow badge that sits in the corner of a card. */
function ArrowBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-fg transition-transform duration-200 group-hover:scale-110 ${className}`}
    >
      <ArrowUpRight className="size-4" />
    </span>
  );
}

/** The card's media block: the post's cover, or a flat lime panel when it has
 *  none. Decorative either way — the title next to it already names the post,
 *  so the alt text stays empty rather than repeating it. */
function Cover({
  post,
  sizes,
  className = "",
  priority = false,
}: {
  post: PostMeta;
  /** Tell next/image how wide the block actually renders, or it ships the
   *  full 1200px file to a 96px thumbnail. */
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-lime ${className}`}>
      {post.cover ? (
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : null}
    </div>
  );
}

/** The lead post on /blog. One post gets a full-width cover; the rest are
 *  index rows. */
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
        <Cover
          post={post}
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-full w-full"
        />
        {/* Pill and badge sit on the photo, so both carry their own solid
            ground — dark ink on lime, 14:1, whatever the image underneath. */}
        <span className="absolute left-5 top-5 inline-flex rounded-full bg-lime px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-on-bright">
          Featured
        </span>
        <ArrowBadge className="absolute bottom-5 right-5 bg-bg" />
      </div>

      <div className="mt-5 space-y-3">
        <TagPills tags={post.tags} />
        <h2 className="max-w-xl text-2xl font-semibold leading-tight text-fg sm:text-4xl">
          <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
            {/* The whole card is the click target; the link keeps the
                accessible name and the keyboard stop. */}
            <span className="absolute inset-0" aria-hidden="true" />
            <BoldOnHover text={post.title} from={600} />
          </Link>
        </h2>
        <PostMetaLine post={post} withTags={false} />
        <p className="max-w-2xl font-serif text-[1.05rem] leading-relaxed text-muted">
          {post.summary}
        </p>
      </div>
    </article>
  );
}

/** Editorial index: hairline rules instead of six stacked boxes. The number
 *  column is decorative order, so it is aria-hidden. */
export function PostList({ posts, startIndex = 1 }: { posts: PostMeta[]; startIndex?: number }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((p, i) => (
        <li key={p.slug}>
          <article className="group relative">
            <Link
              href={`/blog/${p.slug}`}
              className="grid grid-cols-[auto_auto_1fr_auto] items-baseline gap-x-4 gap-y-2 rounded-lg py-5 transition-colors sm:gap-x-6"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs text-border transition-colors group-hover:text-accent-2"
              >
                {String(startIndex + i).padStart(2, "0")}
              </span>

              <Cover
                post={p}
                sizes="96px"
                className="size-16 self-center rounded-xl sm:size-24"
              />

              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-fg transition-transform duration-200 group-hover:translate-x-1">
                  <BoldOnHover text={p.title} from={600} />
                </h3>
                <div className="mt-1.5">
                  <PostMetaLine post={p} />
                </div>
                <p className="mt-2 font-serif text-sm leading-relaxed text-muted">
                  {p.summary}
                </p>
              </div>

              <ArrowUpRight
                className="size-4 shrink-0 self-center text-muted opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** Home-page view: the newest post on top of a literal stack of cards, older
 *  ones peeking out beneath. Hover or keyboard focus lifts a card clear of the
 *  pile. DOM order is newest-first, so a screen reader gets the same ranking
 *  the stack draws. */
