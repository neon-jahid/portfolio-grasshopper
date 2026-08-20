import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, socials } from '../../data/site';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { SmartLink } from '../ui/SmartLink';
import { CloseIcon, Icon } from '../icons';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';

/** Panel slides in from the right; its links arrive one after another. */
const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: EASE, staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: { x: '100%', transition: { duration: 0.3, ease: EASE } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Full-height navigation drawer for small screens.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {(href: string) => boolean} props.isLinkActive
 */
export function MobileMenu({ isOpen, onClose, isLinkActive }) {
  useLockBodyScroll(isOpen);

  // Escape closes the drawer, matching the behaviour of a native dialog.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
          />

          <motion.nav
            aria-label="Mobile"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-y-0 right-0 flex w-4/5 max-w-sm flex-col border-l border-line bg-surface p-6"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <ul className="mt-8 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <SmartLink
                    href={link.href}
                    onNavigate={onClose}
                    className={cn(
                      'flex items-baseline gap-3 rounded-xl px-3 py-3 text-lg lowercase transition-colors',
                      isLinkActive(link.href)
                        ? 'bg-accent-soft text-accent'
                        : 'text-ink hover:bg-surface-2',
                    )}
                  >
                    <span className="font-mono text-xs text-faint">
                      0{index + 1}
                    </span>
                    {link.label}
                  </SmartLink>
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={itemVariants}
              className="mt-auto flex gap-2 border-t border-line pt-6"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={social.icon} className="size-5" />
                </a>
              ))}
            </motion.div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
