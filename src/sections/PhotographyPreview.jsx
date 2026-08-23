import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  activePhotoCategories,
  getFeaturedPhotos,
  photographyIntro,
  photos,
} from '../data/photography';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ArrowRightIcon } from '../components/icons';
import { cn, toBanglaDigits } from '../lib/utils';
import { fadeUp, staggerContainer, whenInView } from '../lib/motion';
import { ui } from '../data/ui';

/** One large frame plus a four-up grid. Anything past five is ignored. */
const [featurePhoto, ...gridPhotos] = getFeaturedPhotos(5);

/**
 * Home-page photography highlight.
 *
 * Deliberately not a gallery: no filters, no lightbox, no masonry. It is one
 * large frame beside a four-up grid, and it exists to send people to /photos
 * where all of that lives. Keeping the interactive weight on the dedicated
 * page stops the home page turning into two sites stacked on top of each
 * other.
 *
 * The layout is a fixed-height grid from `lg` up rather than a row of aspect
 * ratios: the feature spans both rows, the four tiles fill the column beside
 * it, and every edge lines up because the grid — not the images — decides the
 * heights. Below `lg` the images take their ratios back and the grid folds
 * into a feature with a 2×2 underneath it.
 */
export function PhotographyPreview() {
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
          <Frame
            photo={featurePhoto}
            featured
            className="col-span-2 lg:row-span-2"
          />

          {gridPhotos.map((photo) => (
            <Frame key={photo.id} photo={photo} />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

/**
 * One frame in the highlight grid.
 *
 * Below `lg` the aspect ratio holds the shape; from `lg` the grid cell does,
 * so `aspect-auto` hands control over at the breakpoint.
 *
 * @param {object} props
 * @param {object} props.photo
 * @param {boolean} [props.featured=false] the large frame — keeps its caption
 *   on screen at all times rather than waiting for a hover
 */
function Frame({ photo, featured = false, className }) {
  return (
    <motion.li variants={fadeUp} className={cn('min-h-0', className)}>
      <Link
        to="/photos"
        aria-label={ui.photography.openInGallery(photo.title, photo.location)}
        className={cn(
          'group relative block size-full overflow-hidden rounded-2xl border border-line bg-surface-2',
          'transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/50',
          'hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.55)]',
          featured ? 'aspect-[4/5] lg:aspect-auto' : 'aspect-square lg:aspect-auto',
        )}
      >
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
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

        <span
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 block',
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
      </Link>
    </motion.li>
  );
}
