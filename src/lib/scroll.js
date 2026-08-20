/**
 * Scroll helpers shared by the navigation components.
 */

/**
 * Smooth-scroll an element into view by id.
 *
 * The sticky-header offset is handled by `scroll-padding-top` in index.css,
 * so nothing has to be measured here.
 *
 * @param {string} id
 */
export function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Split a link into its route and hash parts: '/blog#top' becomes
 * { pathname: '/blog', hash: 'top' }.
 *
 * @param {string} href
 * @returns {{ pathname: string, hash: string }}
 */
export function parseHref(href) {
  const [pathname, hash] = href.split('#');
  return { pathname: pathname || '/', hash: hash || '' };
}
