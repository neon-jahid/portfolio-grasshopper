import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { currently, interests, interestsIntro } from '../data/interests';
import { Section } from '../components/ui/Section';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Reveal } from '../components/ui/Reveal';
import { ArrowUpRightIcon, Icon } from '../components/icons';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { cn } from '../lib/utils';
import { ui } from '../data/ui';
import { EASE, fadeUp, staggerContainer, whenInView } from '../lib/motion';

/**
 * Footprint of each card in the bento grid.
 *
 * The grid is four columns wide from `lg` up; below that everything collapses
 * to one or two columns and the spans stop mattering.
 */
const SPANS = {
  sm: 'lg:col-span-1',
  md: 'sm:col-span-2 lg:col-span-2',
  lg: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
};

/**
 * Interests: the personal half of "what I do", as a bento grid.
 *
 * Card size is content-driven — `span` in data/interests.js decides how much
 * of the grid each one takes — so reordering or resizing the section never
 * means touching this file.
 *
 * The "right now" panel is the last cell rather than a section of its own: it
 * is the sort of thing worth updating every couple of months, and burying it
 * in its own heading makes it look more permanent than it is.
 */
export function Interests() {
  return (
    <Section
      id="interests"
      eyebrow={interestsIntro.eyebrow}
      title={interestsIntro.title}
      description={interestsIntro.description}
    >
      <Reveal.Group
        stagger={0.09}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(11rem,auto)]"
      >
        {interests.map((interest) => (
          <Reveal.Item
            key={interest.id}
            className={cn(SPANS[interest.span] ?? SPANS.sm)}
          >
            <InterestCard interest={interest} featured={interest.span === 'lg'} />
          </Reveal.Item>
        ))}

        <Reveal.Item className="sm:col-span-2 lg:col-span-2">
          <CurrentlyPanel />
        </Reveal.Item>
      </Reveal.Group>
    </Section>
  );
}

/**
 * One interest. The featured variant gets the icon as an oversized watermark
 * behind the copy, which is what stops a two-by-two card reading as empty.
 */
function InterestCard({ interest, featured }) {
  return (
    <SpotlightCard className="h-full p-6 sm:p-7">
      {featured && (
        <Icon
          name={interest.icon}
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -bottom-10 size-52 text-accent/[0.07] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-6"
        />
      )}

      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-xl bg-accent-soft text-accent',
          'transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110',
          featured ? 'size-12' : 'size-10',
        )}
      >
        <Icon name={interest.icon} className={featured ? 'size-6' : 'size-5'} />
      </span>

      <h3
        className={cn(
          'mt-5 font-semibold',
          featured ? 'text-xl sm:text-2xl' : 'text-base',
        )}
      >
        {interest.title}
      </h3>

      <p
        className={cn(
          'mt-2 text-muted',
          featured ? 'max-w-md text-base leading-relaxed' : 'text-sm',
        )}
      >
        {interest.description}
      </p>

      {/* The featured card doubles as a link through to the gallery. */}
      {featured && interest.id === 'photography' && (
        <Link
          to="/photos"
          className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-xs text-accent transition-transform duration-300 hover:translate-x-0.5"
        >
          {ui.photography.seeGallery}
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      )}

      {interest.meta && (
        <p className="mt-auto pt-5 font-mono text-[0.7rem] tracking-wide text-faint">
          {interest.meta}
        </p>
      )}
    </SpotlightCard>
  );
}

/** The dated "what I am on right now" list. */
function CurrentlyPanel() {
  // The pulse is a JS animation, so the CSS reduced-motion rule cannot reach
  // it — it has to be switched off here, as <Portrait> does with its float.
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <SpotlightCard className="h-full p-6 sm:p-7">
      <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-faint uppercase">
        {/* Live dot: a slow pulse behind a solid centre. */}
        <span className="relative flex size-2">
          <motion.span
            aria-hidden="true"
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-accent opacity-60"
          />
          <span className="relative size-2 rounded-full bg-accent" />
        </span>
        {currently.label}
      </p>

      <motion.dl
        {...whenInView}
        variants={staggerContainer(0.07, 0.1)}
        className="mt-5 space-y-3.5"
      >
        {currently.items.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3.5 last:border-0 last:pb-0"
          >
            <dt className="w-24 shrink-0 font-mono text-xs text-faint">
              {item.label}
            </dt>
            <dd className="min-w-0 flex-1 text-sm text-muted">{item.value}</dd>
          </motion.div>
        ))}
      </motion.dl>

      {currently.updated && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          className="mt-auto pt-5 font-mono text-[0.7rem] text-faint"
        >
          {currently.updated}
        </motion.p>
      )}
    </SpotlightCard>
  );
}
