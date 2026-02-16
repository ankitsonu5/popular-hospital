import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Latest Updates & Announcements | Popular Hospital",
  description: "Stay informed with the latest news, OPD schedules, upcoming camps, and important announcements from Popular Hospital.",
};

const updates = [
  {
    id: 1,
    category: "OPD Schedule",
    title: "Cardiology OPD Timings Updated",
    date: "February 15, 2026",
    description: "The OPD timings for the Cardiology department have been revised. Dr. A.K. Kaushik will now be available from 9:00 AM to 5:00 PM, Monday to Saturday.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    isImportant: true,
  },
  {
    id: 2,
    category: "Events & Camps",
    title: "Free Heart Health Checkup Camp",
    date: "March 15, 2026",
    description: "Join us for a complimentary heart health screening camp. Services include BP check, ECG, and consultation with senior cardiologists. Registration starts at 8:00 AM.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    isImportant: true,
  },
  {
    id: 3,
    category: "Facilities",
    title: "Emergency Trauma Center Now 24/7",
    date: "February 10, 2026",
    description: "We are proud to announce that our Level 1 Trauma Center is now fully operational 24 hours a day, 7 days a week, equipped with advanced life support systems.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    isImportant: false,
  },
  {
    id: 4,
    category: "General News",
    title: "New Visiting Hours for IPD",
    date: "February 01, 2026",
    description: "To ensure better patient rest and recovery, visiting hours for In-Patient Departments have been adjusted. Morning: 10 AM - 11 AM, Evening: 5 PM - 7 PM.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    isImportant: false,
  },
  {
    id: 5,
    category: "Awards",
    title: "Best Multispeciality Hospital Award 2025",
    date: "January 20, 2026",
    description: "Popular Hospital has been awarded the 'Best Multispeciality Hospital' in the region for excellence in patient care and medical infrastructure.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    isImportant: false,
  },
    {
    id: 6,
    category: "Facilities",
    title: "New MRI Machine Installation",
    date: "January 05, 2026",
    description: "We have upgraded our diagnostic capabilities with a state-of-the-art 3 Tesla MRI machine, offering higher resolution imaging and faster scan times.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    isImportant: false,
  },
];

export default function UpdatesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="relative bg-[#0b1c43] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85222] opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
             <div className="absolute bottom-0 left-0 w-72 h-72 bg-hospital-teal opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="relative mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">
            Hospital Updates <span className="text-[#E85222]">&</span> Announcements
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl font-light">
            Stay connected with the latest happenings, schedule changes, and news from Popular Hospital. We are committed to keeping you informed.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8">
          
          {/* Important Notices Grid */}
          <div className="mb-12">
             <h2 className="text-xl font-bold text-[#0b1c43] mb-6 flex items-center gap-2 font-heading">
                <span className="w-1.5 h-6 bg-[#E85222] rounded-full"></span>
                Important Notices
             </h2>
             <div className="grid gap-6 md:grid-cols-2">
                {updates.filter(u => u.isImportant).map((update) => (
                   <div key={update.id} className="bg-white rounded-xl shadow-md border-l-4 border-[#E85222] p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                         <div className="flex items-center gap-2 text-[#E85222] font-semibold text-sm uppercase tracking-wide">
                            {update.icon}
                            {update.category}
                         </div>
                         <span className="text-gray-400 text-xs font-medium">{update.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#0b1c43] mb-2 font-heading">{update.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{update.description}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* All Updates Timeline/Grid */}
          <div>
            <h2 className="text-xl font-bold text-[#0b1c43] mb-6 flex items-center gap-2 font-heading">
                <span className="w-1.5 h-6 bg-hospital-teal rounded-full"></span>
                Recent News
             </h2>
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {updates.filter(u => !u.isImportant).map((update) => (
                    <div key={update.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-hospital-teal/30 hover:shadow-md transition-all group">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 rounded-lg bg-gray-50 text-hospital-teal group-hover:bg-teal-50 transition-colors">
                             {update.icon}
                          </div>
                          <div>
                             <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{update.category}</span>
                             <span className="block text-xs text-gray-500">{update.date}</span>
                          </div>
                       </div>
                       <h3 className="text-lg font-bold text-[#0b1c43] mb-3 group-hover:text-hospital-teal transition-colors font-heading">{update.title}</h3>
                       <p className="text-sm text-gray-600 leading-relaxed flex-grow">{update.description}</p>
                       <div className="mt-4 pt-4 border-t border-gray-50">
                          <Link href="#" className="text-sm font-semibold text-[#E85222] hover:text-[#d1451a] flex items-center gap-1 group/link">
                             Read More
                             <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                             </svg>
                          </Link>
                       </div>
                    </div>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-gray-100 py-16 mb-[-64px]"> 
         {/* Margin note: Footer usually has heavy top margin or separate section, adjusted visually */}
         <div className="mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0b1c43] rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                 <div className="relative z-10 max-w-lg text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">Subscribe to Updates</h3>
                    <p className="text-gray-300">Get the latest hospital news, health tips, and camp notifications delivered to your inbox.</p>
                 </div>
                 <div className="relative z-10 flex w-full md:w-auto gap-2 flex-col sm:flex-row">
                    <input 
                       type="email" 
                       placeholder="Enter your email address" 
                       className="px-5 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#E85222] min-w-[280px]"
                    />
                    <button className="px-6 py-3 bg-[#E85222] text-white rounded-full font-bold hover:bg-[#d1451a] transition-colors shadow-lg">
                       Subscribe
                    </button>
                 </div>
            </div>
         </div>
      </section>
        <div className="h-20"></div> {/* Spacer for footer overlap if needed */}
    </div>
  );
}
