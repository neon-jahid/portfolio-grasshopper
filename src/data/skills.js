/**
 * Skills, grouped into the cards shown by the Skills section.
 *
 * `level` (0-100) drives the meter on each row. Remove the property and the
 * row renders without a meter.
 *
 * Tool names stay in Latin script on purpose — nobody in a Dhaka standup says
 * "প্লেরাইট", they say "Playwright". Only the surrounding words are Bangla.
 */

export const skillGroups = [
  {
    id: 'testing',
    title: 'টেস্টিং ও কিউএ',
    description: 'যেভাবে টেস্ট প্ল্যান করি, সাজাই আর চালাই।',
    icon: 'checklist',
    skills: [
      { name: 'ম্যানুয়াল ও এক্সপ্লোরেটরি টেস্টিং', level: 92 },
      { name: 'টেস্ট কেস ডিজাইন', level: 90 },
      { name: 'রিগ্রেশন ও স্মোক স্যুট', level: 85 },
      { name: 'বাগ রিপোর্টিং ও ট্রায়াজ', level: 88 },
    ],
  },
  {
    id: 'automation',
    title: 'অটোমেশন',
    description: 'বারবার করার কাজগুলো যেসব টুল দিয়ে সামলাই।',
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
    title: 'API ও পারফরম্যান্স',
    description: 'ইউজার যে স্তরগুলো কখনো দেখে না, সেগুলো যাচাই করা।',
    icon: 'pulse',
    skills: [
      { name: 'Postman ও Newman', level: 88 },
      { name: 'REST Assured', level: 70 },
      { name: 'Apache JMeter', level: 68 },
      { name: 'টেস্ট ডেটার জন্য SQL', level: 75 },
    ],
  },
  {
    id: 'process',
    title: 'প্রসেস ও টুলিং',
    description: 'টেস্টিংকে ঘিরে যে কাজের ধারা।',
    icon: 'workflow',
    skills: [
      { name: 'Jira / TestRail', level: 85 },
      { name: 'Agile ও Scrum', level: 82 },
      { name: 'Git ও CI পাইপলাইন', level: 74 },
      { name: 'টেস্ট ডকুমেন্টেশন', level: 90 },
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
