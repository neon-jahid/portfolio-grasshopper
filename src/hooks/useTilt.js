import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery, usePrefersReducedMotion } from './useMediaQuery';

/**
 * Make an element lean towards the pointer.
 *
 * Returns spring-damped `rotateX` / `rotateY` motion values ready to hand to
 * a `motion` element's `style`, plus the raw -0.5…0.5 pointer position so a
 * caller can drive extra layers from the same gesture — a shadow that slides
 * the other way, a highlight that follows the cursor.
 *
 *   const tilt = useTilt();
 *   <motion.div {...tilt.handlers} style={tilt.enabled ? tilt.style : undefined}>
 *
 * `enabled` is false on touch screens — there is no pointer to follow, and the
 * listeners would only cost frames — and for anyone who asked the OS for
 * reduced motion. Check it before spreading `style`, so the element keeps its
 * own transforms instead of being handed a flat identity matrix.
 *
 * @param {object} [options]
 * @param {number} [options.max=9]   degrees of lean at the frame's edge
 * @param {number} [options.depth=1] multiplier for `max` on the Y axis, so a
 *   wide card can lean less vertically than it does horizontally
 */
export function useTilt({ max = 9, depth = 0.78 } = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasPointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = hasPointer && !prefersReducedMotion;

  // -0.5 … 0.5: where the pointer sits inside the element.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [max * depth, -max * depth]),
    spring,
  );

  const handlers = {
    onMouseMove: (event) => {
      if (!enabled) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
      pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    },
    onMouseLeave: () => {
      pointerX.set(0);
      pointerY.set(0);
    },
  };

  return {
    enabled,
    handlers,
    pointerX,
    pointerY,
    spring,
    style: { rotateX, rotateY, transformStyle: 'preserve-3d' },
  };
}
