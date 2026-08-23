import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';

/**
 * The lowercase section title with a rule that draws itself across the page.
 *
 * @param {object} props
 * @param {string} props.title    e.g. 'projects'
 * @param {string} [props.eyebrow] small mono label above the title
 * @param {string} [props.description] supporting line under the title
 * @param {string} [props.id]     anchor id, usually the section's own id
 */
export function SectionHeader({ title, eyebrow, description, id, className }) {
  return (
    <header className={cn('mb-8 sm:mb-12', className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase"
        >
          {eyebrow}
        </motion.p>
      )}

      <div className="flex items-center gap-4 sm:gap-5">
        <motion.h2
          id={id ? `${id}-title` : undefined}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="shrink-0 text-2xl font-semibold lowercase sm:text-4xl"
        >
          {title}
        </motion.h2>

        {/* The rule grows from the title outwards as the header scrolls in. */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="h-px flex-1 origin-left bg-line"
        />
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="mt-4 max-w-2xl text-muted"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
