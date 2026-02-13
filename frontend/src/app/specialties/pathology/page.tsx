
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pathology & Laboratory Medicine | Popular Hospital',
  description: 'State-of-the-art diagnostic testing and clinical laboratory services.',
};

export default function PathologyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-[#004d61] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
             <Image
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000"
                alt="Laboratory Research"
                fill
                className="object-cover opacity-40 mix-blend-overlay"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#003B4A] via-[#003B4A]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-200 text-sm font-semibold mb-6 border border-teal-400/30 backdrop-blur-sm">
                Department of Pathology
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-heading">
                Laboratory & <br/>
                Medical Research
              </h1>
              <p className="text-teal-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
                Advanced diagnostic solutions powered by cutting-edge technology and expert pathologists. We deliver precise results for better patient outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Book a Test
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
              { title: "Biochemistry", icon: "test-tube", desc: "Chemical processes within living organisms." },
              { title: "Haematology", icon: "microscope", desc: "Study of blood and blood disorders." },
              { title: "Microbiology", icon: "virus", desc: "Study of microscopic organisms." },
              { title: "Clinical Pathology", icon: "dna", desc: "Diagnosis of disease using lab analysis." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                  {/* Simple Icons - Matching Radiology Layout */}
                   <svg className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                          item.icon === 'test-tube' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" :
                          item.icon === 'microscope' ? "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : 
                          item.icon === 'virus' ? "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" :
                          "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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

      {/* Experiment With Best Lab Product Section */}
      <section className="py-20 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1366px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
                <span className="text-[#00B4D8] font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    BETTER FOR YOU
                </span>
                
                <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-6 font-heading leading-tight">
                    Experiment With <br />
                    <span>Best Lab Product</span>
                </h2>

                <h3 className="text-xl font-bold text-[#334155] mb-3">Basic Health Check-up</h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed max-w-md">
                    Vestibulum morbi blandit cursus risus. Augue neque gravida in fermentum et sollicitudin.
                </p>

                <div className="space-y-4 mb-4 w-full">
                    {[
                        "Complete Blood Count",
                        "Blood Sugar-Fasting",
                        "post prandial",
                        "Liver Function Test"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                             <div className="w-5 h-5 rounded-full border-2 border-[#00B4D8] flex items-center justify-center text-[#00B4D8]">
                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                             </div>
                             <span className="text-gray-600 font-medium text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Column: Image (4 cols) */}
            <div className="lg:col-span-4 relative flex justify-center py-10">
                 {/* Microscope Image */}
                <div className="relative w-full aspect-[3/4] max-w-[400px]">
                    <Image
                        src="/images/microscope.png"
                        alt="Best Lab Product Microscope"
                        fill
                        className="object-contain z-10"
                        priority
                    />
                 </div>
            </div>

            {/* Right Column: Features List (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-10">
                {[
                    { title: "Report Efficiency", icon: "user" },
                    { title: "Complete Cases", icon: "flask" },
                    { title: "Our Equipment", icon: "microscope" }
                ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-5 group">
                        <div className="w-14 h-14 rounded-full bg-[#1E3A8A] flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:bg-[#162c6b] transition-colors">
                             {/* Icons */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                  feature.icon === 'user' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : 
                                  feature.icon === 'flask' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" :
                                  "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              } />
                            </svg>
                        </div>
                        <div className="pt-1">
                            <h4 className="text-[#1E3A8A] font-bold text-lg mb-2">{feature.title}</h4>
                            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                                Vestibulum morbi blandit cursus risus. Augue neque gravida.
                            </p>
                            <div className="h-px bg-gray-200/60 w-full mt-5"></div>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>
      </section>

      {/* Feature Strip 1 */}
      <section className="py-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                 <div className="md:w-1/2">
                     <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">Make informed health decisions.</h3>
                     <p className="text-gray-600 text-lg leading-relaxed mb-8">
                         Understanding your lab results is crucial. Our digital reports come with detailed explanations and trend analysis to help you and your doctor make the best decisions.
                     </p>
                     <Link href="#" className="text-teal-600 font-bold hover:underline flex items-center gap-2 text-lg">
                         View Sample Report
                         <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                     </Link>
                 </div>
                 <div className="md:w-1/2 relative h-[300px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800"
                        alt="Digital Health Report"
                        fill
                        className="object-cover"
                      />
                 </div>
            </div>
        </div>
      </section>

      {/* Feature Strip 2 */}
      <section className="py-10 px-4">
        <div className="mx-auto w-full max-w-[1366px] px-4">
            <div className="bg-gradient-to-l from-teal-50/50 to-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col-reverse md:flex-row items-center gap-12 shadow-sm border border-teal-50 group hover:shadow-md transition-shadow">
                 <div className="md:w-1/2 relative h-[300px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800"
                        alt="Data Analytics in Healthcare"
                        fill
                        className="object-cover"
                      />
                 </div>
                 <div className="md:w-1/2">
                     <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">It's all about the data.</h3>
                     <p className="text-gray-600 text-lg leading-relaxed mb-8">
                         We utilize AI-driven analytics to detect anomalies faster than ever before. Our extensive database helps in predicting potential health risks effectively.
                     </p>
                     <Link href="#" className="text-teal-600 font-bold hover:underline flex items-center gap-2 text-lg">
                         Learn about our Tech
                         <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                     </Link>
                 </div>
            </div>
        </div>
      </section>

      {/* Services Grid (Teal Section) */}
      <section className="bg-[#00A99D] py-24 text-white mt-10">
           <div className="mx-auto w-full max-w-[1366px] px-4">
               <div className="text-center mb-16 max-w-2xl mx-auto">
                   <span className="text-teal-200 font-bold tracking-widest text-sm uppercase mb-3 block">Our Services</span>
                   <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">High Quality Test Services</h2>
                   <p className="text-teal-100 text-lg opacity-90">Comprehensive diagnostic services covering everything from routine blood work to advanced genetic testing.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                   {[
                       { title: "Diagnostic Testing", icon: "flask" },
                       { title: "Food Sensitivity", icon: "apple" },
                       { title: "Naturopathic Testing", icon: "leaf" },
                       { title: "Biochemistry Tests", icon: "atom" },
                       { title: "Chemical Research", icon: "beaker" },
                       { title: "Genetic Testing", icon: "dna" },
                   ].map((service, idx) => (
                       <div key={idx} className="flex items-start gap-4 border-b border-teal-400/30 pb-6 group cursor-pointer hover:border-white transition-colors">
                           <div className="w-12 h-12 rounded-lg bg-teal-800/40 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-teal-600 transition-all shadow-md">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={
                                         service.icon === 'flask' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" :
                                         service.icon === 'apple' ? "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" : 
                                         service.icon === 'leaf' ? "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" : 
                                         "M13 10V3L4 14h7v7l9-11h-7z" 
                                     } />
                                </svg>
                           </div>
                           <div className="flex-1">
                               <h4 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{service.title}</h4>
                               <p className="text-teal-100 text-sm opacity-80">Advanced comprehensive analysis</p>
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
 