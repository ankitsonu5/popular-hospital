"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bot,
  Calendar,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  MessageSquarePlus,
  Mic,
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
const AMBULANCE_PHONE = {
  label: "+91-9519999280",
  href: "tel:+919519999280",
};
const EMERGENCY_CONTACTS = [
  { label: "+91-7800001895", href: "tel:+917800001895" },
  { label: "+91-7800001896", href: "tel:+917800001896" },
];
const APPOINTMENT_CONFIRMATION_PHONES = [
  { label: "+91-7800001895", href: "tel:+917800001895" },
  { label: "+91-7800001896", href: "tel:+917800001896" },
];
const DOCTORS_URL = "https://www.popularhospital.in/doctors";
const HOSPITAL_MAP_URL = "https://maps.app.goo.gl/8KVyxNdETY219tRD6";
const DEFAULT_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
];

export type Lang = "hi" | "hinglish" | "en";

type PopularHospitalIntent = "about" | "location";

const POPULAR_HOSPITAL_REFERENCE_RE =
  /(?:\b(?:popular|populer|poplar)\s+hospitals?\b|(?:पॉपुलर|पापुलर)\s+(?:हॉस्पिटल|अस्पताल))/i;

function detectPopularHospitalIntent(
  input: string,
): PopularHospitalIntent | null {
  const text = input.trim().toLowerCase().replace(/\s+/g, " ");
  if (!POPULAR_HOSPITAL_REFERENCE_RE.test(text)) return null;

  const isLocationQuery =
    /\b(?:where|location|located|address|directions?|route|map|reach|kaha|kahan|kahaan|kidhar|pata|kaise\s+(?:jaye|jaaye|pahuche|pahunche|pahunch))\b/i.test(
      text,
    ) ||
    /(?:कहाँ|कहां|किधर|पता|स्थान|लोकेशन|कैसे\s*(?:पहुंच|पहुँच|जाए))/.test(
      input,
    );

  if (isLocationQuery) return "location";

  const isAboutQuery =
    /\b(?:what\s+is|what's|about|tell\s+me|information|info|details?|overview|describe|know\s+about|kya\s+(?:hai|h|he)|kaisa|kaisi|ke\s+baa?re|batao|bataiye|jaankari|jankari|parichay)\b/i.test(
      text,
    ) || /(?:क्या\s+है|के\s+बारे|बताओ|बताइए|जानकारी|परिचय)/.test(input);

  if (isAboutQuery) return "about";

  const brandOnly = text.replace(/[?!.,।]/g, "").trim();
  return /^(?:(?:popular|populer|poplar)\s+hospitals?|(?:पॉपुलर|पापुलर)\s+(?:हॉस्पिटल|अस्पताल))(?:\s+(?:varanasi|banaras|वाराणसी|बनारस))?$/i.test(
    brandOnly,
  )
    ? "about"
    : null;
}

function getPopularHospitalAboutText(lang: Lang): string {
  if (lang === "hi") {
    return `🏥 **पॉपुलर हॉस्पिटल, वाराणसी**\n\nपॉपुलर हॉस्पिटल (पॉपुलर मेडिकेयर लिमिटेड की एक इकाई) वाराणसी का 450 बेड वाला मल्टी सुपर-स्पेशियलिटी अस्पताल है। यह 32+ वर्षों से पूर्वी उत्तर प्रदेश और आसपास के क्षेत्रों के मरीजों को चिकित्सा सेवाएं प्रदान कर रहा है।\n\n⭐ **मुख्य विशेषताएं:**\n• 28 विशेषज्ञ विभाग और 100+ अनुभवी डॉक्टर\n• 24x7 इमरजेंसी, ट्रॉमा और क्रिटिकल केयर\n• कार्डियोलॉजी, न्यूरोलॉजी, नेफ्रोलॉजी, ऑन्कोलॉजी, ऑर्थोपेडिक्स, गायनी और पीडियाट्रिक्स सहित प्रमुख विभाग\n• आधुनिक ICU, NICU, ऑपरेशन थिएटर, डायग्नोस्टिक्स और फार्मेसी\n\n📍 **मुख्य शाखा:** N-10/60, A-2, B.L.W. रोड, ककरमत्ता, वाराणसी, उत्तर प्रदेश – 221004\n📞 **24x7 हेल्पलाइन:** ${PHONES[0].label} / ${PHONES[1].label}`;
  }

  if (lang === "hinglish") {
    return `🏥 **Popular Hospital, Varanasi**\n\nPopular Hospital (Popular Medicare Limited ki ek unit) Varanasi ka 450-bed multi super-speciality hospital hai. Yeh 32+ saalon se Eastern UP aur aas-paas ke regions ke patients ko healthcare services provide kar raha hai.\n\n⭐ **Key Highlights:**\n• 28 specialist departments aur 100+ experienced doctors\n• 24x7 Emergency, Trauma aur Critical Care\n• Cardiology, Neurology, Nephrology, Oncology, Orthopedics, Gynaecology aur Pediatrics jaise major departments\n• Modern ICU, NICU, Operation Theatres, Diagnostics aur Pharmacy\n\n📍 **Main Branch:** N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh – 221004\n📞 **24x7 Helpline:** ${PHONES[0].label} / ${PHONES[1].label}`;
  }

  return `🏥 **Popular Hospital, Varanasi**\n\nPopular Hospital (a unit of Popular Medicare Limited) is a 450-bed multi-super-speciality hospital in Varanasi. For over 32 years, it has provided medical, surgical and diagnostic care to patients across Eastern Uttar Pradesh and nearby regions.\n\n⭐ **Key Highlights:**\n• 28 specialist departments and 100+ experienced doctors\n• 24x7 Emergency, Trauma and Critical Care\n• Major departments including Cardiology, Neurology, Nephrology, Oncology, Orthopedics, Gynaecology and Pediatrics\n• Modern ICUs, NICU, operation theatres, diagnostics and pharmacy\n\n📍 **Main Branch:** N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh – 221004\n📞 **24x7 Helpline:** ${PHONES[0].label} / ${PHONES[1].label}`;
}

function getPopularHospitalLocationText(lang: Lang): string {
  if (lang === "hi") {
    return `📍 **पॉपुलर हॉस्पिटल कहाँ है?**\n\nपॉपुलर हॉस्पिटल की मुख्य शाखा **ककरमत्ता, B.L.W. रोड, वाराणसी** में DLW ग्राउंड के पास स्थित है।\n\n🏥 **पूरा पता:** N-10/60, A-2, B.L.W. रोड, ककरमत्ता, वाराणसी, उत्तर प्रदेश – 221004\n📞 **24x7 हेल्पलाइन:** ${PHONES[0].label} / ${PHONES[1].label}\n\nनीचे दिए गए लिंक से आप Google Maps पर रास्ता देख सकते हैं।`;
  }

  if (lang === "hinglish") {
    return `📍 **Popular Hospital kahan hai?**\n\nPopular Hospital ki main branch **Kakarmatta, B.L.W. Road, Varanasi** me, DLW Ground ke paas hai.\n\n🏥 **Full Address:** N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh – 221004\n📞 **24x7 Helpline:** ${PHONES[0].label} / ${PHONES[1].label}\n\nNiche diye link se aap Google Maps par directions dekh sakte hain.`;
  }

  return `📍 **Where is Popular Hospital?**\n\nThe main branch of Popular Hospital is on **B.L.W. Road, Kakarmatta, Varanasi**, near DLW Ground.\n\n🏥 **Full Address:** N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh – 221004\n📞 **24x7 Helpline:** ${PHONES[0].label} / ${PHONES[1].label}\n\nUse the link below to open directions in Google Maps.`;
}

function getAppointmentStatusHelpText(lang: Lang): string {
  if (lang === "hi") {
    return `📞 **अपॉइंटमेंट कन्फर्मेशन**\n\nआपकी अपॉइंटमेंट कन्फर्म हुई है या नहीं, इसकी जानकारी के लिए कृपया पॉपुलर हॉस्पिटल के नंबर **${APPOINTMENT_CONFIRMATION_PHONES[0].label}** या **${APPOINTMENT_CONFIRMATION_PHONES[1].label}** पर संपर्क करें।\n\nगोपनीयता और सुरक्षा के कारण चैटबॉट केवल मोबाइल नंबर के आधार पर बुकिंग विवरण प्रदर्शित नहीं करता।`;
  }

  if (lang === "hinglish") {
    return `📞 **Appointment Confirmation**\n\nAapki appointment confirm hui hai ya nahi, iski jaankari ke liye kripya Popular Hospital ke numbers **${APPOINTMENT_CONFIRMATION_PHONES[0].label}** ya **${APPOINTMENT_CONFIRMATION_PHONES[1].label}** par contact karein.\n\nPrivacy aur security ke karan chatbot sirf mobile number ke basis par booking details show nahi karta.`;
  }

  return `📞 **Appointment Confirmation**\n\nTo find out whether your appointment has been confirmed, please contact Popular Hospital on **${APPOINTMENT_CONFIRMATION_PHONES[0].label}** or **${APPOINTMENT_CONFIRMATION_PHONES[1].label}**.\n\nFor privacy and security, the chatbot does not display booking details using only a mobile number.`;
}

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
  cardio: "cardio",
  bone: "ortho",
  ortho: "ortho",
  joint: "ortho",
  kidney: "nephro",
  nephro: "nephro",
  stomach: "gastro",
  gastro: "gastro",
  liver: "gastro",
  brain: "neuro",
  neuro: "neuro",
  nerve: "neuro",
  child: "pediatric",
  kids: "pediatric",
  baby: "pediatric",
  pediatric: "pediatric",
  skin: "dermat",
  derma: "dermat",
  eye: "ophthal",
  ophthal: "ophthal",
  women: "gynae",
  gynae: "gynae",
  pregnancy: "gynae",
  cancer: "onco",
  onco: "onco",
  urine: "uro",
  uro: "uro",
  lungs: "pulmo",
  pulmo: "pulmo",
  chest: "cardio",
  teeth: "dental",
  dental: "dental",
  ear: "ent",
  ent: "ent",
  throat: "ent",
  ivf: "ivf",
  fertility: "fertility",
  infertility: "ivf",
  iui: "ivf",
  icsi: "ivf",
  nisantan: "ivf",
  burns: "burn",
  plastic: "plastic",
  psychiatry: "psychiatr",
  diet: "diet",
  nutrition: "nutrition",
  pain: "pain",
};

type Step =
  | "idle"
  | "name"
  | "name_confirm"
  | "phone"
  | "phone_confirm"
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
  emergencyPhones?: boolean;
  doctorsLink?: boolean;
  actionLink?: { label: string; href: string };
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

function bookingDateForSpeech(date: string, lang: Lang): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;

  const value = new Date(year, month - 1, day, 12);
  if (Number.isNaN(value.getTime())) return date;

  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

function speakBookingConfirmation(
  draft: Draft,
  lang: Lang,
  timeStr: string,
) {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined" ||
    !draft.name ||
    !draft.date
  ) {
    return;
  }

  const spokenDate = bookingDateForSpeech(draft.date, lang);
  const text =
    lang === "hi"
      ? `आपकी बुकिंग रिक्वेस्ट सफलतापूर्वक प्राप्त हो गई है। ${draft.name} जी, आपकी अपॉइंटमेंट ${spokenDate} को ${timeStr} बजे के लिए दर्ज की गई है।`
      : lang === "hinglish"
        ? `Aapki booking request successfully receive ho gayi hai. ${draft.name} ji, aapki appointment ${spokenDate} ko ${timeStr} baje ke liye register ki gayi hai.`
        : `Your booking request has been received successfully. ${draft.name}, your appointment has been registered for ${spokenDate} at ${timeStr}.`;

  const speech = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  const voiceLang = lang === "hi" ? "hi-IN" : "en-IN";
  const voices = speech.getVoices();
  const matchingVoice =
    voices.find((voice) => voice.lang.toLowerCase() === voiceLang.toLowerCase()) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith(voiceLang.slice(0, 2).toLowerCase()),
    );

  utterance.lang = voiceLang;
  utterance.rate = lang === "hi" ? 0.9 : 0.95;
  utterance.pitch = 1;
  if (matchingVoice) utterance.voice = matchingVoice;

  speech.cancel();
  speech.speak(utterance);
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

function renderCleanMessageText(content: string, isUser: boolean = false) {
  if (!content) return null;

  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Split by markdown bold markers: **bold** or __bold__ or links [label](url)
        const parts = line.split(/(\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]\([^)]+\))/g);

        return (
          <div key={lineIdx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (
                (part.startsWith("**") && part.endsWith("**") && part.length > 4) ||
                (part.startsWith("__") && part.endsWith("__") && part.length > 4)
              ) {
                const inner = part.slice(2, -2).trim();
                return (
                  <strong
                    key={pIdx}
                    className={
                      isUser
                        ? "font-bold text-white"
                        : "font-semibold text-slate-900"
                    }
                  >
                    {inner}
                  </strong>
                );
              }

              // Markdown link [label](url)
              const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (linkMatch) {
                const [, label, href] = linkMatch;
                return (
                  <a
                    key={pIdx}
                    href={href}
                    className={
                      isUser
                        ? "font-bold text-white underline"
                        : "font-bold text-[#0b7a75] underline hover:text-[#E85222] transition-colors"
                    }
                  >
                    {label}
                  </a>
                );
              }

              // Clean out any leftover or stray asterisks
              const cleanPart = part.replace(/\*\*/g, "");
              return <Fragment key={pIdx}>{cleanPart}</Fragment>;
            })}
          </div>
        );
      })}
    </div>
  );
}

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

const STOP_WORDS = new Set([
  "mujhe", "kripya", "please", "batao", "bataiye", "jaankari", "jankari", "info", "information",
  "baare", "about", "kya", "hai", "hain", "karo", "karna", "chahiye", "saare", "sabhi",
  "department", "departments", "hospital", "popular", "varanasi", "tell", "what", "which",
  "give", "details", "help", "need", "want", "there", "deaprt", "depart", "departement", "the",
  "and", "for", "ke", "ki", "ka", "ko", "me", "se", "par", "hoga", "hogi", "bhi", "ek", "sir"
]);

function findSpeciality(
  text: string,
  list: Speciality[],
  exactOnly = false,
): Speciality | null {
  const t = ` ${norm(text)} `;

  // 1) Full department name or slug mentioned in text — longest name wins
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
  if (best) return best;

  // 1b) Check if any individual meaningful token matches department slug/name parts or alias
  const queryWords = t
    .split(" ")
    .map((w) => w.trim())
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));

  for (const w of queryWords) {
    const aliasTarget = ALIASES[w];
    for (const s of list) {
      const parts = norm(
        `${s.slug} ${s.name} ${s.department_display_name || ""}`,
      ).split(" ");

      if (
        parts.includes(w) ||
        (aliasTarget && parts.some((p) => p.startsWith(aliasTarget))) ||
        (w.length >= 3 && parts.some((p) => p.startsWith(w)))
      ) {
        return s;
      }
    }
  }

  if (exactOnly) return null;

  // 2) Keyword / alias match — prefer shortest name
  const words = t.split(" ").filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
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

const APPOINTMENT_TERM_RE =
  /appointment|booking|booked|अपॉइंटमेंट|अपॉइन्टमेंट|बुकिंग|बुक\s*(?:है|हुआ|हुई)/i;
const APPOINTMENT_STATUS_RE =
  /status|confirm(?:ed|ation)?|check|verify|details?|booked|pata|maloom|जानकारी|स्थिति|पुष्टि|कन्फर्म|चेक|है\s*(?:या|yaa?|or)?\s*(?:नहीं|nahi|nhi)|हुआ|हुई|hui|hua|hai\s*(?:yaa?|or)?\s*(?:nahi|nhi)|any\s+appointment/i;

const isAppointmentStatusQuery = (text: string) =>
  APPOINTMENT_TERM_RE.test(text) && APPOINTMENT_STATUS_RE.test(text);

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

/* ───────── Department Details & Page Knowledge Base ───────── */

interface DeptDetailInfo {
  title: string;
  href: string;
  descEn: string;
  descHinglish: string;
  descHi: string;
  servicesEn: string[];
  servicesHinglish: string[];
  servicesHi: string[];
}

const DEPARTMENT_DETAILS_MAP: Record<string, DeptDetailInfo> = {
  "ivf-fertility": {
    title: "IVF & Fertility",
    href: "/departments/ivf-fertility",
    descEn:
      "Popular Hospital's IVF & Fertility center is a leading reproductive medicine facility in Purvanchal, dedicated to helping couples realize their dream of parenthood with advanced assisted reproduction technologies and compassionate care.",
    descHinglish:
      "Popular Hospital ka IVF & Fertility center Purvanchal ka leading reproductive medicine facility hai jo couples ko parenthood achieve karne me madad karta hai. Yahan advanced assisted reproduction technologies aur compassionate care uplabdh hai.",
    descHi:
      "पॉपुलर हॉस्पिटल का आईवीएफ एवं फर्टिलिटी केंद्र पूर्वांचल का अग्रणी प्रजनन चिकित्सा केंद्र है, जो अत्याधुनिक तकनीकों और संवेदनशील देखभाल के साथ दंपतियों के माता-पिता बनने के सपने को साकार करता है।",
    servicesEn: [
      "Comprehensive Male & Female Infertility Evaluation",
      "IUI (Intrauterine Insemination) & IVF / ICSI Counselling & Cycles",
      "Follicular Monitoring & Ovulation Induction Protocols",
      "Hormone Profiling & Ovarian Reserve Assessment",
      "High-Risk Pregnancy Coordination & Fertility Preservation",
    ],
    servicesHinglish: [
      "Female aur Male Infertility ki complete jaanch",
      "IUI aur IVF / ICSI counselling v treatment planning",
      "Follicular monitoring aur ovulation tracking",
      "Hormone testing aur ovarian reserve evaluation",
      "High-risk pregnancy care aur fertility preservation counselling",
    ],
    servicesHi: [
      "महिला एवं पुरुष निःसंतानता की संपूर्ण जांच",
      "आईयूआई (IUI) एवं आईवीएफ (IVF / ICSI) परामर्श एवं उपचार",
      "फॉलिक्युलर मॉनिटरिंग एवं ओव्यूलेशन ट्रैकिंग",
      "हार्मोनल प्रोफाइल एवं ओवेरियन रिजर्व जांच",
      "हाई-रिस्क प्रेगनेंसी केयर एवं फर्टिलिटी प्रिजर्वेशन परामर्श",
    ],
  },
  cardiology: {
    title: "Cardiology",
    href: "/departments/cardiology",
    descEn:
      "A premier tertiary cardiac care institute in Purvanchal equipped with a state-of-the-art Cath Lab, primary angioplasty, 24x7 ICCU, pacemaker implantation, and emergency acute heart attack management.",
    descHinglish:
      "Purvanchal ka premier cardiac institute jahan 24x7 modern Cath Lab, emergency primary angioplasty, pacemaker implantation, 2D ECHO, aur acute heart attack management uplabdh hai.",
    descHi:
      "पूर्वांचल का अग्रणी हृदय रोग विभाग, जो अत्याधुनिक कैथ लैब, 24x7 इमरजेंसी एंजियोप्लास्टी, पेसमेकर, 2D इको एवं गहन कार्डियक आईसीयू (ICCU) से सुसज्जित है।",
    servicesEn: [
      "24x7 Emergency Cath Lab & Primary Angioplasty (PCI)",
      "Coronary Angiography & Drug-Eluting Stents",
      "Permanent Pacemaker & ICD / CRT Implantation",
      "2D Echocardiography (ECHO), TMT & Holter Monitoring",
      "24x7 Intensive Coronary Care Unit (ICCU)",
    ],
    servicesHinglish: [
      "24x7 Emergency Cath Lab aur Primary Angioplasty",
      "Coronary Angiography aur Stenting",
      "Permanent Pacemaker aur ICD Implantation",
      "2D Echo, TMT aur Holter heart monitoring",
      "24x7 Cardiac Emergency v ICU care",
    ],
    servicesHi: [
      "24x7 इमरजेंसी कैथ लैब एवं तुरंत एंजियोप्लास्टी",
      "कोरोनरी एंजियोग्राफी एवं आधुनिक स्टेंटिंग",
      "स्थाई पेसमेकर एवं आईसीडी इम्प्लांटेशन",
      "2D इको, टीएमटी एवं होल्टर मॉनिटरिंग",
      "24x7 कार्डियक इमरजेंसी एवं विशेषज्ञ ICCU",
    ],
  },
  ctvs: {
    title: "Cardiothoracic & Vascular Surgery (CTVS)",
    href: "/departments/ctvs",
    descEn:
      "Advanced cardiothoracic center delivering open-heart surgeries, coronary artery bypass grafting (CABG), valve repair & replacement, and thoracic lung procedures in modular operation suites.",
    descHinglish:
      "Advanced open-heart surgery center jahan bypass surgery (CABG), heart valve repair/replacement aur thoracic surgeries ultra-modern modular OT me ki jaati hain.",
    descHi:
      "हार्ट बाईपास सर्जरी (CABG), वॉल्व रिपेयर व रिप्लेसमेंट, फेफड़ों की सर्जरी एवं वैस्कुलर सर्जरी हेतु पूर्वांचल का शीर्ष शल्य-चिकित्सा केंद्र।",
    servicesEn: [
      "Coronary Artery Bypass Grafting (CABG / Bypass Surgery)",
      "Heart Valve Repair & Double Valve Replacement",
      "Thoracic Lung Resections & Mediastinal Surgeries",
      "Peripheral Vascular Reconstructive Surgery",
    ],
    servicesHinglish: [
      "Bypass surgery (CABG) modular OTs me",
      "Heart valve repair aur replacement",
      "Lungs aur thoracic surgeries",
      "Peripheral vascular repair surgeries",
    ],
    servicesHi: [
      "हार्ट बाईपास सर्जरी (CABG)",
      "हार्ट वॉल्व रिपेयर एवं रिप्लेसमेंट",
      "फेफड़ों की थोरेसिक सर्जरी",
      "वैस्कुलर एवं नसों की आधुनिक सर्जरी",
    ],
  },
  neurosurgery: {
    title: "Neurology & Neurosurgery",
    href: "/departments/neurosurgery",
    descEn:
      "Super-specialty center for brain, spine, and nerve disorders. Equipped with advanced neuro-navigation, microscopic spine surgery, dedicated Neuro ICU, and 24x7 acute stroke care.",
    descHinglish:
      "Brain, spine aur nerves ka super-specialty center. Yahan stroke, paralysis, brain tumor, slip disc, aur microscopic spine surgery ke liye 24x7 Neuro ICU uplabdh hai.",
    descHi:
      "मस्तिष्क, रीढ़ और तंत्रिका (नर्व) रोगों का सुपर-स्पेशियलिटी विभाग। स्ट्रोक (लकवा), ब्रेन ट्यूमर, स्लिप डिस्क एवं माइक्रोस्कोपिक स्पाइन सर्जरी की 24x7 सुविधाएं।",
    servicesEn: [
      "24x7 Acute Stroke & Brain Hemorrhage Management",
      "Microscopic & Endoscopic Brain Tumor Surgery",
      "Spine Surgery for Slip Disc, Sciatica & Trauma",
      "Epilepsy (Mirgi), Migraine & Movement Disorders Care",
      "Dedicated Neuro-Intensive Care Unit (Neuro ICU)",
    ],
    servicesHinglish: [
      "24x7 Stroke, Paralysis aur Brain Hemorrhage care",
      "Microscopic Brain Tumor operation",
      "Slip Disc aur Spine trauma surgery",
      "Epilepsy (Mirgi), sar dard aur migraine treatment",
      "Dedicated Neuro ICU facilities",
    ],
    servicesHi: [
      "24x7 स्ट्रोक (लकवा) एवं ब्रेन हेमरेज इमरजेंसी",
      "माइक्रोस्कोपिक ब्रेन ट्यूमर सर्जरी",
      "स्लिप डिस्क एवं रीढ़ की हड्डी का ऑपरेशन",
      "मिर्गी, माइग्रेन एवं नसों की कमजोरी का इलाज",
      "समर्पित न्यूरो-आईसीयू (Neuro ICU)",
    ],
  },
  gastroenterology: {
    title: "Gastroenterology & Hepatology",
    href: "/departments/gastroenterology",
    descEn:
      "Comprehensive digestive and hepatobiliary care featuring therapeutic video endoscopy, colonoscopy, ERCP, jaundice evaluation, and gastrointestinal bleeding emergency interventions.",
    descHinglish:
      "Pet, liver aur digestive system ka advanced center. Yahan diagnostic & therapeutic endoscopy, colonoscopy, ERCP, liver cirrhosis aur jaundice ka expert treatment hota hai.",
    descHi:
      "पेट, आंत, लिवर एवं पाचन तंत्र का उच्च-स्तरीय विभाग। उन्नत वीडियो एंडोस्कोपी, कोलोनोस्कोपी, ईआरसीपी (ERCP), पीलिया एवं लिवर रोगों का सटीक इलाज।",
    servicesEn: [
      "Upper GI Video Endoscopy & Colonoscopy",
      "ERCP for Bile Duct Stones & Jaundice",
      "GI Bleeding Management (Band Ligation & Hemostasis)",
      "Fatty Liver, Cirrhosis & Hepatitis Management",
      "Pancreatic & Gallbladder Disease Treatments",
    ],
    servicesHinglish: [
      "Video Endoscopy aur Colonoscopy",
      "ERCP dwara pitte ki nali ki pathri ka ilaaj",
      "Pet me bleeding rokne ki endoscopic vidhi",
      "Fatty liver, hepatitis aur cirrhosis care",
      "Pancreas aur pet ki bimariyon ka treatment",
    ],
    servicesHi: [
      "वीडियो एंडोस्कोपी एवं कोलोनोस्कोपी",
      "ईआरसीपी (ERCP) द्वारा पित्त नली की पथरी का इलाज",
      "आंतों से रक्तस्राव का तुरंत एंडोस्कोपिक उपचार",
      "फैटी लिवर, हेपेटाइटिस एवं सिरोसिस प्रबंधन",
      "अग्न्याशय एवं पाचन संबंधी समस्याओं का इलाज",
    ],
  },
  nephrology: {
    title: "Nephrology & Dialysis",
    href: "/departments/nephrology",
    descEn:
      "Specialized kidney care with a 24x7 modern Hemodialysis unit, acute & chronic kidney disease (CKD) management, kidney biopsy, and pre-transplant workup.",
    descHinglish:
      "Kidney aur dialysis ka dedicated center jahan 24x7 modern hemodialysis unit, kidney failure management, creatinine control aur expert nephrologists uplabdh hain.",
    descHi:
      "गुर्दा (किडनी) रोग विभाग, जिसमें 24x7 आधुनिक हेमोडायलिसिस यूनिट, सीकेडी (CKD) प्रबंधन, किडनी बायोप्सी एवं डायलिसिस फिस्टुला सुविधाएं उपलब्ध हैं।",
    servicesEn: [
      "24x7 Advanced Hemodialysis Unit",
      "Acute & Chronic Kidney Disease (CKD) Care",
      "Kidney Biopsy & Glomerular Disease Management",
      "AV Fistula Coordination & Temporary Catheter Access",
      "Diabetic Kidney Disease Prevention & Monitoring",
    ],
    servicesHinglish: [
      "24x7 Modern Hemodialysis Unit",
      "Kidney failure aur high creatinine treatment",
      "Kidney biopsy aur urine infection care",
      "Dialysis catheter aur AV fistula management",
      "Diabetic kidney damage rokne ke protocols",
    ],
    servicesHi: [
      "24x7 आधुनिक हेमोडायलिसिस यूनिट",
      "क्रोनिक किडनी डिजीज (CKD) एवं क्रिएटिनिन नियंत्रण",
      "किडनी बायोप्सी एवं नेफ्रोटिक सिंड्रोम इलाज",
      "डायलिसिस कैथेटर एवं फिस्टुला देखभाल",
      "डायबिटिक किडनी रोग का विशेष प्रबंधन",
    ],
  },
  urology: {
    title: "Urology & Andrology",
    href: "/departments/urology",
    descEn:
      "Minimally invasive laser surgery for kidney stones (PCNL, RIRS, URS), prostate enlargement (TURP), reconstructive urology, and male reproductive health.",
    descHinglish:
      "Kidney stone ka laser operation (RIRS, PCNL), prostate ki doorbeen se surgery (TURP), urine infection aur male health ka advanced treatment uplabdh hai.",
    descHi:
      "गुर्दे व पेशाब की पथरी का लेजर ऑपरेशन (PCNL, RIRS), प्रोस्टेट ग्रंथि की दूरबीन सर्जरी (TURP), मूत्र संक्रमण एवं पुरुष प्रजनन स्वास्थ्य का आधुनिक उपचार।",
    servicesEn: [
      "Laser Stone Surgery (RIRS, PCNL, Mini-PCNL, URS)",
      "Endoscopic Prostate Surgery (TURP, Bipolar TURP)",
      "Urinary Stricture & Reconstructive Urology",
      "Urinary Incontinence & Bladder Disorders",
      "Andrology & Male Sexual Health Evaluation",
    ],
    servicesHinglish: [
      "Bina cheer-faad laser stone surgery (RIRS, PCNL)",
      "Doorbeen se prostate surgery (TURP)",
      "Peshab me jalan, rukawat aur infection ka ilaj",
      "Bladder issues aur urinary tract reconstruction",
      "Male fertility aur andrology consultation",
    ],
    servicesHi: [
      "लेजर द्वारा पथरी का ऑपरेशन (RIRS, PCNL, URS)",
      "दूरबीन विधि से प्रोस्टेट सर्जरी (TURP)",
      "पेशाब में रुकावट, जलन व संक्रमण का इलाज",
      "यूरिनरी ब्लैडर व मूत्रमार्ग की रीकंस्ट्रक्टिव सर्जरी",
      "पुरुष स्वास्थ्य एवं एंड्रोलॉजिकल परामर्श",
    ],
  },
  orthopedics: {
    title: "Orthopedics & Joint Replacement",
    href: "/departments/orthopedics",
    descEn:
      "Comprehensive bone, joint, and trauma center offering total knee replacement (TKR), total hip replacement (THR), arthroscopic ligament repair, and complex fracture fixation.",
    descHinglish:
      "Joint replacement (TKR, THR), complex fracture trauma surgery, sports injury arthroscopy, aur ghutne/kamar dard ka advanced orthopedic treatment.",
    descHi:
      "हड्डी एवं जोड़ रोग विभाग — संपूर्ण घुटना व कूल्हा प्रत्यारोपण (TKR/THR), आर्थ्रोस्कोपी लिगामेंट सर्जरी, जटिल फ्रैक्चर एवं रीढ़ की हड्डी का आधुनिक उपचार।",
    servicesEn: [
      "Total Knee Replacement (TKR) & Hip Replacement (THR)",
      "Arthroscopic ACL / Meniscus Sports Injury Repair",
      "Complex Trauma, Fracture Fixation & Non-Union Care",
      "Spine Surgery for Spondylosis, Disc Prolapse & Sciatica",
      "Arthritis, Osteoporosis & Joint Pain Rehabilitation",
    ],
    servicesHinglish: [
      "Ghutna aur Koolha pratyaropan (Knee & Hip Replacement)",
      "Sports injury me doorbeen se ligament repair (ACL)",
      "Complex fracture aur trauma operation",
      "Kamar dard, sciatica aur slip disc care",
      "Gathiya (Arthritis) aur joint pain relief",
    ],
    servicesHi: [
      "घुटना एवं कूल्हा प्रत्यारोपण (TKR एवं THR)",
      "आर्थ्रोस्कोपी द्वारा लिगामेंट (ACL) रिपेयर",
      "जटिल फ्रैक्चर एवं एक्सीडेंटल ट्रॉमा सर्जरी",
      "कमर दर्द, साइटिका एवं स्लिप डिस्क का इलाज",
      "गठिया (आर्थराइटिस) एवं जोड़ों के दर्द का निवारण",
    ],
  },
  gynaecology: {
    title: "Obstetrics & Gynaecology",
    href: "/departments/gynaecology",
    descEn:
      "Complete women's health center offering painless normal deliveries, high-risk pregnancy care, laparoscopic hysterectomy, ovarian cyst removal, and PCOS management.",
    descHinglish:
      "Mahila swasthya ka comprehensive center jahan safe normal delivery, high-risk pregnancy, doorbeen se uterus operation (laparoscopic hysterectomy) aur PCOS care uplabdh hai.",
    descHi:
      "स्त्री एवं प्रसूति रोग विभाग — सुरक्षित व दर्द-रहित प्रसव, हाई-रिस्क प्रेगनेंसी केयर, दूरबीन द्वारा बच्चेदानी का ऑपरेशन, रसौली व पीसीओएस का संपूर्ण उपचार।",
    servicesEn: [
      "Painless Delivery & Comprehensive Antenatal Care",
      "High-Risk Pregnancy Management & Emergency Cesarean",
      "Laparoscopic Gynecological Surgeries (Hysterectomy, Myomectomy)",
      "PCOS / PCOD, Fibroids & Menstrual Disorders Clinic",
      "Adolescent & Menopausal Health Guidance",
    ],
    servicesHinglish: [
      "Dard-rahit normal delivery aur pregnancy care",
      "High-risk pregnancy aur emergency operation",
      "Doorbeen se bacchedani ki rasoli/surgery (Laparoscopy)",
      "PCOS, irregular periods aur hormonal balance",
      "Menopause aur mahila swasthya checkup",
    ],
    servicesHi: [
      "दर्द-रहित प्रसव एवं संपूर्ण गर्भावस्था देखभाल",
      "हाई-रिस्क प्रेगनेंसी एवं आपातकालीन सिजेरियन",
      "दूरबीन से बच्चेदानी का ऑपरेशन (लेप्रोस्कोपी)",
      "पीसीओडी (PCOD), रसोली एवं मासिक धर्म संबंधी समस्याएं",
      "महिला स्वास्थ्य एवं मेनोपॉज परामर्श",
    ],
  },
  pediatrics: {
    title: "Pediatrics & Neonatology",
    href: "/departments/pediatrics",
    descEn:
      "Round-the-clock child healthcare featuring a Level-III Neonatal ICU (NICU) and Pediatric ICU (PICU) for premature, low-birth-weight, and critically ill children.",
    descHinglish:
      "Bachhon aur navjat shishuon ke liye 24x7 Level-III NICU aur PICU facilities, vaccination, growth tracking aur expert pediatricians uplabdh hain.",
    descHi:
      "नवजात एवं बाल रोग विभाग — 24 घंटे संचालित आधुनिक Level-III NICU एवं PICU, समय पूर्व जन्मे बच्चों की विशेष देखभाल, टीकाकरण और बाल रोग परामर्श।",
    servicesEn: [
      "24x7 Level-III Advanced NICU & PICU",
      "Premature & Low-Birth-Weight Infant Critical Care",
      "Routine Childhood Illnesses, Fever & Asthma Care",
      "Comprehensive Immunization & Growth Tracking",
      "Pediatric Emergency & Trauma Resuscitation",
    ],
    servicesHinglish: [
      "24x7 Advanced NICU aur PICU suvidhaayein",
      "Kam vajan aur premature baby intensive care",
      "Bachhon ke bukhar, khansi, infection ka ilaj",
      "Complete vaccination aur child growth monitoring",
      "24x7 Pediatric emergency care",
    ],
    servicesHi: [
      "24x7 उन्नत एनआईसीयू (NICU) एवं पीआईसीयू (PICU)",
      "कम वजन एवं प्रीमैच्योर नवजातों की सघन देखभाल",
      "बच्चों के बुखार, निमोनिया व संक्रमण का उपचार",
      "संपूर्ण टीकाकरण (Vaccination) एवं विकास निगरानी",
      "बाल चिकित्सा आपातकालीन सेवाएं",
    ],
  },
  oncology: {
    title: "Oncology (Cancer Care)",
    href: "/departments/oncology",
    descEn:
      "Comprehensive multi-disciplinary cancer care providing surgical oncology, day-care chemotherapy, immunotherapy, targeted therapy, and tumor board evaluations.",
    descHinglish:
      "Cancer ka complete center jahan surgical oncology, chemotherapy, immunotherapy, biopsy aur cancer specialist doctors uplabdh hain.",
    descHi:
      "कैंसर रोग विभाग — सर्जिकल ऑन्कोलॉजी, डे-केयर कीमोथेरेपी, इम्यूनोथेरेपी, ट्यूमर बायोप्सी एवं कैंसर दर्द निवारण की संपूर्ण सुविधाएं।",
    servicesEn: [
      "Surgical Oncology for Breast, Head/Neck & GI Cancers",
      "Day-Care Chemotherapy & Infusion Center",
      "Immunotherapy & Precision Targeted Therapy",
      "Diagnostic Biopsy & Histopathology Coordination",
      "Palliative Care & Cancer Pain Management",
    ],
    servicesHinglish: [
      "Cancer ki surgical operations (Surgical Oncology)",
      "Day-care chemotherapy center",
      "Immunotherapy aur targeted medicines",
      "Biopsy jaanch aur tumor evaluation",
      "Cancer pain relief aur supportive care",
    ],
    servicesHi: [
      "स्तन, मुंह, पेट एवं आंत कैंसर की सर्जरी",
      "डे-केयर कीमोथेरेपी एवं इन्फ्यूजन यूनिट",
      "इम्यूनोथेरेपी एवं टार्गेटेड थेरेपी",
      "कैंसर बायोप्सी एवं डायग्नोस्टिक्स",
      "दर्द निवारक कैंसर देखभाल (Palliative Care)",
    ],
  },
  ent: {
    title: "ENT (Ear, Nose & Throat)",
    href: "/departments/ent",
    descEn:
      "Microscopic and endoscopic ENT diagnostics and surgery for hearing loss, chronic ear discharge, sinus diseases (FESS), voice disorders, and tonsillitis.",
    descHinglish:
      "Kaan, naak aur gale ki bimariyon ka center. Yahan ear discharge, hearing loss, sinus doorbeen surgery (FESS), tonsils aur gale ki awaz ka modern treatment hota hai.",
    descHi:
      "कान, नाक एवं गला विभाग — कान बहना, बहरापन, दूरबीन द्वारा साइनस सर्जरी (FESS), टॉन्सिल, खर्राटे एवं गले की आवाज संबंधी विकारों का आधुनिक इलाज।",
    servicesEn: [
      "Micro-Ear Surgery (Tympanoplasty, Mastoidectomy)",
      "Functional Endoscopic Sinus Surgery (FESS)",
      "Tonsillectomy & Adenoidectomy Surgeries",
      "Hearing Evaluation & Audiometry Services",
      "Voice Disorder Therapy & Microlaryngeal Surgery",
    ],
    servicesHinglish: [
      "Kaan ke parde ka operation (Micro-ear surgery)",
      "Sinus ka doorbeen se operation (FESS)",
      "Tonsil aur adenoid operation",
      "Hearing test aur sunai ki jaanch",
      "Gale ki awaz aur micro-laryngeal surgery",
    ],
    servicesHi: [
      "कान के पर्दे का ऑपरेशन (टिम्पैनोप्लास्टी)",
      "दूरबीन से साइनस की सर्जरी (FESS)",
      "टॉन्सिल एवं एडेनोइड का इलाज",
      "ऑडियोमेट्री एवं सुनने की क्षमता की जांच",
      "गले एवं वोकल कॉर्ड की माइक्रो सर्जरी",
    ],
  },
  ophthalmology: {
    title: "Ophthalmology (Eye Care)",
    href: "/departments/ophthalmology",
    descEn:
      "Advanced vision center providing micro-incision stitchless cataract surgery (Phaco), glaucoma management, diabetic eye screening, and comprehensive refractive care.",
    descHinglish:
      "Aankhon ka advanced center jahan bina taanke wali Phaco cataract surgery, motiyabind, glaucoma, diabetic eye care aur vision testing hoti hai.",
    descHi:
      "नेत्र रोग विभाग — बिना पट्टी/टांके के आधुनिक फेको मोतियाबिंद ऑपरेशन, काला मोतिया (ग्लूकोमा), डायबिटिक रेटिनोपैथी एवं दृष्टि संबंधी संपूर्ण जांच।",
    servicesEn: [
      "Micro-Incision Stitchless Cataract Surgery (Phaco)",
      "Glaucoma Early Detection & Medical / Laser Therapy",
      "Diabetic Retinopathy & Hypertensive Eye Screening",
      "Refraction, Vision Testing & Prescription Services",
    ],
    servicesHinglish: [
      "Stitchless Phaco motiyabind operation",
      "Glaucoma (Kala motiya) laser v medicine treatment",
      "Diabetic eye checkup aur retina screening",
      "Computerized eye testing aur chashma number",
    ],
    servicesHi: [
      "बिना टांके वाला फेको मोतियाबिंद ऑपरेशन",
      "काला मोतियाबिंद (ग्लूकोमा) की लेजर जांच व इलाज",
      "डायबिटिक रेटिना स्क्रीनिंग एवं आंख की नस जांच",
      "कंप्यूटराइज्ड दृष्टि परीक्षण एवं चश्मा परामर्श",
    ],
  },
  dental: {
    title: "Dental Care",
    href: "/departments/dental",
    descEn:
      "Comprehensive modern dentistry providing painless single-sitting root canal treatment (RCT), dental implants, aesthetic smile designing, and oral surgeries.",
    descHinglish:
      "Modern dental clinic jahan painless root canal (RCT), dental implants, teeth alignment, cavity filling aur oral surgery expert dentists dwara hoti hai.",
    descHi:
      "दंत चिकित्सा विभाग — दर्द-रहित रूट कैनाल (RCT), डेंटल इम्प्लांट, दांतों की स्केलिंग, ब्रेसेस एवं जबड़े व मुख रोग संबंधी आधुनिक उपचार।",
    servicesEn: [
      "Single-Sitting Painless Root Canal Treatment (RCT)",
      "Titanium Dental Implants & Crown / Bridge Prosthetics",
      "Aesthetic Smile Designing, Veneers & Teeth Whitening",
      "Wisdom Tooth Surgical Extraction & Maxillofacial Care",
    ],
    servicesHinglish: [
      "Painless single-sitting Root Canal (RCT)",
      "Permanent Dental Implants aur capping",
      "Smile designing, teeth cleaning aur whitening",
      "Akal daadh (wisdom tooth) surgical extraction",
    ],
    servicesHi: [
      "दर्द-रहित सिंगल-सिटिंग रूट कैनाल (RCT)",
      "टाइटैनियम डेंटल इम्प्लांट्स एवं कैपिंग",
      "स्माइल डिजाइनिंग एवं दांतों की सफाई व सफेदी",
      "अकल दाढ़ (Wisdom Tooth) का सर्जिकल निष्कासन",
    ],
  },
  "general-medicine": {
    title: "General Medicine",
    href: "/departments/general-medicine",
    descEn:
      "Primary care and adult internal medicine for diabetes management, hypertension, seasonal & tropical fevers (dengue, malaria, typhoid), and multi-system medical conditions.",
    descHinglish:
      "Internal medicine center jahan diabetes, blood pressure, bukhar (dengue, typhoid), thyroid aur multi-system medical bimariyon ka ilaaj hota hai.",
    descHi:
      "जनरल मेडिसिन विभाग — मधुमेह (शुगर), बीपी, संक्रामक बुखार (डेंगू, मलेरिया, टाइफाइड), थायरॉइड एवं सामान्य स्वास्थ्य समस्याओं का संपूर्ण उपचार।",
    servicesEn: [
      "Diabetes Mellitus & Hypertension Comprehensive Care",
      "Infectious Diseases Management (Dengue, Typhoid, Malaria)",
      "Thyroid, Lipid & Metabolic Disorder Clinics",
      "Adult Immunization & Preventive Health Checkups",
    ],
    servicesHinglish: [
      "Sugar (Diabetes) aur Blood Pressure management",
      "Dengue, typhoid, viral bukhar ka treatment",
      "Thyroid aur cholesterol control consultation",
      "Preventive whole body health checkups",
    ],
    servicesHi: [
      "डायबिटीज (शुगर) एवं उच्च रक्तचाप (BP) नियंत्रण",
      "डेंगू, टाइफाइड, मलेरिया व मौसमी बुखार का इलाज",
      "थायरॉइड एवं मेटाबॉलिक विकारों का संपूर्ण प्रबंधन",
      "नियमित स्वास्थ्य परीक्षण (Full Body Checkup)",
    ],
  },
  "general-surgery": {
    title: "Laparoscopic & General Surgery",
    href: "/departments/general-surgery",
    descEn:
      "Minimally invasive keyhole surgery for gallbladder stones, hernia, appendix, piles/fistula (laser), and emergency abdominal trauma surgeries in high-tech modular OTs.",
    descHinglish:
      "Doorbeen (Laparoscopy) dwara gallbladder stone, hernia, appendix, piles/fissure ka laser operation aur general surgeries modular OTs me hoti hain.",
    descHi:
      "दूरबीन (लेप्रोस्कोपी) द्वारा पित्त की थैली की पथरी, हर्निया, अपेंडिक्स, बवासीर/भगंदर का लेजर ऑपरेशन एवं जनरल सर्जरी।",
    servicesEn: [
      "Laparoscopic Cholecystectomy (Gallbladder Stone)",
      "Laparoscopic Hernia Repair (Inguinal, Umbilical, Incisional)",
      "Laparoscopic Appendectomy",
      "Laser Treatment for Piles, Fissure & Fistula",
      "Trauma, Wound Care & Emergency Surgical Interventions",
    ],
    servicesHinglish: [
      "Doorbeen se pitte ki thaili ka operation",
      "Laparoscopic hernia surgery",
      "Appendix ka keyhole operation",
      "Bawasir (Piles) aur fistula ka laser ilaj",
      "Emergency surgery aur trauma care",
    ],
    servicesHi: [
      "दूरबीन विधि से पित्त की थैली की पथरी का ऑपरेशन",
      "हर्निया का आधुनिक लेप्रोस्कोपिक ऑपरेशन",
      "अपेंडिक्स की दूरबीन सर्जरी",
      "बवासीर, फिशर एवं फिस्टुला का लेजर उपचार",
      "आपातकालीन एब्डोमिनल सर्जरी एवं ट्रॉमा केयर",
    ],
  },
  respiratory: {
    title: "Respiratory Medicine (Pulmonology)",
    href: "/departments/respiratory",
    descEn:
      "Comprehensive chest and respiratory medicine for asthma, COPD, chronic bronchitis, pneumonia, tuberculosis, sleep apnea, and diagnostic bronchoscopy.",
    descHinglish:
      "Lungs aur saans ki bimariyon ka center jahan asthma, saans phulna, chronic cough, pneumonia, COPD aur bronchoscopy ki suvidha uplabdh hai.",
    descHi:
      "श्वसन एवं फेफड़ा रोग विभाग — दमा (अस्थमा), सांस फूलना, पुरानी खांसी, टीबी, निमोनिया, सीओपीडी एवं फेफड़ों की ब्रोंकोस्कोपी जांच।",
    servicesEn: [
      "Asthma & Chronic Obstructive Pulmonary Disease (COPD) Clinic",
      "Pneumonia, Tuberculosis (TB) & Chest Infections Care",
      "Diagnostic Fiberoptic Bronchoscopy",
      "Pulmonary Function Testing (PFT / Spirometry)",
      "Sleep Apnea Evaluation & Respiratory Critical Care",
    ],
    servicesHinglish: [
      "Asthma aur saans ki takleef ka treatment",
      "Khansi, pneumonia aur TB ki complete care",
      "Bronchoscopy jaanch",
      "PFT (Spirometry) dwara fefdon ki capacity check",
      "Sleep apnea aur respiratory ICU care",
    ],
    servicesHi: [
      "दमा (अस्थमा) एवं सीओपीडी का विशेष क्लीनिक",
      "निमोनिया, टीबी एवं छाती के संक्रमण का इलाज",
      "ब्रोंकोस्कोपी द्वारा फेफड़ों की आंतरिक जांच",
      "पीएफटी (PFT / स्पाइरोमेट्री) फेफड़ा क्षमता परीक्षण",
      "रेस्पिरेटरी आईसीयू एवं स्लीप एप्निया केयर",
    ],
  },
  "burns-plastic-surgery": {
    title: "Burns & Plastic Surgery",
    href: "/departments/burns-plastic-surgery",
    descEn:
      "Specialized burn intensive care, reconstructive plastic surgery, accident trauma repair, scar revision, and aesthetic cosmetic procedures.",
    descHinglish:
      "Burn trauma intensive care, reconstructive plastic surgery, accident wound repair aur scar revision ki expert surgical suvidha.",
    descHi:
      "बर्न्स एवं प्लास्टिक सर्जरी विभाग — बर्न आईसीयू, जलने के घावों का उपचार, दुर्घटना पुनर्निर्माण सर्जरी, निशान हटाने व कॉस्मेटिक प्लास्टिक सर्जरी।",
    servicesEn: [
      "Dedicated Burn Intensive Care Unit (BICU)",
      "Reconstructive Plastic Surgery for Trauma & Tissue Defects",
      "Scar Revision & Post-Burn Contracture Release",
      "Advanced Wound Care & Modern Skin Grafting",
      "Microvascular & Cosmetic Aesthetic Procedures",
    ],
    servicesHinglish: [
      "24x7 Specialized Burn ICU care",
      "Accident trauma reconstructive surgery",
      "Post-burn scar revision aur contracture release",
      "Advanced skin grafting aur wound dressing",
      "Cosmetic aur microvascular plastic surgery",
    ],
    servicesHi: [
      "24x7 विशेष बर्न आईसीयू (Burn ICU) सुविधा",
      "दुर्घटना जनित विकृतियों की पुनर्निर्माण सर्जरी",
      "जलने के निशान व सिकुड़न दूर करने की सर्जरी",
      "उन्नत स्किन ग्राफ्टिंग एवं घाव प्रबंधन",
      "माइक्रोवैस्कुलर एवं कॉस्मेटिक प्रक्रियाएं",
    ],
  },
  "diabetic-foot": {
    title: "Diabetic Foot Care",
    href: "/departments/diabetic-foot",
    descEn:
      "Dedicated limb salvage and diabetic foot ulcer clinic offering advanced wound debridement, vascular Doppler, neuropathy testing, and gangrene prevention.",
    descHinglish:
      "Sugar (Diabetes) ke mareezon ke pair ke ghaav, diabetic foot ulcer, gangrene prevention aur sensory neuropathy testing ka dedicated center.",
    descHi:
      "डायबिटिक फुट केयर — मधुमेह (शुगर) रोगियों के पैर के घावों, अल्सर एवं गैंग्रीन की रोकथाम, घाव की उन्नत ड्रेसिंग एवं तंत्रिका जांच।",
    servicesEn: [
      "Diabetic Foot Ulcer Debridement & Advanced Dressing",
      "Limb Salvage & Gangrene Prevention Protocols",
      "Biothesiometry & Peripheral Neuropathy Assessment",
      "Peripheral Vascular Doppler Screening",
      "Customized Diabetic Footwear & Preventive Counselling",
    ],
    servicesHinglish: [
      "Diabetic foot ulcer treatment v healing dressing",
      "Gangrene rokne aur pair bachane ke protocols",
      "Biothesiometry se pair ki naso ki jaanch",
      "Artery blood circulation (Doppler) check",
      "Diabetic joote (custom footwear) guidance",
    ],
    servicesHi: [
      "डायबिटिक फुट अल्सर एवं पुराने घाव की ड्रेसिंग",
      "गैंग्रीन रोकथाम एवं अंग सुरक्षा (Limb Salvage)",
      "बायोथिसियोमेट्री द्वारा नसों की संवेदनशीलता जांच",
      "पैरों के रक्त संचार की डॉपलर जांच",
      "डायबिटिक फुटवियर एवं बचाव परामर्श",
    ],
  },
  "dietetics-nutrition": {
    title: "Dietetics & Clinical Nutrition",
    href: "/departments/dietetics-nutrition",
    descEn:
      "Evidence-based clinical nutrition, medical nutrition therapy, and personalized diet charts for diabetes, cardiac care, kidney health, weight loss, and post-surgery healing.",
    descHinglish:
      "Expert dietitians dwara diabetes, heart problem, kidney rog, motapa kam karne aur bimari ke anusar personalized diet chart aur nutrition guidance.",
    descHi:
      "डाइटेटिक्स एवं न्यूट्रिशन विभाग — मधुमेह, हृदय रोग, गुर्दा रोग, वजन नियंत्रण एवं सर्जरी पश्चात पोषण हेतु विशेषज्ञ आहार तालिका व परामर्श।",
    servicesEn: [
      "Personalized Medical Nutrition Therapy (MNT)",
      "Diabetes, Hypertension & Cardiac Diet Plans",
      "Renal, Hepatic & Gastrointestinal Nutritional Management",
      "Weight Management, Obesity & Metabolic Health Charts",
      "Critical Care Enteral & Parenteral Nutrition Guidance",
    ],
    servicesHinglish: [
      "Bimari ke anukool personalized diet charts",
      "Sugar aur high BP ke liye specific nutrition",
      "Kidney aur liver rog me vishesh khaan-paan",
      "Weight loss aur motapa kam karne ka diet plan",
      "ICU aur surgery ke baad poshan counselling",
    ],
    servicesHi: [
      "व्यक्तिगत चिकित्सीय आहार तालिका (MNT)",
      "मधुमेह एवं उच्च रक्तचाप हेतु विशेष खानपान",
      "गुर्दा एवं लिवर रोगियों हेतु आहार प्रबंधन",
      "मोटापा निवारण एवं वजन नियंत्रण परामर्श",
      "सर्जरी एवं आईसीयू मरीजों हेतु पोषण देखभाल",
    ],
  },
  "interventional-radiology": {
    title: "Interventional Radiology",
    href: "/departments/interventional-radiology",
    descEn:
      "Minimally invasive, image-guided pinhole procedures for uterine fibroid embolization (UFE), vascular stenting, varicose veins laser ablation, and diagnostic biopsies.",
    descHinglish:
      "Bina bade cheer-phaad ke image-guided pinhole techniques se naso ki bimari, uterine fibroid embolization aur biopsy ka modern ilaj.",
    descHi:
      "इंटरवेंशनल रेडियोलॉजी — आधुनिक इमेजिंग तकनीकों (USG/CT) द्वारा बिना चीरा-टांका लगाए नसों के रोग, ट्यूमर एम्बोलाइजेशन एवं बायोप्सी।",
    servicesEn: [
      "Uterine Fibroid Embolization (UFE) Without Surgery",
      "Image-Guided Biopsies, FNAC & Drainage Procedures",
      "Peripheral Vascular Angioplasty & Stenting",
      "Varicose Veins Laser & Radiofrequency Ablation",
      "Emergency Bleeding Embolization & Biliary Drainage",
    ],
    servicesHinglish: [
      "Bina surgery bacchedani ki rasoli ka embolization (UFE)",
      "USG/CT guided biopsy aur fluid drainage",
      "Blood vessel ki angioplasty v stenting",
      "Varicose veins ka laser treatment",
      "Emergency internal bleeding rokne ki embolization",
    ],
    servicesHi: [
      "बिना ऑपरेशन बच्चेदानी की रसोली का उपचार (UFE)",
      "इमेज-गाइडेड बायोप्सी एवं फ्लूइड ड्रेनेज",
      "रक्त वाहिकाओं की एंजियोप्लास्टी व स्टेंटिंग",
      "वैरिकोज वेन्स का लेजर उपचार",
      "आपातकालीन आंतरिक रक्तस्राव एम्बोलाइजेशन",
    ],
  },
  "laboratory-medicine": {
    title: "Laboratory Medicine & Pathology",
    href: "/departments/laboratory-medicine",
    descEn:
      "24x7 fully automated diagnostic laboratory providing biochemistry, hematology, clinical pathology, microbiology, cytology, hormonal assays, and histopathology.",
    descHinglish:
      "24 ghante khuli automated pathology lab jahan khoon jaanch (CBC, LFT, KFT), thyroid, hormone tests, biopsy aur accurate report milti hai.",
    descHi:
      "पैथोलॉजी एवं लैबोरेटरी मेडिसिन — 24 घंटे स्वचालित जांच केंद्र: सीबीसी, एलएफटी, केएफटी, हार्मोनल जांच, बायोप्सी एवं त्वरित सटीक रिपोर्ट।",
    servicesEn: [
      "Complete Blood Count (CBC) & Coagulation Profiling",
      "Biochemistry (LFT, KFT, Lipid Profile, HbA1c)",
      "Thyroid, Reproductive Hormone & Tumor Marker Assays",
      "Automated Microbiology & Culture Sensitivity Testing",
      "Histopathology, Biopsy Evaluation & FNAC Cytology",
    ],
    servicesHinglish: [
      "Complete Blood Count (CBC) aur coagulation",
      "LFT, KFT, sugar, lipid profile biochemistry",
      "Thyroid aur hormone marker testing",
      "Culture sensitivity aur infection jaanch",
      "Biopsy tissue report aur FNAC cytology",
    ],
    servicesHi: [
      "संपूर्ण रक्त गणना (CBC) एवं कोएगुलेशन प्रोफाइल",
      "बायोकेमिस्ट्री (LFT, KFT, लिपिड प्रोफाइल, HbA1c)",
      "थायराइड, हार्मोन एवं ट्यूमर मार्कर जांच",
      "स्वचालित माइक्रोबायोलॉजी एवं कल्चर सेंसिटिविटी",
      "हिस्टोपैथोलॉजी, बायोप्सी एवं एफएनएसी (FNAC)",
    ],
  },
  "pain-management": {
    title: "Pain Management & Palliative Care",
    href: "/departments/pain-management",
    descEn:
      "Specialized interventional pain medicine for chronic back pain, sciatica, slip disc, severe cancer pain, arthritis, trigeminal neuralgia, and nerve blocks.",
    descHinglish:
      "Purane kamar dard, sciatica, cancer ke dard, gathiya aur nason ke dard ke liye advanced nerve block aur pain relief injections.",
    descHi:
      "पेन मैनेजमेंट विभाग — पुराने कमर दर्द, साइटिका, जोड़ों के दर्द, कैंसर पेन एवं नसों के दर्द का आधुनिक नर्व ब्लॉक व इंजेक्शन द्वारा निवारण।",
    servicesEn: [
      "Epidural & Facet Joint Injections for Spine Pain",
      "Sciatica & Slip Disc Selective Nerve Root Blocks",
      "Comprehensive Cancer Pain Management & Neurolysis",
      "Radiofrequency Ablation (RFA) for Chronic Joint & Spine Pain",
      "Trigger Point Injections & Musculoskeletal Pain Care",
    ],
    servicesHinglish: [
      "Kamar dard aur sciatica ke liye spine injections",
      "Slip disc aur nerve root block treatment",
      "Cancer dard nivaran (Palliative care)",
      "Joint pain ke liye Radiofrequency Ablation (RFA)",
      "Trigger point aur muscle dard relief",
    ],
    servicesHi: [
      "रीढ़ एवं कमर दर्द हेतु एपिड्यूरल इंजेक्शन",
      "साइटिका एवं स्लिप डिस्क नर्व रूट ब्लॉक्स",
      "कैंसर दर्द का संपूर्ण चिकित्सकीय निवारण",
      "रेडियोफ्रीक्वेंसी एब्लेशन (RFA) दर्द निवारण",
      "मांसपेशी दर्द एवं ट्रिगर पॉइंट थेरेपी",
    ],
  },
  "pediatric-cardiology": {
    title: "Pediatric Cardiology",
    href: "/departments/pediatric-cardiology",
    descEn:
      "Dedicated child heart center for congenital heart defects (ASD, VSD, PDA, TOF - holes in heart), pediatric 2D echocardiography, and blue baby syndrome.",
    descHinglish:
      "Bachhon ke dil me chhed (hole in heart), neela padna, birth heart defect aur pediatric 2D Echo jaanch ka specialized center.",
    descHi:
      "बाल हृदय रोग विभाग — नवजात व बच्चों के दिल में छेद (ASD, VSD, PDA), जन्मजात हृदय रोग, बाल इकोकार्डियोग्राफी एवं परामर्श।",
    servicesEn: [
      "Pediatric 2D Echocardiography & Color Doppler",
      "Congenital Heart Defect Diagnosis (ASD, VSD, PDA, TOF)",
      "Evaluation of Blue Baby Syndrome & Cyanosis",
      "Childhood Arrhythmias, Heart Murmurs & Syncope Clinic",
      "Fetal Echocardiography Screening for Unborn Babies",
    ],
    servicesHinglish: [
      "Bachhon ki 2D Echo aur Color Doppler jaanch",
      "Dil me chhed (ASD, VSD, PDA) ki jaanch",
      "Bachhe ka neela padna aur saans phoolna checkup",
      "Bachhon ki irregular heart beat aur murmur evaluation",
      "Fetal Echo (garbh me bachhe ke dil ki jaanch)",
    ],
    servicesHi: [
      "बाल इकोकार्डियोग्राफी (2D Echo) एवं कलर डॉप्लर",
      "जन्मजात दिल में छेद (ASD, VSD, PDA) की पहचान",
      "नीले बच्चे (Cyanosis) की जांच एवं प्रबंधन",
      "बच्चों की असामान्य हृदय धड़कन का मूल्यांकन",
      "फीटल इकोकार्डियोग्राफी (गर्भस्थ शिशु की जांच)",
    ],
  },
  "pediatric-surgery": {
    title: "Pediatric Surgery",
    href: "/departments/pediatric-surgery",
    descEn:
      "Specialized open and laparoscopic pediatric surgeries for congenital anomalies, neonatal surgical emergencies, pediatric hernia, appendicitis, and pediatric urology.",
    descHinglish:
      "Navjaat shishuon aur bachhon ke hernia, hydrocele, appendix aur birth defects ki expert pediatric surgeon dwara surgery.",
    descHi:
      "बाल शल्य चिकित्सा विभाग — नवजातों व बच्चों की जन्मजात विकृतियां, हर्निया, अपेंडिक्स एवं दूरबीन से बच्चों की सुरक्षित सर्जरी।",
    servicesEn: [
      "Neonatal Emergency Surgeries & Congenital Anomaly Repair",
      "Pediatric Hernia, Hydrocele & Undescended Testis Surgery",
      "Pediatric Laparoscopic Appendectomy & Abdominal Care",
      "Pediatric Urology (Hypospadias, Hydronephrosis, PUV)",
      "Pediatric Trauma & Emergency Surgical Resuscitation",
    ],
    servicesHinglish: [
      "Navjaat shishuon ke birth defects ki surgery",
      "Bachhon ke hernia, hydrocele aur testis operation",
      "Doorbeen se appendix operation (Laparoscopy)",
      "Bachhon ke peshab ki nali ki surgery (Hypospadias)",
      "Pediatric trauma aur accidental surgical care",
    ],
    servicesHi: [
      "नवजात शिशुओं की जन्मजात विकृति सर्जरी",
      "बच्चों का हर्निया, हाइड्रोसील एवं अंडकोष ऑपरेशन",
      "दूरबीन से अपेंडिक्स सर्जरी (लेप्रोस्कोपी)",
      "बाल मूत्र रोग सर्जरी (हाइपोस्पेडियास, किडनी सूजन)",
      "बाल ट्रॉमा एवं आपातकालीन शल्य चिकित्सा",
    ],
  },
  psychiatry: {
    title: "Psychiatry & Behavioral Health",
    href: "/departments/psychiatry",
    descEn:
      "Compassionate mental health clinic offering consultation for anxiety, depression, bipolar disorder, insomnia, de-addiction rehabilitation, and counseling.",
    descHinglish:
      "Tension, depression, anxiety, neend na aana, nasha mukti aur mental health problem ke liye expert psychiatrist consultation.",
    descHi:
      "मनोचिकित्सा विभाग — तनाव (एंजायटी), डिप्रेशन, अनिद्रा, नशे की लत (नशामुक्ति), मानसिक उलझन एवं मनोवैज्ञानिक परामर्श।",
    servicesEn: [
      "Depression, Anxiety, Panic & OCD Management",
      "De-Addiction & Substance Abuse Rehabilitation",
      "Sleep Disorders & Chronic Insomnia Clinic",
      "Bipolar Disorder & Psychosis Treatment",
      "Psychotherapy, Cognitive Behavioral Therapy (CBT) & Counseling",
    ],
    servicesHinglish: [
      "Depression aur tension/chinta ka ilaj",
      "Nasha mukti (alcohol/substance de-addiction)",
      "Neend na aane ki bimari ka treatment",
      "Bipolar aur gambhir mansik rogon ka ilaj",
      "Psychotherapy aur counselling",
    ],
    servicesHi: [
      "अवसाद (डिप्रेशन), घबराहट एवं तनाव प्रबंधन",
      "नशा मुक्ति एवं पुनर्वास परामर्श",
      "अनिद्रा एवं नींद से जुड़ी समस्याओं का इलाज",
      "बायपोलर विकार एवं मनोविकृति चिकित्सा",
      "मनोवैज्ञानिक परामर्श एवं साइकोथेरेपी",
    ],
  },
  radiology: {
    title: "Radiology & Advanced Imaging",
    href: "/departments/radiology",
    descEn:
      "24x7 state-of-the-art diagnostic imaging center with multi-slice CT scan, digital X-Ray, high-resolution 3D/4D ultrasound, color Doppler, and mammography.",
    descHinglish:
      "24x7 Modern CT Scan, Digital X-Ray, 3D/4D Sonography, Color Doppler aur diagnostic imaging report suvidha.",
    descHi:
      "रेडियोलॉजी विभाग — 24 घंटे सीटी स्कैन, डिजिटल एक्स-रे, 3D/4D अल्ट्रासाउंड, कलर डॉप्लर एवं सटीक इमेजिंग डायग्नोस्टिक्स।",
    servicesEn: [
      "24x7 Multi-Slice Whole Body CT Scan & CT Angiography",
      "Digital High-Frequency X-Ray & Special Contrast Studies",
      "High-Resolution 3D / 4D Ultrasound (USG) & Obstetric Scans",
      "Color Doppler for Arterial, Venous & Fetal Circulation",
      "Image-Guided Interventional Biopsies & Fine-Needle Aspirations",
    ],
    servicesHinglish: [
      "24x7 Multi-Slice CT Scan suvidha",
      "Digital X-Ray aur contrast jaanch",
      "3D/4D Ultrasound aur pregnancy scans",
      "Color Doppler (nason ke khoon bahaav ki jaanch)",
      "USG/CT guided biopsy suvidha",
    ],
    servicesHi: [
      "24x7 आधुनिक मल्टी-स्लाइस सीटी स्कैन",
      "डिजिटल एक्स-रे एवं विशेष कंट्रास्ट जांच",
      "3D/4D अल्ट्रासाउंड एवं गर्भावस्था सोनोग्राफी",
      "कलर डॉप्लर रक्त प्रवाह परीक्षण",
      "इमेज-गाइडेड बायोप्सी एवं नैदानिक प्रक्रियाएं",
    ],
  },
};

function getDepartmentDetail(slug: string, name: string): DeptDetailInfo {
  const normSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const normName = name.toLowerCase();

  if (DEPARTMENT_DETAILS_MAP[normSlug]) {
    return DEPARTMENT_DETAILS_MAP[normSlug];
  }

  for (const [key, val] of Object.entries(DEPARTMENT_DETAILS_MAP)) {
    if (
      normSlug.includes(key) ||
      key.includes(normSlug) ||
      normName.includes(key)
    ) {
      return val;
    }
  }

  if (normSlug.includes("ivf") || normName.includes("fertility") || normSlug.includes("fertility")) {
    return DEPARTMENT_DETAILS_MAP["ivf-fertility"];
  }
  if (normSlug.includes("cardio") || normName.includes("heart")) {
    return DEPARTMENT_DETAILS_MAP["cardiology"];
  }
  if (normSlug.includes("neuro") || normName.includes("brain") || normName.includes("spine")) {
    return DEPARTMENT_DETAILS_MAP["neurosurgery"];
  }
  if (normSlug.includes("gastro") || normName.includes("liver") || normName.includes("stomach")) {
    return DEPARTMENT_DETAILS_MAP["gastroenterology"];
  }
  if (normSlug.includes("nephro") || normName.includes("kidney")) {
    return DEPARTMENT_DETAILS_MAP["nephrology"];
  }
  if (normSlug.includes("uro") || normName.includes("urine") || normName.includes("prostate")) {
    return DEPARTMENT_DETAILS_MAP["urology"];
  }
  if (normSlug.includes("ortho") || normName.includes("bone") || normName.includes("joint")) {
    return DEPARTMENT_DETAILS_MAP["orthopedics"];
  }
  if (normSlug.includes("gynae") || normName.includes("women") || normName.includes("obstetric")) {
    return DEPARTMENT_DETAILS_MAP["gynaecology"];
  }
  if (normSlug.includes("pediatric-cardio")) {
    return DEPARTMENT_DETAILS_MAP["pediatric-cardiology"];
  }
  if (normSlug.includes("pediatric-surg")) {
    return DEPARTMENT_DETAILS_MAP["pediatric-surgery"];
  }
  if (normSlug.includes("pediatric") || normName.includes("child")) {
    return DEPARTMENT_DETAILS_MAP["pediatrics"];
  }
  if (normSlug.includes("onco") || normName.includes("cancer")) {
    return DEPARTMENT_DETAILS_MAP["oncology"];
  }
  if (normSlug.includes("ent") || normName.includes("ear") || normName.includes("throat")) {
    return DEPARTMENT_DETAILS_MAP["ent"];
  }
  if (normSlug.includes("ophthal") || normName.includes("eye")) {
    return DEPARTMENT_DETAILS_MAP["ophthalmology"];
  }
  if (normSlug.includes("dental") || normName.includes("teeth")) {
    return DEPARTMENT_DETAILS_MAP["dental"];
  }
  if (normSlug.includes("pulmo") || normSlug.includes("respiratory") || normName.includes("chest")) {
    return DEPARTMENT_DETAILS_MAP["respiratory"];
  }
  if (normSlug.includes("burn") || normSlug.includes("plastic")) {
    return DEPARTMENT_DETAILS_MAP["burns-plastic-surgery"];
  }
  if (normSlug.includes("diabetic") || normSlug.includes("foot")) {
    return DEPARTMENT_DETAILS_MAP["diabetic-foot"];
  }
  if (normSlug.includes("diet") || normSlug.includes("nutrition")) {
    return DEPARTMENT_DETAILS_MAP["dietetics-nutrition"];
  }
  if (normSlug.includes("interventional") || normSlug.includes("ir")) {
    return DEPARTMENT_DETAILS_MAP["interventional-radiology"];
  }
  if (normSlug.includes("pathology") || normSlug.includes("lab")) {
    return DEPARTMENT_DETAILS_MAP["laboratory-medicine"];
  }
  if (normSlug.includes("pain")) {
    return DEPARTMENT_DETAILS_MAP["pain-management"];
  }
  if (normSlug.includes("psychiatr") || normName.includes("mental")) {
    return DEPARTMENT_DETAILS_MAP["psychiatry"];
  }
  if (normSlug.includes("radio") || normSlug.includes("imaging") || normSlug.includes("xray") || normSlug.includes("ct")) {
    return DEPARTMENT_DETAILS_MAP["radiology"];
  }
  if (normSlug.includes("surgery")) {
    return DEPARTMENT_DETAILS_MAP["general-surgery"];
  }

  return {
    title: name,
    href: `/departments/${normSlug}`,
    descEn: `${name} at Popular Hospital, Varanasi offers comprehensive outpatient consultations, diagnostics, advanced medical care, and specialized inpatient facilities under experienced consultants.`,
    descHinglish: `Popular Hospital, Varanasi me ${name} department expert consultants ke under modern medical care, OPD consultations, aur advanced treatment suvidhaayein pradaan karta hai.`,
    descHi: `पॉपुलर हॉस्पिटल, वाराणसी का ${name} विभाग अनुभवी विशेषज्ञ डॉक्टरों की देखरेख में आधुनिक परामर्श, नैदानिक सुविधाएं एवं उच्च गुणवत्तापूर्ण स्वास्थ्य सेवाएं प्रदान करता है।`,
    servicesEn: [
      "Specialist OPD Consultations & Diagnostic Workup",
      "Advanced Inpatient & Emergency Medical Care",
      "Multi-Disciplinary Team Coordination",
      "24x7 Diagnostic & Pharmacy Support",
    ],
    servicesHinglish: [
      "Specialist doctors dwara OPD consultation",
      "Advanced diagnostic test aur medical care",
      "Multi-disciplinary treatment planning",
      "24x7 Emergency aur pharmacy suvidha",
    ],
    servicesHi: [
      "विशेषज्ञ डॉक्टरों द्वारा ओपीडी परामर्श एवं जांच",
      "उन्नत इनपेशेंट एवं आपातकालीन चिकित्सा सेवाएं",
      "मल्टी-डिसीप्लिनरी स्वास्थ्य प्रबंधन",
      "24x7 डायग्नोस्टिक एवं फार्मेसी सहायता",
    ],
  };
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
    en: `⚠️ **This may be a medical emergency. Please call immediately.**\n\n🚑 **Ambulance Service in Varanasi, Call at:** ${AMBULANCE_PHONE.label}\n🏥 **Contact Us:** ${EMERGENCY_CONTACTS[0].label}\n🏥 **Contact Us:** ${EMERGENCY_CONTACTS[1].label}\n\nPlease call now or visit our 24x7 Emergency & Casualty department.`,
    hinglish: `⚠️ **Yeh medical emergency ho sakti hai. Kripya turant call karein.**\n\n🚑 **Varanasi Ambulance Service, turant call karein:** ${AMBULANCE_PHONE.label}\n🏥 **Contact Us:** ${EMERGENCY_CONTACTS[0].label}\n🏥 **Contact Us:** ${EMERGENCY_CONTACTS[1].label}\n\nAmbulance ya emergency help ke liye abhi call karein, ya hamare 24x7 Emergency & Casualty department aayein.`,
    hi: `⚠️ **यह मेडिकल इमरजेंसी हो सकती है। कृपया तुरंत कॉल करें।**\n\n🚑 **वाराणसी एम्बुलेंस सेवा, तुरंत कॉल करें:** ${AMBULANCE_PHONE.label}\n🏥 **संपर्क करें:** ${EMERGENCY_CONTACTS[0].label}\n🏥 **संपर्क करें:** ${EMERGENCY_CONTACTS[1].label}\n\nएम्बुलेंस या इमरजेंसी सहायता के लिए अभी कॉल करें, या हमारे 24x7 इमरजेंसी एवं कैजुअल्टी विभाग में आएं।`,
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
  phoneConfirmPrompt: {
    en: (phone: string) =>
      `Please confirm: Is **${phone}** your real and active mobile number? Our team may call this number regarding your appointment.`,
    hinglish: (phone: string) =>
      `Kripya confirm karein: Kya **${phone}** aapka real aur active mobile number hai? Appointment ke liye hamari team isi number par call kar sakti hai.`,
    hi: (phone: string) =>
      `कृपया पुष्टि करें: क्या **${phone}** आपका सही और चालू मोबाइल नंबर है? अपॉइंटमेंट के लिए हमारी टीम इसी नंबर पर कॉल कर सकती है।`,
  },
  phoneConfirmYesChip: {
    en: "Yes, this is my number",
    hinglish: "Haan, ye mera number hai",
    hi: "हाँ, यह मेरा नंबर है",
  },
  phoneConfirmNoChip: {
    en: "No, change number",
    hinglish: "Nahi, number badlein",
    hi: "नहीं, नंबर बदलें",
  },
  askNewPhone: {
    en: "No problem. Please enter your correct 10-digit mobile number.",
    hinglish: "Koi baat nahi. Kripya apna sahi 10 digit mobile number dobara batayein.",
    hi: "कोई बात नहीं। कृपया अपना सही 10 अंकों का मोबाइल नंबर दोबारा दर्ज करें।",
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
    aboutHospital: {
      en: "Tell me about Popular Hospital",
      hinglish: "Tell me about Popular Hospital",
      hi: "पॉपुलर हॉस्पिटल के बारे में बताएं",
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

const BASE_HOSPITAL_DEPARTMENTS: Speciality[] = [
  { _id: "cardiology", name: "Cardiology", slug: "cardiology", nameHi: "कार्डियोलॉजी (हृदय रोग)" },
  { _id: "ivf-fertility", name: "IVF & Fertility", slug: "ivf-fertility", nameHi: "आईवीएफ एवं फर्टिलिटी" },
  { _id: "neurosurgery", name: "Neurology & Neurosurgery", slug: "neurosurgery", nameHi: "न्यूरोलॉजी एवं न्यूरोसर्जरी" },
  { _id: "orthopedics", name: "Orthopedics & Joint Replacement", slug: "orthopedics", nameHi: "ऑर्थोपेडिक्स (हड्डी व जोड़)" },
  { _id: "gastroenterology", name: "Gastroenterology", slug: "gastroenterology", nameHi: "गैस्ट्रोएंटरोलॉजी (पेट व लिवर)" },
  { _id: "oncology", name: "Oncology (Cancer Care)", slug: "oncology", nameHi: "ऑन्कोलॉजी (कैंसर केयर)" },
  { _id: "nephrology", name: "Nephrology & Dialysis", slug: "nephrology", nameHi: "नेफ्रोलॉजी एवं डायलिसिस" },
  { _id: "urology", name: "Urology", slug: "urology", nameHi: "यूरोलॉजी (मूत्र रोग)" },
  { _id: "pediatrics", name: "Pediatrics & Neonatology", slug: "pediatrics", nameHi: "पीडियाट्रिक्स एवं एनआईसीयू" },
  { _id: "gynaecology", name: "Obstetrics & Gynaecology", slug: "gynaecology", nameHi: "स्त्री एवं प्रसूति रोग" },
  { _id: "respiratory", name: "Respiratory Medicine", slug: "respiratory", nameHi: "रेस्पिरेटरी मेडिसिन" },
  { _id: "general-medicine", name: "General Medicine", slug: "general-medicine", nameHi: "जनरल मेडिसिन" },
  { _id: "general-surgery", name: "General & Laparoscopic Surgery", slug: "general-surgery", nameHi: "जनरल व लेप्रोस्कोपिक सर्जरी" },
  { _id: "ent", name: "ENT (Ear, Nose & Throat)", slug: "ent", nameHi: "ईएनटी (कान, नाक, गला)" },
  { _id: "ophthalmology", name: "Ophthalmology (Eye Care)", slug: "ophthalmology", nameHi: "नेत्र रोग" },
  { _id: "dental", name: "Dental Care", slug: "dental", nameHi: "दंत चिकित्सा" },
  { _id: "burns-plastic-surgery", name: "Burns & Plastic Surgery", slug: "burns-plastic-surgery", nameHi: "प्लास्टिक सर्जरी" },
  { _id: "diabetic-foot", name: "Diabetic Foot Care", slug: "diabetic-foot", nameHi: "डायबिटिक फुट केयर" },
  { _id: "dietetics-nutrition", name: "Dietetics & Nutrition", slug: "dietetics-nutrition", nameHi: "डाइट एवं न्यूट्रिशन" },
  { _id: "interventional-radiology", name: "Interventional Radiology", slug: "interventional-radiology", nameHi: "इंटरवेंशनल रेडियोलॉजी" },
  { _id: "laboratory-medicine", name: "Laboratory Medicine", slug: "laboratory-medicine", nameHi: "लैबोरेटरी मेडिसिन" },
  { _id: "pain-management", name: "Pain Management", slug: "pain-management", nameHi: "पेन मैनेजमेंट" },
  { _id: "pathology", name: "Pathology", slug: "pathology", nameHi: "पैथोलॉजी" },
  { _id: "pediatric-cardiology", name: "Pediatric Cardiology", slug: "pediatric-cardiology", nameHi: "बाल हृदय रोग" },
  { _id: "pediatric-surgery", name: "Pediatric Surgery", slug: "pediatric-surgery", nameHi: "बाल शल्य चिकित्सा" },
  { _id: "psychiatry", name: "Psychiatry", slug: "psychiatry", nameHi: "मनोचिकित्सा" },
  { _id: "radiology", name: "Radiology & Imaging", slug: "radiology", nameHi: "रेडियोलॉजी" },
  { _id: "ctvs", name: "Cardiothoracic Surgery (CTVS)", slug: "ctvs", nameHi: "सीटीवीएस सर्जरी" },
];

/* ───────────────────────── Main Component ───────────────────────── */

export default function ChatbotWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("idle");
  const [draft, setDraft] = useState<Draft>({});
  const [specs, setSpecs] = useState<Speciality[]>(BASE_HOSPITAL_DEPARTMENTS);
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

  // Voice Command (Speech Recognition) Toggle
  const toggleVoice = async () => {
    if (listening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setListening(false);
      return;
    }

    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        lang === "hi"
          ? "आपके ब्राउज़र में वॉयस टाइपिंग समर्थित नहीं है। कृपया लिखकर संदेश भेजें।"
          : lang === "hinglish"
            ? "Aapke browser me voice command support nahi hai. Kripya type karein."
            : "Voice command is not supported in this browser. Please type your message.",
      );
      return;
    }

    // Explicitly request microphone permission if supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
      } catch {
        setListening(false);
        const permMsg =
          lang === "hi"
            ? "माइक्रोफ़ोन की अनुमति (Permission) नहीं मिली। कृपया ब्राउज़र एड्रेस बार में माइक की अनुमति दें।"
            : lang === "hinglish"
              ? "Microphone permission allow nahi hai. Kripya browser address bar me mic allow karein."
              : "Microphone access was denied. Please allow microphone permission in your browser address bar.";
        alert(permMsg);
        return;
      }
    }

    try {
      const rec = new SpeechRecognition();
      recognitionRef.current = rec;
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = lang === "hi" ? "hi-IN" : "en-IN";

      rec.onstart = () => {
        setListening(true);
      };

      rec.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInput(transcript);
        }
      };

      rec.onerror = (event: any) => {
        setListening(false);
        if (event.error === "not-allowed") {
          const permMsg =
            lang === "hi"
              ? "माइक्रोफ़ोन की अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग्स में माइक को Allow करें।"
              : lang === "hinglish"
                ? "Microphone permission allow nahi hai. Kripya browser me mic permission allow karein."
                : "Microphone access was denied. Please allow microphone permission in your browser.";
          alert(permMsg);
        } else if (event.error !== "no-speech" && event.error !== "aborted") {
          console.warn("Speech recognition notice:", event.error);
        }
      };

      rec.onend = () => {
        setListening(false);
      };

      rec.start();
    } catch (e) {
      console.warn("Voice start notice:", e);
      setListening(false);
    }
  };

  // Preload data + auto-open ONLY on first website load on the home page ("/")
  useEffect(() => {
    fetchSpecialities().then((dbSpecs) => {
      if (dbSpecs && dbSpecs.length > 0) {
        setSpecs((prev) => {
          const map = new Map<string, Speciality>();
          prev.forEach((s) => map.set(s.slug, s));
          dbSpecs.forEach((s) => map.set(s.slug, { ...map.get(s.slug), ...s }));
          return Array.from(map.values());
        });
      }
    });
    fetchBranches().then(setBranches);

    // Auto-open rules:
    // 1. Only on the home page ("/")
    // 2. Only on the first load of the website (sessionStorage check)
    // 3. Never auto-open on other pages, or when navigating to home from other pages
    if (typeof window !== "undefined") {
      const alreadyHandled = sessionStorage.getItem("popular_chatbot_auto_opened");
      const currentPath = pathname || window.location.pathname || "";
      const isHomePage = currentPath === "/";

      if (!alreadyHandled) {
        // Mark as handled immediately so future navigations or visits in this session never auto-open
        sessionStorage.setItem("popular_chatbot_auto_opened", "true");

        if (isHomePage) {
          const t = setTimeout(() => setOpen(true), 1200);
          return () => clearTimeout(t);
        }
      }
    }
  }, [pathname]);

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
          STRINGS.chips.aboutHospital.en,
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

  const showDepartmentInfo = async (
    spec: Speciality,
    currentLang: Lang = lang,
  ) => {
    lastSpecialityRef.current = spec;
    const info = getDepartmentDetail(spec.slug, spec.name);
    const deptTitle =
      currentLang === "hi" ? spec.nameHi || info.title : info.title;

    const desc =
      currentLang === "hi"
        ? info.descHi
        : currentLang === "hinglish"
          ? info.descHinglish
          : info.descEn;

    const services =
      currentLang === "hi"
        ? info.servicesHi
        : currentLang === "hinglish"
          ? info.servicesHinglish
          : info.servicesEn;

    const servicesHeader =
      currentLang === "hi"
        ? "प्रमुख सुविधाएं एवं उपचार:"
        : currentLang === "hinglish"
          ? "Pramukh Suvidhaayein & Treatments:"
          : "Key Services & Treatments:";

    const servicesList = services.slice(0, 5).map((s) => `• ${s}`).join("\n");
    const overviewText = `🏥 **${deptTitle}**\n\n${desc}\n\n${servicesHeader}\n${servicesList}`;

    const deptHref = info.href || `/departments/${spec.slug}`;
    const pageBtnLabel =
      currentLang === "hi"
        ? `वेबसाइट पर ${deptTitle} देखें ↗`
        : currentLang === "hinglish"
          ? `${deptTitle} Page Dekhein ↗`
          : `View ${deptTitle} Page ↗`;

    setTyping(true);
    let docs: Doctor[] = [];
    try {
      docs = await fetchDoctors({ speciality: spec.slug });
    } catch {
      docs = [];
    }
    setTyping(false);
    setDocsOfSpec(docs);

    if (docs.length > 0) {
      await botSay({
        text: overviewText,
        actionLink: {
          label: pageBtnLabel,
          href: deptHref,
        },
      });

      const docsTitle =
        currentLang === "hi"
          ? `👨‍⚕️ **${deptTitle} के विशेषज्ञ डॉक्टर्स:**`
          : currentLang === "hinglish"
            ? `👨‍⚕️ **${deptTitle} Specialist Doctors:**`
            : `👨‍⚕️ **Specialist Doctors for ${deptTitle}:**`;

      await botSay(
        {
          text: docsTitle,
          doctors: docs.slice(0, 6),
          doctorsPick: false,
          chips: [
            STRINGS.chips.bookAppointment[currentLang],
            STRINGS.chips.viewAllDepts[currentLang],
            STRINGS.chips.callUs[currentLang],
          ],
        },
        300,
      );
    } else {
      const bookDeptChip =
        currentLang === "hi"
          ? `${deptTitle} में अपॉइंटमेंट`
          : currentLang === "hinglish"
            ? `${deptTitle} Appointment`
            : `Book ${deptTitle}`;

      await botSay({
        text: overviewText,
        actionLink: {
          label: pageBtnLabel,
          href: deptHref,
        },
        chips: [
          bookDeptChip,
          STRINGS.chips.viewAllDepts[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
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

  const askPhoneConfirmation = (
    phone: string,
    currentLang: Lang = lang,
  ) => {
    setStep("phone_confirm");
    return botSay({
      text: STRINGS.phoneConfirmPrompt[currentLang](phone),
      chips: [
        STRINGS.phoneConfirmYesChip[currentLang],
        STRINGS.phoneConfirmNoChip[currentLang],
      ],
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
      const timeStr = formatTimeToAmPm(d.time!);
      await botSay({
        text: STRINGS.bookingSuccess[currentLang](
          d,
          branch.name,
          timeStr,
        ),
        success: true,
        chips: [STRINGS.chips.findDoctor[currentLang]],
      });
      speakBookingConfirmation(d, currentLang, timeStr);
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

  const handleSend = async (raw?: string, forcedLang?: Lang) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    push({ role: "user", text });

    // Detect language dynamically from user input
    const detected = forcedLang || detectLang(text);
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
          STRINGS.chips.aboutHospital[currentLang],
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

    // Emergency/ambulance requests always take priority, even during booking.
    if (isEmergency(text)) {
      setStep("idle");
      setDraft({});
      lastSpecialityRef.current = null;
      return botSay({
        text: STRINGS.emergencyAlert[currentLang],
        emergencyPhones: true,
      });
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

        // A phone number here implicitly confirms the name, but the number still needs verification.
        const digits = text.replace(/[\s\-+]/g, "");
        if (/^\d{10,15}$/.test(digits)) {
          setDraft((d) => ({ ...d, phone: digits }));
          return askPhoneConfirmation(digits, currentLang);
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
        return askPhoneConfirmation(digits, currentLang);
      }

      case "phone_confirm": {
        const digits = text.replace(/[\s\-+]/g, "");

        // Allow the user to type a replacement number directly.
        if (/^\d{10,15}$/.test(digits)) {
          setDraft((d) => ({ ...d, phone: digits }));
          return askPhoneConfirmation(digits, currentLang);
        }

        if (isNameConfirmYes(text)) {
          if (draft.speciality) {
            setStep("doctor");
            return showDoctors(draft.speciality, true, currentLang);
          }
          return askSpeciality(currentLang);
        }

        if (isNameConfirmNo(text)) {
          setDraft((d) => ({ ...d, phone: undefined }));
          setStep("phone");
          return botSay({ text: STRINGS.askNewPhone[currentLang] });
        }

        return botSay({
          text: STRINGS.phoneConfirmPrompt[currentLang](draft.phone || ""),
          chips: [
            STRINGS.phoneConfirmYesChip[currentLang],
            STRINGS.phoneConfirmNoChip[currentLang],
          ],
        });
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

    // 1. Existing booking / appointment confirmation intent. Never expose
    // patient booking data using only a phone number; route confirmation to
    // the hospital's dedicated second contact number instead.
    if (isAppointmentStatusQuery(text)) {
      return botSay({
        text: getAppointmentStatusHelpText(currentLang),
        phones: true,
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

    // 3.5 Popular Hospital brand information and location intent
    const popularHospitalIntent = detectPopularHospitalIntent(text);
    if (popularHospitalIntent) {
      const isLocation = popularHospitalIntent === "location";
      return botSay({
        text: isLocation
          ? getPopularHospitalLocationText(currentLang)
          : getPopularHospitalAboutText(currentLang),
        actionLink: {
          label: isLocation
            ? currentLang === "hi"
              ? "Google Maps पर रास्ता देखें"
              : currentLang === "hinglish"
                ? "Google Maps Directions Dekhein"
                : "Open Google Maps Directions"
            : currentLang === "hi"
              ? "पॉपुलर हॉस्पिटल के बारे में और पढ़ें"
              : currentLang === "hinglish"
                ? "Popular Hospital ke baare me aur padhein"
                : "Learn more about Popular Hospital",
          href: isLocation ? HOSPITAL_MAP_URL : "/about",
        },
        chips: [
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    // 3.55 Leadership & Executive Desks Intent (Chairman, Vice-Chairman, MD)
    const isViceChairmanQuery =
      /\b(?:vice\s*chairman|vice-chairman|vice\s*chair\s*man|vc\s*desk|dr\.?\s*mohit|mohit\s*kaushik|mohit\s*sir)\b/i.test(
        lower,
      ) || /(वाइस\s*चेयरमैन|उपाध्यक्ष|मोहित\s*कौशिक)/.test(text);

    const isChairmanQuery =
      !isViceChairmanQuery &&
      (/\b(?:chairman|chairperson|chair\s*man|chairman\s*desk|founder\b|dr\.?\s*a\.?k\.?\s*kaushik|a\.?k\.?\s*kaushik|ak\s*kaushik|kaushik\s*sir)\b/i.test(
        lower,
      ) || /(चेयरमैन|अध्यक्ष|ए\.?\s*के\.?\s*कौशिक|कौशिक\s*सर|संस्थापक)/.test(text));

    const isMdQuery =
      /\b(?:managing\s*director|m\.?d\.?\s*desk|\bmd\b|dr\.?\s*kiran|kiran\s*kaushik|kiran\s*ma'am|kiran\s*mam)\b/i.test(
        lower,
      ) || /(मैनेजिंग\s*डायरेक्टर|प्रबंध\s*निदेशक|\bएमडी\b|किरण\s*कौशिक)/.test(text);

    const isLeadershipQuery =
      /\b(?:leadership|management\s*team|hospital\s*directors|hospital\s*owners|who\s+runs\s+(?:the\s+)?hospital)\b/i.test(
        lower,
      ) || /(लीडरशिप|प्रबंधन|मैनेजमेंट)/.test(text);

    if (isViceChairmanQuery) {
      const viceChairmanText =
        currentLang === "hi"
          ? `👨‍⚕️ **डॉ. मोहित कौशिक — वाइस चेयरमैन**\nपॉपुलर हॉस्पिटल | MBBS (स्वर्ण पदक विजेता, IMS-BHU), MS (AIIMS नई दिल्ली)\n\n📌 **संक्षिप्त परिचय (Summary):**\nएम्स नई दिल्ली से प्रशिक्षित, 3 वर्ष के रीनल ट्रांसप्लांट एवं रोबोटिक सर्जरी रिसर्च अनुभव के साथ, डॉ. मोहित कौशिक "Patient First, Always" के संकल्प के साथ अस्पताल में आधुनिक सर्जिकल तकनीकों और तकनीकी नवाचार का नेतृत्व कर रहे हैं।`
          : currentLang === "hinglish"
            ? `👨‍⚕️ **Dr. Mohit Kaushik — Vice Chairman**\nPopular Hospital | MBBS (Gold Medalist, IMS-BHU), MS (Gen. Surgery, AIIMS New Delhi)\n\n📌 **Summary:**\nAIIMS New Delhi se trained, 3 saal renal transplant exposure aur robotic surgery research ke saath, Dr. Mohit Kaushik "Patient First, Always" philosophy ke tahat hospital me surgical innovation aur modern healthcare systems ka netritva kar rahe hain.`
            : `👨‍⚕️ **Dr. Mohit Kaushik — Vice Chairman**\nPopular Hospital | MBBS (Gold Medalist, IMS-BHU), MS (Gen. Surgery, AIIMS New Delhi)\n\n📌 **Summary:**\nTrained at AIIMS New Delhi with 3 years of renal transplant exposure and robotic surgery research, Dr. Mohit Kaushik leads surgical innovation and healthcare transformation under the guiding principle: "Patient First, Always."`;

      return botSay({
        text: viceChairmanText,
        actionLink: {
          label:
            currentLang === "hi"
              ? "वाइस चेयरमैन डेस्क पढ़ें"
              : currentLang === "hinglish"
                ? "Read Vice Chairman's Desk"
                : "Read Vice Chairman's Desk",
          href: "/about/vice-chairman-desk",
        },
        chips: [
          "Chairman Desk",
          "MD Desk",
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    if (isChairmanQuery) {
      const chairmanText =
        currentLang === "hi"
          ? `👨‍⚕️ **डॉ. ए.के. कौशिक — चेयरमैन**\nपॉपुलर ग्रुप ऑफ हॉस्पिटल्स | MBBS, MS (जनरल सर्जरी) - IMS, BHU\n\n📌 **संक्षिप्त परिचय (Summary):**\nपॉपुलर हॉस्पिटल के संस्थापक डॉ. ए.के. कौशिक ने पिछले 40 वर्षों में इसे पूर्वांचल का प्रमुख मल्टी सुपर-स्पेशियलिटी अस्पताल बनाया है। उनका विज़न समर्पित नर्सिंग केयर, नैतिक चिकित्सा और अत्याधुनिक क्रिटिकल केयर सुविधाएं प्रदान करना है।`
          : currentLang === "hinglish"
            ? `👨‍⚕️ **Dr. A.K. Kaushik — Chairman**\nPopular Group of Hospitals | MBBS, MS (Gen. Surgery) - IMS, BHU\n\n📌 **Summary:**\nPopular Hospital ke Founder Dr. A.K. Kaushik ne 4 dashakon se hospital ko Purvanchal ka leading super-specialty hospital banaya hai. Unka focus dedicated nursing care, ethical treatment aur advanced critical care technology par hai.`
            : `👨‍⚕️ **Dr. A.K. Kaushik — Chairman**\nPopular Group of Hospitals | MBBS, MS (Gen. Surgery) - IMS, BHU\n\n📌 **Summary:**\nFounder of Popular Hospital, Dr. A.K. Kaushik has steered its growth for over 4 decades into Purvanchal's leading tertiary-care hospital. His mission centers on compassionate nursing care, ethical medicine, patient-friendly services, and advanced critical care technology.`;

      return botSay({
        text: chairmanText,
        actionLink: {
          label:
            currentLang === "hi"
              ? "चेयरमैन डेस्क पढ़ें"
              : currentLang === "hinglish"
                ? "Read Chairman's Desk"
                : "Read Chairman's Desk",
          href: "/about/chairman-desk",
        },
        chips: [
          "Vice Chairman Desk",
          "MD Desk",
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    if (isMdQuery) {
      const mdText =
        currentLang === "hi"
          ? `👩‍⚕️ **डॉ. किरण कौशिक — प्रबंध निदेशक (MD)**\nपॉपुलर ग्रुप ऑफ हॉस्पिटल्स एवं एकेडमिक्स | MBBS, MD (Obs & Gynae), MS-BHU\n\n📌 **संक्षिप्त परिचय (Summary):**\nवरिष्ठ स्त्री एवं प्रसूति रोग व फर्टिलिटी विशेषज्ञ, डॉ. किरण कौशिक के 30+ वर्षों के कुशल नेतृत्व में अस्पताल ने मिर्जापुर, चुनार व भदोही में विस्तार किया है। वे 24x7 इमरजेंसी, डायग्नोस्टिक्स व उच्च स्तरीय मातृ एवं शिशु स्वास्थ्य सेवाओं की अग्रदूत हैं।`
          : currentLang === "hinglish"
            ? `👩‍⚕️ **Dr. Kiran Kaushik — Managing Director (MD)**\nPopular Group of Hospitals & Academics | MBBS, MD (Obs & Gynae), MS-BHU\n\n📌 **Summary:**\nSenior Gynaecologist aur Fertility expert, Dr. Kiran Kaushik ne 30+ saalon ke anubhav ke saath Popular Hospital ka vistar Purvanchal (Mirzapur, Chunar, Bhadohi) me kiya hai. Unka focus 24x7 emergency diagnostics aur mother & child healthcare par hai.`
            : `👩‍⚕️ **Dr. Kiran Kaushik — Managing Director (MD)**\nPopular Group of Hospitals & Academics | MBBS, MD (Obs & Gynae), MS-BHU\n\n📌 **Summary:**\nA senior Obstetrics, Gynecology & Fertility expert with 30+ years of healthcare leadership, Dr. Kiran Kaushik has driven the hospital's expansion across Purvanchal with 24x7 emergency care, advanced diagnostics, and excellence in women & child health.`;

      return botSay({
        text: mdText,
        actionLink: {
          label:
            currentLang === "hi"
              ? "एमडी डेस्क पढ़ें"
              : currentLang === "hinglish"
                ? "Read MD's Desk"
                : "Read MD's Desk",
          href: "/about/md-desk",
        },
        chips: [
          "Chairman Desk",
          "Vice Chairman Desk",
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    if (isLeadershipQuery) {
      const leadershipText =
        currentLang === "hi"
          ? `🏥 **पॉपुलर हॉस्पिटल — मुख्य नेतृत्व (Executive Leadership):**\n\n• 👨‍⚕️ **डॉ. ए.के. कौशिक** — चेयरमैन (संस्थापक)\n• 👨‍⚕️ **डॉ. मोहित कौशिक** — वाइस चेयरमैन (एम्स नई दिल्ली प्रशिक्षित)\n• 👩‍⚕️ **डॉ. किरण कौशिक** — प्रबंध निदेशक (MD & सीनियर गायनेकोलॉजिस्ट)\n\n📌 किसी विशिष्ट डेस्क का संक्षिप्त विवरण देखने के लिए नीचे दिए गए विकल्प चुनें:`
          : currentLang === "hinglish"
            ? `🏥 **Popular Hospital — Executive Leadership:**\n\n• 👨‍⚕️ **Dr. A.K. Kaushik** — Chairman (Founder)\n• 👨‍⚕️ **Dr. Mohit Kaushik** — Vice Chairman (AIIMS New Delhi Trained)\n• 👩‍⚕️ **Dr. Kiran Kaushik** — Managing Director (MD & Senior Gynaecologist)\n\n📌 Kisi specific desk ki summary dekhne ke liye niche diye chips par tap karein:`
            : `🏥 **Popular Hospital — Executive Leadership:**\n\n• 👨‍⚕️ **Dr. A.K. Kaushik** — Chairman (Founder)\n• 👨‍⚕️ **Dr. Mohit Kaushik** — Vice Chairman (AIIMS New Delhi Trained)\n• 👩‍⚕️ **Dr. Kiran Kaushik** — Managing Director (MD & Senior Gynaecologist)\n\n📌 Tap any of the options below to read a summary:`;

      return botSay({
        text: leadershipText,
        chips: [
          "Chairman Desk",
          "Vice Chairman Desk",
          "MD Desk",
          STRINGS.chips.bookAppointment[currentLang],
        ],
      });
    }

    // 3.6 Hospital Timings & OPD Schedule Intent (Instant zero-latency response)
    const isHospitalTimingQuery =
      /\b(?:opd\s*(?:time|timing|timings|hours|schedule)|(?:popular\s+)?hospital\s*(?:time|timing|timings|hours|schedule)|(?:time|timing|timings|hours)\s+of\s+(?:popular\s+)?hospital|visiting\s*(?:time|timing|hours)|kab\s*khul(?:ta|ti)|kab\s*band\s*ho(?:ta|ti)|khulne\s*ka\s*samay|band\s*hone\s*ka\s*samay|doctor\s*kab\s*baith(?:te|enge))\b/i.test(
        lower,
      ) ||
      /^(?:timing|timings|opd timing|hospital timing|visiting hours|hospital time|popular hospital time)$/i.test(
        lower.trim(),
      ) ||
      /(ओपीडी\s*का\s*समय|अस्पताल\s*का\s*समय|ओपीडी\s*टाइमिंग|कब\s*खुलता\s*है|कब\s*खुलती\s*है|विजिटिंग\s*का\s*समय|विजिटिंग\s*टाइम|टाइमिंग)/.test(
        text,
      );

    if (isHospitalTimingQuery) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      const istHour = parseInt(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
        10,
      );
      const isOpdOpen = istHour >= 10 && istHour < 18;

      const timingText =
        currentLang === "hi"
          ? `🏥 **पॉपुलर हॉस्पिटल, वाराणसी — समय सारणी**\n\n• 🩺 **ओपीडी परामर्श:** सुबह 10:00 AM से शाम 06:00 PM (सोमवार – शनिवार)\n• 🚨 **इमरजेंसी व ट्रॉमा केयर:** 24 घंटे सातों दिन (24x7 खुली)\n• 🧪 **पैथोलॉजी लैब व रेडियोलॉजी (CT/X-Ray):** 24x7 उपलब्ध\n• 💊 **फार्मेसी (दवाखाना):** 24x7 उपलब्ध\n• 👥 **मरीजों से मिलने का समय:** शाम 05:00 PM से 07:00 PM\n\n🕒 **वर्तमान समय:** ${timeStr} (IST)\n📊 **ओपीडी स्थिति:** ${
              isOpdOpen
                ? "🟢 अभी खुली है"
                : "🟡 अभी बंद है (अगली ओपीडी कल सुबह 10:00 AM से)"
            }\n📞 **24x7 हेल्पलाइन:** ${PHONES[0].label} / ${PHONES[1].label}`
          : currentLang === "hinglish"
            ? `🏥 **Popular Hospital, Varanasi — Hospital Timings**\n\n• 🩺 **OPD Consultations:** 10:00 AM to 06:00 PM (Monday – Saturday)\n• 🚨 **Emergency & Trauma:** 24x7 Hamesha Khula Hai\n• 🧪 **Pathology Lab & Diagnostics:** 24x7 Available\n• 💊 **Pharmacy:** 24x7 Available\n• 👥 **Patient Visiting Hours:** 05:00 PM to 07:00 PM\n\n🕒 **Live Time:** ${timeStr} (IST)\n📊 **OPD Status:** ${
                isOpdOpen
                  ? "🟢 Abhi OPEN hai"
                  : "🟡 Abhi CLOSED hai (Agla OPD subah 10:00 AM par khulega)"
              }\n📞 **24x7 Helpline:** ${PHONES[0].label} / ${PHONES[1].label}`
            : `🏥 **Popular Hospital, Varanasi — Operating Hours**\n\n• 🩺 **OPD Consultations:** 10:00 AM to 06:00 PM (Monday – Saturday)\n• 🚨 **Emergency, Trauma & Ambulance:** 24x7 Open (Round-the-clock)\n• 🧪 **Pathology Lab & Radiology (CT/X-Ray):** 24x7 Open\n• 💊 **In-house Pharmacy:** 24x7 Open\n• 👥 **Patient Visiting Hours:** 05:00 PM to 07:00 PM\n\n🕒 **Current Live Time:** ${timeStr} (IST)\n📊 **OPD Status Right Now:** ${
                isOpdOpen
                  ? "🟢 Currently OPEN"
                  : "🟡 Currently CLOSED (Next opens tomorrow at 10:00 AM)"
              }\n📞 **24x7 Helpline:** ${PHONES[0].label} / ${PHONES[1].label}`;

      return botSay({
        text: timingText,
        chips: [
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    // 3.7 Real-Time Live Date & Time Intent (Instant zero-latency response)
    const isTimeOnlyQuery =
      /\b(?:what(?:'s|\s+is)?\s+(?:the\s+)?time|what\s+time\s+is\s+it|tell\s+me\s+(?:the\s+)?time|current\s+time|time\s+now|exact\s+time|clock)\b/i.test(
        lower,
      ) ||
      /\b(?:kitne?\s+baje?|baje\s+hai|baje\s+hain|baja\s+hai|baj\s+raha|kitna\s+time|kya\s+time|time\s+kya|samay\s+kya|kya\s+samay|kitna\s+samay|samay\s+batao|time\s+batao|abhi\s+ka\s+time|abhi\s+kitna\s+time|abhi\s+kya\s+time)\b/i.test(
        lower,
      ) ||
      /^(?:time|samay|clock|kitna time|kya time|kitne baje|time batao)$/i.test(
        lower.trim(),
      ) ||
      /(टाइम\s*क्या|क्या\s*टाइम|समय\s*क्या|क्या\s*समय|कितना\s*समय|कितना\s*टाइम|कितने\s*बजे|बज\s*रहे|समय\s*बताएं|समय\s*बताओ|टाइम\s*बताओ)/.test(
        text,
      );

    const isDateOnlyQuery =
      /\b(?:what(?:'s|\s+is)?\s+(?:the\s+)?date|what(?:'s|\s+is)?\s+(?:the\s+)?day|tell\s+me\s+(?:the\s+)?date|current\s+date|today(?:'s)?\s+(?:date|day)|date\s+today|what\s+day\s+is\s+(?:it\s+)?today)\b/i.test(
        lower,
      ) ||
      /\b(?:date\s+batao|tarikh\s+batao|tareekh\s+batao|aaj\s+(?:kya|kaun\s*si|konsi|ki)\s+(?:date|tarikh|tareekh|din|day)|aaj\s+ka\s+(?:din|day|date)|konsi\s+date|kaun\s+si\s+date)\b/i.test(
        lower,
      ) ||
      /^(?:date|tarikh|tareekh|today date|current date|aaj ki date|aaj ka din|aaj konsi date)$/i.test(
        lower.trim(),
      ) ||
      /(आज\s*क्या\s*तारीख|आज\s*कौन\s*सी?\s*तारीख|आज\s*कौन\s*सा\s*दिन|आज\s*की\s*तारीख|तारीख\s*क्या|तारीख\s*बताओ|आज\s*क्या\s*दिन\s*है)/.test(
        text,
      );

    const isDateTimeQuery =
      isTimeOnlyQuery ||
      isDateOnlyQuery ||
      /\b(?:time\s+(?:and|&)\s+date|date\s+(?:and|&)\s+time|time\s+or\s+date)\b/i.test(
        lower,
      );

    if (isDateTimeQuery) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      const dateStrEn = now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      });
      const dateStrHi = now.toLocaleDateString("hi-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      });

      const istHour = parseInt(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
        10,
      );
      const isOpdOpen = istHour >= 10 && istHour < 18;

      let dateTimeText = "";

      if (currentLang === "hi") {
        if (isDateOnlyQuery && !isTimeOnlyQuery) {
          dateTimeText = `📅 **आज की तारीख:** ${dateStrHi}\n🕒 **वर्तमान समय:** ${timeStr} (IST)\n\n🏥 **ओपीडी स्थिति:** ${
            isOpdOpen
              ? "🟢 अभी खुली है (समय: 10:00 AM - 6:00 PM)"
              : "🟡 अभी बंद है (नियमित: 10:00 AM - 6:00 PM)"
          }\n🚨 **इमरजेंसी व एम्बुलेंस:** 24x7 हमेशा उपलब्ध\n\nक्या मैं आपकी अपॉइंटमेंट या डॉक्टर खोजने में मदद करूँ?`;
        } else {
          dateTimeText = `🕒 **अभी का समय:** ${timeStr} (IST)\n📅 **आज की तारीख:** ${dateStrHi}\n\n🏥 **ओपीडी स्थिति:** ${
            isOpdOpen
              ? "🟢 अभी खुली है (समय: 10:00 AM - 6:00 PM)"
              : "🟡 अभी बंद है (नियमित: 10:00 AM - 6:00 PM)"
          }\n🚨 **इमरजेंसी व एम्बुलेंस:** 24x7 हमेशा उपलब्ध\n\nक्या मैं आपकी अपॉइंटमेंट या डॉक्टर खोजने में मदद करूँ?`;
        }
      } else if (currentLang === "hinglish") {
        if (isDateOnlyQuery && !isTimeOnlyQuery) {
          dateTimeText = `📅 **Aaj ki Date:** ${dateStrEn}\n🕒 **Current Time:** ${timeStr} (IST)\n\n🏥 **Hospital OPD Status:** ${
            isOpdOpen
              ? "🟢 Abhi OPEN hai (10:00 AM se 6:00 PM)"
              : "🟡 Abhi CLOSED hai (Regular OPD: 10:00 AM se 6:00 PM)"
          }\n🚨 **Emergency & Ambulance:** 24x7 Hamesha Available\n\nMain aapki appointment booking ya health consultation me kya help kar sakta hoon?`;
        } else {
          dateTimeText = `🕒 **Abhi ka Live Time:** ${timeStr} (IST)\n📅 **Aaj ki Date:** ${dateStrEn}\n\n🏥 **Hospital OPD Status:** ${
            isOpdOpen
              ? "🟢 Abhi OPEN hai (10:00 AM se 6:00 PM)"
              : "🟡 Abhi CLOSED hai (Regular OPD: 10:00 AM se 6:00 PM)"
          }\n🚨 **Emergency & Ambulance:** 24x7 Hamesha Available\n\nMain aapki appointment booking ya health consultation me kya help kar sakta hoon?`;
        }
      } else {
        if (isDateOnlyQuery && !isTimeOnlyQuery) {
          dateTimeText = `📅 **Today's Date:** ${dateStrEn}\n🕒 **Current Time:** ${timeStr} (IST)\n\n🏥 **Hospital OPD Status:** ${
            isOpdOpen
              ? "🟢 Currently OPEN (10:00 AM to 6:00 PM)"
              : "🟡 Currently CLOSED (Regular OPD: 10:00 AM to 6:00 PM)"
          }\n🚨 **Emergency, Trauma & Ambulance:** 24x7 Always Available\n\nHow can I assist you with your healthcare or doctor appointment today?`;
        } else {
          dateTimeText = `🕒 **Current Time:** ${timeStr} (IST)\n📅 **Today's Date:** ${dateStrEn}\n\n🏥 **Hospital OPD Status:** ${
            isOpdOpen
              ? "🟢 Currently OPEN (10:00 AM to 6:00 PM)"
              : "🟡 Currently CLOSED (Regular OPD: 10:00 AM to 6:00 PM)"
          }\n🚨 **Emergency, Trauma & Ambulance:** 24x7 Always Available\n\nHow can I assist you with your healthcare or doctor appointment today?`;
        }
      }

      return botSay({
        text: dateTimeText,
        chips: [
          STRINGS.chips.bookAppointment[currentLang],
          STRINGS.chips.findDoctor[currentLang],
          STRINGS.chips.callUs[currentLang],
        ],
      });
    }

    // 3.8. All Departments general inquiry (e.g. "mujhe saare departement ke baare me batao")
    const isAllDepartmentsQuery =
      /saare depart|all depart|sabhi depart|depart.*list|list.*depart|explore depart|view all depart|koun koun se depart|kaun kaun se depart|saare vibhag|sab vibhag|depart.*naam/i.test(
        lower,
      ) ||
      (/depart/i.test(lower) &&
        /(saare|sabhi|all|list|koun|kaun|show|batao|bataiye|dikhao|pure|sub)/i.test(
          lower,
        ));

    if (isAllDepartmentsQuery) {
      let deptOverviewText = "";
      if (currentLang === "hi") {
        deptOverviewText = `🏥 **पॉपुलर हॉस्पिटल, वाराणसी — 35+ सुपर-स्पेशलिटी विभाग**\n\nलोकप्रिय हॉस्पिटल पूर्वांचल का अग्रणी मल्टी-सुपर स्पेशलिटी अस्पताल है, जहाँ निम्नलिखित प्रमुख विभाग एवं अत्याधुनिक सुविधाएं उपलब्ध हैं:\n\n• **IVF & फर्टिलिटी:** निःसंतानता परामर्श, IUI व टेस्ट ट्यूब बेबी\n• **कार्डियोलॉजी:** हृदय रोग, 24x7 कैथ लैब, एंजियोप्लास्टी\n• **न्यूरोलॉजी व न्यूरोसर्जरी:** मस्तिष्क, नस व रीढ़ की हड्डी\n• **ऑर्थोपेडिक्स:** घुटना व कूल्हा प्रत्यारोपण, फ्रैक्चर ट्रॉमा\n• **गैस्ट्रोएंटरोलॉजी:** पेट, आंत व लिवर रोग, एंडोस्कोपी\n• **ऑन्कोलॉजी:** संपूर्ण कैंसर केयर एवं कीमोथेरेपी\n• **नेफ्रोलॉजी व यूरोलॉजी:** किडनी रोग, डायलिसिस व पथरी\n• **पीडियाट्रिक्स:** नवजात शिशु गहन चिकित्सा (NICU)\n• **स्त्री एवं प्रसूति रोग:** सुरक्षित प्रसव व लेप्रोस्कोपी\n\n👉 आप नीचे दिए गए किसी भी विभाग पर क्लिक करें या उसका नाम लिखें ताकि उस विभाग की विस्तृत जानकारी और विशेषज्ञ डॉक्टर्स देखे जा सकें।`;
      } else if (currentLang === "hinglish") {
        deptOverviewText = `🏥 **Popular Hospital, Varanasi — 35+ Super-Speciality Departments**\n\nPopular Hospital Purvanchal ka leading super-speciality hospital hai, jahan sabhi pramukh departments uplabdh hain:\n\n• **IVF & Fertility:** Infertility checkup, IUI aur test tube baby guidance\n• **Cardiology:** Heart disease, 24x7 Cath Lab, angioplasty\n• **Neurology & Neurosurgery:** Brain, spine aur nerve care\n• **Orthopedics:** Joint replacement (TKR/THR), trauma fracture\n• **Gastroenterology:** Liver, stomach, acidity aur endoscopy\n• **Oncology:** Complete cancer treatment aur chemotherapy\n• **Nephrology & Urology:** Kidney care, dialysis aur stone removal\n• **Pediatrics & NICU:** Shishu rog aur 24x7 intensive care\n• **Gynaecology:** Safe pregnancy, normal delivery aur laparoscopy\n\n👉 Aap kisi bhi department par tap karein ya naam type karein uski puri jankari aur doctors dekhne ke liye:`;
      } else {
        deptOverviewText = `🏥 **Popular Hospital, Varanasi — 35+ Super-Speciality Departments**\n\nPopular Hospital is Purvanchal's premier healthcare institution offering comprehensive care across advanced departments:\n\n• **IVF & Fertility:** Infertility evaluation, IUI & assisted reproduction\n• **Cardiology:** 24x7 Emergency Cardiac Care, Cath Lab & Angioplasty\n• **Neurology & Neurosurgery:** Brain, spine and stroke management\n• **Orthopedics:** Knee & hip replacement, complex trauma\n• **Gastroenterology:** Digestive disorders, liver care & endoscopy\n• **Oncology:** Comprehensive cancer surgery & chemotherapy\n• **Nephrology & Urology:** Kidney dialysis, stone care & andrology\n• **Pediatrics & NICU:** Round-the-clock newborn & pediatric critical care\n• **Obstetrics & Gynaecology:** High-risk pregnancy & laparoscopic surgery\n\n👉 Tap any department below or type its name to view basic overview, key treatments and specialist doctors:`;
      }

      return botSay({
        text: deptOverviewText,
        actionLink: {
          label:
            currentLang === "hi"
              ? "सभी 35+ विभाग वेबसाइट पर देखें ↗"
              : currentLang === "hinglish"
                ? "Sabhi 35+ Departments Dekhein ↗"
                : "Explore All 35+ Departments ↗",
          href: "/departments",
        },
        chips: [
          "IVF & Fertility",
          "Cardiology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Oncology",
          STRINGS.chips.bookAppointment[currentLang],
        ],
      });
    }

    // 4. Exact department or alias match (shows basic info from department page + doctors)
    const exact = findSpeciality(text, specs, true);
    if (exact) {
      return showDepartmentInfo(exact, currentLang);
    }

    // 4b. Department inquiry with keywords (e.g. "ivf ke baare me batao", "what is cardiology", "tell me about ortho")
    const deptInquiry = findSpeciality(text, specs, false);
    if (
      deptInquiry &&
      (/department|depart|vibhag|विभाग|about|baare|batao|bataiye|kya hai|info|details|jaankari|jankari|service|suvidha/i.test(
        lower,
      ) ||
        lower.trim() === deptInquiry.slug ||
        lower.trim() === norm(deptInquiry.name))
    ) {
      return showDepartmentInfo(deptInquiry, currentLang);
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
            emergencyPhones: true,
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

    // 3.5 Tell me about Popular Hospital
    if (
      c === STRINGS.chips.aboutHospital.en ||
      c === STRINGS.chips.aboutHospital.hinglish ||
      c === STRINGS.chips.aboutHospital.hi
    ) {
      push({ role: "user", text: c });
      botSay({
        text: getPopularHospitalAboutText(lang),
        actionLink: {
          label:
            lang === "hi"
              ? "पॉपुलर हॉस्पिटल के बारे में और पढ़ें"
              : lang === "hinglish"
                ? "Popular Hospital ke baare me aur padhein"
                : "Learn more about Popular Hospital",
          href: "/about",
        },
        chips: [
          STRINGS.chips.bookAppointment[lang],
          STRINGS.chips.findDoctor[lang],
          STRINGS.chips.callUs[lang],
        ],
      });
      return;
    }

    // 4. Booking confirmations
    if (
      c === STRINGS.chips.confirmYes.en ||
      c === STRINGS.chips.confirmYes.hinglish ||
      c === STRINGS.chips.confirmYes.hi
    ) {
      return handleSend("yes", lang);
    }

    if (
      c === STRINGS.chips.cancel.en ||
      c === STRINGS.chips.cancel.hinglish ||
      c === STRINGS.chips.cancel.hi
    ) {
      return handleSend("cancel", lang);
    }

    // 5. Date quick chips
    if (
      c === STRINGS.chips.dates.today.en ||
      c === STRINGS.chips.dates.today.hinglish ||
      c === STRINGS.chips.dates.today.hi
    ) {
      return handleSend("today", lang);
    }
    if (
      c === STRINGS.chips.dates.tomorrow.en ||
      c === STRINGS.chips.dates.tomorrow.hinglish ||
      c === STRINGS.chips.dates.tomorrow.hi
    ) {
      return handleSend("tomorrow", lang);
    }
    if (
      c === STRINGS.chips.dates.dayAfter.en ||
      c === STRINGS.chips.dates.dayAfter.hinglish ||
      c === STRINGS.chips.dates.dayAfter.hi
    ) {
      return handleSend("day after tomorrow", lang);
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

    // 8. Department Doctors or Info view chips (e.g. "Cardiology Doctors", "IVF Doctors", "Cardiology Info")
    if (
      c.includes("Doctors") ||
      c.includes("डॉक्टर्स") ||
      c.includes("Info") ||
      c.includes("जानकारी")
    ) {
      const matched =
        findSpeciality(c, specs, true) ||
        symptomSpec(c, specs) ||
        findSpeciality(c, specs);
      push({ role: "user", text: c });
      if (matched) return showDepartmentInfo(matched, lang);
    }

    handleSend(c);
  };

  /* ───────────────────────── Render ───────────────────────── */

  const lastBotId = [...messages].reverse().find((m) => m.role === "bot")?.id;

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-[140px] right-4 z-[9998] flex w-[calc(100vw-2rem)] max-w-[360px] h-[440px] max-h-[calc(100dvh-10.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 md:bottom-24 md:right-6 md:w-[350px] md:max-w-[350px] md:h-[490px] md:max-h-[calc(100vh-8rem)] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
        role="dialog"
        aria-label="Popular Hospital smart chat assistant"
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#0b1c43] to-[#1e3a8a] px-4 py-3 text-white shadow-sm">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
            <img
              src="/images/favicon/favppl.png"
              alt="Popular Hospital"
              className="h-full w-full object-contain"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 text-sm font-extrabold tracking-wide">
              Popular Assistant <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="chatbot-reset"
              onClick={() => handleSend("start again")}
              className="rounded-full p-1.5 text-white/90 transition hover:bg-white/20 hover:text-white"
              title="New Chat / नया चैट शुरू करें"
              aria-label="New Chat"
            >
              <MessageSquarePlus className="h-5 w-5" />
            </button>
            <button
              id="chatbot-close"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/90 transition hover:bg-white/20 hover:text-white"
              title="Close chat"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
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
                    className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
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
                    {renderCleanMessageText(m.text, m.role === "user")}
                  </div>
                )}

                {/* Direct Action Link (e.g. phone call / information page) */}
                {m.actionLink && (
                  <div className="mt-2">
                    <a
                      href={m.actionLink.href}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#0b1c43]/20 bg-white px-3 py-1.5 text-[12px] font-bold text-[#0b1c43] shadow-sm transition hover:border-[#E85222] hover:bg-[#E85222] hover:text-white"
                    >
                      {m.actionLink.href.startsWith("tel:") ? (
                        <Phone className="h-3.5 w-3.5 text-[#E85222]" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5 text-[#E85222]" />
                      )}
                      {m.actionLink.label}
                    </a>
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
                {(m.phones || m.emergencyPhones) && (
                  <div className="mt-2 space-y-2">
                    {(m.emergencyPhones
                      ? [AMBULANCE_PHONE, ...EMERGENCY_CONTACTS]
                      : PHONES
                    ).map((p, index) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-bold text-white shadow-sm transition ${
                          m.emergencyPhones && index === 0
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                      >
                        <Phone className="h-4 w-4" />
                        {m.emergencyPhones &&
                          (index === 0
                            ? lang === "hi"
                              ? "एम्बुलेंस: "
                              : "Ambulance: "
                            : lang === "hi"
                              ? "संपर्क: "
                              : "Contact: ")}
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
                        {(c.includes("Popular Hospital") || c.includes("पॉपुलर हॉस्पिटल")) && (
                          <Sparkles className="mr-1 inline h-3 w-3 text-amber-500" />
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
              listening
                ? lang === "hi"
                  ? "सुन रहा हूँ... बोलिए"
                  : lang === "hinglish"
                    ? "Sun raha hoon... boliye"
                    : "Listening... speak now"
                : lang === "hi"
                  ? "अपना प्रश्न या लक्षण यहाँ लिखें..."
                  : lang === "hinglish"
                    ? "Apna sawal ya bimari yahan likhein..."
                    : "Type your symptom or message..."
            }
            className={`flex-1 rounded-full border bg-slate-50 px-4 py-2.5 text-[13px] text-slate-800 outline-none transition ${
              listening
                ? "border-red-400 bg-red-50/50 ring-2 ring-red-200"
                : "border-slate-200 focus:border-[#0b7a75] focus:bg-white"
            }`}
          />
          <button
            id="chatbot-voice"
            type="button"
            onClick={toggleVoice}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition active:scale-95 ${
              listening
                ? "border-red-500 bg-red-500 text-white animate-pulse shadow-md"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-[#0b7a75] hover:bg-slate-100 hover:text-[#0b7a75]"
            }`}
            title={listening ? "Listening... Tap to stop" : "Voice command (बोलकर पूछें)"}
            aria-label="Voice command"
          >
            {listening ? (
              <Mic className="h-4 w-4 animate-bounce text-white" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </button>
          <button
            id="chatbot-send"
            type="submit"
            disabled={!input.trim() || typing}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E85222] text-white transition hover:bg-[#d1451a] disabled:opacity-50 active:scale-95 shadow-sm"
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
