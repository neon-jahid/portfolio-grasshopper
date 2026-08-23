import { motion } from 'framer-motion';
import { profile, socials } from '../data/site';
import { Container } from '../components/ui/Container';
import { iconTone } from '../components/icons/tones';
import { cn } from '../lib/utils';
import { fadeUp, staggerContainer, whenInView } from '../lib/motion';
import { ui } from '../data/ui';

/**
 * Contact: an envelope, and nothing to read off a screenshot.
 *
 * No card and no form, and the address is deliberately not printed — the
 * envelope under the heading is the `mailto:` link, so a visitor still gets
 * to the same place in one click while the text itself stays out of the page.
 * Note that the address does still sit in the link's `href`; hiding it from
 * the page is not the same as hiding it from a determined scraper.
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

          <motion.div variants={fadeUp} className="mt-10">
            <MailButton />
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

/**
 * The envelope: the only way the address appears on the page.
 *
 * Hovering or focusing it lifts the flap open: the flap is its own path, and
 * flipping it upside down around its top edge is exactly the motion a real
 * one makes. Everything is a CSS transform, so the global reduced-motion rule
 * in index.css switches the whole thing off for anyone who asks for that.
 *
 * It is bigger here than the icons in the hero and footer because it now
 * carries the section on its own, but it keeps their hue — see
 * components/icons/tones.js — so all three read as the same address.
 */
function MailButton() {
  const tone = iconTone('mail');

  return (
    <a
      href={`mailto:${profile.email}`}
      aria-label={ui.contact.mailLabel}
      className={cn(
        // inline-grid, so the centred text block above centres it too.
        'group relative inline-grid size-24 place-items-center rounded-full',
        'transition-transform duration-500 ease-out hover:-translate-y-1 active:scale-95',
        tone.chip,
      )}
    >
      {/* Ring. `border-current` picks up the hue from the chip above, so the
          two can never drift apart. */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full border border-current opacity-0',
          'transition-all duration-500 ease-out',
          'group-hover:scale-[1.18] group-hover:opacity-40',
          'group-focus-visible:scale-[1.18] group-focus-visible:opacity-40',
        )}
      />

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="size-11"
      >
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path
          d="M3.4 7.2 12 13.1l8.6-5.9"
          className={cn(
            'origin-top transition-transform duration-500 ease-out [transform-box:fill-box]',
            'group-hover:-scale-y-100 group-focus-visible:-scale-y-100',
          )}
        />
      </svg>
    </a>
  );
}
