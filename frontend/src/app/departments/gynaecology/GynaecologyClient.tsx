"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, Sparkles, Activity, ShieldCheck, Award, Stethoscope, Baby, Users } from "lucide-react";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

/* ─── Data ─── */

const facilitiesList = [
  { text: "Family Planning", icon: Users },
  { text: "High Risk Pregnancy", icon: Baby },
  { text: "Antenatal & Postnatal Check-ups", icon: Activity },
  { text: "Painless Delivery (Normal / Caesarean)", icon: Heart },
  { text: "Advanced diagnostic and operative minimal invasive surgeries", icon: Stethoscope },
  {
    text: "All kinds of Gynaecological procedures & surgeries including ovarian cystectomy/ hysterectomy for Ovarian cyst/ Mass, uterine fibroid/Adenomyosis, prolapse, Cancer etc.",
    icon: ShieldCheck,
  },
  {
    text: "Pap smear/ Colposcopy/ Cervical biopsy/ endometrial biopsy/ Hysteroscopy/ Mammography etc. for screening cancers.",
    icon: Award,
  },
];

const obstetricsList = [
  "Antenatal care",
  "24 hours labour room service",
  "Caesarean Section",
  "Caesarean hysterectomy",
  "Surgery for rupture uterus",
  "Internal Iliac ligation for postpartum haemorrhage",
  "High risk obstetrics",
  "Abortion services",
  "Instrumental deliveries",
  "Management of complicated labour",
  "We Manage the patients with concurrent medical illness like diabetes mellitus, renal disease",
  "Management of obstetric emergencies including ectopic pregnancy",
];

const procedureCategories = [
  {
    id: "outpatient",
    title: "Outpatient & Minor Care",
    description: "Daily consultations, screening procedures, and minor surgical interventions performed on an outpatient basis.",
    icon: Stethoscope,
    items: [
      { text: "OPD consultation", type: "item" },
      { text: "All minor gynaecological operative procedures", type: "header" },
      { text: "Dilatation and curettage (D&C)", type: "sub" },
      { text: "Dilatation and evacuation (D&E)", type: "sub" },
      { text: "Cervical biopsy / endometrial biopsy", type: "sub" },
      { text: "Colposcopy", type: "sub" },
      { text: "Cryotherapy or thermoablation for cervical erosion", type: "sub" },
      { text: "Abscess drainage – vulval, bartholin's etc.", type: "sub" },
    ]
  },
  {
    id: "hysterectomy",
    title: "Hysterectomy & Pelvic Repair",
    description: "Advanced surgical options for uterus removal and pelvic floor reconstructive procedures.",
    icon: Heart,
    items: [
      { text: "Hysterectomy", type: "item" },
      { text: "Abdominal hysterectomy", type: "sub" },
      { text: "Total Laparoscopic Hysterectomy (TLH) / Laparoscopic assisted vaginal hysterectomy", type: "sub" },
      { text: "Non descent vaginal hysterectomy", type: "sub" },
      { text: "Vaginal hysterectomy", type: "sub" },
      { text: "Surgery for benign gynaecological conditions – myomectomy & polypectomy", type: "item" },
      { text: "Sling surgery for prolapsed uterus / vault prolapse", type: "item" },
      { text: "Pelvic floor repair – Anterior and posterior colporrhaphy", type: "item" },
    ]
  },
  {
    id: "laparoscopy",
    title: "Minimal Access & Laparoscopy",
    description: "Keyhole surgeries and hysteroscopic interventions offering faster recovery and minimal pain.",
    icon: Activity,
    items: [
      { text: "Diagnostic laparoscopy", type: "item" },
      { text: "Operative laparoscopy", type: "item" },
      { text: "Ectopic pregnancy management", type: "sub" },
      { text: "Adhesiolysis", type: "sub" },
      { text: "Endometriosis surgery", type: "sub" },
      { text: "Adnexal masses excision", type: "sub" },
      { text: "Ovarian cysts removal", type: "sub" },
      { text: "Diagnostic hysteroscopy", type: "item" },
      { text: "Operative hysteroscopy (polypectomy, myomectomy, adhesiolysis, septal resection)", type: "item" },
    ]
  },
  {
    id: "screening",
    title: "Screenings & Wellness",
    description: "Preventative healthcare, cancer screenings, and comprehensive family planning services.",
    icon: ShieldCheck,
    items: [
      { text: "Gynaecological cancer screening – pap smear, CT Scan & MRI, tumour markers", type: "item" },
      { text: "Family planning services – Abdominal tube ligation, laparoscopic tube ligation, CuT/multiload insertion", type: "item" },
      { text: "Surgery for gynaecological malignancy", type: "item" },
    ]
  }
];

const doctors = [
  {
    name: "Dr. Kiran Kaushik",
    qualifications: "MBBS, MS (OBGY) IMS, BHU",
    designation: "Head Of Department Obstetrics & Gynaecology",
    slug: "dr-kiran-kaushik",
    image: "/images/departments_doctor/dr_kiran_kaushik.png",
  },
  {
    name: "Dr. Madhavi Paramar",
    qualifications: "MBBS, DGO",
    designation: "Consultant Obstetrician, Gynaecologist & Infertility Specialist",
    slug: "dr-madhavi-paramar",
    image: "/images/departments_doctor/madhvi_parmar.jpg",
  },
  {
    name: "Dr. Priyanka Jaiswal",
    qualifications: "MBBS, MS (OBGY)",
    designation: "Consultant Laparoscopic Gynaecologist & IVF Specialist",
    slug: "dr-priyanka-jaiswal",
    image: "/images/departments_doctor/dr_priyanka_jaiswal.jpg",
  },
  {
    name: "Dr. Srishti Tanya",
    qualifications: "M.B.B.S., MS",
    designation: "Consultant Gynaecologist",
    slug: "dr-srishti-tanya",
    image: "/images/departments_doctor/dr._srishti_tanya.jpg",
  },
];

/* ─── Page ─── */

export default function GynaecologyClient() {
  const [activeTab, setActiveTab] = useState("outpatient");

  return (
    <main className="min-h-screen bg-slate-50/20 overflow-x-hidden">
      {/* ═══════ HERO (UNCHANGED) ═══════ */}
      <section className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full bg-[#0b1c43] overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/obstetrics_banner.png"
            alt="Obstetrics & Gynaecology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-100 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm tracking-wide">
              Centre of Excellence for Women
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              Nurturing Life,
              <br />
              <span className="text-blue-300">Empowering You</span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-[#E85222]/30 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <GetCallBackButton
                department="Obstetrics & Gynaecology"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ INTRO + DOCTOR SLIDER ═══════ */}
      <section className="py-20 xl:py-16 bg-white">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-[#1e3a8a] font-bold tracking-widest text-xs uppercase">
                  Introduction
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-10 rounded-full bg-[#1e3a8a] inline-block" />
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                    Department of <span className="text-[#1e3a8a]">Obstetrics &amp; Gynaecology</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  The Obstetrics and Gynaecology Department of Popular Hospital offers world-level women healthcare
                  services involving unborn children and pregnant women. Popular Hospital is also known for its efficient
                  management of other related diseases. Popular provides expert gynaecological and obstetrical treatment
                  along with specialist services for specific disease groups.
                </p>

                <div className="relative border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50/40 to-blue-50/10 rounded-r-3xl my-8 shadow-sm">
                  <span className="absolute -top-3 -left-3 text-blue-200 text-6xl font-serif pointer-events-none">“</span>
                  <p className="text-gray-700 leading-relaxed text-[15px] font-semibold italic relative z-10">
                    Different age group females face different health issues, which are appropriately assessed and
                    addressed with utmost care. Popular ensures total safety and comfort of female patients as well as
                    their children. A well-trained team of Doctors from Popular performs procedures that are completely
                    safe and well tested.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed text-base md:text-[15px] font-medium">
                  The Dept. of Obs. & Gynae offers a comprehensive range of inpatient and outpatient services spanning the
                  needs of women from their teen years, through pregnancy to menopause and beyond. Routine screening and
                  check-ups including screening for various cancers as well as diagnostic workups for specialized
                  problems are available.
                </p>
              </div>
            </div>

            {/* Right Doctor Slider (UNCHANGED WRAPPER) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Obstetrics and Gynaecology" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FACILITIES SECTION ═══════ */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
            {/* Left — Facilities List */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-8">
              <div className="space-y-3">
                <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                  What We Offer
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 inline-block" />
                  <h2 className="text-3xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                    Department <span className="text-[#1e3a8a]">Facilities</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilitiesList.map((item, idx) => {
                  const Icon = item.icon;
                  // Make last two items full-width if odd index items are at the end
                  const isLongItem = idx >= 5;
                  return (
                    <div
                      key={idx}
                      className={`group p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 flex gap-4 items-start ${
                        isLongItem ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center border border-blue-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-800 leading-relaxed text-sm md:text-[14.5px] font-semibold group-hover:text-[#0b1c43] transition-colors duration-200">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Image (Optimized Size) */}
            <div className="lg:col-span-2 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] h-[340px] md:h-[400px] lg:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white hover:border-blue-100 transition-colors duration-500 group lg:self-center">
                <Image
                  src="/images/departments-images/obstetrics_and_gynaecology.jpeg"
                  alt="Gynaecology Facility"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-[#0b1c43] text-xs font-extrabold px-4 py-2 rounded-full shadow border border-blue-100">
                    Comprehensive Women's Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OBSTETRICS SECTION ═══════ */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
            {/* Left — Image (Optimized Size) */}
            <div className="lg:col-span-2 flex items-center justify-center lg:justify-start">
              <div className="relative w-full max-w-[340px] h-[260px] sm:h-[300px] lg:h-[340px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50 hover:border-blue-50 transition-colors duration-500 group lg:self-center">
                <Image
                  src="/images/departments-images/obstetrics_care.jpg"
                  alt="Obstetrics Care"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-[#0b1c43] text-xs font-extrabold px-4 py-2 rounded-full shadow border border-blue-100">
                    24/7 Maternity Support
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Obstetrics List */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-8">
              <div className="space-y-3">
                <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
                  Maternity Services
                </span>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 inline-block" />
                  <h2 className="text-3xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
                    Our <span className="text-[#1e3a8a]">Obstetrics Care</span>
                  </h2>
                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-blue-200 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {obstetricsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-4 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/20 border border-transparent hover:border-blue-100 shadow-sm transition-all duration-300 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#1e3a8a] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm font-semibold group-hover:text-[#0b1c43] transition-colors duration-200">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GYNAECOLOGY EXPERTISE (TABS SECTION) ═══════ */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          {/* Heading */}
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#1e3a8a] font-bold tracking-widest text-xs uppercase block">
              Surgical Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c43] font-heading tracking-tight">
              <span className="text-[#1e3a8a]">Gynaecology</span> Procedures
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto" />
          </div>

          {/* Wide Banner Image (Preserved Style) */}
          <div className="relative w-full md:w-2/3 mx-auto h-56 md:h-72 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white mb-12 group">
            <Image
              src="/images/departments-images/gynaecology_expertise_surgery.png"
              alt="Gynaecology Expertise"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/30 to-transparent" />
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
            {procedureCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs md:text-sm transition-all duration-300 border ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white hover:bg-slate-50 text-gray-700 border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#1e3a8a]"}`} />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-xl transition-all duration-500 min-h-[300px]">
            {procedureCategories.map((cat) => {
              if (cat.id !== activeTab) return null;
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="space-y-6 animate-fade-in">
                  {/* Category Info Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-[#0b1c43] flex items-center gap-3">
                        <span className="p-2 rounded-xl bg-blue-50 text-[#1e3a8a] border border-blue-100">
                          <Icon className="w-5 h-5" />
                        </span>
                        {cat.title}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-[14.5px] font-medium max-w-2xl leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Category Items List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-4">
                    {cat.items.map((item, idx) => {
                      if (item.type === "header") {
                        return (
                          <div key={idx} className="col-span-1 md:col-span-2 flex items-center gap-3 mt-4 mb-2">
                            <span className="text-[#1e3a8a] font-bold text-xs uppercase tracking-widest whitespace-nowrap">
                              {item.text}
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
                          </div>
                        );
                      }
                      if (item.type === "sub") {
                        return (
                          <div key={idx} className="flex items-start gap-3 pl-6 py-2 border-l-2 border-blue-100 hover:border-blue-500 transition-colors duration-200">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2" />
                            <p className="text-gray-600 leading-relaxed text-sm font-semibold">
                              {item.text}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center border border-blue-100">
                            <Check className="w-4 h-4" />
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm font-semibold mt-1">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
