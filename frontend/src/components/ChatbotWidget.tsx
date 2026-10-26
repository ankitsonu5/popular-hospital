"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  Calendar,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Minimize2,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import {
  askChatbotAi,
  createBooking,
  fetchBranches,
  fetchDoctors,
  fetchOpdSlots,
  fetchSpecialities,
} from "@/lib/api";
import type { Branch, Doctor, Speciality } from "@/lib/api";
import { formatTimeToAmPm } from "@/lib/time";

/* ───────────────────────── Constants ───────────────────────── */

const PHONES = [
  { label: "+91 78000 01895", href: "tel:+917800001895" },
  { label: "+91 78000 01896", href: "tel:+917800001896" },
];
const DOCTORS_URL = "https://www.popularhospital.in/doctors";
const DEFAULT_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
];

export type Lang = "hi" | "hinglish" | "en";

export function detectLang(text: string): Lang {
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  const hinglishWords =
    /\b(mujhe|mera|meri|mere|hai|hain|ho|hona|aati|aata|aate|aaye|karein|karo|karte|karna|karwana|karwa|chahiye|dard|bimari|ka|ke|ki|me|mein|se|ko|kya|aur|nahi|nhi|raha|rahi|rahe|batao|apne|sharir|shareer|badan|khashi|khasi|khansi|bukhar|pet|pait|dil|seene|seena|haddi|ghutne|ghutna|sir|sar|chakkar|dikhaye|dekho|doctor|dawai|kahan|namaste|shukriya|theek|thik|aaj|kal|parso|paas|suno|kripya|janab|bhai|bahut)\b/i;
  if (hinglishWords.test(text)) return "hinglish";
  return "en";
}

// Common aliases mapping words to core department match patterns
const ALIASES: Record<string, string> = {
  heart: "cardio",
  bone: "ortho",
  joint: "ortho",
  kidney: "nephro",
  stomach: "gastro",
  liver: "gastro",
  brain: "neuro",
  nerve: "neuro",
  child: "pediatric",
  kids: "pediatric",
  baby: "pediatric",
  skin: "dermat",
  eye: "ophthal",
  women: "gynae",
  pregnancy: "gynae",
  cancer: "onco",
  urine: "uro",
  lungs: "pulmo",
  chest: "cardio",
  teeth: "dental",
  ear: "ent",
  throat: "ent",
};

type Step =
  | "idle"
  | "name"
  | "name_confirm"
  | "phone"
  | "speciality"
  | "doctor"
  | "date"
  | "time"
  | "confirm";

interface Draft {
  name?: string;
  phone?: string;
  speciality?: Speciality;
  doctor?: Doctor;
  date?: string;
  time?: string;
}

interface Msg {
  id: number;
  role: "bot" | "user";
  text?: string;
  doctors?: Doctor[];
  doctorsPick?: boolean;
  chips?: string[];
  phones?: boolean;
  doctorsLink?: boolean;
  success?: boolean;
}

/* ───────────────────────── Helpers ───────────────────────── */

const doctorId = (d: Doctor) => d._id || d.id || "";
const specLabel = (s: Speciality) => s.department_display_name || s.name;

function specLabelLang(s: Speciality, lang: Lang): string {
  const n = s.name.toLowerCase();
  if (lang === "hi") {
    if (n.includes("cardio") && !n.includes("pediatric") && !n.includes("ctvs")) return "कार्डियोलॉजी (हृदय रोग)";
    if (n.includes("gastro")) return "गैस्ट्रोएंटरोलॉजी (पेट एवं लिवर)";
    if (n.includes("orthop")) return "ऑर्थोपेडिक्स (हड्डी एवं जोड़ रोग)";
    if (n.includes("gynaec") || n.includes("obstetric")) return "स्त्री एवं प्रसूति रोग (Gynecology)";
    if (n.includes("respiratory") || n.includes("pulmo")) return "श्वसन एवं फेफड़ा रोग (Respiratory)";
    if (n.includes("pediatric") && !n.includes("cardio") && !n.includes("surgery")) return "बाल रोग विशेषज्ञ (Pediatrics)";
    if (n.includes("general medicine") || n.includes("physician")) return "जनरल मेडिसिन / सामान्य चिकित्सक";
    if (n.includes("neurosurgery")) return "न्यूरोसर्जरी (मस्तिष्क एवं रीढ़ ऑपरेशन)";
    if (n.includes("neuro")) return "न्यूरोलॉजी (मस्तिष्क एवं नस रोग)";
    if (n.includes("ent")) return "ई.एन.टी (कान, नाक, गला)";
    if (n.includes("ophthal")) return "नेत्र रोग (आंख विशेषज्ञ)";
    if (n.includes("dental")) return "दंत चिकित्सा (दांत विभाग)";
    if (n.includes("dermat")) return "त्वचा रोग (स्किन विभाग)";
    if (n.includes("ivf") || n.includes("fertility")) return "आईवीएफ एवं निःसंतानता उपचार";
    if (n.includes("uro")) return "यूरोलॉजी (मूत्र एवं पथरी रोग)";
    if (n.includes("nephro")) return "नेफ्रोलॉजी (किडनी एवं डायलिसिस)";
    if (n.includes("onco")) return "ऑन्कोलॉजी (कैंसर विभाग)";
    if (n.includes("laparoscop") || n.includes("surgery")) return "लेप्रोस्कोपी एवं सामान्य सर्जरी";
    if (n.includes("burns") || n.includes("plastic")) return "बर्न एवं प्लास्टिक सर्जरी";
    if (n.includes("ctvs")) return "सी.टी.वी.एस (हार्ट बाईपास सर्जरी)";
    if (n.includes("diabetic foot")) return "डायबिटिक फुट यूनिट";
    if (n.includes("psychiatr")) return "मनोचिकित्सा (मानसिक स्वास्थ्य)";
    if (n.includes("pain")) return "दर्द निवारण (Pain Medicine)";
    if (n.includes("physiotherapy")) return "फिजियोथेरेपी विभाग";
    return s.department_display_name || s.name;
  }
  if (lang === "hinglish") {
    if (n.includes("cardio") && !n.includes("pediatric") && !n.includes("ctvs")) return "Cardiology (Dil / Heart)";
    if (n.includes("gastro")) return "Gastroenterology (Pet & Liver)";
    if (n.includes("orthop")) return "Orthopedics (Haddi & Joint)";
    if (n.includes("gynaec") || n.includes("obstetric")) return "Gynaecology (Mahila Rog / Delivery)";
    if (n.includes("respiratory") || n.includes("pulmo")) return "Respiratory Medicine (Khasi, Saans & Lungs)";
    if (n.includes("pediatric") && !n.includes("cardio") && !n.includes("surgery")) return "Pediatrics (Bachchon ke Doctor)";
    if (n.includes("general medicine") || n.includes("physician")) return "General Medicine (Checkup & General Doctor)";
    if (n.includes("neurosurgery")) return "Neurosurgery (Brain & Spine Operation)";
    if (n.includes("neuro")) return "Neurology (Dimag & Nas)";
    if (n.includes("ent")) return "ENT (Kaan, Naak, Gala)";
    if (n.includes("ophthal")) return "Ophthalmology (Aankh / Eye)";
    if (n.includes("dental")) return "Dental (Daant / Teeth)";
    if (n.includes("dermat")) return "Dermatology (Skin & Hair)";
    if (n.includes("ivf") || n.includes("fertility")) return "IVF & Fertility (Nisantanata)";
    if (n.includes("uro")) return "Urology (Peshab & Pathri)";
    if (n.includes("nephro")) return "Nephrology (Kidney)";
    if (n.includes("onco")) return "Oncology (Cancer)";
    if (n.includes("laparoscop") || n.includes("surgery")) return "Laparoscopy & Surgery";
    if (n.includes("burns") || n.includes("plastic")) return "Plastic Surgery";
    if (n.includes("ctvs")) return "CTVS (Heart Surgery)";
    if (n.includes("diabetic foot")) return "Diabetic Foot Unit";
    if (n.includes("psychiatr")) return "Psychiatry (Tension / Depression)";
    if (n.includes("pain")) return "Pain Medicine";
    if (n.includes("physiotherapy")) return "Physiotherapy";
    return s.department_display_name || s.name;
  }
  return s.department_display_name || s.name;
}

const isoDate = (d: Date) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};

function parseDate(input: string): string | null {
  const t = input.trim().toLowerCase();
  const now = new Date();
  if (t === "today" || t === "aaj" || t === "आज") return isoDate(now);
  if (t === "tomorrow" || t === "kal" || t === "कल") {
    now.setDate(now.getDate() + 1);
    return isoDate(now);
  }
  if (
    t === "day after tomorrow" ||
    t === "parso" ||
    t === "parson" ||
    t === "परसों"
  ) {
    now.setDate(now.getDate() + 2);
    return isoDate(now);
  }
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  let y: number, mo: number, d: number;
  if (m) {
    [y, mo, d] = [+m[1], +m[2], +m[3]];
  } else {
    m = t.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
    if (!m) return null;
    [d, mo, y] = [+m[1], +m[2], +m[3]];
  }
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d)
    return null;
  const iso = isoDate(dt);
  return iso < isoDate(new Date()) ? null : iso;
}

function parseTime(input: string): string | null {
  const m = input
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!m) return null;
  let h = +m[1];
  const min = m[2] ? +m[2] : 0;
  if (min > 59 || h > 23) return null;
  if (m[3] === "pm" && h < 12) h += 12;
  if (m[3] === "am" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

const isYes = (text: string) =>
  /^(yes|y|confirm|ok|yes, confirm|haan|ha|haan ji|haan, confirm karein|हाँ|हाँ, कन्फर्म करें|कन्फर्म|हां)$/i.test(
    text.trim(),
  );

const isCancel = (text: string) =>
  /^(cancel|stop|exit|radd|रद्द|रद्द करें)$/i.test(text.trim());

const RESTART_KEYWORDS_RE =
  /\b(start again|start over|restart|reset|shuru se|shuru karo|shuruat se|naye sire se|fir se|phir se|fir se do|phir se do|fir se kar do|phir se kar do|fir se shuru|phir se shuru|sab kuchh shuru|shuru se sab|dobaara|dobara|punah|clear chat|start fresh|fir se do sab kuchh|phir se do sab kuchh)\b/i;

const isRestart = (text: string) =>
  RESTART_KEYWORDS_RE.test(text) ||
  /^(start|reset|restart|clear|fir se|phir se|shuru se|dobara|dobaara)$/i.test(
    text.trim(),
  );

function cleanName(raw: string): string {
  let n = raw.trim();
  n = n
    .replace(/^(mr|mrs|ms|shri|shree|dr|doctor)\.?\s+/i, "")
    .replace(/\s+(ji|jee|sahab|saheb)$/i, "")
    .replace(/^(मेरा|श्री)\s+/, "")
    .replace(/\s+जी$/, "")
    .trim();
  n = n.replace(/[^a-zA-Z\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim();
  if (/^[a-zA-Z\s]+$/.test(n)) {
    n = n
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }
  return n;
}

function isValidName(n: string): boolean {
  if (n.length < 2 || n.length > 40) return false;
  const invalid =
    /^(hi|hello|hey|yes|no|ok|okay|please|kripya|hospital|doctor|help|madad|batao|karo|nahi|haan|appointment|online|booking|varanasi|patient|sick|bimar|ill|fine|good|thanks|shukriya|dhanyawad|pain|dard|fever|bukhar|cough|khasi|mere|meri|mera|aap|tum|kya|kaise|kahan|kyun|having|suffering|feeling|getting|facing|searching|taking|going|need|want|call|calling|hai|h|hu|hoon|hain|ho|tha|the|thi|है|हूँ|हु|हैं|हो|था|थी|थे)$/i;
  const words = n.split(/\s+/);
  if (words.length > 4) return false;
  for (const w of words) {
    if (invalid.test(w.toLowerCase())) return false;
  }
  return true;
}

function extractIntroName(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length > 100) return null;

  if (
    /^(?:i\s+am|i'm)\s+(?:having|suffering|feeling|getting|facing|sick|ill|in\s+pain|not\s+well|fine|good|okay)/i.test(
      trimmed,
    )
  ) {
    return null;
  }

  const patterns = [
    // ^[Name] mera naam hai / ^[Name] mera name hai
    /^([a-zA-Z\u0900-\u097F\s]+?)\s+(?:mera|meri)\s+naam\s+(?:hai|[.,!?;]|$)/i,
    // Devanagari: ^[Name] मेरा नाम है
    /^([\u0900-\u097F\s]+?)\s+मेरा\s+नाम\s+(?:है|[।.,!?;]|$)/,
    // mera/meri/apna naam/name ... hai/hu/hoon
    /(?:mera|meri|apna)\s+(?:poora\s+|pura\s+|full\s+)?(?:naam|name)\s+(?:hai\s+|h\s+)?([a-zA-Z\u0900-\u097F\s.]+?)(?:\s+hai|\s+h\b|\s+hu\b|\s+hoon\b|[.,!?;]|$)/i,
    // Devanagari: मेरा/मेरी/अपना नाम ... है
    /(?:मेरा|मेरी|अपना)\s+(?:पूरा\s+)?नाम\s+(?:है\s+)?([\u0900-\u097F\s.]+?)(?:\s+है|\s+हूँ|\s+हु|[।.,!?;]|$)/,
    // my name is / my name's / name is
    /(?:(?:my\s+(?:full\s+)?name\s+(?:is|'s))|(?:name\s+is))\s+([a-zA-Z\s.]+?)(?:\s+and\b|[.,!?;]|$)/i,
    // main ... hoon / mai ... hu
    /^(?:(?:namaste|hello|hi|hey)[,.\s]+)?(?:main|mai)\s+([a-zA-Z\s.]+?)\s+(?:hoon|hu|bol\s+raha\s+hoon|bol\s+rahi\s+hoon)(?:[.,!?;]|$)/i,
    // Devanagari: मैं ... हूँ
    /^(?:(?:नमस्ते|प्रणाम)[,.\s]+)?(?:मैं|मै)\s+([\u0900-\u097F\s.]+?)\s+(?:हूँ|हु)(?:[।.,!?;]|$)/,
    // I am ... / I'm ...
    /^(?:(?:hello|hi|hey)[,.\s]+)?(?:i\s+am|i'm)\s+([a-zA-Z\s.]+?)(?:[.,!?;]|$)/i,
    // naam: ... / name: ...
    /^(?:naam|name)\s*[:=-]\s*([a-zA-Z\u0900-\u097F\s.]+)$/i,
    // this is ...
    /^(?:(?:hello|hi|hey)[,.\s]+)?(?:this\s+is)\s+([a-zA-Z\s.]+?)(?:[.,!?;]|$)/i,
  ];

  for (const pat of patterns) {
    const m = trimmed.match(pat);
    if (m && m[1]) {
      const candidate = cleanName(m[1]);
      if (candidate && isValidName(candidate)) return candidate;
    }
  }
  return null;
}

const isNameConfirmYes = (text: string, currentName?: string): boolean => {
  const t = text.trim().toLowerCase();
  if (isYes(t)) return true;
  if (
    /^(haan|ha|haa|yes|yep|yup|sahi hai|theek hai|thik hai|yahi|yahi hai|confirm|bilkul|sure|ji haan|ji han|हाँ|हां|सही है|कन्फर्म|यही है)$/i.test(
      t,
    )
  )
    return true;
  if (
    t.startsWith("haan") ||
    t.startsWith("yes") ||
    t.startsWith("हाँ") ||
    t.startsWith("हां")
  )
    return true;
  if (
    currentName &&
    t.includes(currentName.toLowerCase()) &&
    (t.includes("haan") ||
      t.includes("yes") ||
      t.includes("confirm") ||
      t.includes("sahi") ||
      t.includes("हाँ"))
  )
    return true;
  return false;
};

const isNameConfirmNo = (text: string): boolean => {
  const t = text.trim().toLowerCase();
  if (
    /^(nahi|nhi|nah|no|na|nope|galat|wrong|change|badalna|badlo|dusra|doosra|nahi badalna|नहीं|गलत|बदलें|दूसरा)$/i.test(
      t,
    )
  )
    return true;
  if (t.startsWith("nahi") || t.startsWith("no") || t.startsWith("नहीं"))
    return true;
  if (
    t.includes("badal") ||
    t.includes("dusra") ||
    t.includes("different") ||
    t.includes("change")
  )
    return true;
  return false;
};

const isGreetingOnly = (text: string) =>
  /^(hi|hello|hey|namaste|नमस्ते|प्रणाम|हेलो|hlo|helo|hii|hiii|good morning|good afternoon|good evening|pranam)[!.,\s]*$/i.test(
    text.trim(),
  );

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\u0900-\u097F]+/g, " ")
    .trim();

function findSpeciality(
  text: string,
  list: Speciality[],
  exactOnly = false,
): Speciality | null {
  const t = ` ${norm(text)} `;

  // 1) Full department name mentioned in text — longest name wins
  let best: Speciality | null = null;
  let bestLen = 0;
  for (const s of list) {
    for (const label of [s.name, s.department_display_name || "", s.slug]) {
      const n = norm(label);
      if (n.length >= 2 && t.includes(` ${n} `) && n.length > bestLen) {
        best = s;
        bestLen = n.length;
      }
    }
  }
  if (best || exactOnly) return best;

  // 2) Keyword / alias match — prefer shortest name
  const words = t.split(" ").filter((w) => w.length >= 3);
  const hits: Speciality[] = [];
  for (const w of words) {
    const target = ALIASES[w];
    for (const s of list) {
      const hayWords = norm(
        `${s.name} ${s.slug} ${s.department_display_name || ""}`,
      ).split(" ");
      if (
        (target && hayWords.some((h) => h.startsWith(target))) ||
        hayWords.includes(w) ||
        (w.length >= 4 &&
          hayWords.some((h) => h.length >= 4 && h.startsWith(w.slice(0, 5))))
      )
        hits.push(s);
    }
    if (hits.length) break;
  }
  hits.sort((a, b) => a.name.length - b.name.length);
  return hits[0] || null;
}

/* ───────── Symptom → Department Knowledge Base (EN, HI, Hinglish) ───────── */

const SYMPTOM_MAP: { dept: RegExp; keywords: string[] }[] = [
  {
    dept: /^cardiology$/i,
    keywords: [
      "dil ", "dil ki", "dil me", "heart", "seene", "seena", "chest pain", "chest", "dhadkan", "palpitation", "blood pressure", " bp ", "hypertension", "cardiac", "cholesterol", "angina", "दिल", "हृदय", "सीने", "धड़कन",
      "heart pain", "heart problem", "heart disease", "heart attack", "heart failure", "heart blockage", "blocked artery", "heart valve", "valve problem", "high bp", "low bp", "bp high", "bp low", "chest tightness", "chest heaviness", "chest discomfort", "heart specialist", "cardiologist", "cardiology doctor", "ecg", "echo", "angiogram", "angiography", "angioplasty", "stent", "pacemaker", "heart ki bimari", "dil ki bimari", "dil me dard", "dil me jalan", "dil tez dhadakna", "dil ghabrana", "seene me dard", "seene me dabav", "seene me bharipan", "nas block", "dil ki nas", "dil ka valve", "हार्ट", "हार्ट अटैक", "दिल का दौरा", "दिल में दर्द", "दिल की बीमारी", "सीने में दर्द", "सीने में जकड़न", "दिल की धड़कन", "हृदय रोग", "हृदय विशेषज्ञ", "पेसमेकर", "एंजियोग्राफी", "एंजियोप्लास्टी"
    ],
  },
  {
    dept: /respiratory|pulmo/i,
    keywords: [
      "khansi", "khasi", "khashi", "cough", "coughing", "khashi aati", "khasi aati", "khansi aati", "khashi bahut", "khasi bahut", "khansi bahut", "saans", "sans", "breath", "breathing", "breathlessness", "asthma", "dama", "lungs", "phephde", "wheez", "tb ", "tuberculosis", "खांसी", "खंसी", "सांस", "दमा", "फेफड़े",
      "pulmonologist", "chest specialist", "lung specialist", "breathing problem", "difficulty breathing", "shortness of breath", "chronic cough", "dry cough", "wet cough", "cough with blood", "balgam", "phlegm", "chest congestion", "lung infection", "pneumonia", "bronchitis", "copd", "sleep apnea", "saans phoolna", "saans lene me dikkat", "raat me khansi", "balgam wali khansi", "balgam wali khasi", "balgam wali khashi", "sookhi khansi", "sookhi khasi", "sookhi khashi", "sukhi khasi", "sukhi khashi", "phephde me infection", "lungs me pani", "oxygen kam", "छाती में बलगम", "सांस फूलना", "सांस लेने में परेशानी", "फेफड़ों का संक्रमण", "निमोनिया", "ब्रोंकाइटिस", "टीबी", "लंबे समय की खांसी"
    ],
  },
  {
    dept: /gastro/i,
    keywords: [
      "pet ", "pet me", "pet ka", "pet dard", "pait", "stomach", "abdomen", "acidity", " gas ", "gas ki", "gas banna", "gas problem", "ulti", "vomit", "vomiting", "nausea", "loose motion", "dast", "diarrhea", "constipation", "kabj", "liver", "jaundice", "piliya", "indigestion", "apach", "digestion", "bhookh", "पेट", "उल्टी", "कब्ज", "दस्त", "पीलिया", "एसिडिटी", "गैस",
      "gastroenterologist", "gastro doctor", "digestive problem", "stomach pain", "abdominal pain", "heartburn", "acid reflux", "gerd", "bloating", "pet phoolna", "pet fulna", "pet me afara", "pet me marod", "pet me ainthan", "pet me jalan", "khana hazam nahi", "khana nahi pachna", "bhookh nahi lagna", "stool me blood", "pakhana me khoon", "piles", "bawasir", "endoscopy", "colonoscopy", "fatty liver", "liver cirrhosis", "gallstone", "gallstones", "पाचन", "अपच", "पेट फूलना", "पेट में जलन", "पेट में मरोड़", "खाना न पचना", "भूख न लगना", "मल में खून", "अल्सर", "फैटी लिवर", "बवासीर"
    ],
  },
  {
    dept: /general medicine|physician/i,
    keywords: [
      "sharir ka check up", "sharir ka checkup", "sharir ki jaanch", "sharir", "shareer", "body checkup", "body check up", "full body checkup", "full body check up", "health checkup", "check up karwana", "checkup karwana", "swasthya jaanch", "routine checkup", "master checkup", "संपूर्ण शरीर की जांच", "फुल बॉडी चेकअप", "शरीर की जांच", "चेकअप", "स्वास्थ्य जांच",
      "bukhar", "fever", "feverish", "tap ", "jukam", "cold", "sardi", "kamzori", "weakness", "body pain", "badan dard", "thakan", "tiredness", "diabetes", "sugar", "sugar badhna", "sugar kam", "thyroid", "infection", "viral fever", "dengue", "malaria", "typhoid", "general physician", "physician", "internal medicine", "general doctor", "anemia", "khoon ki kami", "hemoglobin kam", "vitamin d", "vitamin b12", "बुखार", "कमजोरी", "शुगर", "मधुमेह", "थायराइड", "खून की कमी", "वायरल बुखार", "डेंगू", "मलेरिया", "टाइफाइड", "शरीर में दर्द", "थकान"
    ],
  },
  {
    dept: /orthop/i,
    keywords: [
      "haddi", "bone", "joint", "jodo", "jodon", "ghutne", "ghutna", "knee", "knee pain", "back pain", "kamar", "kamar dard", "fracture", "shoulder", "kandha", "gathiya", "arthritis", "spine", "slip disc", "neck pain", "gardhan", "गठिया", "हड्डी", "घुटने", "कमर",
      "orthopedic doctor", "joint replacement", "knee replacement", "hip replacement", "bone pain", "broken bone", "ligament injury", "sports injury", "frozen shoulder", "cervical pain", "sciatica", "chalne me dikkat", "haddi toot gayi", "pair me dard", "ghutne me dard", "haddi me sujan", "जोड़ों में दर्द", "घुटने में दर्द", "कमर में दर्द", "कंधे में दर्द", "गर्दन में दर्द", "रीढ़ की हड्डी", "स्लिप डिस्क", "साइटिका", "घुटना बदलना"
    ],
  },
  {
    dept: /obstetric|gynae?co/i,
    keywords: [
      "bachhedani", "bachedani", "bacchedani", "bachchedani", "बच्चेदानी", "uterus", "garbhashay", "गर्भाशय", "mahila rog", "ladies doctor", "pregnan", "pregnancy", "garbh", "garbhwati", "period", "periods", "mahavari", "maasik", "delivery", "discharge", "pcod", "pcos", "gynae", "gynec", "breast", "गर्भ", "गर्भवती", "माहवारी", "पीरियड्स",
      "gynecologist", "womens health", "female doctor", "lady doctor", "normal delivery", "cesarean", "c section", "delivery pain", "irregular periods", "period pain", "white discharge", "safed pani", "vaginal itching", "ovarian cyst", "fibroid", "miscarriage", "bachhedani me ganth", "bachhedani me dard", "bachhedani me problem", "bachhedani me sujan", "bachhedani me dikkat", "yoni me khujli", "delivery karwani hai", "pregnancy doctor", "pregnant hu", "महिला रोग", "महिला डॉक्टर", "प्रसव", "सफेद पानी", "बच्चेदानी में गांठ", "बच्चेदानी में दर्द", "बच्चेदानी में समस्या"
    ],
  },
  {
    dept: /ivf|fertility/i,
    keywords: [
      "infertility", "fertility", "ivf", "conceive", "bachha nahi", "baby nahi", "bacha nahi", "sperm", "nisantan", "santan nahi", "trying for baby", "आईवीएफ", "बांझपन", "निःसंतान",
      "test tube baby", "iui", "icsi", "low sperm count", "santan prapti", "baccha paida nahi ho raha", "bachcha hone me dikkat", "garbh nahi thahar raha", "nisantan dampati", "टेस्ट ट्यूब बेबी", "गर्भधारण में समस्या", "शुक्राणु की कमी"
    ],
  },
  {
    dept: /^neurology$/i,
    keywords: [
      "sir dard", "sar dard", "headache", "migraine", "seizure", "chakkar", "vertigo", "paralysis", "lakwa", "numbness", "sunn", "memory", "brain", "nerve", "naso", "नस", "सिर दर्द", "चक्कर", "लकवा",
      "neurologist", "epilepsy", "mirgi", "fits", "tremor", "memory loss", "stroke", "brain stroke", "pair sunn hona", "haath sunn hona", "haath pair me jhanjhanahat", "yaadash kamzor", "mirgi ke daure", "sar ghoomna", "dimag ki nas", "न्यूरोलॉजिस्ट", "मस्तिष्क रोग", "मिर्गी", "दौरे पड़ना", "हाथ पैर सुन्न", "ब्रेन स्ट्रोक"
    ],
  },
  {
    dept: /neurosurgery/i,
    keywords: [
      "neurosurgery", "neurosurgeon", "brain surgery", "brain tumor", "brain operation", "head injury", "spine surgery", "sir me chot", "dimag ka operation", "brain ka operation", "sar ki chot", "brain me ganth", "दिमाग का ऑपरेशन", "मस्तिष्क की सर्जरी", "रीढ़ की सर्जरी", "सिर में चोट", "ब्रेन ट्यूमर"
    ],
  },
  {
    dept: /nephro/i,
    keywords: [
      "kidney", "gurda", "gurde", "creatinine", "dialysis", "किडनी", "गुर्दा", "डायलिसिस",
      "nephrologist", "kidney specialist", "kidney failure", "ckd", "high creatinine", "dialysis center", "peshab kam aana", "gurde fail", "gurde me sujan", "किडनी फेल", "गुर्दे की बीमारी", "क्रिएटिनिन बढ़ना"
    ],
  },
  {
    dept: /^urology$/i,
    keywords: [
      "urine", "peshab", "prostate", "pathri", "stone", "urinary", "uti", "पेशाब", "पथरी", "प्रोस्टेट",
      "urologist", "urine infection", "burning urination", "peshab me jalan", "peshab me khoon", "bar bar peshab", "peshab rukna", "kidney stone", "prostate badhna", "pathri ka dard", "मूत्र रोग", "पेशाब में जलन", "पेशाब में खून", "किडनी की पथरी"
    ],
  },
  {
    dept: /^ent$/i,
    keywords: [
      "kaan", "ear ", "naak", "nose", "gala", "throat", "tonsil", "sinus", "sunai", "कान", "नाक", "गला",
      "ent specialist", "ear pain", "ear discharge", "hearing loss", "deafness", "tinnitus", "sinusitis", "nasal blockage", "nose bleeding", "sore throat", "kaan me dard", "kaan behna", "sunai kam dena", "naak band", "naak se khoon", "gale me dard", "gale me kharash", "awaz baithna", "tonsil badhna", "नाक बंद", "कान में दर्द", "गले में दर्द", "गले में खराश", "टॉन्सिल", "साइनस"
    ],
  },
  {
    dept: /ophthal/i,
    keywords: [
      "aankh", "aankhon", "ankh", "eye", "vision", "dikhai", "motiya", "cataract", "आंख", "आँख", "मोतिया", "नजर",
      "ophthalmologist", "eye specialist", "eye doctor", "eye pain", "red eyes", "watery eyes", "blurred vision", "poor eyesight", "glaucoma", "motiyabind", "aankhon me jalan", "aankhon me pani", "dhundhla dikhna", "nazar kamzor", "chashma", "धुंधला दिखना", "आंखों में जलन", "मोतियाबिंद", "आंख लाल होना"
    ],
  },
  {
    dept: /dental/i,
    keywords: [
      "daant", "dant", "teeth", "tooth", "gums", "masude", "दांत", "दाँत", "मसूड़े",
      "dentist", "toothache", "tooth pain", "cavity", "keeda", "root canal", "rct", "wisdom tooth", "bleeding gums", "daant me dard", "daant me keeda", "masude se khoon", "daant hilna", "akal daadh", "daant nikalwana", "मसूड़ों से खून", "दांत में कीड़ा", "दांतों का डॉक्टर"
    ],
  },
  {
    dept: /dermat/i,
    keywords: [
      "skin", "twacha", "rash", "daane", "pimple", "acne", "khujli", "itching", "hair fall", "baal jhad", "allergy", "त्वचा", "खुजली", "बाल झड़ना",
      "dermatologist", "skin specialist", "skin doctor", "eczema", "psoriasis", "fungal infection", "daad", "white patches", "vitiligo", "safed daag", "dandruff", "chehre par daane", "chehre par daag", "daad khaj khujli", "दाद", "खाज", "सफेद दाग", "त्वचा रोग विशेषज्ञ"
    ],
  },
  {
    dept: /pediatrics and neonatology|pediatrics/i,
    keywords: [
      "bachche", "bachcho", "bacche", "bachha", "child", "kid ", "kids", "infant", "newborn", "baby", "navjat", "बच्चे", "बच्चा", "नवजात",
      "pediatrician", "child specialist", "children doctor", "baby fever", "child cough", "vaccination", "tika", "bachche ko bukhar", "bachche ko khansi", "bacche ko ulti", "bacche ko dast", "bachche ka pet dard", "navjat shishu", "बच्चों का डॉक्टर", "बाल रोग विशेषज्ञ", "बच्चों का टीकाकरण"
    ],
  },
  {
    dept: /oncology/i,
    keywords: [
      "cancer", "tumor", "tumour", "gaanth", "ganth", "lump", "chemo", "कैंसर", "गांठ", "ट्यूमर",
      "oncologist", "cancer specialist", "cancer doctor", "chemotherapy", "biopsy", "breast cancer", "oral cancer", "mouth cancer", "ganth badhna", "breast me ganth", "khoon ka cancer", "स्तन कैंसर", "खून का कैंसर", "मुंह का कैंसर", "कैंसर का इलाज"
    ],
  },
  {
    dept: /psychiatr/i,
    keywords: [
      "stress", "depress", "anxiety", "tension", "neend", "insomnia", "panic", "mental", "तनाव", "चिंता", "अवसाद",
      "psychiatrist", "mental health", "depression", "panic attack", "sleep problem", "overthinking", "ghabrahat", "man udaas", "neend nahi aati", "dimag me tension", "mansik pareshani", "घबराहट", "नींद न आना", "मानसिक स्वास्थ्य"
    ],
  },
  {
    dept: /ctvs|cardiothoracic|vascular surgery/i,
    keywords: [
      "ctvs", "cardiothoracic", "vascular surgery", "open heart surgery", "bypass surgery", "cabg", "coronary bypass", "varicose veins", "bypass karwana", "dil ka operation", "heart ka operation", "बाईपास सर्जरी", "हृदय का ऑपरेशन"
    ],
  },
  {
    dept: /laparoscop|general surgery/i,
    keywords: [
      "hernia", "appendix", "appendicitis", "gallbladder", "gall bladder", "pitt ki thaili", "piles", "bawasir", "fissure", "fistula", "operation", "surgery", "ऑपरेशन", "बवासीर", "हर्निया",
      "general surgeon", "laparoscopy", "doorbeen se operation", "appendix ka operation", "pathri ka operation", "pitt ki thaili ka operation", "हर्निया का ऑपरेशन", "दूरबीन से ऑपरेशन"
    ],
  },
  {
    dept: /burns|plastic/i,
    keywords: [
      "burn", "jal gaya", "plastic surgery", "cosmetic", "scar", "rhinoplasty", "chehre ki plastic surgery", "naak ki surgery", "जलना", "प्लास्टिक सर्जरी"
    ],
  },
  {
    dept: /diabetic foot/i,
    keywords: [
      "diabetic foot", "sugar ka ghaav", "foot ulcer", "diabetic wound", "sugar se pair me ghaav", "pair me ghaav", "डायबिटिक फुट", "पैर का घाव"
    ],
  },
  {
    dept: /dietetics|nutrition/i,
    keywords: [
      "diet", "weight loss", "motapa", "obesity", "vajan", "diet chart", "vajan ghatana", "vajan badhana", "patla hona", "मोटापा", "डाइट चार्ट", "वजन घटाना"
    ],
  },
  {
    dept: /pain medicine/i,
    keywords: [
      "pain medicine", "pain specialist", "chronic pain", "purana dard", "lambe samay se dard", "dard ka ilaj", "दर्द विशेषज्ञ", "पुराना दर्द"
    ],
  },
  {
    dept: /physiotherap/i,
    keywords: [
      "physiotherapy", "physiotherapist", "rehab", "exercise", "ghutne ki physiotherapy", "kamar ki physiotherapy", "lakwa ke baad exercise", "फिजियोथेरेपी", "कसरत"
    ],
  },
];

const EMERGENCY_RE =
  /heart attack|dil ka daura|saans (nahi|nhi|ruk)|can'?t breathe|cannot breathe|breathing (problem|difficulty)|behosh|unconscious|stroke|lakwa|paralys|zeher|poison|accident|bahut (zyada )?khoon|heavy bleeding|bleeding (nahi|nhi) ruk|severe chest|tez (seene|chest)|seizure|suicide|ambulance|emergency|हार्ट अटैक|बेहोश|एक्सीडेंट|एम्बुलेंस/i;

const isEmergency = (text: string) => EMERGENCY_RE.test(text);

function symptomSpec(text: string, list: Speciality[]): Speciality | null {
  const t = ` ${norm(text)} `;
  const scored = SYMPTOM_MAP.map((entry, idx) => ({
    entry,
    idx,
    score: entry.keywords.filter((k) => t.includes(norm(k))).length,
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.idx - b.idx);

  for (const { entry } of scored) {
    const s = list.find((x) => entry.dept.test(norm(x.name)));
    if (s) return s;
  }
  return null;
}

// 6 Featured departments for quick chips
const FEATURED_PATTERNS = [
  /^cardiology$/i,
  /gastro/i,
  /laparoscop|general surgery/i,
  /obstetric|gynae?co/i,
  /orthop/i,
  /ivf|fertility/i,
];

function featuredSpecs(list: Speciality[]): Speciality[] {
  const out: Speciality[] = [];
  for (const p of FEATURED_PATTERNS) {
    const s = list.find((x) => p.test(norm(x.name)));
    if (s && !out.includes(s)) out.push(s);
  }
  return out.length ? out : list.slice(0, 6);
}

/* ───────────────────────── Multilingual UI Strings ───────────────────────── */

const STRINGS = {
  greeting: {
    en: "👋 Hello! Welcome to Popular Hospital. How can I help you today?",
    hinglish: "👋 Namaste! Popular Hospital me aapka swagat hai. Main aapki kya madad kar sakta hoon?",
    hi: "👋 नमस्ते! पॉपुलर हॉस्पिटल में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूँ?",
  },
  nameGreeting: {
    en: (name: string) =>
      `👋 Hello ${name}! Welcome to Popular Hospital.\n\nHow can I help you today? You can choose an option below or describe what you need:`,
    hinglish: (name: string) =>
      `👋 Namaste ${name} ji! Popular Hospital me aapka swagat hai.\n\nMain aaj aapki kaise sahayata ya madad kar sakta hoon? Aap niche diye gaye options me se chun sakte hain ya apna sawal likh sakte hain:`,
    hi: (name: string) =>
      `👋 नमस्ते ${name} जी! पॉपुलर हॉस्पिटल में आपका स्वागत है।\n\nआज मैं आपकी किस प्रकार सहायता कर सकता हूँ? आप नीचे दिए गए विकल्पों में से चुन सकते हैं या अपनी समस्या / सवाल लिख सकते हैं:`,
  },
  nameConfirmPrompt: {
    en: (name: string) =>
      `Sure! Let's book your appointment.\n\n👤 Patient Name: **${name}**\n\nPlease confirm if this is your name:`,
    hinglish: (name: string) =>
      `Zaroor! Aaiye aapki appointment book karte hain.\n\n👤 Patient Name: **${name}**\n\nKripya confirm karein, kya yahi aapka naam hai?`,
    hi: (name: string) =>
      `ज़रूर! आइए आपकी अपॉइंटमेंट बुक करते हैं।\n\n👤 मरीज का नाम: **${name}**\n\nकृपया पुष्टि करें, क्या यही आपका नाम है?`,
  },
  nameConfirmEnteredPrompt: {
    en: (name: string) =>
      `Your name is **${name}**.\n\nPlease confirm if this name is correct for your appointment:`,
    hinglish: (name: string) =>
      `Aapka naam **${name}** hai.\n\nKripya confirm karein ki kya yahi naam sahi hai?`,
    hi: (name: string) =>
      `आपका नाम **${name}** है।\n\nकृपया पुष्टि करें कि क्या यही नाम सही है?`,
  },
  nameConfirmYesChip: {
    en: (name: string) => `Yes, confirm ${name}`,
    hinglish: (name: string) => `Haan, ${name} confirm karein`,
    hi: (name: string) => `हाँ, ${name} कन्फर्म करें`,
  },
  nameConfirmNoChip: {
    en: "Enter different name",
    hinglish: "Nahi, dusra naam likhein",
    hi: "नहीं, दूसरा नाम लिखें",
  },
  askNewName: {
    en: "Understood. Please enter the patient's full name:",
    hinglish: "Theek hai. Kripya patient ka poora naam batayein:",
    hi: "ठीक है। कृपया मरीज का पूरा नाम दर्ज करें:",
  },
  emergencyAlert: {
    en: "⚠️ This may be a medical emergency. Please call our hospital emergency helpline immediately or visit our 24x7 Casualty department:",
    hinglish: "⚠️ Yeh emergency (aapaat sthiti) ho sakti hai. Kripya turant hamare hospital emergency helpline par call karein ya 24x7 Casualty aayein:",
    hi: "⚠️ यह एक आपातकालीन स्थिति (Emergency) हो सकती है। कृपया तुरंत हमारे हॉस्पिटल हेल्पलाइन पर कॉल करें या आपातकालीन विभाग (Casualty) आएं:",
  },
  symptomAdvice: {
    en: (dept: string) =>
      `Based on what you described, I suggest consulting our ${dept} department.\n\n(Note: This is guidance, not a medical diagnosis. Please consult a doctor for proper treatment.)\n\nWould you like to book an appointment?`,
    hinglish: (dept: string) =>
      `Aapke bataye lakshano ke hisab se, hum aapko hamare ${dept} department ke doctor se consult karne ka sujhav dete hain.\n\n(Kripya dhyan dein: Yeh keval ek guide hai, medical diagnosis nahi. Sahi salah ke liye doctor se milein.)\n\nKya aap appointment book karna chahte hain?`,
    hi: (dept: string) =>
      `आपके बताए लक्षणों के अनुसार, हम आपको हमारे ${dept} विभाग के विशेषज्ञ डॉक्टर से परामर्श लेने का सुझाव देते हैं।\n\n(कृपया ध्यान दें: यह केवल एक मार्गदर्शन है, चिकित्सकीय जांच नहीं। सही इलाज हेतु डॉक्टर से अवश्य मिलें।)\n\nक्या आप अपॉइंटमेंट बुक करना चाहते हैं?`,
  },
  fallback: {
    en: "I'm sorry, I couldn't fully understand your symptom or question. You can pick an option below or directly call our hospital helpline for assistance:",
    hinglish: "Maaf kijiye, main aapki bimari ya sawal ko poori tarah samajh nahi paaya. Aap niche diye gaye options me se chun sakte hain ya direct hospital helpline par call kar sakte hain:",
    hi: "क्षमा करें, मैं आपकी समस्या या प्रश्न को पूरी तरह समझ नहीं पाया। आप नीचे दिए गए विकल्पों में से चुन सकते हैं या सीधे हमारे हेल्पलाइन नंबर पर बात कर सकते हैं:",
  },
  findDoctorInfo: {
    en: "To see our complete doctors list, visit the link below. You can also type a department name (e.g. “cardiology doctors”):",
    hinglish: "Hamare sabhi doctors ki list dekhne ke liye niche diye link par jayein. Ya kisi department ka naam type karein (jaise “cardiology doctors”):",
    hi: "हमारे सभी डॉक्टरों की सूची देखने के लिए नीचे दिए लिंक पर जाएं। या किसी विभाग का नाम लिखें (जैसे “cardiology doctors”):",
  },
  askSpeciality: {
    en: "Which department do you need? Pick one below or type its name.",
    hinglish: "Aapko kis department ki zaroorat hai? Niche se chunein ya naam type karein.",
    hi: "आपको किस विभाग की आवश्यकता है? नीचे से चुनें या विभाग का नाम टाइप करें।",
  },
  pickDoctorPrompt: {
    en: (dept: string) => `Please choose a doctor from ${dept}:`,
    hinglish: (dept: string) => `Kripya ${dept} department ke doctor chunein:`,
    hi: (dept: string) => `कृपया ${dept} विभाग से डॉक्टर चुनें:`,
  },
  showDoctorsTitle: {
    en: (dept: string) => `Here are our ${dept} doctors:`,
    hinglish: (dept: string) => `Yeh rahe hamare ${dept} department ke doctors:`,
    hi: (dept: string) => `ये रहे हमारे ${dept} विभाग के डॉक्टर्स:`,
  },
  bookingStart: {
    en: (dept?: string) =>
      dept
        ? `Sure! Let's book your appointment for ${dept}. What is your full name?`
        : "Sure! Let's book your appointment. What is your full name?",
    hinglish: (dept?: string) =>
      dept
        ? `Zaroor! Aaiye aapki ${dept} ke liye appointment book karte hain. Aapka poora naam kya hai?`
        : "Zaroor! Aaiye aapki appointment book karte hain. Aapka poora naam kya hai?",
    hi: (dept?: string) =>
      dept
        ? `ज़रूर! आइए आपकी ${dept} विभाग के लिए अपॉइंटमेंट बुक करते हैं। आपका पूरा नाम क्या है?`
        : "ज़रूर! आइए आपकी अपॉइंटमेंट बुक करते हैं। आपका पूरा नाम क्या है?",
  },
  phonePrompt: {
    en: (name: string) => `Thanks ${name}! Please share your 10-digit mobile number.`,
    hinglish: (name: string) => `Shukriya ${name}! Kripya apna 10 digit ka mobile number batayein.`,
    hi: (name: string) => `धन्यवाद ${name}! कृपया अपना 10 अंकों का मोबाइल नंबर दर्ज करें।`,
  },
  datePrompt: {
    en: (doc: string) => `Great, ${doc}. Which date? (Pick below or type e.g. DD/MM/YYYY)`,
    hinglish: (doc: string) => `Bahut badhiya, ${doc}. Kis date ko appointment chahiye? (Niche se chunein ya DD/MM/YYYY likhein)`,
    hi: (doc: string) => `बहुत बढ़िया, ${doc}। किस तारीख को अपॉइंटमेंट चाहिए? (नीचे से चुनें या DD/MM/YYYY लिखें)`,
  },
  timePrompt: {
    en: "Choose a time slot (or type a time like 11:30 am):",
    hinglish: "Time slot chunein (ya time likhein jaise 11:30 am):",
    hi: "समय (Time slot) चुनें (या समय लिखें जैसे 11:30 AM):",
  },
  confirmPrompt: {
    en: (d: Draft, timeStr: string) =>
      `Please confirm your booking details:\n\n👤 Patient: ${d.name}\n📞 Phone: ${d.phone}\n🩺 Doctor: ${d.doctor?.name}\n📅 Date: ${d.date} at ${timeStr}\n\nWould you like to confirm this appointment?`,
    hinglish: (d: Draft, timeStr: string) =>
      `Kripya apni booking details check karke confirm karein:\n\n👤 Patient: ${d.name}\n📞 Phone: ${d.phone}\n🩺 Doctor: ${d.doctor?.name}\n📅 Date: ${d.date} samay ${timeStr}\n\nKya aap ise confirm karna chahte hain?`,
    hi: (d: Draft, timeStr: string) =>
      `कृपया बुकिंग विवरण की पुष्टि करें:\n\n👤 मरीज का नाम: ${d.name}\n📞 मोबाइल: ${d.phone}\n🩺 डॉक्टर: ${d.doctor?.name}\n📅 तारीख: ${d.date} समय ${timeStr}\n\nक्या आप इस अपॉइंटमेंट की पुष्टि करते हैं?`,
  },
  bookingSuccess: {
    en: (d: Draft, branchName: string, timeStr: string) =>
      `✅ Booking request received!\n\n👤 ${d.name}\n📞 ${d.phone}\n🩺 ${d.doctor?.name}\n🏥 ${branchName}\n📅 ${d.date} at ${timeStr}\n\nOur team has been notified and will call you on ${d.phone} to confirm your appointment. For urgent help, call ${PHONES[0].label}.`,
    hinglish: (d: Draft, branchName: string, timeStr: string) =>
      `✅ Appointment request prapt ho gayi hai!\n\n👤 ${d.name}\n📞 ${d.phone}\n🩺 ${d.doctor?.name}\n🏥 ${branchName}\n📅 ${d.date} samay ${timeStr}\n\nPopular Hospital team aapse ${d.phone} par call karke appointment confirm karegi. Emergency me ${PHONES[0].label} par call karein.`,
    hi: (d: Draft, branchName: string, timeStr: string) =>
      `✅ अपॉइंटमेंट रिक्वेस्ट प्राप्त हो गई है!\n\n👤 ${d.name}\n📞 ${d.phone}\n🩺 ${d.doctor?.name}\n🏥 ${branchName}\n📅 ${d.date} समय ${timeStr}\n\nपॉपुलर हॉस्पिटल की टीम आपके नंबर ${d.phone} पर कॉल करके अपॉइंटमेंट कन्फर्म करेगी। आपात स्थिति में ${PHONES[0].label} पर कॉल करें।`,
  },
  bookingFailed: {
    en: "Sorry, booking could not be completed right now. Please call our helpline directly:",
    hinglish: "Maaf kijiye, booking poori nahi ho saki. Kripya direct hamare helpline par call karein:",
    hi: "क्षमा करें, बुकिंग पूरी नहीं हो सकी। कृपया सीधे हमारे हेल्पलाइन नंबर पर कॉल करें:",
  },
  chips: {
    bookAppointment: {
      en: "Book Appointment",
      hinglish: "Appointment Book Karein",
      hi: "अपॉइंटमेंट बुक करें",
    },
    findDoctor: {
      en: "Find a Doctor",
      hinglish: "Doctor Khojein",
      hi: "डॉक्टर खोजें",
    },
    callUs: {
      en: "Call Us",
      hinglish: "Call Karein",
      hi: "कॉल करें",
    },
    viewAllDepts: {
      en: "View All Departments",
      hinglish: "Sabhi Department Dekhein",
      hi: "सभी विभाग देखें",
    },
    confirmYes: {
      en: "Yes, Confirm",
      hinglish: "Haan, Confirm Karein",
      hi: "हाँ, कन्फर्म करें",
    },
    cancel: {
      en: "Cancel",
      hinglish: "Cancel",
      hi: "रद्द करें",
    },
    dates: {
      today: { en: "Today", hinglish: "Aaj", hi: "आज" },
      tomorrow: { en: "Tomorrow", hinglish: "Kal", hi: "कल" },
      dayAfter: { en: "Day after tomorrow", hinglish: "Parso", hi: "परसों" },
    },
  },
};

/* ───────────────────────── Main Component ───────────────────────── */

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("idle");
  const [draft, setDraft] = useState<Draft>({});
  const [specs, setSpecs] = useState<Speciality[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [docsOfSpec, setDocsOfSpec] = useState<Doctor[]>([]);
  const [lang, setLang] = useState<Lang>("en");
  const [userName, setUserName] = useState<string>("");
  const idRef = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);
  const greeted = useRef(false);
  const lastSpecialityRef = useRef<Speciality | null>(null);

  const push = useCallback((m: Omit<Msg, "id">) => {
    setMessages((prev) => [...prev, { ...m, id: idRef.current++ }]);
  }, []);

  const botSay = useCallback(
    (m: Omit<Msg, "id" | "role">, delay = 450) => {
      setTyping(true);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setTyping(false);
          push({ role: "bot", ...m });
          resolve();
        }, delay);
      });
    },
    [push],
  );

  // Preload data + auto-open on page load
  useEffect(() => {
    fetchSpecialities().then(setSpecs);
    fetchBranches().then(setBranches);
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Broadcast chatbot open state so floating elements like BackToTop coordinate
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("chatbot:state", { detail: { open } }),
      );
    }
  }, [open]);

  // Greeting once opened
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      botSay({
        text: STRINGS.greeting.en,
        chips: [
          STRINGS.chips.findDoctor.en,
          STRINGS.chips.bookAppointment.en,
          STRINGS.chips.callUs.en,
        ],
      });
    }
  }, [open, botSay]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ── Flow actions ── */

  const getDeptChips = (currentLang: Lang) => [
    ...featuredSpecs(specs).map((s) => specLabelLang(s, currentLang)),
    STRINGS.chips.viewAllDepts[currentLang],
  ];

  const showDoctors = async (
    spec: Speciality,
    pick: boolean,
    currentLang: Lang = lang,
  ) => {
    lastSpecialityRef.current = spec;
    setTyping(true);
    const docs = await fetchDoctors({ speciality: spec.slug });
    setTyping(false);
    setDocsOfSpec(docs);
    const deptTitle = specLabelLang(spec, currentLang);
    if (!docs.length) {
      await botSay({
        text:
          currentLang === "hi"
            ? `क्षमा करें, अभी ${deptTitle} विभाग में कोई डॉक्टर उपलब्ध नहीं हैं। सहायता के लिए हमें कॉल करें:`
            : currentLang === "hinglish"
              ? `Maaf kijiye, abhi ${deptTitle} department me koi doctor available nahi hain. Call karein:`
              : `Sorry, I couldn't find doctors for ${deptTitle} right now. You can call us for help:`,
        phones: true,
      });
      return false;
    }
    await botSay({
      text: pick
        ? STRINGS.pickDoctorPrompt[currentLang](deptTitle)
        : STRINGS.showDoctorsTitle[currentLang](deptTitle),
      doctors: docs.slice(0, 6),
      doctorsPick: pick,
    });
    if (!pick) {
      await botSay(
        {
          text: STRINGS.findDoctorInfo[currentLang],
          doctorsLink: true,
          chips: [STRINGS.chips.bookAppointment[currentLang]],
        },
        250,
      );
    }
    return true;
  };

  const askSpeciality = async (currentLang: Lang = lang) => {
    setStep("speciality");
    await botSay({
      text: STRINGS.askSpeciality[currentLang],
      chips: getDeptChips(currentLang),
    });
  };

  const startBooking = async (
    spec?: Speciality | null,
    currentLang: Lang = lang,
  ) => {
    const target = spec || lastSpecialityRef.current;
    if (target) {
      lastSpecialityRef.current = target;
    }
    const label = target ? specLabelLang(target, currentLang) : undefined;
    const knownName = userName || draft.name;

    if (knownName) {
      setDraft((d) => ({
        ...d,
        speciality: target || d.speciality,
        name: knownName,
      }));
      setStep("name_confirm");
      await botSay({
        text: STRINGS.nameConfirmPrompt[currentLang](knownName),
        chips: [
          STRINGS.nameConfirmYesChip[currentLang](knownName),
          STRINGS.nameConfirmNoChip[currentLang],
        ],
      });
      return;
    }

    setDraft((d) => ({
      ...d,
      speciality: target || d.speciality,
    }));
    setStep("name");
    await botSay({
      text: STRINGS.bookingStart[currentLang](label),
    });
  };

  const showTimes = async (
    doc: Doctor,
    date: string,
    currentLang: Lang = lang,
  ) => {
    const branch = branches[0];
    let slots: string[] = [];
    if (branch) {
      const res = await fetchOpdSlots(doctorId(doc), branch._id, date);
      slots = res.slots || [];
    }
    if (!slots.length) slots = DEFAULT_SLOTS;
    setStep("time");
    await botSay({
      text: STRINGS.timePrompt[currentLang],
      chips: slots.slice(0, 8).map((s) => formatTimeToAmPm(s)),
    });
  };

  const confirmBooking = async (d: Draft, currentLang: Lang = lang) => {
    const branch = branches[0];
    if (!branch || !d.doctor) {
      await botSay({
        text: STRINGS.bookingFailed[currentLang],
        phones: true,
      });
      setStep("idle");
      return;
    }
    setTyping(true);
    try {
      await createBooking({
        patient_name: d.name!,
        patient_phone: d.phone!,
        doctor: doctorId(d.doctor),
        branch: branch._id,
        slot_date: d.date!,
        slot_time: d.time!,
        notes: "Booked via chatbot",
        source: "chatbot",
      });
      setTyping(false);
      await botSay({
        text: STRINGS.bookingSuccess[currentLang](
          d,
          branch.name,
          formatTimeToAmPm(d.time!),
        ),
        success: true,
        chips: [STRINGS.chips.findDoctor[currentLang]],
      });
    } catch {
      setTyping(false);
      await botSay({
        text: STRINGS.bookingFailed[currentLang],
        phones: true,
      });
    }
    setStep("idle");
    setDraft({});
  };

  const pickDoctor = async (doc: Doctor, currentLang: Lang = lang) => {
    push({ role: "user", text: doc.name });
    const next = { ...draft, doctor: doc };
    setDraft(next);
    setStep("date");
    await botSay({
      text: STRINGS.datePrompt[currentLang](doc.name),
      chips: [
        STRINGS.chips.dates.today[currentLang],
        STRINGS.chips.dates.tomorrow[currentLang],
        STRINGS.chips.dates.dayAfter[currentLang],
      ],
    });
  };

  /* ── Main Input Handler ── */

  const handleSend = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    push({ role: "user", text });

    // Detect language dynamically from user input
    const detected = detectLang(text);
    if (detected !== lang) {
      setLang(detected);
    }
    const currentLang = detected;
    const lower = text.toLowerCase();

    // Global restart / fresh start / greetings reset
    if (isRestart(text) || isGreetingOnly(text)) {
      setStep("idle");
      setDraft({});
      lastSpecialityRef.current = null;
      setDocsOfSpec([]);
      if (isRestart(text)) {
        setUserName("");
      }

      const resetGreeting = isRestart(text)
        ? currentLang === "hi"
          ? "🔄 चैट को शुरू से रीसेट कर दिया गया है।\n\n👋 नमस्ते! पॉपुलर हॉस्पिटल में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूँ?"
          : currentLang === "hinglish"
            ? "🔄 Chat ko shuru se reset kar diya gaya hai.\n\n👋 Namaste! Popular Hospital me aapka swagat hai. Main aapki kya madad kar sakta hoon?"
            : "🔄 Chat has been reset.\n\n👋 Hello! Welcome to Popular Hospital. How can I help you today?"
        : userName
          ? STRINGS.nameGreeting[currentLang](userName)
          : STRINGS.greeting[currentLang];

      await botSay({
        text: resetGreeting,
        chips: [
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
      return;
    }

    // Global cancel
    if (step !== "idle" && isCancel(text)) {
      setStep("idle");
      setDraft({});
      lastSpecialityRef.current = null;
      const cancelMsg =
        currentLang === "hi"
          ? "ठीक है, रद्द कर दिया गया। मैं आपकी और क्या मदद कर सकता हूँ?"
          : currentLang === "hinglish"
            ? "Theek hai, cancel kar diya gaya. Main aapki aur kya madad kar sakta hoon?"
            : "Okay, cancelled. How else can I help you?";
      await botSay({
        text: cancelMsg,
        chips: [
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.bookAppointment[currentLang],
        ],
      });
      return;
    }

    switch (step) {
      case "name": {
        const candidateName = extractIntroName(text) || cleanName(text);
        if (!candidateName || !isValidName(candidateName)) {
          const errName =
            currentLang === "hi"
              ? "कृपया एक वैध पूरा नाम दर्ज करें (उदा. दीपक कुमार)।"
              : currentLang === "hinglish"
                ? "Kripya ek valid poora naam batayein (jaise: Deepak Kumar)."
                : "Please enter a valid full name (e.g. Deepak Kumar).";
          return botSay({ text: errName });
        }

        setDraft((d) => ({ ...d, name: candidateName }));
        setUserName(candidateName);
        setStep("name_confirm");
        return botSay({
          text: STRINGS.nameConfirmEnteredPrompt[currentLang](candidateName),
          chips: [
            STRINGS.nameConfirmYesChip[currentLang](candidateName),
            STRINGS.nameConfirmNoChip[currentLang],
          ],
        });
      }

      case "name_confirm": {
        const activeName = draft.name || userName;

        // If user directly enters a 10-digit mobile number, they confirmed name AND gave phone
        const digits = text.replace(/[\s\-+]/g, "");
        if (/^\d{10,15}$/.test(digits)) {
          setDraft((d) => ({ ...d, phone: digits }));
          if (draft.speciality) {
            setStep("doctor");
            return showDoctors(draft.speciality, true, currentLang);
          }
          return askSpeciality(currentLang);
        }

        // Confirmed name
        if (isNameConfirmYes(text, activeName)) {
          setStep("phone");
          return botSay({
            text: STRINGS.phonePrompt[currentLang](activeName),
          });
        }

        // Wants to enter a different name
        if (isNameConfirmNo(text)) {
          setStep("name");
          setDraft((d) => ({ ...d, name: undefined }));
          return botSay({
            text: STRINGS.askNewName[currentLang],
          });
        }

        // What if user directly typed their actual new name?
        const newCandidate = extractIntroName(text) || cleanName(text);
        if (
          newCandidate &&
          isValidName(newCandidate) &&
          newCandidate.toLowerCase() !== activeName.toLowerCase()
        ) {
          setDraft((d) => ({ ...d, name: newCandidate }));
          setUserName(newCandidate);
          return botSay({
            text: STRINGS.nameConfirmEnteredPrompt[currentLang](newCandidate),
            chips: [
              STRINGS.nameConfirmYesChip[currentLang](newCandidate),
              STRINGS.nameConfirmNoChip[currentLang],
            ],
          });
        }

        // Reconfirm politely if unclear
        const reconfirmHelp =
          currentLang === "hi"
            ? `कृपया पुष्टि करें: क्या आपका नाम ${activeName} है?`
            : currentLang === "hinglish"
              ? `Kripya confirm karein: Kya aapka naam ${activeName} hai?`
              : `Please confirm: Is your name ${activeName}?`;
        return botSay({
          text: reconfirmHelp,
          chips: [
            STRINGS.nameConfirmYesChip[currentLang](activeName),
            STRINGS.nameConfirmNoChip[currentLang],
          ],
        });
      }

      case "phone": {
        const digits = text.replace(/[\s\-+]/g, "");
        if (!/^\d{10,15}$/.test(digits)) {
          const errPhone =
            currentLang === "hi"
              ? "कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।"
              : currentLang === "hinglish"
                ? "Kripya ek valid 10 digit ka mobile number batayein."
                : "Please enter a valid 10-digit mobile number.";
          return botSay({ text: errPhone });
        }
        setDraft((d) => ({ ...d, phone: digits }));
        if (draft.speciality) {
          setStep("doctor");
          return showDoctors(draft.speciality, true, currentLang);
        }
        return askSpeciality(currentLang);
      }

      case "speciality": {
        const spec =
          findSpeciality(text, specs, true) ||
          symptomSpec(text, specs) ||
          findSpeciality(text, specs);
        if (!spec) {
          const notFound =
            currentLang === "hi"
              ? "मुझे वह विभाग नहीं मिला। कृपया नीचे दिए गए विकल्पों में से चुनें:"
              : currentLang === "hinglish"
                ? "Mujhe woh department nahi mila. Kripya niche se chunein:"
                : "I couldn't find that department. Please pick one below:";
          return botSay({
            text: notFound,
            chips: getDeptChips(currentLang),
          });
        }
        setDraft((d) => ({ ...d, speciality: spec }));
        setStep("doctor");
        return showDoctors(spec, true, currentLang);
      }

      case "doctor": {
        const doc = docsOfSpec.find((d) =>
          d.name.toLowerCase().includes(lower),
        );
        if (doc) return pickDoctor(doc, currentLang);
        const tapDoc =
          currentLang === "hi"
            ? "कृपया जारी रखने के लिए ऊपर दिए गए किसी डॉक्टर पर टैप करें।"
            : currentLang === "hinglish"
              ? "Kripya aage badhne ke liye upar diye kisi doctor par tap karein."
              : "Please tap one of the doctors above to continue.";
        return botSay({ text: tapDoc });
      }

      case "date": {
        const date = parseDate(text);
        if (!date) {
          const errDate =
            currentLang === "hi"
              ? "कृपया आने वाली कोई तारीख (DD/MM/YYYY) लिखें, या आज / कल चुनें।"
              : currentLang === "hinglish"
                ? "Kripya aage ki koi date (DD/MM/YYYY) likhein, ya Aaj / Kal chunein."
                : "Please enter a valid future date (DD/MM/YYYY), or choose Today / Tomorrow.";
          return botSay({ text: errDate });
        }
        setDraft((d) => ({ ...d, date }));
        return showTimes(draft.doctor!, date, currentLang);
      }

      case "time": {
        const time =
          parseTime(text) ||
          DEFAULT_SLOTS.concat(["09:00", "13:00", "15:00", "17:00"]).find(
            (s) => formatTimeToAmPm(s).toLowerCase() === lower,
          ) ||
          null;
        if (!time) {
          const errTime =
            currentLang === "hi"
              ? "कृपया कोई मान्य समय चुनें या लिखें, जैसे 11:30 AM।"
              : currentLang === "hinglish"
                ? "Kripya valid time chunein ya likhein, jaise 11:30 am."
                : "Please enter a valid time, like 11:30 am.";
          return botSay({ text: errTime });
        }
        const next = { ...draft, time };
        setDraft(next);
        setStep("confirm");
        return botSay({
          text: STRINGS.confirmPrompt[currentLang](
            next,
            formatTimeToAmPm(time),
          ),
          chips: [
            STRINGS.chips.confirmYes[currentLang],
            STRINGS.chips.cancel[currentLang],
          ],
        });
      }

      case "confirm": {
        if (isYes(text)) return confirmBooking(draft, currentLang);
        const confirmHelp =
          currentLang === "hi"
            ? "पुष्टि करने के लिए 'हाँ, कन्फर्म करें' लिखें या रोकने के लिए 'रद्द करें' लिखें।"
            : currentLang === "hinglish"
              ? "Confirm karne ke liye 'Haan, Confirm Karein' likhein ya rokne ke liye 'Cancel' likhein."
              : "Type 'Yes' to confirm or 'Cancel' to stop.";
        return botSay({
          text: confirmHelp,
          chips: [
            STRINGS.chips.confirmYes[currentLang],
            STRINGS.chips.cancel[currentLang],
          ],
        });
      }
    }

    // ── Idle Step Intent Detection ──

    // 0. User introduction / Name detection (e.g. "mera naam deepak hai", "my name is deepak")
    const introName = extractIntroName(text);
    if (introName) {
      setUserName(introName);
      setDraft((d) => ({ ...d, name: introName }));

      // If user also expressed booking intent in the same sentence
      if (/book|appointment|slot|बुक|अपॉइंटमेंट/i.test(lower)) {
        const detectedSpec =
          findSpeciality(text, specs, true) ||
          symptomSpec(text, specs) ||
          findSpeciality(text, specs) ||
          lastSpecialityRef.current;
        return startBooking(detectedSpec, currentLang);
      }

      // If user also expressed symptoms in the same sentence
      const sym = symptomSpec(text, specs);
      if (sym) {
        lastSpecialityRef.current = sym;
        const deptTitle = specLabelLang(sym, currentLang);
        const advice = STRINGS.symptomAdvice[currentLang](deptTitle);
        const greetingPrefix =
          currentLang === "hi"
            ? `नमस्ते ${introName} जी!\n\n`
            : currentLang === "hinglish"
              ? `Namaste ${introName} ji!\n\n`
              : `Hello ${introName}!\n\n`;
        const bookChip =
          currentLang === "hi"
            ? `${deptTitle} में बुक करें`
            : currentLang === "hinglish"
              ? `${deptTitle} me Book Karein`
              : `Book ${deptTitle} Appointment`;
        return botSay({
          text: `${greetingPrefix}${advice}`,
          chips: [bookChip, `${deptTitle} Doctors`],
        });
      }

      // Pure name introduction or greeting with name
      return botSay({
        text: STRINGS.nameGreeting[currentLang](introName),
        chips: [
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.viewAllDepts[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    // 1. Emergency detection
    if (isEmergency(text)) {
      return botSay({
        text: STRINGS.emergencyAlert[currentLang],
        phones: true,
        chips: [STRINGS.chips.bookAppointment[currentLang]],
      });
    }

    // 2. Direct booking intent
    if (/book|appointment|slot|बुक|अपॉइंटमेंट/i.test(lower)) {
      const detectedSpec =
        findSpeciality(text, specs, true) ||
        symptomSpec(text, specs) ||
        findSpeciality(text, specs) ||
        lastSpecialityRef.current;
      return startBooking(detectedSpec, currentLang);
    }

    // 3. Call / Phone intent
    if (/call|phone|number|contact|helpline|कॉल|नंबर|फोन|संपर्क/i.test(lower)) {
      const callMsg =
        currentLang === "hi"
          ? "आप हमारे इन 24x7 हेल्पलाइन नंबरों पर सीधे संपर्क कर सकते हैं:"
          : currentLang === "hinglish"
            ? "Aap hamare in 24x7 helpline numbers par direct call kar sakte hain:"
            : "You can reach our 24x7 hospital helpline on:";
      return botSay({ text: callMsg, phones: true });
    }

    // 4. Exact department name match
    const exact = findSpeciality(text, specs, true);
    if (exact) {
      lastSpecialityRef.current = exact;
      return showDoctors(exact, false, currentLang);
    }

    // 5. Symptom match
    const sym = symptomSpec(text, specs);
    if (sym) {
      lastSpecialityRef.current = sym;
      const deptTitle = specLabelLang(sym, currentLang);
      const bookChip =
        currentLang === "hi"
          ? `${deptTitle} में बुक करें`
          : currentLang === "hinglish"
            ? `${deptTitle} me Book Karein`
            : `Book ${deptTitle} Appointment`;
      const docsChip =
        currentLang === "hi"
          ? `${deptTitle} डॉक्टर्स`
          : currentLang === "hinglish"
            ? `${deptTitle} Doctors`
            : `${deptTitle} Doctors`;

      return botSay({
        text: STRINGS.symptomAdvice[currentLang](deptTitle),
        chips: [bookChip, docsChip],
      });
    }

    // 6. Generic doctor search intent
    if (/doctor|specialist|dr\b|find|physician|डॉक्टर|दिखाना/i.test(lower)) {
      return botSay({
        text: STRINGS.findDoctorInfo[currentLang],
        doctorsLink: true,
        chips: [STRINGS.chips.bookAppointment[currentLang]],
      });
    }

    // 7. General greeting intent
    if (/^(hi|hello|hey|namaste|नमस्ते|प्रणाम|हेलो)\b/i.test(lower)) {
      return botSay({
        text: STRINGS.greeting[currentLang],
        chips: [
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    // 8. General fallback / Optional AI Triage Fallback
    // First try optional Gemini AI endpoint
    try {
      const aiRes = await askChatbotAi(text, currentLang, specs);
      if (aiRes && aiRes.success) {
        if (aiRes.isEmergency) {
          return botSay({
            text: STRINGS.emergencyAlert[currentLang],
            phones: true,
            chips: [STRINGS.chips.bookAppointment[currentLang]],
          });
        }
        if (aiRes.departmentSlug) {
          const matchedAiSpec = specs.find(
            (s) =>
              s.slug === aiRes.departmentSlug ||
              norm(s.name) === norm(aiRes.departmentName || ""),
          );
          if (matchedAiSpec) {
            lastSpecialityRef.current = matchedAiSpec;
            const deptTitle = specLabelLang(matchedAiSpec, currentLang);
            const bookChip =
              currentLang === "hi"
                ? `${deptTitle} में बुक करें`
                : currentLang === "hinglish"
                  ? `${deptTitle} me Book Karein`
                  : `Book ${deptTitle} Appointment`;
            return botSay({
              text: `${aiRes.reply || STRINGS.symptomAdvice[currentLang](deptTitle)}`,
              chips: [bookChip, `${deptTitle} Doctors`],
            });
          }
        }
        if (aiRes.reply) {
          return botSay({
            text: aiRes.reply,
            chips: [
              STRINGS.chips.bookAppointment[currentLang],
              STRINGS.chips.findDoctor[currentLang],
              STRINGS.chips.callUs[currentLang],
            ],
          });
        }
      }
    } catch {
      // Graceful fallback below
    }

    // 9. Standard polite localized fallback with quick options
    return botSay({
      text: STRINGS.fallback[currentLang],
      phones: true,
      chips: [
        STRINGS.chips.bookAppointment[currentLang],
        STRINGS.chips.findDoctor[currentLang],
        STRINGS.chips.viewAllDepts[currentLang],
      ],
    });
  };

  /* ── Quick Chip Click Handler ── */

  const onChip = (c: string) => {
    // 1. View all departments
    if (
      c === STRINGS.chips.viewAllDepts.en ||
      c === STRINGS.chips.viewAllDepts.hinglish ||
      c === STRINGS.chips.viewAllDepts.hi
    ) {
      push({ role: "user", text: c });
      const deptListPrompt =
        lang === "hi"
          ? `हमारे सभी ${specs.length} विभाग नीचे दिए गए हैं। अपॉइंटमेंट हेतु किसी एक पर टैप करें:`
          : lang === "hinglish"
            ? `Hamare sabhi ${specs.length} departments niche diye gaye hain. Appointment ke liye kisi ek par tap karein:`
            : `Here are all our ${specs.length} hospital departments. Tap one to book an appointment:`;
      botSay({
        text: deptListPrompt,
        chips: specs.map((s) => specLabelLang(s, lang)),
      });
      return;
    }

    // 2. Find a doctor
    if (
      c === STRINGS.chips.findDoctor.en ||
      c === STRINGS.chips.findDoctor.hinglish ||
      c === STRINGS.chips.findDoctor.hi
    ) {
      push({ role: "user", text: c });
      botSay({
        text: STRINGS.findDoctorInfo[lang],
        doctorsLink: true,
        chips: [STRINGS.chips.bookAppointment[lang]],
      });
      return;
    }

    // 3. Call us
    if (
      c === STRINGS.chips.callUs.en ||
      c === STRINGS.chips.callUs.hinglish ||
      c === STRINGS.chips.callUs.hi
    ) {
      push({ role: "user", text: c });
      const callPrompt =
        lang === "hi"
          ? "आप सीधे हमारे 24x7 हेल्पलाइन नंबरों पर संपर्क कर सकते हैं:"
          : lang === "hinglish"
            ? "Aap direct hamare in 24x7 helpline numbers par call kar sakte hain:"
            : "You can call our 24x7 hospital helpline directly on:";
      botSay({ text: callPrompt, phones: true });
      return;
    }

    // 4. Booking confirmations
    if (
      c === STRINGS.chips.confirmYes.en ||
      c === STRINGS.chips.confirmYes.hinglish ||
      c === STRINGS.chips.confirmYes.hi
    ) {
      return handleSend("yes");
    }

    if (
      c === STRINGS.chips.cancel.en ||
      c === STRINGS.chips.cancel.hinglish ||
      c === STRINGS.chips.cancel.hi
    ) {
      return handleSend("cancel");
    }

    // 5. Date quick chips
    if (
      c === STRINGS.chips.dates.today.en ||
      c === STRINGS.chips.dates.today.hinglish ||
      c === STRINGS.chips.dates.today.hi
    ) {
      return handleSend("today");
    }
    if (
      c === STRINGS.chips.dates.tomorrow.en ||
      c === STRINGS.chips.dates.tomorrow.hinglish ||
      c === STRINGS.chips.dates.tomorrow.hi
    ) {
      return handleSend("tomorrow");
    }
    if (
      c === STRINGS.chips.dates.dayAfter.en ||
      c === STRINGS.chips.dates.dayAfter.hinglish ||
      c === STRINGS.chips.dates.dayAfter.hi
    ) {
      return handleSend("day after tomorrow");
    }

    // 6. Direct Book Appointment chip
    if (
      c === STRINGS.chips.bookAppointment.en ||
      c === STRINGS.chips.bookAppointment.hinglish ||
      c === STRINGS.chips.bookAppointment.hi
    ) {
      push({ role: "user", text: c });
      return startBooking(lastSpecialityRef.current, lang);
    }

    // 7. Symptom suggestion book chips (e.g. "Cardiology me Book Karein")
    if (c.includes("Book") || c.includes("बुक") || c.includes("book")) {
      const matched =
        findSpeciality(c, specs, true) ||
        symptomSpec(c, specs) ||
        findSpeciality(c, specs);
      push({ role: "user", text: c });
      return startBooking(matched, lang);
    }

    // 8. Department Doctors view chips (e.g. "Cardiology Doctors")
    if (c.includes("Doctors") || c.includes("डॉक्टर्स")) {
      const matched =
        findSpeciality(c, specs, true) ||
        symptomSpec(c, specs) ||
        findSpeciality(c, specs);
      push({ role: "user", text: c });
      if (matched) return showDoctors(matched, false, lang);
    }

    handleSend(c);
  };

  /* ───────────────────────── Render ───────────────────────── */

  const lastBotId = [...messages].reverse().find((m) => m.role === "bot")?.id;

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-[88px] right-4 z-[9998] flex w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 md:bottom-24 md:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
        style={{ height: "min(580px, calc(100vh - 8rem))" }}
        role="dialog"
        aria-label="Popular Hospital smart chat assistant"
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#0b1c43] to-[#1d3a7a] px-4 py-3 text-white">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Bot className="h-5 w-5" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b1c43] bg-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="flex items-center gap-1 text-sm font-extrabold">
              Popular Assistant <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            </p>
            <p className="text-[11px] text-white/75">
              Online • 24x7 Multi-lingual Assistant
            </p>
          </div>
          <button
            id="chatbot-reset"
            onClick={() => handleSend("start again")}
            className="rounded-full p-1.5 transition hover:bg-white/15"
            title="Start Again / फिर से शुरू करें"
            aria-label="Start Again"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            id="chatbot-minimize"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 transition hover:bg-white/15"
            aria-label="Minimize chat"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[88%]">
                {m.text && (
                  <div
                    className={`whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "rounded-br-sm bg-[#E85222] text-white"
                        : m.success
                          ? "rounded-bl-sm border border-emerald-200 bg-emerald-50 text-emerald-900"
                          : "rounded-bl-sm bg-white text-slate-700"
                    }`}
                  >
                    {m.success && (
                      <CheckCircle className="mb-1 h-5 w-5 text-emerald-600" />
                    )}
                    {m.text}
                  </div>
                )}

                {/* Doctor Cards */}
                {m.doctors && (
                  <div className="mt-2 space-y-2">
                    {m.doctors.map((d) => (
                      <div
                        key={doctorId(d) || d.slug}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E85222]/10 text-[#E85222]">
                          <Stethoscope className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-bold text-[#0b1c43]">
                            {d.name}
                          </p>
                          <p className="truncate text-[11px] text-slate-500">
                            {d.qualification ||
                              d.speciality?.name ||
                              d.speciality_name}
                            {d.experience_years
                              ? ` • ${d.experience_years} yrs`
                              : ""}
                          </p>
                        </div>
                        {m.doctorsPick && step === "doctor" && m.id === lastBotId ? (
                          <button
                            onClick={() => pickDoctor(d, lang)}
                            className="rounded-lg bg-[#E85222] px-2.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#d1451a]"
                          >
                            {lang === "hi"
                              ? "चुनें"
                              : lang === "hinglish"
                                ? "Select"
                                : "Select"}
                          </button>
                        ) : (
                          !m.doctorsPick && (
                            <a
                              href={`/doctors/${d.slug}`}
                              className="text-[11px] font-bold text-[#E85222] hover:underline"
                            >
                              {lang === "hi"
                                ? "प्रोफाइल देखें"
                                : lang === "hinglish"
                                  ? "View Profile"
                                  : "View"}
                            </a>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* External Doctors Page Link */}
                {m.doctorsLink && (
                  <a
                    href={DOCTORS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 rounded-xl border border-[#E85222]/30 bg-white px-3 py-2 text-[12px] font-bold text-[#E85222] shadow-sm transition hover:bg-[#E85222] hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {DOCTORS_URL}
                  </a>
                )}

                {/* Direct Phone Call Buttons */}
                {m.phones && (
                  <div className="mt-2 space-y-2">
                    {PHONES.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-emerald-700"
                      >
                        <Phone className="h-4 w-4" />
                        {p.label}
                      </a>
                    ))}
                  </div>
                )}

                {/* Interactive Action Chips */}
                {m.chips && m.id === lastBotId && !typing && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.chips.map((c) => (
                      <button
                        key={c}
                        onClick={() => onChip(c)}
                        className="rounded-full border border-[#E85222]/40 bg-white px-3 py-1 text-[12px] font-semibold text-[#E85222] transition hover:bg-[#E85222] hover:text-white active:scale-95"
                      >
                        {(c.includes("Appointment") || c.includes("अपॉइंटमेंट")) && (
                          <Calendar className="mr-1 inline h-3 w-3" />
                        )}
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
        >
          <input
            id="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === "hi"
                ? "अपना प्रश्न या लक्षण यहाँ लिखें..."
                : lang === "hinglish"
                  ? "Apna sawal ya bimari yahan likhein..."
                  : "Type your symptom or message..."
            }
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-[13px] text-slate-800 outline-none transition focus:border-[#E85222] focus:bg-white"
          />
          <button
            id="chatbot-send"
            type="submit"
            disabled={!input.trim() || typing}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E85222] text-white transition hover:bg-[#d1451a] disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Floating Toggle Icon with Always-Online Pulsing Green Dot */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-[72px] right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E85222] to-[#ff7a45] text-white shadow-xl transition hover:scale-110 md:bottom-6 md:right-6"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#E85222]/40" />
        )}
        {open ? (
          <X className="relative h-6 w-6" />
        ) : (
          <MessageCircle className="relative h-6 w-6" />
        )}
        <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        </span>
      </button>
    </>
  );
}
