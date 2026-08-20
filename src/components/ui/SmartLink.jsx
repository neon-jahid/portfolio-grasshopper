import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { parseHref, scrollToSection } from '../../lib/scroll';

/**
 * One link component that handles the three kinds of destination this site
 * has, so callers never have to branch:
 *
 *   'https://…'  external      -> <a target="_blank">
 *   '/blog'      route         -> react-router <Link>
 *   '/#about'    page section  -> smooth scroll (navigating home first if needed)
 *
 * @param {object} props
 * @param {string} props.href
 * @param {Function} [props.onNavigate] called after a successful navigation —
 *   used by the mobile menu to close itself
 */
export function SmartLink({ href, onNavigate, className, children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    const isHttp = href.startsWith('http');

    return (
      <a
        href={href}
        className={cn(className)}
        onClick={onNavigate}
        {...(isHttp ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
        {...props}
      >
        {children}
      </a>
    );
  }

  const { pathname, hash } = parseHref(href);

  // Plain route — let the router handle it.
  if (!hash) {
    return (
      <Link to={pathname} className={cn(className)} onClick={onNavigate} {...props}>
        {children}
      </Link>
    );
  }

  const handleClick = (event) => {
    event.preventDefault();
    onNavigate?.(event);

    if (location.pathname === pathname) {
      scrollToSection(hash);
      // Keep the address bar in sync without triggering a re-render loop.
      window.history.replaceState(null, '', `${pathname}#${hash}`);
      return;
    }

    // Coming from another page: navigate first, ScrollToHash does the rest.
    navigate(`${pathname}#${hash}`);
  };

  return (
    <a href={href} className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
