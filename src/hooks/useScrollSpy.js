import { useEffect, useState } from 'react';

/**
 * Track which section is currently in view.
 *
 * Uses IntersectionObserver rather than scroll maths, so it stays cheap and
 * keeps working if sections change height.
 *
 * @param {string[]} ids       element ids to watch, in page order
 * @param {object}  [options]
 * @param {string}  [options.rootMargin] shrinks the viewport used for the test
 * @returns {string|null} the id of the section considered active
 */
export function useScrollSpy(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        // If several qualify, prefer the one nearest the top of the page.
        const topMost = visible.reduce((best, entry) =>
          entry.boundingClientRect.top < best.boundingClientRect.top
            ? entry
            : best,
        );

        setActiveId(topMost.target.id);
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // `ids` is a module-level constant array; join it so the effect is stable.
  }, [ids, rootMargin]);

  return activeId;
}
