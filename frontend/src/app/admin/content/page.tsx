'use client';

import { useEffect, useState } from 'react';
import { cmsGetContent, cmsSetContent } from '@/lib/cms-api';

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cmsGetContent()
      .then((data) => {
        setContent(data);
        setEditing(data);
      })
      .catch(() => setError('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(editing)) {
        await cmsSetContent(key, value);
      }
      setContent({ ...editing });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const addNew = () => {
    const key = prompt('Key (e.g. hero_title):');
    if (!key) return;
    setEditing((prev) => ({ ...prev, [key]: '' }));
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-hospital-navy">Site Content</h1>
      <p className="mt-1 text-gray-600">Edit homepage and global content. Changes appear on the main site.</p>
      {error && <p className="mt-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={handleSave} className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {Object.entries(editing).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              {key.includes('subtitle') || key.includes('description') ? (
                <textarea
                  value={value}
                  onChange={(e) => setEditing((prev) => ({ ...prev, [key]: e.target.value }))}
                  rows={2}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                />
              ) : (
                <input
                  value={value}
                  onChange={(e) => setEditing((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save all'}</button>
          <button type="button" onClick={addNew} className="btn-secondary">Add new key</button>
        </div>
      </form>
    </div>
  );
}
