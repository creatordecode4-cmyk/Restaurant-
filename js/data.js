/* =====================================================================
   KASHI THAAL — SAARA CONTENT YAHAN HAI
   Naam, number, address, menu, prices, reviews, links: sab kuch sirf is
   file mein badlo. Baaki files (index.html, css, app.js) ko chhune ki
   zaroorat nahi.
   [PLACEHOLDER] likha ho to woh asli detail se badalna hai.
   ===================================================================== */

window.SITE = {
  /* ---------- Restaurant ---------- */
  name: "Kashi Thaal",                       // restaurant ka naam
  nameHindi: "काशी थाल",
  tagline: "Banarasi thali, Lanka, Varanasi",
  since: "[PLACEHOLDER: 2015]",              // [PLACEHOLDER] saal
  currency: "₹",

  /* ---------- Contact ---------- */
  phoneDisplay: "+91 00000 00000",           // [PLACEHOLDER] screen pe dikhne wala number
  phoneTel: "+910000000000",                 // [PLACEHOLDER] bina space, country code ke saath
  whatsappNumber: "910000000000",            // [PLACEHOLDER] country code ke saath, bina + ya space
  whatsappMessage: "Namaste Kashi Thaal! Mujhe order karna hai.",
  instagramUrl: "https://instagram.com/kashithaal",   // [PLACEHOLDER]
  instagramHandle: "@kashithaal",                     // [PLACEHOLDER]
  url: "https://example.com/",               // [PLACEHOLDER] site ka asli address (SEO ke liye)

  /* ---------- Address & Timings ---------- */
  addressLines: [
    "[PLACEHOLDER] D 24/12, Lanka Road",
    "Near BHU Singh Dwar, Lanka",
    "Varanasi, Uttar Pradesh 221005"
  ],
  addressOneLine: "D 24/12, Lanka Road, Near BHU Singh Dwar, Lanka, Varanasi, Uttar Pradesh 221005",
  street: "D 24/12, Lanka Road",
  locality: "Lanka, Varanasi",
  region: "Uttar Pradesh",
  postalCode: "221005",
  latitude: 25.2677,                         // [PLACEHOLDER] Lanka ke aas-paas
  longitude: 82.9913,
  openHour: 11,                              // 11 AM
  closeHour: 23,                             // 11 PM (24 ghante ka format)
  timingsText: "Roz, 11:00 AM – 11:00 PM",
  /* Google Maps embed ka link (Maps > Share > Embed a map > src="..." wala URL).
     Khali chhodo to map card dikhega jo seedha Google Maps kholta hai. */
  mapEmbedUrl: "",

  /* ---------- Hero ---------- */
  hero: {
    eyebrow: "Lanka, Varanasi",
    headline: "Kashi ka asli swaad",
    sub: "Pital ki thaal, desi ghee ki khushboo aur Banarasi rasoi ka poora pyaar.",
    ctaOrder: "WhatsApp pe order karo",
    ctaMenu: "Menu dekho",
    beats: [
      { title: "Pital ki thaal,", text: "chulhe ki aanch." },
      { title: "Har katori mein", text: "ek kahani." }
    ],
    scrollHint: "Scroll karo"
  },

  /* ---------- Our Story ---------- */
  story: {
    title: "Hamari kahani",
    lines: [
      "Kashi mein khana sirf pet bharne ka naam nahi, ye pooja ki tarah parosa jaata hai.",
      "Hamari rasoi mein masale ghar jaise pisten hain, aur dal-sabzi aanch par dheere-dheere pakti hai.",
      "Har thaal pital ki katoriyon mein sajti hai, jaise Lanka ki purani gali ke ghar mein parosi jaati thi."
    ],
    facts: [
      { big: "Pital", small: "ki thaal aur katori" },
      { big: "Desi ghee", small: "mein hi tadka" },
      { big: "Roz taza", small: "pisa hua masala" }
    ]
  },

  /* ---------- Signature Dishes ---------- */
  signature: {
    title: "Jo ek baar khaye, wahi yaad rakhe",
    items: [
      { name: "Kashi Thaal", price: 449, img: "assets/img/thali.webp", alt: "Pital ki thaal mein dal, paneer, chole, jeera rice, papad aur kheer",
        text: "Paanch katori, jeera rice, roti, papad aur meetha. Poora Kashi ek thaal mein." },
      { name: "Paneer Kashi Masala", price: 289, img: "assets/img/paneer.webp", alt: "Pital ki katori mein gadhi masale wala paneer",
        text: "Makkhan aur kaju ki gravy mein narm paneer, upar se hara dhania." },
      { name: "Dal Tadka, Ghee Wali", price: 189, img: "assets/img/dal.webp", alt: "Pili dal pe sabut laal mirch ka tadka",
        text: "Arhar-moong ki dal, desi ghee aur sabut laal mirch ka tadka." },
      { name: "Chole Banarasi", price: 199, img: "assets/img/chole.webp", alt: "Pital ki katori mein masaledar chole",
        text: "Dhimi aanch par pake chole, anardana aur adrak ki tezi ke saath." },
      { name: "Kesariya Kheer", price: 129, img: "assets/img/kheer.webp", alt: "Kesar aur pista wali malai kheer ki katori",
        text: "Dudh mein ghanti bhar pakayi kheer, kesar aur pista ke saath." }
    ]
  },

  /* ---------- Full Menu ----------
     veg: true = hara dot, false = laal dot. pick: true = "Chef's pick" tag */
  menuTitle: "Pura menu",
  menuNote: "Sabhi prices rupaye mein hain. Taxes alag se lag sakte hain.",
  menu: [
    { id: "thali", label: "Thali", items: [
      { name: "Kashi Thaal (Maharaja)", price: 449, veg: true, pick: true, desc: "5 katori, jeera rice, 3 roti, papad, salad aur meetha." },
      { name: "Banarasi Veg Thali", price: 349, veg: true, desc: "Dal, 2 sabzi, rice, 3 roti, papad aur raita." },
      { name: "Paneer Thali", price: 389, veg: true, desc: "Paneer sabzi, dal tadka, rice, roti, salad aur kheer." },
      { name: "Litti Chokha Thali", price: 299, veg: true, desc: "3 litti desi ghee mein, baingan chokha, dal aur chutney." },
      { name: "Mini Thali", price: 249, veg: true, desc: "Ek sabzi, dal, rice aur 2 roti. Akele ke liye bilkul sahi." },
      { name: "Jain Thali", price: 369, veg: true, desc: "Bina pyaz-lehsun, poori Banarasi swaad ke saath." }
    ]},
    { id: "sabzi", label: "Sabzi", items: [
      { name: "Dum Aloo Banarasi", price: 189, veg: true, pick: true, desc: "Chhote aloo, dahi aur saunf ke masale mein dum pe pake." },
      { name: "Paneer Kashi Masala", price: 289, veg: true, pick: true, desc: "Kaju-makkhan ki gravy mein narm paneer." },
      { name: "Chole Banarasi", price: 199, veg: true, desc: "Anardana aur adrak wale dhimi aanch ke chole." },
      { name: "Kaddu ki Sabzi", price: 149, veg: true, desc: "Mandir wali khatti-meethi kaddu ki sabzi." },
      { name: "Bharwan Baingan", price: 179, veg: true, desc: "Masale se bhare chhote baingan, sarson ke tel mein." },
      { name: "Gobhi Aloo Masala", price: 169, veg: true, desc: "Sookhi, jeera-haldi wali ghar jaisi sabzi." },
      { name: "Paneer Do Pyaza", price: 279, veg: true, desc: "Tawe pe bhune paneer aur pyaaz ke bade tukde." }
    ]},
    { id: "dal-rice", label: "Dal & Rice", items: [
      { name: "Dal Tadka, Ghee Wali", price: 189, veg: true, pick: true, desc: "Arhar-moong dal, desi ghee aur sabut laal mirch." },
      { name: "Dal Makhani", price: 219, veg: true, desc: "Raat bhar pakayi kali dal, makkhan aur malai ke saath." },
      { name: "Jeera Rice", price: 129, veg: true, desc: "Khushboodar basmati, bhune jeera aur ghee." },
      { name: "Veg Pulao", price: 169, veg: true, desc: "Mausmi sabziyon aur kali elaichi ka halka pulao." },
      { name: "Dal Khichdi", price: 179, veg: true, desc: "Ghee mein tarbatar khichdi, saath mein papad aur achar." },
      { name: "Dahi Raita", price: 79, veg: true, desc: "Taaza jamaya dahi, bhuna jeera aur boondi." }
    ]},
    { id: "roti", label: "Roti & Paratha", items: [
      { name: "Tawa Roti", price: 20, veg: true, desc: "Garam, ghee lagakar." },
      { name: "Tandoori Roti", price: 25, veg: true, desc: "Mitti ke tandoor mein senki hui." },
      { name: "Lachha Paratha", price: 55, veg: true, desc: "Parat-dar, khasta, makkhan ke saath." },
      { name: "Missi Roti", price: 45, veg: true, desc: "Besan, ajwain aur hari mirch wali." },
      { name: "Bedmi Puri (2 pc)", price: 99, veg: true, pick: true, desc: "Urad dal bhari puri, saath mein rasedar aloo sabzi." },
      { name: "Ghee Paratha", price: 65, veg: true, desc: "Moti, kurkuri aur poori ghee mein sekhi." }
    ]},
    { id: "meetha", label: "Meetha", items: [
      { name: "Kesariya Kheer", price: 129, veg: true, pick: true, desc: "Kesar, pista aur ghanti bhar pakaya dudh." },
      { name: "Malaiyo", price: 99, veg: true, desc: "Sardiyon ki Banaras ki jhagwali dudh ki malai, kesar ke saath. (Mausmi)" },
      { name: "Lavang Latika", price: 89, veg: true, desc: "Khoya bhari mithai, lavang se band, cheeni ki chashni mein." },
      { name: "Rabri", price: 119, veg: true, desc: "Dhimi aanch par parat-dar, thandi parosi jaati hai." },
      { name: "Moong Dal Halwa", price: 139, veg: true, desc: "Desi ghee mein bhuni moong dal ka garam halwa." },
      { name: "Gulab Jamun (2 pc)", price: 79, veg: true, desc: "Narm, garam aur chashni mein dooba." }
    ]},
    { id: "drinks", label: "Drinks", items: [
      { name: "Banarasi Thandai", price: 99, veg: true, pick: true, desc: "Badam, saunf, kali mirch aur gulab ki patti." },
      { name: "Kesar Lassi", price: 109, veg: true, desc: "Mitti ke kulhad mein, upar malai." },
      { name: "Meethi Lassi", price: 79, veg: true, desc: "Gaadhi, thandi aur meethi." },
      { name: "Chaas", price: 49, veg: true, desc: "Bhuna jeera aur pudina wali masala chaas." },
      { name: "Jaljeera", price: 59, veg: true, desc: "Khatta, teekha aur pet ke liye halka." },
      { name: "Kulhad Chai", price: 29, veg: true, desc: "Adrak-elaichi wali, mitti ke kulhad mein." }
    ]}
  ],

  /* ---------- Gallery ----------
     [PLACEHOLDER] Photos: assets/img/ mein apni photo daalo aur "img" ka naam badlo.
     Abhi video ke frames se bane crops lage hain. */
  galleryTitle: "Thaal, diye aur Kashi ki raunak",
  gallery: [
    { img: "assets/img/thali.webp", alt: "Kashi Thaal: pital ki thaal mein poora khana", size: "wide" },
    { img: "assets/img/lamp.webp", alt: "Diye ki lau aur pital ki thaal ka kinara", size: "tall" },
    { img: "assets/img/rice.webp", alt: "Jeera rice, papad aur salad", size: "tall" },
    { img: "assets/img/brocade.webp", alt: "Banarasi brocade kapde ke saath thaal", size: "tall" },
    { img: "assets/img/glass.webp", alt: "Pital ka gilaas", size: "tall" },
    { img: "assets/img/dal.webp", alt: "Dal tadka ki pital ki katori", size: "tall" }
  ],

  /* ---------- Reviews ----------
     [PLACEHOLDER] Ye namune hain. Asli reviews daalo, phir showSampleTag false kar do. */
  reviewsTitle: "Mehmaan kya kehte hain",
  showSampleTag: true,
  reviews: [
    { name: "Aarav M.", place: "BHU, Varanasi", stars: 5, text: "Thali mein har katori alag swaad ki thi. Dal pe ghee ka tadka seedha dil mein utra." },
    { name: "Priya S.", place: "Lucknow", stars: 5, text: "Banaras aaye the, ye jagah dhoondhte hue mili. Paneer aur kheer ka jawab nahi." },
    { name: "Rohit K.", place: "Sigra, Varanasi", stars: 5, text: "Bedmi puri aur kaddu ki sabzi ne subah ka maza bana diya. Seva bhi bahut badhiya." },
    { name: "Neha T.", place: "Delhi", stars: 4, text: "Pital ki thaal mein parosna alag hi feel deta hai. Thandai zaroor piyein." },
    { name: "Suresh P.", place: "Mumbai", stars: 5, text: "Ghar ke khane jaisa swaad, aur raunak Kashi jaisi. Dobara aayenge." }
  ],

  /* ---------- Visit us ---------- */
  visit: {
    title: "Aaiye, thaal laga di hai",
    callLabel: "Call karo",
    whatsappLabel: "WhatsApp",
    directionsLabel: "Raasta dekho",
    instagramLabel: "Instagram",
    mapCardTitle: "Google Maps pe kholo"
  },

  /* ---------- SEO ---------- */
  seo: {
    title: "Kashi Thaal | Banarasi Thali Restaurant, Lanka, Varanasi",
    description: "Kashi Thaal, Lanka (Varanasi) ka Banarasi thali restaurant. Pital ki thaal, desi ghee ki dal-sabzi, litti chokha aur malaiyo. Roz 11 AM se 11 PM. WhatsApp pe order karein.",
    ogImage: "assets/hero.webp",
    cuisine: ["Banarasi", "North Indian", "Indian"],
    priceRange: "₹₹"
  }
};
