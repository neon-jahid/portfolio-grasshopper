/**
 * Skills, grouped into the cards shown by the Skills section.
 *
 * `level` (0-100) drives the meter on each row. Remove the property and the
 * row renders without a meter.
 */

export const skillGroups = [
  {
    id: 'testing',
    title: 'Testing & QA',
    description: 'How I plan, design and run tests.',
    icon: 'checklist',
    skills: [
      { name: 'Manual & Exploratory Testing', level: 92 },
      { name: 'Test Case Design', level: 90 },
      { name: 'Regression & Smoke Suites', level: 85 },
      { name: 'Bug Reporting & Triage', level: 88 },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Tools that make the repetitive parts repeatable.',
    icon: 'robot',
    skills: [
      { name: 'Selenium WebDriver', level: 80 },
      { name: 'Playwright', level: 75 },
      { name: 'Cypress', level: 70 },
      { name: 'TestNG / JUnit', level: 72 },
    ],
  },
  {
    id: 'api-performance',
    title: 'API & Performance',
    description: 'Checking the layers users never see.',
    icon: 'pulse',
    skills: [
      { name: 'Postman & Newman', level: 88 },
      { name: 'REST Assured', level: 70 },
      { name: 'Apache JMeter', level: 68 },
      { name: 'SQL for test data', level: 75 },
    ],
  },
  {
    id: 'process',
    title: 'Process & Tooling',
    description: 'The workflow around the testing.',
    icon: 'workflow',
    skills: [
      { name: 'Jira / TestRail', level: 85 },
      { name: 'Agile & Scrum', level: 82 },
      { name: 'Git & CI pipelines', level: 74 },
      { name: 'Test Documentation', level: 90 },
    ],
  },
];

/** Compact badges rendered as a scrolling row under the hero. */
export const toolbelt = [
  'Selenium',
  'Playwright',
  'Cypress',
  'Postman',
  'JMeter',
  'Jira',
  'TestRail',
  'Git',
  'SQL',
  'Java',
  'JavaScript',
];
