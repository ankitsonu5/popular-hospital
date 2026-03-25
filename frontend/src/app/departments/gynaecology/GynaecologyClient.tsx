'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DoctorSlider from '@/components/DoctorSlider';

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
  { text: 'OPD consultation', type: 'item' },
  { text: 'All minor gynaecological operative procedures', type: 'header' },
  { text: 'Dilatation and curettage', type: 'sub' },
  { text: 'Dilatation and evacuation', type: 'sub' },
  { text: 'Cervical biopsy/ endometrial biopsy', type: 'sub' },
  { text: 'Colposcopy', type: 'sub' },
  { text: 'Cryotherapy or thermoablation for cervical erosion', type: 'sub' },
  { text: 'Abscess drainage – vulval, bartholin\'s etc.', type: 'sub' },
  { text: 'Hysterectomy', type: 'item' },
  { text: 'Abdominal hysterectomy', type: 'sub' },
  { text: 'TLH/ Laparoscopic assisted vaginal hysterectomy', type: 'sub' },
  { text: 'Non descent vaginal hysterectomy', type: 'sub' },
  { text: 'Vaginal hysterectomy', type: 'sub' },
  { text: 'Surgery for benign gynaecological conditions – myomectomy &polypectomy', type: 'item' },
  { text: 'Sling surgery for prolapsed uterus vault prolapse.', type: 'item' },
  { text: 'Surgery for gynaecological malignancy', type: 'item' },
  { text: 'Diagnostic laparoscopy', type: 'item' },
  { text: 'Operative laparoscopy', type: 'item' },
  { text: 'Ectopic pregnancy', type: 'sub' },
  { text: 'Adhesiolysis', type: 'sub' },
  { text: 'Endometriosis', type: 'sub' },
  { text: 'Adnexal masses', type: 'sub' },
  { text: 'Ovarian cysts', type: 'sub' },
  { text: 'Diagnostic hysteroscopy', type: 'item' },
  { text: 'Operative hysteroscopy - -polypectomy, myomectomy, adhesiolysis, septal resection', type: 'item' },
  { text: 'Gynaecological cancer screening – pap smear, CT Scan & MRL, tumour markers', type: 'item' },
  { text: 'Pelvic floor repair – Anterior and posterior colporrhaphy', type: 'item' },
  { text: 'Family planning services – Abdominal tube ligation, laparoscopic tube ligation, CuT/multiload insertion.', type: 'item' },
];

const doctors = [
  {
    name: 'Dr Kiran Kaushik',
    qualifications: 'MBBS, MS (OBGY) IMS, BHU',
    designation: 'Head Of Department Obstetrics & Gynaecology',
    slug: 'dr-kiran-kaushik',
    image: '/images/departments_doctor/kiran.png',
  },
  {
    name: 'Dr Madhavi Paramar',
    qualifications: 'MBBS, DGO',
    designation: 'Consultant Obstetrician, Gynaecologist & Infertility Specialist',
    slug: 'dr-madhavi-paramar',
    image: '/images/departments_doctor/dr_parmar_madhavi.jpg',
  },
  {
    name: 'Dr Priyanka Jaiswal',
    qualifications: 'MBBS, MS (OBGY)',
    designation: 'Consultant Laparoscopic Gynaecologist & IVF Specialist',
    slug: 'dr-priyanka-jaiswal',
    image: '/images/departments_doctor/dr_priyanka_jaiswal.png',
  },
  {
    name: 'Dr. Srishti Tanya',
    qualifications: 'M.B.B.S., MS',
    designation: 'Consultant Gynaecologist',
    slug: 'dr-srishti-tanya',
    image: '',
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

/* ─── Page ─── */

export default function GynaecologyClient() {

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[200px] md:min-h-[250px] w-full bg-[#831843] overflow-hidden flex items-center py-10 md:py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/obstetrics_banner.png"
            alt="Obstetrics & Gynaecology Banner"
            fill
            className="object-cover object-center opacity-70 mix-blend-overlay"
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
            <div className="flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="bg-[#E85222] hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 uppercase text-sm tracking-wide"
              >
                Book Appointment
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2 uppercase text-sm tracking-wide">
                Get a Call Back
              </button>
            </div>
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

            {/* ── Right Doctor Card ── */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider doctors={doctors} departmentName="Obstetrics and Gynaecology" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ FACILITIES SECTION ═══════ */}
      <section className="py-24 bg-white border-b border-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <SectionHeader title="Department" highlight="Facilities" />
                    <ul className="mt-4 space-y-3">
                    {facilitiesList.map((item, idx) => (
                        <ListItem key={idx} text={item} />
                    ))}
                    </ul>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 relative rounded-3xl overflow-hidden shadow-2xl group bg-pink-50/10" style={{ minHeight: '600px' }}>
                    <Image
                    src="/images/departments-images/obstetrics_and_gynaecology.jpeg"
                    alt="Hospital Facility"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/30 via-transparent to-transparent pointer-events-none" />
                </div>
           </div>
        </div>
      </section>


      {/* ═══════ OBSTETRICS SECTION ═══════ */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             
             <div className="relative rounded-2xl overflow-hidden shadow-lg group order-2 lg:order-1" style={{ minHeight: '480px' }}>
                <Image
                    src="/images/departments-images/obstetrics_care.jpg"
                    alt="Obstetrics Care"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/40 via-transparent to-transparent" />
             </div>

             <div className="order-1 lg:order-2">
                <SectionHeader title="Our" highlight="Obstetrics Care" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {obstetricsList.map((item, idx) => (
                        <ListItem key={idx} text={item} />
                    ))}
                </ul>
             </div>

           </div>
        </div>
      </section>

      {/* ═══════ GYNAECOLOGY EXPERTISE ═══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <SectionHeader title="Gynaecology"/>
                    <ul className="space-y-1">
                        {gynaecologyProcedures.map((item, idx) => {
                            if (item.type === 'header') {
                                return (
                                    <li key={idx} className="text-gray-800 mb-2 text-base md:text-lg font-bold leading-relaxed pl-6 uppercase tracking-tight text-pink-600">
                                        {item.text}
                                    </li>
                                );
                            }
                            return (
                                <li key={idx} className={`flex items-start gap-2 text-gray-800 mb-1 group text-base md:text-lg font-medium ${item.type === 'sub' ? 'ml-6' : ''}`}>
                                    <span className="text-pink-600 mt-1 font-bold group-hover:translate-x-1 transition-transform flex-shrink-0">›</span>
                                    <span className="leading-relaxed">{item.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group" style={{ minHeight: '480px' }}>
                    <Image
                    src="/images/departments-images/gynaecology_expertise_surgery.png"
                    alt="Gynaecology Expertise"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/40 via-transparent to-transparent" />
                </div>
           </div>
        </div>
      </section>


    </main>
  );
}
