import { cn } from '../../lib/utils';

const VARIANTS = {
  default: 'border-line bg-surface-2 text-muted',
  accent: 'border-transparent bg-accent-soft text-accent',
  outline: 'border-line bg-transparent text-muted',
};

/**
 * Small label used for tech stacks, post categories and project types.
 *
 * @param {object} props
 * @param {'default'|'accent'|'outline'} [props.variant='default']
 * @param {React.ElementType} [props.as='span']
 */
export function Tag({ variant = 'default', as: Element = 'span', className, children, ...props }) {
  return (
    <Element
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}

/**
 * Convenience wrapper for a row of tags.
 *
 * @param {object} props
 * @param {string[]} props.items
 */
export function TagList({ items, variant, className }) {
  if (!items?.length) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag variant={variant}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
