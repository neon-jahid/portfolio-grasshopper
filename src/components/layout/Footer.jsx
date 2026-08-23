import { navLinks, profile, socials } from '../../data/site';
import { Container } from '../ui/Container';
import { SmartLink } from '../ui/SmartLink';
import { Icon } from '../icons';
import { ui } from '../../data/ui';
import { toBanglaDigits } from '../../lib/utils';

/** Site footer: navigation repeat, socials and the copyright line. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/70 backdrop-blur-sm">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm">
              <span className="text-accent">&lt;</span>
              <span className="font-sans font-semibold">{profile.name}</span>
              <span className="text-accent">/&gt;</span>
            </p>
            <p className="mt-3 text-sm text-muted">{profile.tagline}</p>
          </div>

          <nav aria-label={ui.chrome.navFooter}>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="text-sm lowercase text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={social.icon} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 border-t border-line pt-6 font-mono text-xs text-faint">
          {ui.chrome.copyright(toBanglaDigits(year), profile.name)}
        </p>
      </Container>
    </footer>
  );
}
