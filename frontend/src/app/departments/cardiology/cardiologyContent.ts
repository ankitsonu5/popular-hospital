// Content for the Cardiology department page.
// Kept in a plain module so both the server page (FAQ schema) and the
// client sections can import it.

export const conditionsTreated = [
  {
    title: "Coronary Artery Disease (CAD)",
    desc: "Narrowing or blockage of the heart arteries due to plaque, causing chest pain (angina) and raising the risk of heart attack.",
  },
  {
    title: "Heart Attack (Myocardial Infarction)",
    desc: "Sudden blockage of blood flow to the heart muscle. Treated on an emergency basis with primary angioplasty and stenting.",
  },
  {
    title: "Chest Pain & Angina",
    desc: "Evaluation of chest pain, tightness or heaviness to rule out cardiac causes and treat the underlying problem.",
  },
  {
    title: "High Blood Pressure (Hypertension)",
    desc: "Diagnosis, ABPM monitoring and long-term management to protect the heart, kidneys and brain.",
  },
  {
    title: "High Cholesterol & Triglycerides",
    desc: "Lipid management with medicines and lifestyle changes to slow plaque build-up in the arteries.",
  },
  {
    title: "Heart Failure",
    desc: "Care for a weak heart pump, including medicine optimisation, device therapy (CRT/ICD) and regular follow-up.",
  },
  {
    title: "Arrhythmias (Irregular Heartbeat)",
    desc: "Palpitations, fast or slow heart rate, atrial fibrillation and SVT, treated with medicines, EP study, RF ablation or pacemaker.",
  },
  {
    title: "Valvular & Structural Heart Disease",
    desc: "Narrowed or leaking heart valves, including rheumatic heart disease, and other structural heart problems. Balloon valvuloplasty and valve replacement are available.",
  },
  {
    title: "Congenital Heart Defects",
    desc: "Holes in the heart (ASD, VSD), PDA and other heart defects present from birth, in children and adults. Children are treated by our Pediatric Cardiology team.",
    href: "/departments/pediatric-cardiology",
  },
  {
    title: "Heart Block & Slow Heart Rate",
    desc: "Fainting, dizziness or fatigue caused by a slow heartbeat, treated with permanent pacemaker or conduction-system pacing.",
  },
  {
    title: "Peripheral Artery Disease",
    desc: "Blocked arteries in the legs causing pain on walking or non-healing wounds, treated with peripheral angioplasty.",
  },
  {
    title: "Breathlessness & Fatigue",
    desc: "Shortness of breath on exertion or lying down, and unexplained tiredness, evaluated for an underlying heart cause.",
  },
  {
    title: "Swelling in Legs & Feet",
    desc: "Fluid build-up (oedema) that may signal heart failure or valve disease, assessed with echo and clinical evaluation.",
  },
];

export const procedures = [
  {
    title: "Coronary Angiography",
    desc: "An X-ray dye test that shows the exact location and severity of blockages in the heart arteries. At Popular it is done through the wrist (transradial route), so most patients can walk soon after the procedure.",
  },
  {
    title: "Radial Angioplasty & Stenting (PTCA)",
    desc: "A balloon opens the blocked artery and a stent keeps it open, restoring blood flow without open-heart surgery. It is done through the wrist (radial route), so recovery is faster. When needed, angiography and angioplasty can be done in the same sitting.",
  },
  {
    title: "Primary Angioplasty for Heart Attack",
    desc: "Emergency opening of the blocked artery during a heart attack. Our cath lab and cardiac team are available 24x7, because every minute saved protects heart muscle.",
  },
  {
    title: "HD-IVUS & FFR",
    desc: "Intravascular ultrasound images the artery from inside to measure plaque, vessel size and stent expansion. FFR checks whether a blockage actually limits blood flow, so a stent is placed only when it is needed.",
  },
  {
    title: "Rotablation (Rotational Atherectomy)",
    desc: "A tiny diamond-tipped burr removes hard, calcified plaque that a balloon alone cannot open. This allows complex blockages to be treated safely with a stent.",
  },
  {
    title: "Pacemaker (Temporary & Permanent), ICD & CRT",
    desc: "A temporary pacemaker supports the heart in emergencies, such as a heart attack with heart block. Permanent options include single and dual chamber pacemakers, LBBB (conduction system) pacing, AICD for patients at risk of dangerous rhythms, and CRT devices for selected heart failure patients.",
  },
  {
    title: "EP Study & Radiofrequency Ablation",
    desc: "An electrophysiology study maps the heart's electrical system to find the source of an abnormal rhythm, and RF ablation treats it. For many types of SVT this can offer a lasting cure.",
  },
  {
    title: "Balloon Valvuloplasty",
    desc: "A balloon widens a narrowed heart valve, such as mitral stenosis, through a catheter. This can avoid or delay valve surgery in suitable patients.",
  },
  {
    title: "Valve Replacement",
    desc: "A badly damaged heart valve that can no longer be repaired is replaced, so the heart can pump normally again and symptoms like breathlessness and swelling are relieved.",
  },
  {
    title: "Peripheral Interventions",
    desc: "Angioplasty and stenting of blocked arteries in the legs, kidneys and other parts of the body to restore circulation and help save limbs.",
  },
];

export const warningSigns = [
  "Chest pain, pressure, heaviness or tightness lasting more than a few minutes",
  "Pain spreading to the left arm, jaw, neck, back or upper abdomen",
  "Sudden shortness of breath, with or without chest discomfort",
  "Cold sweat, nausea or vomiting along with chest discomfort",
  "Sudden dizziness, light-headedness or fainting",
  "Unusual weakness or fatigue, especially in women, the elderly and diabetics",
];

export const whenToSeeCardiologist = [
  "Chest discomfort on walking, climbing stairs or after meals",
  "Breathlessness on mild exertion or when lying flat",
  "Palpitations or a racing, irregular heartbeat",
  "Swelling in the ankles, feet or abdomen",
  "Episodes of fainting or near-fainting",
  "High BP, diabetes or high cholesterol that is not controlled",
  "A family history of heart disease or sudden cardiac death",
  "You smoke, are overweight, or are over 40 and have never had a heart check-up",
];

export const patientJourney = [
  {
    title: "Consultation",
    desc: "A detailed history, examination and review of your reports by our cardiologist.",
  },
  {
    title: "Diagnosis",
    desc: "ECG, 2D Echo, TMT, Holter, ABPM or CT coronary angiography as needed, done in-house.",
  },
  {
    title: "Heart Team Plan",
    desc: "Complex cases are discussed jointly so each patient gets an individual treatment plan.",
  },
  {
    title: "Treatment",
    desc: "Medicines, interventional procedures in our cath lab, or device therapy, with care in the cardiac care unit.",
  },
  {
    title: "Recovery & Follow-up",
    desc: "Discharge guidance, medicine review, lifestyle counselling and regular follow-up visits.",
  },
];

export const preventionTips = [
  {
    title: "Know Your Numbers",
    desc: "Check BP, blood sugar and cholesterol regularly, and keep them within the targets your doctor sets.",
  },
  {
    title: "Stop Smoking & Tobacco",
    desc: "Smoking and gutkha are major causes of heart attacks at a young age. Quitting lowers the risk quickly.",
  },
  {
    title: "Stay Active",
    desc: "Aim for at least 30 minutes of brisk walking or other moderate activity on most days of the week.",
  },
  {
    title: "Eat Heart-Healthy",
    desc: "Eat less salt, fried food, sugar and refined flour, and more vegetables, fruits, whole grains and pulses.",
  },
  {
    title: "Manage Stress & Sleep",
    desc: "Poor sleep and long-term stress raise BP. Yoga, breathing exercises and 7-8 hours of sleep help.",
  },
  {
    title: "Take Medicines Regularly",
    desc: "Never stop BP, sugar, cholesterol or blood-thinner medicines without asking your cardiologist.",
  },
];

export const cardiologyFaqs = [
  {
    question: "Who are the cardiologists at Popular Hospital, Varanasi?",
    answer:
      "Our cardiology team includes Dr. Suraj Chaturvedi (MBBS, MD General Medicine, DM Cardiology, Gold Medalist - IMS BHU), Sr. Interventional Cardiologist, along with Dr. Hari Krishan Srivastava (DM Cardiology), Consultant Interventional Cardiologist, and Dr. Manoj Sharma, Consultant Cardiologist.",
  },
  {
    question: "Which is the best cardiology hospital in Varanasi?",
    answer:
      "Popular Hospital, Varanasi has a full cardiac department with a hi-tech cath lab, HD-IVUS, FFR, Rotablation, EP study and RF ablation, a 24x7 cardiac care unit and experienced interventional cardiologists, serving patients from across Purvanchal and eastern Uttar Pradesh.",
  },
  {
    question: "What heart treatments are available at Popular Hospital?",
    answer:
      "Our two modern cath labs offer ECG, 2D Echo with Doppler, TMT, 24-hour Holter, ABPM, CT coronary angiography, coronary angiography, radial angioplasty and stenting, primary angioplasty for heart attack, IVUS/FFR-guided stenting, Rotablation, temporary and permanent pacemakers, ICD/CRT implantation, EP study and RF ablation, balloon valvuloplasty, valve replacement, peripheral interventions, and heart failure and hypertension management.",
  },
  {
    question: "Is emergency heart attack treatment available 24x7?",
    answer:
      "Yes. Popular Hospital provides round-the-clock emergency cardiac care with cardiologists, a cath lab and a cardiac care unit available 24x7 for primary angioplasty. In an emergency, call +91-7800001895 or our ambulance at +91-9519999280. For help with cardiac admissions and procedures, you can also reach our cardiac coordinator at +91-9519001056.",
  },
  {
    question: "What is transradial angiography and why is it better?",
    answer:
      "In transradial angiography the catheter goes in through the wrist artery instead of the groin. It usually means less bleeding, less discomfort, earlier walking and a shorter hospital stay. Our cardiology team performs coronary procedures through the transradial route.",
  },
  {
    question: "What is IVUS and how does it help in angioplasty?",
    answer:
      "Intravascular ultrasound (IVUS) is a tiny ultrasound probe placed inside the coronary artery. It shows the exact plaque burden, vessel size and stent expansion, which helps choose the right stent size and placement and lowers the chance of the artery narrowing again.",
  },
  {
    question: "Do I need to stay in hospital after angioplasty?",
    answer:
      "Most planned angioplasty patients are discharged within 1-2 days, depending on their condition. Patients treated for a heart attack may need a few more days of monitoring in the cardiac care unit.",
  },
  {
    question: "When should I get a pacemaker?",
    answer:
      "A pacemaker may be advised if your heart beats too slowly or has a conduction block, causing dizziness, fainting, fatigue or breathlessness. Your cardiologist will decide after an ECG, Holter monitoring and clinical evaluation.",
  },
  {
    question: "Which tests are included in a heart check-up?",
    answer:
      "A basic heart check-up usually includes an ECG, 2D Echo, blood pressure check, lipid profile and blood sugar, with TMT or Holter monitoring if needed. Your cardiologist may also advise a CT coronary angiography based on your risk profile.",
  },
  {
    question: "Is cashless treatment available for cardiac procedures?",
    answer:
      "Yes, cashless treatment is available under empanelled insurance and TPA schemes. Please contact our TPA/insurance desk with your policy details before a planned procedure.",
  },
  {
    question: "Can I get a same-day consultation with a cardiologist?",
    answer:
      "Same-day OPD consultation is usually possible, depending on the doctor's availability. You can book online on our website or call +91-7800001895 to reserve a slot.",
  },
  {
    question: "Do you treat heart problems in elderly patients?",
    answer:
      "Yes. Our cardiologists regularly treat elderly patients with heart failure, arrhythmias, valve disease and coronary disease, and work with other specialists to manage diabetes, kidney disease and other conditions.",
  },
  {
    question: "How can I book an appointment with a cardiologist?",
    answer:
      "You can book online through the 'Book An Appointment' button on this page, request a call back, call +91-7800001895 / 96, or call our cardiac coordinator at +91-9519001056. You can also visit the OPD registration desk at Popular Hospital, BLW Road, Kakarmatta, Varanasi.",
  },
];

export const heartSymptoms = [
  {
    title: "Chest Pain or Tightness",
    desc: "Pressure, heaviness or burning in the chest, especially on exertion. It may be a sign of angina or a heart attack.",
  },
  {
    title: "Shortness of Breath",
    desc: "Breathlessness while walking, climbing stairs or lying flat. It can point to heart failure or valve disease.",
  },
  {
    title: "Palpitations",
    desc: "A racing, pounding, fluttering or irregular heartbeat, which may be caused by an arrhythmia.",
  },
  {
    title: "Dizziness or Fainting",
    desc: "Sudden light-headedness or blackouts. These can be caused by a very slow or fast heart rate, heart block or a narrowed valve.",
  },
  {
    title: "Swelling in Feet, Ankles or Abdomen",
    desc: "Fluid retention that gets worse by evening. It is a common sign of a weak heart pump.",
  },
  {
    title: "Unusual Tiredness",
    desc: "Feeling exhausted after routine work. This is often the only warning sign in women, diabetics and the elderly.",
  },
  {
    title: "Pain in Arm, Jaw, Neck or Back",
    desc: "Discomfort that spreads from the chest, or appears alone, can be heart pain felt in another part of the body.",
  },
  {
    title: "Cold Sweat & Nausea",
    desc: "Sweating, nausea or vomiting along with chest discomfort is a red flag for a heart attack.",
  },
  {
    title: "Leg Pain While Walking",
    desc: "Cramping in the calves that eases with rest may mean blocked leg arteries (peripheral artery disease).",
  },
  {
    title: "High BP Readings & Headache",
    desc: "Repeated high blood pressure readings, morning headaches or blurred vision need a cardiac evaluation.",
  },
];

export const diagnosticTests = [
  {
    title: "ECG (Electrocardiogram)",
    desc: "A painless 5-minute test that records the heart's electrical activity. It helps detect heart attacks, rhythm problems and strain on the heart.",
  },
  {
    title: "2D Echo with Doppler",
    desc: "An ultrasound of the heart that shows pumping strength, valve function and blood flow. It needs no preparation and takes about 15-20 minutes.",
  },
  {
    title: "TMT (Treadmill Stress Test)",
    desc: "ECG recorded while you walk on a treadmill. It brings out blockages that cause problems only during exertion.",
  },
  {
    title: "24-Hour Holter Monitoring",
    desc: "A small portable recorder worn for 24 hours or longer to catch palpitations or irregular rhythms that come and go.",
  },
  {
    title: "ABPM (24-Hour BP Monitoring)",
    desc: "BP is recorded automatically through the day and night. It confirms true hypertension and helps fine-tune medicines.",
  },
  {
    title: "CT Coronary Angiography",
    desc: "A non-invasive CT scan of the heart arteries that can detect blockages without inserting a catheter.",
  },
  {
    title: "Cardiac Blood Tests",
    desc: "Troponin and other cardiac markers to confirm a heart attack, plus lipid profile, blood sugar and kidney function to assess risk.",
  },
];

export const whyChoose = [
  {
    title: "Experienced Heart Team",
    desc: "DM-qualified cardiologists, including a gold medalist interventional cardiologist, who plan every case together as a Heart Team.",
  },
  {
    title: "Two Modern Cath Labs",
    desc: "Two cath labs with the latest technology for complex coronary, peripheral and structural heart procedures, so emergencies don't have to wait.",
  },
  {
    title: "Imaging-Guided Angioplasty",
    desc: "HD-IVUS, FFR and Rotablation help us place the right stent in the right place, even in difficult, calcified blockages.",
  },
  {
    title: "Through the Wrist",
    desc: "Angiography and angioplasty are done through the transradial route, which means less pain, less bleeding and walking sooner.",
  },
  {
    title: "Heart Surgery Under One Roof",
    desc: "Our Cardiothoracic & Vascular Surgery (CTVS) department is on the same campus for bypass and valve surgery when needed.",
    href: "/departments/ctvs",
  },
  {
    title: "NABH Accredited & Cashless",
    desc: "NABH-accredited quality and patient safety standards, with cashless treatment under empanelled insurance and TPA schemes.",
  },
];
