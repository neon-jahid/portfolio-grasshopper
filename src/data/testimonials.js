/**
 * Testimonials shown by the (optional) testimonials section.
 *
 * The section is switched off in `sections` in data/site.js — turn it on once
 * these are real quotes from real people. Placeholder praise is worse than no
 * praise at all.
 */

export const testimonialsIntro = {
    eyebrow: 'যা বলেছেন সহকর্মীরা',
    title: 'মতামত',
    description: 'যাদের সাথে কাজ করেছি, তারা একসাথে কাজ করার অভিজ্ঞতা নিয়ে যা বলেন।',
};

/**
 * @typedef {object} Testimonial
 * @property {string} id
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 * @property {string} [initials] falls back to the initials of `name`
 */

/** @type {Testimonial[]} */
export const testimonials = [
    {
        id: 'placeholder-1',
        quote:
            'এখানে সহকর্মীর নিজের কথা বসান। দুই-তিন বাক্য, আর নির্দিষ্ট করে বলা — আপনি দলে ছিলেন বলে ঠিক কী বদলেছিল।',
        name: 'সহকর্মীর নাম',
        role: 'ইঞ্জিনিয়ারিং ম্যানেজার, প্রতিষ্ঠানের নাম',
        initials: 'সন',
    },
    {
        id: 'placeholder-2',
        quote:
            'দ্বিতীয় মতামতটা অন্য দিক থেকে — একজন ডেভেলপার, প্রোডাক্ট ম্যানেজার, বা ক্লায়েন্ট। একই প্রশংসার তিন রকম সংস্করণের চেয়ে আলাদা আলাদা কণ্ঠস্বর অনেক বেশি বিশ্বাসযোগ্য।',
        name: 'সহকর্মীর নাম',
        role: 'প্রোডাক্ট ম্যানেজার, প্রতিষ্ঠানের নাম',
        initials: 'সন',
    },
    {
        id: 'placeholder-3',
        quote: 'শেষেরটা ছোট হলেই ভালো লাগে। এক বাক্যেও চলে, যদি বাক্যটা ঠিক হয়।',
        name: 'সহকর্মীর নাম',
        role: 'সিনিয়র ডেভেলপার, প্রতিষ্ঠানের নাম',
        initials: 'সন',
    },
];
