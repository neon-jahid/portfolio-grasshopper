import { featuredProjects, otherProjects } from '../data/projects';
import { Section } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { ProjectCard } from '../components/ui/ProjectCard';

/**
 * Projects: featured work in a two-column grid, everything else below it in a
 * denser grid. Both use the same card component.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="selected work"
      title="projects"
      description="Test suites, tooling and strategy work. Swap these for your own once you have case studies to link."
    >
      <Reveal.Group className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <Reveal.Item key={project.id}>
            <ProjectCard project={project} featured />
          </Reveal.Item>
        ))}
      </Reveal.Group>

      {otherProjects.length > 0 && (
        <>
          <h3 className="mt-14 mb-5 font-mono text-xs tracking-[0.2em] text-faint uppercase">
            More work
          </h3>

          <Reveal.Group className="grid gap-5 sm:grid-cols-2">
            {otherProjects.map((project) => (
              <Reveal.Item key={project.id}>
                <ProjectCard project={project} />
              </Reveal.Item>
            ))}
          </Reveal.Group>
        </>
      )}
    </Section>
  );
}
