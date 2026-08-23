import { ExpandIcon } from '../icons';
import { cn, photoSrcSet } from '../../lib/utils';
import { ui } from '../../data/ui';

/**
 * One frame in the photography gallery.
 *
 * The whole card is the button that opens the viewer. Every card holds the
 * same 4:5 frame whatever the file's own shape is — a phone panorama and an
 * upright camera frame both fill it, cropped from the middle — so the grid
 * stays even and the space is reserved before the file loads.
 *
 * The caption sits on the photo permanently on touch screens, where there is
 * no hover to reveal it, and slides up on pointer devices.
 *
 * @param {object} props
 * @param {object} props.photo
 * @param {Function} props.onOpen
 */
export function PhotoCard({ photo, onOpen, className }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={ui.photography.openPhoto(photo.title, photo.location)}
      className={cn(
        'group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-2xl',
        'border border-line bg-surface-2 transition-all duration-500 ease-out',
        'hover:-translate-y-1 hover:border-accent/50',
        'hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.55)]',
        className,
      )}
    >
      <img
        src={photo.src}
        srcSet={photoSrcSet(photo.src)}
        // Three columns inside a 72rem container, two from `sm`, one below.
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
        alt={photo.title}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />

      {/* Scrim: always faintly there so text stays legible, deepens on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Enlarge affordance, pointer devices only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 hidden size-9 scale-90 place-items-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-400 group-hover:scale-100 group-hover:opacity-100 sm:grid"
      >
        <ExpandIcon className="size-4" />
      </span>

      <span className="pointer-events-none absolute inset-x-0 bottom-0 block p-4 text-left sm:translate-y-2 sm:p-5 sm:opacity-0 sm:transition-all sm:duration-500 sm:ease-out sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
        <span className="block text-sm font-medium text-white sm:text-base">
          {photo.title}
        </span>
        <span className="mt-1 block font-mono text-[0.7rem] tracking-wide text-white/65">
          {photo.location} · {photo.year}
        </span>
      </span>
    </button>
  );
}
