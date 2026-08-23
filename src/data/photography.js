/**
 * The photography content: intro copy, the filter categories and the photos.
 *
 * Two surfaces read from this file — the highlight strip on the home page
 * (`sections/PhotographyPreview.jsx`) and the full gallery at /photos
 * (`pages/Photos.jsx`) — so the copy below has a short line for the teaser
 * and a longer one for the page itself.
 *
 * Swapping in your own work is a two-step job:
 *   1. drop the files into `public/photos/`
 *   2. point `src` at them and set `width` / `height` to the real pixel size
 *
 * `width` and `height` are only ever used as a ratio — they reserve the right
 * amount of space in the masonry before the file loads, so the gallery never
 * jumps. Any units work as long as the two are proportional.
 */

export const photographyIntro = {
    eyebrow: 'ক্যামেরার চোখে',
    title: 'ফটোগ্রাফি',
    /** Home-page teaser. One line — the full version lives on /photos. */
    preview:
        'টেস্টিং শেখায়, সবাই যেটা পাশ কাটিয়ে চলে যায় সেটার দিকেই আরেকবার তাকাতে। ক্যামেরাটাও সেই একই অভ্যাস — শুধু একটু নরম দিকে তাক করা।',
    /** Lead paragraph on the dedicated page. */
    lead: 'বাংলাদেশের এদিক-সেদিক থেকে তোলা কিছু ছবি, বেশিরভাগই এমন সময়ে যখন এমনিতে আমার জেগে থাকার কথা না। কোনো ক্লায়েন্টের কাজ না, কোনো ব্রিফ না — শুধু দুবার তাকানোর অভ্যাসটা।',
    /** Label on the link from the home page to the gallery. */
    cta: 'গ্যালারি দেখুন',
    /** Shown under the gallery on /photos. Set to null to hide it. */
    note: 'বেশিরভাগই Fujifilm X-T30-এ তোলা, আর স্বীকার করতে একটু লজ্জা লাগলেও — অনেকগুলোই ফোনে।',
};

/**
 * Category ids used by the filter row. `all` is prepended by the page, so it
 * does not belong here.
 */
export const photoCategories = [
    { id: 'landscapes', label: 'প্রকৃতি' },
    { id: 'streets', label: 'রাস্তা' },
    { id: 'portraits', label: 'পোর্ট্রেট' },
    { id: 'everyday', label: 'রোজকার' },
];

/**
 * @typedef {object} Photo
 * @property {string} id        unique, also the React key
 * @property {string} title     shown on hover and in the lightbox
 * @property {string} location
 * @property {string} year
 * @property {string} category  must match an id in `photoCategories`
 * @property {string} src       path under /public, or an imported asset
 * @property {number} width     natural width, for the aspect ratio
 * @property {number} height    natural height
 * @property {string} [caption] longer line, lightbox only
 * @property {boolean} [featured] promote onto the home-page strip
 */

/** @type {Photo[]} */
export const photos = [
    {
        id: 'fog-on-the-sangu',
        title: 'সাঙ্গুর কুয়াশা',
        location: 'বান্দরবান',
        year: '2025',
        category: 'landscapes',
        src: '/photos/fog-on-the-sangu.svg',
        width: 1200,
        height: 1500,
        caption: 'ভোর পাঁচটা, আর এমন এক নৌকার অপেক্ষা যার কোনো তাড়া ছিল না।',
        featured: true,
    },
    {
        id: 'shakhari-bazar-morning',
        title: 'শাঁখারী বাজার, ভোরে',
        location: 'পুরান ঢাকা',
        year: '2024',
        category: 'streets',
        src: '/photos/shakhari-bazar-morning.svg',
        width: 1500,
        height: 1000,
        caption: 'দিনের এই এক ঘণ্টাতেই রাস্তাটা যারা এখানে থাকে, শুধু তাদের।',
        featured: true,
    },
    {
        id: 'tea-terraces',
        title: 'চা বাগানে প্রথম আলো',
        location: 'শ্রীমঙ্গল',
        year: '2024',
        category: 'landscapes',
        src: '/photos/tea-terraces.svg',
        width: 1500,
        height: 1000,
        caption: 'সবুজের ওপর সবুজ, তার ওপর আরও সবুজ — তর্ক করার মতো কেউ জেগেও ছিল না।',
    },
    {
        id: 'monsoon-crossing',
        title: 'বর্ষায় রাস্তা পার',
        location: 'ঢাকা',
        year: '2025',
        category: 'streets',
        src: '/photos/monsoon-crossing.svg',
        width: 1200,
        height: 1500,
        caption: 'একটা শেডের নিচে দাঁড়িয়ে তোলা, হাতে এমন এক কাপ কফি যেটা শেষ পর্যন্ত আর খাওয়া হয়নি।',
        featured: true,
    },
    {
        id: 'window-seat',
        title: 'জানালার পাশের সিট',
        location: 'ঢাকা',
        year: '2023',
        category: 'portraits',
        src: '/photos/window-seat.svg',
        width: 1200,
        height: 1200,
        caption: 'বিকেলের আলোই পুরো কাজটা করে দিল, যেটা সাধারণত আমাকেই করতে হয়।',
    },
    {
        id: 'night-market-blues',
        title: 'রাতের বাজার',
        location: 'চট্টগ্রাম',
        year: '2024',
        category: 'streets',
        src: '/photos/night-market-blues.svg',
        width: 1500,
        height: 1000,
        caption: 'দুই রকম আলোর টানাটানি, আর ভীষণ ধৈর্যশীল একজন দোকানদার।',
        featured: true,
    },
    {
        id: 'where-bugs-get-caught',
        title: 'যেখানে বাগগুলো ধরা পড়ে',
        location: 'আমার ডেস্ক',
        year: '2025',
        category: 'everyday',
        src: '/photos/where-bugs-get-caught.svg',
        width: 1200,
        height: 1200,
        caption: 'গ্যালারির বাকিগুলোর মতো রোমান্টিক না। তবে অনেক বেশি সত্যি।',
    },
    {
        id: 'twelve-seconds-of-sea',
        title: 'বারো সেকেন্ডের সমুদ্র',
        location: 'কক্সবাজার',
        year: '2023',
        category: 'landscapes',
        src: '/photos/twelve-seconds-of-sea.svg',
        width: 1500,
        height: 1000,
        caption: 'লম্বা এক্সপোজার, সস্তা একটা ট্রাইপড, আর প্রচুর বাতাস।',
    },
    {
        id: 'ridwan-mid-laugh',
        title: 'রিদওয়ান, হাসির মাঝখানে',
        location: 'ঢাকা',
        year: '2025',
        category: 'portraits',
        src: '/photos/ridwan-mid-laugh.svg',
        width: 1200,
        height: 1500,
        caption: 'একচল্লিশ নম্বর ফ্রেম। প্রথম চল্লিশটায় ও শুধু পোজ দিয়ে গেছে।',
        featured: true,
    },
];

/** Categories that actually have photos — keeps the filter row honest. */
export const activePhotoCategories = photoCategories.filter((category) =>
    photos.some((photo) => photo.category === category.id),
);

/**
 * The home-page strip. Falls back to the first few photos if nothing is
 * flagged, so the section never renders empty after an edit.
 *
 * @param {number} [count=5]
 */
export function getFeaturedPhotos(count = 5) {
    const flagged = photos.filter((photo) => photo.featured);
    return (flagged.length > 0 ? flagged : photos).slice(0, count);
}
