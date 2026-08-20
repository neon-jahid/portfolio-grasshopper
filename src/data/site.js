/**
 * Site-wide profile, page composition and links.
 *
 * This file is the single source of truth for "who is this site about" and
 * "which sections does the home page show". Edit here, not in components.
 */

export const profile = {
  name: 'Jahid Hasan',
  role: 'SQA Engineer',
  greeting: 'Hello, I am',
  /** One line under the hero heading. */
  tagline: 'I break software on purpose so your users never have to.',
  location: 'Dhaka, Bangladesh',
  email: 'zh08215@gmail.com',
  /** Drop your CV into /public and point this at it. */
  resumeUrl: '/resume.pdf',
  /** Availability pill in the hero. Set to '' to hide it. */
  availability: 'Open to new opportunities',
};

/**
 * The About section — deliberately personal rather than a CV in prose.
 *
 * `headline` renders on two lines, the second in the accent gradient.
 */
export const personal = {
  headline: { first: 'Jahid Hasan', second: 'Personal Life' },
  lead: 'Beyond the code and the breaking of software, I find balance and joy in life’s simpler, shared moments.',
  paragraphs: [
    'When I am not debugging or picking a feature apart, you will usually find me spending time with the people close to me — long walks, a good local cafe, and conversations that have nothing to do with release cycles.',
    'I am happiest outdoors, curious about vintage animation, and a firm believer that a full life outside work is what keeps the curiosity alive inside it.',
  ],
  /** Small chips under the copy. Keep them light and human. */
  interests: [
    'The outdoors',
    'Local cafés',
    'Vintage animation',
    'Long walks',
    'Photography',
  ],
};

/**
 * The professional section — deliberately brief.
 *
 * Two sentences and three focus areas. Anything longer belongs on the CV or
 * in the full `skills` / `projects` / `experience` sections, which can be
 * switched on below.
 */
export const professional = {
  summary:
    'By day I am a Software Quality Assurance Engineer. I plan and run the testing that decides whether a release ships — exploratory passes by hand, automated regression suites, and API checks that catch breakage before anyone sees it.',
  /** Three at most; the layout is built for a short row. */
  focus: [
    { id: 'manual', label: 'Manual & exploratory testing', icon: 'checklist' },
    { id: 'automation', label: 'Test automation', icon: 'robot' },
    { id: 'api', label: 'API & performance testing', icon: 'pulse' },
  ],
  /** Where to send anyone who wants the long version. */
  cta: { label: 'Download résumé', href: '/resume.pdf' },
};

/**
 * Home-page composition.
 *
 * Order here is the order on the page, and `enabled` controls both rendering
 * and the navigation. The professional sections are switched off by default
 * to keep this a personal site — flip one to `true` to bring it back.
 */
export const sections = [
  { id: 'about', label: 'about', enabled: true },
  { id: 'work', label: 'work', enabled: true },
  { id: 'skills', label: 'skills', enabled: false },
  { id: 'projects', label: 'projects', enabled: false },
  { id: 'experience', label: 'experience', enabled: false },
  { id: 'blog', label: 'blog', enabled: true },
  { id: 'contact', label: 'contact', enabled: true },
];

/** Sections actually rendered, in page order. */
export const enabledSections = sections.filter((section) => section.enabled);

/** Section ids for the scroll-spy — derived, so it can never drift. */
export const sectionIds = enabledSections.map((section) => section.id);

/**
 * Navigation, derived from the same registry.
 * The blog link points at the archive page rather than the preview section.
 */
export const navLinks = enabledSections.map((section) => ({
  label: section.label,
  href: section.id === 'blog' ? '/blog' : `/#${section.id}`,
}));

/** Social profiles. `icon` must match a name exported from components/icons. */
export const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:zh08215@gmail.com', icon: 'mail' },
];
