import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a CSS media query from JavaScript.
 *
 * Implemented with useSyncExternalStore so React reads the match directly
 * from the browser instead of mirroring it into state — no effect, no extra
 * render on mount.
 *
 * @param {string} query e.g. '(min-width: 768px)'
 * @returns {boolean} whether the query currently matches
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onStoreChange);
      return () => mediaQuery.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // Server snapshot: assume no match, so markup renders the default branch.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Convenience wrapper: true when the visitor asked for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
