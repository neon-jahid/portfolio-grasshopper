/**
 * Small, dependency-free helpers shared across the app.
 */

/**
 * Join class names, dropping anything falsy.
 * Lets components write: cn('base', isActive && 'text-accent', className)
 *
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format an ISO date (YYYY-MM-DD) as e.g. "20 Aug 2026".
 *
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Rough reading time for a body of text, at ~200 words per minute.
 *
 * @param {string} text
 * @returns {number} minutes, minimum 1
 */
export function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Turn a title into a URL-safe slug: "API Testing 101" -> "api-testing-101".
 *
 * @param {string} value
 * @returns {string}
 */
export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
