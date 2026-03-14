import type { Metadata } from 'next';
import { DoctorsSearch } from '@/components/DoctorsSearch';

export const metadata: Metadata = {
  title: 'Find Doctors',
  description: 'Search and book doctors by speciality and branch at Popular Hospital. View profiles, qualifications, and consultation fees.',
};

export default function DoctorsPage() {
  return (
    <div className="max-w-[1366px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-12 sm:py-16">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e3a8a] font-heading tracking-tight mb-4">
        Find a Doctor
      </h1>
      <p className="max-w-2xl text-gray-500 text-lg sm:text-xl leading-relaxed font-medium">
        Search by speciality, branch, or name. Click on a doctor to book an appointment.
      </p>
      <DoctorsSearch />
    </div>
  );
}