import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { MoonIcon, SunIcon } from '../icons';
import { cn } from '../../lib/utils';
import { ui } from '../../data/ui';

/**
 * Light/dark switch. The two icons cross-fade and rotate through each other
 * so the change reads as one object turning over.
 */
export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? ui.chrome.themeToLight : ui.chrome.themeToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'relative grid size-10 place-items-center rounded-full border border-line',
        'text-muted transition-colors duration-300 hover:border-accent hover:text-accent',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 grid place-items-center"
        >
          {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
