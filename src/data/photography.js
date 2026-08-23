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
 *   2. point `src` at them
 *
 * The file's own dimensions do not matter: every frame on both surfaces is a
 * fixed shape and crops its photo from the middle, so a portrait phone shot
 * and a wide camera frame fill the same tile. The viewer shows the whole
 * uncropped image.
 */

export const photographyIntro = {
    eyebrow: 'ক্যামেরার চোখে',
    title: 'ফটোগ্রাফি',
    /** Home-page teaser. One line — the full version lives on /photos. */
    preview: 'টেস্টিং শেখায়, সবাই যেটা পাশ কাটিয়ে চলে যায় সেটার দিকেই আরেকবার তাকাতে। ক্যামেরাটাও সেই একই অভ্যাস — শুধু একটু নরম দিকে তাক করা।',
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
 * @property {string} [caption] longer line, lightbox only
 * @property {boolean} [featured] promote onto the home-page strip
 */

/** @type {Photo[]} */
export const photos = [
    {
        id: 'night-market-blues',
        title: 'অপরিচিত ফুল',
        location: 'দিয়াবাড়ি',
        year: '2026',
        category: 'streets',
        src: '/photos/flower.jpg',
        caption: '',
        featured: true,
    },
    {
        id: 'cat-next-door',
        title: 'পাশের বাসার বিড়াল',
        location: 'নিকুঞ্জ',
        year: '2026',
        category: 'everyday',
        src: '/photos/cat.jpg',
        featured: true,
    },
    {
        id: 'soinik-club',
        title: 'সৈনিক ক্লাব',
        location: 'ঢাকা',
        year: '2024',
        category: 'streets',
        src: '/photos/soinik-club.jpg',
        featured: true,
    },
    {
        id: 'turbine-field',
        title: 'টারবাইন',
        location: 'সিরাজগঞ্জ',
        year: '2025',
        category: 'landscapes',
        src: '/photos/windmill.jpg',
        featured: true,
    },
    {
        id: 'monsoon-crossing',
        title: 'ক্যাকটাস 🌵',
        location: 'সিরাজগঞ্জ',
        year: '2026',
        category: 'streets',
        src: '/photos/cactus.jpg',
        caption: '',
        featured: true,
    },
    {
        id: 'window-seat',
        title: 'জানালার পাশের সিট',
        location: 'ঢাকা',
        year: '2023',
        category: 'portraits',
        src: '/photos/window-seat.svg',
        caption: 'বিকেলের আলোই পুরো কাজটা করে দিল, যেটা সাধারণত আমাকেই করতে হয়।',
    },

    {
        id: 'where-bugs-get-caught',
        title: 'যেখানে বাগগুলো ধরা পড়ে',
        location: 'আমার ডেস্ক',
        year: '2025',
        category: 'everyday',
        src: '/photos/where-bugs-get-caught.svg',
        caption: 'গ্যালারির বাকিগুলোর মতো রোমান্টিক না। তবে অনেক বেশি সত্যি।',
    },
    {
        id: 'twelve-seconds-of-sea',
        title: 'বারো সেকেন্ডের সমুদ্র',
        location: 'কক্সবাজার',
        year: '2023',
        category: 'landscapes',
        src: '/photos/twelve-seconds-of-sea.svg',
        caption: 'লম্বা এক্সপোজার, সস্তা একটা ট্রাইপড, আর প্রচুর বাতাস।',
    },
    {
        id: 'ridwan-mid-laugh',
        title: 'রিদওয়ান, হাসির মাঝখানে',
        location: 'ঢাকা',
        year: '2025',
        category: 'portraits',
        src: '/photos/ridwan-mid-laugh.svg',
        caption: 'একচল্লিশ নম্বর ফ্রেম। প্রথম চল্লিশটায় ও শুধু পোজ দিয়ে গেছে।',
        featured: true,
    },
];

/** Categories that actually have photos — keeps the filter row honest. */
export const activePhotoCategories = photoCategories.filter((category) => photos.some((photo) => photo.category === category.id));

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
