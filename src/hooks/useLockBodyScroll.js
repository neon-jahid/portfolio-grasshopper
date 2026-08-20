import { useEffect } from 'react';

/**
 * Freeze page scrolling while an overlay (mobile menu, dialog) is open.
 *
 * @param {boolean} locked
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
