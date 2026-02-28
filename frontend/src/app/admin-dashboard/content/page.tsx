'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, FileText, Plus, Trash2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function ContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    fetch(`${API_URL}/api/cms/content`, { headers: getHeaders() })
      .then((r) => r.json())
      .then((data) => { if (typeof data === 'object') setContent(data); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (key: string, value: string) => {
    setSavingKey(key);
    try {
      await fetch(`${API_URL}/api/cms/content`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ key, value }),
      });
    } catch (e) { console.error(e); }
    setSavingKey(null);
  };

  const handleAdd = async () => {
    if (!newKey.trim()) return;
    setSavingKey('__new__');
    try {
      await fetch(`${API_URL}/api/cms/content`, {
        method: 'POST', headers: getHeaders(),
        body: JSON.stringify({ key: newKey, value: newValue }),
      });
      setContent({ ...content, [newKey]: newValue });
      setNewKey(''); setNewValue('');
    } catch (e) { console.error(e); }
    setSavingKey(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Site Content</h2>
        <p className="text-sm text-gray-500 mt-1">Manage key-value content used across the website</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
      ) : (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2">{key}</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <textarea
                  rows={2}
                  defaultValue={value}
                  onBlur={(e) => setContent({ ...content, [key]: e.target.value })}
                  className="flex-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all resize-none"
                />
                <button
                  onClick={() => handleSave(key, content[key])}
                  disabled={savingKey === key}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0d9488] hover:bg-[#0b8578] text-white rounded-xl text-sm font-semibold transition-colors shrink-0 disabled:opacity-60 self-start"
                >
                  {savingKey === key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </button>
              </div>
            </div>
          ))}

          {/* Add New */}
          <div className="bg-gray-50 rounded-2xl p-5 border-2 border-dashed border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Content
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)}
                className="px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
              <input placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)}
                className="px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#0d9488] outline-none transition-all" />
              <button onClick={handleAdd} disabled={savingKey === '__new__'}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0b1c43] hover:bg-[#0e2455] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60">
                {savingKey === '__new__' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
