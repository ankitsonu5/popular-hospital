'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Briefcase, Loader2, Save, X, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

interface CareerItem {
  _id: string;
  category: 'Medico' | 'Non-Medical' | 'Admin';
  department: string;
  designation: string;
  location: string;
  position: string;
  postedOn: string;
  lastDate: string;
  description: string;
  isActive: boolean;
}

function CareerActionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [loading, setLoading] = useState(!!editId);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CareerItem>>({
    category: 'Medico',
    department: '',
    designation: '',
    location: 'Varanasi',
    position: '1',
    postedOn: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
    lastDate: '-',
    description: '',
    isActive: true
  });

  useEffect(() => {
    if (editId) {
      const fetchCareer = async () => {
        try {
          const res = await fetch(`/api-backend/cms/careers/${editId}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } 
          });
          if (!res.ok) throw new Error('Could not fetch career details');
          const data = await res.json();
          setFormData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCareer();
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const getHeaders = () => ({
      'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      'Content-Type': 'application/json',
    });

    try {
      const url = editId 
        ? `/api-backend/cms/careers/${editId}`
        : `/api-backend/cms/careers`;
      const method = editId ? 'PUT' : 'POST';

      const submitData = { ...formData };
      delete submitData._id;
      delete (submitData as any).__v;
      delete (submitData as any).createdAt;
      delete (submitData as any).updatedAt;

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(submitData),
      });

      const contentType = res.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
          result = await res.json();
      } else {
          const errorText = await res.text();
          console.error('Server returned non-JSON response:', errorText);
          throw new Error('Server error: Received invalid response format.');
      }

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save career opening');
      }

      alert(editId ? 'Job opening updated successfully!' : 'New job role published successfully!');
      if (window.opener || window.history.length === 1) window.close();
      router.push('/admin-dashboard/careers');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
          <button onClick={() => window.close()} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 shrink-0">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d9488]" />
             </div>
             <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-black text-[#1a3a5c] uppercase tracking-widest truncate">
                  {editId ? 'Modify Role' : 'New Vacancy'}
                </h1>
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">Talent Center • Popular Hospital</p>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
            <button type="button" onClick={() => window.close()} className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-all">Cancel</button>
            <button onClick={handleSubmit} disabled={isSaving} className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-2.5 sm:py-3.5 bg-[#0d9488] hover:bg-[#E85222] text-white rounded-xl sm:rounded-2xl shadow-xl transition-all font-black uppercase tracking-widest text-[10px] sm:text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Save className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span>{editId ? 'Save' : 'Publish'}</span>
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 sm:mt-12 px-4 sm:px-6">
         <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10 bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Category *</label>
                  <select
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm text-[#1a3a5c]"
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Medico">Medical Openings</option>
                    <option value="Non-Medical">Non-Medical</option>
                    <option value="Admin">Administration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Department *</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    placeholder="e.g. Cardiology"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Designation *</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    placeholder="e.g. Senior Consultant"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-4">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Location</label>
                  <input 
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Positions</label>
                  <input type="number"
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Deadline Date</label>
                  <input type="date"
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm text-[#1a3a5c]"
                    value={formData.lastDate && formData.lastDate !== '-' ? new Date(formData.lastDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                  />
                </div>
            </div>

            <div className="space-y-4 pt-4">
               <div className="flex items-center justify-between ml-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Detailed Description</label>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Publicity:</span>
                     <button type="button" onClick={() => setFormData({...formData, isActive: !formData.isActive})} className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                        formData.isActive ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-slate-50 text-slate-400 border border-slate-200'
                     }`}>
                        {formData.isActive ? 'LIVE ON SITE' : 'HIDDEN/DRAFT'}
                     </button>
                  </div>
               </div>
               <div className="rounded-[2.5rem] overflow-hidden border-2 border-gray-50 focus-within:border-[#0d9488] transition-all">
                  <Editor
                    apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl' // Real API Key
                    init={{
                      height: 450,
                      menubar: false,
                      plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
                      toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                      content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px; color: #1a3a5c; }',
                      branding: false,
                    }}
                    value={formData.description}
                    onEditorChange={(content: string) => setFormData({ ...formData, description: content })}
                  />
               </div>
            </div>
         </form>
      </div>
    </div>
  );
}

export default function CareerActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" /></div>}>
      <CareerActionForm />
    </Suspense>
  );
}
