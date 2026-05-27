"use client";

import { useState } from "react";

const TAGS = [
  "All",
  "Thought Leadership",
  "Artificial Intelligence",
  "Use Case",
] as const;

type Tag = (typeof TAGS)[number];

// Posts array — empty for now
const posts: {
  tag: Exclude<Tag, "All">;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
}[] = [];

export function BlogContent() {
  const [active, setActive] = useState<Tag>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.tag === active);

  return (
    <div className="bg-jva-deep min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-14 border-b border-jva-purple/15">
        <p className="text-jva-bright/70 text-xs tracking-[0.2em] uppercase font-display mb-5">
          Journal
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-black font-display leading-none tracking-tight text-jva-white">
            The Blog.
          </h1>
          <p className="text-jva-lavender/60 text-base leading-relaxed max-w-sm lg:pb-2">
            Real lessons on AI automation, workflow systems, and building
            a smarter business.
          </p>
        </div>
      </div>

      {/* Tag strip */}
      <div className="sticky top-16 z-20 bg-jva-deep/95 backdrop-blur-sm border-b border-jva-purple/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none">
            {TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === tag
                    ? "bg-jva-accent text-white"
                    : "border border-jva-purple/30 text-jva-lavender/60 hover:border-jva-purple/60 hover:text-jva-lavender"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
        {filtered.length === 0 ? (
          <EmptyState tag={active} />
        ) : (
          <PostGrid posts={filtered} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ tag }: { tag: Tag }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <div className="flex items-center gap-4 w-full max-w-xs">
        <div className="flex-1 h-px bg-jva-purple/20" />
        <span className="text-jva-purple/40 text-xs tracking-widest uppercase font-display">
          Soon
        </span>
        <div className="flex-1 h-px bg-jva-purple/20" />
      </div>
      <p className="text-jva-lavender/40 text-sm text-center leading-relaxed">
        {tag === "All"
          ? "No posts published yet."
          : `No posts in "${tag}" yet.`}
        <br />
        Something good is on its way.
      </p>
    </div>
  );
}

type Post = (typeof posts)[number];

function PostGrid({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-14">
      {/* Featured */}
      {featured && (
        <article className="group cursor-pointer border-b border-jva-purple/15 pb-14">
          <div className="flex items-center gap-3 mb-5">
            <TagPill tag={featured.tag} />
            <span className="text-jva-lavender/30 text-xs tracking-widest uppercase">
              Featured
            </span>
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black font-display text-jva-white leading-tight tracking-tight max-w-3xl mb-4 group-hover:text-jva-bright transition-colors duration-200">
            {featured.title}
          </h2>
          <p className="text-jva-lavender/70 text-lg leading-relaxed max-w-2xl mb-6">
            {featured.excerpt}
          </p>
          <div className="flex items-center gap-3 text-jva-lavender/40 text-sm">
            <span>{featured.date}</span>
            <span className="text-jva-purple/40">·</span>
            <span>{featured.readTime}</span>
            <span className="text-jva-bright ml-3 group-hover:translate-x-1 transition-transform duration-200">
              Read →
            </span>
          </div>
        </article>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {rest.map((post) => (
            <article
              key={post.title}
              className="group cursor-pointer flex flex-col border-t border-jva-purple/15 pt-6"
            >
              <TagPill tag={post.tag} />
              <h3 className="text-lg font-bold font-display text-jva-white mt-4 mb-3 leading-snug group-hover:text-jva-bright transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-jva-lavender/60 text-sm leading-relaxed flex-1 mb-5">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-jva-lavender/35 text-xs">
                <span>{post.date} · {post.readTime}</span>
                <span className="text-jva-bright group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function TagPill({ tag }: { tag: Exclude<Tag, "All"> }) {
  const colors: Record<Exclude<Tag, "All">, string> = {
    "Thought Leadership": "border-jva-accent/40 text-jva-bright/80",
    "Artificial Intelligence": "border-purple-500/40 text-purple-300/80",
    "Use Case": "border-amber-500/40 text-amber-400/80",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 border rounded-full text-xs font-medium ${colors[tag]}`}>
      {tag}
    </span>
  );
}
