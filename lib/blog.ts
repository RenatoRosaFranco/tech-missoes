/**
 * Community notebook (blog) helpers.
 *
 * Paths, reading labels, distinct tracks, and accent-insensitive filtering.
 *
 * @packageDocumentation
 */

import type { BlogPost } from "@/ui/paginas/blog/posts";

export type { BlogAuthor, BlogPost } from "@/ui/paginas/blog/posts";

/**
 * Builds the internal path of an article.
 *
 * @param slug - URL identifier.
 * @returns Path in the form `/blog/{slug}`.
 */
export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}

/**
 * Formats the estimated reading time.
 *
 * @param minutes - Duration in minutes.
 * @returns UI-ready label, for example `"8 min de leitura"`.
 */
export function readingLabel(minutes: number) {
  return `${minutes} min de leitura`;
}

/**
 * Normalizes text for search: lowercase and without diacritics.
 *
 * @param value - Original text.
 */
function fold(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

/**
 * Lists distinct article tracks, in first-seen order.
 *
 * @param posts - Articles to inspect.
 * @returns Track names without duplicates.
 */
export function blogTracks(posts: BlogPost[]) {
  return [...new Set(posts.map(post => post.track))];
}

/**
 * Filters articles by track and query, ignoring accents and case.
 *
 * The query is matched against title, excerpt, track, authorship, and body.
 *
 * @param posts - Full collection.
 * @param query - Free-text search term.
 * @param track - Track name, or an empty string for all tracks.
 */
export function filterBlogPosts(posts: BlogPost[], query: string, track: string) {
  const needle = fold(query.trim());
  return posts.filter(post => {
    if (track && post.track !== track) return false;
    if (!needle) return true;
    return fold([post.title, post.excerpt, post.track, post.author.name, post.author.role, ...post.paragraphs].join(" ")).includes(needle);
  });
}

/**
 * Summarizes search results for the listing header.
 *
 * @param count - Number of articles after filtering.
 * @param query - Current search term.
 * @param track - Selected track, if any.
 */
export function blogResultsLabel(count: number, query: string, track: string) {
  const term = query.trim();
  const word = count === 1 ? "texto" : "textos";
  if (!count) return "Nenhum texto encontrado.";
  if (track && term) return `${count} ${word} em ${track} para “${term}”.`;
  if (track) return `${count} ${word} em ${track}.`;
  if (term) return `${count} ${word} para “${term}”.`;
  return `${count} ${word} no caderno.`;
}
