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

export const LinkedinIcon = (props) => (
  <Svg {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" rx="1" />
    <circle cx="4" cy="4" r="2" />
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

/**
 * Name -> component map behind the `<Icon name="..." />` helper.
 * Not exported: data files reference icons by string, never by import.
 */
const iconsByName = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
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
};

/**
 * Render an icon by name. Returns null for unknown names so a typo in a data
 * file degrades quietly instead of crashing the page.
 */
export function Icon({ name, ...props }) {
  const Component = iconsByName[name];
  return Component ? <Component {...props} /> : null;
}
