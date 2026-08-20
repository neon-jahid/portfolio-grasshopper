import { useEffect } from 'react';

/**
 * Set the document title and meta description for a page.
 *
 * A tiny stand-in for a head manager — enough for a site this size, and it
 * restores the previous title on unmount so navigation stays tidy.
 *
 * @param {object} meta
 * @param {string} meta.title
 * @param {string} [meta.description]
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    let descriptionTag = null;
    let previousDescription = null;

    if (description) {
      descriptionTag = document.querySelector('meta[name="description"]');

      if (descriptionTag) {
        previousDescription = descriptionTag.getAttribute('content');
        descriptionTag.setAttribute('content', description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription !== null) {
        descriptionTag.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
