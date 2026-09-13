import { BlogByline } from "./blog-byline";
import { BlogCover } from "./blog-cover";
import { blogPostPath, type BlogPost } from "@/lib/blog";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const href = blogPostPath(post.slug);
  if (featured) {
    return (
      <a className="blog-feature" href={href}>
        <BlogCover post={post} priority sizes="(max-width: 1100px) calc(100vw - 64px), 58vw" />
        <div className="blog-feature-copy">
          <span className="eyebrow">{post.track}</span>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <BlogByline post={post} />
        </div>
      </a>
    );
  }
  return (
    <a className="blog-card" href={href}>
      <BlogCover post={post} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 32vw" />
      <div className="blog-card-copy">
        <span className="eyebrow">{post.track}</span>
        <h2>{post.title}</h2>
        <BlogByline post={post} compact />
      </div>
    </a>
  );
}
