import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/dates";
import { profile } from "@/content/profile";
import { displayHeading } from "@/lib/utils";

/** One real HTML file per post is generated at deploy time: instant loads for
 *  visitors, plain HTML for search engines. */
export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.meta.title,
    description: post.meta.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.summary,
      publishedTime: post.meta.date,
      authors: [profile.name],
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All posts
      </Link>

      <article className="mt-8">
        <h1 className={displayHeading}>
          {post.meta.title}
        </h1>
        <p className="mt-2 font-mono text-xs text-muted">
          <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
          {post.meta.tags.length ? ` · ${post.meta.tags.join(", ")}` : ""}
        </p>

        {/* Typography for Markdown output, without pulling in a plugin. */}
        <div className="mt-8 space-y-5 font-serif text-[1.05rem] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg [&_h3]:pt-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-fg [&_li]:ml-5 [&_ol]:list-decimal [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:text-fg [&_ul]:list-disc">
          <MDXRemote source={post.body} />
        </div>
      </article>
    </div>
  );
}
