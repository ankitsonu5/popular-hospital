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
          const headers = { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` };
          // Fetch the whole list and find the specific item by ID
          const res = await fetch(`/api-backend/cms/careers`, { headers });
          if (!res.ok) throw new Error('Could not fetch career details');
          const data = await res.json();
          const item = data.find((c: any) => c._id === editId);
          if (item) setFormData(item);
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
    e.preventDefault();
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

      // CLEANUP: Remove MongoDB system fields that shouldn't be sent in the body
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

      // Handle non-JSON responses gracefully (to avoid "Unexpected token <")
      const contentType = res.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
          result = await res.json();
      } else {
          // If not JSON, it might be an HTML error page from the server/proxy
          const errorText = await res.text();
          console.error('Server returned non-JSON response:', errorText);
          throw new Error('Server error: Received invalid response format. Please check if backend is running.');
      }

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save career opening');
      }

      alert(editId ? 'Job opening updated successfully!' : 'New job role published successfully!');
      
      // Attempt to close the tab and return to previous dashboard
      if (window.opener || window.history.length === 1) {
        window.close();
      }
      
      // Fallback if window didn't close
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
      {/* Top Professional Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.close()} 
            className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shadow-inner">
                <Briefcase className="w-6 h-6 text-[#0d9488]" />
             </div>
             <div>
                <h1 className="text-xl font-black text-[#1a3a5c] uppercase tracking-widest">
                  {editId ? 'Edit Job Opening' : 'Announce New Vacancy'}
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Talent Acquisition Center • Popular Hospital</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => window.close()}
              className="px-6 py-3 text-sm font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-3 px-10 py-3.5 bg-[#1a3a5c] hover:bg-[#E85222] text-white rounded-2xl shadow-xl shadow-blue-900/20 transition-all font-black uppercase tracking-widest text-sm active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editId ? 'Save Changes' : 'Publish Role'}
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-6">
         <form className="space-y-8 bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category *</label>
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
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Department *</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    placeholder="e.g. Cardiology"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Designation *</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    placeholder="e.g. Senior Consultant"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Location</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Positions</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm text-center"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Posted Date</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    value={formData.postedOn}
                    onChange={(e) => setFormData({ ...formData, postedOn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Deadline</label>
                  <input required
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                    value={formData.lastDate}
                    onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                  />
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Job Description & Requirements *</label>
                <div className="rounded-[2.5rem] overflow-hidden border-2 border-gray-50 shadow-inner min-h-[500px]">
                    <Editor
                      apiKey='is3j4bzf30lgwckvfur7e3gakfrp7cs9deounruffapc2zvl'
                      value={formData.description}
                      onEditorChange={(content: string) => setFormData({ ...formData, description: content })}
                      init={{
                        height: 550,
                        menubar: true,
                        plugins: 'advlist autolink lists link charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
                        toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px; color:#4a5568; line-height:1.6 }',
                        branding: false
                      }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="flex flex-col">
                   <span className="text-sm font-black text-[#1a3a5c] uppercase tracking-widest">Public Visibility</span>
                   <span className="text-[10px] text-gray-400 font-bold italic">When toggled on, this job will appear on the public careers page.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0d9488]"></div>
                </label>
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
