import type { BlogPost } from "@/lib/app-config-types";

export type { BlogAuthor, BlogPost } from "@/lib/app-config-types";

export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}

export function readingLabel(minutes: number) {
  return `${minutes} min de leitura`;
}

function fold(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function blogTracks(posts: BlogPost[]) {
  return [...new Set(posts.map(post => post.track))];
}

export function filterBlogPosts(posts: BlogPost[], query: string, track: string) {
  const needle = fold(query.trim());
  return posts.filter(post => {
    if (track && post.track !== track) return false;
    if (!needle) return true;
    return fold([post.title, post.excerpt, post.track, post.author.name, post.author.role, ...post.paragraphs].join(" ")).includes(needle);
  });
}

export function blogResultsLabel(count: number, query: string, track: string) {
  const term = query.trim();
  const word = count === 1 ? "texto" : "textos";
  if (!count) return "Nenhum texto encontrado.";
  if (track && term) return `${count} ${word} em ${track} para “${term}”.`;
  if (track) return `${count} ${word} em ${track}.`;
  if (term) return `${count} ${word} para “${term}”.`;
  return `${count} ${word} no caderno.`;
}
