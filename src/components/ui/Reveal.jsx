import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, whenInView } from '../../lib/motion';

/**
 * Animate children into view on scroll.
 *
 * This is the one place scroll animation is configured, so every section
 * enters the same way.
 *
 *   <Reveal>            single element fades up
 *   <Reveal.Group>      staggers its <Reveal.Item> children
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div']
 * @param {object} [props.variants=fadeUp] override the animation
 * @param {number} [props.delay=0] seconds to wait before animating
 */
export function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  className,
  children,
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      {...whenInView}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parent that releases its children one by one.
 * Children must be <Reveal.Item> (or any motion element using `fadeUp`).
 */
function Group({ as = 'div', stagger = 0.08, delay = 0, className, children, ...props }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      {...whenInView}
      variants={staggerContainer(stagger, delay)}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** A child of <Reveal.Group>. Inherits the parent's stagger timing. */
function Item({ as = 'div', variants = fadeUp, className, children, ...props }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag variants={variants} className={className} {...props}>
      {children}
    </MotionTag>
  );
}

Reveal.Group = Group;
Reveal.Item = Item;
