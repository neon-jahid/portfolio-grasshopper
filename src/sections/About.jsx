import { motion } from 'framer-motion';
import { personal, profile } from '../data/site';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Portrait } from '../components/ui/Portrait';
import { Tag } from '../components/ui/Tag';
import { ArrowRightIcon, MapPinIcon } from '../components/icons';
import { fadeUp, staggerContainer, whenInView } from '../lib/motion';
import aboutPortrait from '../assets/about-portrait.webp';
import { ui } from '../data/ui';

/**
 * About: the personal half of the site.
 *
 * Mirrors the hero's split layout — copy on the left, illustration on the
 * right — but leads with a two-line headline instead of a section rule, so
 * the two panels read as a pair without looking identical.
 *
 * Content lives in `personal` in data/site.js.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden py-section"
    >
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div {...whenInView} variants={staggerContainer(0.1)}>
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
            >
              {ui.about.eyebrow}
            </motion.p>

            <motion.h2
              id="about-title"
              variants={fadeUp}
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {personal.headline.first}
              <span className="mt-1 block text-gradient">
                {personal.headline.second}
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-xl text-muted">
              {personal.lead}
            </motion.p>

            {personal.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeUp}
                className="mt-5 max-w-xl leading-relaxed text-muted"
              >
                {paragraph}
              </motion.p>
            ))}

            {personal.interests.length > 0 && (
              <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
                {personal.interests.map((interest) => (
                  <li key={interest}>
                    <Tag>{interest}</Tag>
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href="#contact">
                {ui.about.contact}
                <ArrowRightIcon className="size-4" />
              </Button>

              <p className="inline-flex items-center gap-2 font-mono text-xs text-faint">
                <MapPinIcon className="size-4 text-accent" />
                {profile.location}
              </p>
            </motion.div>
          </motion.div>

          <Portrait
            src={aboutPortrait}
            alt={ui.about.portraitAlt}
            ratio="wide"
            floatOffset={8}
            className="mx-auto w-full max-w-lg"
          />
        </div>
      </Container>
    </section>
  );
}
