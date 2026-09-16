/**
 * Scroll helpers shared by the navigation components.
 */

/** Give up waiting for the scroll lock after this many frames. */
const MAX_WAIT_FRAMES = 10;

/**
 * True while an overlay (the mobile drawer, the lightbox) has frozen the page.
 *
 * `useLockBodyScroll` sets `overflow: hidden` on the body, which propagates to
 * the viewport and makes the document unscrollable.
 */
function isScrollLocked() {
  return window.getComputedStyle(document.body).overflowY === 'hidden';
}

/**
 * Run `scroll` as soon as the document can actually move.
 *
 * Tapping a link inside the mobile menu closes the drawer and scrolls in the
 * same tick, but the drawer's scroll lock is only lifted once React flushes
 * the effect cleanup — a frame later. Scrolling before that is silently a
 * no-op, which is why section links appeared dead on small screens.
 *
 * @param {Function} scroll
 * @param {number} [frame] frames waited so far
 */
function whenScrollable(scroll, frame = 0) {
  if (!isScrollLocked() || frame >= MAX_WAIT_FRAMES) {
    scroll();
    return;
  }

  requestAnimationFrame(() => whenScrollable(scroll, frame + 1));
}

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
  if (!element) return;

  whenScrollable(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

/**
 * Jump to the top of the page, used when a route changes.
 *
 * @param {ScrollBehavior} [behavior]
 */
export function scrollToTop(behavior = 'instant') {
  whenScrollable(() => window.scrollTo({ top: 0, behavior }));
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
