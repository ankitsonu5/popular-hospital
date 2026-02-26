import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Care Services | Popular Hospital',
  description: 'Providing genuine health care beyond the four walls of a hospital with expert medical advice and 24x7 nursing care at home.',
};

export default function HomeCarePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000"
            alt="Elderly Care at Home"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex mb-6 text-sm text-gray-300 font-medium tracking-wide justify-start" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-3 text-gray-500">/</span>
              <span className="hover:text-white transition-colors">Services</span>
              <span className="mx-3 text-gray-500">/</span>
              <span className="text-blue-400">Home Care</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              <span className="text-blue-500 bg-clip-text">Home Care</span> <br/> Services
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 mb-10 font-medium leading-relaxed max-w-2xl">
              Quality care at the comfort of your doorsteps aiming to make healthcare affordable and convenient.
            </p>
            <div className="flex flex-wrap gap-4">
               <a href="/book" className="px-8 py-3.5 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 tracking-wide text-sm flex items-center gap-2">
                 Book Home Assessment
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 lg:py-28 bg-gray-50/50">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
            
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                
                {/* Content Side */}
                <div className="w-full lg:w-[60%] lg:pr-10">
                    <p className="text-gray-600 leading-relaxed text-justify text-[1.05rem] mb-6">
                       With the introduction of Home Care Services. Popular Hospital has focused on providing quality care at the comfort of your doorsteps with an aim to making healthcare more affordable as well as convenient to the consumer. Since it is known that many patients struggle to get to the hospitals, this initiative will make sure that the crucial medical services can be offered to as many individuals as possible, and they do not have to undergo the hassle of traveling regularly.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-justify text-[1.05rem] mb-6">
                       Our services include doctor consultations for expert medical advice, 24/7 nursing care for continuous monitoring, physiotherapy sessions to aid recovery and mobility, and blood sample collection at home for timely diagnosis. Additionally, our focus is to ensure a holistic approach to care.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-justify text-[1.05rem] mb-6 font-medium text-[#1a3a6b]">
                       This is not merely a service but rather a genuine of Popular Hospital to offer caring health care beyond the four walls of a hospital. We expect to reduce the discomfort due to travelling, save time and provide a patient and family peace of mind by making professional medical support available at home.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-justify text-[1.05rem] mb-12">
                       When you seek the services of Home Care Services in Popular Hospital, you could rest assured that you will get high quality services, top notch medical assistance and even the feeling of personal care and attention, but where you feel most comfortable.
                    </p>

                    {/* Service Lists Nested */}
                    <div className="space-y-12">
                       {/* 1 */}
                       <div>
                          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] font-heading mb-4 leading-tight">Doctor Consultation</h2>
                          <div className="flex items-center gap-2 mb-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <div className="w-12 h-[2px] bg-blue-600"></div>
                          </div>
                          <ul className="space-y-3">
                              {['Doctor visit at home on Appointment', 'Doctor Video Call Consultation', 'Dietitian services on Video Call'].map((item, id) => (
                                <li key={id} className="flex gap-3 text-gray-700 items-start">
                                    <span className="text-blue-500 font-bold mt-0.5">›</span> <span className="text-[1.05rem] leading-snug">{item}</span>
                                </li>
                              ))}
                          </ul>
                       </div>

                       {/* 2 */}
                       <div>
                          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] font-heading mb-4 leading-tight">24x7 Nursing Care</h2>
                          <div className="flex items-center gap-2 mb-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <div className="w-12 h-[2px] bg-blue-600"></div>
                          </div>
                          <ul className="space-y-3">
                              {[
                                  'Elderly Care at Home', 'Wound Care', 'Urinary Catheterisation', 
                                  'Suture Removal', 'Basic IV Procedure', 'Vaccinations-Injection Services', 
                                  'Bed Sore Asst. & Management', 'Regular monitoring of vitals', 'Ryle\'s Tube insertion and Feeding'
                              ].map((item, id) => (
                                <li key={id} className="flex gap-3 text-gray-700 items-start">
                                    <span className="text-blue-500 font-bold mt-0.5">›</span> <span className="text-[1.05rem] leading-snug">{item}</span>
                                </li>
                              ))}
                          </ul>
                       </div>

                       {/* 3 */}
                       <div>
                          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] font-heading mb-4 leading-tight">Physiotherapy Therapy</h2>
                          <div className="flex items-center gap-2 mb-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <div className="w-12 h-[2px] bg-blue-600"></div>
                          </div>
                          <ul className="space-y-3">
                              {['Orthopaedic Injuries', 'Sports Injuries', 'Back and Neck Pain', 'Fall Prevention for Elders'].map((item, id) => (
                                <li key={id} className="flex gap-3 text-gray-700 items-start">
                                    <span className="text-blue-500 font-bold mt-0.5">›</span> <span className="text-[1.05rem] leading-snug">{item}</span>
                                </li>
                              ))}
                          </ul>
                       </div>

                       {/* 4 */}
                       <div>
                          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] font-heading mb-4 leading-tight">Blood Sample Collection</h2>
                          <div className="flex items-center gap-2 mb-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <div className="w-12 h-[2px] bg-blue-600"></div>
                          </div>
                          <ul className="space-y-3">
                              {['Lab Test at Home', 'ECG at Home', 'General Health Checkup', 'Senior Citizen health packages'].map((item, id) => (
                                <li key={id} className="flex gap-3 text-gray-700 items-start">
                                    <span className="text-blue-500 font-bold mt-0.5">›</span> <span className="text-[1.05rem] leading-snug">{item}</span>
                                </li>
                              ))}
                          </ul>
                       </div>

                       {/* 5 */}
                       <div>
                          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] font-heading mb-4 leading-tight">Other Services</h2>
                          <div className="flex items-center gap-2 mb-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <div className="w-12 h-[2px] bg-blue-600"></div>
                          </div>
                          <ul className="space-y-3">
                              {['Vaccination (Routine & Seasonal at home)'].map((item, id) => (
                                <li key={id} className="flex gap-3 text-gray-700 items-start">
                                    <span className="text-blue-500 font-bold mt-0.5">›</span> <span className="text-[1.05rem] leading-snug">{item}</span>
                                </li>
                              ))}
                          </ul>
                       </div>

                       {/* 6 */}
                       <div>
                          <h2 className="text-2xl lg:text-3xl font-black text-[#0b1c43] font-heading mb-4 leading-tight">Support Services</h2>
                          <div className="flex items-center gap-2 mb-6">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                              <div className="w-12 h-[2px] bg-blue-600"></div>
                          </div>
                          <ul className="space-y-3">
                              {['24X7 Ambulance Services', 'Medicine Services at door step'].map((item, id) => (
                                <li key={id} className="flex gap-3 text-gray-700 items-start">
                                    <span className="text-blue-500 font-bold mt-0.5">›</span> <span className="text-[1.05rem] leading-snug">{item}</span>
                                </li>
                              ))}
                          </ul>
                       </div>

                    </div>
                </div>

                {/* Right Side Image Focus Layout */}
                <div className="w-full lg:w-[40%] flex justify-center sticky top-32">
                   <div className="relative w-full max-w-[450px] aspect-square lg:aspect-[4/5] mt-10 lg:mt-0">
                      <div className="absolute inset-0 bg-blue-100 rounded-[5rem] translate-x-3 translate-y-3 -z-10 shadow-lg"></div>
                      <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-[5rem] rounded-tr-none border-8 border-white">
                          <Image
                             src="https://images.unsplash.com/photo-1583947581924-860bda6a45df?auto=format&fit=crop&q=80&w=800"
                             alt="Nurse helping elderly patient"
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
