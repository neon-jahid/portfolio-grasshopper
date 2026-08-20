import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/** Shared shape for every variant. */
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-all duration-300 ease-out active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANTS = {
  /** Filled accent — one per screen, for the main action. */
  primary:
    'bg-accent text-accent-contrast hover:brightness-110 hover:shadow-[0_8px_30px_-10px_var(--color-accent)]',
  /** Outlined — secondary actions sitting next to a primary. */
  outline:
    'border border-line bg-transparent text-ink hover:border-accent hover:text-accent',
  /** Filled with a surface colour — used on top of coloured backgrounds. */
  subtle: 'bg-surface-2 text-ink hover:bg-accent-soft hover:text-accent',
  /** No chrome until hovered — for tertiary/icon actions. */
  ghost: 'text-muted hover:bg-surface-2 hover:text-ink',
};

const SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm tracking-wide',
  lg: 'h-13 px-8 text-base',
  icon: 'size-10',
};

/**
 * One button for the whole site, rendered as whichever element fits:
 *
 *   <Button onClick={...}>              -> <button>
 *   <Button href="https://...">         -> <a> (external, opens in a new tab)
 *   <Button to="/blog">                 -> react-router <Link>
 *
 * @param {object} props
 * @param {'primary'|'outline'|'subtle'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'|'icon'} [props.size='md']
 * @param {string} [props.href] external link target
 * @param {string} [props.to]   internal route
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  to,
  className,
  children,
  ...props
}) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    // Only add the new-tab treatment to links that leave the site.
    const isExternal = /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : null)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
