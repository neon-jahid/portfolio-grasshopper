import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  activePhotoCategories,
  photographyIntro,
  photos,
} from '../data/photography';
import { Container } from '../components/ui/Container';
import { PhotoCard } from '../components/ui/PhotoCard';
import { Lightbox } from '../components/ui/Lightbox';
import { ApertureIcon } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { profile } from '../data/site';
import { cn, toBanglaDigits } from '../lib/utils';
import { ui } from '../data/ui';
import { EASE, fadeUp, pageTransition, staggerContainer, whenInView } from '../lib/motion';

/** The filter row always starts with "all", whatever the data says. */
const ALL = { id: 'all', label: ui.photography.allFilter };

/**
 * The full gallery.
 *
 * Laid out like the blog archive — page header, a control bar, then the
 * results — so the two "everything of this kind" pages feel like siblings.
 *
 * The grid is an even three-up rather than a masonry: every card holds the
 * same 4:5 frame and crops its photo from the middle, so a portrait phone
 * shot and a wide camera frame sit on the same baseline and nothing shifts
 * once the images arrive.
 *
 * Changing the filter remounts the grid under a new key, which re-runs the
 * stagger. That reads as the set being dealt out again rather than items
 * quietly disappearing.
 */
export default function Photos() {
  const [category, setCategory] = useState(ALL.id);
  const [openIndex, setOpenIndex] = useState(null);

  usePageMeta({
    title: `${photographyIntro.title} — ${profile.name}`,
    description: photographyIntro.lead,
  });

  const filters = [ALL, ...activePhotoCategories];

  const visiblePhotos = useMemo(
    () =>
      category === ALL.id
        ? photos
        : photos.filter((photo) => photo.category === category),
    [category],
  );

  /** Filtering while the viewer is open would leave it pointing at the wrong
   *  photo, so the two states always change together. */
  const handleFilter = (nextCategory) => {
    setOpenIndex(null);
    setCategory(nextCategory);
  };

  return (
    <motion.div {...pageTransition}>
      <Container className="py-14 sm:py-20">
        <header className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {photographyIntro.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold lowercase sm:text-5xl">
            {photographyIntro.title}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {photographyIntro.lead}{' '}
            {ui.photography.total(toBanglaDigits(photos.length))}
          </p>
        </header>

        {/* Control bar, mirroring the blog archive's. */}
        <div className="mt-10 flex flex-col gap-4 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter.id === category;

              return (
                <li key={filter.id}>
                  <button
                    type="button"
                    onClick={() => handleFilter(filter.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'relative rounded-full border px-4 py-1.5 font-mono text-xs lowercase transition-colors duration-200',
                      isActive
                        ? 'border-transparent text-accent'
                        : 'border-line text-muted hover:border-accent hover:text-accent',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="photo-filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    )}
                    {filter.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="shrink-0 font-mono text-xs text-faint">
            {ui.photography.shown(toBanglaDigits(visiblePhotos.length))}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            {...whenInView}
            // The full grid is far taller than the viewport, so the shared
            // 20%-visible threshold would leave it hidden. Any sliver will do.
            viewport={{ once: true, amount: 0.02 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE } }}
            variants={staggerContainer(0.07)}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visiblePhotos.map((photo, index) => (
              <motion.div key={photo.id} variants={fadeUp}>
                <PhotoCard photo={photo} onOpen={() => setOpenIndex(index)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {photographyIntro.note && (
          <p className="mt-12 flex items-center justify-center gap-2 text-center font-mono text-xs text-faint">
            <ApertureIcon className="size-4 shrink-0 text-accent" />
            {photographyIntro.note}
          </p>
        )}
      </Container>

      <Lightbox
        photos={visiblePhotos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </motion.div>
  );
}
