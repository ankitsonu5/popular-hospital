import type { Metadata } from 'next';
import { DoctorsSearch } from '@/components/DoctorsSearch';

export const metadata: Metadata = {
  title: 'Find Doctors',
  description: 'Search and book doctors by speciality and branch at Popular Hospital. View profiles, qualifications, and consultation fees.',
};

export default function DoctorsPage() {
  return (
    <div className="container-narrow py-10">
      <h1 className="section-heading">Find a Doctor</h1>
      <p className="mt-2 text-gray-600">
        Search by speciality, branch, or name. Click on a doctor to book an appointment.
      </p>
      <DoctorsSearch />
    </div>
  );
}
