/**
 * Shared Framer Motion presets.
 *
 * Keeping variants in one place means every section animates with the same
 * timing and easing — the site feels like one piece rather than a pile of
 * individually-tuned components.
 */

/** Matches --ease-out-soft in index.css. */
export const EASE = [0.22, 1, 0.36, 1];

/** Fade + rise. The default entrance for almost everything. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/** Fade in place — for elements where movement would be distracting. */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Slide in from the side. `custom` accepts -1 (from left) or 1 (from right). */
export const slideIn = {
  hidden: (direction = 1) => ({ opacity: 0, x: 32 * direction }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Parent variant that releases its children one after another.
 *
 * @param {number} stagger seconds between each child
 * @param {number} delay   seconds before the first child
 */
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/**
 * Props for "animate once when scrolled into view".
 * Spread onto any motion element: <motion.div {...whenInView} variants={fadeUp} />
 */
export const whenInView = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
};

/** Standard page transition used by the routed pages. */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } },
};
