import { Fragment, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import { BackToTop } from './BackToTop';
import { ScrollManager } from './ScrollManager';
import { PageBackground } from './PageBackground';
import { ui } from '../../data/ui';

/** Shown while a lazily-loaded page is being fetched. */
function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status">
      <span className="size-8 animate-spin rounded-full border-2 border-line border-t-accent" />
      <span className="sr-only">{ui.chrome.loading}</span>
    </div>
  );
}

/**
 * App shell shared by every route.
 *
 * The routed page is rendered through `useOutlet` rather than `<Outlet />` so
 * it can be keyed by pathname: AnimatePresence then lets the outgoing page
 * finish its exit animation before the next one mounts, while the header,
 * footer and scroll chrome stay mounted throughout.
 *
 * `pt-18` matches the fixed header height.
 */
export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen flex-col">
      <PageBackground />
      <ScrollManager />
      <ScrollProgress />

      {/* Keyboard users can jump past the nav. Visible only when focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-accent-contrast"
      >
        {ui.chrome.skipToContent}
      </a>

      <Header />

      <main id="main" className="flex-1 pt-18">
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <Fragment key={location.pathname}>{outlet}</Fragment>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
