import { certifications, education, experience } from '../data/experience';
import { Section } from '../components/ui/Section';
import { Timeline } from '../components/ui/Timeline';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { CheckIcon } from '../components/icons';

/** Experience: work timeline on the left, education and certificates beside it. */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="the path so far"
      title="experience"
      description="Where I have worked, what I studied, and the certifications behind it."
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">
            Work
          </h3>
          <Timeline items={experience} />
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">
              Education
            </h3>
            <Timeline items={education} />
          </div>

          {certifications.length > 0 && (
            <div>
              <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-faint uppercase">
                Certifications
              </h3>

              <Reveal.Group className="space-y-3">
                {certifications.map((certification) => (
                  <Reveal.Item key={certification.id}>
                    <Card className="flex items-start gap-3 p-4">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <CheckIcon className="size-4" />
                      </span>

                      <div>
                        <p className="text-sm font-medium">{certification.name}</p>
                        <p className="mt-0.5 font-mono text-xs text-faint">
                          {certification.issuer} · {certification.year}
                        </p>
                      </div>
                    </Card>
                  </Reveal.Item>
                ))}
              </Reveal.Group>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
