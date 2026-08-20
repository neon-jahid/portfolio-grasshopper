import { createContext } from 'react';

/**
 * Colour-theme context.
 *
 * Kept in its own file (not next to the provider component) so the module
 * exports only a constant — React Fast Refresh can then hot-reload the
 * provider without losing state.
 *
 * @type {React.Context<{theme: 'light'|'dark', setTheme: Function, toggleTheme: Function}|null>}
 */
export const ThemeContext = createContext(null);

/** localStorage key holding the user's explicit choice. */
export const THEME_STORAGE_KEY = 'theme';
