import { testimonials, testimonialsIntro } from '../data/testimonials';
import { Section } from '../components/ui/Section';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Reveal } from '../components/ui/Reveal';
import { QuoteIcon } from '../components/icons';

/**
 * Testimonials.
 *
 * Off by default in the `sections` registry — the shipped quotes are
 * placeholders, and placeholder praise is worse than no praise at all. Fill
 * in data/testimonials.js with real words from real people, then flip the
 * flag in data/site.js.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      eyebrow={testimonialsIntro.eyebrow}
      title={testimonialsIntro.title}
      description={testimonialsIntro.description}
    >
      <Reveal.Group className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Reveal.Item key={testimonial.id}>
            <SpotlightCard as="figure" className="h-full p-7">
              <QuoteIcon className="size-7 text-accent/60 transition-transform duration-500 ease-out group-hover:scale-110" />

              <blockquote className="mt-5 text-sm leading-relaxed text-muted">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-xs text-accent">
                  {initialsOf(testimonial)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {testimonial.name}
                  </span>
                  <span className="block truncate font-mono text-xs text-faint">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </SpotlightCard>
          </Reveal.Item>
        ))}
      </Reveal.Group>
    </Section>
  );
}

/** Explicit initials if the data has them, otherwise the first letters of the name. */
function initialsOf({ initials, name }) {
  if (initials) return initials;

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
