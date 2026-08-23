import { Card } from './Card';
import { Tag, TagList } from './Tag';
import { ArrowUpRightIcon, GithubIcon } from '../icons';
import { cn } from '../../lib/utils';
import { ui } from '../../data/ui';

/**
 * Renders one project.
 *
 * Two layouts share this component so the styling stays in one file:
 *   featured -> wide card with highlight bullets
 *   compact  -> smaller card for the secondary grid
 *
 * @param {object} props
 * @param {import('../../data/projects').projects[number]} props.project
 * @param {boolean} [props.featured=false]
 */
export function ProjectCard({ project, featured = false }) {
  const { title, summary, highlights, stack, type, links } = project;

  /** Only render links that actually have a URL. */
  const availableLinks = [
    links?.repo && { href: links.repo, label: ui.projects.code, icon: GithubIcon },
    links?.live && { href: links.live, label: ui.projects.live, icon: ArrowUpRightIcon },
    links?.caseStudy && {
      href: links.caseStudy,
      label: ui.projects.caseStudy,
      icon: ArrowUpRightIcon,
    },
  ].filter(Boolean);

  return (
    <Card interactive className={cn('group h-full p-6', featured && 'sm:p-8')}>
      {/* Accent line that draws across the top edge on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <h3
          className={cn(
            'font-semibold transition-colors group-hover:text-accent',
            featured ? 'text-2xl' : 'text-lg',
          )}
        >
          {title}
        </h3>
        <Tag variant="accent" className="shrink-0">
          {type}
        </Tag>
      </div>

      <p className="mt-3 text-muted">{summary}</p>

      {featured && highlights?.length > 0 && (
        <ul className="mt-5 space-y-2">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm text-muted">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <TagList items={stack} className="mt-6" />

      {availableLinks.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-4 border-t border-line pt-4">
          {availableLinks.map(({ href, label, icon: LinkIcon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <LinkIcon className="size-4" />
                {label}
                <span className="sr-only"> — {title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
