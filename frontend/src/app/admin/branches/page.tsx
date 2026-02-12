'use client';

import { useEffect, useState } from 'react';
import { cmsGetBranches, cmsCreateBranch, cmsUpdateBranch, cmsDeleteBranch } from '@/lib/cms-api';

type Branch = {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  description?: string;
  facilities?: string;
};

export default function AdminBranchesPage() {
  const [list, setList] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Partial<Branch>>({});
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    cmsGetBranches()
      .then(setList)
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
    setForm({ name: '', slug: '', address: '', city: '', state: '', pincode: '', phone: '', email: '', description: '', facilities: '' });
  };

  const openEdit = (b: Branch) => {
    setEditing(b);
    setFormOpen(true);
    setForm({ ...b });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await cmsUpdateBranch(String(editing.id), form as Record<string, unknown>);
      } else {
        await cmsCreateBranch(form as Record<string, unknown>);
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
    if (!confirm('Delete this branch?')) return;
    try {
      await cmsDeleteBranch(String(id));
      load();
    } catch {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-hospital-navy">Manage Branches</h1>
      <p className="mt-1 text-gray-600">Add, edit, or remove hospital branch information.</p>
      {error && <p className="mt-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <button type="button" onClick={openNew} className="btn-primary mt-6">Add Branch</button>

      {formOpen && (
        <form onSubmit={save} className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">{editing ? 'Edit Branch' : 'New Branch'}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug *</label>
              <input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required placeholder="e.g. main" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address *</label>
              <input value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input value={form.city || ''} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input value={form.state || ''} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input value={form.pincode || ''} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
              <input value={form.facilities || ''} onChange={(e) => setForm({ ...form, facilities: e.target.value })} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="OPD, Lab, Pharmacy" />
            </div>
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
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {list.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{b.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.phone || '–'}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => openEdit(b)} className="text-hospital-teal hover:underline">Edit</button>
                    <button type="button" onClick={() => remove(b.id)} className="ml-4 text-red-600 hover:underline">Delete</button>
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
