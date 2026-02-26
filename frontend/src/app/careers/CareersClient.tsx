'use client';

import { useState } from 'react';
import Link from 'next/link';

const medicoOpenings = [
  {
    postedOn: "25-11-2025",
    department: "Anaesthesiology",
    designation: "Consultant",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "2025-12-30",
    hasDetails: true
  },
  {
    postedOn: "25-11-2025",
    department: "Endocrinology",
    designation: "Endocrinologist (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    hasDetails: false
  },
  {
    postedOn: "25-11-2025",
    department: "Cardiothoracic & Vascular Surgery (CTVS)",
    designation: "CTVS Surgeon (CTVS)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    hasDetails: false
  },
  {
    postedOn: "25-11-2025",
    department: "Critical Care",
    designation: "Critical Care Medicine (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    hasDetails: false
  },
  {
    postedOn: "25-11-2025",
    department: "Gastrology",
    designation: "Gastroenterologist (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    hasDetails: false
  },
  {
    postedOn: "25-11-2025",
    department: "Cardiology",
    designation: "Cardiologist (DM)",
    location: "Varanasi/Mirzapur",
    position: "1",
    lastDate: "-",
    hasDetails: false
  },
];

const nonMedicoOpenings = [
  {
    postedOn: "26-11-2025",
    department: "Administration",
    designation: "Facility Manager",
    location: "Varanasi",
    position: "2",
    lastDate: "2026-01-15",
    hasDetails: true
  },
  {
    postedOn: "26-11-2025",
    department: "HR",
    designation: "HR Executive",
    location: "Varanasi",
    position: "1",
    lastDate: "2026-01-10",
    hasDetails: true
  },
];

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState<'Medico' | 'Non-Medico'>('Medico');

  const currentOpenings = activeTab === 'Medico' ? medicoOpenings : nonMedicoOpenings;

  return (
    <div className="bg-[#f0f7ff] min-h-screen pt-24 pb-20">
      <div className="max-w-[1366px] mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a3a5c] mb-6 font-heading tracking-tight leading-tight">
             Careers at <span className="text-[#E85222]">Popular Hospital</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-4xl">
            Popular Group of Hospitals provides a solid foundation for developing a fulfilling professional career. 
            Join our team of dedicated medical professionals and make a real difference in patient care.
          </p>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-4 mb-10 p-2 bg-white/50 backdrop-blur-sm rounded-[2rem] w-fit border border-white">
          <button
            onClick={() => setActiveTab('Medico')}
            className={`px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all duration-300 ${
              activeTab === 'Medico'
                ? 'bg-[#1a3a5c] text-white shadow-xl shadow-blue-900/20 px-12'
                : 'bg-transparent text-gray-400 hover:text-[#1a3a5c]'
            }`}
          >
            Medical Openings
          </button>
          <button
            onClick={() => setActiveTab('Non-Medico')}
            className={`px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-sm transition-all duration-300 ${
              activeTab === 'Non-Medico'
                ? 'bg-[#1a3a5c] text-white shadow-xl shadow-blue-900/20 px-12'
                : 'bg-transparent text-gray-400 hover:text-[#1a3a5c]'
            }`}
          >
            Non-Medical & Admin
          </button>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentOpenings.map((job, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                   <div className="bg-[#f0f7ff] text-[#2a7a8c] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                     {job.department}
                   </div>
                   <div className="text-gray-300 text-[11px] font-bold">
                     Posted: {job.postedOn}
                   </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-[#1a3a5c] mb-4 group-hover:text-[#E85222] transition-colors leading-tight">
                  {job.designation}
                </h3>

                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      </div>
                      {job.location}
                   </div>
                   <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      </div>
                      Positions: {job.position}
                   </div>
                   <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      </div>
                      Last Date: <span className={job.lastDate === '-' ? 'text-slate-400 underline underline-offset-4 decoration-slate-200' : 'text-[#E85222]'}>{job.lastDate === '-' ? 'Ongoing' : job.lastDate}</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {job.hasDetails && (
                  <button className="w-full py-3 bg-[#2a7a8c]/5 text-[#2a7a8c] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2a7a8c] hover:text-white transition-all">
                    View Job Details
                  </button>
                )}
                <Link href="/apply" className="w-full py-4 bg-[#1a3a5c] text-white rounded-2xl text-center font-black text-sm uppercase tracking-widest hover:bg-[#E85222] transition-all shadow-lg hover:shadow-orange-900/20 active:scale-95">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-[#1a3a5c] mb-4 font-heading tracking-tight uppercase tracking-widest">Why Join Us?</h2>
            <div className="w-20 h-1.5 bg-[#E85222] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Advanced Technology",
                desc: "Work with state-of-the-art medical equipment and cutting-edge healthcare technologies that lead the industry.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                color: "teal"
              },
              {
                title: "Collaborative Culture",
                desc: "Join a supportive team of passionate professionals dedicated to exceptional patient care and clinical excellence.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                color: "orange"
              },
              {
                title: "Professional Growth",
                desc: "Continuous learning and development programs designed to help you reach your full professional potential.",
                icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                color: "navy"
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 hover:-translate-y-2 transition-transform duration-500 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#E85222] shadow-inner">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-[#1a3a5c] leading-tight">{benefit.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* HR Call to Action */}
        <div className="mt-28 bg-[#1a3a5c] rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-br-full -ml-20 -mt-20"></div>
           <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 font-heading tracking-widest uppercase">Can't find a matching role?</h3>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto font-medium italic">
                "We are always looking for exceptional talent to join our growing family. Drop your CV, and we will get back to you if a suitable position opens up."
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link href="mailto:careers@popularhospital.in" className="px-12 py-5 bg-[#E85222] text-white rounded-2xl font-black hover:bg-[#d1451a] transition-all shadow-xl shadow-orange-900/30 uppercase tracking-[0.2em] text-sm">
                    Send your CV
                 </Link>
                 <a href="tel:+917800001895" className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-[0.2em] text-sm">
                    HR Helpline
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

