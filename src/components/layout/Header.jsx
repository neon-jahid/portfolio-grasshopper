import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, profile, sectionIds } from '../../data/site';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { SmartLink } from '../ui/SmartLink';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { MenuIcon } from '../icons';
import { cn } from '../../lib/utils';
import { EASE } from '../../lib/motion';

/**
 * Sticky site header: wordmark, section nav, theme toggle and the mobile
 * menu trigger.
 *
 * The bar is transparent over the hero and gains a blurred background once
 * the visitor scrolls, so the hero stays uninterrupted on first paint.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll-spy only makes sense on the home page, where the sections live.
  const isHome = location.pathname === '/';
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** A nav link is active when its section is in view, or its route matches. */
  const isLinkActive = (href) => {
    if (href.includes('#')) {
      return isHome && href.split('#')[1] === activeSection;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'border-b border-line bg-canvas/80 backdrop-blur-md'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="group flex items-baseline gap-1 font-mono text-sm tracking-tight"
            aria-label={`${profile.name} — home`}
          >
            <span className="text-accent">&lt;</span>
            <span className="font-sans font-semibold">{profile.name}</span>
            <span className="text-accent">/&gt;</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);

                return (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-3 py-2 text-sm transition-colors duration-200',
                        active ? 'text-accent' : 'text-muted hover:text-ink',
                      )}
                    >
                      {link.label}
                      {active && (
                        // One shared pill slides between links via layoutId.
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                          transition={{ duration: 0.35, ease: EASE }}
                        />
                      )}
                    </SmartLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLinkActive={isLinkActive}
      />
    </>
  );
}
