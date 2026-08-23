# Jahid Hasan — Portfolio & Blog

Personal portfolio and blog for a Software Quality Assurance engineer, built
with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**.

**The site's content is in Bangla** — copy, blog posts, and the interface's own
labels. These developer docs stay in English. See
[Writing in Bangla](#writing-in-bangla) for how it is wired and how to switch
back to English.

The site is personal-first: a split hero with a character illustration, a
personal "about" panel, one short "work" card, a **photography** highlight
strip that opens into a full gallery at `/photos`, an **interests** bento
grid, the blog, and a contact card. The long-form professional sections (skills, projects,
experience) and testimonials are written and ready but switched **off** by
default; flip one flag to bring any of them back.

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
| Date language (`'en-GB'` / `'bn-BD'`) | `src/data/site.js` → `profile.locale` |
| About copy, interests | `src/data/site.js` → `personal` |
| Short work summary and focus areas | `src/data/site.js` → `professional` |
| Gallery photos, captions, filters and teaser copy | `src/data/photography.js` |
| Interests / hobbies and the "right now" panel | `src/data/interests.js` |
| Testimonials (section off by default) | `src/data/testimonials.js` |
| Which sections appear, and in what order | `src/data/site.js` → `sections` |
| Button labels, empty states, section headings | `src/data/ui.js` |
| Skill groups (when the skills section is on) | `src/data/skills.js` |
| Projects | `src/data/projects.js` |
| Work history, education, certifications | `src/data/experience.js` |
| Blog posts | `src/content/posts/*.md` |
| Colours, fonts, spacing | `src/index.css` (`@theme` block) |
| Résumé PDF | `public/resume.pdf` |
| Hero / about illustrations | `src/assets/hero-portrait.png`, `src/assets/about-portrait.png` |
| Gallery image files | `public/photos/` |

### Two kinds of words

`src/data/ui.js` is worth knowing about. The rest of `data/` holds *your*
content — who you are, what you shot, what you wrote. `ui.js` holds the
site's own furniture: button labels, empty states, screen-reader descriptions,
section headings. Nothing a component renders is written inside the JSX any
more, so the whole interface can be reworded from one file.

Some entries are functions rather than strings:

```js
total: (count) => `এখন পর্যন্ত ${count}টি লেখা।`,
```

That is on purpose. Bangla word order rarely matches English, so gluing a
number between two hardcoded fragments in a component produces a sentence that
cannot be translated without editing the component. Keeping the whole sentence
in `ui.js` means it can.

### Turning sections on and off

`sections` in `src/data/site.js` is the page composition. It drives the render
order, the navigation and the scroll-spy at once, so they cannot drift apart:

```js
export const sections = [
  { id: 'about',        label: 'about',        enabled: true  },
  { id: 'work',         label: 'work',         enabled: true  }, // short card
  { id: 'photography',  label: 'photos',       enabled: true, href: '/photos' },
  { id: 'interests',    label: 'interests',    enabled: true  },
  { id: 'skills',       label: 'skills',       enabled: false }, // ← flip to true
  { id: 'projects',     label: 'projects',     enabled: false },
  { id: 'experience',   label: 'experience',   enabled: false },
  { id: 'testimonials', label: 'testimonials', enabled: false },
  { id: 'blog',         label: 'blog',         enabled: true, href: '/blog' },
  { id: 'contact',      label: 'contact',      enabled: true  },
];
```

Reorder the array to reorder the page. To add a brand-new section, write the
component, register it in `SECTION_COMPONENTS` in `src/pages/Home.jsx`, and
add a row here.

`href` is optional. A section that also has a page of its own — photos, the
blog — points its nav link there instead of at the home-page anchor, while
still rendering a teaser section on the way down. Leave `href` off and the
link becomes `/#<id>`.

### Swapping the illustrations

Both images render through the shared `<Portrait>` component, which puts the
artwork on a dark plate with an accent glow and a slow float.

The current files were rebuilt from the mockups in `src/Docs/`: the character
was cut out, upscaled and recomposed on a matching dark plate at 900×1200
(hero) and 1400×1050 (about). They are limited by the resolution of the
source screenshots — replace them with the original artwork when you have it.

Keep the same aspect ratios (3:4 and 4:3) and the files drop straight in.
Different proportions? Update `ratios` in `src/components/ui/Portrait.jsx`.

### Photography: the strip and the gallery

Photography lives in two places, both fed by `src/data/photography.js`:

| Surface | File | What it does |
| --- | --- | --- |
| Home-page highlight | `src/sections/PhotographyPreview.jsx` | One large frame beside a four-up grid, linking through |
| Full gallery, `/photos` | `src/pages/Photos.jsx` | Filters, masonry, fullscreen viewer |

The teaser deliberately has no filters, no lightbox and no masonry — all the
interactive weight sits on the dedicated page, which also means the gallery
code only downloads for visitors who ask for it. Which frames appear in the
strip is set by `featured: true` in the data; if nothing is flagged it falls
back to the first five, so the band never renders empty.

The gallery ships with nine generated placeholders in `public/photos/` so both
surfaces work out of the box. Replacing them is two steps:

1. Drop your files into `public/photos/` (`.jpg`, `.webp`, whatever).
2. Point each entry in `src/data/photography.js` at them.

```js
{
  id: 'fog-on-the-sangu',        // unique; also the React key
  title: 'Fog on the Sangu',
  location: 'Bandarban',
  year: '2025',
  category: 'landscapes',        // must match an id in photoCategories
  src: '/photos/fog-on-the-sangu.jpg',
  width: 1200,                   // natural size — used only as a ratio
  height: 1500,
  caption: 'Shown in the viewer, under the title.',
  featured: true,                // promote onto the home-page strip
}
```

`width` and `height` never size anything; they reserve the right amount of
space in the masonry before the file downloads, so the grid does not jump as
photos arrive. Any proportional pair works.

On `/photos` the filter row builds itself from `photoCategories`, and
categories with no photos are dropped automatically — so deleting every
portrait also removes the "portraits" filter. Mixed orientations are the
point: the layout is CSS columns, and each card carries its own aspect ratio.
The home highlight ignores the ratios: from `lg` up it is a fixed-height grid
where the feature spans both rows and the four tiles fill the column beside
it, so the grid — not the images — decides the heights and every edge lines
up. Below `lg` the images take their ratios back and it folds into a feature
with a 2×2 underneath.

The viewer supports arrow keys, Escape, swipe, and the filmstrip along the
bottom.

> The placeholders are abstract SVG gradients, not photographs. They were
> generated to fill the layout honestly — swap them before the site goes
> anywhere public.

### Interests and the "right now" panel

`src/data/interests.js` drives the bento grid. Each entry has a `span` —
`'sm'`, `'md'` or `'lg'` — which decides its footprint, so the layout is
content-driven and reordering the array reorders the grid. The shipped set
tiles a 4×3 bento exactly; if you add or resize cards, adjust the spans so the
rows still fill.

`currently` is the last cell: a short, dated list of what you are learning,
reading and listening to. It is the one part of the site worth editing every
month or two — the `updated` string is there to keep you honest.

### Writing in Bangla

The site ships in Bangla: `<html lang="bn">`, `profile.locale` is `'bn-BD'`,
and every string in `data/` and `content/posts/` is Bengali. Mixed Bangla and
English works too — nothing has to be tagged for the text to come out right.

**Fonts.** `--font-sans` and `--font-mono` in `src/index.css` both list
**Hind Siliguri** after the Latin faces. Font fallback happens per glyph, so
Latin keeps rendering in Poppins and Bengali drops through to Hind Siliguri on
its own — a sentence mixing both comes out right with nothing tagged. Google
Fonts splits its stylesheet by `unicode-range`, so the Bengali files are only
downloaded once a Bengali glyph is on the page; an English-only visit pays
nothing for this.

**Tagging.** `lang="bn"` is already on `<html>`. Put it on a `<span>` too if
you drop a Bangla phrase into an otherwise English block. It is not needed for
the font to work, but it fixes the two things font fallback cannot:

- Latin letter-spacing pulls Bengali conjuncts and matras apart. The mono
  eyebrow labels use `0.2em`, which mangles Bangla badly.
- Bengali sits taller than Latin and needs more leading.

Both are handled by the `[lang='bn']` rules in `src/index.css`.

**Numbers.** Dates go through `formatDate` with `profile.locale`, so they
render as `২০ আগ, ২০২৬`. Counts a component works out at runtime — the post
count, the position in the photo viewer, a skill percentage — never reach
`Intl`, so they go through `toBanglaDigits()` in `lib/utils.js` instead.
Between the two, no Western digit should end up beside Bangla text.

**What stays in Latin.** Tool and brand names: Playwright, Postman, Jira, API.
Nobody in a Dhaka standup says "প্লেরাইট", and transliterating them reads as a
machine translation. Only the words around them are Bangla.

**Post URLs stay ASCII.** The filenames in `content/posts/` are unchanged, so
`/blog/api-testing-with-postman` still works while the title above it is
Bangla. Want a Bangla URL? Rename the file, or set `slug:` in its
front-matter — `slugify()` handles Bengali either way.

**Post URLs.** `slugify()` matches letters by Unicode property rather than
`a-z`, so a Bangla title keeps its words: `এপিআই টেস্টিং শেখা` becomes
`এপিআই-টেস্টিং-শেখা`. Browsers percent-encode that in the address bar and
display it decoded, so the URL still reads properly. If you would rather have
ASCII URLs for a Bangla post, set `slug:` explicitly in its front-matter.

**Switching back to English** — or to any other language — is four edits, none
of them in a component:

1. `index.html` — `<html lang="bn">` back to `lang="en"`
2. `src/data/site.js` — `profile.locale` to `'en-GB'`
3. `src/data/ui.js` — the interface's own words
4. `src/data/*.js` and `src/content/posts/*.md` — the content

There is no i18n library and no locale switcher. This is a one-person site in
one language; a translation layer would be more machinery than the problem
deserves. The `ui.js` split gives you the part that actually matters — every
string in one place — without the rest of it.

```jsx
<p lang="bn">আমি একজন সফটওয়্যার কোয়ালিটি অ্যাসিওরেন্স ইঞ্জিনিয়ার।</p>
```

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
│   └── ui.js                Every string the components themselves render
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
│   │   ├── SpotlightCard     panel with a pointer-following accent glow
│   │   ├── PhotoCard         one gallery frame, hover caption
│   │   ├── Lightbox          fullscreen photo viewer (keys, swipe, filmstrip)
│   │   ├── ProjectCard, PostCard, ReadingProgress
│   ├── layout/              App shell: Header, MobileMenu, Footer,
│   │                        ThemeToggle, ScrollProgress, BackToTop,
│   │                        ScrollManager, Layout
│   └── icons/               One inline SVG set, used via <Icon name="…" />
│
├── sections/                Home-page sections (Hero, About, Professional,
│                            PhotographyPreview, Interests, Skills, Projects,
│                            Experience, Testimonials, BlogPreview, Contact)
└── pages/                   Routed pages (Home, Photos, Blog, BlogPost,
                             NotFound)
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

Two components animate outside that system because they need to:

- `Lightbox` uses a direction-aware slide, so moving forward and backward
  through the gallery reads differently.
- `SpotlightCard` writes the pointer position to CSS custom properties rather
  than React state, so a grid of them costs no renders on mouse move.

The site also respects `prefers-reduced-motion`: CSS transitions and
animations are reduced to near-zero for visitors who ask for it, and the
JavaScript-driven loops — the portrait float and the "right now" pulse — check
`usePrefersReducedMotion()` and switch themselves off, since the CSS rule
cannot reach them.

## Accessibility notes

- Skip-to-content link, landmark elements and labelled sections
- Visible focus rings on every interactive element
- `aria-current` on the active nav link, `aria-pressed` on tag filters
- Escape closes the mobile menu and the photo viewer; body scroll is locked
  while either is open
- The photo viewer is a labelled `role="dialog"`, takes focus when it opens
  and is fully keyboard-driven (arrows to move, Escape to leave)
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
