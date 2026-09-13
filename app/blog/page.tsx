import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { SitePage } from "@/components/layout/site-page";
import { blogPosts, pageCopy } from "@/lib/app-config";

const page = pageCopy.blog;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/blog" },
  openGraph: { title: page.title, description: page.description, url: "/blog" },
  twitter: { title: page.title, description: page.description },
};

export default function Page() {
  const [lead, rest] = page.lead.split("\n");

  return (
    <SitePage location={page.location} trail={{ current: page.title, href: "/blog" }} footerLine={page.footerLine}>
      <section className="section container blog-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.heading}</h1>
          </div>
          <p>{lead}{rest ? <><br />{rest}</> : null}</p>
        </div>
        <BlogIndex posts={blogPosts} />
      </section>
    </SitePage>
  );
}
