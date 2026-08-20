import { motion } from 'framer-motion';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Professional } from '../sections/Professional';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { BlogPreview } from '../sections/BlogPreview';
import { Contact } from '../sections/Contact';
import { usePageMeta } from '../hooks/usePageMeta';
import { enabledSections, profile } from '../data/site';
import { pageTransition } from '../lib/motion';

/**
 * Maps a section id from the registry to the component that renders it.
 * Adding a section means adding a component here and an entry in
 * `sections` in data/site.js — nothing else changes.
 */
const SECTION_COMPONENTS = {
  about: About,
  work: Professional,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  blog: BlogPreview,
  contact: Contact,
};

/**
 * The single-page portfolio.
 *
 * The hero is always first; everything after it is driven by the `sections`
 * registry in data/site.js, which also drives the navigation and the
 * scroll-spy — so page order, nav order and highlighting can never disagree.
 */
export default function Home() {
  usePageMeta({
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  });

  return (
    <motion.div {...pageTransition}>
      <Hero />

      {enabledSections.map(({ id }) => {
        const SectionComponent = SECTION_COMPONENTS[id];
        return SectionComponent ? <SectionComponent key={id} /> : null;
      })}
    </motion.div>
  );
}
