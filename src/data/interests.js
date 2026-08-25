/**
 * The interests / hobbies section.
 *
 * `interests` renders as a bento grid: the `span` on each card decides how
 * much of the grid it takes, so the layout is content-driven rather than
 * hard-coded. Reorder the array to reorder the grid.
 */

export const interestsIntro = {
    eyebrow: 'Life Beyond Work',
    title: 'শখ',
    description: 'কাজের বাইরে যেসব জিনিস নিয়ে পড়ে থাকতে ভালো লাগে',
};

/**
 * @typedef {object} Interest
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} icon   name exported from components/icons
 * @property {string} [meta] small mono line at the foot of the card
 * @property {'sm'|'md'|'lg'} [span='sm'] footprint in the bento grid
 */

/** @type {Interest[]} */
export const interests = [
    {
        id: 'photography',
        title: 'ফটোগ্রাফি',
        description: 'I enjoy taking photos of nature, landscapes, the sea, and cats.',
        icon: 'camera',
        meta: '২০১৯ সাল থেকে ',
        span: 'lg',
    },
    {
        id: 'friends',
        title: 'বন্ধুদের সাথে আড্ডা',
        description: 'বন্ধুদের সাথে আড্ডা দেওয়া, হুটহাট ঘুরতে বের হওয়া, আর নতুন কোনো জায়গায় গিয়ে ভালো কিছু খাওয়া — সময়টা কীভাবে কেটে যায় টেরই পাওয়া যায় না।',
        icon: 'users',
        meta: 'আড্ডা, ঘোরাঘুরি আর খাওয়াদাওয়া',
        span: 'sm',
    },
    {
        id: 'tea',
        title: 'এলাকার রঙ চা',
        description: 'ঢাকায় যেসব জিনিস সবচেয়ে বেশি মিস করি, তার মধ্যে গ্রামের রং চা অন্যতম।',
        icon: 'coffee',
        meta: 'অল্প চিনি ',
        span: 'sm',
    },
    {
        id: 'fishing',
        title: 'মাছ ধরা',
        description: 'পুকুরের ধারে ছিপ হাতে ঘণ্টার পর ঘণ্টা বসে থাকা। কখন টোপে টান পড়বে সেই অপেক্ষার মধ্যে এক ধরনের শান্তি আছে — মাছ উঠুক বা না উঠুক, পানির পাশে বসে থাকাটাই যেন আসল আনন্দ।',
        icon: 'fish',
        meta: 'ছিপ, পুকুর আর একটু ধৈর্য',
        span: 'md',
    },
    {
        id: 'reading',
        title: 'বই পড়া',
        description: 'যাতায়াতের পথে ননফিকশন, আর ঘুমানোর আগে গল্প আছে এমন কিছু।',
        icon: 'bookOpen',
        meta: 'এখন পড়ছি: Thinking in Systems',
        span: 'sm',
    },
    {
        id: 'music',
        title: 'টেস্টিংয়ের সময় গান',
        description: 'শুধু ইনস্ট্রুমেন্টাল — লিরিক আর রিগ্রেশন স্যুট একসাথে চলে না।',
        icon: 'headphones',
        meta: 'লো-ফাই, পোস্ট-রক, সিনেমার স্কোর',
        span: 'sm',
    },
];

/**
 * The small "currently" panel beside the grid.
 * Short, dated, and worth updating every month or two.
 */
export const currently = {
    label: 'এই মুহূর্তে',
    items: [
        { id: 'learning', label: 'শিখছি', value: 'Playwright Component Testing, Deep Dive into SQA' },
        { id: 'reading', label: 'পড়ছি', value: 'Dark Psychology' },
        { id: 'listening', label: 'শুনছি', value: 'Ishq from Lost & Found' },
        { id: 'shooting', label: 'তুলছি', value: 'City' },
    ],
    /** Rendered as a dated footnote under the list. */
    updated: 'Last Update: August 2026',
};
