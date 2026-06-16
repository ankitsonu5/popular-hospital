"use client";

import Image from "next/image";
import { useState } from "react";
import { type Speciality } from "@/lib/api";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Republic of the)",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Korea",
  "Republic of Moldova",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Türkiye",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United Republic of Tanzania",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function InternationalPatients({
  specialities,
  formOnly = false,
}: {
  specialities: Speciality[];
  formOnly?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    country: "",
    department: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);
    try {
      const response = await fetch("/api-backend/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.contact, // Mapping 'contact' to 'phone'
          age: formData.age,
          country: formData.country,
          department: formData.department,
          isInternational: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit");
      }

      setStatusMsg({
        type: "success",
        text: "Thank you! Your inquiry has been sent. We will contact you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        contact: "",
        age: "",
        country: "",
        department: "",
      });
    } catch (error: any) {
      console.error("Inquiry error:", error);
      setStatusMsg({
        type: "error",
        text: error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatusMsg(null), 6000);
    }
  };

  return (
    <section
      className={`relative overflow-hidden ${formOnly ? "py-0 bg-transparent" : "py-12 sm:py-20 lg:py-24 xl:py-16 bg-[#F8FAFC]"}`}
    >
      {/* Mobile Only Background Image */}
      {!formOnly && (
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/images/international_patients.png"
            alt="International Patients Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0b1c43]/80 backdrop-blur-[2px]" />
        </div>
      )}

      <div
        className={`relative z-10 mx-auto w-full ${formOnly ? "max-w-3xl px-0" : "max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"}`}
      >
        <div
          className={
            formOnly ? "text-center mb-8" : "text-center mb-8 sm:mb-12 xl:mb-10"
          }
        >
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl xl:text-3xl font-black font-heading tracking-tight mb-3 sm:mb-4 ${formOnly ? "text-[#0b1c43]" : "text-white lg:text-[#0b1c43] drop-shadow-md lg:drop-shadow-none"}`}
          >
            {formOnly
              ? "Send Your Inquiry to Assist You"
              : "For International Patients"}
          </h2>
          {!formOnly && (
            <p className="text-sm sm:text-base xl:text-xs xl:sm:text-sm font-bold text-[#FF6B00] uppercase tracking-wider drop-shadow-md lg:drop-shadow-none">
              Send Your Inquiry to Assist You
            </p>
          )}
        </div>

        <div
          className={`flex flex-col items-center ${formOnly ? "justify-center" : "lg:flex-row gap-10 lg:gap-20 xl:gap-14"}`}
        >
          {/* Form Side */}
          <div
            className={`w-full shrink-0 ${formOnly ? "max-w-[520px]" : "lg:w-[480px] xl:w-[420px]"}`}
          >
            <div className="bg-[#333333] lg:bg-[#333333] p-1 shadow-2xl rounded-sm">
              <div className="bg-[#333333] px-6 py-8 sm:px-10 sm:py-12 xl:px-8 xl:py-10">
                <h3 className="text-2xl font-black text-white text-center mb-8 sm:mb-10 font-heading tracking-tight">
                  Book An Appointment
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white px-5 py-3.5 xl:py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border-none rounded-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white px-5 py-3.5 xl:py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border-none rounded-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="tel"
                      required
                      placeholder="Contact"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className="w-full bg-white px-5 py-3.5 xl:py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border-none rounded-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 15.5c-1.2 0-2.4-.2-3.5-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full bg-white px-5 py-3.5 xl:py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border-none rounded-none"
                    />
                  </div>

                  <div className="relative group">
                    <select
                      required
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full bg-white px-5 py-3.5 xl:py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border-none rounded-none appearance-none text-gray-500"
                    >
                      <option value="">-Select Country-</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative group">
                    <select
                      required
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full bg-white px-5 py-3.5 xl:py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 border-none rounded-none appearance-none text-gray-500"
                    >
                      <option value="">Department</option>
                      {specialities.map((spec) => (
                        <option key={spec._id} value={spec.slug}>
                          {spec.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {statusMsg && (
                    <div
                      className={`p-3 text-sm font-bold rounded mt-4 ${statusMsg.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}
                    >
                      {statusMsg.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#FF6B00] text-white font-bold py-4 xl:py-3.5 mt-6 xl:mt-4 hover:bg-[#e66000] transition-colors uppercase tracking-[0.2em] text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Desktop Only Side Image */}
          {!formOnly && (
            <div className="relative hidden lg:block flex-1 w-full max-w-[720px] xl:max-w-[660px] h-[600px] xl:h-[520px] overflow-hidden rounded-2xl shadow-xl mx-auto">
              <Image
                src="/images/international_patients.png"
                alt="International Patient Inquiry"
                fill
                sizes="(max-width: 1280px) 50vw, 660px"
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
