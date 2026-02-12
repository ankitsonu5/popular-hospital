import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'OPD - Outpatient Department',
  description: 'OPD timings, walk-in information, and how to book OPD at Popular Hospital branches.',
};

export default function OPDPage() {
  return (
    <div className="container-narrow py-10">
      <h1 className="section-heading">Outpatient Department (OPD)</h1>
      <p className="mt-2 text-gray-600">
        Our OPD services are available across all branches. Book a slot online or walk in during OPD hours.
      </p>

      <section className="mt-10" aria-labelledby="opd-info">
        <h2 id="opd-info" className="text-xl font-semibold text-hospital-navy">OPD Services</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
          <li>General consultation and follow-ups</li>
          <li>Specialist consultations by appointment</li>
          <li>Walk-in registration at reception (subject to availability)</li>
          <li>Lab and diagnostics at selected branches</li>
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6" aria-labelledby="opd-timings">
        <h2 id="opd-timings" className="text-xl font-semibold text-hospital-navy">OPD Timings</h2>
        <p className="mt-2 text-gray-600">Morning: 9:00 AM – 1:00 PM | Evening: 2:00 PM – 5:00 PM (Monday – Saturday)</p>
        <p className="mt-1 text-sm text-gray-500">Timings may vary by branch and doctor. Please check while booking.</p>
      </section>

      <section className="mt-10 flex flex-wrap gap-4">
        <Link href="/book" className="btn-primary">
          Book OPD Appointment
        </Link>
        <Link href="/branches" className="btn-secondary">
          View Branches &amp; Contact
        </Link>
      </section>
    </div>
  );
}
