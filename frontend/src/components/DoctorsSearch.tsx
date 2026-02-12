'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchDoctors, fetchSpecialities, fetchBranches } from '@/lib/api';
import type { Doctor, Speciality, Branch } from '@/lib/api';

export function DoctorsSearch() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [speciality, setSpeciality] = useState('');
  const [branch, setBranch] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSpecialities(), fetchBranches()]).then(([spec, br]) => {
      setSpecialities(spec);
      setBranches(br);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (speciality) params.set('speciality', speciality);
    if (branch) params.set('branch', branch);
    if (search) params.set('search', search);
    fetch(`/api-backend/doctors?${params}`)
      .then((r) => r.json())
      .then(setDoctors)
      .finally(() => setLoading(false));
  }, [speciality, branch, search]);

  return (
    <div className="mt-8">
      <div className="mb-8 flex flex-wrap gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="min-w-[200px] flex-1">
          <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700">Name / Qualification</label>
          <input
            id="search"
            type="search"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal"
          />
        </div>
        <div>
          <label htmlFor="speciality" className="mb-1 block text-sm font-medium text-gray-700">Speciality</label>
          <select
            id="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal sm:w-48"
          >
            <option value="">All</option>
            {specialities.map((s) => (
              <option key={s.id} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="branch" className="mb-1 block text-sm font-medium text-gray-700">Branch</label>
          <select
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-hospital-teal focus:ring-1 focus:ring-hospital-teal sm:w-48"
          >
            <option value="">All</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found. Try changing filters.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <li key={doc.id}>
              <Link
                href={`/doctors/${doc.slug}`}
                className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-hospital-teal hover:shadow-md"
              >
                <div className="font-semibold text-hospital-navy">{doc.name}</div>
                <div className="mt-1 text-sm text-hospital-teal">{doc.speciality_name}</div>
                {doc.qualification && <p className="mt-2 text-sm text-gray-600">{doc.qualification}</p>}
                {doc.experience_years != null && (
                  <p className="mt-1 text-sm text-gray-500">{doc.experience_years} years experience</p>
                )}
                {doc.consultation_fee != null && (
                  <p className="mt-2 text-sm font-medium text-gray-700">₹{doc.consultation_fee} consultation</p>
                )}
                <span className="mt-3 inline-block text-sm font-medium text-hospital-teal">Book appointment →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
