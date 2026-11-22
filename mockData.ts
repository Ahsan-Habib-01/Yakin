import type { Hadith, Reciter, Reference, Surah, Bi } from "../types";

/* ------------------------------------------------------------------ */
/*  QURAN — Surah Al-Fatihah & Surah Al-Ikhlas                          */
/* ------------------------------------------------------------------ */

const HADITH_QUDSI_NOTE_BN =
  "সহীহ মুসলিমে (হাদিস ৩৯৫) বর্ণিত হাদিসে কুদসীতে আল্লাহ বলেন: “আমি সালাতকে আমার ও আমার বান্দার মধ্যে দুই ভাগে ভাগ করেছি, আর আমার বান্দা যা চাইবে তা-ই পাবে।”";
const HADITH_QUDSI_NOTE_EN =
  "In the Qudsi hadith recorded in Sahih Muslim (395), Allah says: “I have divided the prayer between Myself and My servant into two halves, and My servant shall have what he asks for.”";

export const SURAHS: Surah[] = [
  {
    id: 1,
    ar: "الفاتحة",
    name: { bn: "আল-ফাতিহা", en: "Al-Fatihah" },
    meaning: { bn: "সূচনা", en: "The Opening" },
    revelation: { bn: "মক্কী", en: "Makki" },
    intro: {
      bn: "কোরআনের প্রথম সূরা। একে ‘উম্মুল কিতাব’ ও ‘সাবউল মাসানী’ বলা হয়। প্রতিটি নামাজের প্রতি রাকাতে এই সূরা পাঠ করা হয়।",
      en: "The first chapter of the Quran, known as ‘Umm al-Kitab’ and ‘as-Sab‘ al-Mathani’. It is recited in every unit of every prayer.",
    },
    ayahs: [
      {
        n: 1,
        ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        bn: "শুরু করছি আল্লাহর নামে, যিনি পরম করুণাময়, অতি দয়ালু।",
        en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        tafsir: {
          bn: "আল্লাহর নামে শুরু করা প্রতিটি ভালো কাজের আদব। ‘আর-রাহমান’ ও ‘আর-রাহীম’ আল্লাহর দুটি গুণবাচক নাম—মুফাসসিরদের মতে প্রথমটি সব সৃষ্টির প্রতি তাঁর ব্যাপক রহমত এবং দ্বিতীয়টি মুমিনদের প্রতি তাঁর বিশেষ রহমত নির্দেশ করে। কুফি গণনা অনুযায়ী বিসমিল্লাহ সূরা ফাতিহার প্রথম আয়াত।",
          en: "Beginning with Allah’s name is the etiquette of every good deed. ‘Ar-Rahman’ and ‘Ar-Rahim’ are two names of Allah; commentators explain that the first denotes His all-encompassing mercy towards creation and the second His special mercy towards the believers. In the Kufan numbering, the Basmalah is counted as the first verse of Al-Fatihah.",
        },
        asbab: {
          bn: "এই আয়াতের আলাদা কোনো সুনির্দিষ্ট শানে নুযূল বর্ণিত নেই। সূরা ফাতিহা মক্কায় অবতীর্ণ এবং এটি সার্বিকভাবে বান্দাকে আল্লাহর প্রশংসা ও সঠিক দুআ শিক্ষা দেওয়ার জন্য নাযিল হয়েছে।",
          en: "No specific occasion of revelation is reported for this verse. Al-Fatihah was revealed in Makkah and, as a whole, teaches the servant how to praise Allah and how to supplicate.",
        },
      },
      {
        n: 2,
        ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        bn: "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি সকল সৃষ্টির প্রতিপালক।",
        en: "[All] praise is [due] to Allah, Lord of the worlds -",
        tafsir: {
          bn: "‘হামদ’ হলো ভালোবাসা ও শ্রদ্ধার সাথে প্রশংসা, যা একমাত্র আল্লাহর প্রাপ্য। ‘রব’ অর্থ প্রতিপালক, মালিক ও পরিচালক। ‘আলামীন’ বলতে মানুষ, জিন, ফেরেশতা সহ আল্লাহ ছাড়া সমস্ত সৃষ্টিজগৎ বোঝানো হয়েছে।",
          en: "‘Hamd’ is praise accompanied by love and reverence, and is due to Allah alone. ‘Rabb’ means Lord, Owner, Sustainer and Director. ‘Al-‘Alamin’ refers to everything besides Allah — humans, jinn, angels and all creation.",
        },
        asbab: {
          bn: HADITH_QUDSI_NOTE_BN + " বান্দা যখন বলে ‘আলহামদুলিল্লাহি রাব্বিল আলামীন’, আল্লাহ বলেন, ‘আমার বান্দা আমার প্রশংসা করেছে’। (প্রাসঙ্গিক বর্ণনা, নির্দিষ্ট শানে নুযূল নয়)",
          en: HADITH_QUDSI_NOTE_EN + " When the servant says ‘Alhamdu lillahi Rabbil-‘alamin’, Allah says, ‘My servant has praised Me.’ (Related narration, not a specific cause of revelation.)",
        },
      },
      {
        n: 3,
        ar: "الرَّحْمَٰنِ الرَّحِيمِ",
        bn: "যিনি পরম করুণাময়, অতি দয়ালু।",
        en: "The Entirely Merciful, the Especially Merciful,",
        tafsir: {
          bn: "প্রতিপালকের পরিচয়ের পর তাঁর রহমতের কথা পুনরায় উল্লেখ করা হয়েছে, যাতে বান্দা বুঝতে পারে—তাঁর প্রভুত্ব কঠোরতা নয়, বরং রহমতের ওপর প্রতিষ্ঠিত।",
          en: "After introducing Him as Lord, His mercy is mentioned again so the servant understands that His lordship is built upon mercy.",
        },
        asbab: {
          bn: "আলাদা কোনো শানে নুযূল বর্ণিত নেই। সহীহ মুসলিমের হাদিসে কুদসী অনুযায়ী বান্দা এই আয়াত পড়লে আল্লাহ বলেন, ‘আমার বান্দা আমার গুণগান করেছে’।",
          en: "No separate occasion is reported. According to the Qudsi hadith in Sahih Muslim, when the servant recites this verse Allah says, ‘My servant has extolled Me.’",
        },
      },
      {
        n: 4,
        ar: "مَالِكِ يَوْمِ الدِّينِ",
        bn: "যিনি বিচার দিনের মালিক।",
        en: "Sovereign of the Day of Recompense.",
        tafsir: {
          bn: "‘ইয়াওমুদ্দীন’ হলো প্রতিদান ও বিচারের দিন—কিয়ামত। সেদিন সকল কর্তৃত্ব একমাত্র আল্লাহর হাতে থাকবে। এই আয়াত বান্দার মনে জবাবদিহির অনুভূতি জাগায়।",
          en: "‘Yawm ad-Din’ is the Day of Recompense and Judgement. On that day all authority belongs to Allah alone. The verse instils a sense of accountability.",
        },
        asbab: {
          bn: "আলাদা কোনো শানে নুযূল বর্ণিত নেই। হাদিসে কুদসীতে এই আয়াতের জবাবে আল্লাহ বলেন, ‘আমার বান্দা আমার মহিমা বর্ণনা করেছে’।",
          en: "No separate occasion is reported. In the Qudsi hadith, Allah responds to this verse: ‘My servant has glorified Me.’",
        },
      },
      {
        n: 5,
        ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        bn: "আমরা কেবল আপনারই ইবাদত করি এবং কেবল আপনারই কাছে সাহায্য চাই।",
        en: "It is You we worship and You we ask for help.",
        tafsir: {
          bn: "‘ইয়্যাকা’ আগে আনার মাধ্যমে ইবাদত ও সাহায্য প্রার্থনাকে একমাত্র আল্লাহর জন্য নির্দিষ্ট করা হয়েছে—এটিই তাওহীদের সারকথা। সূরার প্রথম অংশ আল্লাহর প্রশংসা, আর এখান থেকে বান্দার আবেদন শুরু।",
          en: "By placing ‘Iyyaka’ first, worship and seeking help are restricted to Allah alone — the essence of tawhid. The first part of the surah is praise of Allah; from here the servant’s petition begins.",
        },
        asbab: {
          bn: "হাদিসে কুদসীতে আল্লাহ বলেন, ‘এটি আমার ও আমার বান্দার মধ্যে বিভক্ত’—ইবাদত আল্লাহর জন্য, আর সাহায্য প্রার্থনা বান্দার জন্য। (প্রাসঙ্গিক বর্ণনা, সহীহ মুসলিম ৩৯৫)",
          en: "In the Qudsi hadith Allah says, ‘This is shared between Me and My servant’ — worship is for Allah and the request for help is for the servant. (Related narration, Sahih Muslim 395.)",
        },
      },
      {
        n: 6,
        ar: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        bn: "আমাদের সরল পথ দেখান।",
        en: "Guide us to the straight path -",
        tafsir: {
          bn: "এটি কোরআনের সবচেয়ে গুরুত্বপূর্ণ দুআগুলোর একটি। ‘সিরাতুল মুস্তাকীম’ হলো ইসলামের সেই সরল পথ, যা আল্লাহ পর্যন্ত পৌঁছায়। মুমিনও প্রতিনিয়ত হিদায়াতের মুখাপেক্ষী, তাই নামাজে বারবার এই দুআ করা হয়।",
          en: "This is among the most important supplications in the Quran. ‘As-Sirat al-Mustaqim’ is the straight path of Islam that leads to Allah. Even the believer constantly needs guidance, hence the repeated supplication in prayer.",
        },
        asbab: {
          bn: "আলাদা কোনো শানে নুযূল বর্ণিত নেই। হাদিসে কুদসী অনুযায়ী এই অংশে আল্লাহ বলেন, ‘এটি আমার বান্দার জন্য, আর আমার বান্দা যা চাইবে তা-ই পাবে’।",
          en: "No separate occasion is reported. According to the Qudsi hadith, from here Allah says: ‘This is for My servant, and My servant shall have what he asks for.’",
        },
      },
      {
        n: 7,
        ar: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        bn: "তাদের পথ, যাদের আপনি নিয়ামত দিয়েছেন; তাদের পথ নয়, যাদের প্রতি গজব নাজিল হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।",
        en: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
        tafsir: {
          bn: "সরল পথের ব্যাখ্যা: এটি নবী, সিদ্দীক, শহীদ ও সৎকর্মশীলদের পথ (সূরা নিসা ৪:৬৯)। ‘মাগদূব’ হলো যারা সত্য জেনেও তা অনুসরণ করেনি, আর ‘দ্বাল্লীন’ হলো যারা সত্য না জেনে পথ হারিয়েছে। সূরা শেষে ‘আমীন’ বলা সুন্নাত।",
          en: "This explains the straight path: the way of the prophets, the truthful, the martyrs and the righteous (Quran 4:69). ‘Al-Maghdub’ are those who knew the truth yet did not follow it, and ‘ad-Dallin’ are those who lost the way without knowledge. Saying ‘Amin’ after the surah is Sunnah.",
        },
        asbab: {
          bn: "আলাদা কোনো শানে নুযূল বর্ণিত নেই। এটি সূরার শেষ আয়াত, যেখানে বান্দা হিদায়াতপ্রাপ্তদের পথে চলার দুআ করে এবং ভ্রান্ত পথ থেকে আল্লাহর আশ্রয় চায়।",
          en: "No separate occasion is reported. This is the closing verse in which the servant asks to walk the path of the guided and seeks refuge from the paths of error.",
        },
      },
    ],
  },
  {
    id: 112,
    ar: "الإخلاص",
    name: { bn: "আল-ইখলাস", en: "Al-Ikhlas" },
    meaning: { bn: "একনিষ্ঠতা", en: "Sincerity" },
    revelation: { bn: "মক্কী", en: "Makki" },
    intro: {
      bn: "তাওহীদের সংক্ষিপ্ত ও পূর্ণাঙ্গ ঘোষণা। সহীহ বুখারীর হাদিস (৫০১৩) অনুযায়ী রাসূল ﷺ বলেছেন, এই সূরা কোরআনের এক-তৃতীয়াংশের সমান।",
      en: "A short, complete declaration of tawhid. According to Sahih al-Bukhari (5013), the Prophet ﷺ said that this surah is equal to one third of the Quran.",
    },
    ayahs: [
      {
        n: 1,
        ar: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        bn: "বলুন, তিনিই আল্লাহ, এক ও অদ্বিতীয়।",
        en: "Say, “He is Allah, [who is] One,",
        tafsir: {
          bn: "‘কুল’ (বলুন) শব্দে রাসূল ﷺ-কে এই সত্য ঘোষণার নির্দেশ দেওয়া হয়েছে। ‘আহাদ’ অর্থ এক, অদ্বিতীয়—সত্তা, গুণ ও কর্তৃত্বে তাঁর কোনো শরীক নেই।",
          en: "‘Qul’ (Say) commands the Prophet ﷺ to proclaim this truth. ‘Ahad’ means One and Unique — He has no partner in His essence, attributes or authority.",
        },
        asbab: {
          bn: "উবাই ইবনে কাব (রা.) থেকে বর্ণিত (তিরমিযী ও মুসনাদে আহমাদ): মুশরিকরা নবী ﷺ-কে বলল, ‘আপনার রবের বংশপরিচয় বলুন।’ তখন আল্লাহ এই সূরা নাযিল করেন। (বর্ণনার সনদ নিয়ে মুহাদ্দিসগণের মধ্যে আলোচনা আছে; তবে এটি তাফসীর গ্রন্থসমূহে প্রসিদ্ধ শানে নুযূল।)",
          en: "Narrated from Ubayy ibn Ka‘b (Tirmidhi and Musnad Ahmad): the polytheists said to the Prophet ﷺ, ‘Tell us about the lineage of your Lord.’ Then Allah revealed this surah. (Hadith scholars have discussed the chain of this report, but it is the well-known occasion of revelation cited in the tafsir works.)",
        },
      },
      {
        n: 2,
        ar: "اللَّهُ الصَّمَدُ",
        bn: "আল্লাহ অমুখাপেক্ষী; সবাই তাঁর মুখাপেক্ষী।",
        en: "Allah, the Eternal Refuge.",
        tafsir: {
          bn: "‘আস-সামাদ’ হলেন তিনি, যিনি কারো মুখাপেক্ষী নন, অথচ সকলে সব প্রয়োজনে তাঁরই দিকে ফেরে। ইবনে আব্বাস (রা.) থেকে এই অর্থই বর্ণিত হয়েছে।",
          en: "‘As-Samad’ is the One who needs no one, while everyone turns to Him in every need. This meaning is reported from Ibn ‘Abbas (may Allah be pleased with him).",
        },
        asbab: {
          bn: "প্রথম আয়াতের একই প্রেক্ষাপটে নাযিল—মুশরিকদের প্রশ্নের উত্তরে আল্লাহর পরিচয় তুলে ধরা হয়েছে।",
          en: "Revealed in the same context as the first verse — answering the polytheists’ question by describing who Allah is.",
        },
      },
      {
        n: 3,
        ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        bn: "তিনি কাউকে জন্ম দেননি এবং কারো থেকে জন্ম নেননি।",
        en: "He neither begets nor is born,",
        tafsir: {
          bn: "আল্লাহর কোনো সন্তান নেই, তিনিও কারো সন্তান নন। তিনি অনাদি ও অনন্ত। এতে সন্তান আরোপকারী সকল ভ্রান্ত বিশ্বাসের খণ্ডন রয়েছে।",
          en: "Allah has no offspring and is not the offspring of anyone. He is eternal without beginning or end. This refutes all false beliefs that ascribe children to Him.",
        },
        asbab: {
          bn: "মক্কার মুশরিকরা ফেরেশতাদের আল্লাহর কন্যা বলত এবং অন্যরাও আল্লাহর প্রতি সন্তান আরোপ করত—এসব ধারণার জবাবে এই আয়াত। (তাফসীর গ্রন্থের সাধারণ প্রেক্ষাপট)",
          en: "The Makkan polytheists claimed the angels were daughters of Allah, and others also ascribed offspring to Him; this verse answers such claims. (General context from the tafsir works.)",
        },
      },
      {
        n: 4,
        ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        bn: "এবং তাঁর সমকক্ষ কেউ নেই।",
        en: "Nor is there to Him any equivalent.”",
        tafsir: {
          bn: "‘কুফুউ’ অর্থ সমকক্ষ বা সদৃশ। সৃষ্টির কেউ আল্লাহর সত্তা, গুণ বা কাজে তাঁর সমান নয়। এই আয়াতে তাওহীদের ঘোষণা পূর্ণতা পেয়েছে।",
          en: "‘Kufuwan’ means an equal or likeness. Nothing in creation equals Allah in His essence, attributes or actions. With this verse the declaration of tawhid is complete.",
        },
        asbab: {
          bn: "আলাদা কোনো শানে নুযূল বর্ণিত নেই; এটি সূরার সামগ্রিক প্রেক্ষাপটের অংশ। (সহীহ বুখারী ৭৩৭৫-এ এক সাহাবী প্রতি রাকাতে এই সূরা পড়তেন, নবী ﷺ বললেন, ‘আল্লাহ তাকে ভালোবাসেন’—এটি সূরার ফযীলত সংক্রান্ত বর্ণনা।)",
          en: "No separate occasion is reported; it is part of the surah’s overall context. (In Sahih al-Bukhari 7375, a Companion used to recite this surah in every unit of prayer and the Prophet ﷺ said, ‘Allah loves him’ — a narration about the surah’s virtue.)",
        },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HADITH                                                              */
/* ------------------------------------------------------------------ */

export const HADITHS: Hadith[] = [
  {
    id: "bukhari-1",
    ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    text: {
      bn: "নিশ্চয়ই আমলসমূহ নিয়তের ওপর নির্ভরশীল, আর প্রত্যেক ব্যক্তি তা-ই পাবে যা সে নিয়ত করে।",
      en: "Actions are but by intentions, and every person will have only what they intended.",
    },
    narrator: { bn: "উমর ইবনুল খাত্তাব (রা.)", en: "‘Umar ibn al-Khattab (RA)" },
    source: { bn: "সহীহ বুখারী ১, সহীহ মুসলিম ১৯০৭", en: "Sahih al-Bukhari 1, Sahih Muslim 1907" },
    explanation: {
      bn: "ইসলামে প্রতিটি আমলের গ্রহণযোগ্যতা নিয়তের ওপর নির্ভর করে। ইখলাস বা একনিষ্ঠতা ছাড়া বাহ্যিক আমল পূর্ণতা পায় না। অনেক আলেম এই হাদিসকে দ্বীনের মূল ভিত্তিগুলোর একটি বলেছেন।",
      en: "The acceptance of every deed in Islam depends on the intention behind it. Outward deeds are incomplete without sincerity. Many scholars described this hadith as one of the foundations of the religion.",
    },
  },
  {
    id: "bukhari-10",
    ar: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    text: {
      bn: "প্রকৃত মুসলিম সে-ই, যার জিহ্বা ও হাত থেকে অন্য মুসলিমরা নিরাপদ থাকে।",
      en: "The Muslim is the one from whose tongue and hand the other Muslims are safe.",
    },
    narrator: { bn: "আব্দুল্লাহ ইবনে আমর (রা.)", en: "‘Abdullah ibn ‘Amr (RA)" },
    source: { bn: "সহীহ বুখারী ১০, সহীহ মুসলিম ৪০", en: "Sahih al-Bukhari 10, Sahih Muslim 40" },
    explanation: {
      bn: "ইসলামের পরিচয় শুধু ইবাদতে নয়, চরিত্রেও প্রকাশ পায়। কথা ও কাজের মাধ্যমে অন্যকে কষ্ট না দেওয়া ঈমানের দাবি।",
      en: "Islam is shown not only in worship but also in character. Not harming others by word or deed is a requirement of faith.",
    },
  },
  {
    id: "bukhari-13",
    ar: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    text: {
      bn: "তোমাদের কেউ প্রকৃত মুমিন হতে পারবে না, যতক্ষণ না সে নিজের জন্য যা পছন্দ করে তা তার ভাইয়ের জন্যও পছন্দ করে।",
      en: "None of you truly believes until he loves for his brother what he loves for himself.",
    },
    narrator: { bn: "আনাস ইবনে মালিক (রা.)", en: "Anas ibn Malik (RA)" },
    source: { bn: "সহীহ বুখারী ১৩, সহীহ মুসলিম ৪৫", en: "Sahih al-Bukhari 13, Sahih Muslim 45" },
    explanation: {
      bn: "এখানে ‘পূর্ণ ঈমান’ বোঝানো হয়েছে। অন্যের কল্যাণ কামনা, হিংসা বর্জন ও সমবেদনা পূর্ণ ঈমানের অংশ।",
      en: "This refers to complete faith. Wishing good for others, avoiding envy and showing compassion are part of perfected belief.",
    },
  },
  {
    id: "bukhari-5027",
    ar: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    text: {
      bn: "তোমাদের মধ্যে সর্বোত্তম সে, যে কোরআন শেখে এবং অন্যকে শেখায়।",
      en: "The best among you are those who learn the Quran and teach it.",
    },
    narrator: { bn: "উসমান ইবনে আফফান (রা.)", en: "‘Uthman ibn ‘Affan (RA)" },
    source: { bn: "সহীহ বুখারী ৫০২৭", en: "Sahih al-Bukhari 5027" },
    explanation: {
      bn: "কোরআন শেখা ও শেখানো—উভয়ই মর্যাদার কাজ। শেখার মধ্যে তিলাওয়াত, অর্থ বোঝা এবং আমল করা অন্তর্ভুক্ত।",
      en: "Both learning and teaching the Quran are honoured acts. Learning includes recitation, understanding the meaning and acting upon it.",
    },
  },
  {
    id: "muslim-223",
    ar: "الطُّهُورُ شَطْرُ الْإِيمَانِ",
    text: {
      bn: "পবিত্রতা ঈমানের অর্ধেক।",
      en: "Cleanliness is half of faith.",
    },
    narrator: { bn: "আবু মালিক আল-আশআরী (রা.)", en: "Abu Malik al-Ash‘ari (RA)" },
    source: { bn: "সহীহ মুসলিম ২২৩", en: "Sahih Muslim 223" },
    explanation: {
      bn: "বাহ্যিক পরিচ্ছন্নতা (অজু, গোসল) এবং অন্তরের পবিত্রতা—দুটোই এর অন্তর্ভুক্ত। পবিত্রতা নামাজের চাবিকাঠি।",
      en: "It includes outward purity (wudu, ghusl) and inner purity of the heart. Purification is the key to prayer.",
    },
  },
  {
    id: "bukhari-6406",
    ar: "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَٰنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    text: {
      bn: "দুটি বাক্য জিহ্বায় হালকা, মীযানে ভারী এবং রহমানের কাছে প্রিয়: ‘সুবহানাল্লাহি ওয়া বিহামদিহি, সুবহানাল্লাহিল আযীম’।",
      en: "Two phrases are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: “SubhanAllahi wa bihamdihi, SubhanAllahil-‘Azim.”",
    },
    narrator: { bn: "আবু হুরায়রা (রা.)", en: "Abu Hurayrah (RA)" },
    source: { bn: "সহীহ বুখারী ৬৪০৬, সহীহ মুসলিম ২৬৯৪", en: "Sahih al-Bukhari 6406, Sahih Muslim 2694" },
    explanation: {
      bn: "অল্প সময়ে সহজে পড়া যায়, অথচ প্রতিদান বিশাল—তাই প্রতিদিনের জিকিরে এই বাক্য দুটি রাখা উত্তম।",
      en: "They are easy to say in little time yet carry immense reward, which is why they are recommended in daily dhikr.",
    },
  },
  {
    id: "bukhari-631",
    ar: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي",
    text: {
      bn: "তোমরা সেভাবেই নামাজ পড়ো, যেভাবে আমাকে নামাজ পড়তে দেখেছ।",
      en: "Pray as you have seen me praying.",
    },
    narrator: { bn: "মালিক ইবনুল হুওয়াইরিস (রা.)", en: "Malik ibn al-Huwayrith (RA)" },
    source: { bn: "সহীহ বুখারী ৬৩১", en: "Sahih al-Bukhari 631" },
    explanation: {
      bn: "নামাজের পদ্ধতি রাসূল ﷺ-এর আমল থেকে শিখতে হবে। তাই নির্ভরযোগ্য আলেমের কাছ থেকে নামাজ শেখা গুরুত্বপূর্ণ।",
      en: "The method of prayer is to be learned from the practice of the Prophet ﷺ, so learning prayer from reliable scholars is important.",
    },
  },
];

const hadithRef = (id: string): Reference => {
  const h = HADITHS.find((x) => x.id === id)!;
  return {
    id: h.id,
    kind: "hadith",
    ar: h.ar,
    text: h.text,
    cite: { bn: `${h.source.bn} — ${h.narrator.bn}`, en: `${h.source.en} — ${h.narrator.en}` },
    explanation: h.explanation,
  };
};

/* ------------------------------------------------------------------ */
/*  AI REFERENCE ASSISTANT — verified reference index                   */
/* ------------------------------------------------------------------ */

const Q_2_153: Reference = {
  id: "q-2-153",
  kind: "quran",
  ar: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  text: {
    bn: "হে মুমিনগণ! তোমরা ধৈর্য ও নামাজের মাধ্যমে সাহায্য প্রার্থনা করো। নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।",
    en: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
  },
  cite: { bn: "সূরা আল-বাকারা ২:১৫৩", en: "Surah Al-Baqarah 2:153" },
  explanation: {
    bn: "কষ্ট ও পরীক্ষার সময় দুটি অবলম্বন: সবর (ধৈর্য) ও সালাত। ‘আল্লাহ ধৈর্যশীলদের সাথে আছেন’ বলতে তাঁর বিশেষ সাহায্য ও সমর্থন বোঝানো হয়েছে।",
    en: "Two supports in hardship: sabr (patience) and salah. ‘Allah is with the patient’ refers to His special help and support.",
  },
};

const B_1469: Reference = {
  id: "bukhari-1469",
  kind: "hadith",
  ar: "وَمَنْ يَتَصَبَّرْ يُصَبِّرْهُ اللَّهُ، وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ",
  text: {
    bn: "যে ধৈর্য ধারণের চেষ্টা করে, আল্লাহ তাকে ধৈর্য দান করেন; আর ধৈর্যের চেয়ে উত্তম ও প্রশস্ত কোনো দান কাউকে দেওয়া হয়নি।",
    en: "Whoever tries to be patient, Allah will make him patient; and no one has been given a gift better and more encompassing than patience.",
  },
  cite: { bn: "সহীহ বুখারী ১৪৬৯ — আবু সাঈদ আল-খুদরী (রা.)", en: "Sahih al-Bukhari 1469 — Abu Sa‘id al-Khudri (RA)" },
  explanation: {
    bn: "ধৈর্য একটি অর্জনযোগ্য গুণ—চেষ্টা করলে আল্লাহ সেই ধৈর্য সহজ করে দেন।",
    en: "Patience is an acquirable quality — when one strives for it, Allah makes it easier.",
  },
};

const Q_17_23: Reference = {
  id: "q-17-23",
  kind: "quran",
  ar: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
  text: {
    bn: "আপনার প্রতিপালক আদেশ করেছেন যে, তোমরা তাঁকে ছাড়া অন্য কারো ইবাদত করো না এবং পিতা-মাতার সাথে সদ্ব্যবহার করো।",
    en: "And your Lord has decreed that you worship none but Him, and that you be kind to parents.",
  },
  cite: { bn: "সূরা বনী ইসরাঈল ১৭:২৩", en: "Surah Al-Isra 17:23" },
  explanation: {
    bn: "আল্লাহর ইবাদতের নির্দেশের ঠিক পরেই পিতা-মাতার সাথে সদাচরণের নির্দেশ—ইসলামে তাঁদের অধিকারের গুরুত্ব বোঝায়।",
    en: "Kindness to parents is commanded right after worship of Allah, showing the weight of their rights in Islam.",
  },
};

const B_5971: Reference = {
  id: "bukhari-5971",
  kind: "hadith",
  ar: "أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أَبُوكَ",
  text: {
    bn: "এক ব্যক্তি জিজ্ঞেস করল, ‘আমার সদ্ব্যবহার পাওয়ার সবচেয়ে বেশি হকদার কে?’ তিনি ﷺ বললেন, “তোমার মা, তারপর তোমার মা, তারপর তোমার মা, তারপর তোমার বাবা।”",
    en: "A man asked who deserved his best companionship the most. He ﷺ said: “Your mother, then your mother, then your mother, then your father.”",
  },
  cite: { bn: "সহীহ বুখারী ৫৯৭১, সহীহ মুসলিম ২৫৪৮ — আবু হুরায়রা (রা.)", en: "Sahih al-Bukhari 5971, Sahih Muslim 2548 — Abu Hurayrah (RA)" },
  explanation: {
    bn: "মায়ের কষ্ট ও ত্যাগের কারণে তাঁর অধিকার তিনবার উল্লেখ করা হয়েছে; এরপর পিতার অধিকার।",
    en: "The mother’s right is mentioned three times because of her hardship and sacrifice, followed by the father’s right.",
  },
};

const Q_20_14: Reference = {
  id: "q-20-14",
  kind: "quran",
  ar: "إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
  text: {
    bn: "নিশ্চয়ই আমিই আল্লাহ, আমি ছাড়া কোনো ইলাহ নেই; অতএব আমার ইবাদত করো এবং আমার স্মরণের জন্য নামাজ কায়েম করো।",
    en: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.",
  },
  cite: { bn: "সূরা ত্বহা ২০:১৪", en: "Surah Ta-Ha 20:14" },
  explanation: {
    bn: "মুসা (আ.)-কে সম্বোধন করে বলা এই আয়াতে তাওহীদ ও সালাতের উদ্দেশ্য—আল্লাহর স্মরণ—স্পষ্ট করা হয়েছে।",
    en: "Addressed to Musa (AS), this verse makes clear tawhid and the purpose of prayer: the remembrance of Allah.",
  },
};

const Q_20_114: Reference = {
  id: "q-20-114",
  kind: "quran",
  ar: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
  text: {
    bn: "আর বলুন, ‘হে আমার প্রতিপালক! আমার জ্ঞান বৃদ্ধি করে দিন।’",
    en: "And say, “My Lord, increase me in knowledge.”",
  },
  cite: { bn: "সূরা ত্বহা ২০:১১৪", en: "Surah Ta-Ha 20:114" },
  explanation: {
    bn: "জ্ঞান বৃদ্ধির জন্য দুআ করা নবী ﷺ-কে দেওয়া নির্দেশ; এতে বোঝা যায় জ্ঞানার্জন নিরন্তর প্রক্রিয়া।",
    en: "Asking for increase in knowledge is a command given to the Prophet ﷺ, showing that seeking knowledge is a lifelong process.",
  },
};

const Q_13_28: Reference = {
  id: "q-13-28",
  kind: "quran",
  ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  text: {
    bn: "জেনে রাখো, আল্লাহর স্মরণেই অন্তরসমূহ প্রশান্তি লাভ করে।",
    en: "Unquestionably, by the remembrance of Allah hearts are assured.",
  },
  cite: { bn: "সূরা আর-রাদ ১৩:২৮", en: "Surah Ar-Ra‘d 13:28" },
  explanation: {
    bn: "মানসিক প্রশান্তির প্রকৃত উৎস আল্লাহর জিকির—যা তিলাওয়াত, তাসবীহ ও দুআ সবকিছুকে অন্তর্ভুক্ত করে।",
    en: "The true source of inner peace is the remembrance of Allah, which includes recitation, tasbih and supplication.",
  },
};

const Q_112: Reference = {
  id: "q-112-1-2",
  kind: "quran",
  ar: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ",
  text: {
    bn: "বলুন, তিনিই আল্লাহ, এক ও অদ্বিতীয়। আল্লাহ অমুখাপেক্ষী।",
    en: "Say, “He is Allah, [who is] One, Allah, the Eternal Refuge.”",
  },
  cite: { bn: "সূরা আল-ইখলাস ১১২:১-২", en: "Surah Al-Ikhlas 112:1-2" },
  explanation: {
    bn: "আল্লাহর একত্ব ও পূর্ণ অমুখাপেক্ষিতার সংক্ষিপ্ত ঘোষণা। সূরা ইখলাসের বিস্তারিত তাফসীর কোরআন বিভাগে দেখুন।",
    en: "A concise declaration of Allah’s oneness and complete self-sufficiency. See the Quran section for the full tafsir of Al-Ikhlas.",
  },
};

export interface Topic {
  id: string;
  keywords: string[];
  refs: Reference[];
}

export const TOPICS: Topic[] = [
  { id: "patience", keywords: ["patience", "patient", "sabr", "sabar", "hardship", "সবর", "সবুর", "ধৈর্য", "বিপদ"], refs: [Q_2_153, B_1469] },
  { id: "parents", keywords: ["parent", "mother", "father", "mom", "dad", "মা", "বাবা", "পিতা", "মাতা", "মা-বাবা", "পিতা-মাতা"], refs: [Q_17_23, B_5971] },
  { id: "prayer", keywords: ["prayer", "pray", "salah", "salat", "namaz", "নামাজ", "নামায", "সালাত", "সালাহ"], refs: [Q_20_14, hadithRef("bukhari-631")] },
  { id: "knowledge", keywords: ["knowledge", "learn", "study", "ilm", "education", "জ্ঞান", "ইলম", "শিক্ষা", "পড়াশোনা"], refs: [Q_20_114, hadithRef("bukhari-5027")] },
  { id: "intention", keywords: ["intention", "niyyah", "niyat", "sincere", "ikhlas", "নিয়ত", "নিয়্যত", "ইখলাস"], refs: [hadithRef("bukhari-1")] },
  { id: "brotherhood", keywords: ["brother", "kindness", "neighbor", "neighbour", "love", "manners", "character", "ভাই", "ভালোবাসা", "প্রতিবেশী", "আচরণ", "চরিত্র", "আখলাক"], refs: [hadithRef("bukhari-13"), hadithRef("bukhari-10")] },
  { id: "tawhid", keywords: ["tawhid", "tawheed", "oneness", "who is allah", "allah", "তাওহীদ", "আল্লাহ", "একত্ববাদ"], refs: [Q_112] },
  { id: "dhikr", keywords: ["dhikr", "zikr", "remembrance", "peace", "anxiety", "calm", "stress", "জিকির", "যিকির", "শান্তি", "প্রশান্তি", "দুশ্চিন্তা"], refs: [Q_13_28, hadithRef("bukhari-6406")] },
  { id: "purity", keywords: ["clean", "purity", "wudu", "ablution", "hygiene", "পবিত্র", "অজু", "ওযু", "পরিচ্ছন্ন"], refs: [hadithRef("muslim-223")] },
];

/** Topics that are modern / finance / technology — the assistant must abstain */
export const MODERN_KEYWORDS = [
  "crypto", "bitcoin", "ethereum", "nft", "forex", "stock", "share market", "insurance", "trading", "blockchain", "loan", "mortgage",
  "ক্রিপ্টো", "বিটকয়েন", "শেয়ার", "ফরেক্স", "বীমা", "ইনস্যুরেন্স", "ব্লকচেইন", "লোন", "ট্রেডিং",
];

/* ------------------------------------------------------------------ */
/*  Reciters, prayers, goals, donation                                  */
/* ------------------------------------------------------------------ */

export const RECITERS: Reciter[] = [
  { id: "alafasy", name: { bn: "মিশারি রাশিদ আল-আফাসি", en: "Mishary Rashid Alafasy" }, folder: "Alafasy_128kbps" },
  { id: "husary", name: { bn: "মাহমুদ খলিল আল-হুসারি", en: "Mahmoud Khalil Al-Husary" }, folder: "Husary_128kbps" },
  { id: "abdulbasit", name: { bn: "আব্দুল বাসিত আব্দুস সামাদ", en: "Abdul Basit Abdus-Samad" }, folder: "Abdul_Basit_Murattal_192kbps" },
];

export interface PrayerInfo {
  id: string;
  name: Bi;
  /** minutes after midnight — approximate timetable for Rangpur */
  minutes: number;
  label: string;
}

export const CITY: Bi = { bn: "রংপুর", en: "Rangpur" };

export const PRAYERS: PrayerInfo[] = [
  { id: "fajr", name: { bn: "ফজর", en: "Fajr" }, minutes: 4 * 60 + 35, label: "4:35 AM" },
  { id: "dhuhr", name: { bn: "যোহর", en: "Dhuhr" }, minutes: 11 * 60 + 55, label: "11:55 AM" },
  { id: "asr", name: { bn: "আসর", en: "Asr" }, minutes: 15 * 60 + 20, label: "3:20 PM" },
  { id: "maghrib", name: { bn: "মাগরিব", en: "Maghrib" }, minutes: 17 * 60 + 55, label: "5:55 PM" },
  { id: "isha", name: { bn: "ইশা", en: "Isha" }, minutes: 19 * 60 + 15, label: "7:15 PM" },
];

export const GOALS: { id: string; name: Bi }[] = [
  { id: "quran", name: { bn: "কোরআনের অন্তত ১ পৃষ্ঠা তিলাওয়াত", en: "Recite at least 1 page of Quran" } },
  { id: "adhkar", name: { bn: "সকাল-সন্ধ্যার জিকির", en: "Morning & evening adhkar" } },
  { id: "sunnah", name: { bn: "সুন্নাত / নফল নামাজ", en: "Sunnah / voluntary prayers" } },
  { id: "sadaqah", name: { bn: "সদকা বা কোনো দান", en: "Give sadaqah or any charity" } },
  { id: "istighfar", name: { bn: "ইস্তিগফার ও দুআ", en: "Istighfar & du‘a" } },
];

export const DHIKR_TARGET = 100;

/** Configure real payment details before production deploy */
export const DONATION_INFO = {
  bkash: "01700-000000",
  nagad: "01800-000000",
  note: { bn: "‘সেন্ড মানি’ করুন এবং রেফারেন্সে ‘Noor’ লিখুন।", en: "Use ‘Send Money’ and write ‘Noor’ as the reference." },
};
