/**
 * Every word the components themselves say.
 *
 * The rest of `data/` holds *your* content — who you are, what you shot, what
 * you wrote. This file holds the site's own furniture: button labels, empty
 * states, screen-reader descriptions, section headings. It exists so the whole
 * interface can be translated in one place instead of hunting through JSX.
 *
 * Values are either plain strings or small functions where a number or a name
 * has to sit inside the sentence — Bangla word order rarely matches English,
 * so the whole sentence lives here rather than being glued together in a
 * component.
 */

export const ui = {
    /** App shell: header, footer, menus, the bits on every page. */
    chrome: {
        skipToContent: 'মূল অংশে যান',
        loading: 'লোড হচ্ছে…',
        backToTop: 'উপরে ফিরে যান',
        openMenu: 'মেনু খুলুন',
        closeMenu: 'মেনু বন্ধ করুন',
        /** aria-labels on the three <nav> landmarks. */
        navPrimary: 'প্রধান মেনু',
        navMobile: 'মোবাইল মেনু',
        navFooter: 'ফুটার মেনু',
        themeToLight: 'লাইট থিমে যান',
        themeToDark: 'ডার্ক থিমে যান',
        /** @param {string} year already converted to Bengali numerals */
        copyright: (year, name) => `© ${year} ${name}। SQA`,
    },

    hero: {
        contact: 'যোগাযোগ করুন',
        /** @param {string} name */
        portraitAlt: (name) => `${name}-এর ইলাস্ট্রেশন`,
        /** Scroll cue at the foot of the panel. */
        scrollCue: 'স্ক্রল করুন',
    },

    about: {
        eyebrow: 'পরিচিতি',
        contact: 'যোগাযোগ করুন',
        portraitAlt: 'হাত ধরে দাঁড়িয়ে থাকা দুজনের ইলাস্ট্রেশন',
        /** Caption card pinned to the illustration. */
        captionLabel: 'অফ দ্য ক্লক',
        caption: 'কাজের বাইরের সময়টুকু',
        /** The toggle under the collapsed personal paragraphs. */
        readMore: 'আরও পড়ুন',
        readLess: 'সংক্ষেপে দেখুন',
        /** Names the scroll area the open paragraphs turn into. */
        readRegionLabel: 'ব্যক্তিগত জীবন নিয়ে লেখা',
    },

    friends: {
        /** @param {string} name */
        portraitAlt: (name) => `${name}-এর ছবি`,
        /** Chip on the photo. @param {string} years in Bengali numerals */
        yearsShort: (years) => `${years} বছর`,
        /** Foot of the card. @param {string} year in Bengali numerals */
        since: (year) => `${year} থেকে`,
        /** Foot of the card. @param {string} where already in the locative */
        met: (where) => `পরিচয় ${where}`,
        /** Shown under the grid. @param {string} count in Bengali numerals */
        total: (count) => `${count} জন, আর গোনা শেষ হয়নি।`,
    },

    work: {
        eyebrow: 'দিনের কাজ',
        title: 'কাজ',
        /** The mono line beside the résumé button. */
        current: (role, location) => `বর্তমানে ${role} · ${location}`,
    },

    photography: {
        /** Home-page strip. */
        seeGallery: 'গ্যালারি দেখুন',
        summary: (frames, collections) => `${frames}টি ছবি · ${collections}টি ভাগ`,
        /** Gallery page. */
        allFilter: 'সব',
        total: (count) => `এখন পর্যন্ত ${count}টি ছবি।`,
        shown: (count) => `${count}টি দেখাচ্ছে`,
        /** Card and viewer screen-reader labels. */
        openPhoto: (title, location) => `${title}, ${location} — বড় করে দেখুন`,
        viewerLabel: (title) => `${title} — বড় করে`,
        closeViewer: 'বন্ধ করুন',
        previousPhoto: 'আগের ছবি',
        nextPhoto: 'পরের ছবি',
        jumpTo: (title) => `${title} দেখুন`,
    },

    blog: {
        eyebrow: 'লেখালেখি',
        title: 'ব্লগ',
        description: 'টেস্টিং, টুল, আর কোয়ালিটির যে অংশগুলো কোড দিয়ে হয় না — সেসব নিয়ে টুকটাক লেখা।',
        total: (count) => `এখন পর্যন্ত ${count}টি লেখা।`,
        readAll: 'সব লেখা পড়ুন',
        readPost: 'পড়ুন',
        /** @param {string} minutes already in Bengali numerals */
        readingTime: (minutes) => `${minutes} মিনিট`,
        searchLabel: 'লেখা খুঁজুন',
        searchPlaceholder: 'লেখা খুঁজুন…',
        allFilter: 'সব',
        empty: 'এই খোঁজে কোনো লেখা পাওয়া গেল না। অন্য কিছু লিখে দেখুন, বা ট্যাগটা সরিয়ে দিন।',
        backToAll: 'সব লেখায় ফিরে যান',
        related: 'আরও পড়ুন',
        notFoundTitle: 'লেখাটি পাওয়া যায়নি',
    },

    contact: {
        eyebrow: 'হ্যালো বলুন',
        heading: `Let's talk`,
        /** Screen-reader label on the envelope above the address. */
        mailLabel: 'ইমেইল পাঠান',
    },

    skills: {
        eyebrow: 'যা দিয়ে কাজ করি',
        title: 'দক্ষতা',
        description: 'কাজের কোন অংশে কোনটা লাগে — সেভাবেই সাজানো।',
    },

    projects: {
        eyebrow: 'বাছাই করা কাজ',
        title: 'প্রজেক্ট',
        description: 'টেস্ট স্যুট, টুলিং আর স্ট্র্যাটেজির কাজ। নিজের কেস স্টাডি তৈরি হলে এগুলো বদলে নিন।',
        more: 'আরও কাজ',
        /** Link labels on a project card. */
        code: 'কোড',
        live: 'লাইভ',
        caseStudy: 'কেস স্টাডি',
    },

    experience: {
        eyebrow: 'এতদূর পথ',
        title: 'অভিজ্ঞতা',
        description: 'কোথায় কাজ করেছি, কী পড়েছি, আর তার পেছনের সার্টিফিকেশনগুলো।',
        work: 'কাজ',
        education: 'পড়াশোনা',
        certifications: 'সার্টিফিকেশন',
        /** Shown instead of an end year for a current role. */
        present: 'চলমান',
    },

    notFound: {
        metaTitle: 'পেজটি পাওয়া যায়নি',
        code: 'এরর ৪০৪',
        heading: 'এই পেজটা রিপ্রোডিউস করা গেল না',
        body: 'ঠিকানাটা এই সাইটের কোনো কিছুর সাথে মিলছে না। হয়তো সরে গেছে, নয়তো লিংকটাই ভুল।',
        backHome: 'হোমে ফিরে যান',
    },
};
