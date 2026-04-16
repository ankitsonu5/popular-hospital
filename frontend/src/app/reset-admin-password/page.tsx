"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api-backend/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to reset password");

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin-login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-500 mb-6 shadow-inner ring-8 ring-green-50/50">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-[#0b1c43] tracking-tight mb-3">
          Password Reset!
        </h2>
        <p className="text-gray-500 text-base font-medium mb-8">
          Your admin password has been successfully updated. Redirecting you to
          login...
        </p>
        <button
          onClick={() => router.push("/admin-login")}
          className="w-full h-14 flex items-center justify-center gap-2 bg-[#0b1c43] hover:bg-[#0e2455] text-white rounded-2xl font-bold text-sm transition-all shadow-[0_15px_35px_-10px_rgba(11,28,67,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(11,28,67,0.6)] hover:-translate-y-0.5 active:scale-95 group"
        >
          Go to Login{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Welcome Text */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0b1c43]/5 text-[#0b1c43] mb-5 shadow-inner">
          <KeyRound className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-[#0b1c43] tracking-tight">
          Set New Password.
        </h2>
        <p className="text-gray-500 mt-2 text-base font-medium">
          Create a strong password to secure your admin account
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 animate-head-shake">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-[13px] font-bold text-red-700">{error}</p>
        </div>
      )}

      {/* Reset Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0b1c43]/50 uppercase tracking-widest pl-1">
            New Password
          </label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50/30 text-[#0b1c43] placeholder-gray-300 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0b1c43]/50 uppercase tracking-widest pl-1">
            Confirm Password
          </label>
          <div className="relative group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full h-14 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50/30 text-[#0b1c43] placeholder-gray-300 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full h-16 flex items-center justify-center gap-3 bg-[#0b1c43] hover:bg-[#0e2455] text-white rounded-2xl font-bold text-sm transition-all shadow-[0_15px_35px_-10px_rgba(11,28,67,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(11,28,67,0.6)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:scale-95 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating Security Info...
              </>
            ) : (
              <>
                <KeyRound className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
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

      {/* Card */}
      <div className="relative z-10 w-full max-w-[460px] bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20">
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

        <Suspense
          fallback={
            <div className="flex justify-center p-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#0b1c43]" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[#0b1c43]/30 text-[11px] font-black uppercase tracking-[0.2em] leading-tight">
              © 2026 Popular Hospital.
              <br />
              Admin Access Only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
