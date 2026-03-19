'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, X, Loader2, Building2, MapPin, Clock, 
  Phone, Image as ImageIcon, Upload, Save, ArrowLeft,
  Mail, Link as LinkIcon, Sparkles, Globe
} from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import Link from 'next/link';

const API_URL = '/api-backend';

function BranchActionForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editingId = searchParams.get('id');
    
    const [isLoading, setIsLoading] = useState(!!editingId);
    const [isSaving, setIsSaving] = useState(false);
    
    const [formData, setFormData] = useState({
      name: '', slug: '', city: '', state: '', heading: '', title: '',
      description: '', address: '', phone: '', email: '', pincode: '',
      timings: '', mapEmbedUrl: '', mapDirectionsUrl: '', facilities: '',
    });

    const [files, setFiles] = useState<{ [key: string]: File | null }>({
      image_one: null, image_two: null, image_three: null, image_four: null
    });

    const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
      image_one: null, image_two: null, image_three: null, image_four: null
    });

    useEffect(() => {
        if (editingId) {
            fetchBranch();
        }
    }, [editingId]);

    const fetchBranch = async () => {
        try {
            const res = await fetch(`${API_URL}/branches/${editingId}`, { cache: 'no-store' });
            if (res.ok) {
                const branch = await res.json();
                setFormData({
                    name: branch.name || '', slug: branch.slug || '', city: branch.city || '',
                    state: branch.state || '', heading: branch.heading || '', title: branch.title || '',
                    description: branch.description || '', address: branch.address || '',
                    phone: branch.phone || '', email: branch.email || '', pincode: branch.pincode || '',
                    timings: branch.timings || '',
                    mapEmbedUrl: branch.mapEmbedUrl || '', mapDirectionsUrl: branch.mapDirectionsUrl || '',
                    facilities: branch.facilities || '',
                });
                setPreviews({
                    image_one: branch.image_one ? getImageUrl(branch.image_one) : null,
                    image_two: branch.image_two ? getImageUrl(branch.image_two) : null,
                    image_three: branch.image_three ? getImageUrl(branch.image_three) : null,
                    image_four: branch.image_four ? getImageUrl(branch.image_four) : null,
                });
            }
        } catch (e) {
            console.error('Fetch error:', e);
        }
        setIsLoading(false);
    };

    const handleFileChange = (key: string, file: File | null) => {
        setFiles(prev => ({ ...prev, [key]: file }));
        if (file) {
            setPreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            
            Object.entries(files).forEach(([key, file]) => {
                if (file) data.append(key, file);
            });

            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? `${API_URL}/cms/branches/${editingId}` : `${API_URL}/cms/branches`;
            
            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
                },
                body: data,
            });

            if (res.ok) {
                window.close();
            } else {
                const errData = await res.json();
                alert(`Failed to save: ${errData.error || 'Unknown error'}`);
            }
        } catch (e) {
            alert('Error connecting to server. Please try again.');
        }
        setIsSaving(false);
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" /></div>;

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-[1366px] mx-auto px-4 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin-dashboard/branches" className="p-3 hover:bg-slate-50 rounded-2xl transition-all group">
                            <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-[#0d9488]" />
                        </Link>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-[#1a3a5c] uppercase tracking-widest">{editingId ? 'Modify Strategy' : 'New Territory'}</h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Branch Infrastructure Node</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.close()} className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all">Discard</button>
                        <button onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-3 px-8 py-4 bg-[#0d9488] hover:bg-[#E85222] text-white rounded-2xl shadow-xl shadow-teal-900/10 transition-all active:scale-95 disabled:opacity-50 font-black uppercase tracking-widest text-[10px]">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4 text-white" />}
                            <span>{editingId ? 'Save Node' : 'Initialize Node'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1366px] mx-auto px-4 mt-12">
                <form className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Body */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Core Specs Card */}
                        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white space-y-10">
                            <div className="flex items-center gap-4 border-l-4 border-[#0d9488] pl-6">
                                <Building2 className="w-6 h-6 text-[#0d9488]" />
                                <h2 className="text-lg font-black text-[#1a3a5c] uppercase tracking-widest">Base Operations Config</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Branch Identity *</label>
                                    <input required placeholder="e.g. Popular Hospital - BLW Road"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">URL Slug (System ID) *</label>
                                    <input required placeholder="pop-blw-vns"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">City Domain *</label>
                                    <input required placeholder="Varanasi"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">State Territory</label>
                                    <input placeholder="Uttar Pradesh"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mission Briefing (Description)</label>
                                <textarea rows={4} placeholder="Summarize the key strengths and focus of this branch..."
                                    className="w-full px-8 py-6 rounded-[2.5rem] bg-gray-50 border-2 border-transparent focus:border-[#0d9488] focus:bg-white outline-none transition-all font-bold text-sm resize-none"
                                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>

                        {/* Location & Log Card */}
                        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white space-y-10">
                            <div className="flex items-center gap-4 border-l-4 border-orange-500 pl-6">
                                <MapPin className="w-6 h-6 text-orange-500" />
                                <h2 className="text-lg font-black text-[#1a3a5c] uppercase tracking-widest">Geographic & Logistics Data</h2>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Physical HQ Address *</label>
                                <input required placeholder="Plot No. X, Street Y, Landmark Z..."
                                    className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                    value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2"><Phone className="w-3 h-3 text-orange-400" /> Contact Comms</label>
                                    <input placeholder="+91-78XXXXXX95"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2"><Clock className="w-3 h-3 text-orange-400" /> Operational Hours</label>
                                    <input placeholder="24/7 Availability"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.timings} onChange={(e) => setFormData({ ...formData, timings: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2"><Mail className="w-3 h-3 text-orange-400" /> Digital Contact</label>
                                    <input placeholder="branch@popularhospital.in"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2"><Globe className="w-3 h-3 text-orange-400" /> Pin Code Zone</label>
                                    <input placeholder="221005"
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Integration Card */}
                        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white space-y-10">
                            <div className="flex items-center gap-4 border-l-4 border-indigo-500 pl-6">
                                <LinkIcon className="w-6 h-6 text-indigo-500" />
                                <h2 className="text-lg font-black text-[#1a3a5c] uppercase tracking-widest">Maps & External Integration</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Google Map Embed URL (Iframe Src)</label>
                                    <input placeholder="https://www.google.com/maps/embed?..."
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.mapEmbedUrl} onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })} />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Direct Navigation Link (Route Map)</label>
                                    <input placeholder="https://maps.app.goo.gl/..."
                                        className="w-full px-8 py-5 rounded-[2rem] bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                        value={formData.mapDirectionsUrl} onChange={(e) => setFormData({ ...formData, mapDirectionsUrl: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Visual Asset Hub */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white space-y-8 sticky top-32">
                            <div className="flex items-center gap-4 border-l-4 border-teal-500 pl-6">
                                <Sparkles className="w-5 h-5 text-teal-500" />
                                <h3 className="text-sm font-black text-[#1a3a5c] uppercase tracking-widest">Base Visual Assets</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {['image_one', 'image_two', 'image_three', 'image_four'].map((key) => (
                                    <div key={key} className="space-y-2">
                                        <input 
                                            type="file" accept="image/*" className="hidden" id={`upload-${key}`}
                                            onChange={(e) => handleFileChange(key, e.target.files?.[0] || null)}
                                        />
                                        <label htmlFor={`upload-${key}`} className="block relative aspect-square rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 hover:border-teal-500 cursor-pointer overflow-hidden transition-all group shadow-inner">
                                            {previews[key] ? (
                                                <>
                                                    <img src={previews[key]!} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                                                        <Upload className="w-6 h-6 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-slate-300">
                                                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mb-1 shadow-sm group-hover:bg-teal-50 group-hover:text-teal-500 transition-colors">
                                                        <Plus className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-[8px] font-black uppercase tracking-widest">FRAME {key.split('_')[1].toUpperCase()}</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-50 p-6 rounded-[2rem] space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Plus className="w-3 h-3" /> Quick Attributes
                                </h4>
                                <div className="space-y-3">
                                    <label className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Specialized Facilities</label>
                                    <textarea rows={3} placeholder="Diagnostic, Ortho, ICCU..."
                                        className="w-full px-5 py-3 rounded-xl bg-white border border-slate-100 text-[10px] font-bold focus:border-teal-500 outline-none resize-none"
                                        value={formData.facilities} onChange={(e) => setFormData({ ...formData, facilities: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function BranchActionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 animate-spin text-[#0d9488]" /></div>}>
            <BranchActionForm />
        </Suspense>
    );
}
