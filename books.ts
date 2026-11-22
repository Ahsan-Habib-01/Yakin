import type { Book } from "../types";

/** Free / public-domain / community-edition sample books for the Library tab. */
export const BOOKS: Book[] = [
  {
    id: "nawawi-40",
    title: { bn: "চল্লিশ হাদিস (ইমাম নববী) — নির্বাচিত", en: "The Forty Hadith of Imam an-Nawawi — Selections" },
    author: { bn: "ইমাম আন-নববী (র.)", en: "Imam Yahya ibn Sharaf an-Nawawi" },
    lang: "en",
    license: { bn: "পাবলিক ডোমেইন", en: "Public Domain" },
    description: {
      bn: "ইসলামের মূল ভিত্তিগুলো ধারণ করা সংক্ষিপ্ত হাদিস সংকলন (ইংরেজি নির্বাচিত সংস্করণ)।",
      en: "A compact collection of hadith that capture the foundations of Islam (selected edition).",
    },
    gradient: "from-emerald-700 via-emerald-800 to-slate-900",
    glyph: "٤٠",
    pages: [
      {
        heading: "Introduction",
        text: "Imam Yahya ibn Sharaf an-Nawawi (d. 676 AH / 1277 CE) gathered forty-two short hadith that, together, summarise the essential principles of the religion. Each hadith is brief enough to be memorised, yet rich enough to fill a lifetime of reflection. This selected edition presents six of them with short notes.",
      },
      {
        heading: "Hadith 1 — Actions and Intentions",
        ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        text: "“Actions are but by intentions, and every person will have only what he intended.” (Bukhari and Muslim). Many scholars described this hadith as one of the pillars of Islam: even the most beautiful deed is incomplete without a sincere intention for the sake of Allah.",
      },
      {
        heading: "Hadith 3 — The Pillars of Islam",
        ar: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ",
        text: "“Islam is built upon five: the testimony that there is no deity but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving zakah, performing Hajj to the House, and fasting Ramadan.” (Bukhari and Muslim). These five acts form the visible framework of a Muslim’s life.",
      },
      {
        heading: "Hadith 7 — Religion is Sincere Advice",
        ar: "الدِّينُ النَّصِيحَةُ",
        text: "“The religion is sincere advice.” We said, “For whom?” He ﷺ said, “For Allah, His Book, His Messenger, and for the leaders of the Muslims and their common people.” (Muslim). Sincerity means wishing good, honestly and without deceit, in every relationship.",
      },
      {
        heading: "Hadith 12 — Leaving What Does Not Concern You",
        ar: "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
        text: "“Part of the perfection of a person’s Islam is his leaving that which does not concern him.” (Tirmidhi and others; classed hasan). It teaches focus: protect your time, your tongue and your heart from idle talk and needless matters.",
      },
      {
        heading: "Hadith 13 — Love for Your Brother",
        ar: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        text: "“None of you truly believes until he loves for his brother what he loves for himself.” (Bukhari and Muslim). Wishing for others the good you wish for yourself — without envy — is a sign of complete faith and the root of a healthy community.",
      },
    ],
  },
  {
    id: "namaz-shikkha",
    title: { bn: "নামাজ শিক্ষা — সহজ গাইড", en: "Learning Salah — A Simple Guide" },
    author: { bn: "কমিউনিটি ফ্রি এডুকেশন সংস্করণ", en: "Community Free Education Edition" },
    lang: "bn",
    license: { bn: "ফ্রি শিক্ষামূলক", en: "Free Educational" },
    description: {
      bn: "নতুন শিক্ষার্থীদের জন্য নামাজের মৌলিক বিষয়গুলো সহজ বাংলায়।",
      en: "The basics of salah in simple Bangla for new learners.",
    },
    gradient: "from-amber-600 via-amber-700 to-slate-900",
    glyph: "صلاة",
    pages: [
      {
        heading: "ভূমিকা",
        text: "নামাজ ইসলামের দ্বিতীয় স্তম্ভ। দিনে পাঁচবার নামাজের মাধ্যমে একজন মুসলিম আল্লাহর সাথে সম্পর্ক নবায়ন করে। কোরআনে আল্লাহ বলেন, “নিশ্চয়ই নামাজ মুমিনদের ওপর নির্ধারিত সময়ে ফরজ।” (সূরা নিসা ৪:১০৩)। এই গাইডে নামাজের মৌলিক বিষয়গুলো সহজভাবে তুলে ধরা হয়েছে।",
      },
      {
        heading: "পাঁচ ওয়াক্ত নামাজ ও ফরজ রাকাত",
        text: "ফজর — ২ রাকাত, যোহর — ৪ রাকাত, আসর — ৪ রাকাত, মাগরিব — ৩ রাকাত, ইশা — ৪ রাকাত। এর সাথে রয়েছে সুন্নাত ও বিতর নামাজ। প্রতিটি নামাজের নির্ধারিত সময় আছে; সময়সূচি আপনার এলাকার স্থানীয় ক্যালেন্ডার বা মসজিদের সূচি থেকে দেখে নিন।",
      },
      {
        heading: "অজুর ফরজ",
        text: "সূরা মায়িদার ৬ নং আয়াত অনুযায়ী অজুর মূল কাজ চারটি: (১) পুরো মুখমণ্ডল ধোয়া, (২) কনুইসহ দুই হাত ধোয়া, (৩) মাথা মাসেহ করা এবং (৪) টাখনুসহ দুই পা ধোয়া। অজুর শুরুতে ‘বিসমিল্লাহ’ বলা এবং মিসওয়াক করা সুন্নাত।",
      },
      {
        heading: "নামাজের শর্তসমূহ",
        text: "নামাজ শুরুর আগে কয়েকটি শর্ত পূরণ করতে হয়: শরীর, পোশাক ও স্থান পবিত্র হওয়া; সতর ঢাকা; কিবলামুখী হওয়া; নামাজের সময় হওয়া এবং মনে মনে নিয়ত করা। কোনো শর্ত অনুপস্থিত থাকলে নামাজ সহীহ হয় না।",
      },
      {
        heading: "নামাজের সংক্ষিপ্ত পদ্ধতি",
        ar: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
        text: "তাকবীরে তাহরীমা দিয়ে নামাজ শুরু হয়। দাঁড়িয়ে সূরা ফাতিহা ও অন্য একটি সূরা পড়া হয়। এরপর রুকুতে ‘সুবহানা রাব্বিয়াল আযীম’, সিজদায় ‘সুবহানা রাব্বিয়াল আ‘লা’ (উপরের আরবি) পড়া হয়। শেষ বৈঠকে তাশাহহুদ, দুরূদ ও দুআ পড়ে সালাম ফিরিয়ে নামাজ শেষ করা হয়।",
      },
      {
        heading: "খুশু ও নিয়মিততা",
        text: "নামাজ শুধু নড়াচড়া নয়; অন্তরের উপস্থিতিই এর প্রাণ। যা পড়ছেন তার অর্থ জানার চেষ্টা করুন এবং ধীরস্থিরভাবে আদায় করুন। নামাজের নিয়ম-কানুনে মাযহাবগত কিছু পার্থক্য রয়েছে, তাই নির্ভরযোগ্য আলেমের কাছ থেকে হাতে-কলমে শিখে নেওয়া উত্তম।",
      },
    ],
  },
  {
    id: "seerah-brief",
    title: { bn: "মুহাম্মাদ ﷺ — সীরাতের সংক্ষিপ্ত পরিচিতি", en: "Muhammad ﷺ — A Brief Seerah Overview" },
    author: { bn: "কমিউনিটি ফ্রি এডুকেশন সংস্করণ", en: "Community Free Education Edition" },
    lang: "en",
    license: { bn: "ফ্রি শিক্ষামূলক", en: "Free Educational" },
    description: {
      bn: "রাসূলুল্লাহ ﷺ-এর জীবনের প্রধান ঘটনাগুলোর সংক্ষিপ্ত ইংরেজি সারসংক্ষেপ।",
      en: "A concise English overview of the major milestones in the life of the Prophet ﷺ.",
    },
    gradient: "from-sky-700 via-slate-800 to-slate-900",
    glyph: "ﷺ",
    pages: [
      {
        heading: "Birth and Early Life",
        text: "Muhammad ﷺ was born in Makkah around 570 CE, in the Year of the Elephant, into the noble tribe of Quraysh. His father ‘Abdullah died before his birth and his mother Aminah passed away when he was about six. He was raised by his grandfather ‘Abd al-Muttalib and then by his uncle Abu Talib.",
      },
      {
        heading: "Al-Amin — The Trustworthy",
        text: "Even before prophethood, he was known among his people as ‘as-Sadiq al-Amin’, the truthful and trustworthy. At the age of 25 he married Khadijah (RA), a respected businesswoman, who became his closest supporter throughout the early years of his mission.",
      },
      {
        heading: "The First Revelation",
        ar: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
        text: "At the age of 40, while in the Cave of Hira, the angel Jibril brought the first revelation: “Read in the name of your Lord who created” (96:1). The message of pure monotheism was met by years of opposition and persecution from many of the Quraysh leaders.",
      },
      {
        heading: "The Hijrah to Madinah",
        text: "In 622 CE, after thirteen years of calling people in Makkah, the Prophet ﷺ migrated to Madinah with Abu Bakr (RA). This event marks the beginning of the Islamic calendar. In Madinah he united the Muhajirun and the Ansar in brotherhood and established a community based on justice and mutual rights.",
      },
      {
        heading: "Years in Madinah",
        text: "The Madinan years saw the Battle of Badr (2 AH), Uhud (3 AH) and the Trench (5 AH). In 6 AH the Treaty of Hudaybiyyah brought a period of peace that allowed Islam to spread widely, as people met Muslims and heard the message calmly.",
      },
      {
        heading: "Conquest of Makkah and Farewell",
        text: "In 8 AH Makkah was opened almost without bloodshed, and the Prophet ﷺ granted general amnesty to his former opponents. In 10 AH he delivered the Farewell Sermon at ‘Arafah, emphasising the sanctity of life, justice, and the rights of women and neighbours. He passed away in Madinah in 11 AH (632 CE).",
      },
    ],
  },
  {
    id: "adab-islami",
    title: { bn: "ইসলামী শিষ্টাচার (আদাব) — নির্বাচিত অধ্যায়", en: "Islamic Manners (Adab) — Selected Chapters" },
    author: { bn: "কমিউনিটি ফ্রি এডুকেশন সংস্করণ", en: "Community Free Education Edition" },
    lang: "bn",
    license: { bn: "ফ্রি শিক্ষামূলক", en: "Free Educational" },
    description: {
      bn: "দৈনন্দিন জীবনের ইসলামী আদব—সালাম, পিতা-মাতা, প্রতিবেশী, সত্যবাদিতা ও খাওয়ার আদব।",
      en: "Everyday Islamic etiquette — greeting, parents, neighbours, truthfulness and table manners (in Bangla).",
    },
    gradient: "from-teal-700 via-emerald-800 to-slate-900",
    glyph: "أدب",
    pages: [
      {
        heading: "সালামের প্রসার",
        ar: "أَفْشُوا السَّلَامَ بَيْنَكُمْ",
        text: "রাসূল ﷺ বলেছেন, “আমি কি তোমাদের এমন একটি কাজের কথা বলব না, যা করলে তোমরা পরস্পরকে ভালোবাসবে? তোমরা নিজেদের মধ্যে সালামের প্রসার ঘটাও।” (সহীহ মুসলিম ৫৪)। সালাম শুধু অভিবাদন নয়, এটি শান্তি ও দুআর বার্তা।",
      },
      {
        heading: "পিতা-মাতার সাথে সদ্ব্যবহার",
        ar: "وَبِالْوَالِدَيْنِ إِحْسَانًا",
        text: "আল্লাহ তাঁর ইবাদতের নির্দেশের পরপরই পিতা-মাতার সাথে সদ্ব্যবহারের আদেশ দিয়েছেন (সূরা বনী ইসরাঈল ১৭:২৩)। তাঁদের সামনে ‘উফ’ পর্যন্ত না বলা, নম্রভাবে কথা বলা এবং তাঁদের জন্য দুআ করা এই আদবের অংশ।",
      },
      {
        heading: "প্রতিবেশীর হক",
        ar: "فَلَا يُؤْذِ جَارَهُ",
        text: "রাসূল ﷺ বলেছেন, “যে ব্যক্তি আল্লাহ ও আখিরাতের প্রতি ঈমান রাখে, সে যেন তার প্রতিবেশীকে কষ্ট না দেয়।” (সহীহ বুখারী ও মুসলিম)। প্রতিবেশীর খোঁজখবর নেওয়া, বিপদে পাশে দাঁড়ানো এবং তাকে কষ্ট না দেওয়া ঈমানের দাবি।",
      },
      {
        heading: "সত্যবাদিতা",
        ar: "عَلَيْكُمْ بِالصِّدْقِ",
        text: "রাসূল ﷺ বলেছেন, “তোমরা সত্যকে আঁকড়ে ধরো, কারণ সত্য নেক কাজের দিকে পথ দেখায়, আর নেক কাজ জান্নাতের পথ দেখায়।” (সহীহ বুখারী ৬০৯৪, সহীহ মুসলিম ২৬০৭)। ছোট-বড় সব বিষয়ে সত্য বলার অভ্যাস গড়ে তুলুন।",
      },
      {
        heading: "মন্দের জবাব ভালো দিয়ে",
        ar: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
        text: "আল্লাহ বলেন, “ভালো ও মন্দ সমান নয়। মন্দকে প্রতিহত করুন যা উত্তম তা দিয়ে; তখন দেখবেন, আপনার ও যার মধ্যে শত্রুতা ছিল, সে যেন অন্তরঙ্গ বন্ধু হয়ে গেছে।” (সূরা ফুসসিলাত ৪১:৩৪)। ক্ষমা ও ধৈর্য সম্পর্ক জোড়া লাগায়।",
      },
      {
        heading: "খাওয়ার আদব",
        ar: "يَا غُلَامُ سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ",
        text: "রাসূল ﷺ এক কিশোরকে শিখিয়েছেন, “হে বৎস! আল্লাহর নাম নাও (বিসমিল্লাহ বলো), ডান হাতে খাও এবং তোমার সামনের দিক থেকে খাও।” (সহীহ বুখারী ৫৩৭৬)। খাওয়ার শেষে আল্লাহর প্রশংসা (আলহামদুলিল্লাহ) করা সুন্নাত।",
      },
    ],
  },
];
