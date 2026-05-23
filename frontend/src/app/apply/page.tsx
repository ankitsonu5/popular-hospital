"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Calendar,
  Globe,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Navigation,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  X,
} from "lucide-react";
import Link from "next/link";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    identificationType: "",
    mobile: "",
    email: "",
    address: "",
    location: "",
  });

  type FormDataKey = keyof typeof formData;

  const [resume, setResume] = useState<File | null>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  // Get job ID from URL
  const [jobId, setJobId] = useState<string | null>(null);
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setJobId(params.get("job"));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormDataKey]: value }));
  };

  const handleResumeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.size > 2 * 1024 * 1024) {
      setError("Resume file size must be less than 2MB");
      setResume(null);
      if (resumeRef.current) resumeRef.current.value = "";
      return;
    }
    setResume(file);
    if (error && error.includes("Resume")) setError(null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    (Object.keys(formData) as Array<FormDataKey>).forEach((key) =>
      data.append(key, formData[key]),
    );
    if (resume) data.append("resume", resume);
    if (jobId) data.append("appliedFor", jobId);

    try {
      const resp = await fetch("/api-backend/applications", {
        method: "POST",
        body: data,
      });

      if (!resp.ok) {
        const contentType = resp.headers.get("content-type");
        let message = "Failed to submit application";
        if (contentType && contentType.includes("application/json")) {
          const errData = await resp.json();
          message = errData.message || errData.error || message;
        } else {
          message = "Backend server is down or unreachable (Status 500)";
        }
        throw new Error(message);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying. Our HR team will review your profile and get
            back to you soon.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-[#0b1c43] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1a3a6e] transition-all"
          >
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0b1c43] tracking-tight">
              Candidate Profile
            </h1>
            <p className="mt-2 text-gray-500 font-medium">
              Complete your profile to apply for the position.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-blue-600">
                Progress: {step === 1 ? "50%" : "100%"} Complete
              </p>
              <p className="text-xs text-gray-400">Last Updated: Today</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setStep(1)}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${step === 1 ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              Personal Info
              {step === 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setStep(2)}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${step === 2 ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              Documents
              {step === 2 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
          </div>

          <div className="p-8 md:p-12">
            {step === 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Fields */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Nationality <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <select
                      name="nationality"
                      required
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold appearance-none"
                    >
                      <option value="">Select Nationality</option>
                      <option value="Indian">Indian</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Identification Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <select
                      name="identificationType"
                      required
                      value={formData.identificationType}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold appearance-none"
                    >
                      <option value="">Select Type</option>
                      <option value="Aadhar">Aadhar Card</option>
                      <option value="PAN">PAN Card</option>
                      <option value="VoterID">Voter ID</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 00000 00000"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@mail.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Full Address
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <textarea
                      name="address"
                      rows={1}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street, House No, Area..."
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    Location
                  </label>
                  <div className="relative group">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-600/20 focus:bg-white transition-all outline-none text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Next Step <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* File Uploads */}
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">
                      Upload Resume <span className="text-red-500">*</span>
                    </label>
                    <div
                      onClick={() => resumeRef.current?.click()}
                      className="border-2 border-dashed border-gray-100 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center transition-transform group-hover:scale-110">
                        <FileText className="w-8 h-8 text-yellow-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-800">
                          Drop files here or{" "}
                          <span className="text-blue-600">browse</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Max file size 2MB (PDF, DOCX)
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={resumeRef}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeSelect}
                      />
                    </div>
                    {resume && (
                      <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-xs font-bold text-gray-800 truncate max-w-[150px]">
                              {resume.name}
                            </p>
                            <p className="text-[10px] text-blue-500">
                              {(resume.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setResume(null)}
                          className="p-1 hover:bg-blue-200 rounded-full text-blue-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>



                <div className="md:col-span-2 pt-8 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-3 text-gray-400 px-8 py-4 rounded-2xl font-bold hover:text-gray-600 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" /> Previous Step
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !resume}
                    className="flex items-center gap-3 bg-[#0b1c43] text-white px-12 py-4 rounded-2xl font-bold hover:bg-[#1a3a6e] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Complete
                        Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
