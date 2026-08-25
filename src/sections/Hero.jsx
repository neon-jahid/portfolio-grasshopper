import { motion } from 'framer-motion';
import { profile, socials } from '../data/site';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Portrait } from '../components/ui/Portrait';
import { ArrowRightIcon, Icon } from '../components/icons';
import { iconTone } from '../components/icons/tones';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer } from '../lib/motion';
import heroPortrait from '../assets/hero-portrait.webp';
import { ui } from '../data/ui';

/**
 * Landing panel: introduction on the left, character illustration on the
 * right, over the shared <PageBackground>.
 *
 * The copy hangs off a vertical accent rule and the portrait sits a little
 * high in its column, so the panel reads as a poster rather than two even
 * halves — the about section below is the mirrored, evenly-weighted version
 * of the same split, and the two should not look interchangeable.
 *
 * Everything animates on mount rather than on scroll, because it is already
 * in view when the page loads.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[36rem] items-center overflow-hidden lg:min-h-[calc(100svh-4.5rem)]"
    >
      <Container className="relative py-14 sm:py-20">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            animate="visible"
            className="relative lg:border-l lg:border-line lg:pl-8"
          >
            {/* The rule beside the copy, drawn downwards on load. */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-px top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent via-accent/40 to-transparent lg:block"
            />

            {profile.availability && (
              <motion.p
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted sm:mb-8"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {profile.availability}
              </motion.p>
            )}

            <motion.p variants={fadeUp} className="font-mono text-sm text-accent">
              {profile.greeting}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-2xl font-medium text-gradient sm:text-3xl"
            >
              {profile.role}
            </motion.p>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-muted">
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
            >
              <Button href="#contact">
                {ui.hero.contact}
                <ArrowRightIcon className="size-4" />
              </Button>

              <ul className="ml-1 flex gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="grid size-11 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <Icon
                        name={social.icon}
                        className={cn('size-5', iconTone(social.icon).glyph)}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <Portrait
            src={heroPortrait}
            alt={ui.hero.portraitAlt(profile.name)}
            side="right"
            priority
            className="mx-auto w-full max-w-xs lg:max-w-sm lg:-translate-y-6"
          />
        </div>

        {/* Scroll cue. Hidden on short screens, where it would collide with
            the section below rather than point at it. */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute inset-x-0 bottom-2 mx-auto hidden w-fit flex-col items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] text-faint uppercase transition-colors duration-300 hover:text-accent lg:flex"
        >
          {ui.hero.scrollCue}
          <span
            aria-hidden="true"
            className="grid h-9 w-5 place-items-start rounded-full border border-line p-1"
          >
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block size-1.5 rounded-full bg-accent"
            />
          </span>
        </motion.a>
      </Container>
    </section>
  );
}
