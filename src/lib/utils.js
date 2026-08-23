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

/** Western digit -> Bengali digit, by index. */
const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Rewrite the digits in a value as Bengali numerals: 12 -> "১২".
 *
 * Counts that a component works out at runtime — a post count, the position
 * in the photo viewer — would otherwise sit in the page as Western digits
 * beside Bangla text, which is the sort of small mismatch that makes a site
 * feel machine-translated. Dates go through `formatDate` with a 'bn-BD'
 * locale instead; this is for the numbers Intl never sees.
 *
 * Anything that is not a digit is left alone, so separators and units survive.
 *
 * @param {string|number} value
 * @returns {string}
 */
export function toBanglaDigits(value) {
  return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[digit]);
}

/**
 * Format an ISO date (YYYY-MM-DD) as e.g. "20 Aug 2026".
 *
 * Pass a locale to render the date in another language — 'bn-BD' gives
 * "২০ আগ ২০২৬", in Bengali numerals. `profile.locale` in data/site.js is the
 * site-wide setting; callers pass it down.
 *
 * @param {string} isoDate
 * @param {string} [locale='en-GB']
 * @returns {string}
 */
export function formatDate(isoDate, locale = 'en-GB') {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return date.toLocaleDateString(locale, {
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
 * Letters and digits are matched by Unicode property rather than by A-Z, so
 * a Bangla title survives: "এপিআই টেস্টিং" -> "এপিআই-টেস্টিং". Browsers
 * percent-encode that in the address bar and show it decoded, so the URL
 * still reads properly. Punctuation and symbols are dropped either way.
 *
 * @param {string} value
 * @returns {string}
 */
export function slugify(value) {
  return value
    .normalize('NFC')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Mark}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
