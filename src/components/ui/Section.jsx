import { Container } from './Container';
import { SectionHeader } from './SectionHeader';
import { cn } from '../../lib/utils';

/**
 * A full page section: consistent vertical rhythm, gutter and header.
 *
 *   <Section id="projects" title="projects" description="...">
 *     ...content...
 *   </Section>
 *
 * @param {object} props
 * @param {string} props.id          anchor target, also used by the scroll-spy
 * @param {string} [props.title]     lowercase heading; omit to render no header
 * @param {string} [props.eyebrow]
 * @param {string} [props.description]
 * @param {'default'|'narrow'|'wide'} [props.size='default']
 */
export function Section({
  id,
  title,
  eyebrow,
  description,
  size = 'default',
  className,
  children,
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn('py-section', className)}
    >
      <Container size={size}>
        {title && (
          <SectionHeader
            id={id}
            title={title}
            eyebrow={eyebrow}
            description={description}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
