import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  activePhotoCategories,
  getFeaturedPhotos,
  photographyIntro,
  photos,
} from '../data/photography';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Lightbox } from '../components/ui/Lightbox';
import { ArrowRightIcon, ExpandIcon } from '../components/icons';
import { cn, photoSrcSet, toBanglaDigits } from '../lib/utils';
import { fadeUp, staggerContainer, whenInView } from '../lib/motion';
import { ui } from '../data/ui';

/** One large frame plus a four-up grid. Anything past five is ignored. */
const featuredPhotos = getFeaturedPhotos(5);
const [featurePhoto] = featuredPhotos;

/**
 * Home-page photography highlight.
 *
 * Still not the gallery: no filters, no masonry, and the button to /photos
 * stays the way to see everything. A frame does open the same viewer the
 * gallery uses, though — clicking a photo and landing on another page instead
 * of simply seeing it bigger reads as a broken link rather than a teaser. The
 * viewer only ever holds these five.
 *
 * The layout is a fixed-height grid from `lg` up rather than a row of aspect
 * ratios: the feature spans both rows, the four tiles fill the column beside
 * it, and every edge lines up because the grid — not the images — decides the
 * heights. Below `lg` the frames keep fixed ratios of their own, so an upright
 * phone shot and a wide camera frame still fill the same tile.
 */
export function PhotographyPreview() {
  const [openIndex, setOpenIndex] = useState(null);

  if (!featurePhoto) return null;

  return (
    <section
      id="photography"
      aria-labelledby="photography-title"
      className="relative py-section"
    >
      {/* Soft accent wash behind the grid, so the block reads as a highlight
          without a hard-edged band fighting the frames. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-96 bg-accent/8 blur-[120px]"
      />

      <Container>
        <motion.div
          {...whenInView}
          variants={staggerContainer(0.1)}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
            >
              {photographyIntro.eyebrow}
            </motion.p>

            <motion.h2
              id="photography-title"
              variants={fadeUp}
              className="mt-4 text-3xl font-semibold lowercase sm:text-4xl"
            >
              {photographyIntro.title}
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-4 text-muted">
              {photographyIntro.preview}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-3"
          >
            <Button to="/photos">
              {photographyIntro.cta}
              <ArrowRightIcon className="size-4" />
            </Button>

            <p className="font-mono text-xs text-faint">
              {ui.photography.summary(
                toBanglaDigits(photos.length),
                toBanglaDigits(activePhotoCategories.length),
              )}
            </p>
          </motion.div>
        </motion.div>

        <motion.ul
          {...whenInView}
          variants={staggerContainer(0.08, 0.1)}
          className={cn(
            'mt-12 grid grid-cols-2 gap-3 sm:gap-4',
            'lg:h-[38rem] lg:grid-cols-4 lg:grid-rows-2',
          )}
        >
          {featuredPhotos.map((photo, index) => (
            <Frame
              key={photo.id}
              photo={photo}
              featured={index === 0}
              onOpen={() => setOpenIndex(index)}
              className={index === 0 ? 'col-span-2 lg:row-span-2' : undefined}
            />
          ))}
        </motion.ul>
      </Container>

      <Lightbox
        photos={featuredPhotos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}

/**
 * One frame in the highlight grid.
 *
 * Below `lg` the aspect ratio holds the shape; from `lg` the grid cell does,
 * so `aspect-auto` hands control over at the breakpoint. Either way the image
 * fills the frame and is cropped from its middle, so the framing never depends
 * on the shape of the file that was dropped in.
 *
 * @param {object} props
 * @param {object} props.photo
 * @param {Function} props.onOpen
 * @param {boolean} [props.featured=false] the large frame — keeps its caption
 *   on screen at all times rather than waiting for a hover
 */
function Frame({ photo, onOpen, featured = false, className }) {
  return (
    <motion.li variants={fadeUp} className={cn('min-h-0', className)}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={ui.photography.openPhoto(photo.title, photo.location)}
        className={cn(
          'group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-surface-2',
          'transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/50',
          'hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.55)]',
          featured ? 'aspect-[4/5] lg:aspect-auto' : 'aspect-square lg:aspect-auto',
        )}
      >
        <img
          src={photo.src}
          srcSet={photoSrcSet(photo.src)}
          sizes={featured ? '(min-width: 1024px) 34rem, 92vw' : '(min-width: 1024px) 17rem, 46vw'}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />

        {/* The caption stays on screen for touch, where there is no hover to
            reveal it, and slides up on pointer devices. The feature frame
            keeps its caption either way. */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent',
            'transition-opacity duration-500',
            featured ? 'opacity-90' : 'opacity-80 sm:opacity-0 sm:group-hover:opacity-100',
          )}
        />

        {/* Enlarge affordance, pointer devices only — the same one the gallery
            cards carry, so both surfaces advertise the same viewer. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-4 hidden size-9 scale-90 place-items-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-400 group-hover:scale-100 group-hover:opacity-100 sm:grid"
        >
          <ExpandIcon className="size-4" />
        </span>

        <span
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 block text-left',
            featured ? 'p-5 sm:p-7' : 'p-4',
            !featured &&
              'sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-500 sm:ease-out sm:group-hover:translate-y-0 sm:group-hover:opacity-100',
          )}
        >
          <span
            className={cn(
              'block font-medium text-white',
              featured ? 'text-lg sm:text-xl' : 'text-sm',
            )}
          >
            {photo.title}
          </span>
          <span className="mt-1 block font-mono text-[0.7rem] tracking-wide text-white/70">
            {photo.location} · {photo.year}
          </span>
        </span>
      </button>
    </motion.li>
  );
}
