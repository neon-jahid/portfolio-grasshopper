import { professional, profile } from '../data/site';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { Icon } from '../components/icons';
import { iconTone } from '../components/icons/tones';
import { cn } from '../lib/utils';
import { ui } from '../data/ui';

/**
 * The short version of the day job.
 *
 * Deliberately one card: a couple of sentences and three focus areas, and
 * that is the whole of the day job on this site. The long-form `skills`,
 * `projects` and `experience` sections exist but are off by default — see
 * `sections` in data/site.js.
 */
export function Professional() {
  return (
    <Section id="work" eyebrow={ui.work.eyebrow} title={ui.work.title}>
      <Reveal>
        <Card className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="text-lg leading-relaxed text-muted">
              {professional.summary}
            </p>

            <p className="mt-8 font-mono text-xs text-faint">
              {ui.work.current(profile.role, profile.location)}
            </p>
          </div>

          <ul className="space-y-3 lg:border-l lg:border-line lg:pl-14">
            {professional.focus.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-xl',
                    iconTone(item.icon).chip,
                  )}
                >
                  <Icon name={item.icon} className="size-4.5" />
                </span>
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </Section>
  );
}
