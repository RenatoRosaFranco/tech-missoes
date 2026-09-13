import { readingLabel } from "@/lib/blog";
import type { BlogPost } from "@/ui/pages/blog/posts";

function Clock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function BlogByline({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  return (
    <div className={compact ? "blog-byline blog-byline-compact" : "blog-byline"}>
      <span className="author-avatar" aria-hidden="true">{post.author.initials}</span>
      <div className="blog-byline-copy">
        <strong>{post.author.name}</strong>
        {compact ? null : <span>{post.author.role}</span>}
      </div>
      <div className="blog-byline-meta">
        {compact ? null : <time dateTime={post.date}>{post.dateLabel}</time>}
        <span className="read-time"><Clock /> {readingLabel(post.readingMinutes)}</span>
      </div>
    </div>
  );
}
