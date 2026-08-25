/**
 * Colour per hue, as whole class strings.
 *
 * They have to be written out rather than built from a variable: Tailwind
 * scans the source for literal class names, and `text-hue-${tone}` would
 * never be found.
 *
 * `glyph` colours the icon itself, `chip` colours the rounded tile some
 * sections put behind it, and `wash` is the oversized watermark on the
 * featured interest card.
 */
const TONES = {
  sky: {
    glyph: 'text-hue-sky',
    chip: 'bg-hue-sky-soft text-hue-sky',
    wash: 'text-hue-sky/[0.08]',
  },
  magenta: {
    glyph: 'text-hue-magenta',
    chip: 'bg-hue-magenta-soft text-hue-magenta',
    wash: 'text-hue-magenta/[0.08]',
  },
  red: {
    glyph: 'text-hue-red',
    chip: 'bg-hue-red-soft text-hue-red',
    wash: 'text-hue-red/[0.08]',
  },
  violet: {
    glyph: 'text-hue-violet',
    chip: 'bg-hue-violet-soft text-hue-violet',
    wash: 'text-hue-violet/[0.08]',
  },
  green: {
    glyph: 'text-hue-green',
    chip: 'bg-hue-green-soft text-hue-green',
    wash: 'text-hue-green/[0.08]',
  },
  amber: {
    glyph: 'text-hue-amber',
    chip: 'bg-hue-amber-soft text-hue-amber',
    wash: 'text-hue-amber/[0.08]',
  },
  blue: {
    glyph: 'text-hue-blue',
    chip: 'bg-hue-blue-soft text-hue-blue',
    wash: 'text-hue-blue/[0.08]',
  },
  indigo: {
    glyph: 'text-hue-indigo',
    chip: 'bg-hue-indigo-soft text-hue-indigo',
    wash: 'text-hue-indigo/[0.08]',
  },
};

/** Anything not listed below keeps the site accent. */
const ACCENT_TONE = {
  glyph: 'text-accent',
  chip: 'bg-accent-soft text-accent',
  wash: 'text-accent/[0.07]',
};

/**
 * Icon name -> hue. Only content and social icons appear here; the interface's
 * own controls — arrows, close, chevrons, the theme toggle — stay on
 * `currentColor` so they keep reading as controls rather than decoration.
 */
const toneByIcon = {
  /* Social. Close enough to each brand to be recognised at 20px. */
  messenger: 'sky',
  instagram: 'magenta',
  mail: 'red',
  github: 'indigo',
  twitter: 'sky',
  /* Interests. */
  camera: 'violet',
  mountain: 'green',
  coffee: 'amber',
  film: 'blue',
  bookOpen: 'magenta',
  headphones: 'indigo',
  users: 'sky',
  fish: 'blue',
  /* Work and skills. */
  checklist: 'green',
  robot: 'indigo',
  pulse: 'red',
  workflow: 'blue',
  bug: 'red',
};

/**
 * The colour classes for one icon name.
 *
 * @param {string} name
 * @returns {{glyph: string, chip: string, wash: string}} accent classes for
 *   any icon without a hue of its own, so callers never have to check.
 */
export function iconTone(name) {
  return TONES[toneByIcon[name]] ?? ACCENT_TONE;
}
