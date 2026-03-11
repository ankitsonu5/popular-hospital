import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radiological Services | Popular Hospital',
  description: 'Department of Radiology and Imaging equipped with latest technology, MRI, CT, Conventional Radiology, and Interventional procedures.',
};

export default function RadiologyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[350px] md:h-[400px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/radiological_services.png"
            alt="Radiological Services"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/30" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight">
              Radiological Services
            </h1>
            <nav className="flex items-center text-sm md:text-base text-white/90 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <Link href="/services" className="hover:text-blue-300 transition-colors">Services</Link>
              <span className="mx-2 text-red-600 font-bold">|</span>
              <span className="text-white">Radiology</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Intro & Conventional Radiology Section */}
      <section className="py-20 lg:py-24 bg-gray-50/50 relative overflow-hidden">
        {/* Subtle Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0b1c43 1px, transparent 1px), linear-gradient(90deg, #0b1c43 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 w-full">
               <p className="text-[#0b1c43] leading-loose text-left text-[1.05rem] max-w-3xl font-medium">
                  Department of Radiology was a major achieved when first CT scanner was installed in the hospital by SNS group. It was first of its kind in northern India and second in whole India.
               </p>
               <Link href="/doctors" className="hidden md:flex bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-2.5 rounded-sm font-semibold tracking-wide shadow-md transition-colors text-sm uppercase text-center shrink-0">
                  SCHEDULE AN<br />APPOINTMENT
               </Link>
           </div>

           <div className="max-w-4xl">

              <div className="mb-4">
                 <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight border-l-4 border-blue-600 pl-4 mb-6">
                     Department of <span className="text-blue-600">Radiology and Imaging</span>
                  </h2>
              </div>
              
              <p className="text-gray-600 leading-loose text-justify text-[1.05rem] mb-12">
                 Ultrasound department was started in 4, 1 Tesla MRI was installed in the hospital in 9 which is upgraded by 3 Tesla in 2009. Department of mammography was started in 1999.State of art vascular cath lab. Especially designed for vascular procedure started in 2010. Popular houses a vast imaging department with its unique subdivisions which include conventional radiology, General Ultrasound, Fetal Medicine, CT, MRI and interventional radiology. All the subdivisions are highly coordinated, equipped with latest technology and managed effectively by number of expert consultants mastered in their respective areas and providing high quality reporting and quality care of patients. Each department is also staffed with highly trained and experienced technical personnel.
              </p>

              <div className="mb-4">
                 <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight">
                     Conventional <span className="text-gray-800">Radiology</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="w-16 h-[2px] bg-blue-600"></div>
                  </div>
              </div>

              <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                 The department of conventional radiology is equipped with two digital x ray machines, one fluoroscopy unit, two high frequency conventional x-ray machine, one mammography machine and one OPG x-ray machine. The work load on an average is 400 patients per day. The procedures done under fluoroscopy control include barium investigations for the gastrointestinal tract, hysterosalpingograms for the female genital tract and a number of procedures for diagnostic and therapeutic intervention for hepatobiliary system. The department also does urological investigations such as intravenous urogram and micturating and cystourethrogram. Special investigations like dacryocystogram, sialogram, myelogram are also done. Procedures like defaecography are also done which is available in very few centers in India. Portable radiography units are kept on each floor of the hospital ward block for patients who are too sick to come to the main department. Digital portable radiographs are being carried out in the ICU patients. The department also has a state-of-the-art mammography machine with stereotactic biopsy attachment for diagnostic interventional procedures. On an average 175-200 mammograms are done every month with interventional procedures including hook wire placements and breast biopsies.
              </p>
           </div>
        </div>
      </section>

      {/* Interventional Radiology & Ultrasound Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-100 relative">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
               
               {/* Content */}
               <div className="w-full lg:w-[60%] lg:pr-10">
                  <div className="mb-4">
                     <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight">
                         Interventional <span className="text-blue-600">Radiology</span>
                      </h2>
                      <div className="flex items-center gap-2 mt-4">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <div className="w-16 h-[2px] bg-blue-600"></div>
                      </div>
                  </div>
                  <p className="text-gray-600 leading-loose text-justify text-[1.05rem] mb-16">
                     Department of interventional radiology is equipped with latest Philips digital fluoroscopy angiography unit. Each subdivision (hepatobiliary, cardiac peripheral vascular, and neurointervention) is run by highly experienced and trained senior consultants. A number of interventional procedures including hepatobiliary, renal, gynaecological, neurological and cardiac interventions are carried out. Students are also given sufficient hands on experience in these procedures. Hepatobiliary interventions like transarterial chemoembolization for tumors (TACE), transarterial radiotherapy (TARE), radiofrequency ablation (RFA). Transjugular intrahepatic Portosystemic shunts (TIPPS) and embolization for GI bleeds are done extensively in the department.Others procedures like uterine artery embolization are also carried out.
                  </p>

                  <div className="mb-4">
                     <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight">
                         <span className="text-gray-800">Ultrasound</span>
                      </h2>
                      <div className="flex items-center gap-2 mt-4">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <div className="w-16 h-[2px] bg-gray-400"></div>
                      </div>
                  </div>
                  <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                     The ultrasound division of the radiology department is one of the earliest ultrasound setups in the city, started in 2. Since then it has grown steadily, is associated with the first IVF live birth in North India and is currently associated with the highly successful liver transplant programme at this hospital. The department of General Ultrasound is equipped with 5 high end resolution ultrasound Doppler machines. Overall patient overload is average 200 patients per day.
                  </p>
               </div>

               {/* Right Side Image Blob */}
               <div className="w-full lg:w-[40%] flex justify-center sticky top-32">
                  <div className="relative w-full max-w-[450px] aspect-[4/5]">
                     <div className="absolute inset-0 bg-blue-50 rounded-tl-[10rem] rounded-br-[15rem] translate-x-4 translate-y-4"></div>
                     <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-tl-[10rem] rounded-br-[15rem] border-white border-8">
                         <Image
                            src="https://images.unsplash.com/photo-1555513511-2eb2f43a5323?auto=format&fit=crop&q=80&w=800"
                            alt="Doctor analyzing radiology scans"
                            fill
                            className="object-cover"
                         />
                     </div>
                  </div>
               </div>
               
            </div>
        </div>
      </section>

    </div>
  );
}
