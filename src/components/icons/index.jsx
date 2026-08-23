/**
 * Inline SVG icon set.
 *
 * Every icon is a stroked 24x24 path that inherits `currentColor`, so colour
 * and size come from the parent (`className="size-5 text-accent"`).
 *
 * Usage:
 *   import { Icon } from '../icons';
 *   <Icon name="github" className="size-5" />
 *
 * or import a single icon directly: `import { GithubIcon } from '../icons'`.
 *
 * Colour comes from the parent, so an icon can be tinted by whatever is
 * around it. The per-icon hues live in ./tones.js — they are kept out of this
 * file so it exports nothing but components and fast refresh keeps working.
 */

/** Props shared by every icon so they behave like one component. */
function Svg({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const GithubIcon = (props) => (
  <Svg {...props}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Svg>
);

export const MessengerIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3.2c-4.9 0-8.8 3.6-8.8 8.1 0 2.5 1.2 4.8 3.2 6.3v3.2l3-1.6c.8.2 1.7.3 2.6.3 4.9 0 8.8-3.6 8.8-8.2S16.9 3.2 12 3.2z" />
    <path d="M6.5 14.5 11 9.8l2.4 2.5 4.1-2.5-4.5 4.7-2.4-2.5z" />
  </Svg>
);

export const InstagramIcon = (props) => (
  <Svg {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </Svg>
);

export const TwitterIcon = (props) => (
  <Svg {...props}>
    <path d="M4 4l7.5 9.8L4.5 20M20 4l-7.4 8.2L20 20h-3.6L4 4h3.6" />
  </Svg>
);

export const MailIcon = (props) => (
  <Svg {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m3 6 9 6 9-6" />
  </Svg>
);

export const ArrowRightIcon = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowUpRightIcon = (props) => (
  <Svg {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

export const ArrowLeftIcon = (props) => (
  <Svg {...props}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Svg>
);

export const ArrowUpIcon = (props) => (
  <Svg {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const SunIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const MoonIcon = (props) => (
  <Svg {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Svg>
);

export const MenuIcon = (props) => (
  <Svg {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (props) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const ChecklistIcon = (props) => (
  <Svg {...props}>
    <path d="m3 6 2 2 3-3M3 13l2 2 3-3M3 20l2 2 3-3M12 6h9M12 13h9M12 20h9" />
  </Svg>
);

export const RobotIcon = (props) => (
  <Svg {...props}>
    <rect x="4" y="8" width="16" height="12" rx="3" />
    <path d="M12 4v4M9 14h.01M15 14h.01M9 18h6M2 13v2M22 13v2" />
  </Svg>
);

export const PulseIcon = (props) => (
  <Svg {...props}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </Svg>
);

export const WorkflowIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="3" width="7" height="6" rx="1.5" />
    <rect x="14" y="15" width="7" height="6" rx="1.5" />
    <path d="M6.5 9v6a3 3 0 0 0 3 3H14" />
  </Svg>
);

export const BugIcon = (props) => (
  <Svg {...props}>
    <path d="M8 6a4 4 0 0 1 8 0M5 11h14M12 8v12M6 9a6 6 0 0 0 12 0M4 15h2M18 15h2M5.5 20l2-2M18.5 20l-2-2M5.5 6l2 2M18.5 6l-2 2" />
    <path d="M6 9a6 6 0 0 0 12 0v3a6 6 0 0 1-12 0z" />
  </Svg>
);

export const ClockIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const CalendarIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);

export const MapPinIcon = (props) => (
  <Svg {...props}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const DownloadIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
  </Svg>
);

export const SearchIcon = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

export const CopyIcon = (props) => (
  <Svg {...props}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </Svg>
);

export const CheckIcon = (props) => (
  <Svg {...props}>
    <path d="m4 12 5 5L20 6" />
  </Svg>
);

export const CameraIcon = (props) => (
  <Svg {...props}>
    <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7a1 1 0 0 0 .8-.4l1-1.3a1 1 0 0 1 .8-.4h4.4a1 1 0 0 1 .8.4l1 1.3a1 1 0 0 0 .8.4h1.7A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" />
    <circle cx="12" cy="12.5" r="3.5" />
  </Svg>
);

export const ApertureIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v8.5M20.8 9.5l-8.1 2.6M17.3 20.1l-5-6.9M6.7 20.1l5-6.9M3.2 9.5l8.1 2.6" />
  </Svg>
);

export const FilmIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </Svg>
);

export const MountainIcon = (props) => (
  <Svg {...props}>
    <path d="m3 19 6.5-11 4 6.2 2.3-3.4L21 19z" />
    <circle cx="17.5" cy="6.5" r="1.8" />
  </Svg>
);

export const CoffeeIcon = (props) => (
  <Svg {...props}>
    <path d="M3 9h13v5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" />
    <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M7 2.5v2.5M11 2.5v2.5" />
  </Svg>
);

export const BookOpenIcon = (props) => (
  <Svg {...props}>
    <path d="M12 7.5C10.5 6 8.5 5.3 4 5.5v12c4.5-.2 6.5.5 8 2 1.5-1.5 3.5-2.2 8-2v-12c-4.5-.2-6.5.5-8 2z" />
    <path d="M12 7.5V21" />
  </Svg>
);

export const HeadphonesIcon = (props) => (
  <Svg {...props}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h2.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5.5A1.5 1.5 0 0 1 4 18.5zM20 14h-2.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1.5 1.5 0 0 0 1.5-1.5z" />
  </Svg>
);

export const ChevronLeftIcon = (props) => (
  <Svg {...props}>
    <path d="m15 5-7 7 7 7" />
  </Svg>
);

export const ChevronRightIcon = (props) => (
  <Svg {...props}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);

export const ExpandIcon = (props) => (
  <Svg {...props}>
    <path d="M9 3H3v6M15 21h6v-6M3 15v6h6M21 9V3h-6" />
  </Svg>
);

export const QuoteIcon = (props) => (
  <Svg {...props}>
    <path d="M9 6C6 7.5 4.5 10 4.5 13.5A3.5 3.5 0 0 0 8 17a3 3 0 0 0 0-6c-.6 0-1.1.1-1.5.4M19 6c-3 1.5-4.5 4-4.5 7.5A3.5 3.5 0 0 0 18 17a3 3 0 0 0 0-6c-.6 0-1.1.1-1.5.4" />
  </Svg>
);

/**
 * Name -> component map behind the `<Icon name="..." />` helper.
 * Not exported: data files reference icons by string, never by import.
 */
const iconsByName = {
  github: GithubIcon,
  messenger: MessengerIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  mail: MailIcon,
  arrowRight: ArrowRightIcon,
  arrowUpRight: ArrowUpRightIcon,
  arrowLeft: ArrowLeftIcon,
  arrowUp: ArrowUpIcon,
  sun: SunIcon,
  moon: MoonIcon,
  menu: MenuIcon,
  close: CloseIcon,
  checklist: ChecklistIcon,
  robot: RobotIcon,
  pulse: PulseIcon,
  workflow: WorkflowIcon,
  bug: BugIcon,
  clock: ClockIcon,
  calendar: CalendarIcon,
  mapPin: MapPinIcon,
  download: DownloadIcon,
  search: SearchIcon,
  copy: CopyIcon,
  check: CheckIcon,
  camera: CameraIcon,
  aperture: ApertureIcon,
  film: FilmIcon,
  mountain: MountainIcon,
  coffee: CoffeeIcon,
  bookOpen: BookOpenIcon,
  headphones: HeadphonesIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  expand: ExpandIcon,
  quote: QuoteIcon,
};

/**
 * Render an icon by name. Returns null for unknown names so a typo in a data
 * file degrades quietly instead of crashing the page.
 */
export function Icon({ name, ...props }) {
  const Component = iconsByName[name];
  return Component ? <Component {...props} /> : null;
}
