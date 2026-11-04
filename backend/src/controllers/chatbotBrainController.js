// backend/src/controllers/chatbotBrainController.js
// "Brain": Gemini understands every chatbot message (intent + language + entities + rich reply)
// and the frontend displays the intelligent answer or routes to specialized booking flows.

const BRAIN_INTENTS = [
  "emergency",
  "greeting",
  "book_appointment",
  "find_doctor",
  "department_info",
  "symptom",
  "all_departments",
  "hospital_info",
  "location",
  "timings",
  "datetime",
  "contact",
  "chairman",
  "vice_chairman",
  "md",
  "health_packages",
  "reports",
  "insurance",
  "appointment_status",
  "general_answer",
  "out_of_scope",
];
const BRAIN_LANGS = ["en", "hi", "hinglish"];

const clip = (v, n) => String(v ?? "").slice(0, n);

// Safety net: the chatbot must never praise or recommend other hospitals or providers.
const OTHER_PROVIDER_RE =
  /\b(aiims|apollo|fortis|max\s*(?:super|hospital|healthcare)|medanta|manipal|narayana|paras|heritage|sir\s*sunder\s*lal|bhu\s*hospital|trauma\s*cent(?:re|er)|other\s+hospitals?|another\s+hospital|doosre\s+hospital|dusre\s+hospital|anya\s+aspatal)\b|दूसरे\s+अस्पताल|अन्य\s+अस्पताल|एम्स/i;

const SAFE_REPLY = {
  en: "I can only help with Popular Hospital's services, doctors, departments and appointments. Please call +91-7800001895 or +91-7800001896 and our team will be glad to assist you.",
  hinglish:
    "Main sirf Popular Hospital ki services, doctors, departments aur appointments me madad kar sakta hoon. Kripya +91-7800001895 ya +91-7800001896 par call karein, hamari team aapki madad karegi.",
  hi: "मैं केवल पॉपुलर हॉस्पिटल की सेवाओं, डॉक्टरों, विभागों और अपॉइंटमेंट में सहायता कर सकता हूँ। कृपया +91-7800001895 या +91-7800001896 पर कॉल करें, हमारी टीम आपकी सहायता करेगी।",
};

export const handleChatbotBrain = async (req, res) => {
  try {
    const {
      message,
      sessionLang = "en",
      specialities = [],
      doctorNames = [],
      history = [],
      lastDepartmentSlug = "",
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ success: false, reason: "no_api_key" });
    }

    const session = BRAIN_LANGS.includes(sessionLang) ? sessionLang : "en";
    const deptList = (Array.isArray(specialities) ? specialities : [])
      .slice(0, 80)
      .map((x) => `- ${clip(x.name, 80)} (slug: ${clip(x.slug, 60)})`)
      .join("\n");
    const doctors = (Array.isArray(doctorNames) ? doctorNames : [])
      .slice(0, 250)
      .map((n) => clip(n, 80))
      .join("; ");
    const turns = (Array.isArray(history) ? history : [])
      .slice(-6)
      .map(
        (h) => `${h.role === "bot" ? "Assistant" : "User"}: ${clip(h.text, 300)}`,
      )
      .join("\n");

    const nowIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const systemPrompt = `You are the official understanding and conversational AI assistant for Popular Hospital, Varanasi, India (Website: https://www.popularhospital.in/).
Read the patient's latest message (along with recent conversation context) and classify the intent, extract details, and generate a natural, caring, accurate reply.

HOSPITAL FACTS & KNOWLEDGE BASE:
- Hospital Identity: Popular Hospital (a unit of Popular Medicare Limited) is a premier 450-bed multi super-speciality hospital in Varanasi with 32+ years of medical excellence in Purvanchal and Eastern UP.
- Main Location: N-10/60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh – 221004 (near DLW Ground).
- Other Regional Branches: Chandauli, Mirzapur, Chunar, Bhadohi.
- 24x7 Emergency Helplines: +91-7800001895, +91-7800001896.
- 24x7 Ambulance Service in Varanasi: +91-9519999280.
- Regular OPD Timings: 10:00 AM to 6:00 PM (Monday to Saturday). Emergency, Trauma, ICUs, Dialysis, Pathology, and Pharmacy are open 24x7.
- Key Clinical Facilities: 28+ specialist departments, 100+ expert doctors, 24x7 Advanced Cath Lab (angioplasty, pacemaker), modern ICUs (Medical ICU, Surgical ICU, Neuro ICU, CCU), advanced NICU & PICU for newborns and children, modular operation theatres, dialysis unit, 24x7 pathology lab & diagnostics (CT Scan, X-Ray, HD Ultrasound), 24x7 in-house pharmacy, blood bank.
- Key Specialities:
${deptList || "- Cardiology (cardiology)\n- Neurology (neurology)\n- Orthopedics (orthopedics)\n- IVF & Fertility (ivf-fertility)\n- Gastroenterology (gastroenterology)\n- Oncology (oncology)\n- Nephrology & Dialysis (nephrology)\n- Pediatrics (pediatrics)\n- Gynaecology & Obstetrics (gynaecology)\n- General Medicine (general-medicine)"}
- Hospital Doctors: ${doctors || "Eminent team of 100+ doctors across all super-specialities."}
- Leadership:
  * Founder & Chairman: Dr. A.K. Kaushik (MBBS, MS Gen. Surgery IMS-BHU), 40+ years leading ethical, patient-friendly tertiary care.
  * Vice-Chairman: Dr. Mohit Kaushik (MBBS Gold Medalist IMS-BHU, MS Gen. Surgery AIIMS New Delhi, renal transplant & robotic surgery research), leads technological transformation.
  * Managing Director (MD): Dr. Kiran Kaushik (MBBS, MD Obs & Gynae MS-BHU), 30+ years in women & child health, high-risk pregnancy and IVF.
- Cashless & Insurance: Empanelled with major TPAs and health insurance companies for cashless treatment.
- Current IST Time: ${nowIST}.

Recent conversation:
${turns || "(none)"}
Department being discussed earlier (slug): ${lastDepartmentSlug || "none"}
Session language: ${session}

CONDUCT & BRAND RULES (highest priority):
- You represent ONLY Popular Hospital, Varanasi. Treat https://www.popularhospital.in/ as the single source of truth.
- Always be polite, respectful, warm and calm. Address the patient respectfully (aap / ji / please / thank you).
- Never recommend, compare, praise or even name any other hospital, clinic, doctor, lab, pharmacy, ambulance service or app.
- Never invent facts: doctors, fees, prices, discounts, packages, schemes, equipment, availability or timings that are not given to you. If you are not sure, share +91-7800001895 / +91-7800001896.
- No medical prescription, drug dosages or final diagnosis. For symptoms, give empathetic advice and suggest consulting a Popular Hospital doctor. For emergencies, tell them to call immediately.
- Never confirm or deny patient booking data from mobile numbers.

LANGUAGE RULES:
- "lang" = the language of the patient's LATEST message: "en" (English), "hi" (Hindi in Devanagari script), "hinglish" (Hindi written in English letters).
- If the message is language-neutral, keep the session language "${session}".
- ALWAYS write "reply" in that same language.

INTENTS (pick exactly one):
emergency | greeting | book_appointment | find_doctor | department_info | symptom | all_departments | hospital_info | location | timings | datetime | contact | chairman | vice_chairman | md | health_packages | reports | insurance | appointment_status | general_answer | out_of_scope.

REPLY GUIDELINES:
- For hospital_info (e.g. "popular ke baare me kuchh batao", "popular hospital kaisa hai", "tell me about hospital"): Provide a warm, comprehensive, impressive yet concise overview of Popular Hospital (450 beds, 32+ years in Varanasi, 24x7 emergency & Cath Lab, 28+ departments and 100+ expert doctors), and invite them to book an appointment or consult our specialists.
- For symptom: Empathetically guide the patient to the matching department/doctor and suggest booking a consultation.
- For general_answer / questions about facilities, treatments, or doctors: Answer clearly and accurately from the hospital facts above.
- For out_of_scope: Politely state that you are the official virtual assistant for Popular Hospital, Varanasi and can assist with hospital services, doctor consultations, and appointments.
- For book_appointment / find_doctor / greeting / location / timings / chairman / vice_chairman / md: Provide a friendly 1-2 sentence response accompanying the action.

Respond ONLY with valid JSON:
{
  "lang": "en|hi|hinglish",
  "intent": "<intent>",
  "departmentSlug": "<exact slug from the available departments, or empty string>",
  "doctorName": "<doctor full name if mentioned, else empty string>",
  "isEmergency": false,
  "reply": "<natural, warm, helpful response in user language>"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              { text: `Patient latest message: "${clip(message, 600)}"` },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 400,
          responseMimeType: "application/json",
        },
      }),
    });
    clearTimeout(timeout);

    if (!geminiRes.ok) {
      console.error("[GEMINI BRAIN ERROR]", await geminiRes.text());
      return res.json({ success: false, reason: "gemini_api_error" });
    }

    const data = await geminiRes.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) {
      return res.json({ success: false, reason: "empty_response" });
    }

    let parsed = null;
    try {
      parsed = JSON.parse(candidate);
    } catch {
      const match = candidate.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch {
          parsed = null;
        }
      }
    }
    if (!parsed) return res.json({ success: false, reason: "parse_error" });

    const knownSlugs = new Set((specialities || []).map((x) => x.slug));
    const intent = BRAIN_INTENTS.includes(parsed.intent)
      ? parsed.intent
      : "general_answer";

    return res.json({
      success: true,
      lang: BRAIN_LANGS.includes(parsed.lang) ? parsed.lang : session,
      intent,
      departmentSlug: knownSlugs.has(parsed.departmentSlug)
        ? parsed.departmentSlug
        : "",
      doctorName: clip(parsed.doctorName, 100),
      isEmergency: Boolean(parsed.isEmergency) || intent === "emergency",
      reply: OTHER_PROVIDER_RE.test(String(parsed.reply || ""))
        ? SAFE_REPLY[BRAIN_LANGS.includes(parsed.lang) ? parsed.lang : session]
        : clip(parsed.reply, 750),
    });
  } catch (err) {
    console.error("[CHATBOT BRAIN]", err.message);
    return res.json({ success: false, reason: "error" });
  }
};
