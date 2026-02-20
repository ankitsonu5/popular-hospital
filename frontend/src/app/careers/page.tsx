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
    <>
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
              Join Us
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Popular Group of Hospitals is an ideal environment for Job seekers to practice Medicine before exploring New Frontiers. 
              It provides a solid foundation for developing a fulfilling professional career.
            </p>
          </div>

          {/* Current Openings Title */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#1e40af] text-white px-10 py-3 rounded-md text-xl font-bold shadow-md">
              Current Openings
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-0 flex">
            <button
              onClick={() => setActiveTab('Medico')}
              className={`px-8 py-3 text-lg font-bold transition-all duration-200 border-t border-l border-r rounded-t-lg ${
                activeTab === 'Medico'
                  ? 'bg-[#1e40af] text-white border-[#1e40af]'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              Medico
            </button>
            <button
              onClick={() => setActiveTab('Non-Medico')}
              className={`px-8 py-3 text-lg font-bold transition-all duration-200 border-t border-l border-r rounded-t-lg ml-1 ${
                activeTab === 'Non-Medico'
                  ? 'bg-[#1e40af] text-white border-[#1e40af]'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              Non-Medico
            </button>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-b-xl shadow-lg border-t-0 border border-gray-200">
            <div className="overflow-x-auto px-4 pb-4">
              <table className="min-w-[1000px] w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200 whitespace-nowrap">Posted On 01</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200">Department</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200">Designation</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200">Location</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200 text-center">Position</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200 text-center">Last Date to Apply</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-r border-b border-gray-200 text-center">Details</th>
                    <th className="px-4 py-3 text-[14px] font-bold text-gray-800 border-b border-gray-200 text-center">Apply Here</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOpenings.map((job, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-[13px] text-gray-700 border-r border-gray-200">{job.postedOn}</td>
                      <td className="px-4 py-4 text-[13px] text-gray-800 font-medium border-r border-gray-200">{job.department}</td>
                      <td className="px-4 py-4 text-[13px] text-gray-700 border-r border-gray-200">{job.designation}</td>
                      <td className="px-4 py-4 text-[13px] text-gray-700 border-r border-gray-200">{job.location}</td>
                      <td className="px-4 py-4 text-[13px] text-gray-700 border-r border-gray-200 text-center">{job.position}</td>
                      <td className="px-4 py-4 text-[13px] text-gray-600 border-r border-gray-200 text-center">{job.lastDate}</td>
                      <td className="px-4 py-4 text-[13px] border-r border-gray-200 text-center">
                        {job.hasDetails ? (
                          <button className="bg-[#007bff] text-white px-3 py-1.5 rounded text-[12px] font-medium hover:bg-blue-600 transition-colors">
                            View Details
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-[13px] text-center">
                        <Link href="/apply" className="text-blue-500 font-semibold hover:underline">
                          Apply
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Why Work With Us Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 text-hospital-teal">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">Advanced Technology</h3>
               <p className="text-gray-600">Work with state-of-the-art medical equipment and cutting-edge healthcare technologies.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-hospital-orange">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">Collaborative Environment</h3>
               <p className="text-gray-600">Join a team of passionate professionals dedicated to patient care and clinical excellence.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900">Growth Opportunities</h3>
               <p className="text-gray-600">Continuous learning and professional development programs to help you reach your full potential.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
