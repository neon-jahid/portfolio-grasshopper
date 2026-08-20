import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Article reading indicator.
 *
 * Sits just under the header (unlike the site-wide ScrollProgress bar, which
 * pins to the very top) so the two never overlap.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-18 z-30 h-0.5 origin-left bg-accent/60"
    />
  );
}
