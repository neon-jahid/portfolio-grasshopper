import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, THEME_STORAGE_KEY } from './theme-context';

/**
 * Read the theme that the inline script in index.html already applied.
 * Doing it this way keeps React in sync with the DOM and avoids a flash.
 *
 * @returns {'light'|'dark'}
 */
function getInitialTheme() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Provides the current colour theme and keeps three things in sync:
 * the `.dark` class on <html>, `color-scheme`, and localStorage.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* Private mode / storage disabled — the theme still applies for this visit. */
    }
  }, [theme]);

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      const hasExplicitChoice = (() => {
        try {
          return Boolean(localStorage.getItem(THEME_STORAGE_KEY));
        } catch {
          return false;
        }
      })();

      if (!hasExplicitChoice) setTheme(event.matches ? 'dark' : 'light');
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
