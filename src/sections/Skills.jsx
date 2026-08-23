import { skillGroups } from '../data/skills';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SkillMeter } from '../components/ui/SkillMeter';
import { Icon } from '../components/icons';
import { ui } from '../data/ui';

/**
 * Skills: one card per group, each listing its skills as animated meters.
 * Content comes from data/skills.js — this component only decides layout.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow={ui.skills.eyebrow}
      title={ui.skills.title}
      description={ui.skills.description}
    >
      <Reveal.Group className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal.Item key={group.id}>
            <Card className="h-full p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={group.icon} className="size-5" />
                </span>

                <div>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted">{group.description}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {group.skills.map((skill, index) => (
                  <SkillMeter
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 0.08}
                  />
                ))}
              </ul>
            </Card>
          </Reveal.Item>
        ))}
      </Reveal.Group>
    </Section>
  );
}
