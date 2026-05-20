"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Shield, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        const res = await fetch("/api-backend/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to send reset link");
        setSuccess(data.message || "Password reset link sent to your email.");
      } else {
        const res = await fetch("/api-backend/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(
            "Server returned an invalid response. Please check if the backend is running.",
          );
        }

        if (!res.ok) throw new Error(data.error || "Login failed");

        sessionStorage.setItem("admin_token", data.token);
        sessionStorage.setItem("admin_user", JSON.stringify(data.user));
        if (data.user?.role === "sub_admin") {
          router.push("/admin-dashboard/bookings");
        } else if (data.user?.role === "career_admin") {
          router.push("/admin-dashboard/careers");
        } else {
          router.push("/admin-dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 sm:p-6">
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
      <div className="relative z-10 w-full max-w-[390px] bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] border border-white/20 transform transition-all animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-horizontal.png"
            alt="Popular Hospital"
            width={160}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0b1c43]/5 text-[#0b1c43] mb-3 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#0b1c43] tracking-tight">
            {isForgotPassword ? "Reset Password." : "Admin Portal."}
          </h2>
          <p className="text-gray-500 mt-1.5 text-xs font-medium">
            {isForgotPassword
              ? "Enter your email to receive a secure reset link"
              : "Access your secure management board"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 animate-head-shake">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-red-600"
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
            <p className="text-[12px] font-bold text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-100 flex items-center gap-2 animate-fade-in-up">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-[12px] font-bold text-green-700">{success}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-[10px] font-bold text-[#0b1c43]/50 uppercase tracking-widest pl-1"
            >
              Email Address
            </label>
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border-2 border-gray-100 bg-gray-50/30 text-[#0b1c43] placeholder-gray-300 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium"
              />
              <LogIn className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#0d9488] transition-colors" />
            </div>
          </div>

          {/* Password */}
          {!isForgotPassword && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label
                  htmlFor="password"
                  className="block text-[10px] font-bold text-[#0b1c43]/50 uppercase tracking-widest pl-1"
                >
                  Security Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setEmail("");
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider hover:opacity-70"
                >
                  Forgot Key?
                </button>
              </div>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  required={!isForgotPassword}
                  className="w-full h-11 px-4 rounded-xl border-2 border-gray-100 bg-gray-50/30 text-[#0b1c43] placeholder-gray-300 focus:bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-[#0d9488]/10 outline-none transition-all text-sm font-medium pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#0b1c43] hover:bg-[#0e2455] text-white rounded-xl font-bold text-xs transition-all shadow-[0_10px_25px_-8px_rgba(11,28,67,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(11,28,67,0.6)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:scale-95 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating Access...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {isForgotPassword ? "Send Reset Link" : "Secure Sign In"}
                </>
              )}
            </button>
            {isForgotPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setEmail("");
                  setError("");
                  setSuccess("");
                }}
                className="w-full mt-3 text-xs font-bold text-[#0b1c43]/60 hover:text-[#0b1c43] transition-colors"
              >
                Back to Login
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[#0b1c43]/30 text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
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
