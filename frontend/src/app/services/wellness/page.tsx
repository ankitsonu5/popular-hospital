'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WellnessPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0b1c43] text-white pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
            alt="Healthcare background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43] via-[#0b1c43]/80 to-transparent z-0"></div>
        
        <div className="container mx-auto max-w-[1366px] relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-heading leading-tight animate-fade-in-up">
              Welcome to the world of <span className="text-[#E85222]">Affordable Healthcare</span> with Health Fit Card!
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-medium">
              Popular Hospital's Health Fit Card is your personal medical assistant, designed to manage your family's health needs with ease and priority.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#apply" className="px-8 py-4 bg-[#E85222] text-white rounded-full font-black hover:bg-[#d1451a] transition-all shadow-lg hover:shadow-orange-900/40 uppercase tracking-widest text-sm">
                Apply for Card
              </Link>
              <Link href="#benefits" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black hover:bg-white/20 transition-all uppercase tracking-widest text-sm">
                View Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section with Image */}
      <section id="benefits" className="py-24 px-6 bg-slate-50">
        <div className="container mx-auto max-w-[1366px]">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-lg border-8 border-white">
                  <Image 
                    src="/images/family-health-card.jpg"
                    alt="Indian Family Health Card"
                    width={800}
                    height={600}
                    className="object-contain bg-white"
                  />
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] mb-6 font-heading tracking-tight">One card for all your <span className="text-hospital-teal text-outline">family Health needs</span></h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p className="text-lg leading-relaxed">
                  Health Fit Card is a personal medical assistant and health manager who assists the family for their medical services with easy, convenient, and economic benefits through its 24x7 helpline. It acts as an inseparable assistant for families, taking care of all health-related needs.
                </p>
                <p className="text-lg leading-relaxed">
                  With the card, families get Priority Services, massive discounts on diagnostics, pharmacy, and hospital charges, making healthcare affordable and high-quality.
                </p>
              </div>

              {/* Three Icons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                {[
                  { title: "Cashless sudden service", icon: "🏥" },
                  { title: "Easy access in cash", icon: "💰" },
                  { title: "On time-Anytime Services", icon: "🕒" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:border-hospital-teal transition-all">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-sm font-bold text-[#0b1c43]">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Tiers Selection */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-[1366px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase">Our Exclusive Card Tiers</h2>
            <div className="w-24 h-1.5 bg-[#E85222] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Gold Card - 365 Days */}
            <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800] opacity-5 rounded-bl-full"></div>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-[#0b1c43] mb-2 font-heading">Health-Fit <span className="text-[#FFB800]">Gold</span></h3>
                <div className="flex flex-col gap-1">
                  <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">Upto 4 Members</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0b1c43]">₹799</span>
                    <span className="text-sm text-gray-400 line-through">₹1299</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E85222] flex items-center justify-center text-xs">✓</div>
                  Validity 365 Days
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E85222] flex items-center justify-center text-xs">✓</div>
                  Priority Support
                </li>
              </ul>
              <button className="w-full py-4 bg-[#0b1c43] text-white rounded-2xl font-black hover:bg-hospital-teal transition-all shadow-lg shadow-blue-900/10 uppercase tracking-widest text-xs">
                Buy Now
              </button>
            </div>

            {/* Gold Card - 730 Days */}
            <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800] opacity-5 rounded-bl-full"></div>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-[#0b1c43] mb-2 font-heading">Health-Fit <span className="text-[#FFB800]">Gold</span></h3>
                <div className="flex flex-col gap-1">
                  <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">Upto 4 Members</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0b1c43]">₹1249</span>
                    <span className="text-sm text-gray-400 line-through">₹2598</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b1c43] flex items-center justify-center text-xs">✓</div>
                  Validity 730 Days
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b1c43] flex items-center justify-center text-xs">✓</div>
                  Extended Benefits
                </li>
              </ul>
              <button className="w-full py-4 bg-[#0b1c43] text-white rounded-2xl font-black hover:bg-hospital-teal transition-all shadow-lg shadow-blue-900/10 uppercase tracking-widest text-xs">
                Buy Now
              </button>
            </div>

            {/* Platinum Card - 365 Days */}
            <div className="bg-[#0b1c43] rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-hospital-teal opacity-10 rounded-bl-full"></div>
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-2 font-heading text-white">Health-Fit <span className="text-hospital-teal">Platinum</span></h3>
                <div className="flex flex-col gap-1">
                  <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">Upto 6 Members</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">₹999</span>
                    <span className="text-sm text-gray-400 line-through">₹1899</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                  <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">✓</div>
                  Validity 365 Days
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                  <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">✓</div>
                  Concierge Support
                </li>
              </ul>
              <button className="w-full py-4 bg-hospital-teal text-white rounded-2xl font-black hover:bg-white hover:text-hospital-teal transition-all shadow-lg shadow-teal-900/40 uppercase tracking-widest text-xs">
                Buy Now
              </button>
            </div>

            {/* Platinum Card - 730 Days */}
            <div className="bg-[#0b1c43] rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 text-white border-2 border-hospital-teal/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-hospital-teal opacity-20 rounded-bl-full"></div>
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-2 font-heading text-white">Health-Fit <span className="text-hospital-teal">Platinum</span></h3>
                <div className="flex flex-col gap-1">
                  <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">Upto 6 Members</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">₹1799</span>
                    <span className="text-sm text-gray-400 line-through">₹3798</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                  <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">✓</div>
                  Validity 730 Days
                </li>
                <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                  <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">✓</div>
                  Full Priority Access
                </li>
              </ul>
              <button className="w-full py-4 bg-hospital-teal text-white rounded-2xl font-black hover:bg-white hover:text-hospital-teal transition-all shadow-lg shadow-teal-900/40 uppercase tracking-widest text-xs">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Benefits Section */}
      <section className="py-24 px-6 bg-[#0b1c43] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute rotate-45 -top-24 -left-24 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute rotate-45 -bottom-24 -right-24 w-96 h-96 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto max-w-[1366px] relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 font-heading tracking-tight uppercase">Benefit & Features</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-medium">Enjoy exclusive perks and savings with your Health Fit Card across all Popular Hospital services.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "15% Discount on OPD", icon: "🎟️" },
              { title: "Coverage of 1 Year", icon: "📅" },
              { title: "Free Basic Checkup", icon: "🩺" },
              { title: "24x7 Professional Care", icon: "👨‍⚕️" },
              { title: "Ambulance Support", icon: "🚑" },
              { title: "Diagnostic Savings", icon: "🔬" },
              { title: "Special Hospital Rates", icon: "💎" },
              { title: "Women's Health Focus", icon: "👩" }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 hover:bg-white hover:text-[#0b1c43] transition-all duration-500 group flex flex-col items-center text-center">
                 <div className="text-3xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">{benefit.icon}</div>
                 <h4 className="text-sm md:text-lg font-black leading-tight group-hover:text-[#0b1c43] text-white transition-colors">{benefit.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Health Checkup Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="container mx-auto max-w-[1366px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight">Free Health Checkups <span className="text-[#E85222]">Included</span></h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">Monitor your health regularly with these vital tests available at no extra cost.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { test: "Random Blood Sugar", desc: "Diabetes Screening", icon: "🩸" },
              { test: "Total Cholesterol", desc: "Heart Health Check", icon: "💓" },
              { test: "ECG", desc: "Heart Activity Tracking", icon: "📈" },
              { test: "Complete Blood Count", desc: "Overall Health Analysis", icon: "🧪" }
            ].map((test, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 text-center border border-slate-100 group">
                <div className="text-4xl mb-6 group-hover:animate-bounce">{test.icon}</div>
                <h3 className="text-xl font-black text-[#0b1c43] mb-2 font-heading">{test.test}</h3>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">{test.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Comparison Table */}
      <section className="py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-[1366px]">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase">Why Health Fit Card?</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium">See the difference in your healthcare journey with and without the membership.</p>
          </div>

          <div className="w-full overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 custom-scrollbar">
            <div className="min-w-[600px] md:min-w-0 md:w-full rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden bg-white">
              <table className="w-full table-auto">
                <thead className="bg-[#0b1c43] text-white">
                  <tr>
                    <th className="px-4 md:px-8 py-4 md:py-6 text-left text-[13px] md:text-xl font-black font-heading leading-tight">Healthcare Factor</th>
                    <th className="px-4 md:px-8 py-4 md:py-6 text-center text-[13px] md:text-xl font-black font-heading border-l border-white/10">Without Card</th>
                    <th className="px-4 md:px-8 py-4 md:py-6 text-center text-[13px] md:text-xl font-black font-heading bg-[#E85222] border-l border-white/10">With Health Fit Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { factor: "Cost of Services", without: "High / Standard Rates", with: "Massive Discounts" },
                    { factor: "Doctor Consultation", without: "Wait Times Apply", with: "Priority Access" },
                    { factor: "Diagnostic Tests", without: "Full Charges", with: "Exclusive Member Rates" },
                    { factor: "Family Tracking", without: "Complex Paperwork", with: "Digital Management" },
                    { factor: "Emergency Support", without: "Standard Protocol", with: "24/7 Dedicated Helpline" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors text-[12px] md:text-base">
                      <td className="px-4 md:px-8 py-3 md:py-6 font-bold text-gray-700 leading-tight">{row.factor}</td>
                      <td className="px-4 md:px-8 py-3 md:py-6 text-center text-gray-500 font-medium border-l border-slate-50 leading-tight">{row.without}</td>
                      <td className="px-4 md:px-8 py-3 md:py-6 text-center text-[#0b1c43] font-black bg-orange-50/30 border-l border-orange-100 leading-tight">{row.with}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-gray-400 text-[10px] md:hidden mt-2">← Swipe to see full comparison →</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="apply" className="py-24 px-6 bg-[#0b1c43]/5">
        <div className="container mx-auto max-w-[1366px]">
          <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row shadow-blue-900/10">
             <div className="lg:w-1/2 bg-[#0b1c43] p-8 md:p-16 text-white flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-black mb-8 font-heading tracking-tight">Ready to join the <span className="text-[#E85222]">Health Fit</span> family?</h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium">Fill out the form and our Wellness Representative will contact you within 24 hours to explain all benefits and help you get started.</p>
                <div className="space-y-6">
                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white text-2xl group-hover:bg-[#E85222] transition-colors">📞</div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase tracking-widest text-xs">Call Helpline</span>
                        <span className="text-xl font-bold">+91 7800001895</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white text-2xl group-hover:bg-hospital-teal transition-colors">✉️</div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase tracking-widest text-xs">Email Us</span>
                         <span className="text-lg md:text-xl font-bold break-all leading-tight">wellness@popularhospitals.in</span>
                      </div>
                   </div>
                </div>
             </div>
             <div className="lg:w-1/2 p-8 md:p-16">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">Full Name</label>
                       <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium" placeholder="Ex: Rahul Sharma" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">Phone Number</label>
                       <input type="tel" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium" placeholder="+91 98XXX XXXXX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">Preferred Card</label>
                     <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium appearance-none">
                        <option>Health Fit Gold Card</option>
                        <option>Health Fit Platinum Card</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">Message (Optional)</label>
                     <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="w-full py-5 bg-[#E85222] text-white rounded-2xl font-black hover:bg-[#d1451a] transition-all shadow-xl shadow-orange-900/20 uppercase tracking-widest text-sm">
                    Submit Application
                  </button>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-[1366px]">
          <div className="bg-slate-50 rounded-[3rem] p-10 md:p-16 border border-slate-100 flex flex-col md:flex-row items-center gap-12 shadow-sm">
             <div className="md:w-1/3 text-center md:text-left">
                <div className="w-20 h-20 bg-[#0b1c43] text-white rounded-[2rem] flex items-center justify-center text-4xl mb-6 mx-auto md:mx-0 shadow-xl shadow-blue-900/20">💡</div>
                <h2 className="text-3xl md:text-4xl font-black text-[#0b1c43] font-heading tracking-tight uppercase">How to <span className="text-hospital-teal">Use?</span></h2>
             </div>
             <div className="md:w-2/3 space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-inner border border-slate-100">
                   <p className="text-lg text-gray-700 font-bold leading-relaxed mb-6">
                     In case of consultation, emergency or planned hospitalization, just use your health ID card at the reception of any of our branches. They will trace your details with the unique Family health-fit card ID.
                   </p>
                   <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                      <p className="text-orange-900 font-black text-sm uppercase tracking-wide leading-relaxed">
                        Important Note: During OPD Consultation or IPD admissions, the health card possession is to be informed before hand & prior to the bill generation.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-20 px-6 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto max-w-[1366px]">
          <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-black text-[#0b1c43] font-heading tracking-tight mb-4 uppercase">Terms & <span className="text-[#E85222]">Conditions</span></h2>
                <div className="w-20 h-1.5 bg-[#E85222] rounded-full"></div>
                <p className="mt-6 text-gray-500 font-medium">Please review these terms carefully to ensure a seamless experience with your Health Fit Card.</p>
              </div>
              <div className="md:w-2/3">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Vaccine is not included.",
                    "Card must be presented before availing the services at billing counter.",
                    "Prior appointment is must to avail the services.",
                    "Double benefits will not be clubbed.",
                    "IPD discount available only for cash patient.",
                    "Benefits extended as per prevailing Schedule of charges (SOC)."
                  ].map((term, idx) => (
                    <li key={idx} className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-[#E85222]/30 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#E85222] text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-1">✓</div>
                      <span className="text-gray-700 font-bold leading-relaxed">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info Section */}
      <section className="py-12 px-6 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-[1366px]">
          <p className="text-gray-400 text-sm leading-relaxed text-center max-w-4xl mx-auto italic">
            * Popular Health Fit Card is a proprietary program by Popular Hospital. Terms and conditions apply for all benefits and discounts. The card acts as a membership program for priority healthcare services within the Popular Hospital network.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WellnessPage;
