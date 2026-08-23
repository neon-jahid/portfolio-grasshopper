/**
 * The interests / hobbies section.
 *
 * `interests` renders as a bento grid: the `span` on each card decides how
 * much of the grid it takes, so the layout is content-driven rather than
 * hard-coded. Reorder the array to reorder the grid.
 */

export const interestsIntro = {
    eyebrow: 'কাজের বাইরে',
    title: 'শখ',
    description:
        'যেসব জিনিস কৌতূহলটা বাঁচিয়ে রাখে। একটাও সিভিতে নেই, অথচ সবগুলোই আমাকে কাজে একটু ভালো করে তোলে।',
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
        description:
            'ভোরবেলা এমন আলোর পেছনে ছোটা যেটা আর কখনো হুবহু ফিরে আসবে না, আর যে রাস্তায় শখানেক বার হেঁটেছি সেটাকেই নতুন করে ফ্রেমে বসানো। একমাত্র শখ, যেটা আমাকে চোখে পড়ার মতো ধৈর্যশীল বানিয়েছে।',
        icon: 'camera',
        meta: '২০১৯ সাল থেকে · Fujifilm X-T30',
        span: 'lg',
    },
    {
        id: 'outdoors',
        title: 'বাইরে ঘোরা',
        description: 'পাহাড়ি ট্রেইল, লম্বা হাঁটা, আর চেয়ার থেকে ওঠার যেকোনো অজুহাত।',
        icon: 'mountain',
        meta: 'পছন্দের জায়গা এখনো বান্দরবান',
        span: 'sm',
    },
    {
        id: 'cafes',
        title: 'পাড়ার ক্যাফে',
        description: 'কোণের একটা টেবিল, এক কাপ কফি, আর দুই ঘণ্টা যা পুরোপুরি নিজের।',
        icon: 'coffee',
        meta: 'ফ্ল্যাট হোয়াইট, চিনি ছাড়া',
        span: 'sm',
    },
    {
        id: 'animation',
        title: 'পুরোনো অ্যানিমেশন',
        description:
            'হাতে আঁকা সেল, রাবার-হোজ ক্যারেক্টার আর তার পেছনের ফ্রেম-বাই-ফ্রেম খাটুনি। সেকেন্ডে বারোটা ছবি নিয়ে মানুষ কতটা খুঁতখুঁতে হতে পারে — দেখলে নিজেরই কাজ করতে ইচ্ছে করে।',
        icon: 'film',
        meta: 'বেশিরভাগই ত্রিশ থেকে ষাটের দশকের',
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
        { id: 'learning', label: 'শিখছি', value: 'Playwright কম্পোনেন্ট টেস্টিং' },
        { id: 'reading', label: 'পড়ছি', value: 'Thinking in Systems — ডোনেলা মিডোজ' },
        { id: 'listening', label: 'শুনছি', value: 'হানিয়া রানির যেকোনো কিছু' },
        { id: 'shooting', label: 'তুলছি', value: 'পুরান ঢাকা, একটা করে গলি' },
    ],
    /** Rendered as a dated footnote under the list. */
    updated: 'হালনাগাদ: অগাস্ট ২০২৬',
};
