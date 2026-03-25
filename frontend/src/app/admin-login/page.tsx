'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, LogIn, Shield, Loader2 } from 'lucide-react';


export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api-backend/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Server returned an invalid response. Please check if the backend is running.');
      }
      
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      router.push('/admin-dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 sm:p-10">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0 bg-[#0b1c43]">
        <Image
          src="/images/auth-bg.png"
          alt="Healthcare background"
          fill
          className="object-cover opacity-60 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c43]/90 via-[#0b1c43]/80 to-[#0d9488]/70 mix-blend-multiply" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0d9488]/30 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E85222]/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />

      {/* Login Card (Reverted to Centered Style) */}
      <div className="relative z-10 w-full max-w-[460px] bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 transform transition-all animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-horizontal.png"
            alt="Popular Hospital"
            width={200}
            height={55}
            className="h-11 w-auto object-contain"
            priority
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0b1c43]/5 text-[#0b1c43] mb-5 shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-[#0b1c43] tracking-tight">Admin Portal.</h2>
          <p className="text-gray-500 mt-2 text-base font-medium">Access your secure management board</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 animate-head-shake">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
               <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <p className="text-[13px] font-bold text-red-700">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold text-[#0b1c43]/50 uppercase tracking-widest pl-1">
              Email Address
            </label>
            <div className="relative group">
               <input
                 id="email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Enter admin email"
                 required
                 className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50/30 text-[#0b1c43] placeholder-gray-300 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium"
               />
               <LogIn className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#0d9488] transition-colors" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
               <label htmlFor="password" className="block text-xs font-bold text-[#0b1c43]/50 uppercase tracking-widest pl-1">
                 Security Password
               </label>
               <button type="button" className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider hover:opacity-70">Forgot Key?</button>
            </div>
            <div className="relative group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter security password"
                required
                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50/30 text-[#0b1c43] placeholder-gray-300 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 flex items-center justify-center gap-3 bg-[#0b1c43] hover:bg-[#0e2455] text-white rounded-2xl font-bold text-sm transition-all shadow-[0_15px_35px_-10px_rgba(11,28,67,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(11,28,67,0.6)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:scale-95 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating Access...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Secure Sign In
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-gray-100">
           <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-[#0b1c43]/30 text-[11px] font-black uppercase tracking-[0.2em] leading-tight">
                © 2026 Popular Hospital.<br/>Admin Access Only.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
