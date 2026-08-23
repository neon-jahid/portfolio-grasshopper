/**
 * Work history, education and certifications — newest first.
 * `end: null` renders as `ui.experience.present`.
 *
 * Years are written in Bengali numerals here rather than converted at render
 * time: they are content, and you may want a range like "২০২৩–২৪" that no
 * formatter would produce.
 */

export const experience = [
  {
    id: 'sqa-engineer',
    role: 'এসকিউএ ইঞ্জিনিয়ার',
    company: 'প্রতিষ্ঠানের নাম',
    location: 'ঢাকা, বাংলাদেশ',
    start: '২০২৪',
    end: null,
    points: [
      'ভেতরের দলগুলো প্রতিদিন যে ওয়েব প্ল্যাটফর্মটা ব্যবহার করে, তার রিলিজ টেস্ট প্ল্যানের দায়িত্ব আমার।',
      'অটোমেটেড রিগ্রেশন কাভারেজ বাড়িয়ে সেটাকে CI পাইপলাইনে ঢুকিয়েছি।',
      'রিফাইনমেন্টের সময় ডেভেলপারদের সাথে বসি, যাতে রিকোয়ারমেন্টের ফাঁকফোকর আগেই ধরা পড়ে।',
    ],
  },
  {
    id: 'junior-qa',
    role: 'জুনিয়র কিউএ ইঞ্জিনিয়ার',
    company: 'আগের প্রতিষ্ঠান',
    location: 'ঢাকা, বাংলাদেশ',
    start: '২০২৩',
    end: '২০২৪',
    points: [
      'ওয়েব আর মোবাইল রিলিজের জন্য টেস্ট কেস লিখেছি ও চালিয়েছি।',
      'ত্রুটি রিপোর্ট করে ভেরিফিকেশন পর্যন্ত ফলো আপ করেছি।',
    ],
  },
];

export const education = [
  {
    id: 'bsc',
    role: 'বিএসসি, কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং',
    company: 'বিশ্ববিদ্যালয়ের নাম',
    location: 'বাংলাদেশ',
    start: '২০১৯',
    end: '২০২৩',
    points: [],
  },
];

/** Certifications shown as compact cards beside the timeline. */
export const certifications = [
  {
    id: 'istqb',
    name: 'ISTQB Certified Tester — Foundation Level',
    issuer: 'ISTQB',
    year: '২০২৪',
  },
];
