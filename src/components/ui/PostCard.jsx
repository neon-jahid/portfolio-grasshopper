import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Tag } from './Tag';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '../icons';
import { cn, formatDate, toBanglaDigits } from '../../lib/utils';
import { ui } from '../../data/ui';

/**
 * Blog post teaser, used on both the home page preview and the blog index.
 *
 * The whole card is a link: the title carries a stretched pseudo-element so
 * the click target covers the card without nesting interactive elements.
 *
 * @param {object} props
 * @param {import('../../lib/posts').posts[number]} props.post
 * @param {boolean} [props.featured=false] larger type and a visible excerpt
 * @param {string} [props.locale] BCP 47 tag for the date, e.g. 'bn-BD'
 */
export function PostCard({ post, featured = false, locale }) {
  return (
    <Card interactive className={cn('group flex h-full flex-col p-6', featured && 'sm:p-8')}>
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
        <span className="inline-flex items-center gap-1.5">
          <CalendarIcon className="size-3.5" />
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        </span>

        <span aria-hidden="true">·</span>

        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="size-3.5" />
          {ui.blog.readingTime(toBanglaDigits(post.readingTime))}
        </span>
      </div>

      <h3
        className={cn(
          'mt-3 font-semibold transition-colors group-hover:text-accent',
          featured ? 'text-2xl' : 'text-lg',
        )}
      >
        <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>

      <p className={cn('mt-3 text-muted', featured ? 'text-base' : 'text-sm')}>
        {post.excerpt}
      </p>

      <div className="mt-auto pt-6">
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Tag>#{tag}</Tag>
              </li>
            ))}
          </ul>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {ui.blog.readPost}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Card>
  );
}
