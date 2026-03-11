'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

/* ─── Data (Transcribed from Image & Matched to General Surgery Theme) ─── */

const features = [
  { title: 'Maternity Care', icon: 'baby', desc: 'Expert care for you and your baby.' },
  { title: 'Advanced Laparoscopy', icon: 'scope', desc: 'Minimally invasive gynaecological surgeries.' },
  { title: 'Cancer Screening', icon: 'microscope', desc: 'Screening for cervical & breast cancers.' },
  { title: 'Family Planning', icon: 'heart', desc: 'Comprehensive reproductive health services.' },
];

const facilitiesList = [
  'Family Planning',
  'High Risk Pregnancy',
  'Antenatal & Postnatal Check-ups',
  'Painless Delivery (Normal / Caesarean)',
  'Advanced diagnostic and operative minimal invasive surgeries',
  'All kinds of Gynaecological procedures & surgeries including ovarian cystectomy/ hysterectomy for Ovarian cyst/ Mass, uterine fibroid/Adenomyosis, prolapse, Cancer etc.',
  'Pap smear/ Colposcopy/ Cervical biopsy/ endometrial biopsy/ Hysteroscopy/ Mammography etc. for screening cancers.',
];

const obstetricsList = [
  'Antenatal care',
  '24 hours labour room service',
  'Caesarean Section',
  'Caesarean hysterectomy',
  'Surgery for rupture uterus',
  'Internal Iliac ligation for postpartum haemorrhage',
  'High risk obstetrics',
  'Abortion services',
  'Instrumental deliveries',
  'Management of complicated labour',
  'We Manage the patients with concurrent medical illness like diabetes mellitus, renal disease',
  'Management of obstetric emergencies including ectopic pregnancy',
];

const gynaecologyProcedures = [
  'OPD consultation',
  'All minor gynaecological operative procedures: D&C, D&E, Biopsy, Colposcopy, Cryotherapy, Abscess drainage',
  'Hysterectomy: Abdominal, TLH, Non-descent, Vaginal',
  'Surgery for benign gynaecological conditions – myomectomy & polypectomy',
  'Sling surgery for prolapsed uterus vault prolapse',
  'Surgery for gynaecological malignancy',
  'Diagnostic & Operative Laparoscopy: Ectopic, Adhesiolysis, Endometriosis, Ovarian cysts',
  'Diagnostic & Operative Hysteroscopy',
  'Gynaecological cancer screening – pap smear, CT Scan & MRI, tumour markers',
  'Pelvic floor repair – Anterior and posterior colporrhaphy',
  'Family planning services: Tube ligation, CuT/multiload insertion',
];

const doctors = [
  {
    name: 'Dr. Kiran Kaushik',
    qualifications: 'MBBS (RIMCH Ranchi-1991), MD-Obs & Gynae (IMS BHU Varanasi-1996)',
    designation: 'Managing Director & HOD',
    slug: 'dr-kiran-kaushik',
    image: '/images/leadership/kiran.png',
  },
];

/* ─── Sub-Components ─── */

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-[#0b1c43] font-heading leading-tight">
      {title} <span className="text-pink-600 font-bold">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-pink-600" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg font-medium">
    <span className="text-pink-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const FeatureIcon = ({ icon }: { icon: string }) => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {icon === 'baby' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
    {icon === 'scope' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />}
    {icon === 'microscope' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
    {icon === 'heart' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
  </svg>
);

/* ─── Page ─── */

export default function GynaecologyClient() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[600px] w-full bg-[#831843] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=60&w=1400"
            alt="Obstetrics & Gynaecology Banner"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#831843] via-[#831843]/90 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 text-pink-100 text-sm font-semibold mb-6 border border-pink-400/30 backdrop-blur-sm">
              Centre of Excellence for Women
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
              Nurturing Life,<br />
              <span className="text-pink-300">Empowering You</span>
            </h1>
            <p className="text-pink-50/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium text-justify">
              From adolescence to motherhood and beyond, provide world-level healthcare services involving unborn children and pregnant women.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#3b82f6] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get a Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURE CARDS (4-col) - STYLE FROM GENERAL SURGERY ═══════ */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border-t-4 border-pink-600 hover:border-[#831843] transition-all duration-300 group flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all">
                  <FeatureIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0b1c43] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DEPARTMENT INFO + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left Content ── */}
            <div className="lg:col-span-8">
              <SectionHeader title="Department of" highlight="Obstetrics and Gynaecology" />
              <div className="space-y-4 text-gray-800 text-base md:text-lg leading-relaxed mb-12 font-medium text-justify">
                <p>
                  The Obstetrics and Gynaecology Department of Popular Hospital offers world level women health care services involving unborn children and pregnant women. Popular Hospital is also known for its efficient management of other related diseases. Popular provides expert gynaecological and obstetrical treatment along with specialist services for specific disease groups.
                </p>
                <div className="bg-pink-50/50 p-6 rounded-xl border-l-4 border-pink-600">
                  <p>
                    Different age group females face different health issues, which are appropriately assessed and addressed with utmost care. Popular ensures total safety and comfort of female patients as well as their children. A well-trained team of Doctors from Popular performs procedures that are completely safe and well tested. The department also focuses on expert counselling and quality care on matters related to infertility management, family welfare, menopause management, prenatal diagnosis, reconstructive surgery and pelvic floor medicine.
                  </p>
                </div>
                <p>
                  The Dept. of Obs. & Gynae offers a comprehensive range of inpatient and outpatient services span the need of women from their teen years, through pregnancy to menopause and beyond. Routine screening and check-ups including screening for various cancers as well as diagnostic workups for specialized problems are available.
                </p>
              </div>
            </div>

            {/* ── Right Doctor Card (General Surgery Style) ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <div className="relative pt-6">
                  <Link
                    href="/doctors"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-[#3b82f6] hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    SCHEDULE AN APPOINTMENT
                  </Link>
                  <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 flex flex-col items-center p-0 max-w-sm mx-auto relative group">
                    <div className="w-full relative overflow-hidden h-[480px]">
                      <div className="w-full h-full p-6 pt-12 flex flex-col items-center">
                        <div className="relative w-full h-[320px] rounded-lg overflow-hidden mb-6 shadow-lg bg-gray-100 group/img">
                            <Image
                              src={doctors[0].image}
                              alt={doctors[0].name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                            />
                             <Link
                              href={`/doctors/${doctors[0].slug}`}
                              className="absolute inset-0 bg-pink-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                            >
                              <span className="px-5 py-2.5 border-2 border-white text-white font-bold rounded-sm tracking-wider bg-transparent hover:bg-white hover:text-pink-900 transition-all uppercase text-sm">
                                View Full Profile
                              </span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-pink-600 mb-1 font-heading">{doctors[0].name}</h3>
                            <p className="text-gray-600 text-xs font-semibold leading-relaxed px-4">{doctors[0].qualifications}</p>
                            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">{doctors[0].designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ FACILITIES SECTION (Broad Full Width Layout) ═══════ */}
      <section className="py-24 bg-white border-b border-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Text Section (Left) - Increased space for readability */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-3 block">What We Offer</span>
                    <SectionHeader title="Department" highlight="Facilities" />
                    <ul className="mt-4 space-y-3">
                    {facilitiesList.map((item, idx) => (
                        <ListItem key={idx} text={item} />
                    ))}
                    </ul>
                </div>
                {/* Image Section (Right) - Adjusted width for balance */}
                <div className="lg:col-span-7 order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-2xl group bg-pink-50/10" style={{ minHeight: '600px' }}>
                    <Image
                    src="/images/departments-images/obstetrics_and_gynaecology.jpeg"
                    alt="Hospital Facility"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/30 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-6 border border-white/30 rounded-[2.5rem] pointer-events-none" />
                </div>
           </div>
        </div>
      </section>


      {/* ═══════ OBSTETRICS SECTION (General Surgery USP Style - Side List + Image) ═══════ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             
             {/* Left: Image (General Surgery Style) */}
             <div className="relative rounded-2xl overflow-hidden shadow-lg group order-2 lg:order-1" style={{ minHeight: '480px' }}>
                <Image
                    src="/images/departments-images/obstetrics_care.jpeg"
                    alt="Obstetrics Care"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/40 via-transparent to-transparent" />
             </div>

             {/* Right: List Side (General Surgery Style) */}
             <div className="order-1 lg:order-2">
                <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-3 block">Maternity Services</span>
                <SectionHeader title="Our" highlight="Obstetrics Care" />
                <p className="text-gray-500 text-sm mb-6">
                    Comprehensive care for mothers and children, from prenatal checkups to emergency obstetric interventions.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {obstetricsList.map((item, idx) => (
                        <ListItem key={idx} text={item} />
                    ))}
                </ul>
             </div>

           </div>
        </div>
      </section>

      {/* ═══════ GYNAECOLOGY EXPERTISE (General Surgery USP Style - Side List + Image) ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-3 block">Specialized Care</span>
                    <SectionHeader title="Our" highlight="Gynaecological Expertise" />
                    <p className="text-gray-500 text-sm mb-6">
                        Expert consultation and surgical management for all gynaecological conditions.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                        {gynaecologyProcedures.map((item, idx) => (
                            <ListItem key={idx} text={item} />
                        ))}
                    </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group" style={{ minHeight: '480px' }}>
                    <Image
                    src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1200"
                    alt="Gynaecology Procedure"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/40 via-transparent to-transparent" />
                </div>
           </div>
        </div>
      </section>

      {/* ═══════ CALL TO ACTION ═══════ */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="bg-[#831843] rounded-2xl md:rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>
            <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <span className="inline-block bg-pink-500/20 text-pink-100 text-xs font-bold px-4 py-1.5 rounded-full mb-8 border border-pink-400/20 uppercase tracking-widest">
                Expert Care Since 1994
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-heading leading-tight">
                Empowering Women&apos;s <br className="hidden md:block" /> Health Every Day
              </h2>
              <p className="text-pink-100 text-base md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
                Comprehensive obstetric and gynaecological care delivered with compassion and clinical excellence. Join thousands of happy mothers who trusted us.  
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/doctors"
                  className="bg-[#3b82f6] hover:bg-blue-500 text-white px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl transform hover:-translate-y-1"
                >
                  Book Appointment
                </Link>
                <a
                  href="tel:+917800001896"
                  className="bg-transparent border-2 border-blue-400/50 text-white hover:bg-white/10 px-12 py-5 rounded-full font-bold text-lg transition-all flex items-center   justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +91-7800001895 / 96
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
