/**
 * Take down the entry preloader in index.html.
 *
 * The overlay itself is inline HTML and CSS, because it has to be on screen
 * before this file has finished downloading. All that is left for JS is
 * deciding *when* the site is worth looking at, which is a race between three
 * clocks:
 *
 *   floor    a loader that flashes for 200ms is worse than no loader — it
 *            reads as a glitch. Nothing is dismissed before MIN_VISIBLE.
 *   ready    the fonts and the first screen of images. This site is in
 *            Bangla, so Hind Siliguri is the single largest thing on the
 *            wire; dismissing before it lands means watching the whole page
 *            reflow, which is exactly what the overlay is there to hide.
 *   ceiling  a slow font CDN must never hold the site hostage. At MAX_WAIT
 *            the overlay goes regardless of what is still in flight.
 */

/** Shortest time the overlay stays up, in ms. */
const MIN_VISIBLE = 600;

/** Longest it will wait for fonts and images before giving up on them. */
const MAX_WAIT = 3500;

/** Matches the fade-out in the inline CSS, plus its delay. */
const FADE_MS = 700;

/** Resolves once every non-lazy resource on the page has settled. */
function windowLoaded() {
  if (document.readyState === 'complete') return Promise.resolve();

  return new Promise((resolve) => {
    window.addEventListener('load', resolve, { once: true });
  });
}

/** Resolves once the webfonts are in. Older browsers resolve immediately. */
function fontsLoaded() {
  return document.fonts ? document.fonts.ready : Promise.resolve();
}

/** Resolves after `ms`. */
function after(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Wait for the page to be ready, then fade the overlay out and remove it.
 *
 * Safe to call more than once and safe to call when the overlay is not there
 * — a production build strips nothing, but a future change to index.html
 * should not be able to crash the app's entry point.
 */
export function dismissPreloader() {
  const overlay = document.getElementById('preloader');
  if (!overlay) return;

  // Sequential, not parallel. The font stylesheet is loaded asynchronously
  // (see the comment on it in index.html), so at the moment this runs the
  // @font-face rules may not exist yet — and `document.fonts.ready` on an
  // empty set resolves instantly, which would defeat the point of waiting.
  // By `load` the stylesheet has been applied and the faces are known.
  const ready = windowLoaded().then(fontsLoaded);

  Promise.all([
    after(MIN_VISIBLE),
    Promise.race([ready, after(MAX_WAIT)]),
  ]).then(() => {
    // The class runs the progress bar out to 100% and fades the overlay;
    // removing the node afterwards keeps it out of the accessibility tree
    // rather than leaving an invisible `role="status"` over the page.
    overlay.classList.add('is-done');
    setTimeout(() => overlay.remove(), FADE_MS);
  });
}
