"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Briefcase, Loader2, AlertTriangle, ShieldOff } from "lucide-react";

export default function CareerAdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_user");
    if (token && user) {
      const parsed = JSON.parse(user);
      if (parsed.role === "career_admin") {
        router.replace("/careers/admin");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api-backend/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 403 && data.error === "already_logged_in") {
        setAlreadyLoggedIn(true);
        return;
      }

      if (res.status === 403 && data.error === "account_disabled") {
        setAccountDisabled(true);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Login failed");

      if (data.user?.role !== "career_admin") {
        throw new Error("Access denied. Use the main admin login.");
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));
      router.push("/careers/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  if (accountDisabled) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/auth-bg.png" alt="background" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c43]/95 via-[#0b1c43]/85 to-[#0d9488]/60 mix-blend-multiply" />
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-8 gap-3">
            <Image src="/logo-horizontal.png" alt="Popular Hospital" width={180} height={48} className="h-10 w-auto object-contain bg-white rounded-lg px-3 py-1" />
          </div>
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-400/40 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-5">
              <ShieldOff className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Account Disabled</h2>
            <p className="text-red-200 text-sm leading-relaxed mb-1">
              Aapka account disable kar diya gaya hai.
            </p>
            <p className="text-white/60 text-xs leading-relaxed mb-6">
              Login ke liye <span className="text-white font-semibold">Super Admin</span> se sampark karein aur account activate karaayein.
            </p>
            <button
              onClick={() => { setAccountDisabled(false); setError(""); }}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/20"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (alreadyLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 bg-[#0b1c43]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/auth-bg.png" alt="background" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c43]/95 via-[#0b1c43]/85 to-[#0d9488]/60 mix-blend-multiply" />
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-8 gap-3">
            <Image
              src="/logo-horizontal.png"
              alt="Popular Hospital"
              width={180}
              height={48}
              className="h-10 w-auto object-contain bg-white rounded-lg px-3 py-1"
            />
          </div>

          <div className="bg-amber-500/20 backdrop-blur-xl border border-amber-400/40 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mx-auto mb-5">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Already Logged In</h2>
            <p className="text-amber-200 text-sm leading-relaxed mb-1">
              This account is currently active in another session.
            </p>
            <p className="text-white/60 text-xs leading-relaxed mb-6">
              Contact <span className="text-white font-semibold">Admin Administrator</span> to reset your session, or wait for the current session to expire (4 hours).
            </p>
            <button
              onClick={() => { setAlreadyLoggedIn(false); setError(""); }}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/20"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-6 bg-[#0b1c43]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth-bg.png"
          alt="background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c43]/95 via-[#0b1c43]/85 to-[#0d9488]/60 mix-blend-multiply" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <Image
            src="/logo-horizontal.png"
            alt="Popular Hospital"
            width={180}
            height={48}
            className="h-10 w-auto object-contain bg-white rounded-lg px-3 py-1"
          />
          <div className="flex items-center gap-2 mt-2 bg-white/10 px-4 py-2 rounded-full">
            <Briefcase className="w-4 h-4 text-[#0d9488]" />
            <span className="text-white/90 text-sm font-medium">Career Portal Admin</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-white/50 text-sm mb-6">Sign in to manage careers & applications</p>

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-400/30 text-red-200 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="career@popularhospital.in"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488]/50 transition"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 pr-11 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488]/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0b7a70] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
