import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPostBySlug, getRelatedPosts } from '../lib/posts';
import { Container } from '../components/ui/Container';
import { Tag } from '../components/ui/Tag';
import { PostCard } from '../components/ui/PostCard';
import { Reveal } from '../components/ui/Reveal';
import { ReadingProgress } from '../components/ui/ReadingProgress';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate, toBanglaDigits } from '../lib/utils';
import { ui } from '../data/ui';
import { pageTransition } from '../lib/motion';
import { profile } from '../data/site';

/**
 * A single article.
 *
 * The body is markdown rendered to HTML at build time by lib/posts.js. Since
 * every post is authored in this repository, injecting it with
 * dangerouslySetInnerHTML is safe — there is no third-party input.
 */
export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  usePageMeta({
    title: post ? `${post.title} — ${profile.name}` : ui.blog.notFoundTitle,
    description: post?.excerpt,
  });

  // Unknown slug: hand off to the 404 route rather than rendering an empty page.
  if (!post) return <Navigate to="/404" replace />;

  const relatedPosts = getRelatedPosts(post);

  return (
    <motion.div {...pageTransition}>
      <ReadingProgress />

      <Container size="narrow" className="py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeftIcon className="size-4" />
          {ui.blog.backToAll}
        </Link>

        <header className="mt-8 border-b border-line pb-8">
          <h1 className="text-3xl font-semibold sm:text-4xl">{post.title}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              <time dateTime={post.date}>{formatDate(post.date, profile.locale)}</time>
            </span>

            <span aria-hidden="true">·</span>

            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" />
              {ui.blog.readingTime(toBanglaDigits(post.readingTime))}
            </span>
          </div>

          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag variant="accent">#{tag}</Tag>
                </li>
              ))}
            </ul>
          )}
        </header>

        <article
          className="prose mt-10"
          // Content is local markdown authored in this repo — not user input.
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Container>

      {relatedPosts.length > 0 && (
        <Container className="pb-24">
          <h2 className="mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">
            {ui.blog.related}
          </h2>

          <Reveal.Group className="grid gap-5 sm:grid-cols-2">
            {relatedPosts.map((related) => (
              <Reveal.Item key={related.slug}>
                <PostCard post={related} locale={profile.locale} />
              </Reveal.Item>
            ))}
          </Reveal.Group>
        </Container>
      )}
    </motion.div>
  );
}
