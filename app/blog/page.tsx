/**
 * Blog index route (`/blog`).
 *
 * @packageDocumentation
 */

import type { Metadata } from "next";
import { Blog } from "@/ui/pages/blog/blog";
import { blogPage } from "@/ui/pages/blog/posts";

const page = blogPage;

/** Listing metadata for the community notebook. */
export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/blog" },
  openGraph: { title: page.title, description: page.description, url: "/blog" },
  twitter: { title: page.title, description: page.description },
};

/** Searchable list of published articles. */
export default function Page() {
  return <Blog />;
}
