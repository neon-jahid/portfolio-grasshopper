import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin accent bar across the top of the viewport showing how far down the
 * page the visitor is. Purely decorative, so it is hidden from screen readers.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Spring smoothing stops the bar from twitching on fast scrolls.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
    />
  );
}
