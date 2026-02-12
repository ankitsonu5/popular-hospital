'use client';

import { useEffect, useState } from 'react';
import { cmsGetDoctors, cmsCreateDoctor, cmsUpdateDoctor, cmsDeleteDoctor } from '@/lib/cms-api';
import { fetchSpecialities, fetchBranches } from '@/lib/api';
import type { Speciality, Branch } from '@/lib/api';

type Doctor = {
  id: number;
  name: string;
  slug: string;
  speciality_id: number;
  speciality_name?: string;
  qualification?: string;
  experience_years?: number;
  bio?: string;
  consultation_fee?: number;
  available_days?: string;
  branch_ids?: string;
  is_active: number;
};

export default function AdminDoctorsPage() {
  const [list, setList] = useState<Doctor[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Partial<Doctor> & { branch_ids?: string }>({});
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    cmsGetDoctors()
      .then(setList)
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    Promise.all([fetchSpecialities(), fetchBranches()]).then(([s, b]) => {
      setSpecialities(s);
      setBranches(b);
    });
  }, []);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
    setForm({ name: '', slug: '', speciality_id: specialities[0]?.id, qualification: '', experience_years: undefined, bio: '', consultation_fee: undefined, available_days: '', branch_ids: '', is_active: 1 });
  };

  const openEdit = (d: Doctor) => {
    setEditing(d);
    setFormOpen(true);
    setForm({
      ...d,
      branch_ids: d.branch_ids || '',
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      branch_ids: form.branch_ids ? String(form.branch_ids).split(',').map((x) => parseInt(x.trim(), 10)).filter((n) => !Number.isNaN(n)) : [],
    };
    try {
      if (editing) {
        await cmsUpdateDoctor(String(editing.id), payload as Record<string, unknown>);
      } else {
        await cmsCreateDoctor(payload as Record<string, unknown>);
      }
      setEditing(null);
      setFormOpen(false);
      setForm({});
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this doctor?')) return;
    try {
      await cmsDeleteDoctor(String(id));
      load();
    } catch {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-hospital-navy">Manage Doctors</h1>
      <p className="mt-1 text-gray-600">Add and edit doctor profiles. Non-technical staff can update names, qualifications, and branch assignments.</p>
      {error && <p className="mt-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <button type="button" onClick={openNew} className="btn-primary mt-6">Add Doctor</button>

      {formOpen && (
        <form onSubmit={save} className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">{editing ? 'Edit Doctor' : 'New Doctor'}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug *</label>
              <input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required placeholder="dr-john-doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Speciality *</label>
              <select value={form.speciality_id ?? ''} onChange={(e) => setForm({ ...form, speciality_id: parseInt(e.target.value, 10) })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required>
                {specialities.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              <input value={form.qualification || ''} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="MBBS, MD" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
              <input type="number" min={0} value={form.experience_years ?? ''} onChange={(e) => setForm({ ...form, experience_years: e.target.value ? parseInt(e.target.value, 10) : undefined })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Consultation fee (₹)</label>
              <input type="number" min={0} value={form.consultation_fee ?? ''} onChange={(e) => setForm({ ...form, consultation_fee: e.target.value ? parseInt(e.target.value, 10) : undefined })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Branch IDs (comma-separated)</label>
              <input value={form.branch_ids || ''} onChange={(e) => setForm({ ...form, branch_ids: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="1, 2, 3" />
              <p className="mt-1 text-xs text-gray-500">Branches: {branches.map((b) => `${b.id}: ${b.name}`).join(', ')}</p>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            {editing && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Active</label>
                <select value={form.is_active ?? 1} onChange={(e) => setForm({ ...form, is_active: parseInt(e.target.value, 10) })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm">
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-4">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={() => { setEditing(null); setFormOpen(false); setForm({}); }} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="mt-8 text-gray-500">Loading...</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Speciality</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fee</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {list.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{d.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.speciality_name || d.speciality_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{d.consultation_fee != null ? `₹${d.consultation_fee}` : '–'}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => openEdit(d)} className="text-hospital-teal hover:underline">Edit</button>
                    <button type="button" onClick={() => remove(d.id)} className="ml-4 text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
