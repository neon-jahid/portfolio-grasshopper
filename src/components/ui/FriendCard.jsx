import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { cn, photoSrcSet, toBanglaDigits } from '../../lib/utils';
import { ui } from '../../data/ui';

/**
 * One person in the friends grid.
 *
 * A square photo over a compact caption. The names sit *under* the picture
 * rather than on top of it: at this size an overlay needs a heavy scrim to
 * stay legible, and a scrim heavy enough for small type is heavy enough to
 * bury the face it is sitting on.
 *
 * The photo does all the interactive work — the card leans towards the
 * pointer, lifts off the page, and the portrait warms from half-desaturated
 * to full colour while a sheen crosses it. None of that carries meaning: it
 * is there so a wall of portraits feels like something you can touch rather
 * than a contact sheet.
 *
 * Which is also why every fact stays on the page at rest — name, profession,
 * how long, since when. Nothing is hover-only, so the card reads the same on
 * a phone, under a keyboard, and with reduced motion.
 *
 * @param {object} props
 * @param {import('../../data/friends').Friend} props.friend
 */
export function FriendCard({ friend, className }) {
  // Less lean than the portraits get: these are small cards, and the same
  // angle on a 16rem tile reads as a wobble rather than a lean.
  const tilt = useTilt({ max: 6 });

  // Recomputed on every render rather than stored, so the data file only ever
  // holds the start year and the count can never go stale.
  const years = new Date().getFullYear() - Number(friend.since);

  return (
    <article className={cn('group h-full [perspective:1000px]', className)}>
      <motion.div
        {...tilt.handlers}
        style={tilt.enabled ? tilt.style : undefined}
        whileHover={tilt.enabled ? { y: -5 } : undefined}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface',
          'transition-[border-color,box-shadow] duration-400 ease-out',
          'group-hover:border-accent/45',
          'group-hover:shadow-[0_22px_44px_-28px_rgba(0,0,0,0.45)]',
        )}
      >
        <div className="relative aspect-square overflow-hidden bg-surface-2">
          <img
            src={friend.src}
            alt={ui.friends.portraitAlt(friend.name)}
            // A `.webp` pair written by `npm run photos` gets a srcset for
            // free; a single jpg or the placeholder SVGs have no second size,
            // so `photoSrcSet` returns undefined and the browser uses `src`.
            srcSet={photoSrcSet(friend.src)}
            // Four columns inside a 72rem container, three from `sm`, two below.
            sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 45vw"
            loading="lazy"
            decoding="async"
            className={cn(
              'size-full object-cover object-center',
              'transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-soft)]',
              'grayscale-[40%] group-hover:scale-[1.07] group-hover:grayscale-0',
            )}
          />

          {/* Sheen. Crosses the portrait once on hover. */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12',
              'bg-gradient-to-r from-transparent via-white/25 to-transparent',
              'transition-transform duration-[1100ms] ease-[var(--ease-out-soft)]',
              'group-hover:translate-x-[500%]',
            )}
          />

          {/* How long we have known each other — the one number worth
              putting on the picture. */}
          <span className="absolute top-2 right-2 rounded-full border border-white/20 bg-black/45 px-2 py-0.5 font-mono text-[0.65rem] tracking-wide text-white/90 backdrop-blur-sm transition-transform duration-400 ease-out group-hover:-translate-y-0.5">
            {ui.friends.yearsShort(toBanglaDigits(years))}
          </span>

          {/* Inner hairline, so a light photo still meets the border cleanly. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset"
          />
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-3.5">
          <h3 className="text-sm leading-snug font-semibold sm:text-[0.95rem]">
            {friend.name}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wide text-accent">
            {/* Rule that draws out on hover — the card's one moving detail
                that is not on the photo. */}
            <span
              aria-hidden="true"
              className="h-px w-3 shrink-0 bg-accent/50 transition-all duration-500 ease-out group-hover:w-5 group-hover:bg-accent"
            />
            <span className="min-w-0 truncate">{friend.profession}</span>
          </p>

          {friend.note && (
            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted">
              {friend.note}
            </p>
          )}

          <p className="mt-auto pt-3 font-mono text-[0.62rem] tracking-wide text-faint">
            {ui.friends.since(toBanglaDigits(friend.since))}
            {friend.where && ` · ${ui.friends.met(friend.where)}`}
          </p>
        </div>
      </motion.div>
    </article>
  );
}
