import Image from "next/image";
import type { BlogPost } from "@/ui/pages/blog/posts";

export function BlogCover({
  post,
  priority = false,
  sizes,
  hero = false,
}: {
  post: BlogPost;
  priority?: boolean;
  sizes: string;
  hero?: boolean;
}) {
  return (
    <div className={hero ? "blog-cover blog-cover-hero" : "blog-cover"}>
      <Image src={post.cover} alt={post.coverAlt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
