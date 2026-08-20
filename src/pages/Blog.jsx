import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { allTags, filterPosts, posts } from '../lib/posts';
import { Container } from '../components/ui/Container';
import { PostCard } from '../components/ui/PostCard';
import { Reveal } from '../components/ui/Reveal';
import { SearchIcon } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { profile } from '../data/site';
import { cn } from '../lib/utils';
import { EASE, pageTransition } from '../lib/motion';

/**
 * Blog index: searchable, tag-filterable list of every published post.
 *
 * Filtering happens in memory — the whole archive ships with the bundle, so
 * there is no request to wait for and no backend to run.
 */
export default function Blog() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  usePageMeta({
    title: `Blog — ${profile.name}`,
    description: `Articles on software testing and quality engineering by ${profile.name}.`,
  });

  const visiblePosts = useMemo(
    () => filterPosts({ query, tag: activeTag }),
    [query, activeTag],
  );

  return (
    <motion.div {...pageTransition}>
      <Container className="py-20">
        <header className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Writing
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">blog</h1>
          <p className="mt-4 text-lg text-muted">
            Notes on testing, tooling and the parts of quality work that are not
            code. {posts.length} {posts.length === 1 ? 'post' : 'posts'} so far.
          </p>
        </header>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Search posts</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts…"
              className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            />
          </label>

          {allTags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {['all', ...allTags].map((tag) => {
                const isActive = activeTag === tag;

                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      aria-pressed={isActive}
                      className={cn(
                        'relative rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200',
                        isActive
                          ? 'border-transparent text-accent'
                          : 'border-line text-muted hover:border-accent hover:text-accent',
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="blog-tag-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                          transition={{ duration: 0.3, ease: EASE }}
                        />
                      )}
                      {tag === 'all' ? 'all' : `#${tag}`}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {visiblePosts.length > 0 ? (
          <Reveal.Group className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <Reveal.Item key={post.slug}>
                <PostCard post={post} />
              </Reveal.Item>
            ))}
          </Reveal.Group>
        ) : (
          <p className="mt-16 text-center text-muted">
            No posts match that search. Try a different term or clear the tag
            filter.
          </p>
        )}
      </Container>
    </motion.div>
  );
}
