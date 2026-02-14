
import Image from "next/image";
import Link from 'next/link';
import { Metadata } from 'next';

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

      {/* Floating Cards / Features */}
      <section className="relative z-20 -mt-16 pb-20 px-4">
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

      {/* Services Grid (Teal Section) - Keep consistent with Pathology */}
      <section className="bg-[#00A99D] py-24 text-white mt-10">
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
