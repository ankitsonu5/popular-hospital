'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, Clock, Search, Loader2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${API_URL}/api/cms/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setBookings(data); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = bookings.filter((b) =>
    b.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.patient_phone?.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bookings</h2>
        <p className="text-sm text-gray-500 mt-1">{bookings.length} total bookings</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search by patient name or phone..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:border-[#0d9488] focus:ring-2 focus:ring-[#0d9488]/20 outline-none transition-all" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Doctor</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Branch</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date & Time</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-gray-900">{b.patient_name}</p>
                      <p className="text-xs text-gray-400">{b.patient_phone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 hidden md:table-cell">{b.doctor?.name || '-'}</td>
                    <td className="py-3.5 px-4 text-gray-600 hidden lg:table-cell">{b.branch?.name || '-'}</td>
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />{b.slot_date} {b.slot_time}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        b.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                        b.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                        b.status === 'completed' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-16 text-gray-400">
                    <CalendarCheck className="w-10 h-10 mx-auto mb-3 text-gray-200" /><p>No bookings found</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
