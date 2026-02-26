import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blood Bank Services | Popular Hospital',
  description: '24/7 Blood Bank services at Popular Hospital ensuring availability of safe blood and blood components with the highest quality standards.',
};

const sections = [
  {
    id: 'department',
    title: 'Department of Blood Bank',
    content: (
      <>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          There is a always a significant, ongoing need for blood and blood products. Because there is no substitute for human blood, the generosity of blood donors helps to ensure that we maintain an adequate supply for our patients. Giving just one pint of your blood can help save the lives of three patients, and the entire process of blood donation only takes about an hour.
        </p>
        <h3 className="text-xl font-bold mb-3 text-blue-500 mt-6 pt-4 border-t border-gray-100">
          The donation process is simple. You may be eligible to donate blood if you:
        </h3>
        <ul className="list-none space-y-2 mb-6 text-sm lg:text-base text-gray-600">
          <li className="flex gap-3 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> are 18 - 60 years old</li>
          <li className="flex gap-3 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> weight at least 45 kgs</li>
          <li className="flex gap-3 items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> are in good health</li>
          <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span> <span className="text-justify">Donations of whole blood and platelets are needed every day — red blood cells can be stored for 42 days and platelets for 5 days.</span></li>
        </ul>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          Latest techniques are used for immuno-hematological testing, for blood compatibility and for diagnosis. The department is committed to ensure availability of safe blood. We supply best quality blood and components, prepared from unremunerated donors, screened by appropriate methods and stored and transported at right temperature. We also maintain a quality system which is compliant of all existing statutory provisions of the Drugs and cosmetic act 1940 and amendments, other directives from Drug Controller General of India, National Blood Policy, NACO guidelines on HIV screening and NABH guidelines.
        </p>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          Blood is carefully screened for transfusion transmitted infections (HBsAg, HCV, HIV I&II - using CMIA technology along with RPR and malarial antigen testing). Stringent quality control practices include testing of a defined number of units of each product for the appropriate parameters. The facility is licensed by Drug controller General India.
        </p>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          The department has adopted Leukoreduction technology (Opti) to provide Leukoreduced Red Cells. Red cell grouping, antibody screening, antihuman globulin test & cross match are being done routinely using latest technique of gel technology. We have facility for advanced tests (Identification of antigen, antibody & rare blood groups) 
        </p>
        <p className="mb-4 text-gray-600 leading-relaxed text-sm lg:text-base text-justify font-semibold">
          The Department provides round the clock service including platelet apheresis and peripheral stem cell harvesting.
        </p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Blood donation setup',
  },
  {
    id: 'health-benefits',
    title: 'Health benefits of donating blood',
    subtitle: 'Reduces chances of heart attack:',
    content: (
      <>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify mb-4">
          It has been observed that increase in blood iron level increases the chance of heart disease. Iron is involved in the oxidation of cholesterol and this process is believed to be detrimental for the arteries. Increases blood iron level favors this process of cholesterol oxidation and thus leads to heart disease. Regular blood donation helps in loosing iron on regular basis. It helps in reducing the chance of heart attack to one third.
        </p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Medical checkup',
  },
  {
    id: 'enhance-production',
    title: 'Enhance the production of new Red',
    subtitle: 'Blood cells:',
    content: (
      <>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify mb-4">
          As the blood is withdrawn from the donors body there is decrease in blood cells. To replenish it, immediately new cells are produced by marrow and this way blood gets refreshed. Therefore donating blood helps in stimulating generation of new blood cells.
        </p>
        <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
          Apart from all these benefits a donor gets a mini blood test done before donating blood. This includes Hematocrit i.e. Hb level test, Blood pressure is measured, body weight is checked. After this blood is collected it tested for 5 major diseases. Those are Hepatitis B, Hepatitis C, HIV, Syphilis and malaria. Donor is informed if any of these test found to be positive.
        </p>
      </>
    ),
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Blood tubes',
  },
  {
    id: 'components',
    title: 'Specialized services',
    subtitle: 'Blood components:',
    content: (
      <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
        Thanks to advances in medical technology, blood can be separated into its different components. Hence, one unit is used to prepare red blood cells, platelet concentrate and plasma each of which can be given to three different patients and therefore one unit of blood when separated into component can save 3 lives.
      </p>
    ),
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Patient giving blood',
  },
  {
    id: 'component-therapy',
    title: 'What is blood component therapy?',
    subtitle: 'Various reason as quoted by WHO are:',
    content: (
      <ul className="grid grid-cols-1 gap-4 mt-2 text-sm lg:text-base text-gray-600">
        {[
          'The recipient can be treated with only those blood components that are lacking, reducing the occurrence of adverse transfusion reactions.',
          'More than one patient can be treated with blood components derived from one donation.',
          'Therapeutic support for patients with special transfusion requirements can be provided, for example, plasma that often is not directly needed for transfusion can be used manufacturing of Factor VIII concentrate for Haemophilia A patients.',
          'Improved quality and functional capacity of each component when varied storage conditions and shelf lives were applied.',
          'It has also been observed that infants treated with reconstituted blood (mixture of separated blood components) instead of whole blood recover faster.',
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <svg className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
            <span className="text-justify">{item}</span>
          </li>
        ))}
      </ul>
    ),
    image: 'https://images.unsplash.com/photo-1532187643603-c11c8d6e3a7f?auto=format&fit=crop&q=80&w=1200',
    imgAlt: 'Blood bag',
  }
];

export default function BloodBankPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=2000"
            alt="Blood Bank Services"
            fill
            className="object-cover opacity-25 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex mb-6 text-sm text-gray-300 font-medium tracking-wide" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-3 text-gray-500">/</span>
              <span className="hover:text-white transition-colors">Services</span>
              <span className="mx-3 text-gray-500">/</span>
              <span className="text-red-400">Blood Bank</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 font-heading tracking-tight leading-[1.1]">
              <span className="text-white">Department of</span> <br />
              <span className="text-blue-500 bg-clip-text">Blood Bank</span>
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl text-blue-100/90 mb-12 font-medium leading-relaxed max-w-2xl">
              Equipped with latest techniques for immuno-hematological testing and component separation. Give blood and save a life today!
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+917800001895" className="px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 w-full sm:w-auto text-sm sm:text-base uppercase tracking-wider">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call +91-7800001895
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (Zig-Zag Layout) */}
      <section className="py-24">
        <div className="container mx-auto max-w-[1366px] px-6 lg:px-12">
          <div className="flex flex-col gap-24 lg:gap-32">
            {sections.map((section, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={section.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}>
                  
                  {/* Content */}
                  <div className="w-full lg:w-[55%]">
                    {section.subtitle ? (
                      <>
                        <h2 className="text-lg lg:text-xl font-bold text-blue-600 mb-1 lg:mb-2 font-heading tracking-wide">
                          {section.title}
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                           <h3 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight capitalize">
                             {section.subtitle}
                           </h3>
                           <div className="flex-1 h-px bg-gray-200 mt-2"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                           <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] font-heading leading-tight capitalize">
                             {section.title}
                           </h2>
                           <div className="flex-1 h-px bg-gray-200 mt-2"></div>
                        </div>
                      </>
                    )}
                    
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {section.content}
                    </div>
                  </div>

                  {/* Image with Pill Masking */}
                  <div className="w-full lg:w-[45%] flex justify-center">
                    <div className="relative w-full max-w-[500px]">
                      {/* Decorative Element */}
                      <div className={`absolute -inset-4 bg-blue-50 rounded-full blur-2xl opacity-60 z-0`}></div>
                      
                      {/* Image Container */}
                      <div className={`relative w-full aspect-[4/3] sm:aspect-[4/3] md:aspect-[5/3] lg:aspect-[4/3] z-10 overflow-hidden shadow-xl border-4 border-white
                          ${isEven ? 'rounded-tl-[8rem] rounded-br-[8rem] rounded-tr-[1rem] rounded-bl-[1rem]' : 'rounded-tr-[8rem] rounded-bl-[8rem] rounded-tl-[1rem] rounded-br-[1rem]'} 
                        `}>
                        <Image
                          src={section.image}
                          alt={section.imgAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <section className="bg-gradient-to-r from-red-50 to-red-100 py-20 px-6 border-t border-red-200">
        <div className="container mx-auto max-w-[1366px] text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0b1c43] mb-5 font-heading">Ready to save a life?</h2>
          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">Donating blood is safe and simple, taking only about an hour. Call our Blood Bank to schedule your donation.</p>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl inline-flex flex-col sm:flex-row items-center gap-6 border border-red-100 relative group">
             <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 animate-[pulse_2s_infinite]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
             </div>
             <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.1em] mb-1">Blood Bank Team</p>
                <a href="tel:+917800001895" className="text-3xl md:text-5xl font-black text-red-600 group-hover:text-red-700 transition-colors">
                  +91-7800001895
                </a>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
