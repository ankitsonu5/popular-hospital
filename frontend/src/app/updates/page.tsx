'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Loader2, Bell, AlertCircle, Calendar, FileText, Info } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

interface UpdateItem {
  _id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  iconType: string;
  isImportant: boolean;
  pdfUrl?: string;
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/updates`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUpdates(data);
      })
      .catch((err) => console.error("Error fetching updates:", err))
      .finally(() => setLoading(false));
  }, []);

  const renderIcon = (type: string, className: string = "w-6 h-6") => {
    switch(type) {
      case 'alert': return <AlertCircle className={className} />;
      case 'event': return <Calendar className={className} />;
      case 'news': return <FileText className={className} />;
      case 'bell': return <Bell className={className} />;
      default: return <Info className={className} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="relative bg-[#0b1c43] text-white py-16 sm:py-24 overflow-hidden">
        {/* Banner Image Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/banners/updates_popular.png" 
            alt="Hospital Updates" 
            fill 
            className="object-cover opacity-40 bg-zinc-900"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent z-10" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85222] opacity-20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 z-20"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0d9488] opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 z-20"></div>
        </div>

        <div className="relative z-30 mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8 text-center sm:text-left animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
            Hospital Updates <span className="text-[#E85222]">&</span> Announcements
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl font-light">
            Stay connected with the latest happenings, schedule changes, and news from Popular Hospital. We are committed to keeping you informed.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 relative z-20">
        <div className="mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8">
          
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 text-[#0d9488]">
                 <Loader2 className="w-12 h-12 animate-spin mb-4" />
                 <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Loading Updates...</p>
             </div>
          ) : updates.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
               <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-gray-800">No new updates right now</h3>
               <p className="text-gray-500 mt-2">Check back later for important announcements and schedules.</p>
             </div>
          ) : (
             <>
                {/* Important Notices Grid */}
                {updates.filter(u => u.isImportant).length > 0 && (
                  <div className="mb-16">
                     <h2 className="text-2xl font-black text-[#0b1c43] mb-8 flex items-center gap-3 font-heading uppercase tracking-tight">
                        <span className="w-2.5 h-8 bg-[#E85222] rounded-full shadow-lg shadow-orange-500/20"></span>
                        Important Notices
                     </h2>
                     <div className="grid gap-6 md:grid-cols-2">
                        {updates.filter(u => u.isImportant).map((update) => (
                           <div key={update._id} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-4 border-[#E85222] p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                                 <div className="flex items-center gap-2 text-[#E85222] font-black text-xs uppercase tracking-widest bg-orange-50 px-3 py-1.5 rounded-lg w-fit">
                                    {renderIcon(update.iconType || 'alert', "w-4 h-4")}
                                    {update.category}
                                 </div>
                                 <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{update.date}</span>
                              </div>
                              <h3 className="text-2xl font-bold text-[#0b1c43] mb-3 font-heading leading-snug">{update.title}</h3>
                              <p className="text-gray-600 leading-relaxed font-medium mb-6">{update.description}</p>
                              
                              {update.pdfUrl && (
                                <a 
                                  href={`${API_URL}${update.pdfUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E85222] text-white rounded-xl font-bold text-sm hover:bg-[#d1451a] transition-all shadow-md active:scale-95"
                                >
                                  More Details (PDF)
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* All Updates Timeline/Grid */}
                {updates.filter(u => !u.isImportant).length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-[#0b1c43] mb-8 flex items-center gap-3 font-heading uppercase tracking-tight">
                        <span className="w-2.5 h-8 bg-[#0d9488] rounded-full shadow-lg shadow-teal-500/20"></span>
                        Recent News & Schedules
                     </h2>
                     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {updates.filter(u => !u.isImportant).map((update) => (
                            <div key={update._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col hover:border-[#0d9488]/30 hover:shadow-xl transition-all group">
                               <div className="flex items-center gap-4 mb-6">
                                  <div className="p-3.5 rounded-xl bg-gray-50 text-[#0d9488] group-hover:bg-[#0d9488] group-hover:text-white transition-colors shadow-inner">
                                     {renderIcon(update.iconType || 'info', "w-6 h-6")}
                                  </div>
                                  <div>
                                     <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{update.category}</span>
                                     <span className="block text-xs font-bold text-gray-800">{update.date}</span>
                                  </div>
                               </div>
                               <h3 className="text-xl font-bold text-[#0b1c43] mb-4 group-hover:text-[#0d9488] transition-colors font-heading leading-snug">{update.title}</h3>
                               <p className="text-sm text-gray-600 leading-relaxed font-medium mb-6">{update.description}</p>

                               {update.pdfUrl && (
                                  <a 
                                    href={`${API_URL}${update.pdfUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-[#0d9488] text-[#0d9488] rounded-xl font-bold text-xs hover:bg-[#0d9488] hover:text-white transition-all active:scale-95"
                                  >
                                    View PDF Details
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                               )}
                            </div>
                        ))}
                     </div>
                  </div>
                )}
             </>
          )}

        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-gray-100 py-16 mb-[-64px]"> 
         <div className="mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#0b1c43] to-[#122a5e] rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E85222] opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                 
                 <div className="relative z-10 max-w-lg text-center md:text-left">
                    <span className="text-[#E85222] font-black tracking-[0.2em] text-[10px] uppercase mb-4 block">Stay Informed</span>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 font-heading tracking-tight">Subscribe to Updates</h3>
                    <p className="text-blue-100/80 text-lg font-medium">Get the latest hospital news, health tips, and camp notifications delivered securely to your inbox.</p>
                 </div>
                 <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    <input 
                       type="email" 
                       placeholder="Enter your email address" 
                       className="px-6 py-4 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-[#E85222]/30 min-w-[300px] font-medium placeholder-gray-400 shadow-inner"
                    />
                    <button className="px-8 py-4 bg-[#E85222] text-white rounded-full font-black hover:bg-[#d1451a] transition-all shadow-[0_8px_20px_rgb(232,82,34,0.3)] hover:shadow-[0_8px_25px_rgb(232,82,34,0.4)] whitespace-nowrap hover:-translate-y-1">
                       Subscribe Now
                    </button>
                 </div>
            </div>
         </div>
      </section>
        <div className="h-20"></div> {/* Spacer for footer overlap */}
    </div>
  );
}
