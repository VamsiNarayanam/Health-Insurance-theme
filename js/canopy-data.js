const CANOPY = {
  brand: "Stackly Canopy",
  legal: "Stackly Canopy Health Insurance Co. Ltd.",
  tagline: "Cover you can stand under.",
  irdai: "142",
  cin: "U66010MH2019PLC382441",
  phone: "+91 22 6241 4400",
  whatsapp: "+91 98200 44112",
  email: "cover@stacklycanopy.com",
  claimsEmail: "claims@stacklycanopy.com",
  hq: "14 Canopy House, Bandra Kurla Complex, Mumbai 400051",
  hours: "Mon–Sat 8:00–20:00 IST",
  csr: { value: 96.4, year: "FY 2024–25" },
  preauth: 47,
  network: 14800,
  cities: 412,
  liveCanopies: 210000,
  grievance: "Ananya Rao, Grievance Officer",
};

const PRODUCTS = [
  { id: "kin", name: "Canopy Kin", seal: "K", icon: "icon-kin", lane: "Household floater", line: "Family floater for 2–6 members, 100% restoration.", from: "from ₹18,420/year + GST", si: "₹10L", wait: "30-day initial · 2-year PED", img: "images/ecard-hand.webp", href: "404.html" },
  { id: "solo", name: "Canopy Solo", seal: "S", icon: "icon-solo", lane: "A single branch", line: "Individual cover, portable, NCB up to 50%.", from: "from ₹9,860/year + GST", si: "₹15L", wait: "30-day initial · 2-year PED", img: "images/house-parlour.webp", href: "404.html" },
  { id: "crest", name: "Canopy Crest", seal: "C", icon: "icon-crest", lane: "Super top-up", line: "Sits on any base policy. Not a cheap 50L shortcut.", from: "from ₹4,190/year + GST", si: "₹50L", wait: "Follows the base waits", img: "images/story-crest.webp", href: "404.html" },
  { id: "elder", name: "Canopy Elder", seal: "E", icon: "icon-elder", lane: "Entry 61–80", line: "Two-year PED wait, named on the e-card.", from: "from ₹32,400/year + GST", si: "₹10L", wait: "2-year PED printed", img: "images/story-elder.webp", href: "404.html" },
  { id: "bloom", name: "Canopy Bloom", seal: "B", icon: "icon-bloom", lane: "Maternity rider", line: "Attach only to Kin. Twenty-four month wait, named.", from: "from ₹6,750/year + GST", si: "₹1.5L sub-limit", wait: "24-month wait", img: "images/journal-waiting.webp", href: "404.html" },
  { id: "pulse", name: "Canopy Pulse", seal: "P", icon: "icon-pulse", lane: "OPD wallet", line: "Diagnostics and consults. This will not settle a ward bill.", from: "from ₹3,240/year + GST", si: "₹25,000", wait: "15-day wait on listed tests", img: "images/house-rain.webp", href: "404.html" },
  { id: "forge", name: "Canopy Forge", seal: "F", icon: "icon-forge", lane: "Lump sum", line: "Fifteen listed critical illnesses. Survival period 30 days.", from: "from ₹7,980/year + GST", si: "₹25L", wait: "90-day initial on listed CI", img: "images/house-seal.webp", href: "404.html" },
  { id: "guild", name: "Canopy Guild", seal: "G", icon: "icon-guild", lane: "Seven lives and up", line: "Group / SME with a named TPA desk. Quote only.", from: "Quote · underwriting applies", si: "Custom", wait: "Negotiated, never silent", img: "images/story-guild.webp", href: "404.html" },
];

const CERTIFICATES = [
  { seal: "K", name: "Canopy Kin", si: "₹10L floater", wait: "30-day initial wait · 24-mo maternity if Bloom added", net: "Cashless in 14,800 network hospitals", price: "from ₹18,420 + GST", fact: "100% restoration" },
  { seal: "S", name: "Canopy Solo", si: "₹15L individual", wait: "30-day initial · 2-yr PED", net: "Portable with NCB up to 50%", price: "from ₹9,860 + GST", fact: "No-claim bonus 50% max" },
  { seal: "C", name: "Canopy Crest", si: "₹50L super top-up", wait: "Follows base policy waits", net: "Pays after deductible of ₹5L / ₹10L", price: "from ₹4,190 + GST", fact: "Not a base policy" },
  { seal: "E", name: "Canopy Elder", si: "₹10L", wait: "2-year PED wait printed on the card", net: "Cashless + reimbursement", price: "from ₹32,400 + GST", fact: "Entry 61–80" },
  { seal: "B", name: "Canopy Bloom", si: "₹1.5L maternity sub-limit", wait: "24-month wait, named, no silent clause", net: "Network labour rooms listed at issue", price: "from ₹6,750 + GST", fact: "Newborn 90-day cover" },
  { seal: "P", name: "Canopy Pulse", si: "₹25,000 OPD wallet", wait: "None on listed diagnostics after 15 days", net: "Reimbursement at empaneled labs", price: "from ₹3,240 + GST", fact: "Not inpatient cover" },
];

const RAIN_TICKS = [
  "Pune · Ruby Hall · pre-auth 31m · ₹1.84L",
  "Kochi · Aster · day-care · ₹22,400",
  "Jaipur · Fortis · discharge pack 4h",
  "Bengaluru · Manipal · pre-auth 41m · ₹3.12L",
  "Chennai · Apollo · reimbursement filed · ₹86,000",
  "Hyderabad · Yashoda · ICU pre-auth 52m · ₹6.4L",
  "Mumbai · Hinduja · day-care cataract · ₹38,900",
  "Kolkata · AMRI · queried, T+2h · ₹1.1L",
  "Delhi · Max Saket · cashless approved 29m · ₹2.05L",
  "Surat · Kiran · Guild desk · ₹74,500",
];

const ROOTS = {
  Mumbai: { count: 1860, hospital: "P.D. Hinduja, Mahim", img: "images/root-pune.webp", note: "Cashless desks till 20:00 IST." },
  Pune: { count: 940, hospital: "Ruby Hall Clinic, Sassoon Road", img: "images/root-pune.webp", note: "Day-care listed for 42 procedures." },
  Bengaluru: { count: 1280, hospital: "Manipal Hospital, Old Airport Road", img: "images/root-kochi.webp", note: "Pre-auth median 44 minutes." },
  Chennai: { count: 870, hospital: "Apollo Hospitals, Greams Road", img: "images/root-jaipur.webp", note: "AYUSH day-care on Kin/Solo." },
  Hyderabad: { count: 760, hospital: "Yashoda, Secunderabad", img: "images/story-crest.webp", note: "ICU packs routed to Rain desk." },
  Delhi: { count: 1540, hospital: "Max Super Speciality, Saket", img: "images/contact-bkc.webp", note: "NCR cashless, not ‘everywhere’." },
  Kolkata: { count: 610, hospital: "AMRI, Dhakuria", img: "images/root-kochi.webp", note: "Reimbursement TAT 7 working days." },
  Kochi: { count: 420, hospital: "Aster Medcity, Cheranalloor", img: "images/root-kochi.webp", note: "Monsoon week surge desk." },
};

const ARTICLES = [
  { id: 1, title: "The 24 months nobody prints on the ad", lane: "Bloom", time: "12 min", href: "blog.html#essay" },
  { id: 2, title: "Room-rent caps in 800-word English", lane: "Waiting periods", time: "8 min", href: "blog.html#room-rent" },
  { id: 3, title: "How pre-auth actually fails at 11pm", lane: "Cashless", time: "9 min", href: "blog.html#preauth-night" },
  { id: 4, title: "Porting a floater without losing NCB", lane: "Portability", time: "10 min", href: "blog.html#port-ncb" },
  { id: 5, title: "AYUSH: what the clause really pays", lane: "Cashless", time: "7 min", href: "blog.html#ayush" },
  { id: 6, title: "Why super top-up is not a base policy", lane: "Waiting periods", time: "6 min", href: "blog.html#crest-not-base" },
  { id: 7, title: "GST on health premium, with a worked ₹ example", lane: "GST & premium", time: "8 min", href: "blog.html#gst" },
  { id: 8, title: "Day-care list: 12 procedures people still file as inpatient", lane: "Cashless", time: "11 min", href: "blog.html#daycare" },
  { id: 9, title: "Seven lives, then a named TPA", lane: "Guild", time: "9 min", href: "blog.html#guild-tpa" },
  { id: 10, title: "What restoration restores — and what it doesn’t", lane: "Waiting periods", time: "8 min", href: "blog.html#restoration" },
  { id: 11, title: "The two-year PED wait we print on the e-card", lane: "Elder", time: "10 min", href: "blog.html#elder-ped" },
  { id: 12, title: "Grace if you miss a premium", lane: "Waiting periods", time: "7 min", href: "blog.html#grace" },
];

const POLICIES = [
  { no: "CAN-KIN-88421", product: "Kin", holder: "Meera Iyer", si: "₹10L", city: "Mumbai", status: "Sealed" },
  { no: "CAN-SOL-11092", product: "Solo", holder: "Arjun Nair", si: "₹15L", city: "Kochi", status: "Sealed" },
  { no: "CAN-CRE-55201", product: "Crest", holder: "Leela Menon", si: "₹50L", city: "Hyderabad", status: "Queried" },
  { no: "CAN-ELD-33018", product: "Elder", holder: "S. Krishnan", si: "₹10L", city: "Chennai", status: "Sealed" },
  { no: "CAN-BLM-77410", product: "Bloom", holder: "Riya Shah", si: "Rider", city: "Pune", status: "Waiting" },
  { no: "CAN-PUL-22655", product: "Pulse", holder: "Meera Iyer", si: "₹25k", city: "Mumbai", status: "Sealed" },
  { no: "CAN-FOR-91844", product: "Forge", holder: "Kabir Seth", si: "₹25L", city: "Delhi", status: "Sealed" },
  { no: "CAN-GLD-44100", product: "Guild", holder: "Mehta Weaves LLP", si: "₹5L×42", city: "Surat", status: "Sealed" },
];

const CLAIMS = [
  { id: "RN-24011", holder: "Meera Iyer", city: "Pune", stage: "reimbursed", amount: "₹48,200", note: "Dengue cashless, Ruby Hall" },
  { id: "RN-24088", holder: "Leela Menon", city: "Hyderabad", stage: "pre-auth", amount: "₹6,40,000", note: "ICU pack, Yashoda" },
  { id: "RN-24102", holder: "Arjun Nair", city: "Kochi", stage: "approved", amount: "₹22,400", note: "Day-care, Aster" },
  { id: "RN-24119", holder: "S. Krishnan", city: "Chennai", stage: "queried", amount: "₹1,10,000", note: "PED documents" },
  { id: "RN-24130", holder: "Riya Shah", city: "Pune", stage: "intimated", amount: "—", note: "Labour — Bloom wait running" },
  { id: "RN-24144", holder: "Kabir Seth", city: "Delhi", stage: "declined", amount: "₹18,000", note: "Dental, not on Pulse" },
  { id: "RN-24151", holder: "Mehta Weaves", city: "Surat", stage: "approved", amount: "₹74,500", note: "Guild TPA desk" },
  { id: "RN-24160", holder: "Farah Qureshi", city: "Jaipur", stage: "pre-auth", amount: "₹1,84,000", note: "Fortis discharge pending" },
];

const HOSPITALS = [
  { name: "Ruby Hall Clinic", city: "Pune", cashless: true, spec: "Multi-speciality" },
  { name: "Aster Medcity", city: "Kochi", cashless: true, spec: "Tertiary" },
  { name: "Fortis Escorts", city: "Jaipur", cashless: true, spec: "Cardiac / general" },
  { name: "Manipal Hospital", city: "Bengaluru", cashless: true, spec: "Multi-speciality" },
  { name: "Yashoda", city: "Hyderabad", cashless: true, spec: "ICU / oncology" },
  { name: "Max Saket", city: "Delhi", cashless: true, spec: "Tertiary" },
  { name: "AMRI Dhakuria", city: "Kolkata", cashless: true, spec: "General" },
  { name: "Hinduja Mahim", city: "Mumbai", cashless: true, spec: "Tertiary" },
];

const PREAUTHS = [
  { hospital: "Yashoda, Hyderabad", procedure: "ICU admission", amount: "₹6,40,000", age: "38 min" },
  { hospital: "Fortis, Jaipur", procedure: "Laparoscopic chole", amount: "₹1,84,000", age: "12 min" },
  { hospital: "Max Saket, Delhi", procedure: "Angioplasty", amount: "₹3,10,000", age: "51 min" },
  { hospital: "Ruby Hall, Pune", procedure: "Dengue ward", amount: "₹62,000", age: "9 min" },
];

const LEDGER = [
  { date: "12 Aug 2026", policy: "CAN-KIN-88421", premium: "₹18,420", gst: "₹3,315", total: "₹21,735" },
  { date: "11 Aug 2026", policy: "CAN-GLD-44100", premium: "₹2,14,000", gst: "₹38,520", total: "₹2,52,520" },
  { date: "09 Aug 2026", policy: "CAN-SOL-11092", premium: "₹9,860", gst: "₹1,775", total: "₹11,635" },
  { date: "08 Aug 2026", policy: "CAN-ELD-33018", premium: "₹32,400", gst: "₹5,832", total: "₹38,232" },
  { date: "07 Aug 2026", policy: "CAN-FOR-91844", premium: "₹7,980", gst: "₹1,436", total: "₹9,416" },
  { date: "05 Aug 2026", policy: "CAN-PUL-22655", premium: "₹3,240", gst: "₹583", total: "₹3,823" },
];

const AGENTS = [
  { name: "Niharika Bose", city: "Kolkata", live: 186 },
  { name: "Vikram Patel", city: "Surat", live: 412 },
  { name: "Amrita Kulkarni", city: "Pune", live: 268 },
  { name: "Joseph Mathew", city: "Kochi", live: 94 },
  { name: "Sahil Bhatia", city: "Delhi", live: 331 },
];

const DEMO = {
  policyholder: { name: "Meera Iyer", email: "meera@kin.canopy", password: "canopy1", role: "policyholder", policy: "CAN-KIN-88421", city: "Mumbai" },
  underwriter: { name: "Rohan Deshpande", email: "desk@stacklycanopy.com", password: "canopy1", role: "underwriter", desk: "Claims Desk BKC", city: "Mumbai" },
};
