import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeProvider';
import App from './App.jsx';
import './index.css';

/**
 * <Analytics /> sits inside the router so it sees client-side navigations —
 * /photos and /blog are route changes, not page loads, and it would otherwise
 * only ever record the first URL a visitor lands on.
 *
 * It renders nothing and only reports from a Vercel deployment; locally it
 * logs to the console instead of sending anything.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
