import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { cn, photoSrcSet, toBanglaDigits } from '../../lib/utils';
import { ui } from '../../data/ui';

/**
 * One person in the friends grid.
 *
 * The photo does all the interactive work — the card leans towards the
 * pointer, lifts off the page, and the portrait warms from half-desaturated
 * to full colour while a sheen crosses it. None of that carries meaning: it
 * is there so a wall of six portraits feels like something you can touch
 * rather than a contact sheet.
 *
 * Which is also why every fact stays on the page at rest. Name, profession
 * and the year the friendship started are readable without hovering, so the
 * card reads the same on a phone, under a keyboard, and for anyone who asked
 * the OS to stop things moving.
 *
 * @param {object} props
 * @param {import('../../data/friends').Friend} props.friend
 */
export function FriendCard({ friend, className }) {
  const tilt = useTilt({ max: 7 });

  // Recomputed on every render rather than stored, so the data file only ever
  // holds the start year and the count can never go stale.
  const years = new Date().getFullYear() - Number(friend.since);

  return (
    <article className={cn('group h-full [perspective:1200px]', className)}>
      <motion.div
        {...tilt.handlers}
        style={tilt.enabled ? tilt.style : undefined}
        whileHover={tilt.enabled ? { y: -6 } : undefined}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface',
          'transition-[border-color,box-shadow] duration-400 ease-out',
          'group-hover:border-accent/45',
          'group-hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.5)]',
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
          <img
            src={friend.src}
            alt={ui.friends.portraitAlt(friend.name)}
            // A `.webp` pair written by `npm run photos` gets a srcset for
            // free; the placeholder SVGs have no second size, so `photoSrcSet`
            // returns undefined and the browser just uses `src`.
            srcSet={photoSrcSet(friend.src)}
            // Three columns inside a 72rem container, two from `sm`, one below.
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
            loading="lazy"
            decoding="async"
            className={cn(
              'size-full object-cover object-center',
              'transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-soft)]',
              'grayscale-[45%] group-hover:scale-[1.07] group-hover:grayscale-0',
            )}
          />

          {/* Scrim. Always faintly there so the names stay legible, deepens
              on hover as the portrait brightens underneath it. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-95"
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

          {/* Since when. */}
          <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-white/85 backdrop-blur-sm transition-transform duration-400 ease-out group-hover:-translate-y-0.5 sm:top-4 sm:left-4">
            {ui.friends.since(toBanglaDigits(friend.since))}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {friend.name}
            </h3>
            <p className="mt-0.5 font-mono text-[0.72rem] tracking-wide text-white/70">
              {friend.profession}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Accent rule, drawn out on hover. */}
          <span
            aria-hidden="true"
            className="block h-px w-8 bg-accent/60 transition-all duration-500 ease-out group-hover:w-16 group-hover:bg-accent"
          />

          {friend.note && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{friend.note}</p>
          )}

          <p className="mt-auto pt-4 font-mono text-[0.7rem] tracking-wide text-faint">
            {ui.friends.duration(toBanglaDigits(years))}
            {friend.where && ` · ${ui.friends.met(friend.where)}`}
          </p>
        </div>
      </motion.div>
    </article>
  );
}
