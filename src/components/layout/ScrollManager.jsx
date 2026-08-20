import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Keeps scroll position sensible across route changes:
 *
 *  - navigating to a new page starts at the top
 *  - navigating to '/#about' scrolls to that section once it has mounted
 *
 * Renders nothing; mount it once inside the router.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }

    // Wait a frame so the target section exists before scrolling to it.
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(hash.slice(1));
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
