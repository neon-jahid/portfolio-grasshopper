import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeProvider';
import App from './App.jsx';
import { dismissPreloader } from './lib/preloader';
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

/**
 * Hand the screen over from the inline preloader in index.html to the app.
 *
 * Called here rather than from a component effect because the overlay is a
 * sibling of #root, not part of the tree — and because the thing it waits for
 * (fonts, first-screen images) is a property of the document, not of any one
 * route. React has taken over by this point; the module decides when the
 * result is worth showing.
 */
dismissPreloader();
