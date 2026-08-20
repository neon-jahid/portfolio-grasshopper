import { Reveal } from './Reveal';
import { cn } from '../../lib/utils';

/**
 * Vertical timeline used for both work history and education.
 *
 * @param {object} props
 * @param {Array<{id: string, role: string, company: string, location?: string,
 *   start: string, end: string|null, points?: string[]}>} props.items
 */
export function Timeline({ items, className }) {
  return (
    <Reveal.Group
      as="ol"
      className={cn('relative border-l border-line pl-6 sm:pl-8', className)}
    >
      {items.map((item) => (
        <Reveal.Item as="li" key={item.id} className="relative pb-10 last:pb-0">
          {/* Node sitting on the rail. */}
          <span
            aria-hidden="true"
            className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 size-2.5 rounded-full border-2 border-canvas bg-accent sm:-left-[calc(2rem+4.5px)]"
          />

          <p className="font-mono text-xs text-faint">
            {item.start} — {item.end ?? 'Present'}
          </p>

          <h3 className="mt-1 text-lg font-semibold">{item.role}</h3>

          <p className="text-sm text-accent">
            {item.company}
            {item.location && (
              <span className="text-faint"> · {item.location}</span>
            )}
          </p>

          {item.points?.length > 0 && (
            <ul className="mt-3 space-y-2">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-line"
                  />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </Reveal.Item>
      ))}
    </Reveal.Group>
  );
}
