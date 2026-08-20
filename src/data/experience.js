/**
 * Work history, education and certifications — newest first.
 * `end: null` renders as "Present".
 */

export const experience = [
  {
    id: 'sqa-engineer',
    role: 'SQA Engineer',
    company: 'Company Name',
    location: 'Dhaka, Bangladesh',
    start: '2024',
    end: null,
    points: [
      'Own the release test plan for a web platform used by internal teams daily.',
      'Grew automated regression coverage and folded it into the CI pipeline.',
      'Partner with developers during refinement to catch requirement gaps early.',
    ],
  },
  {
    id: 'junior-qa',
    role: 'Junior QA Engineer',
    company: 'Previous Company',
    location: 'Dhaka, Bangladesh',
    start: '2023',
    end: '2024',
    points: [
      'Wrote and executed test cases for web and mobile releases.',
      'Reported and tracked defects through to verification.',
    ],
  },
];

export const education = [
  {
    id: 'bsc',
    role: 'BSc in Computer Science & Engineering',
    company: 'University Name',
    location: 'Bangladesh',
    start: '2019',
    end: '2023',
    points: [],
  },
];

/** Certifications shown as compact cards beside the timeline. */
export const certifications = [
  {
    id: 'istqb',
    name: 'ISTQB Certified Tester — Foundation Level',
    issuer: 'ISTQB',
    year: '2024',
  },
];
