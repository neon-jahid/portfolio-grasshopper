# Jahid Hasan — Portfolio & Blog

Personal portfolio and blog for a Software Quality Assurance engineer, built
with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**.

The site is personal-first: a split hero with a character illustration, a
personal "about" panel, one short "work" card, the blog, and a contact card.
The long-form professional sections (skills, projects, experience) are
written and ready but switched **off** by default; flip one flag to bring
any of them back.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint
```

---

## Where to put your own content

All copy lives in plain data files — you should not need to touch a component
to make the site yours.

| What | File |
| --- | --- |
| Name, role, tagline, email, socials | `src/data/site.js` → `profile` |
| About copy, interests | `src/data/site.js` → `personal` |
| Short work summary and focus areas | `src/data/site.js` → `professional` |
| Which sections appear, and in what order | `src/data/site.js` → `sections` |
| Skill groups (when the skills section is on) | `src/data/skills.js` |
| Projects | `src/data/projects.js` |
| Work history, education, certifications | `src/data/experience.js` |
| Blog posts | `src/content/posts/*.md` |
| Colours, fonts, spacing | `src/index.css` (`@theme` block) |
| Résumé PDF | `public/resume.pdf` |
| Hero / about illustrations | `src/assets/hero-portrait.png`, `src/assets/about-portrait.png` |

### Turning sections on and off

`sections` in `src/data/site.js` is the page composition. It drives the render
order, the navigation and the scroll-spy at once, so they cannot drift apart:

```js
export const sections = [
  { id: 'about',      label: 'about',      enabled: true  },
  { id: 'work',       label: 'work',       enabled: true  }, // short card
  { id: 'skills',     label: 'skills',     enabled: false }, // ← flip to true
  { id: 'projects',   label: 'projects',   enabled: false },
  { id: 'experience', label: 'experience', enabled: false },
  { id: 'blog',       label: 'blog',       enabled: true  },
  { id: 'contact',    label: 'contact',    enabled: true  },
];
```

Reorder the array to reorder the page. To add a brand-new section, write the
component, register it in `SECTION_COMPONENTS` in `src/pages/Home.jsx`, and
add a row here.

### Swapping the illustrations

Both images render through the shared `<Portrait>` component, which puts the
artwork on a dark plate with an accent glow and a slow float.

The current files were rebuilt from the mockups in `src/Docs/`: the character
was cut out, upscaled and recomposed on a matching dark plate at 900×1200
(hero) and 1400×1050 (about). They are limited by the resolution of the
source screenshots — replace them with the original artwork when you have it.

Keep the same aspect ratios (3:4 and 4:3) and the files drop straight in.
Different proportions? Update `ratios` in `src/components/ui/Portrait.jsx`.

### Adding a blog post

Create a markdown file in `src/content/posts/`. The filename becomes the URL
slug (`api-testing.md` → `/blog/api-testing`). Nothing else to register — the
post list is built from the folder at build time.

```markdown
---
title: A Practical Start to API Testing
date: 2026-06-02
excerpt: One or two sentences shown on the post card.
tags: [api, postman]
featured: false
draft: false
---

Body content in **markdown**. Headings, lists, tables and code blocks are all
styled by the `.prose` rules in `src/index.css`.
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `date` | yes | ISO `YYYY-MM-DD`, used for sorting |
| `excerpt` | yes | shown on cards and used as the meta description |
| `tags` | no | drives the tag filter on `/blog` |
| `featured` | no | reserved for promoting a post |
| `draft` | no | `true` hides the post everywhere |

Reading time is calculated from the body — you never set it by hand.

---

## Project structure

```
src/
├── App.jsx                  Route table + lazy-loaded pages
├── main.jsx                 Entry: Router → ThemeProvider → App
├── index.css                Design tokens, base styles, .prose typography
│
├── data/                    All site content (see table above)
├── content/posts/           Blog posts as markdown
├── assets/                  Hero and about illustrations
├── Docs/                    Design mockups the layout was built from
│
├── lib/
│   ├── posts.js             Loads/parses/sorts posts, search + related posts
│   ├── frontmatter.js       Tiny YAML front-matter parser
│   ├── motion.js            Shared animation variants and easing
│   ├── scroll.js            Scroll + href helpers
│   └── utils.js             cn, formatDate, readingTime, slugify
│
├── hooks/
│   ├── useTheme.js          Read/toggle the colour theme
│   ├── useScrollSpy.js      Which section is in view (IntersectionObserver)
│   ├── useMediaQuery.js     Media queries, incl. prefers-reduced-motion
│   ├── useLockBodyScroll.js Freeze scrolling behind the mobile menu
│   └── usePageMeta.js       Per-page <title> and meta description
│
├── context/
│   ├── theme-context.js     Context object (own file, for Fast Refresh)
│   └── ThemeProvider.jsx    Syncs theme ↔ <html> class ↔ localStorage
│
├── components/
│   ├── ui/                  Reusable, content-agnostic building blocks
│   │   ├── Container, Section, SectionHeader
│   │   ├── Button, Tag, Card, SkillMeter, Timeline
│   │   ├── Reveal            scroll-in animation wrapper
│   │   ├── SmartLink         route / section-anchor / external link in one
│   │   ├── Portrait          framed, floating illustration
│   │   ├── ProjectCard, PostCard, ReadingProgress
│   ├── layout/              App shell: Header, MobileMenu, Footer,
│   │                        ThemeToggle, ScrollProgress, BackToTop,
│   │                        ScrollManager, Layout
│   └── icons/               One inline SVG set, used via <Icon name="…" />
│
├── sections/                Home-page sections (Hero, About, Professional,
│                            Skills, Projects, Experience, BlogPreview,
│                            Contact)
└── pages/                   Routed pages (Home, Blog, BlogPost, NotFound)
```

### The rule that keeps it maintainable

- `components/ui/**` knows nothing about *your* content — it takes props.
- `sections/**` and `pages/**` pull from `data/**` and arrange `ui` components.
- `data/**` and `content/**` hold the words.

Changing content never means editing a component; changing layout never means
editing content.

---

## Theming

Every colour, font and spacing value is a token in the `@theme` block of
`src/index.css`. Components only reference semantic names — `bg-surface`,
`text-muted`, `border-line`, `text-accent` — so re-skinning the site is a
single-file change.

Dark mode is class-based (`.dark` on `<html>`), driven by `ThemeProvider` and
persisted to `localStorage`. A small inline script in `index.html` applies the
stored theme before first paint, so there is no flash of the wrong theme.

### The background

`components/layout/PageBackground.jsx` is mounted once in the layout and sits
behind every page: three large colour glows that drift slowly out of sync,
with a film-grain overlay on top. It is fixed, `-z-10` and non-interactive.

Its colours are the `--color-glow-1/2/3` tokens in `src/index.css` — teal,
warm amber and soft lilac — separate from the content palette, so you can
change the mood of the page without touching text or component colours. The
neutrals themselves are warm (paper in light mode, warm charcoal in dark)
rather than the cool greys a corporate site would use.

The drift keyframes live in `index.css` and stop under
`prefers-reduced-motion`.

## Animation

Shared variants live in `src/lib/motion.js`, so every section enters with the
same timing and easing.

```jsx
<Reveal>…</Reveal>                    // fade + rise when scrolled into view

<Reveal.Group>                        // stagger children
  <Reveal.Item>…</Reveal.Item>
</Reveal.Group>
```

The site also respects `prefers-reduced-motion`: transitions and animations
are reduced to near-zero for visitors who ask for it.

## Accessibility notes

- Skip-to-content link, landmark elements and labelled sections
- Visible focus rings on every interactive element
- `aria-current` on the active nav link, `aria-pressed` on tag filters
- Escape closes the mobile menu; body scroll is locked while it is open
- Decorative graphics are `aria-hidden`

## Deploying

Any static host works. The blog uses client-side routing, so the host must
rewrite unknown paths to `index.html`:

- **Netlify** — `public/_redirects` is already included.
- **Vercel** — add a rewrite from `/(.*)` to `/index.html`.
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` after building.

```bash
npm run build   # output in dist/
```
