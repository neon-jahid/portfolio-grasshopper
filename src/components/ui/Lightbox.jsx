import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../icons';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';
import { ui } from '../../data/ui';
import { toBanglaDigits } from '../../lib/utils';

/**
 * Direction-aware slide. `custom` is +1 when moving to a later photo, -1 for
 * an earlier one and 0 when the viewer has just opened — so the first frame
 * scales up in place instead of flying in from a side.
 */
const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction * 64,
    scale: direction === 0 ? 0.94 : 1,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction * -64,
    scale: direction === 0 ? 0.94 : 1,
    transition: { duration: 0.28, ease: EASE },
  }),
};

/** How far a drag has to travel before it counts as a swipe. */
const SWIPE_THRESHOLD = 80;

/**
 * Fullscreen photo viewer.
 *
 * Controlled: the parent owns which photo is open, so the gallery stays the
 * single source of truth and the viewer can be closed from anywhere.
 *
 * Arrow keys and swipes move between photos, Escape closes, and the filmstrip
 * along the bottom jumps straight to one.
 *
 * @param {object} props
 * @param {object[]} props.photos       the list currently on screen
 * @param {number|null} props.index     which photo is open, or null for closed
 * @param {Function} props.onClose
 * @param {(index: number) => void} props.onIndexChange
 */
export function Lightbox({ photos, index, onClose, onIndexChange }) {
  const photo = index === null ? null : photos[index];
  const isOpen = Boolean(photo);

  const [direction, setDirection] = useState(0);
  const dialogRef = useRef(null);

  useLockBodyScroll(isOpen);

  /** Move `step` photos along, wrapping at both ends. */
  const go = useCallback(
    (step) => {
      if (photos.length < 2 || index === null) return;
      setDirection(step);
      onIndexChange((index + step + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
  );

  /** Jump straight to a photo from the filmstrip, keeping the slide honest. */
  const jumpTo = useCallback(
    (nextIndex) => {
      if (nextIndex === index) return;
      setDirection(nextIndex > index ? 1 : -1);
      onIndexChange(nextIndex);
    },
    [index, onIndexChange],
  );

  const close = useCallback(() => {
    setDirection(0);
    onClose();
  }, [onClose]);

  // Keyboard control, bound only while the viewer is actually open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, go]);

  // Pull focus out of the page and into the dialog when it opens.
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={ui.photography.viewerLabel(photo.title)}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-50 flex flex-col outline-none"
        >
          {/* Backdrop. Clicking anywhere it shows through closes the viewer. */}
          <button
            type="button"
            aria-label={ui.photography.closeViewer}
            onClick={close}
            className="absolute inset-0 -z-10 cursor-zoom-out bg-canvas/92 backdrop-blur-xl"
          />

          {/* Counter and close. */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <p className="font-mono text-xs tracking-[0.2em] text-faint uppercase">
              <span className="text-accent">
                {toBanglaDigits(String(index + 1).padStart(2, '0'))}
              </span>
              {' / '}
              {toBanglaDigits(String(photos.length).padStart(2, '0'))}
            </p>

            <button
              type="button"
              onClick={close}
              aria-label={ui.photography.closeViewer}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface/60 text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          {/* Stage: arrows either side, the photo itself in the middle. */}
          <div className="relative flex min-h-0 flex-1 items-center gap-2 px-2 sm:gap-4 sm:px-6">
            {photos.length > 1 && (
              <ArrowButton
                label={ui.photography.previousPhoto}
                onClick={() => go(-1)}
                icon={ChevronLeftIcon}
              />
            )}

            <div className="relative flex h-full min-w-0 flex-1 items-center justify-center">
              <AnimatePresence custom={direction}>
                <motion.div
                  key={photo.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={photos.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(event, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                  }}
                  className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    draggable="false"
                    className="max-h-full max-w-full rounded-xl border border-line object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {photos.length > 1 && (
              <ArrowButton
                label={ui.photography.nextPhoto}
                onClick={() => go(1)}
                icon={ChevronRightIcon}
              />
            )}
          </div>

          {/* Caption, then the filmstrip. */}
          <div className="shrink-0 px-5 py-5 sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mx-auto max-w-3xl text-center"
              >
                <h3 className="text-lg font-semibold sm:text-xl">{photo.title}</h3>
                <p className="mt-1 font-mono text-xs text-faint">
                  {photo.location} · {photo.year}
                </p>
                {photo.caption && (
                  <p className="mt-3 text-sm text-muted">{photo.caption}</p>
                )}
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <ul className="mx-auto mt-5 flex max-w-3xl snap-x justify-start gap-2 overflow-x-auto pb-1">
                {photos.map((item, itemIndex) => (
                  <li key={item.id} className="shrink-0 snap-start">
                    <button
                      type="button"
                      onClick={() => jumpTo(itemIndex)}
                      aria-label={ui.photography.jumpTo(item.title)}
                      aria-current={itemIndex === index ? 'true' : undefined}
                      className={cn(
                        'block size-14 overflow-hidden rounded-lg border transition-all duration-300',
                        itemIndex === index
                          ? 'border-accent opacity-100'
                          : 'border-line opacity-45 hover:opacity-85',
                      )}
                    >
                      <img
                        src={item.src}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The two identical stage arrows, kept in one place. */
function ArrowButton({ label, onClick, icon: IconComponent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="z-10 grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface/60 text-muted backdrop-blur transition-all duration-300 hover:border-accent hover:text-accent active:scale-95"
    >
      <IconComponent className="size-5" />
    </button>
  );
}
