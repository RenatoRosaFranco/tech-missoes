"use client";

import { useId, useMemo, useState } from "react";
import { BlogCard } from "./blog-card";
import { blogResultsLabel, blogTracks, filterBlogPosts, type BlogPost } from "@/lib/blog";

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("");
  const tracks = useMemo(() => blogTracks(posts), [posts]);
  const results = useMemo(() => filterBlogPosts(posts, query, track), [posts, query, track]);
  const browsing = !query.trim() && !track;
  const featured = browsing ? results[0] : undefined;
  const cards = browsing ? results.slice(1) : results;

  function clear() {
    setQuery("");
    setTrack("");
  }

  const count = results.length;
  const summary = blogResultsLabel(count, query, track);

  return (
    <div className="blog-layout">
      <form className="blog-sidebar" role="search" onSubmit={event => event.preventDefault()}>
        <span className="eyebrow">FILTRAR O CADERNO</span>
        <div className="blog-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <label className="sr-only" htmlFor={searchId}>Buscar artigos</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Buscar..."
            autoComplete="off"
          />
          {query ? <button type="button" className="blog-search-clear" onClick={() => setQuery("")}>Limpar</button> : null}
        </div>
        <div className="blog-tracks" role="group" aria-label="Filtrar por trilha">
          <button type="button" className="blog-track" aria-pressed={!track} onClick={() => setTrack("")}>Todas as trilhas</button>
          {tracks.map(item => (
            <button key={item} type="button" className="blog-track" aria-pressed={track === item} onClick={() => setTrack(item === track ? "" : item)}>{item}</button>
          ))}
        </div>
      </form>
      <div className="blog-main">
        <p className="blog-results" aria-live="polite">{summary}</p>
        {count ? (
          <>
            {featured ? <BlogCard post={featured} featured /> : null}
            {cards.length ? (
              <div className="blog-grid">
                {cards.map(post => <BlogCard key={post.slug} post={post} />)}
              </div>
            ) : null}
          </>
        ) : (
          <div className="blog-empty" role="status">
            <span className="step-number" aria-hidden="true">00</span>
            <div>
              <h2>Nenhum texto encontrado.</h2>
              <p>Tente outra palavra ou escolha outra trilha. O caderno continua no mesmo lugar.</p>
              <button type="button" className="text-link" onClick={clear}>Limpar busca <span aria-hidden="true">↑</span></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
