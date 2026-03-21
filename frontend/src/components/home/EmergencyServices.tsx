"use client";

import Image from "next/image";
import Link from "next/link";

export default function EmergencyServices() {
  return (
    <section id="emergency-services" className="py-24 bg-slate-50 relative overflow-hidden" aria-labelledby="24-7-services">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl translate-y-1/2 mix-blend-multiply"></div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          {/* Header Lockup */}
          <div className="relative inline-block mb-6">
            <div className="flex items-center justify-center gap-4">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e3a8a] font-heading tracking-tight">
                24x7 Services
              </h2>
            </div>
          </div>

          {/* Clean Divider */}
          <div className="w-24 h-1.5 bg-[#E85222] rounded-full mx-auto mb-8 shadow-sm"></div>

          {/* Subtitle */}
          <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            We cover a big variety of medical services, ensuring you have access to critical care whenever you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {[
            {
              title: "Emergency",
              image: "/images/banners/Emergency_24_bg.jpg",
              desc: "Equipped With the State of the Art facility to manage all types of Trauma, Medical Queries, or Surgical emergencies. Our Emergency Department.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              )
            },
            {
              title: "Blood Bank",
              image: "/images/banners/blood_bank_24_bg.jpg",
              desc: "The 24hour Blood Bank present within the campus is equipped with an ultramodern collection centre, component lab and single donor plateletpheresis (SDP).",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              )
            },
            {
              title: "Ambulance",
              image: "/images/banners/Ambulance_24_bg.avif",
              desc: "Popular Hospital has Air Ambulance services. It also provides ground ambulance services to shift patient from one hospital to another hospital.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )
            },
            {
              title: "Diagnostics & Imaging",
              image: "/images/banners/diagnostics_imaging_24_bg.avif",
              desc: "The Pathology Laboratory at Popular Hospital is fully licensed. The laboratory supplements its testing capability by using reference laboratories that provide high quality service.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              )
            },
            {
              title: "ICU Service",
              image: "/images/banners/icu_service_24_bg.jpg",
              desc: "Intensive care Unit is needed if someone is seriously ill and requires intensive treatment and close monitoring, or surgery intensive care can help them to recover.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              )
            },
            {
              title: "Pharmacy",
              image: "/images/banners/pharmacy_24_bg.avif",
              desc: "Hospital Pharmacy is situated in the campus of all the hospitals to facilitate patients fulfilling their emergency needs as well as the medicines as prescribed inside the hospital.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              )
            },
          ].map((service, idx) => (
            <div
              key={service.title}
              className="group [perspective:1000px] w-full h-[360px]"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
                
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white rounded-3xl p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#f0f9ff] flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-[#1e3a8a] group-hover:text-white transition-all duration-300 shadow-inner">
                    <svg className="w-8 h-8 text-[#1e3a8a] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-heading text-[#0b1c43] group-hover:text-[#1e3a8a] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed font-medium mb-6">
                    {service.desc}
                  </p>
                  
                  {/* Read More button for mobile (as hover flip is md: only) */}
                  <Link 
                    href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                    className="md:hidden mt-auto px-6 py-2 bg-white text-[#E85222] border-2 border-[#E85222] text-[10px] font-black rounded-full uppercase tracking-widest hover:bg-[#E85222] hover:text-white transition-all shadow-sm"
                  >
                    Read more
                  </Link>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden hidden md:flex">
                   <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover" 
                   />
                   <div className="absolute inset-0 bg-[#0b1c43]/50" />
                   <div className="relative z-10 flex flex-col items-center justify-center p-8 w-full h-full text-center">
                      <h3 className="text-white text-2xl font-bold mb-8 font-heading px-4 drop-shadow-md">{service.title}</h3>
                      <Link 
                        href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                        className="px-8 py-3 bg-[#E85222] text-white text-sm font-bold rounded-full hover:bg-white hover:text-[#E85222] transition-colors duration-300 uppercase tracking-wide shadow-lg"
                      >
                        Read more
                      </Link>
                   </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
