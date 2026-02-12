'use client';

import { useEffect, useState } from 'react';
import { cmsGetBookings } from '@/lib/cms-api';

type Booking = {
  id: number;
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  doctor_name: string;
  branch_name: string;
  slot_date: string;
  slot_time: string;
  status: string;
  notes?: string;
  created_at: string;
};

export default function AdminBookingsPage() {
  const [list, setList] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsGetBookings()
      .then(setList)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-hospital-navy">Bookings</h1>
      <p className="mt-1 text-gray-600">View all appointment bookings. Use this to confirm or manage patient appointments.</p>
      {loading ? (
        <p className="mt-8 text-gray-500">Loading...</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Patient</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Branch</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {list.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">No bookings yet.</td></tr>
              ) : (
                list.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{b.patient_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.patient_phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.doctor_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.branch_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.slot_date}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.slot_time}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
