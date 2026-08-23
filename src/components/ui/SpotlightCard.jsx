import { useRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * A surface panel with a soft accent glow that follows the pointer.
 *
 * The pointer position is written straight to two CSS custom properties
 * rather than to React state — the glow then moves in the compositor, so
 * mousing across a grid of these costs nothing in renders.
 *
 * The glow is a hover affordance only; it never carries meaning, so touch
 * users (who have no pointer to follow) lose nothing.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div']
 * @param {number} [props.radius=240] glow radius in pixels
 */
export function SpotlightCard({
  as: Element = 'div',
  radius = 240,
  className,
  children,
  ...props
}) {
  const elementRef = useRef(null);

  const handlePointerMove = (event) => {
    const element = elementRef.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <Element
      ref={elementRef}
      onPointerMove={handlePointerMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-line bg-surface',
        'transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/45',
        'hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.4)]',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--color-accent) 20%, transparent), transparent 72%)`,
        }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col">{children}</div>
    </Element>
  );
}
