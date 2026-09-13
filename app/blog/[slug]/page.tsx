/**
 * Article route (`/blog/[slug]`).
 *
 * Pre-renders known slugs and 404s anything else.
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { BlogPostPage } from "@/ui/pages/blog/blog-post";
import { blogPosts, getBlogPost } from "@/ui/pages/blog/posts";
import { blogPostPath } from "@/lib/blog";

/**
 * Static params for every published article.
 *
 * @returns Slug objects consumed by the App Router.
 */
export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

/** Unknown slugs fall through to `not-found` instead of on-demand rendering. */
export const dynamicParams = false;

/**
 * Article metadata derived from the slug.
 *
 * @param params - Route params wrapping the article slug.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Artigo" };
  const url = blogPostPath(post.slug);

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
    twitter: { title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

/**
 * Renders a single notebook article.
 *
 * @param params - Route params wrapping the article slug.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
