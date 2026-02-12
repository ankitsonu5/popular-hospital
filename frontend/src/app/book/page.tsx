import type { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';

export const metadata: Metadata = {
  title: 'Book Appointment',
  description: 'Book doctor appointment or OPD at Popular Hospital online. Choose doctor, branch, date and time.',
};

export default function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string; branch?: string }>;
}) {
  return (
    <div className="container-narrow py-10">
      <h1 className="section-heading">Book an Appointment</h1>
      <p className="mt-2 text-gray-600">
        Select doctor, branch, date and time. We will confirm your OPD slot.
      </p>
      <BookingForm searchParams={searchParams} />
    </div>
  );
}
