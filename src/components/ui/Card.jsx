import { cn } from '../../lib/utils';

/**
 * Surface panel used by projects, skills, blog cards and the contact block.
 *
 * `interactive` adds the hover treatment (lift + accent border) — use it only
 * when the whole card is clickable.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div']
 * @param {boolean} [props.interactive=false]
 */
export function Card({
  as: Element = 'div',
  interactive = false,
  className,
  children,
  ...props
}) {
  return (
    <Element
      className={cn(
        'relative overflow-hidden rounded-2xl border border-line bg-surface',
        'transition-all duration-300 ease-out',
        interactive &&
          'hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)]',
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
