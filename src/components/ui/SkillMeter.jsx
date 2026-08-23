import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { toBanglaDigits } from '../../lib/utils';

/**
 * A labelled proficiency bar that fills when scrolled into view.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {number} props.level 0-100
 * @param {number} [props.delay=0] stagger offset in seconds
 */
export function SkillMeter({ name, level, delay = 0 }) {
  return (
    <li>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm text-ink">{name}</span>
        <span className="font-mono text-xs text-faint">{toBanglaDigits(level)}%</span>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={name}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay }}
          className="h-full origin-left rounded-full bg-accent"
        />
      </div>
    </li>
  );
}
