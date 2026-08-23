import { motion } from 'framer-motion';
import { profile, socials } from '../data/site';
import { Container } from '../components/ui/Container';
import { fadeUp, staggerContainer, whenInView } from '../lib/motion';
import { ui } from '../data/ui';

/**
 * Contact: an email address and nothing else.
 *
 * No card, no form, no icon buttons — a personal site only needs to make the
 * address easy to find and easy to click. The address itself is the largest
 * thing on the screen.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-section"
    >
      <Container size="narrow">
        <motion.div
          {...whenInView}
          variants={staggerContainer(0.1)}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.2em] text-accent uppercase"
          >
            {ui.contact.eyebrow}
          </motion.p>

          <motion.h2
            id="contact-title"
            variants={fadeUp}
            className="mt-5 text-3xl font-semibold sm:text-4xl"
          >
            {ui.contact.heading}
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-block text-xl font-medium break-all sm:text-3xl"
            >
              {profile.email}
              {/* Underline draws itself in from the left on hover. */}
              <span
                aria-hidden="true"
                className="mt-1 block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-6 font-mono text-sm"
          >
            {socials
              .filter((social) => !social.href.startsWith('mailto:'))
              .map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
