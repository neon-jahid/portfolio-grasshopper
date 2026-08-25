import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { useTilt } from '../../hooks/useTilt';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';

/**
 * Framed illustration used by the hero and the about section.
 *
 * The artwork sits on a dark plate with an accent glow behind it, so an image
 * with a dark background still reads as deliberate in the light theme.
 *
 * Four layers of motion, each on its own element so their transforms never
 * fight over the same `transform` property:
 *
 *   1. entrance  — fade, lift and a slide in from `side`, once
 *   2. tilt      — the frame leans towards the pointer, spring-damped
 *   3. float     — a slow, endless drift up and down
 *   4. parallax  — the artwork inside the frame travels slower than the page
 *
 * Plus hover: the artwork pushes in slightly, a soft sheen crosses it and the
 * rim lights up. Everything except the entrance is dropped for
 * `prefers-reduced-motion`, and the tilt is skipped entirely on touch
 * devices, where there is no pointer to follow and the listeners would only
 * cost frames.
 *
 * @param {object} props
 * @param {string} props.src   imported image
 * @param {string} props.alt   description, or '' if purely decorative
 * @param {'tall'|'wide'} [props.ratio='tall'] shape of the frame
 * @param {'left'|'right'} [props.side='right'] which side of the layout this
 *   sits on — sets the entrance direction and the offset outline's corner
 * @param {number} [props.floatOffset=10] float distance in pixels
 * @param {boolean} [props.priority=false] load eagerly — set for the hero,
 *   which is above the fold and should not wait for lazy loading
 * @param {React.ReactNode} [props.children] overlay pinned to the frame, e.g.
 *   a caption card
 */
export function Portrait({
  src,
  alt = '',
  ratio = 'tall',
  side = 'right',
  floatOffset = 10,
  priority = false,
  className,
  children,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const tilt = useTilt();

  const wrapperRef = useRef(null);

  // Match the aspect of the artwork in src/assets so nothing gets cropped.
  const ratios = {
    tall: 'aspect-[3/4]',
    wide: 'aspect-[4/3]',
  };

  /* -- Pointer tilt ------------------------------------------------------ */
  // The frame leans towards the pointer; the offset outline behind it leans
  // the other way, off the same gesture, which is what reads as depth.
  const outlineX = useSpring(
    useTransform(tilt.pointerX, [-0.5, 0.5], [10, -10]),
    tilt.spring,
  );
  const outlineY = useSpring(
    useTransform(tilt.pointerY, [-0.5, 0.5], [10, -10]),
    tilt.spring,
  );

  /* -- Scroll parallax --------------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });
  // The carriage below is taller than the frame, so the artwork can travel
  // without ever exposing an edge.
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-6%', '6%'],
  );

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.94, y: 28, x: side === 'left' ? -28 : 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn('group relative [perspective:1200px]', className)}
    >
      <motion.div
        {...tilt.handlers}
        style={tilt.enabled ? tilt.style : undefined}
        className="relative"
      >
        {/* Accent glow behind the plate. It breathes rather than sitting
            still, so the frame never looks pasted onto the page. */}
        <motion.div
          aria-hidden="true"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.6, 1, 0.6], scale: [0.95, 1.06, 0.95] }
          }
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          className="pointer-events-none absolute inset-6 rounded-full bg-accent/25 blur-[70px]"
        />

        <motion.div
          animate={
            prefersReducedMotion ? undefined : { y: [-floatOffset, floatOffset] }
          }
          transition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className={cn(
            'relative overflow-hidden rounded-[2rem] border border-line',
            'bg-[radial-gradient(120%_100%_at_50%_0%,#1a2226_0%,#0d0c10_70%)]',
            'shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]',
            'transition-shadow duration-500 group-hover:shadow-[0_45px_90px_-45px_var(--color-accent)]',
            ratios[ratio],
          )}
        >
          {/* Parallax carriage — the extra height is what the travel eats. */}
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-x-0 -inset-y-[8%]"
          >
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
              className={cn(
                'size-full object-cover object-center',
                'transition-transform duration-[900ms] ease-[var(--ease-out-soft)]',
                'group-hover:scale-[1.06]',
              )}
            />
          </motion.div>

          {/* Sheen. Sweeps across once on hover. */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12',
              'bg-gradient-to-r from-transparent via-white/20 to-transparent',
              'transition-transform duration-[1100ms] ease-[var(--ease-out-soft)]',
              'group-hover:translate-x-[500%]',
            )}
          />

          {/* Fades the artwork into the plate along the bottom edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0c10] to-transparent"
          />

          {/* Accent rim, lit on hover. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 ring-1 ring-accent/40 ring-inset transition-opacity duration-500 group-hover:opacity-100"
          />
        </motion.div>

        {/* Offset outline, echoing the frame. */}
        <motion.div
          aria-hidden="true"
          style={tilt.enabled ? { x: outlineX, y: outlineY } : undefined}
          className={cn(
            'pointer-events-none absolute -bottom-4 -z-10 size-full rounded-[2rem] border border-accent/25',
            side === 'left' ? '-left-4' : '-right-4',
          )}
        />
      </motion.div>

      {children}
    </motion.div>
  );
}
