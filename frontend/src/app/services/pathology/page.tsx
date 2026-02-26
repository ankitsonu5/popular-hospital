import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pathology Services | Popular Hospital',
  description: 'NABL Accredited Best Pathology & Microbiology Testing Laboratory equipped with world-class instruments.',
};

export default function PathologyPage() {
  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000"
            alt="Pathology Laboratory"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 w-full text-center md:text-left">
            <nav className="flex mb-6 text-sm text-gray-300 font-medium tracking-wide justify-center md:justify-start" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-3 text-gray-500">/</span>
              <span className="hover:text-white transition-colors">Services</span>
              <span className="mx-3 text-gray-500">/</span>
              <span className="text-blue-400">Pathology</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              <span className="text-white">Department of</span> <br />
              <span className="text-blue-500 bg-clip-text">Pathology</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 mb-12 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
              Popular Hospitals has its in-house state-of-the-art laboratory services, catering to all the needs of the patients, with the utmost integrity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <a href="/book" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 uppercase tracking-wider text-sm flex items-center gap-2">
                 Schedule an Appointment
               </a>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              <div className="w-32 h-32 relative bg-white rounded-full p-4 mb-4 flex items-center justify-center shadow-inner">
                  <Image 
                     src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/National_Accreditation_Board_forTesting_and_Calibration_Laboratories_Logo.svg/1200px-National_Accreditation_Board_forTesting_and_Calibration_Laboratories_Logo.svg.png" 
                     alt="NABL Accredited" 
                     width={80} height={80} 
                     className="object-contain filter grayscale opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
              </div>
              <h3 className="text-white font-bold text-center tracking-widest text-lg">NABL ACCREDITED</h3>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="w-full lg:w-[60%] lg:pr-10">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] mb-6 font-heading leading-tight">
                        Best Pathology & Microbiology <br className="hidden md:block"/> <span className="text-blue-600">Testing Laboratory</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8"></div>
                    
                    <p className="text-gray-600 leading-relaxed text-justify mb-5 font-semibold italic text-lg text-[#1a3a6b]">
                        "At Popular we believe, quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction and skillful execution."
                    </p>
                    
                    <p className="text-gray-600 leading-loose text-justify text-[1.05rem] mb-6">
                        Popular Pathology Laboratory is committed to providing quality with care even in emergency situations. It is said that emergencies may arise without a warning and at any time. Handling critical cases instantly and catching the right 'Pulse' by beating the 'Deadline' is the key to recovery. Popular hospitals unique and hi-tech laboratory, which has got world-class instruments and well-trained, and efficient staff.
                    </p>
                    <p className="text-gray-600 leading-loose text-justify text-[1.05rem] mb-8">
                        Popular Pathology Laboratory is accredited by the NABL (National Accreditation Board of Calibration, Testing Laboratory). It is the proof that Popular not only gets into the 'Heart' of the tests/ research conducted in the most authentic way but provides round-the-clock services considering its Best blood testing laboratory the fact that time and tide wait for none!
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
                        {['Immunology', 'Biochemistry', 'Hematology', 'Clinical Pathology', 'Serology', 'Microbiology'].map((item, idx) => (
                           <div key={idx} className="flex items-center gap-2 text-[#1a3a6b] font-medium">
                               <span className="text-blue-500 font-bold">›</span>
                               {item}
                           </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-[40%] flex justify-center lg:justify-end mt-10 lg:mt-0">
                    {/* Specialized Shield Shape Image */}
                    <div className="relative w-full max-w-[400px] aspect-[3/4]">
                        <div className="absolute inset-0 bg-blue-100 rounded-bl-[10rem] rounded-tr-[5rem] translate-x-4 translate-y-4"></div>
                        <div className="relative w-full h-full rounded-bl-[10rem] rounded-tr-[5rem] overflow-hidden shadow-2xl border-white border-8">
                            <Image
                                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"
                                alt="Laboratory Work"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Instruments Section */}
      <section className="py-20 bg-gray-50/80 border-y border-gray-100">
         <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
            <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
                
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                    {/* Blob Shape Image */}
                    <div className="relative w-full max-w-[450px] aspect-square">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-tl-[10rem] rounded-br-[10rem] rounded-tr-3xl rounded-bl-3xl -translate-x-4 translate-y-4"></div>
                        <div className="relative w-full h-full overflow-hidden shadow-2xl border-white border-8 rounded-tl-[10rem] rounded-br-[10rem] rounded-tr-3xl rounded-bl-3xl">
                            <Image
                                src="https://images.unsplash.com/photo-1582719471384-894f285ca444?auto=format&fit=crop&q=80&w=800"
                                alt="Microscope"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] mb-6 font-heading leading-tight">
                        Few of our most <span className="text-blue-600">prominent <br /> instruments</span> are:
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-10"></div>
                    
                    <ul className="space-y-4 text-gray-600">
                        {[
                            'VITROS ECi Immuno diagnostic analyser (Johnson & Johnson)',
                            'VITROS 250 Biochemistry analyser (Johnson & Johnson)',
                            'CELL-DYN 3700 Hematology analyser',
                            'TURBOX PLUS Nephlometery analyser',
                            'COASU 411 Urine analyser',
                            'MICRO SHED ESR SYSTEM'
                        ].map((item, idx) => (
                           <li key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mt-0.5">›</span>
                                <span className="font-medium text-[1.05rem]">{item}</span>
                           </li>
                        ))}
                    </ul>
                </div>

            </div>
         </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 rounded-l-[15rem] -z-10 hidden lg:block"></div>
         
         <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                
                <div className="w-full lg:w-3/5">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] mb-6 font-heading leading-tight">
                        Internal Quality <span className="text-blue-600">Assurance:</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-10"></div>
                    
                    <ul className="space-y-4 text-gray-600 text-[1.05rem] leading-relaxed text-justify mb-16">
                        {[
                            'Quality control samples are run every day at pre-determined intervals before the commencement of testing of actual patient samples',
                            'Daily analysis of 2 or 3 levels i.e. low, medium, and high level of third-party controls before analyzing patients samples',
                            'Ideal blood collection via vacutainer system to avoid activation of clotting mechanism',
                            'Periodic calibration of machines',
                            'Complete documentation like log books for instruments, daily, weekly and monthly maintenance books etc.',
                            'Every 4 hrs monitoring and documentation of various temperature-sensitive instruments like refrigerator and deep freezer where reagents, kits and samples are stored',
                            'Interfacing of an instrument to software, so that transfer of data occurs automatically i.e. No manual error while preparing reports',
                            'A dual check of reports by qualified and well trained technical staff and final approval by Pathologist',
                            'A repeat of abnormal samples by different technologists'
                        ].map((item, idx) => (
                           <li key={idx} className="flex items-start gap-3">
                               <span className="text-blue-500 font-bold mt-1">›</span>
                               <span>{item}</span>
                           </li>
                        ))}
                    </ul>

                    <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] mb-6 font-heading leading-tight">
                        External Quality <span className="text-blue-600">Assessment Scheme:</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8"></div>
                    <p className="text-gray-600 leading-loose text-justify text-[1.05rem]">
                        External quality assessment schemes are accepted around the world as invaluable tools for laboratories, to assess the performance of their test systems. Popular has a tie-up with BIORAD for analyzing hematology, biochemistry & immunology panels which significantly improves our laboratory services in terms of performance evaluation, patient care and safety issues and overall quality of laboratory practices.
                    </p>
                </div>

                <div className="w-full lg:w-2/5 flex justify-center lg:sticky lg:top-32">
                    {/* Arch Shape Image */}
                    <div className="relative w-full max-w-[450px] aspect-[3/4]">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-[#0b1c43] rounded-t-full rounded-b-3xl translate-x-4 translate-y-4 shadow-xl"></div>
                        <div className="relative w-full h-full overflow-hidden shadow-xl border-white border-8 rounded-t-full rounded-b-3xl">
                            <Image
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                                alt="Laboratory Professional"
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
