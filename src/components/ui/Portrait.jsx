import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';

/**
 * Framed illustration used by the hero and the about section.
 *
 * The artwork sits on a dark plate with an accent glow behind it, so an image
 * with a dark background still reads as deliberate in the light theme. The
 * whole frame drifts slowly up and down unless the visitor has asked for
 * reduced motion.
 *
 * @param {object} props
 * @param {string} props.src   imported image
 * @param {string} props.alt   description, or '' if purely decorative
 * @param {'tall'|'wide'} [props.ratio='tall'] shape of the frame
 * @param {number} [props.floatOffset=10] float distance in pixels
 * @param {boolean} [props.priority=false] load eagerly — set for the hero,
 *   which is above the fold and should not wait for lazy loading
 */
export function Portrait({
  src,
  alt = '',
  ratio = 'tall',
  floatOffset = 10,
  priority = false,
  className,
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Match the aspect of the artwork in src/assets so nothing gets cropped.
  const ratios = {
    tall: 'aspect-[3/4]',
    wide: 'aspect-[4/3]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn('relative', className)}
    >
      {/* Accent glow behind the plate. */}
      <div
        aria-hidden="true"
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
          ratios[ratio],
        )}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="size-full object-cover object-center"
        />

        {/* Fades the artwork into the plate along the bottom edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0c10] to-transparent"
        />
      </motion.div>

      {/* Offset outline, echoing the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -right-4 -z-10 size-full rounded-[2rem] border border-accent/25"
      />
    </motion.div>
  );
}
