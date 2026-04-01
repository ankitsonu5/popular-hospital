"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Clock,
  CheckCircle,
  X,
  Check,
  ArrowRight,
  Upload,
  ArrowLeft,
} from "lucide-react";

// Types for members
interface Member {
  name: string;
  age: string;
  sex: string;
  mobile: string;
  aadhaar: string;
  relation: string;
}

const WellnessPage = () => {
  const [purchaseStep, setPurchaseStep] = useState<
    "none" | "small-form" | "application-form"
  >("none");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({ name: "", mobile: "" });
  const [members, setMembers] = useState<Member[]>(
    Array(6)
      .fill(null)
      .map((_, i) => ({
        name: "",
        age: "",
        sex: "",
        mobile: "",
        aadhaar: "",
        relation: i === 0 ? "Self" : "",
      })),
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleBuyNow = (cardName: string) => {
    setSelectedCard(cardName);
    setPurchaseStep("small-form");
  };

  const handleSmallFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetails.name && userDetails.mobile) {
      // Pre-fill the first row (Self) with user details
      const updatedMembers = [...members];
      updatedMembers[0] = {
        ...updatedMembers[0],
        name: userDetails.name,
        mobile: userDetails.mobile,
      };
      setMembers(updatedMembers);
      setPurchaseStep("application-form");
    }
  };

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api-backend/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inquiryData,
          subject: "Health Fit Card Inquiry",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setInquiryData({ name: "", phone: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-white min-h-screen relative overflow-x-hidden">
      {purchaseStep === "application-form" ? (
        <div className="bg-white min-h-screen animate-in fade-in duration-500 relative pb-24">
          <div className="w-full">
            {/* Header / Navigation Bar */}
            <div className="bg-[#0b1c43] py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-lg">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPurchaseStep("none")}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#0b1c43] transition-all group"
                >
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <h2 className="text-xl md:text-2xl font-black text-white font-heading uppercase tracking-tight">
                  Health-Fit Card Application
                </h2>
              </div>

              {/* Selected Plan Badge - Mini Version for Header */}
              <div className="hidden md:flex bg-[#E85222] px-6 py-2 rounded-full border border-orange-400 shadow-sm items-center gap-3">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  Selected:
                </span>
                <span className="text-sm font-black text-white">
                  {selectedCard}
                </span>
              </div>
            </div>

            <div className="max-w-[1366px] mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-12">
                <div className="relative">
                  <div className="w-24 h-1.5 bg-[#E85222] rounded-full mb-6"></div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#0b1c43] font-heading tracking-tight leading-tight uppercase">
                    Application-cum-consent
                    <br />
                    Form
                  </h2>
                  <h3 className="text-lg md:text-2xl font-black text-[#E85222] italic font-heading mt-2">
                    For Family Health Card
                  </h3>
                </div>

                {/* Selected Plan Badge - Premium Style (Matches User Image) */}
                <div className="bg-[#FFF5F0] px-6 py-4 rounded-full border border-orange-100 shadow-md shrink-0 flex flex-col items-center min-w-[200px] hover:scale-105 transition-transform duration-300">
                  <span className="text-[10px] font-black text-[#E85222] uppercase tracking-[0.3em] block mb-1">
                    Selected Plan
                  </span>
                  <span className="text-base md:text-lg font-black text-[#0b1c43] text-center">
                    {selectedCard}
                  </span>
                </div>
              </div>

              {/* Consent Text */}
              <div className="bg-slate-50/70 p-10 md:p-14 rounded-[3.5rem] border border-slate-100 mb-16 shadow-inner">
                <p className="text-xl text-slate-600 leading-[1.8] font-medium text-justify">
                  I{" "}
                  <span className="inline-block px-4 py-0.5 border-b-2 border-[#0b1c43] text-[#0b1c43] font-black italic">
                    {userDetails.name}
                  </span>{" "}
                  would like to apply for the Family Health Card offered by
                  Popular Group of Hospitals. I have been informed and satisfied
                  for the information provided. Therefore, agreed to apply for
                  the same and here by do grant my consent for Popular Group of
                  Hospital to use my information provided below.
                </p>
                <p className="mt-8 text-xl text-slate-600 leading-[1.8] font-medium text-justify">
                  I would like to add following members to Family Health Card as
                  per my wish, they are in my close blood relation. I am aware
                  that as per Family Health Card policy, following members will
                  only be covered.
                </p>
              </div>

              {/* Membership Table */}
              <div className="mb-16 overflow-x-auto rounded-[2rem] border border-slate-200 shadow-xl bg-white">
                <table className="w-full border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-[#0b1c43] text-white uppercase tracking-widest text-xs font-black">
                      <th className="px-6 py-6 text-left w-16">SN</th>
                      <th className="px-6 py-6 text-left">Full Name</th>
                      <th className="px-6 py-6 text-left w-24">Age</th>
                      <th className="px-6 py-6 text-left w-24">Sex</th>
                      <th className="px-6 py-6 text-left">Mobile No</th>
                      <th className="px-6 py-6 text-left">Aadhaar Card No</th>
                      <th className="px-6 py-6 text-left">Relation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {members.map((member, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-5 font-black text-[#0b1c43] opacity-40">
                          {index + 1}
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-hospital-teal outline-none font-bold text-slate-700 shadow-sm"
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) =>
                              updateMember(index, "name", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-hospital-teal outline-none font-bold text-slate-700 text-center"
                            placeholder="00"
                            value={member.age}
                            onChange={(e) =>
                              updateMember(index, "age", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-3 py-3">
                          <select
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-hospital-teal outline-none font-bold text-slate-700 appearance-none"
                            value={member.sex}
                            onChange={(e) =>
                              updateMember(index, "sex", e.target.value)
                            }
                          >
                            <option value=""></option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                            <option value="O">O</option>
                          </select>
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="tel"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-hospital-teal outline-none font-bold text-slate-700"
                            placeholder="Mobile No"
                            value={member.mobile}
                            onChange={(e) =>
                              updateMember(index, "mobile", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-hospital-teal outline-none font-bold text-slate-700"
                              placeholder="Aadhaar No"
                              value={member.aadhaar}
                              onChange={(e) =>
                                updateMember(index, "aadhaar", e.target.value)
                              }
                            />
                            <label className="flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors text-[9px] uppercase font-black tracking-widest text-[#0b1c43] border border-slate-200">
                              <Upload className="w-3 h-3" /> Choose File
                              <input type="file" className="hidden" />
                            </label>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <input
                            disabled={index === 0}
                            type="text"
                            className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-hospital-teal outline-none font-bold text-slate-700 ${index === 0 ? "bg-slate-50 cursor-not-allowed opacity-70" : ""}`}
                            placeholder={index === 0 ? "Self" : "Relation"}
                            value={member.relation}
                            onChange={(e) =>
                              updateMember(index, "relation", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-12 bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
                <label className="flex items-center gap-5 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-8 h-8 rounded-lg border-2 border-slate-300 text-hospital-teal focus:ring-hospital-teal cursor-pointer"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                  />
                  <span className="text-xl font-bold text-slate-700 group-hover:text-[#0b1c43] transition-colors">
                    I have read the terms and conditions.
                  </span>
                </label>

                <button
                  disabled={!agreedToTerms}
                  className={`px-16 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm transition-all shadow-xl ${
                    agreedToTerms
                      ? "bg-hospital-teal text-white hover:bg-[#0b1c43] shadow-teal-900/40 transform active:scale-[0.97]"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed grayscale"
                  }`}
                  onClick={() => {
                    alert("Redirecting to Secure Payment Gateway...");
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ═══════ HERO ═══════ */}
          <section className="relative h-[250px] md:h-[300px] w-full bg-[#1a2b3c] overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/banners/health_packages.png"
                alt="Wellness Services"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-slate-900/30" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1366px] px-6">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 font-heading tracking-tight text-shadow-lg">
                  Health Packages
                </h1>
                <nav
                  className="flex items-center text-sm md:text-base text-white/90 font-medium"
                  aria-label="Breadcrumb"
                >
                  <Link
                    href="/"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Home
                  </Link>
                  <span className="mx-2 text-red-600 font-bold">|</span>
                  <Link
                    href="/services"
                    className="hover:text-blue-300 transition-colors"
                  >
                    Services
                  </Link>
                  <span className="mx-2 text-red-600 font-bold">|</span>
                  <span className="text-white">Health Packages</span>
                </nav>
              </div>
            </div>
          </section>

          {/* Intro Section with Image */}
          <section id="benefits" className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto max-w-[1366px]">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-lg border-4 md:border-8 border-white bg-white">
                    <Image
                      src="/images/wellness/1.jpeg"
                      alt="Health Packages"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-black text-[#0b1c43] mb-6 font-heading tracking-tight">
                    One card for all your{" "}
                    <span className="text-hospital-teal text-outline">
                      family Health needs
                    </span>
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p className="text-lg leading-relaxed">
                      Health-fit Card is the perfect solution for all your
                      hospital care needs. Get access to hospital services with
                      just a swipe of your card. Benefit from discounts on
                      diagnostics and medicines. Enjoy hassle-free
                      hospitalization with the help of this card. Get fit and
                      stay healthy with the Health-fit Card. Get unlimited
                      access to doctor's consultations (OPD) and get free health
                      checkups and screenings. Enjoy the benefits of staying
                      healthy with the Health-fit Card.
                    </p>
                  </div>

                  {/* Health-fit Card benefits */}
                  <div className="mt-16">
                    <h3 className="text-xl md:text-2xl font-black text-[#0b1c43] mb-8 font-heading text-center sm:text-left">
                      Health-fit Card benefits
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Cash-to-cashless services",
                          icon: (
                            <CreditCard
                              className="w-8 h-8 text-slate-600"
                              strokeWidth={1.5}
                            />
                          ),
                        },
                        {
                          title: "24X7 available in-need",
                          icon: (
                            <div className="relative flex items-center justify-center">
                              <span className="text-[12px] font-black text-slate-600">
                                24/7
                              </span>
                              <svg
                                className="absolute w-12 h-12 text-slate-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                              >
                                <circle cx="12" cy="12" r="11" />
                              </svg>
                            </div>
                          ),
                        },
                        {
                          title: "On-time, Anytime Services",
                          icon: (
                            <div className="relative flex items-center justify-center">
                              <Clock
                                className="w-8 h-8 text-slate-600"
                                strokeWidth={1.5}
                              />
                              <CheckCircle
                                className="absolute -bottom-1 -right-1 w-4 h-4 text-[#0b1c43] fill-white"
                                strokeWidth={2.5}
                              />
                            </div>
                          ),
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:border-[#0b1c43] hover:shadow-md transition-all duration-300"
                        >
                          <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                          <span className="text-[15px] font-bold text-[#0b1c43] leading-snug">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Contact Form Section */}
          <section id="apply" className="py-24 px-6 bg-[#0b1c43]/5">
            <div className="container mx-auto max-w-[1366px]">
              <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row shadow-blue-900/10">
                <div className="lg:w-1/2 bg-[#0b1c43] p-8 md:p-16 text-white flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-black mb-8 font-heading tracking-tight">
                    If you wish to know more about Health Fit Card{" "}
                    <span className="text-[#E85222]">contact us</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-10 leading-relaxed font-medium"></p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white text-2xl group-hover:bg-[#E85222] transition-colors">
                        📞
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase tracking-widest text-xs">
                          Call Helpline
                        </span>
                        <span className="text-xl font-bold">
                          +91 7800001895 / 96
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white text-2xl group-hover:bg-hospital-teal transition-colors">
                        ✉️
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase tracking-widest text-xs">
                          Email Us
                        </span>
                        <span className="text-lg md:text-xl font-bold break-all leading-tight">
                          info@popularhospitals.in
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 md:p-16">
                  <form onSubmit={handleInquirySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium"
                          placeholder="Ex: Rahul Sharma"
                          value={inquiryData.name}
                          onChange={(e) =>
                            setInquiryData({
                              ...inquiryData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium"
                          placeholder="+91 98XXX XXXXX"
                          value={inquiryData.phone}
                          onChange={(e) =>
                            setInquiryData({
                              ...inquiryData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">
                        email
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium"
                        placeholder="Enter Your Email"
                        value={inquiryData.email}
                        onChange={(e) =>
                          setInquiryData({
                            ...inquiryData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-[#0b1c43] uppercase tracking-widest ml-1">
                        Message (Optional)
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#E85222] outline-none transition-all font-medium"
                        placeholder="How can we help you?"
                        value={inquiryData.message}
                        onChange={(e) =>
                          setInquiryData({
                            ...inquiryData,
                            message: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-bold text-sm">
                        Thank you! Your inquiry has been submitted successfully.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 font-bold text-sm">
                        Oops! Something went wrong. Please try again.
                      </div>
                    )}

                    <button
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#E85222] text-white rounded-2xl font-black hover:bg-[#d1451a] transition-all shadow-xl shadow-orange-900/20 uppercase tracking-widest text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Submit Application"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Card Tiers Selection */}
          <section className="py-24 px-6 relative">
            <div className="container mx-auto max-w-[1366px]">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase">
                  Health Cards
                </h2>
                <div className="w-24 h-1.5 bg-[#E85222] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Gold Card - 365 Days */}
                <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800] opacity-5 rounded-bl-full"></div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[#0b1c43] mb-2 font-heading">
                      Health-Fit <span className="text-[#FFB800]">Gold</span>
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">
                        Upto 4 Members
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#0b1c43]">
                          ₹799
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹1299
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E85222] flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Validity 365 Days
                    </li>
                    <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-[#E85222] flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Priority Support
                    </li>
                  </ul>
                  <button
                    onClick={() => handleBuyNow("Health-Fit Gold (365 Days)")}
                    className="w-full py-4 bg-[#0b1c43] text-white rounded-2xl font-black hover:bg-hospital-teal transition-all shadow-lg shadow-blue-900/10 uppercase tracking-widest text-xs"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Gold Card - 730 Days */}
                <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800] opacity-5 rounded-bl-full"></div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[#0b1c43] mb-2 font-heading">
                      Health-Fit <span className="text-[#FFB800]">Gold</span>
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">
                        Upto 4 Members
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-[#0b1c43]">
                          ₹1249
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹2598
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b1c43] flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Validity 730 Days
                    </li>
                    <li className="flex items-center gap-3 font-bold text-gray-700 text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0b1c43] flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Extended Benefits
                    </li>
                  </ul>
                  <button
                    onClick={() => handleBuyNow("Health-Fit Gold (730 Days)")}
                    className="w-full py-4 bg-[#0b1c43] text-white rounded-2xl font-black hover:bg-hospital-teal transition-all shadow-lg shadow-blue-900/10 uppercase tracking-widest text-xs"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Platinum Card - 365 Days */}
                <div className="bg-[#0b1c43] rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 text-white">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-hospital-teal opacity-10 rounded-bl-full"></div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black mb-2 font-heading text-white">
                      Health-Fit{" "}
                      <span className="text-hospital-teal">Platinum</span>
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">
                        Upto 6 Members
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">
                          ₹999
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹1899
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                      <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Validity 365 Days
                    </li>
                    <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                      <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Dedicated Priority Desk
                    </li>
                  </ul>
                  <button
                    onClick={() =>
                      handleBuyNow("Health-Fit Platinum (365 Days)")
                    }
                    className="w-full py-4 bg-hospital-teal text-white rounded-2xl font-black hover:bg-white hover:text-hospital-teal transition-all shadow-lg shadow-teal-900/40 uppercase tracking-widest text-xs"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Platinum Card - 730 Days */}
                <div className="bg-[#0b1c43] rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 text-white border-2 border-hospital-teal/30">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-hospital-teal opacity-20 rounded-bl-full"></div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black mb-2 font-heading text-white">
                      Health-Fit{" "}
                      <span className="text-hospital-teal">Platinum</span>
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-hospital-teal font-black uppercase tracking-widest text-[10px] md:text-xs">
                        Upto 6 Members
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">
                          ₹1799
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₹3798
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                      <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Validity 730 Days
                    </li>
                    <li className="flex items-center gap-3 font-bold text-gray-200 text-sm">
                      <div className="w-6 h-6 rounded-full bg-hospital-teal/20 text-hospital-teal flex items-center justify-center text-xs">
                        ✓
                      </div>
                      Elite Priority Access
                    </li>
                  </ul>
                  <button
                    onClick={() =>
                      handleBuyNow("Health-Fit Platinum (730 Days)")
                    }
                    className="w-full py-4 bg-hospital-teal text-white rounded-2xl font-black hover:bg-white hover:text-hospital-teal transition-all shadow-lg shadow-teal-900/40 uppercase tracking-widest text-xs"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Card Benefits Section */}
          <section className="py-24 px-6 bg-[#0b1c43] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute rotate-45 -top-24 -left-24 w-96 h-96 bg-white rounded-full"></div>
              <div className="absolute rotate-45 -bottom-24 -right-24 w-96 h-96 bg-white rounded-full"></div>
            </div>

            <div className="container mx-auto max-w-[1366px] relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-white mb-4 font-heading tracking-tight uppercase">
                  Card Benefits
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    title: "50% Discount on OPD for 1 year",
                    icon: "/images/wellness_packages/discount-icon.png",
                  },
                  {
                    title: "Priority Access in case of Trauma or Emergency",
                    icon: "/images/wellness_packages/emergency-case-icon.png",
                  },
                  {
                    title: "20% Discount in-house Pathology",
                    icon: "/images/wellness_packages/house-pathology-icon.png",
                  },
                  {
                    title: "20% Discount on in-house Radiological Test",
                    icon: "/images/wellness_packages/radiological-test-icon.png",
                  },
                  {
                    title: "10% Discount on in-house Medicine",
                    icon: "/images/wellness_packages/medicine-discount-icon.png",
                  },
                  {
                    title:
                      "Free Home Delivery of Medicine (on Min Order Value 799)",
                    icon: "/images/wellness_packages/free-delivery-medicine-icon.png",
                  },
                  {
                    title: "Free Video Consultation",
                    icon: "/images/wellness_packages/video-consultation-icon.png",
                  },
                  {
                    title:
                      "20% Discount on hospital charges in case of admission (IPD).",
                    icon: "/images/wellness_packages/admission-discount-icon.png",
                  },
                  {
                    title:
                      "Free Pickup Ambulance Services within 10km of radius in Varanasi city",
                    icon: "/images/wellness_packages/ambulance-services-icon.png",
                  },
                  {
                    title:
                      "Free Eye sight checkup twice in a year (once in 6 month)",
                    icon: "/images/wellness_packages/eye-checkup-icon.png",
                  },
                  {
                    title:
                      "Free Dental Checkup Twice in a year (once in 6 month)",
                    icon: "/images/wellness_packages/dental-checkup-icon.png",
                  },
                ].map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-md p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 hover:bg-white hover:text-[#0b1c43] transition-all duration-500 group flex flex-col items-center text-center"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                    <h4 className="text-sm md:text-lg font-black leading-tight group-hover:text-[#0b1c43] text-white transition-colors">
                      {benefit.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Dynamic Health Checkup Section */}
          <section className="py-24 px-6 bg-slate-50">
            <div className="container mx-auto max-w-[1366px]">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight">
                  Free Health Checkups{" "}
                  <span className="text-[#E85222]">Included</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                  Monitor your health regularly with these vital tests available
                  at no extra cost.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    test: "Random Blood Sugar",
                    icon: "/images/wellness_packages/sugar-test-icon.png",
                  },
                  {
                    test: "Total Cholesterol",
                    icon: "/images/wellness_packages/cholesterol-icon.png",
                  },
                  {
                    test: "ECG",
                    icon: "/images/wellness_packages/ecg-icon.png",
                  },
                  {
                    test: "Complete Blood Count",
                    icon: "/images/wellness_packages/blood-count-icon.png",
                  },
                  {
                    test: "Free Vaccination administration (Vaccine excluded)",
                    icon: "/images/wellness_packages/free-vaccination-icon.png",
                  },
                  {
                    test: "Growth Development Checkup of Kids (1 Month to 18 Years) and advise - once in a year.",
                    icon: "/images/wellness_packages/growth-checkup-icon.png",
                  },
                ].map((test, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 text-center border border-slate-100 group flex flex-col items-center justify-center"
                  >
                    <div className="relative w-24 h-24 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={test.icon}
                        alt={test.test}
                        fill
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-[#0b1c43] font-heading leading-snug">
                      {test.test}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Women's Health Theme Section (Imported from separate page) */}
          <section className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-[1366px] relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase">
                  Women's Health{" "}
                  <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">
                    Care
                  </span>
                </h2>
                <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
                  With the Health Fit Card, we ensure that every woman receives
                  the priority attention and medical support she deserves.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* For Pregnant Women */}
                <div className="group h-full">
                  <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(236,72,153,0.1)] border border-pink-50 hover:border-pink-300 transition-all duration-700 relative overflow-hidden h-full">
                    <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-pink-50 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center text-3xl md:text-5xl mb-8 md:mb-10 shadow-2xl shadow-pink-200 transform group-hover:rotate-6 transition-transform">
                        🤰
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#0b1c43] mb-6 md:mb-8 font-heading italic">
                        For Pregnant Women
                      </h3>
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex items-start gap-4 md:gap-6 bg-pink-50/30 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-pink-100/50">
                          <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-pink-500 text-white flex items-center justify-center flex-shrink-0 font-black shadow-lg text-sm md:text-base">
                            01
                          </span>
                          <p className="text-gray-700 font-bold text-base md:text-lg leading-relaxed">
                            Free first Antenatal Checkup for pregnant women
                            during nine month of pregnancy
                          </p>
                        </div>
                        <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-pink-100 shadow-inner">
                          <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                            <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 font-black text-sm md:text-base">
                              02
                            </span>
                            <h4 className="text-lg md:text-xl font-black text-[#0b1c43] leading-snug">
                              Free Blood test of pregnant women once during
                              pregnancy
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {[
                              "(a) Blood Group,",
                              "(b) TSH,",
                              "(c) Random Blood Sugar",
                            ].map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-3 text-gray-600 font-bold bg-slate-50 px-4 py-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 group-hover:border-pink-200 transition-colors text-sm md:text-base"
                              >
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></div>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* For Non-Pregnant Women */}
                <div className="group h-full">
                  <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(20,184,166,0.1)] border border-teal-50 hover:border-hospital-teal/30 transition-all duration-700 relative overflow-hidden h-full">
                    <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-teal-50 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-hospital-teal to-blue-500 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center text-3xl md:text-5xl mb-8 md:mb-10 shadow-2xl shadow-teal-100 transform group-hover:-rotate-6 transition-transform">
                        👩‍💼
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#0b1c43] mb-2 font-heading italic">
                        For Non-Pregnant Women
                      </h3>
                      <p className="text-hospital-teal text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-8 md:mb-10 opacity-80">
                        (Recommended for 35+ Years of Age)
                      </p>
                      <div className="space-y-3 md:space-y-4">
                        {[
                          { title: "Pap Smear once in a Year", icon: "🔬" },
                          { title: "Colposcopy once in year", icon: "🩺" },
                          { title: "Urine RM Analysis", icon: "🧪" },
                          { title: "Random Blood Sugar", icon: "🩸" },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 hover:bg-teal-50/50 hover:border-teal-100 transition-all group/item"
                          >
                            <div className="flex items-center gap-4 md:gap-5">
                              <span className="text-xl md:text-2xl">
                                {item.icon}
                              </span>
                              <span className="text-base md:text-lg font-bold text-gray-700">
                                {item.title}
                              </span>
                            </div>
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-hospital-teal text-white flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4"
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="py-24 px-4 sm:px-6">
            <div className="container mx-auto max-w-[1366px]">
              <div className="text-center mb-16 px-4">
                <h2 className="text-3xl md:text-4xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase">
                  Why Health Fit Card
                </h2>
                <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-medium">
                  Health Insurance Vs Health-fit Card
                </p>
              </div>

              <div className="w-full overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 custom-scrollbar">
                <div className="min-w-[500px] md:min-w-0 md:w-full rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden bg-white">
                  <table className="w-full table-fixed">
                    <thead className="bg-[#0b1c43] text-white">
                      <tr>
                        <th className="px-4 md:px-8 py-4 md:py-6 text-center text-[13px] md:text-xl font-black font-heading leading-tight w-1/2">
                          Health Insurance
                        </th>
                        <th className="px-4 md:px-8 py-4 md:py-6 text-center text-[13px] md:text-xl font-black font-heading bg-[#E85222] border-l border-white/10 w-1/2">
                          Health-fit Card
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        {
                          insurance: "Restriction on Existing Disease",
                          card: "No Restriction",
                          icon: "✔️",
                        },
                        {
                          insurance: "Limited Disease covers",
                          card: "All disease covers",
                          icon: "✔️",
                        },
                        {
                          insurance: "Pre medical Checkup to avail insurance",
                          card: "No Medical Checkup required",
                          icon: "✔️",
                        },
                        {
                          insurance: "Age Limit",
                          card: "No Age Limit",
                          icon: "✔️",
                        },
                        {
                          insurance: "Locking Period",
                          card: "No Locking Period",
                          icon: "✔️",
                        },
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50 transition-colors text-[12px] md:text-base text-center"
                        >
                          <td className="px-4 md:px-8 py-4 md:py-6 font-bold text-gray-700 leading-tight">
                            {row.insurance}
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-[#0b1c43] font-black bg-orange-50/30 border-l border-orange-100 leading-tight">
                            <div className="flex items-center justify-center gap-2">
                              {row.card}{" "}
                              <span className="text-green-500 text-base md:text-xl">
                                {row.icon}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-center text-gray-400 text-[10px] md:hidden mt-2">
                ← Swipe to see full comparison →
              </p>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="py-12 md:py-20 px-4 md:px-6 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-[1366px]">
              <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100 flex flex-col md:flex-row items-center gap-10 md:gap-12 shadow-sm">
                <div className="md:w-1/3 text-center md:text-left">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0b1c43] text-white rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-3xl md:text-4xl mb-6 mx-auto md:mx-0 shadow-xl shadow-blue-900/20 transform hover:scale-110 transition-transform">
                    💡
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-[#0b1c43] font-heading tracking-tight uppercase">
                    How to <span className="text-hospital-teal">Use?</span>
                  </h2>
                </div>
                <div className="md:w-2/3 space-y-6">
                  <div className="bg-white p-5 md:p-8 rounded-3xl shadow-inner border border-slate-100">
                    <p className="text-base md:text-lg text-gray-700 font-bold leading-relaxed mb-6">
                      In case of consultation, emergency or planned
                      hospitalization, just use your health ID card at the
                      reception of any of our branches. They will trace your
                      details with the unique Family health-fit card ID.
                    </p>
                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-orange-50/50 border border-orange-100 rounded-2xl">
                      <div className="text-orange-900 font-black text-xs md:text-sm uppercase tracking-wide leading-relaxed">
                        <span className="text-orange-600 block mb-1">
                          Important Note:
                        </span>
                        During OPD Consultation or IPD admissions, the health
                        card possession is to be informed before hand & prior to
                        the bill generation.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Terms & Conditions Section */}
          <section className="py-20 px-6 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto max-w-[1366px]">
              <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-xl border border-slate-100">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="md:w-1/3">
                    <h2 className="text-3xl font-black text-[#0b1c43] font-heading tracking-tight mb-4 uppercase">
                      Terms & <span className="text-[#E85222]">Conditions</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-[#E85222] rounded-full"></div>
                    <p className="mt-6 text-gray-500 font-medium">
                      Please review these terms carefully to ensure a seamless
                      experience with your Health Fit Card.
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        "Vaccine is not included.",
                        "Card must be presented before availing the services at billing counter.",
                        "Prior appointment is must to avail the services.",
                        "Double benefits will not be clubbed.",
                        "IPD discount available only for cash patient.",
                        "Benefits extended as per prevailing Schedule of charges (SOC).",
                      ].map((term, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-[#E85222]/30 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#E85222] text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-1">
                            ✓
                          </div>
                          <span className="text-gray-700 font-bold leading-relaxed">
                            {term}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Info Section */}
          <section className="py-12 px-6 bg-white border-t border-slate-100">
            <div className="container mx-auto max-w-[1366px]">
              <p className="text-gray-400 text-sm leading-relaxed text-center max-w-4xl mx-auto italic">
                Our Health Fit Card is not just limited to Popular Hospital, but
                also applicable to all Popular Group Hospital branches,
                including exclusive access to Niraamaya Diagnostics in Lanka,
                Varanasi. The best part? We offer 24/7 support and no charges
                for including a new member in the existing card (up to the card
                limit). Existing diseases do not restrict you from getting the
                Health Fit Card, and it is available for the whole family,
                including parents, in-laws, dependents below 25 years, widow,
                widower, divorced members, and their dependents. With Popular
                Hospital's Health Fit Card, you can prioritise your health and
                wellness without worrying about the expenses. Get yours today
                and take the first step towards a healthier and happier life!
              </p>
            </div>
          </section>

          {/* Small Form Modal */}
          {purchaseStep === "small-form" && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 w-full max-w-lg relative overflow-hidden border border-slate-100 scale-in duration-300 shadow-orange-900/10">
                <button
                  onClick={() => setPurchaseStep("none")}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-10">
                  <h2 className="text-3xl font-black text-[#0b1c43] mb-3 font-heading tracking-tight italic">
                    Getting Started
                  </h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                    Please provide basic details to proceed
                  </p>
                  <div className="w-16 h-1.5 bg-[#E85222] mx-auto mt-4 rounded-full"></div>
                </div>

                <form onSubmit={handleSmallFormSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-[#0b1c43] uppercase tracking-[0.2em] ml-2">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-hospital-teal/10 focus:border-hospital-teal transition-all font-bold text-slate-700"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-[#0b1c43] uppercase tracking-[0.2em] ml-2">
                      Mobile Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-7 py-5 bg-slate-50 border border-slate-200 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-hospital-teal/10 focus:border-hospital-teal transition-all font-bold text-slate-700"
                      value={userDetails.mobile}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          mobile: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-6 bg-[#E85222] text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-xs hover:bg-[#d1451a] shadow-2xl shadow-orange-900/30 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-3 group"
                  >
                    Proceed to Application{" "}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WellnessPage;
