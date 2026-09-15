/**
 * Site-wide profile, page composition and links.
 *
 * This file is the single source of truth for "who is this site about" and
 * "which sections does the home page show". Edit here, not in components.
 *
 * The copy is Bangla. The interface's own words — buttons, empty states,
 * section headings — live in data/ui.js.
 */

export const profile = {
    name: 'জাহিদ হাসান',
    role: 'মিস্টার ঘাসফড়িং',
    greeting: 'হ্যালো, আমি',
    /** One line under the hero heading. */
    tagline: 'সুখের বদলে বাগ খুঁজে বেড়ানো এক ক্লান্ত ইঞ্জিনিয়ার।',
    location: 'ঢাকা, বাংলাদেশ',
    email: 'zh08215@gmail.com',
    /** Availability pill in the hero. Set to '' to hide it. */
    availability: 'Just Having Coffee',
    /**
     * BCP 47 tag, used to format dates. 'bn-BD' renders them in Bengali,
     * numerals included — keep it in step with <html lang> in index.html.
     */
    locale: 'bn-BD',
};

/**
 * The About section — deliberately personal rather than a CV in prose.
 *
 * `headline` renders on two lines, the second in the accent gradient.
 */
export const personal = {
    headline: { first: 'জাহিদ হাসান', second: 'ব্যক্তিগত জীবন' },
    lead: 'ব্যস্ততার বাইরে একটা জীবন আছে — যেটা আমি আমার প্রিয় মানুষগুলোর সাথে থেকে কাটাতে চাই',
    paragraphs: ['ফ্রি সময় বলতে এখন আমার যেটা আছে সেটা মূলত সাপ্তাহিক ছুটি । '],
    /** Small chips under the copy. Keep them light and human. */
    interests: ['এলাকার চায়ের দোকান', 'লম্বা হাঁটা', 'ফটোগ্রাফি', 'বন্ধুদের সাথে আড্ডা দেয়া', ' মুভি অথবা সিরিজ দেখা'],
};

/**
 * The professional section — deliberately brief.
 *
 * Two sentences and three focus areas. Anything longer belongs in the full
 * `skills` / `projects` / `experience` sections, which can be switched on
 * below.
 */
export const professional = {
    summary:
        'দিনের বেলায় আমি একজন সফটওয়্যার কোয়ালিটি অ্যাসিওরেন্স ইঞ্জিনিয়ার। কোনো রিলিজ যাবে কি যাবে না — সেই সিদ্ধান্তের পেছনের টেস্টিংটা আমিই প্ল্যান করি আর চালাই: হাতে ধরে এক্সপ্লোরেটরি টেস্ট, অটোমেটেড রিগ্রেশন স্যুট, আর API চেক, যাতে সমস্যাগুলো ইউজারের চোখে পড়ার আগেই ধরা পড়ে।',
    /** Three at most; the layout is built for a short row. */
    focus: [
        { id: 'manual', label: 'ম্যানুয়াল ও এক্সপ্লোরেটরি টেস্টিং', icon: 'checklist' },
        { id: 'automation', label: 'টেস্ট অটোমেশন', icon: 'robot' },
        { id: 'api', label: 'API ও পারফরম্যান্স টেস্টিং', icon: 'pulse' },
    ],
};

/**
 * Home-page composition.
 *
 * Order here is the order on the page, and `enabled` controls both rendering
 * and the navigation. The professional sections are switched off by default
 * to keep this a personal site — flip one to `true` to bring it back.
 *
 * `href` is optional. Sections that also have a page of their own — photos,
 * the blog — point their nav link at that page instead of the home-page
 * anchor, while still rendering a teaser section on the way down.
 */
export const sections = [
    { id: 'about', label: 'পরিচিতি', enabled: true },
    { id: 'work', label: 'কাজ', enabled: true },
    { id: 'photography', label: 'ছবি', enabled: true, href: '/photos' },
    { id: 'interests', label: 'শখ', enabled: true },
    { id: 'friends', label: 'বন্ধুরা', enabled: true },
    { id: 'skills', label: 'দক্ষতা', enabled: false },
    { id: 'projects', label: 'প্রজেক্ট', enabled: false },
    { id: 'experience', label: 'অভিজ্ঞতা', enabled: false },
    { id: 'testimonials', label: 'মতামত', enabled: false },
    { id: 'blog', label: 'ব্লগ', enabled: true, href: '/blog' },
    { id: 'contact', label: 'যোগাযোগ', enabled: true },
];

/** Sections actually rendered, in page order. */
export const enabledSections = sections.filter((section) => section.enabled);

/** Section ids for the scroll-spy — derived, so it can never drift. */
export const sectionIds = enabledSections.map((section) => section.id);

/**
 * Navigation, derived from the same registry.
 * Sections with their own page link to it; the rest link to their anchor.
 */
export const navLinks = enabledSections.map((section) => ({
    label: section.label,
    href: section.href ?? `/#${section.id}`,
}));

/**
 * Social profiles. `icon` must match a name exported from components/icons.
 *
 * Personal channels rather than professional ones — this site is not a CV, so
 * the hero, footer and menu send people somewhere they can actually say hello.
 *
 * Each link below still needs your own handle on the end:
 *   m.me/<username> · instagram.com/<username>
 */
export const socials = [
    { label: 'Messenger', href: 'https://m.me/', icon: 'messenger' },
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'ইমেইল', href: 'mailto:zh08215@gmail.com', icon: 'mail' },
];
