import { notFound } from "next/navigation";
import { BlogByline } from "@/ui/components/blog/blog-byline";
import { BlogCard } from "@/ui/components/blog/blog-card";
import { BlogCover } from "@/ui/components/blog/blog-cover";
import { SitePage } from "@/ui/components/site-page/site-page";
import { blogPostPath } from "@/lib/blog";
import { getSiteUrl, siteName } from "@/lib/site";
import "@/ui/components/blog/blog.scss";
import { blogPosts, getBlogPost } from "./posts";

export function BlogPostPage({ slug }: { slug: string }) {
  const post = getBlogPost(slug);
  if (!post) notFound();
  const others = blogPosts.filter(item => item.slug !== post.slug);
  const siteUrl = getSiteUrl();

  return (
    <SitePage
      location="CADERNO DA COMUNIDADE"
      trail={{ current: post.title, href: blogPostPath(post.slug), parent: { label: "Blog", href: "/blog" } }}
      footerLine="O que a gente aprende, a gente escreve."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            inLanguage: "pt-BR",
            image: `${siteUrl}${post.cover}`,
            timeRequired: `PT${post.readingMinutes}M`,
            author: { "@type": "Person", name: post.author.name },
            publisher: { "@type": "Organization", name: siteName, url: siteUrl },
            mainEntityOfPage: `${siteUrl}${blogPostPath(post.slug)}`,
            articleSection: post.track,
          }),
        }}
      />
      <article className="article-page">
        <figure className="container article-cover">
          <BlogCover post={post} hero priority sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 112px)" />
        </figure>
        <div className="container">
          <div className="article-copy">
            <header className="article-head">
              <span className="eyebrow">{post.track}</span>
              <h1>{post.title}</h1>
              <p className="article-lead">{post.excerpt}</p>
              <BlogByline post={post} />
            </header>
            <div className="article-body">
              {post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <a className="text-link article-back" href="/blog">Todos os artigos <span aria-hidden="true">↑</span></a>
          </div>
        </div>
        {others.length ? (
          <aside className="container article-more" aria-label="Outros artigos">
            <span className="eyebrow">CONTINUAR LENDO</span>
            <div className="blog-grid">
              {others.map(item => <BlogCard key={item.slug} post={item} />)}
            </div>
          </aside>
        ) : null}
      </article>
    </SitePage>
  );
}
