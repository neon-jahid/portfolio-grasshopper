import { useContext } from 'react';
import { ThemeContext } from '../context/theme-context';

/**
 * Read and change the colour theme.
 *
 * @returns {{ theme: 'light'|'dark', setTheme: Function, toggleTheme: Function }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>.');
  }

  return context;
}
