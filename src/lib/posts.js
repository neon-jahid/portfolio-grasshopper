import { marked } from 'marked';
import { parseFrontmatter } from './frontmatter';
import { readingTime, slugify } from './utils';

/**
 * Blog content layer.
 *
 * Every `.md` file in src/content/posts is picked up automatically at build
 * time by Vite's import.meta.glob — adding a post means adding a file, with
 * no index to update and no CMS to run.
 *
 * Front-matter fields:
 *   title       required
 *   date        required, ISO (YYYY-MM-DD)
 *   excerpt     required, shown on cards
 *   tags        optional array
 *   cover       optional image URL
 *   featured    optional boolean, promotes the post on the blog page
 *   draft       optional boolean, hides the post from the site
 */

const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

marked.setOptions({ gfm: true, breaks: false });

/**
 * Build a post object from one markdown file.
 *
 * @param {string} filePath
 * @param {string} source
 */
function createPost(filePath, source) {
  const { data, content } = parseFrontmatter(source);
  const fileSlug = filePath.split('/').pop().replace(/\.md$/, '');

  return {
    slug: data.slug || fileSlug || slugify(data.title ?? ''),
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover ?? '',
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    readingTime: readingTime(content),
    /** Raw markdown, kept so search can look inside the body. */
    content,
    /** Rendered HTML for the post page. */
    html: marked.parse(content),
  };
}

/** Every published post, newest first. Drafts are excluded. */
export const posts = Object.entries(modules)
  .map(([filePath, source]) => createPost(filePath, source))
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

/** Unique tags across all posts, alphabetically. */
export const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort();

/**
 * Look up a single post.
 *
 * @param {string} slug
 * @returns {(typeof posts)[number] | undefined}
 */
export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

/**
 * The newest N posts — used by the home page preview.
 *
 * @param {number} [count=3]
 */
export function getRecentPosts(count = 3) {
  return posts.slice(0, count);
}

/**
 * Posts sharing at least one tag with the given post, excluding itself.
 *
 * @param {(typeof posts)[number]} post
 * @param {number} [count=2]
 */
export function getRelatedPosts(post, count = 2) {
  if (!post) return [];

  return posts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        candidate.tags.some((tag) => post.tags.includes(tag)),
    )
    .slice(0, count);
}

/**
 * Filter posts by free-text query and/or tag.
 *
 * @param {object} options
 * @param {string} [options.query] matches title, excerpt and body
 * @param {string} [options.tag]   '' or 'all' means no tag filter
 */
export function filterPosts({ query = '', tag = '' } = {}) {
  const normalisedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesTag = !tag || tag === 'all' || post.tags.includes(tag);
    if (!matchesTag) return false;

    if (!normalisedQuery) return true;

    return [post.title, post.excerpt, post.content, post.tags.join(' ')]
      .join(' ')
      .toLowerCase()
      .includes(normalisedQuery);
  });
}
