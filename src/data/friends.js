/**
 * The friends section — the people, not the projects.
 *
 * Everything here is placeholder content. Swap the names, professions and
 * years for your own, and drop real photos into `public/friends/` (the six
 * SVGs shipped there are stand-ins in the same style as the photography
 * placeholders, so the grid looks deliberate before you have files ready).
 *
 * Photos are cropped to a 4:5 portrait frame from the middle, so the shape of
 * the file you drop in does not matter — a square phone crop and an upright
 * camera frame both fill the same tile.
 */

export const friendsIntro = {
    eyebrow: 'পাশে যারা আছে',
    title: 'বন্ধুরা',
    description: 'রিলিজ পাস হোক বা ফেল, দিনশেষে যাদের সাথে কথা হয়। কেউ স্কুল থেকে, কেউ ভার্সিটি থেকে, কেউ একেবারে হুট করে — কিন্তু সবাই এখনো আছে।',
};

/**
 * @typedef {object} Friend
 * @property {string} id          unique, also the React key
 * @property {string} name
 * @property {string} profession  one short line — what they do
 * @property {string} since       four-digit year the friendship started
 * @property {string} src         path under /public, or an imported asset
 * @property {string} [note]      optional half-sentence, shown under the name
 * @property {string} [where]     optional: where you met, written in the
 *   locative — 'স্কুলে', 'ভার্সিটিতে'. The suffix varies by word, so it lives
 *   here rather than being glued on in the card.
 */

/** @type {Friend[]} */
export const friends = [
    {
        id: 'sobuj',
        name: 'সবুজ হোসাইন',
        profession: 'ইইই ইঞ্জিনিয়ার',
        since: '2006',
        where: 'স্কুলে',
        note: 'আমার জীবনের প্রথম বন্ধু, বিজ্ঞানী🧑‍🔬 From Nator',
        src: '/friends/friend-1.jpg',
    },
    {
        id: '',
        name: 'আরিফুল ইসলাম',
        profession: 'সহকারী প্রকৌশলী, তিতাস ',
        since: '2014',
        where: 'হাই স্কুলে',
        note: '',
        src: '/friends/friend-2.jpg',
    },
    {
        id: 'sazzad',
        name: 'সাজ্জাদ হোসেন',
        profession: 'মার্চেন্ডাইজিং',
        since: '2014',
        where: 'হাই স্কুলে',
        note: 'স্কুল, কলেজ ও বিশ্ববিদ্যালয়জীবনে মেয়েদের সঙ্গে সবসময়ই ভালো সম্পর্ক ছিল।',
        src: '/friends/friend-3.jpg',
    },
];
