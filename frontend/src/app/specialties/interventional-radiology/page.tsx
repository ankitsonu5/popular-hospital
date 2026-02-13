'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function InterventionalRadiologyPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const services = [
    { number: '01', title: 'Sonogram', description: 'Advanced ultrasound imagining for precise diagnostics.' },
    { number: '02', title: '3T MRI Scans', description: 'High-resolution magnetic resonance imaging technology.' },
    { number: '03', title: 'CT Scan', description: 'Comprehensive computed tomography for detailed internal views.' },
    { number: '04', title: 'X-Ray / USG', description: 'Standard radiography and ultrasonography services.' },
  ];



  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">
        {/* Background Image Placeholder - In production use actual radiology image */}
        <div className="absolute inset-0 bg-gray-900 z-0">
             <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
                alt="Radiology Background"
                fill
                className="object-cover opacity-40 hover:scale-105 transition-transform duration-1000 ease-in-out"
                priority
             />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-4 border border-blue-400/30">
              Department of Radiology
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
              The Value of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">
                Clinical Radiology
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Advanced imaging technology meets expert clinical interpretation. Our interventional radiology team provides minimally invasive treatments with maximum precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/30">
                Book Appointment
              </Link>
              <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm border border-white/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Stats Cards */}
      <section className="relative z-20 -mt-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Patient Safety', desc: 'Lowest radiation dose protocols', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { title: 'Modern Tech', desc: 'Latest 3T MRI & 128 Slice CT', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
            { title: 'Certified Experts', desc: 'Board-certified radiologists', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { title: '24/7 Services', desc: 'Emergency radiology support', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Exceptional Care */}
      <section className="py-20 bg-gray-50/50 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
                <div className="relative">
                     <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-6 relative z-10">
                        Exceptional <br />
                        <span className="text-blue-600">Radiology Care</span> for Patients
                     </h2>
                </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our Interventional Radiology department combines personalized care with cutting-edge technology. Whether you need a routine X-ray or a complex MRI, our team ensures a comfortable, safe, and precise imaging experience.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Advanced 3D Mammography',
                  'High-Field Open MRI for claustrophobic patients',
                  'Low-dose CT technology for patient safety',
                  'Same-day appointments for urgent cases'
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                        <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </span>
                        {item}
                    </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-[#F05A28] text-white rounded-lg font-medium hover:bg-[#d0491c] transition-colors">
                Meet Our Specialists
              </button>
            </div>
            <div className="w-full lg:w-1/2 relative">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] group cursor-pointer bg-black" onClick={() => setIsVideoPlaying(true)}>
                    {!isVideoPlaying ? (
                        <>
                            <Image 
                                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2664&auto=format&fit=crop"
                                alt="Radiology Procedure Video"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            
                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-75"></div>
                                    <div className="w-20 h-20 bg-[#F05A28] rounded-full flex items-center justify-center shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#d0491c] text-white">
                                        <svg className="w-8 h-8 ml-1 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Video Text */}
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h3 className="text-2xl font-bold mb-2 font-heading">Inside the Radiology Lab</h3>
                                <p className="text-gray-200 text-sm line-clamp-2 max-w-md">Experience how our advanced technology and expert team work together to provide precise diagnostics.</p>
                            </div>
                        </>
                    ) : (
                        <video 
                            className="w-full h-full object-cover"
                            src="/videos/hero.mp4" 
                            controls
                            autoPlay
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
               </div>
            </div>
          </div>
        </div>
      </section>

       {/* Technology Sections - Alternating */}
       <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
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
                         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
                   </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                    <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Innovation</span>
                    <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4">Advanced Technology</h3>
                    <p className="text-gray-600 mb-6">We utilize the absolute latest in diagnostic imaging technology. Our 3T MRI machines provide clearer images in less time, while our advanced PET-CT scanners allow for early detection of critical conditions with minimal radiation exposure.</p>
                </div>
             </div>

             {/* Section 2 */}
             <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                    <span className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-2 block">Precision</span>
                    <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4">Accurate Radiology Reporting</h3>
                    <p className="text-gray-600 mb-6">Our radiologists are sub-specialty trained, meaning your neuro-scan is read by a neuro-radiologist, and your cardiac scan by a cardiac specialist. This expert review ensures the highest accuracy for your diagnosis.</p>
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
      
      {/* Services List - Blue Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M47.5,-59.8C61.3,-50.2,71.8,-35.1,75.9,-18.2C80,-1.4,77.7,17.2,68.6,31.7C59.5,46.2,43.7,56.6,28.2,61.9C12.7,67.2,-2.5,67.5,-16.9,62.6C-31.3,57.7,-44.8,47.6,-54.6,34.7C-64.4,21.8,-70.5,6.1,-67.4,-8.1C-64.3,-22.3,-52,-35,-39.8,-45.1C-27.6,-55.2,-15.5,-62.7,0.8,-63.7C17.1,-64.7,33.7,-59.5,47.5,-59.8Z" transform="translate(100 100)" />
             </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
           <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="w-full lg:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12">Imaging Services</h2>
                    <div className="space-y-8">
                       {services.map((service, idx) => (
                           <div key={idx} className="flex gap-6 group cursor-pointer">
                               <div className="text-4xl font-bold text-blue-400 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all font-heading">
                                   {service.number}
                               </div>
                               <div>
                                   <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">{service.title}</h3>
                                   <p className="text-blue-100/80 leading-relaxed max-w-md">{service.description}</p>
                               </div>
                           </div>
                       ))}
                    </div>
               </div>
               <div className="w-full lg:w-1/2">
                    <div className="relative rounded-full aspect-square w-full max-w-[500px] border-[20px] border-white/5 mx-auto overflow-hidden shadow-2xl">
                         <Image 
                            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop"
                            alt="Imaging Services Collage"
                            fill
                            className="object-cover"
                         />
                         <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
                    </div>
               </div>
           </div>
        </div>
      </section>



      {/* Helpline Section */}
      <section className="bg-[#EFF6FF] py-12">
        <div className="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-lg font-medium sm:text-left text-[#1a3a5c]">
            Need to talk to us? Call our helpline 24/7
          </p>
          <a
            href="tel:1800-123-4567"
            className="text-2xl font-bold text-[#2957A4] underline hover:no-underline font-heading"
          >
            1800-123-4567
          </a>
        </div>
      </section>

    </main>
  );
}
