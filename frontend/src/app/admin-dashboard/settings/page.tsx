'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, Key, User } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [user] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('admin_user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin-login');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your admin account settings</p>
      </div>

      {/* Admin Profile */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#0b1c43] flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{user?.name || 'Admin'}</h3>
            <p className="text-sm text-gray-500">{user?.email || 'admin@popularhospital.com'}</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</p>
              <p className="text-sm text-gray-900 font-medium">{user?.name || 'Admin'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Key className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
              <p className="text-sm text-gray-900 font-medium">{user?.email || ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</p>
              <p className="text-sm text-gray-900 font-medium">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
        <h4 className="font-bold text-red-700 mb-2">Danger Zone</h4>
        <p className="text-sm text-gray-500 mb-4">Logging out will clear your session.</p>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
