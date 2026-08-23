/**
 * Portfolio projects.
 *
 * `featured: true` promotes a project to the large two-column card.
 * Any empty string in `links` is skipped when rendering.
 */

export const projects = [
  {
    id: 'ecommerce-regression',
    title: 'ই-কমার্স রিগ্রেশন স্যুট',
    summary:
      'একটা মাল্টি-ভেন্ডর স্টোরফ্রন্টের জন্য এন্ড-টু-এন্ড অটোমেটেড রিগ্রেশন কাভারেজ, CI-এর সাথে জোড়া — যাতে প্রতিটা পুল রিকোয়েস্টেই একটা রায় পাওয়া যায়।',
    highlights: [
      'চেকআউট, সার্চ আর অ্যাকাউন্ট ফ্লো মিলিয়ে ১৮০+ অটোমেটেড সিনারিও',
      'ম্যানুয়াল রিগ্রেশন পাস দুই দিন থেকে নেমে চল্লিশ মিনিটে',
      'Page Object Model কাঠামো, ফলে নতুন পেজ কাভার করতে কয়েক মিনিটই যথেষ্ট',
    ],
    stack: ['Playwright', 'JavaScript', 'GitHub Actions', 'Allure'],
    type: 'অটোমেশন',
    featured: true,
    links: {
      repo: 'https://github.com/',
      live: '',
      caseStudy: '',
    },
  },
  {
    id: 'api-contract-checks',
    title: 'API কন্ট্রাক্ট টেস্ট প্যাক',
    summary:
      'একটা পেমেন্ট API-এর স্কিমা, স্ট্যাটাস কোড আর অথ রুল তিনটা এনভায়রনমেন্টে যাচাই করার Postman ও Newman কালেকশন।',
    highlights: [
      'এনভায়রনমেন্ট-চালিত কালেকশন: এক রানেই তিনটা এনভায়রনমেন্ট কাভার হয়',
      'স্কিমা অ্যাসারশন রিলিজের আগেই ব্রেকিং চেঞ্জ ধরে ফেলে',
      'প্রতি রাতে চলে আর দলের চ্যানেলে সারাংশ পাঠিয়ে দেয়',
    ],
    stack: ['Postman', 'Newman', 'JSON Schema', 'Node.js'],
    type: 'API টেস্টিং',
    featured: true,
    links: { repo: 'https://github.com/', live: '', caseStudy: '' },
  },
  {
    id: 'load-baseline',
    title: 'লোড ও পারফরম্যান্স বেসলাইন',
    summary:
      'সবচেয়ে ব্যস্ত দশটা এন্ডপয়েন্টের রেসপন্স-টাইম বেসলাইন ঠিক করার একটা JMeter টেস্ট প্ল্যান, সাথে এমন বাজেট যা রিগ্রেশন হলে বিল্ড ফেল করিয়ে দেয়।',
    highlights: [
      'বাস্তব ট্রাফিকের ধরন দেখে বানানো র‍্যাম্পড লোড প্রোফাইল',
      'প্রতিটা এন্ডপয়েন্টের জন্য লিখিত p95 বাজেট',
    ],
    stack: ['JMeter', 'Grafana', 'SQL'],
    type: 'পারফরম্যান্স',
    featured: false,
    links: { repo: 'https://github.com/', live: '', caseStudy: '' },
  },
  {
    id: 'mobile-test-strategy',
    title: 'মোবাইল রিলিজ টেস্ট স্ট্র্যাটেজি',
    summary:
      'একটা অ্যান্ড্রয়েড অ্যাপের ডিভাইস ম্যাট্রিক্স, অফলাইন আচরণ আর রিলিজ-ক্যান্ডিডেট সাইন-অফ নিয়ে লিখিত স্ট্র্যাটেজি ও বারবার ব্যবহারযোগ্য চেকলিস্ট।',
    highlights: [
      'সব জায়গায় সব কিছু টেস্ট না করে ঝুঁকি অনুযায়ী সাজানো ডিভাইস ম্যাট্রিক্স',
      'পরপর ছয়টা রিলিজে একই চেকলিস্ট কাজে লেগেছে',
    ],
    stack: ['Appium', 'TestRail', 'Android'],
    type: 'স্ট্র্যাটেজি',
    featured: false,
    links: { repo: '', live: '', caseStudy: '' },
  },
];

/** Derived lists so components never re-filter the same array. */
export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
