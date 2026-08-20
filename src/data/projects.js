/**
 * Portfolio projects.
 *
 * `featured: true` promotes a project to the large two-column card.
 * Any empty string in `links` is skipped when rendering.
 */

export const projects = [
  {
    id: 'ecommerce-regression',
    title: 'E-commerce Regression Suite',
    summary:
      'End-to-end automated regression coverage for a multi-vendor storefront, wired into CI so every pull request gets a verdict.',
    highlights: [
      '180+ automated scenarios across checkout, search and account flows',
      'Cut the manual regression pass from two days to forty minutes',
      'Page Object Model structure so new pages take minutes to cover',
    ],
    stack: ['Playwright', 'JavaScript', 'GitHub Actions', 'Allure'],
    type: 'Automation',
    featured: true,
    links: {
      repo: 'https://github.com/',
      live: '',
      caseStudy: '',
    },
  },
  {
    id: 'api-contract-checks',
    title: 'API Contract Test Pack',
    summary:
      'A Postman and Newman collection validating schema, status codes and auth rules for a payments API across three environments.',
    highlights: [
      'Environment-driven collection: one run covers three environments',
      'Schema assertions catch breaking changes before release',
      'Runs nightly and posts a summary back to the team channel',
    ],
    stack: ['Postman', 'Newman', 'JSON Schema', 'Node.js'],
    type: 'API Testing',
    featured: true,
    links: { repo: 'https://github.com/', live: '', caseStudy: '' },
  },
  {
    id: 'load-baseline',
    title: 'Load & Performance Baseline',
    summary:
      'A JMeter test plan establishing response-time baselines for the ten busiest endpoints, with budgets that fail the build on regression.',
    highlights: [
      'Ramped load profiles modelled on real traffic patterns',
      'Documented p95 budget per endpoint',
    ],
    stack: ['JMeter', 'Grafana', 'SQL'],
    type: 'Performance',
    featured: false,
    links: { repo: 'https://github.com/', live: '', caseStudy: '' },
  },
  {
    id: 'mobile-test-strategy',
    title: 'Mobile Release Test Strategy',
    summary:
      'A written strategy and reusable checklist covering device matrix, offline behaviour and release-candidate sign-off for an Android app.',
    highlights: [
      'Risk-based device matrix instead of testing everything everywhere',
      'Checklist reused across six consecutive releases',
    ],
    stack: ['Appium', 'TestRail', 'Android'],
    type: 'Strategy',
    featured: false,
    links: { repo: '', live: '', caseStudy: '' },
  },
];

/** Derived lists so components never re-filter the same array. */
export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
