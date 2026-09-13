import { BlogIndex } from "@/ui/componentes/blog/blog-index";
import { SitePage } from "@/ui/componentes/site-page/site-page";
import { blogPage, blogPosts } from "./posts";

export function Blog() {
  const [lead, rest] = blogPage.lead.split("\n");

  return (
    <SitePage location={blogPage.location} trail={{ current: blogPage.title, href: "/blog" }} footerLine={blogPage.footerLine}>
      <section className="section container blog-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{blogPage.eyebrow}</span>
            <h1>{blogPage.heading}</h1>
          </div>
          <p>{lead}{rest ? <><br />{rest}</> : null}</p>
        </div>
        <BlogIndex posts={blogPosts} />
      </section>
    </SitePage>
  );
}
