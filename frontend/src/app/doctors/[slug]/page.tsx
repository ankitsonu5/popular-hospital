import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchDoctor } from '@/lib/api';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = await fetchDoctor(slug);
  if (!doctor) return { title: 'Doctor Not Found' };
  return {
    title: `${doctor.name} - ${doctor.speciality_name} | Book Appointment`,
    description: doctor.bio || `${doctor.name}, ${doctor.qualification}. Book OPD at Popular Hospital.`,
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const doctor = await fetchDoctor(slug);
  if (!doctor) notFound();

  return (
    <div className="container-narrow py-10">
      <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link href="/doctors" className="hover:text-hospital-teal">Doctors</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{doctor.name}</span>
      </nav>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-hospital-navy">{doctor.name}</h1>
          <p className="mt-2 text-lg text-hospital-teal">{doctor.speciality_name}</p>
          {doctor.qualification && <p className="mt-2 text-gray-600">{doctor.qualification}</p>}
          {doctor.experience_years != null && (
            <p className="mt-1 text-gray-500">{doctor.experience_years} years of experience</p>
          )}
          {doctor.consultation_fee != null && (
            <p className="mt-2 font-medium text-gray-800">Consultation fee: ₹{doctor.consultation_fee}</p>
          )}
          {doctor.bio && <p className="mt-4 text-gray-600">{doctor.bio}</p>}
          <Link
            href={`/book?doctor=${doctor.id}`}
            className="btn-primary mt-6 inline-flex"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
