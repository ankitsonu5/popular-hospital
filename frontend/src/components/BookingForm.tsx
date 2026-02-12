'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchDoctors, fetchBranches, fetchOpdSlots, createBooking } from '@/lib/api';
import type { Doctor, Branch } from '@/lib/api';

type SearchParams = Promise<{ doctor?: string; branch?: string }>;

export function BookingForm({ searchParams }: { searchParams: SearchParams }) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [doctorId, setDoctorId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [slotDate, setSlotDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [slotTime, setSlotTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const presetDoctor = urlSearchParams.get('doctor') || '';
  const presetBranch = urlSearchParams.get('branch') || '';

  useEffect(() => {
    Promise.all([fetchDoctors(), fetchBranches()]).then(([d, b]) => {
      setDoctors(d);
      setBranches(b);
      if (presetDoctor) setDoctorId(presetDoctor);
      if (presetBranch) setBranchId(presetBranch);
    });
  }, [presetDoctor, presetBranch]);

  useEffect(() => {
    if (!doctorId || !branchId || !slotDate) {
      setSlots([]);
      setSlotTime('');
      return;
    }
    fetchOpdSlots(parseInt(doctorId, 10), parseInt(branchId, 10), slotDate)
      .then((r) => setSlots(r.slots))
      .catch(() => setSlots([]));
    setSlotTime('');
  }, [doctorId, branchId, slotDate]);

  const minDate = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId || !branchId || !slotDate || !slotTime || !patientName || !patientPhone) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await createBooking({
        doctor_id: parseInt(doctorId, 10),
        branch_id: parseInt(branchId, 10),
        slot_date: slotDate,
        slot_time: slotTime,
        patient_name: patientName,
        patient_phone: patientPhone,
        patient_email: patientEmail || undefined,
        notes: notes || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto mt-12 max-w-md rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-green-800">Booking Confirmed</h2>
        <p className="mt-2 text-green-700">We have received your appointment request. Our team will confirm shortly.</p>
        <button type="button" className="btn-primary mt-6" onClick={() => router.push('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="doctor" className="mb-1 block text-sm font-medium text-gray-700">Doctor *</label>
          <select
            id="doctor"
            required
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          >
            <option value="">Select doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>{d.name} – {d.speciality_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="branch" className="mb-1 block text-sm font-medium text-gray-700">Branch *</label>
          <select
            id="branch"
            required
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          >
            <option value="">Select branch</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="slotDate" className="mb-1 block text-sm font-medium text-gray-700">Date *</label>
          <input
            id="slotDate"
            type="date"
            required
            min={minDate}
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          />
        </div>
        <div>
          <label htmlFor="slotTime" className="mb-1 block text-sm font-medium text-gray-700">Time *</label>
          <select
            id="slotTime"
            required
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          >
            <option value="">Select time</option>
            {slots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            {doctorId && branchId && slotDate && slots.length === 0 && (
              <option value="" disabled>No slots available – try another date</option>
            )}
          </select>
        </div>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="patientName" className="mb-1 block text-sm font-medium text-gray-700">Your name *</label>
          <input
            id="patientName"
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          />
        </div>
        <div>
          <label htmlFor="patientPhone" className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
          <input
            id="patientPhone"
            type="tel"
            required
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="patientEmail" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            id="patientEmail"
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea
            id="notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          />
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-70">
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
        <button type="button" className="btn-secondary" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
