import data from "./blog.json";

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  track: string;
  readingMinutes: number;
  cover: string;
  coverAlt: string;
  author: BlogAuthor;
  paragraphs: string[];
};

export const blogPage = data;
export const blogPosts = data.posts as BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
