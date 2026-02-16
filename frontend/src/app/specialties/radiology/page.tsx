
import Image from "next/image";
import Link from 'next/link';
import { Metadata } from 'next';
import RadiologyVideoSection from "../../../components/RadiologyVideoSection";

export const metadata: Metadata = {
  title: 'Radiology & Imaging Services | Popular Hospital',
  description: 'Advanced diagnostic imaging services including MRI, CT Scan, X-Ray, and Ultrasound.',
};

export default function RadiologyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[#004d61] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=2000"
                alt="Radiology Imaging"
                fill
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#003B4A] via-[#003B4A]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-200 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm">
                Department of Radiology
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Advanced <br/>
                Diagnostic Imaging
              </h1>
              <p className="text-teal-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                State-of-the-art imaging technology provided by expert radiologists. We ensure accurate diagnosis for effective treatment planning.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book an Appointment
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  View Reports
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* Floating Cards / Features - Scan Types */}
      <section className="relative z-20 -mt-16 pb-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "MRI Scan", icon: "magnet", desc: "Detailed imaging of organs and tissues using magnetic fields." },
              { title: "CT Scan", icon: "layer-group", desc: "Cross-sectional images for precise diagnosis." },
              { title: "Ultrasound", icon: "wave", desc: "High-frequency sound waves for internal body structure imaging." },
              { title: "Digital X-Ray", icon: "x-ray", desc: "Quick and effective imaging for bones and chest." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                   <svg className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                          item.icon === 'magnet' ? "M13 10V3L4 14h7v7l9-11h-7z" : 
                          item.icon === 'layer-group' ? "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" :
                          item.icon === 'wave' ? "M6 18L18 6M6 6l12 12" :
                          "M12 4v16m8-8H4"
                      } />
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Stats Cards - Qualities (Added from Interventional) */}
      <section className="py-12 bg-gray-50/30">
        <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: 'Patient Safety', desc: 'Lowest radiation dose protocols', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                { title: 'Modern Tech', desc: 'Latest 3T MRI & 128 Slice CT', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                { title: 'Certified Experts', desc: 'Board-certified radiologists', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { title: '24/7 Services', desc: 'Emergency radiology support', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100/80 hover:border-teal-100 transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                     <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                        </svg>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.desc}</p>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* Exceptional Care Section with Video (Added from Interventional) */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
                <div className="relative">
                     <span className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-2 block">Patient Centered Care</span>
                     <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-6 relative z-10">
                        Exceptional <br />
                        <span className="text-teal-600">Radiology Care</span> for Patients
                     </h2>
                </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Our Department combines personalized care with cutting-edge technology. Whether you need a routine X-ray or a complex MRI, our team ensures a comfortable, safe, and precise imaging experience.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Advanced 3D Mammography',
                  'High-Field Open MRI for claustrophobic patients',
                  'Low-dose CT technology for patient safety',
                  'Same-day appointments for urgent cases'
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </span>
                        {item}
                    </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-[#F05A28] text-white rounded-lg font-medium hover:bg-[#d0491c] transition-colors shadow-lg shadow-orange-500/20">
                Meet Our Specialists
              </button>
            </div>
            <div className="w-full lg:w-1/2 relative">
               <RadiologyVideoSection />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Sections - Alternating (Added from Interventional) */}
      <section className="py-20 bg-gray-50">
           <div className="mx-auto w-full max-w-[1366px] px-4">
              {/* Section 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                 <div className="w-full md:w-1/2 order-2 md:order-1">
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg group">
                         <Image 
                             src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop"
                             alt="Advanced Technology"
                             fill
                             className="object-cover group-hover:scale-110 transition-transform duration-700"
                         />
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-transparent"></div>
                    </div>
                 </div>
                 <div className="w-full md:w-1/2 order-1 md:order-2">
                     <span className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-2 block">Innovation</span>
                     <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4">Advanced Technology</h3>
                     <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                         We utilize the absolute latest in diagnostic imaging technology. Our 3T MRI machines provide clearer images in less time, while our advanced PET-CT scanners allow for early detection of critical conditions with minimal radiation exposure.
                     </p>
                 </div>
              </div>

              {/* Section 2 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                 <div className="w-full md:w-1/2">
                     <span className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-2 block">Precision</span>
                     <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4">Accurate Radiology Reporting</h3>
                     <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                         Our radiologists are sub-specialty trained, meaning your neuro-scan is read by a neuro-radiologist, and your cardiac scan by a cardiac specialist. This expert review ensures the highest accuracy for your diagnosis.
                     </p>
                 </div>
                  <div className="w-full md:w-1/2">
                    <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg group">
                         <Image 
                             src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1964&auto=format&fit=crop"
                             alt="Radiology Reporting"
                             fill
                             className="object-cover group-hover:scale-110 transition-transform duration-700"
                         />
                         <div className="absolute inset-0 bg-gradient-to-l from-teal-900/40 to-transparent"></div>
                    </div>
                 </div>
              </div>
           </div>
      </section>

      {/* Services Grid (Teal Section) - Keep consistent with Pathology */}
      <section className="bg-[#00A99D] py-24 text-white">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-teal-200 font-bold tracking-widest text-sm uppercase mb-3 block">Our Expertise</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">World Class Imaging</h2>
                   <p className="text-teal-100 text-lg opacity-90">Comprehensive radiology services covering everything from routine X-rays to advanced interventional procedures.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Neuro Radiology", icon: "brain" },
                       { title: "Cardiac Imaging", icon: "heart" },
                       { title: "Musculoskeletal", icon: "bone" },
                       { title: "Women's Imaging", icon: "female" },
                       { title: "Pediatric Radiology", icon: "child" },
                       { title: "Interventional", icon: "procedure" },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-teal-400/30 pb-6 group cursor-pointer hover:border-white transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-teal-800/40 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-teal-600 transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'brain' ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" :
                                         "M13 10V3L4 14h7v7l9-11h-7z"
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{service.title}</h4>
                               <p className="text-teal-100 text-sm opacity-80">Specialized imaging services</p>
                           </div>
                           <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                       </div>
                   ))}
               </div>
           </div>
      </section>

      <section className="bg-[#EFF6FF] py-12">
        <div className="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between px-4 max-w-[1366px] mx-auto">
          <p className="text-center text-lg font-medium sm:text-left text-[#1a3a5c]">
            Need to talk to us? Call our helpline 24/7
          </p>
          <a
            href="tel:18001234567"
            className="text-2xl font-bold text-[#2957A4] underline hover:no-underline"
          >
            1800-123-4567
          </a>
        </div>
      </section>
    </main>
  );
}
