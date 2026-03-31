"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Feedback submitted:", formData);
    alert("Thank you for your feedback!");
    setFormData({
      message: "",
      name: "",
      email: "",
      phone: "",
      department: "",
      agreeTerms: false,
    });
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-[#E85222] mb-3 block">
            We Value Your Opinion
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-4 font-heading">
            Patient Feedback
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your feedback helps us provide better care. Please share your
            experience with Popular Hospital.
          </p>
        </div>

        {/* Feedback Form Card */}
        <div className="bg-orange-50 rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
              Share Your Experience
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Your feedback is confidential and will be used to improve our
              services. Required fields are marked*
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Feedback*
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Please describe your experience..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#E85222] focus:ring-2 focus:ring-orange-100 focus:outline-none resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Patient/Visitor Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#E85222] focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#E85222] focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#E85222] focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all"
                  />
                </div>

                {/* Department Field */}
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Department Visited (Optional)
                  </label>
                  <input
                    id="department"
                    type="text"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="e.g. Cardiology, OPD, Emergency"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#E85222] focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreeTerms: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#E85222] focus:ring-2 focus:ring-[#E85222] accent-[#E85222]"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                  I consent to the storage of my feedback data.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white font-bold py-4 px-8 rounded-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#E85222" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span>Submit Feedback</span>
              </button>
            </form>
          </div>
        </div>

        {/* Helper Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-[#1e3a8a] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
