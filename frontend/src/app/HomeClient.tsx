"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import {
  fetchBranches,
  fetchNews,
  fetchEvents,
  getImageUrl,
  getMediaUrl,
  fetchSpecialities,
  type Branch,
  type NewsItem,
  type EventItem,
  type Speciality,
  type HeroBanner,
  type PatientStory,
} from "@/lib/api";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicTestimonials = dynamic(
  () => import("@/components/home/Testimonials"),
  {
    ssr: false, // Client side interactivity only needed
    loading: () => (
      <div className="h-[600px] w-full bg-gray-50 animate-pulse rounded-xl" />
    ),
  },
);

const DynamicLocationSlider = dynamic(
  () => import("@/components/home/LocationSlider"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] w-full bg-[#f5f5f7] animate-pulse" />
    ),
  },
);

const DynamicEmergencyServices = dynamic(
  () => import("@/components/home/EmergencyServices"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full bg-slate-50 animate-pulse" />
    ),
  },
);

const DynamicInternationalPatients = dynamic(
  () => import("@/components/home/InternationalPatients"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full bg-[#f8fafc] animate-pulse" />
    ),
  },
);

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

const CENTRES_OF_EXCELLENCE = [
  {
    title: "Cardiology",
    icon: "/images/pl_icons/cardiology_icon.webp",
    href: "/departments/cardiology",
    cardClass: "from-[#f9c4c8] to-[#f3a9ae]",
  },
  {
    title: "Orthopedics",
    icon: "/images/pl_icons/orthopedics_icon.webp",
    href: "/departments/orthopedics",
    cardClass: "from-[#ffefc8] to-[#ffdb82]",
  },
  {
    title: "Oncology",
    icon: "/images/pl_icons/oncology_icon.webp",
    href: "/departments/oncology",
    cardClass: "from-[#c9f3e5] to-[#5fcf8e]",
  },
  {
    title: "Neurology",
    icon: "/images/pl_icons/nuerosurgery_icon.webp",
    href: "/departments/neurosurgery",
    cardClass: "from-[#e4c4f5] to-[#c79bea]",
  },
  {
    title: "Laparoscopic Surgery",
    icon: "/images/pl_icons/laparoscopy_icon.webp",
    href: "/departments/general-surgery",
    cardClass: "from-[#bdeefa] to-[#62cee7]",
  },
  {
    title: "IVF & Fertility",
    icon: "/images/pl_icons/obstetrics_icon.webp",
    href: "/departments/ivf-fertility",
    cardClass: "from-[#d7e8fa] to-[#c6d9ef]",
  },
];

interface HomeClientProps {
  latestNews: NewsItem[];
  latestEvents: EventItem[];
  branches: Branch[];
  specialities: Speciality[];
  heroBanners: HeroBanner[];
  patientStories: PatientStory[];
}

export default function HomeClient({
  latestNews,
  latestEvents,
  branches,
  specialities,
  heroBanners,
  patientStories,
}: HomeClientProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringAwards, setIsHoveringAwards] = useState(false);
  const [isInternationalModalOpen, setIsInternationalModalOpen] =
    useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timing: "",
    department: "",
    location: "",
    message: "",
    agreeTerms: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [experienceCount, setExperienceCount] = useState(0);
  const [specialistsCount, setSpecialistsCount] = useState(0);
  const [hasStartedWhyCounter, setHasStartedWhyCounter] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const whyPopularRef = useRef<HTMLElement | null>(null);
  const whyCounterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = whyCounterRef.current || whyPopularRef.current;
    if (!node || hasStartedWhyCounter) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedWhyCounter(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasStartedWhyCounter]);

  useEffect(() => {
    if (!hasStartedWhyCounter) return;

    const durationMs = 1600;
    let animationFrame = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setExperienceCount(Math.round(32 * eased));
      setSpecialistsCount(Math.round(50 * eased));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        setExperienceCount(32);
        setSpecialistsCount(50);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hasStartedWhyCounter]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = heroBanners
    .filter((banner) => banner.desktopMediaUrl)
    .map((banner) => ({
      id: banner._id,
      type: banner.type,
      src:
        banner.type === "video"
          ? getMediaUrl(banner.desktopMediaUrl)
          : getImageUrl(banner.desktopMediaUrl),
      mobileSrc:
        banner.type === "video"
          ? getMediaUrl(banner.mobileMediaUrl || banner.desktopMediaUrl)
          : getImageUrl(banner.mobileMediaUrl || banner.desktopMediaUrl),
    }));
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (currentSlide >= slides.length && slides.length > 0) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // No video logic needed

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedVideo]);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-white flex-shrink-0 mt-[64px] sm:mt-[80px] md:mt-0 h-[480px] sm:h-[calc(100dvh-80px)] md:h-[100dvh] min-h-[480px] sm:min-h-[calc(100dvh-80px)] md:min-h-[100dvh]">
        {/* Slider Background */}
        <div className="absolute inset-0 z-0 bg-white">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <div className="relative w-full h-full">
                {slide.type === "video" ? (
                  <video
                    src={isMobile ? slide.mobileSrc || slide.src : slide.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover object-center w-full h-full"
                    style={{ pointerEvents: "none" }}
                  />
                ) : (
                  <Image
                    src={isMobile ? slide.mobileSrc || slide.src : slide.src}
                    alt={`Hospital Slide ${index + 1}`}
                    fill
                    className="object-cover object-top transition-transform duration-[10000ms]"
                    style={{ transform: "scale(1)" }}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    sizes="100vw"
                    unoptimized
                  />
                )}
                {/* Very subtle gradient for text shadow if needed */}
                <div className="absolute inset-0 bg-black/10 z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 flex justify-between px-4 sm:px-20 lg:px-24 pointer-events-none">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#E85222] transition-all pointer-events-auto transform hover:scale-110 active:scale-95 group shadow-2xl"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-10 sm:h-10 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#E85222] text-white flex items-center justify-center hover:bg-[#d1451a] shadow-xl transition-all pointer-events-auto transform hover:scale-110 active:scale-95 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-10 sm:h-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        <div className="absolute inset-x-0 -bottom-px z-10 h-24 bg-gradient-to-t from-black/70 via-black/35 to-black/0 blur-sm sm:h-28 lg:h-36 xl:h-40 2xl:h-48 pointer-events-none" />

        {/* Main Slogan Overlay on Video */}
        <div className="absolute inset-x-0 bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-14 xl:bottom-16 min-[1366px]:bottom-[72px] min-[1440px]:bottom-20 2xl:bottom-[88px] z-20 text-center px-4 pointer-events-none">
          <h2
            className="relative z-10 text-[18px] min-[390px]:text-xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] min-[1440px]:text-[56px] 2xl:text-[64px] font-bold font-hindi-poppins tracking-normal text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] px-2 leading-[1.08]"
          >
            आपके हर श्वांस के रक्षक
          </h2>
        </div>
      </section>

      {/* Standalone Notification Ticker */}
      <section className="relative w-full bg-[#0b1c43] text-white py-3 overflow-hidden border-b border-[#1e3a8a]/30 group cursor-pointer transition-colors hover:bg-[#0e2455] z-20 updates-ticker">
        <Link
          href="/updates"
          className="absolute inset-0 z-40"
          aria-label="View all updates"
        ></Link>
        <div className="absolute left-0 top-0 bottom-0 bg-[#0b1c43] z-10 px-4 flex items-center shadow-[4px_0_24px_rgba(11,28,67,1)] group-hover:bg-[#0e2455] transition-colors">
          <div className="flex items-center gap-2 text-[#E85222] font-bold tracking-widest text-xs uppercase font-heading">
            <span className="w-2 h-2 rounded-full bg-[#E85222] animate-pulse"></span>
            Updates
          </div>
        </div>
        <div className="flex whitespace-nowrap animate-scroll-left group-hover:[animation-play-state:paused] pl-32">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 mx-4 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              <span className="flex items-center gap-3 text-sm font-medium tracking-wide text-gray-200 group-hover:text-white">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E85222] text-white uppercase tracking-wider">
                  New
                </span>
                OPD timings for Cardiology have been updated to 9 AM - 5 PM.
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-3 text-sm font-medium tracking-wide text-gray-200 group-hover:text-white">
                Free Heart Health Checkup Camp scheduled for 15th March 2026.
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-3 text-sm font-medium tracking-wide text-gray-200 group-hover:text-white">
                Emergency Trauma Center is now fully operational 24/7.
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            </div>
          ))}
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="jakarta-font-scope relative z-30 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#eef6fb] py-12 sm:py-16">
        <div className="absolute left-0 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#E85222]/10 blur-3xl" />
        <div className="absolute right-12 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#1e3a8a]/10 blur-3xl" />
        <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-6xl xl:max-w-[1240px] 2xl:max-w-[1600px]">
          <div className="grid grid-cols-2 gap-4 md:hidden">
            <SimpleCard href="/our-locations" title="Our Branches" isFirst={true} variant="blue" />
            <SimpleCard href="/book" title="Book an Appointment" variant="green" />
            <SimpleCard href="/doctors" title="Find Your Doctor" variant="blue" />
            <SimpleCard href="/patient-reports" title="Patient Report" isLast={true} variant="green" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 px-2 md:hidden">
            <TrustBadge value="32+" label="Years of Legacy" tone="orange" />
            <TrustBadge value="100000+" label="Surgeries" tone="blue" />
            <TrustBadge value="450+" label="Beds" tone="orange" />
          </div>

          <div className="hidden md:grid md:grid-cols-[1.2fr_0.9fr] md:items-stretch md:gap-8 lg:gap-10">
            <div className="grid grid-cols-2 gap-4">
              <SimpleCard
                href="/book"
                title="Book an Appointment"
                description="With country's leading experts"
                variant="green"
              />
              <SimpleCard
                href="/our-locations"
                title="Hospitals"
                description="Health needs under one roof"
                variant="blue"
              />
              <SimpleCard
                href="/departments"
                title="Specialities"
                description="Our expertise in Healthcare"
                variant="purple"
              />
              <SimpleCard
                href="/doctors"
                title="Doctors"
                description="Top experts for your health"
                variant="orange"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 backdrop-blur">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#E85222]/12 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 left-10 h-44 w-44 rounded-full bg-[#1e3a8a]/10 blur-2xl" />
              <div className="relative mb-5">
                <p className="font-jakarta text-xs font-extrabold uppercase tracking-[0.18em] text-[#E85222]">
                  Popular Hospital
                </p>
                <h3 className="mt-2 font-jakarta text-2xl font-black leading-tight text-[#1e3a8a]">
                  Trusted care, proven outcomes
                </h3>
              </div>
              <div className="relative grid w-full grid-cols-3 gap-3">
                <TrustBadge value="32+" label="Years of Legacy" tone="orange" />
                <TrustBadge value="100000+" label="Surgeries" tone="blue" />
                <TrustBadge value="450+" label="Beds" tone="orange" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="relative py-16 sm:py-24 xl:py-16 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] overflow-hidden"
        aria-labelledby="about-us"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-hospital-teal/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E85222]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="relative mx-auto w-full max-w-[1280px] min-[1920px]:max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl font-black font-jakarta leading-tight tracking-tight text-[#1e3a8a] mb-6 xl:mb-4 drop-shadow-sm">
                  About{" "}
                  <span className="text-[#E85222]">
                    Popular Hospital
                  </span>
                </h2>

                <p className="text-gray-600 text-[17px] sm:text-[19px] leading-relaxed font-medium font-jakarta">
                  <span className="text-[#0b1c43] font-bold">
                    POPULAR HOSPITAL
                  </span>{" "}
                  (a Unit of POPULAR MEDICARE LTD), one of Varanasi's best Multi
                  Super Speciality Hospital that redefines standards of
                  excellence in healthcare delivery by bringing together the
                  best of infrastructure, technology, training, education and
                  medical intelligentsia.
                </p>
              </div>

              {/* Action Area */}
              {/* Action Area */}
              {/* Action Area */}
              <div className="flex flex-row items-center gap-3 sm:gap-6 pt-4 w-full justify-start">
                <Link
                  href="/about"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#E85222] to-[#d1451a] text-white rounded-full font-bold text-[14px] sm:text-[17px] overflow-hidden transition-all shadow-[0_8px_30px_rgb(232,82,34,0.3)] hover:shadow-[0_8px_30px_rgb(232,82,34,0.5)] hover:scale-105 shrink-0"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    Discover More
                    <span className="hidden sm:inline"> About Us</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#E85222] transition-colors shadow-sm shrink-0">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </span>
                </Link>

                {/* Contact Info (Circular Button on Mobile, Full Box on Desktop) */}
                <a
                  href="tel:+917800001895"
                  className="hidden sm:flex items-center justify-center sm:justify-start gap-4 bg-white sm:px-6 w-12 h-12 sm:w-auto sm:h-auto sm:py-3 rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-shadow shrink-0 group"
                >
                  <div className="w-full h-full sm:w-10 sm:h-10 rounded-full sm:bg-hospital-teal/10 flex items-center justify-center text-hospital-teal group-hover:bg-hospital-teal group-hover:text-white sm:group-hover:bg-hospital-teal/10 sm:group-hover:text-hospital-teal transition-colors shrink-0">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="hidden sm:flex flex-col justify-center items-start min-w-0">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">
                      24/7 Helpline
                    </p>
                    <div className="flex items-center justify-start gap-2 w-full">
                      <span className="text-[14px] lg:text-[15px] xl:text-[16px] font-black text-[#0b1c43] tracking-tight">
                        +91-7800001895
                      </span>
                      <span className="text-gray-300 font-bold text-[14px] shrink-0">
                        /
                      </span>
                      <span className="text-[14px] lg:text-[15px] xl:text-[16px] font-black text-[#0b1c43] tracking-tight shrink-0">
                        96
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side - Image with Floating Elements */}
            <div className="relative mt-8 lg:mt-0 lg:ml-12">
              <div className="relative mx-auto max-w-[270px] sm:max-w-[520px] lg:max-w-[500px] xl:max-w-[460px]">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-[#1e3a8a]/14 via-hospital-teal/14 to-[#E85222]/16 blur-2xl opacity-60"></div>
                <div className="absolute -right-2 -top-3 z-20 rounded-xl bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.1)] ring-1 ring-slate-100 sm:-right-4 sm:-top-4 sm:rounded-2xl sm:px-5 sm:py-4">
                  <p className="font-jakarta text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#E85222] sm:text-[11px]">
                    Since 1996
                  </p>
                  <p className="mt-0.5 font-jakarta text-[11px] font-black leading-tight text-[#1e3a8a] sm:mt-1 sm:text-lg">
                    Trusted Healthcare
                  </p>
                </div>
                <div className="absolute -bottom-3 left-3 z-20 flex items-center gap-2 rounded-xl bg-[#1e3a8a] px-3 py-2 text-white shadow-[0_12px_28px_rgba(30,58,138,0.18)] sm:-bottom-5 sm:left-6 sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-[#FFAB73] sm:h-10 sm:w-10 sm:rounded-xl">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 12l2 2 4-4m5.6-4A12 12 0 0112 3 12 12 0 013.4 6 12 12 0 003 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-jakarta text-xs font-black leading-none sm:text-lg">
                      24/7 Care
                    </p>
                    <p className="mt-0.5 font-jakarta text-[9px] font-semibold text-white/75 sm:mt-1 sm:text-xs">
                      Emergency support
                    </p>
                  </div>
                </div>

                <div className="relative w-full overflow-hidden rounded-2xl border-[6px] border-white bg-gray-100 shadow-[0_12px_28px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70 sm:rounded-[2.5rem] sm:border-[10px] sm:shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-[4/3] w-full lg:aspect-square">
                    <Image
                      src="/about-section-image.png"
                      alt="Popular Hospital - Expert Care"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b1c43]/30 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                  </div>
                </div>
                <div className="absolute -left-3 top-10 hidden h-24 w-2 rounded-full bg-[#E85222] shadow-[0_10px_24px_rgba(232,82,34,0.32)] lg:block"></div>
                <div className="absolute -right-3 bottom-12 hidden h-20 w-2 rounded-full bg-hospital-teal shadow-[0_10px_24px_rgba(13,148,136,0.26)] lg:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Popular Hospital Section */}
      <section
        ref={whyPopularRef}
        className="relative py-24 bg-white overflow-hidden"
        aria-labelledby="why-popular"
      >
        {/* Decorative Grid Lines Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0b1c43 1px, transparent 1px), linear-gradient(to bottom, #0b1c43 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="relative mx-auto w-full max-w-[1280px] min-[1920px]:max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-4xl sm:text-5xl font-black text-[#1e3a8a] font-jakarta leading-[1.15] tracking-tight">
                Why <br className="hidden md:block" />
                <span className="text-[#E85222]">
                  Popular Hospital
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10">
            {/* Left Column - Main Promo Image */}
            <div className="lg:col-span-4 relative h-full min-h-[500px] lg:min-h-[auto] rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[#0b1c43]"></div>
              {/* Main Image */}
              <Image
                src="/images/departments-images/general-medicine.jpeg"
                alt="Expert Medical Care"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 mix-blend-luminosity"
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43] via-[#0b1c43]/60 to-transparent"></div>

              <div className="absolute inset-0 p-4 sm:p-5 md:p-8 flex flex-col justify-end">
                {/* Content Inside Image */}
                <div className="bg-white/10 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 border border-white/20 transform transition-transform duration-500 group-hover:-translate-y-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                  <p className="flex items-center gap-2 text-hospital-teal font-bold tracking-widest text-[10px] sm:text-xs uppercase mb-3">
                    <span className="w-2 h-2 rounded-full bg-hospital-teal animate-ping"></span>
                    24/7 Emergency Support
                  </p>
                  <div className="text-white font-black mb-5 sm:mb-6 flex items-center gap-3 sm:gap-4 drop-shadow-lg flex-nowrap whitespace-nowrap">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#d1451a] flex items-center justify-center shrink-0 shadow-lg">
                      <svg
                        className="w-5 h-5 sm:w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col justify-center gap-0.5">
                      <a
                        href="tel:+917800001895"
                        className="text-[18px] min-[370px]:text-[20px] sm:text-[22px] tracking-tight hover:text-[#E85222] transition-colors leading-none"
                      >
                        +91-7800001895
                      </a>
                      <a
                        href="tel:+917800001896"
                        className="text-[18px] min-[370px]:text-[20px] sm:text-[22px] tracking-tight hover:text-[#E85222] transition-colors leading-none"
                      >
                        +91-7800001896
                      </a>
                    </div>
                  </div>
                  <div
                    ref={whyCounterRef}
                    className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6 mt-1 sm:mt-2 relative"
                  >
                    <div>
                      <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                        {experienceCount}
                        <span className="text-[#E85222]">+</span>
                      </p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-wider mt-1 opacity-80">
                        Years Exp
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                        {specialistsCount}
                        <span className="text-hospital-teal">+</span>
                      </p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-wider mt-1 opacity-80">
                        Specialists
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {[
                {
                  title: "Exceptional healthcare services",
                  fullDesc:
                    "We provide top-notch healthcare services, backed by highly experienced doctors and cutting-edge medical technology.",
                  bgImage: "/images/banners/exceptional-healthcare.jpg",
                  icon: (
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Multi Super specialty hospital",
                  fullDesc:
                    "Our hospital offers a comprehensive range of specialties, including cardiology, neurology, gastroenterology, orthopedics, and more, ensuring that we meet the diverse healthcare needs of our patients.",
                  bgImage: "/images/banners/multi-specialty-hospital.jpg",
                  icon: (
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Compassionate Care",
                  fullDesc:
                    "We believe that healthcare is not just about treating illnesses, but also about providing compassionate care to our patients. Our staff is trained to provide personalized care, making our patients feel comfortable and cared for during their hospital stay.",
                  bgImage: "/images/banners/compassionate-care.jpg",
                  icon: (
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "State-of-the-art facilities",
                  fullDesc:
                    "Our hospital is equipped with the latest diagnostic tools and equipment, ensuring accurate and timely diagnosis of illnesses. We also have a fully equipped operation theatre, intensive care unit, and emergency department, providing 24/7 medical care to our patients.",
                  bgImage: "/images/banners/art.jpg",
                  icon: (
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Patient-Centric",
                  fullDesc:
                    "We prioritize our patients' needs and comfort, ensuring that they receive the best possible care and treatment throughout their hospital stay.",
                  bgImage: "/images/banners/patient-centric-approach.jpg",
                  icon: (
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Trusted healthcare provider",
                  fullDesc:
                    "With over 30 years of experience, we have earned a reputation as a trusted healthcare provider in the community. We are committed to maintaining the highest standards of healthcare and strive to exceed our patients' expectations.",
                  bgImage: "/images/banners/trusted-healthcare-provider.jpg",
                  icon: (
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-6 sm:p-0 rounded-2xl border-2 border-hospital-teal/20 sm:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 pointer-events-auto cursor-default overflow-hidden h-auto sm:h-[210px] md:h-[230px] transform-gpu"
                  style={{
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    isolation: "isolate",
                    maskImage: "radial-gradient(white, black)",
                    WebkitMaskImage: "radial-gradient(white, black)",
                  }}
                >
                  {/* Background Image (Desktop Only - Full Preview) */}
                  <div className="absolute inset-0 hidden sm:block pointer-events-none">
                    <Image
                      src={feature.bgImage}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 0vw, 400px"
                    />
                  </div>

                  {/* Desktop Bottom Overlay (Icon + Title) */}
                  <div className="hidden sm:flex absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent items-center gap-4 z-10 transition-all duration-500 sm:group-hover:opacity-0 sm:group-hover:translate-y-10">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white border border-white/20">
                      {feature.icon}
                    </div>
                    <h3 className="text-[17px] font-bold text-white font-jakarta leading-tight drop-shadow-lg">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Mobile Content + Desktop Hover Paragraph */}
                  <div className="relative z-10 flex flex-col h-full items-start sm:p-8">
                    {/* Mobile only: Icon and Heading */}
                    <div className="sm:hidden w-full flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 text-hospital-teal mb-4 border border-hospital-teal/10">
                        {feature.icon}
                      </div>
                      <h3 className="text-[18px] font-bold text-[#0b1c43] font-jakarta">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Mobile Paragraph */}
                    <div className="sm:hidden mt-3">
                      <p className="text-[#0b1c43] font-semibold text-[14px] leading-relaxed font-jakarta">
                        {feature.fullDesc}
                      </p>
                    </div>

                    {/* Desktop Hover Description (Covers entire card) */}
                    <div className="hidden sm:flex absolute inset-0 rounded-[inherit] p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 h-full w-full items-center bg-white z-20">
                      <p className="text-[#0b1c43] font-bold text-[15px] leading-relaxed font-jakarta">
                        {feature.fullDesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Centres of Excellence Section */}
      <section
        className="bg-white py-14 sm:py-16"
        aria-labelledby="centres-of-excellence"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <h2
              id="centres-of-excellence"
              className="text-4xl font-extrabold leading-tight tracking-normal text-[#1e3a8a] sm:text-5xl lg:text-[52px] font-jakarta"
            >
              Centres Of{" "}
              <span className="text-[#E85222]">Excellence</span>
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-[15px] font-semibold leading-relaxed text-[#3d4d96] sm:text-base">
              Combining the best specialists and equipment to provide you
              nothing short of the best in healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {CENTRES_OF_EXCELLENCE.map((centre) => (
              <Link
                key={centre.title}
                href={centre.href}
                className={`group flex min-h-[86px] items-center gap-3 bg-gradient-to-r ${centre.cardClass} px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-[420px]:min-h-[98px] sm:min-h-[110px] sm:gap-5 sm:px-6 sm:py-6`}
              >
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                  <Image
                    src={centre.icon}
                    alt=""
                    width={42}
                    height={42}
                    className="h-9 w-9 object-contain sm:h-11 sm:w-11"
                    sizes="44px"
                  />
                </span>
                <span className="min-w-0 text-[15px] font-extrabold leading-snug text-[#050814] sm:text-lg sm:leading-tight font-jakarta">
                  {centre.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section
        className="py-20 bg-[#f5f9ff]"
        aria-labelledby="our-services"
      >
        <div className="mx-auto w-full max-w-[1280px] min-[1920px]:max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-12 xl:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#666] mb-3 block font-jakarta">
              Excellence in Care
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-black text-[#1e3a8a] font-jakarta tracking-tight">
              Our Departments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Cardiology",
                desc: "Comprehensive heart care including diagnostics and surgery.",
                image: "/images/departments-images/cardiology.jpeg",
                href: "/departments/cardiology",
              },
              {
                title: "Neuro Surgery",
                desc: "Advanced surgical treatments for brain and spine disorders.",
                image: "/images/departments-images/neuro-surgery.jpeg",
                href: "/departments/neurosurgery",
              },
              {
                title: "Gastroenterology",
                desc: "Expert care for digestive system and liver heath.",
                image: "/images/departments-images/gastroenterology.jpeg",
                href: "/departments/gastroenterology",
              },
              {
                title: "Nephrology",
                desc: "Specialized kidney care and dialysis services.",
                image: "/images/departments-images/AdobeStock_1010757604.jpeg",
                href: "/departments/nephrology",
              },
              {
                title: "Oncology",
                desc: "Comprehensive cancer diagnosis and treatment.",
                image: "/images/departments-images/oncology.jpeg",
                href: "/departments/oncology",
              },
              {
                title: "Urology",
                desc: "Treatment for urinary tract and male reproductive system.",
                image: "/images/departments-images/urology.jpeg",
                href: "/departments/urology",
              },
              {
                title: "Burns & Plastic Surgery",
                desc: "Reconstructive and cosmetic surgery services.",
                image: "/images/departments-images/AdobeStock_222372294.jpeg",
                href: "/departments/burns-plastic-surgery",
              },
              {
                title: "Laparoscopic & General Surgery",
                desc: "Department of Laparoscopic & General Surgery",
                image: "/images/departments-images/laparoscopic.jpeg",
                href: "/departments/general-surgery",
              },
              {
                title: "Obstetrics and Gynecology",
                desc: "Care for pregnancy, childbirth, and women's health.",
                image: "/images/departments-images/gynecology.jpeg",
                href: "/departments/gynaecology",
              },
              {
                title: "Paediatrics",
                desc: "Medical care for infants, children, and adolescents.",
                image: "/images/departments-images/paediatrics.jpeg",
                href: "/departments/pediatrics",
              },
              {
                title: "Orthopaedic",
                desc: "Treatment for bones, joints, ligaments, and nerves.",
                image: "/images/departments-images/orthopaedic.jpeg",
                href: "/departments/orthopedics",
              },
              {
                title: "General Medicine",
                desc: "Primary care for overall health and wellbeing.",
                image: "/images/departments-images/general-medicine.jpeg",
                href: "/departments/general-medicine",
              },
              {
                title: "ENT",
                desc: "Ear, Nose, and Throat diagnostics and surgery.",
                image: "/images/departments-images/ent.jpeg",
                href: "/departments/ent",
              },
              {
                title: "Ophthalmology",
                desc: "Advanced eye care and vision surgery.",
                image: "/images/departments-images/ophthalmology.jpeg",
                href: "/departments/ophthalmology",
              },
              {
                title: "Dental Care",
                desc: "Comprehensive dentistry and oral surgeries.",
                image: "/images/departments-images/dental-care.jpeg",
                href: "/departments/dental",
              },
              {
                title: "Pulmonology",
                desc: "Respiratory and lung health specialists.",
                image: "/images/departments-images/pulmonology.jpeg",
                href: "/departments/respiratory",
              },
            ]
              .slice(0, 8)
              .map((service, idx) => (
                <div
                  key={service.title}
                  className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden transform-gpu"
                  style={{
                    transform: "translateZ(0)",
                    WebkitTransform: "translateZ(0)",
                    isolation: "isolate",
                    maskImage: "radial-gradient(white, black)",
                    WebkitMaskImage: "radial-gradient(white, black)",
                  }}
                >
                  {/* Image Section */}
                  <div className="w-full h-48 xl:h-40 relative flex-shrink-0 bg-gray-100">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 xl:p-5 flex flex-col flex-grow">
                    <div className="mb-4 xl:mb-3">
                      <span className="text-[13px] xl:text-[12px] font-extrabold uppercase tracking-wider mb-2 block text-[#284a91] font-jakarta">
                        Department of
                      </span>
                      <h3 className="text-2xl xl:text-xl font-bold text-[#1d1d1f] mb-3 xl:mb-2 font-jakarta leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-base xl:text-sm leading-relaxed font-medium line-clamp-3 font-jakarta">
                        {service.desc}
                      </p>
                    </div>

                    <div className="mt-auto flex justify-end">
                      <Link
                        href={service.href}
                        className="w-10 h-10 rounded-full bg-[#E85222] flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all shadow-lg group-hover:bg-[#d14011]"
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
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/departments"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#284a91]/10 text-[#284a91] hover:bg-[#284a91] hover:text-white rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span>View all departments</span>
              <div className="w-8 h-8 rounded-full bg-[#284a91]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Hospital Model of Care Section */}
      <section
        className="py-16 sm:py-20 bg-[#fcfcfc] relative overflow-hidden"
        aria-labelledby="model-of-care"
      >
        {/* Decorative Grid Lines Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0b1c43 1px, transparent 1px), linear-gradient(to bottom, #0b1c43 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2
            id="model-of-care"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-12 lg:mb-20 text-center font-jakarta"
          >
            Popular Hospital Model of Care
          </h2>

          {/* Mobile Layout (< lg) */}
          <div className="lg:hidden flex flex-col items-center gap-12">
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border-[8px] border-white shadow-xl overflow-hidden shrink-0">
              <Image
                src="/images/model-of-care-center.jpg"
                alt="Model of Care"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, 320px"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 w-full max-w-2xl">
              {[
                {
                  title: "Exceptional clinical talent",
                  href: "/care-model/clinical-talent",
                },
                {
                  title: "World-class infrastructure",
                  href: "/care-model/infrastructure",
                },
                {
                  title: "Latest high-end technology",
                  href: "/care-model/technology",
                },
                {
                  title: "Caring systems and processes",
                  href: "/care-model/systems-processes",
                },
                {
                  title: "Trust-based compassionate care",
                  href: "/care-model/compassionate-care",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3 font-heading">
                    {item.title}
                  </h3>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-hospital-orange font-medium hover:text-orange-600 transition-colors"
                  >
                    Know More
                    <span className="ml-2 w-6 h-6 bg-hospital-orange text-white rounded-full flex items-center justify-center text-xs">
                      ›
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout (>= lg) */}
          <div className="hidden lg:block relative w-full h-[600px] max-w-[900px] mx-auto">
            {/* Center Image Container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-[320px] h-[320px] xl:w-[340px] xl:h-[340px] rounded-full overflow-hidden border-[10px] border-white shadow-2xl">
                <Image
                  src="/images/model-of-care-center.jpg"
                  alt="Surgery Team"
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </div>
            </div>

            {/* Dashed Orbit Ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] xl:w-[520px] xl:h-[520px] rounded-full border border-dashed border-gray-400 z-0"></div>

            {/* Node 1: Top (Exceptional clinical talent) */}
            <div className="absolute left-1/2 top-2 transform -translate-x-1/2 flex flex-col items-center z-20 w-60 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">
                Exceptional
                <br />
                clinical talent
              </h3>
              <Link
                href="/care-model/clinical-talent"
                className="text-gray-500 hover:text-hospital-orange font-medium flex items-center gap-2 transition-colors"
              >
                Know More{" "}
                <span className="w-5 h-5 bg-hospital-orange text-white rounded-full flex items-center justify-center text-sm pb-0.5">
                  ›
                </span>
              </Link>
              {/* Dot on ring */}
              <div className="w-5 h-5 bg-hospital-orange rounded-full border-4 border-white shadow-sm mt-4 relative top-[26px]"></div>
            </div>

            {/* Node 2: Top Right (World-class infrastructure) */}
            <div className="absolute top-[20%] right-[4%] flex flex-col items-start z-20 w-60 text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">
                World-class
                <br />
                infrastructure
              </h3>
              <Link
                href="/care-model/infrastructure"
                className="text-gray-500 hover:text-hospital-orange font-medium flex items-center gap-2 transition-colors"
              >
                Know More{" "}
                <span className="w-5 h-5 bg-hospital-orange text-white rounded-full flex items-center justify-center text-sm pb-0.5">
                  ›
                </span>
              </Link>
              {/* Dot */}
              <div className="absolute -left-12 top-10 w-5 h-5 bg-white border-2 border-gray-300 rounded-full hover:bg-hospital-orange hover:border-hospital-orange transition-colors"></div>
            </div>

            {/* Node 3: Bottom Right (Latest high-end technology) */}
            <div className="absolute bottom-[20%] right-[4%] flex flex-col items-start z-20 w-60 text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">
                Latest high-end
                <br />
                technology
              </h3>
              <Link
                href="/care-model/technology"
                className="text-gray-500 hover:text-hospital-orange font-medium flex items-center gap-2 transition-colors"
              >
                Know More{" "}
                <span className="w-5 h-5 bg-hospital-orange text-white rounded-full flex items-center justify-center text-sm pb-0.5">
                  ›
                </span>
              </Link>
              {/* Dot */}
              <div className="absolute -left-12 top-0 w-5 h-5 bg-white border-2 border-gray-300 rounded-full hover:bg-hospital-orange hover:border-hospital-orange transition-colors"></div>
            </div>

            {/* Node 4: Bottom Left (Caring systems and processes) */}
            <div className="absolute bottom-[20%] left-[4%] flex flex-col items-end z-20 w-60 text-right">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">
                Caring systems
                <br />
                and processes
              </h3>
              <Link
                href="/care-model/systems-processes"
                className="text-gray-500 hover:text-hospital-orange font-medium flex items-center justify-end gap-2 transition-colors"
              >
                Know More{" "}
                <span className="w-5 h-5 bg-hospital-orange text-white rounded-full flex items-center justify-center text-sm pb-0.5">
                  ›
                </span>
              </Link>
              {/* Dot */}
              <div className="absolute -right-12 top-0 w-5 h-5 bg-white border-2 border-gray-300 rounded-full hover:bg-hospital-orange hover:border-hospital-orange transition-colors"></div>
            </div>

            {/* Node 5: Top Left (Trust-based compassionate care) */}
            <div className="absolute top-[20%] left-[4%] flex flex-col items-end z-20 w-60 text-right">
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">
                Trust-based
                <br />
                compassionate care
              </h3>
              <Link
                href="/care-model/compassionate-care"
                className="text-gray-500 hover:text-hospital-orange font-medium flex items-center justify-end gap-2 transition-colors"
              >
                Know More{" "}
                <span className="w-5 h-5 bg-hospital-orange text-white rounded-full flex items-center justify-center text-sm pb-0.5">
                  ›
                </span>
              </Link>
              {/* Dot */}
              <div className="absolute -right-12 top-10 w-5 h-5 bg-white border-2 border-gray-300 rounded-full hover:bg-hospital-orange hover:border-hospital-orange transition-colors"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Home Services Section */}
      {(() => {
        /* ── icon SVGs — thin-line style matching screenshot ── */
        const IconDoctor = (
          <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <circle cx="30" cy="16" r="9"/>
            <path d="M10 52c0-11 9-18 20-18s20 7 20 18"/>
            <circle cx="42" cy="36" r="6"/>
            <line x1="42" y1="33" x2="42" y2="39"/>
            <line x1="39" y1="36" x2="45" y2="36"/>
          </svg>
        );
        const IconHeart = (
          <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M30 50S8 36 8 20a12 12 0 0122-7 12 12 0 0122 7c0 16-22 30-22 30z"/>
            <circle cx="44" cy="42" r="8"/>
            <line x1="44" y1="38" x2="44" y2="46"/>
            <line x1="40" y1="42" x2="48" y2="42"/>
          </svg>
        );
        const IconBlood = (
          <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M30 10C30 10 12 28 12 38a18 18 0 0036 0C48 28 30 10 30 10z"/>
            <line x1="30" y1="34" x2="30" y2="44"/>
            <line x1="25" y1="39" x2="35" y2="39"/>
          </svg>
        );
        const IconAmbulance = (
          <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <rect x="4" y="20" width="40" height="24" rx="3"/>
            <path d="M44 30h6a2 2 0 012 2v10a2 2 0 01-2 2h-6"/>
            <circle cx="14" cy="46" r="5"/>
            <circle cx="38" cy="46" r="5"/>
            <line x1="18" y1="30" x2="28" y2="30"/>
            <line x1="23" y1="25" x2="23" y2="35"/>
          </svg>
        );
        const IconFlask = (
          <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M22 8v20L10 46a4 4 0 003.6 6h32.8A4 4 0 0050 46L38 28V8"/>
            <line x1="20" y1="8" x2="40" y2="8"/>
            <circle cx="20" cy="42" r="2.5" fill="currentColor"/>
            <circle cx="32" cy="46" r="2" fill="currentColor"/>
            <circle cx="26" cy="48" r="1.5" fill="currentColor"/>
          </svg>
        );

        const iconMap: Record<string, React.ReactNode> = {
          doctor: IconDoctor,
          heart: IconHeart,
          pill: IconBlood,
          ambulance: IconAmbulance,
          flask: IconFlask,
          blood: IconBlood,
        };

        const serviceSlides = [
          [
            {
              type: "large" as const,
              title: "Find a Doctor",
              desc: "Search from our extensive list of expert doctors and specialists.",
              image: "/images/departments-images/general-medicine.jpeg",
              href: "/doctors",
              icon: "doctor",
            },
            {
              type: "small" as const,
              title: "Pharmacy",
              desc: "Get authentic medicines and healthcare products directly from our 24/7 in-house pharmacy.",
              image: null,
              href: "/services/pharmacy",
              icon: "pill",
            },
            {
              type: "small" as const,
              title: "Pathological Services",
              desc: "Advanced diagnostic tests and pathological investigations with highly accurate and fast reports.",
              image: null,
              href: "/services/pathology",
              icon: "flask",
            },
            {
              type: "large" as const,
              title: "Health Check",
              desc: "Take charge of your well-being with a health experience customised for you",
              image: "/images/health_cards_packages.png",
              href: "/services/wellness-packages",
              icon: "heart",
            },
          ],
          [
            {
              type: "large" as const,
              title: "Emergency Care",
              desc: "24/7 dedicated emergency care services for all your urgent medical needs.",
              image: "/images/departments-images/emergency_services.webp",
              href: "/services/emergency",
              icon: "ambulance",
            },
            {
              type: "small" as const,
              title: "Blood Bank",
              desc: "24x7 blood bank services providing safe and tested blood.",
              image: null,
              href: "/services/blood-bank",
              icon: "blood",
            },
            {
              type: "small" as const,
              title: "Home Care",
              desc: "Professional medical care and nursing services at your doorstep.",
              image: null,
              href: "/services/home-care",
              icon: "doctor",
            },
            {
              type: "large" as const,
              title: "24/7 Ambulance",
              desc: "Fully equipped ACLS/BLS ambulances for safe transport.",
              image: "/images/departments-images/ambulance_doctor.png",
              href: "/services/ambulance",
              icon: "ambulance",
            },
          ]
        ];

        const [servicesSlide, setServicesSlide] = useState(0);
        const totalSlides = serviceSlides.length;
        const current = serviceSlides[servicesSlide];

        const KnowMore = ({ href }: { href: string }) => (
          <Link href={href} className="group inline-flex items-center text-[#E85222] font-semibold text-[13px] tracking-wide uppercase hover:text-[#c73e15] transition-colors gap-1.5">
            Know More
            <span className="w-[18px] h-[18px] bg-[#E85222] text-white rounded-full flex items-center justify-center text-[11px] pb-[1px] group-hover:bg-[#c73e15] transition-colors">
              ›
            </span>
          </Link>
        );

        return (
          <section className="py-16 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-5 lg:px-8 relative z-10">
              
              <div className="flex items-end justify-between mb-12 xl:mb-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#666] mb-3 block font-jakarta">
                    Excellence in Care
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-black text-[#1e3a8a] font-jakarta tracking-tight">
                    Services
                  </h2>
                </div>
                <div className="flex gap-3 md:gap-4 items-center mt-2 md:mt-0">
                  <button onClick={() => setServicesSlide((p) => (p - 1 + totalSlides) % totalSlides)} aria-label="Previous slide" className="flex items-center justify-center text-[#E85222] hover:text-[#c73e15] transition-colors"><ArrowLeft strokeWidth={2.5} className="w-7 h-7 md:w-8 md:h-8"/></button>
                  <button onClick={() => setServicesSlide((p) => (p + 1) % totalSlides)} aria-label="Next slide" className="flex items-center justify-center text-[#E85222] hover:text-[#c73e15] transition-colors"><ArrowRight strokeWidth={2.5} className="w-7 h-7 md:w-8 md:h-8"/></button>
                </div>
              </div>

              {/* ── Cards area ── */}
              <div className="flex-1 min-w-0">
                  {/* Mobile/tablet: 2-col simple grid */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
                    {current.map((s) => (
                      <div key={s.title} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
                        {s.image && (
                          <div className="relative h-48 w-full shrink-0">
                            <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw, 50vw" />
                          </div>
                        )}
                        <div className="flex flex-col flex-1 p-5 gap-3">
                          <h3 className="text-[17px] font-bold text-[#1a1a1a] leading-snug">{s.title}</h3>
                          <p className="text-[13px] text-[#6b7280] leading-relaxed flex-1">{s.desc}</p>
                          <div className="flex items-end justify-between pt-1">
                            <KnowMore href={s.href} />
                            {s.icon && <div className="w-10 h-10 text-[#d1d5db]">{iconMap[s.icon]}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: exact screenshot layout — large | stacked-small | large */}
                  <div
                    className="hidden lg:grid gap-[18px]"
                    style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: "510px" }}
                  >
                    {/* ── Large card LEFT (row-span-2) ── */}
                    <div
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 transform-gpu"
                      style={{
                        gridRow: "1 / 3",
                        transform: "translateZ(0)",
                        WebkitTransform: "translateZ(0)",
                        isolation: "isolate",
                        maskImage: "radial-gradient(white, black)",
                        WebkitMaskImage: "radial-gradient(white, black)",
                      }}
                    >
                      {current[0].image && (
                        <div className="relative shrink-0" style={{ height: "280px" }}>
                          <Image src={current[0].image} alt={current[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                        </div>
                      )}
                      <div className="flex flex-col flex-1 px-7 py-6 gap-[10px]">
                        <h3 className="text-[20px] font-bold text-[#1a1a1a] leading-snug">{current[0].title}</h3>
                        <p className="text-[13.5px] text-[#6b7280] leading-relaxed flex-1">{current[0].desc}</p>
                        <div className="flex items-end justify-between pt-1">
                          <KnowMore href={current[0].href} />
                          {current[0].icon && <div className="w-11 h-11 text-[#d1d5db]">{iconMap[current[0].icon]}</div>}
                        </div>
                      </div>
                    </div>

                    {/* ── Small card TOP-MIDDLE ── */}
                    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 px-7 py-6">
                      <h3 className="text-[20px] font-bold text-[#1a1a1a] leading-snug mb-[10px]">{current[1].title}</h3>
                      <p className="text-[13.5px] text-[#6b7280] leading-relaxed flex-1">{current[1].desc}</p>
                      <div className="flex items-end justify-between pt-3">
                        <KnowMore href={current[1].href} />
                        {current[1].icon && <div className="w-11 h-11 text-[#d1d5db]">{iconMap[current[1].icon]}</div>}
                      </div>
                    </div>

                    {/* ── Small card BOTTOM-MIDDLE ── */}
                    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 px-7 py-6">
                      <h3 className="text-[20px] font-bold text-[#1a1a1a] leading-snug mb-[10px]">{current[2].title}</h3>
                      <p className="text-[13.5px] text-[#6b7280] leading-relaxed flex-1">{current[2].desc}</p>
                      <div className="flex items-end justify-between pt-3">
                        <KnowMore href={current[2].href} />
                        {current[2].icon && <div className="w-11 h-11 text-[#d1d5db]">{iconMap[current[2].icon]}</div>}
                      </div>
                    </div>

                    {/* ── Large card RIGHT (row-span-2) ── */}
                    <div
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 transform-gpu"
                      style={{
                        gridRow: "1 / 3",
                        transform: "translateZ(0)",
                        WebkitTransform: "translateZ(0)",
                        isolation: "isolate",
                        maskImage: "radial-gradient(white, black)",
                        WebkitMaskImage: "radial-gradient(white, black)",
                      }}
                    >
                      {current[3].image && (
                        <div className="relative shrink-0" style={{ height: "280px" }}>
                          <Image src={current[3].image} alt={current[3].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                        </div>
                      )}
                      <div className="flex flex-col flex-1 px-7 py-6 gap-[10px]">
                        <h3 className="text-[20px] font-bold text-[#1a1a1a] leading-snug">{current[3].title}</h3>
                        <p className="text-[13.5px] text-[#6b7280] leading-relaxed flex-1">{current[3].desc}</p>
                        <div className="flex items-end justify-between pt-1">
                          <KnowMore href={current[3].href} />
                          {current[3].icon && <div className="w-11 h-11 text-[#d1d5db]">{iconMap[current[3].icon]}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-[6px] mt-7">
                {serviceSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setServicesSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === servicesSlide ? "w-5 h-[7px] bg-[#E85222]" : "w-[7px] h-[7px] bg-[#d1d5db] hover:bg-[#9ca3af]"}`}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })()}
      
      {/* Patients Speak Testimonial Section (Dynamically Loaded) */}
      <DynamicTestimonials stories={patientStories} />

      {/* Our Locations Section - Dynamically Loaded */}
      <DynamicLocationSlider branches={branches} />

      {/* 24x7 Services Section - Dynamically Loaded */}
      <DynamicEmergencyServices />

      {/* Appointment Booking Banner */}
      <section
        className="py-12 sm:py-16 xl:py-12 bg-[#0b1c43] relative overflow-hidden"
        aria-labelledby="appointment-banner"
      >
        {/* Background Image with High Visibility for striking look */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/book_an_appointment_banner.png"
            alt="Hospital background"
            fill
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[#0b1c43]/40 mix-blend-multiply" />
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 xl:gap-12">
            {/* Left Side - Icon, Heading, and Description */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 xl:gap-5 flex-1">
              {/* Calendar with Stethoscope Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 xl:w-16 xl:h-16 flex items-center justify-center relative">
                  <svg
                    className="w-full h-full text-[#FFAB73]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 16l2 2 4-4"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h2
                  id="appointment-banner"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold text-white mb-3 xl:mb-2 font-heading"
                >
                  Book for an Appointments
                </h2>
                <p className="text-sm sm:text-base md:text-lg xl:text-base text-gray-200 leading-relaxed max-w-2xl">
                  We are delighted to announce that our doors are open, and we
                  are now accepting appointments to serve you better.
                </p>
              </div>
            </div>

            {/* Right Side - Make Appointment Button */}
            <div className="flex-shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 xl:px-8 py-3 sm:py-3.5 md:py-4 xl:py-3 rounded-full border border-[#FFAB73] bg-transparent text-white font-medium hover:bg-[#FFAB73]/10 transition-colors font-heading text-sm sm:text-base md:text-lg xl:text-base"
              >
                <span>Make Appointment</span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 xl:w-5 xl:h-5 text-[#FFAB73]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Articles Section */}
      <section
        className="py-16 sm:py-20 bg-gray-50"
        aria-labelledby="latest-news"
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <h2
            id="latest-news"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl font-bold text-[#1e3a8a] mb-12 xl:mb-10 font-heading"
          >
            Latest News & Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestNews.map((article) => (
              <article
                key={article.slug}
                className="bg-[#EFF6FF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
              >
                <div className="relative w-full aspect-[3/2] bg-gray-200 overflow-hidden shrink-0">
                  <Image
                    src={
                      getImageUrl(article.image) || "/about-section-image.png"
                    }
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-6 xl:p-5 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl xl:text-xl font-bold text-gray-900 mb-3 xl:mb-2 font-heading leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base xl:text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt ||
                      "Read more about this article inside..."}
                  </p>
                  <Link
                    href={`/media/news/${article.slug}`}
                    className="inline-flex items-center gap-2 text-[#E85222] font-medium hover:text-[#d1451a] transition-colors text-sm sm:text-base mt-auto w-max"
                  >
                    <span>Read More</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-12 text-center">
            <Link
              href="/media/news"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#284a91]/10 text-[#284a91] hover:bg-[#284a91] hover:text-white rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span>View All News & Articles</span>
              <div className="w-8 h-8 rounded-full bg-[#284a91]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Events Section */}
      <section
        className="py-16 sm:py-24 bg-white relative overflow-hidden"
        aria-labelledby="latest-events"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-hospital-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E85222]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 xl:mb-10 gap-6">
            <div className="max-w-2xl">
              <h2
                id="latest-events"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl font-bold text-[#1e3a8a] font-heading"
              >
                Latest Events
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestEvents.map((event) => (
              <article
                key={event.slug}
                className="group flex h-full min-h-[354px] flex-col overflow-hidden rounded-lg bg-[#EFF6FF] shadow-[0_4px_14px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(15,23,42,0.16)]"
              >
                {/* Event Image Container */}
                <div className="relative h-[188px] w-full shrink-0 overflow-hidden bg-slate-200">
                  <Image
                    src={
                      getImageUrl(event.thumbnail) || "/about-section-image.png"
                    }
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  {/* Date Badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-3 rounded-lg bg-white px-4 py-2.5 shadow-[0_8px_18px_rgba(15,23,42,0.16)]">
                    <p className="font-heading text-xl font-black leading-none text-[#0b1c43]">
                      {new Date(event.date).getDate()}
                    </p>
                    <div className="h-7 w-px bg-slate-200" />
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] font-black uppercase leading-none tracking-wide text-[#1e3a8a]">
                        {new Date(event.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </p>
                      <p className="mt-1 text-[9px] font-bold leading-none text-[#E85222]">
                        {new Date(event.date).getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                  <h3 className="mb-2 font-heading text-xl font-black leading-snug text-[#111827] line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm font-medium leading-relaxed text-slate-600 line-clamp-2">
                    {event.description?.replace(/<[^>]*>/g, "") ||
                      "Experience our latest medical workshops and community health programs..."}
                  </p>

                  <Link
                    href={`/media/events/${event.slug}`}
                    className="group/btn mt-auto inline-flex w-max items-center gap-2 text-sm font-extrabold text-[#E85222] transition-colors hover:text-[#d1451a]"
                  >
                    <span>View Details</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-16 text-center">
            <Link
              href="/media/events"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#284a91]/10 text-[#284a91] hover:bg-[#284a91] hover:text-white rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span>View All Events</span>
              <div className="w-8 h-8 rounded-full bg-[#284a91]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Cashless Empanelment Section */}
      <section className="py-14 xl:py-10 bg-white border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1280px] min-[1920px]:max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Heading */}
          <div className="text-center mb-10 xl:mb-8">
            <h2 className="text-3xl sm:text-4xl xl:text-3xl font-black text-[#0b1c43] font-jakarta tracking-tight">
              Cashless <span className="text-hospital-teal">Empanelment</span>
            </h2>
            <div className="w-16 h-1 bg-[#E85222] mx-auto mt-4 rounded-full" />
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {[
              { src: "/images/cashless_empanelment/AAI.png", alt: "AAI" },
              { src: "/images/cashless_empanelment/NCL.png", alt: "NCL" },
              {
                src: "/images/cashless_empanelment/Indian_oil.png",
                alt: "Indian Oil",
              },
              {
                src: "/images/cashless_empanelment/SBI_general.png",
                alt: "SBI General Insurance",
              },
              {
                src: "/images/cashless_empanelment/paramount_health.png",
                alt: "Paramount Health",
              },
              {
                src: "/images/cashless_empanelment/pmjay.png",
                alt: "PM-JAY Ayushman Bharat",
              },
              { src: "/images/cashless_empanelment/BHEL.png", alt: "BHEL" },
              {
                src: "/images/cashless_empanelment/hindalco.png",
                alt: "Hindalco",
              },
              {
                src: "/images/cashless_empanelment/iffco-tokio.png",
                alt: "IFFCO-Tokio",
              },
              {
                src: "/images/cashless_empanelment/vidal_health.png",
                alt: "Vidal Health",
              },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="group flex items-center justify-center bg-white border border-gray-100 rounded-2xl p-4 xl:p-3 w-full h-[140px] xl:h-[110px] shadow-sm hover:shadow-md hover:border-hospital-teal/30 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="170px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/about/cashless-empanelment"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#284a91]/10 text-[#284a91] hover:bg-[#284a91] hover:text-white rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span>View All Partners</span>
              <div className="w-8 h-8 rounded-full bg-[#284a91]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 xl:py-14 bg-[#EFF6FF]"
        aria-labelledby="faq-section"
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mb-10 xl:mb-8">
            <h2
              id="faq-section"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-3xl font-bold text-[#1e3a8a] mb-4 xl:mb-2 font-heading"
            >
              Frequently Asked Questions - Popular Hospital
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-4xl">
              Explore detailed answers to commonly asked questions about
              healthcare services, specialist consultations, treatment
              processes, and patient care at Popular Hospital, one of
              India&apos;s leading multispeciality hospital networks.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question:
                  "What medical specialties are available at Popular Hospital?",
                answer:
                  "Popular Hospital is a multi-specialty facility offering advanced treatment in Cardiology, Neurology, Orthopedics, Nephrology, Urology, Gastroenterology, and General Surgery.",
              },
              {
                question: "Does the hospital provide 24/7 emergency services?",
                answer:
                  "Yes, Popular Hospital offers round-the-clock Emergency and Trauma care, supported by a dedicated emergency medical team and advanced life-support ambulances (+91-7800001895 / 96).",
              },
              {
                question:
                  "How can I schedule an appointment with a specialist?",
                answer:
                  "Appointments can be booked via the hospital's official website or by calling our helpline. Physical walk-ins at the reception are also available for OPD consultations.",
              },
              {
                question:
                  "Is cashless treatment available for insured patients?",
                answer:
                  "Yes, the hospital has tie-ups with major Third Party Administrators (TPAs) and private insurance companies, providing cashless hospitalization for eligible policyholders.",
              },
              {
                question:
                  "Does the hospital support the Ayushman Bharat Yojana (PM-JAY)?",
                answer:
                  "Yes, Popular Hospital is an empanelled provider for the Ayushman Bharat scheme, offering free treatment to eligible cardholders as per government norms.",
              },
              {
                question: "What diagnostic facilities are available on-site?",
                answer:
                  "The hospital features a comprehensive diagnostic wing equipped with MRI, CT Scan, X-ray, Ultrasound, and a fully automated Pathology laboratory for quick and accurate results.",
              },
              {
                question: "Are there specialized critical care units?",
                answer:
                  "Yes, the facility includes state-of-the-art Intensive Care Units (ICU), Neonatal ICUs (NICU), and Pediatric ICUs (PICU) for patients requiring constant monitoring.",
              },
              {
                question: "Where is Popular Hospital located in Varanasi?",
                answer:
                  "The hospital is located at Kakarmatta, near DLW Ground, Varanasi, Uttar Pradesh. It is well-connected and accessible from all major parts of the city.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 ${openFaqIndex === index
                  ? "border-[#E85222]/40 shadow-md"
                  : "border-[#d0e3f0] shadow-sm hover:shadow-md"
                  }`}
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full px-5 sm:px-6 xl:px-5 py-4 sm:py-5 xl:py-4 flex items-center justify-between text-left gap-4 transition-colors"
                  aria-expanded={openFaqIndex === index}
                >
                  <span
                    className={`text-sm sm:text-base font-bold transition-colors ${openFaqIndex === index ? "text-[#E85222]" : "text-[#1a3a5c]"}`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${openFaqIndex === index
                      ? "border-[#E85222] bg-[#E85222] rotate-45"
                      : "border-[#2a7a8c] bg-white"
                      }`}
                  >
                    <svg
                      className={`w-5 h-5 transition-colors duration-300 ${openFaqIndex === index ? "text-white" : "text-[#2a7a8c]"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaqIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-5 sm:px-6 pb-5 pt-0">
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All FAQs Link */}
          <div className="mt-10 text-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#284a91]/10 text-[#284a91] hover:bg-[#284a91] hover:text-white rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span>View All Frequently Asked Questions</span>
              <div className="w-8 h-8 rounded-full bg-[#284a91]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        className="py-20 sm:py-24 xl:py-16 bg-white"
        aria-labelledby="contact-us"
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-start">
            {/* Left Column - Brand Quote & Info (Refined Modern Style) */}
            <div className="flex flex-col gap-10 order-2 lg:order-1">
              {/* Branding Block from Image */}
              <div className="bg-[#0b1c43] text-white rounded-3xl p-10 sm:p-12 lg:p-14 relative overflow-hidden transition-all duration-500">
                <div className="relative z-10">
                  <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-4xl font-black italic leading-[1.15] tracking-tight mb-8 xl:mb-6 font-jakarta">
                    Committed To Build A<br />
                    <span className="text-[#E85222]">
                      Positive, Safe, Patient
                    </span>
                    <br />
                    Focused Culture.
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl font-medium font-jakarta">
                    Today the hospital is recognised as a world renowned
                    institution, not only providing outstanding care and
                    treatment, our goal is to deliver quality care in a
                    respectful & compassionate manner. We strive to be the first
                    and best choice for healthcare.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
                    <Link
                      href="/doctors"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 bg-[#E85222] text-white rounded-xl text-lg font-bold hover:bg-[#d1451a] transition-all duration-300 shadow-lg shadow-[#E85222]/20"
                    >
                      Find a Doctor
                    </Link>

                    <Link
                      href="#international-patients"
                      className="w-full sm:w-auto flex flex-col items-center justify-center px-8 py-3 border-2 border-white/20 hover:border-[#E85222] text-white rounded-xl transition-all duration-300 group bg-white/5 backdrop-blur-sm"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E85222] group-hover:text-white mb-0.5">
                        For International Patients
                      </span>
                      <span className="text-xs font-bold whitespace-nowrap">
                        Send Your Inquiry to Assist You
                      </span>
                    </Link>
                  </div>

                  {/* Modernized Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                      "Fractures and dislocations",
                      "Home medicine review",
                      "High Quality Care",
                      "Desensitisation injections",
                      "Health Assessments",
                    ].map((service) => (
                      <div
                        key={service}
                        className="flex items-center gap-4 group cursor-default"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-hospital-teal shadow-[0_0_10px_rgba(45,212,191,0.5)] group-hover:scale-125 transition-transform"></div>
                        <span className="text-xl font-bold tracking-tight italic font-jakarta opacity-90 group-hover:opacity-100 transition-opacity">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simplified Connect With Us Box */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 group">
                <div className="flex-shrink-0 w-20 h-20 bg-pink-50 rounded-xl flex items-center justify-center text-[#E85222] group-hover:scale-110 transition-transform duration-500">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase italic underline decoration-[#E85222]/30 underline-offset-8">
                    Connect With Us
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-6 sm:gap-y-2">
                      <p className="whitespace-nowrap text-gray-600 font-bold hover:text-[#E85222] transition-colors cursor-default">
                        <span className="text-[#E85222] mr-2">CALL:</span>{" "}
                        +91-7800001896
                      </p>
                      <p className="whitespace-nowrap text-gray-600 font-bold hover:text-[#E85222] transition-colors cursor-default">
                        <span className="text-[#E85222] mr-2">CALL:</span>{" "}
                        +91-7800001895
                      </p>
                    </div>
                    <p className="text-gray-600 font-bold hover:text-[#E85222] transition-colors cursor-default">
                      <span className="text-[#E85222] mr-2">EMAIL:</span>{" "}
                      info@popularhospitals.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-[#FFFAF5] rounded-3xl border border-[#F3E6D8] p-8 sm:p-10 lg:p-12 xl:p-8 shadow-sm order-1 lg:order-2 self-stretch">
              <p className="text-[#0b1c43] text-md sm:text-md font-medium mb-1 leading-relaxed font-jakarta">
                We will confirm your appointment within 2 hours
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5x1 xl:text-3xl font-black text-[#0b1c43] mb-10 xl:mb-6 font-jakarta tracking-tight">
                Request An Appointment
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormSubmitting(true);
                  setFormError("");
                  setFormSuccess(false);
                  try {
                    const API_URL = "/api-backend";
                    const res = await fetch(`${API_URL}/contacts`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        date: formData.date,
                        timing: formData.timing,
                        department: formData.department,
                        location: formData.location,
                        message: formData.message,
                        agreedToTerms: formData.agreeTerms,
                      }),
                    });
                    const data = await res.json();
                    if (!res.ok)
                      throw new Error(data.error || "Something went wrong.");
                    setFormSuccess(true);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      date: "",
                      timing: "",
                      department: "",
                      location: "",
                      message: "",
                      agreeTerms: false,
                    });
                    setTimeout(() => setFormSuccess(false), 5000);
                  } catch (err: unknown) {
                    setFormError(
                      err instanceof Error
                        ? err.message
                        : "Submission failed. Please try again.",
                    );
                  } finally {
                    setFormSubmitting(false);
                  }
                }}
                className="space-y-6"
              >
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Name"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
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

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>

                {/* Phone */}
                <div className="relative group">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Phone"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.815 4.815l.773-1.548a1 1 0 011.06-.539l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>

                {/* Date & Select Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all text-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={formData.timing}
                      onChange={(e) =>
                        setFormData({ ...formData, timing: e.target.value })
                      }
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all text-gray-500 pr-10"
                    >
                      <option value="">Select Timing</option>
                      <option value="09:30-11:00">9:30 AM - 11:00 AM</option>
                      <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                      <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
                      <option value="15:00-17:00">3:00 PM - 5:00 PM</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Department & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all text-gray-500 pr-10"
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
                        className="w-5 h-5"
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
                  <div className="relative">
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all text-gray-500 pr-10"
                    >
                      <option value="">Location</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch.slug}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Message"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, agreeTerms: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#E85222] focus:ring-0 accent-[#E85222] cursor-pointer"
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm font-medium text-gray-600 cursor-pointer"
                  >
                    I agree with the{" "}
                    <Link
                      href="/terms"
                      className="text-[#E85222] hover:underline"
                    >
                      terms and conditions
                    </Link>
                    .
                  </label>
                </div>

                {/* Success/Error Toast */}
                {formSuccess && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium">
                    <svg
                      className="w-5 h-5 text-green-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Your appointment request has been submitted! We will confirm
                    within 2 hours.
                  </div>
                )}
                {formError && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                    <svg
                      className="w-5 h-5 text-red-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#E85222] text-white font-bold rounded-xl overflow-hidden transition-all hover:bg-[#d1451a] shadow-lg shadow-[#E85222]/20 uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formSubmitting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span>Send Message Now</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <section
        className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden group/section border-t border-gray-100"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseEnter={() => setIsHoveringAwards(true)}
        onMouseLeave={() => setIsHoveringAwards(false)}
      >
        <Link
          href="/about/awards-recognition"
          className="block relative cursor-pointer"
        >
          <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] font-jakarta tracking-tight inline-flex items-center gap-4">
                Awards & <span className="text-[#1e3a8a]">Recognitions</span>
              </h2>
              <div className="flex items-center justify-center mt-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
                <div className="w-3 h-3 bg-[#E85222] rounded-full mx-2" />
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-12 lg:gap-20 items-center">
              {/* Left Column - Chairman Profile */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#EFF6FF] rounded-full scale-[1.15] blur-2xl group-hover/section:bg-blue-100 transition-colors" />

                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 border border-gray-100 shadow-md bg-white overflow-hidden ring-12 ring-white">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/images/dr_ak_kaushik.png"
                        alt="DR. A.K. KAUSHIK"
                        fill
                        className="object-contain object-bottom px-3 pt-3 pb-0 translate-y-2 transform group-hover/section:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#EFF6FF] rounded-full shadow-md flex items-center justify-center p-3">
                    <svg
                      className="w-full h-full text-[#1e3a8a]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-black text-[#1e3a8a] font-heading tracking-tight uppercase italic underline decoration-[#E85222]/30 decoration-4 underline-offset-8">
                    DR. A.K.KAUSHIK
                  </h3>
                  <p className="mt-6 text-gray-600 font-bold leading-relaxed tracking-wide uppercase text-sm">
                    Chairman & Director
                    <br />
                    Popular Group of Hospitals
                  </p>
                </div>
              </div>

              {/* Right Column - Award Image */}
              <div className="flex flex-col gap-6">
                <div className="relative rounded-2xl overflow-hidden bg-[#EFF6FF] shadow-md border-4 border-white transition-all duration-500 max-w-xl mx-auto w-full">
                  <Image
                    src="/images/awards/award1.png"
                    alt="Hospital Award"
                    width={2496}
                    height={1726}
                    className="w-full h-auto transform group-hover/section:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Mobile Call to Action */}
                <div className="lg:hidden text-center mt-2 px-6 py-4 bg-[#EFF6FF] shadow-md rounded-full border border-gray-100">
                  <p className="text-[#1e3a8a] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#E85222] rounded-full animate-ping" />
                    Click for detailed view
                    <span className="w-1.5 h-1.5 bg-[#E85222] rounded-full animate-ping" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mouse Follower Title (Desktop only) */}
          <div
            className="fixed md:absolute pointer-events-none z-[100] transition-opacity duration-300 hidden lg:block"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              opacity: isHoveringAwards ? 1 : 0,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className="bg-[#E85222] text-white px-6 py-2.5 rounded-full whitespace-nowrap shadow-2xl flex items-center gap-3 scale-90 group-hover/section:scale-100 transition-transform duration-300">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Click to view detailed
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M14 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* International Patients Section (Mockup Matching) */}
      <div id="international-patients">
        <DynamicInternationalPatients specialities={specialities} />
      </div>

      {/* ─── Why We Are The Best Section (Achievements) ─── */}
      <section className="relative overflow-hidden bg-[#0b3c8a] py-20 sm:py-24 xl:py-16 text-white">
        {/* Background Pattern: Hexagonal "Nut" Pattern */}
        <div
          className="absolute inset-0 opacity-[0.1] transition-opacity duration-1000"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L150 0 L200 86.6 L150 173.2 L50 173.2 L0 86.6 Z' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 86.6px",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl font-bold mb-16 xl:mb-12 font-heading max-w-[1200px] mx-auto leading-tight italic">
            Popular Hospital Is The Best Hospital In Varanasi.{" "}
            <span className="text-[#FF6B00] not-italic ml-2 xl:whitespace-nowrap">
              Here&apos;s The Reason Why?
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-5xl mx-auto border border-white/20 rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
            {/* Stat 1: Patients */}
            <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 xl:p-10 border-b md:border-r border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 xl:w-16 xl:h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 12h2l1-4 2 8 1-4h2"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold font-heading leading-tight text-white mb-1">
                  Lacs of Happy
                </div>
                <div className="text-lg sm:text-xl xl:text-lg font-medium text-white/80">
                  Patients
                </div>
              </div>
            </div>

            {/* Stat 2: Doctors */}
            <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 border-b border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-16 h-16 text-white"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M14 11h2a2 2 0 012 2v6" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl xl:text-xl font-bold font-heading leading-tight text-white mb-1">
                  Excellent Team of
                </div>
                <div className="text-lg sm:text-xl xl:text-lg font-medium text-white/80">
                  Qualified Doctors
                </div>
              </div>
            </div>

            {/* Stat 3: Beds */}
            <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 md:border-r border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 7v11m18-11v11M3 13h18M5 8h14M7 9v4m10-4v4" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-5xl sm:text-6xl font-black font-heading leading-tight text-[#FF6B00] mb-1">
                  <Counter target={450} duration={2000} />
                </div>
                <div className="text-lg sm:text-xl font-bold tracking-[0.1em] text-white/80 uppercase">
                  Beds
                </div>
              </div>
            </div>

            {/* Stat 4: Locations */}
            <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 group hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <circle cx="12" cy="11" r="3" strokeWidth={1.5} />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold font-heading leading-tight text-white mb-1">
                  Convenient Multiple
                </div>
                <div className="text-lg sm:text-xl xl:text-lg font-medium text-white/80">
                  Locations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Counter({
  target,
  duration = 2000,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return <div ref={elementRef}>{count}</div>;
}

function SimpleCard({
  href,
  title,
  description,
  isFirst = false,
  isLast = false,
  variant = "blue",
}: {
  href: string;
  title: string;
  description?: string;
  isFirst?: boolean;
  isLast?: boolean;
  variant?: "blue" | "green" | "purple" | "orange";
}) {
  const isBlue = variant === "blue";
  const desktopTheme = title.includes("Appointment")
    ? {
      card: "md:bg-gradient-to-br md:from-white md:to-[#fff8e4] md:border-[#eadf9f]",
      icon: "md:bg-[#f4edbd] md:text-[#87951c]",
    }
    : title.includes("Branches")
      ? {
        card: "md:bg-gradient-to-br md:from-white md:to-[#eef9ff] md:border-[#b8e7f7]",
        icon: "md:bg-[#dcf5ff] md:text-[#168fbd]",
      }
      : variant === "purple"
        ? {
          card: "md:bg-gradient-to-br md:from-white md:to-[#f6f2ff] md:border-[#d6c8ff]",
          icon: "md:bg-[#eee6ff] md:text-[#7c5fd0]",
        }
        : title.includes("Doctor") || variant === "orange"
          ? {
            card: "md:bg-gradient-to-br md:from-white md:to-[#fff1eb] md:border-[#f4cdbd]",
            icon: "md:bg-[#ffe7dd] md:text-[#E85222]",
          }
          : {
            card: "md:bg-gradient-to-br md:from-white md:to-[#f6f2ff] md:border-[#d6c8ff]",
            icon: "md:bg-[#eee6ff] md:text-[#7c5fd0]",
          };

  // Mobile styles matching the reference image (Blue/Green cards)
  const mobileClasses = `flex flex-col items-start justify-between p-4 rounded-2xl w-full min-h-[140px] shadow-sm ${isBlue ? "bg-[#E0EEF7]" : "bg-[#E4F5E6]"
    }`;

  const desktopClasses = `${desktopTheme.card} md:relative md:min-h-[118px] md:overflow-hidden md:rounded-2xl md:border md:p-5 lg:p-6 md:shadow-[0_12px_28px_rgba(15,23,42,0.06)] md:flex-row md:items-end md:justify-between md:gap-4 md:hover:-translate-y-1 md:hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)]`;

  return (
    <Link
      href={href}
      className={`${mobileClasses} ${desktopClasses} transition-all group font-jakarta`}
    >
      {/* Mobile Icon & Content */}
      <div className="flex flex-col items-start gap-2 md:hidden">
        <div
          className={`p-2 rounded-full ${isBlue ? "bg-white/50" : "bg-white/50"} text-gray-800`}
        >
          {/* Icons based on title for mobile */}
          {title.includes("Login") ? (
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          ) : title.includes("Appointment") ? (
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          ) : title.includes("Report") ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ) : title.includes("Departments") ? (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          ) : (
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
        <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
          {title}
        </span>
      </div>

      <div className="hidden md:block min-w-0 pt-4">
        <span className="block text-lg lg:text-xl font-extrabold leading-tight text-[#07152f]">
          {title}
        </span>
        {description ? (
          <span className="mt-2 block text-xs lg:text-sm font-semibold leading-snug text-[#24314f]/75">
            {description}
          </span>
        ) : null}
      </div>

      {/* Mobile "Learn More" */}
      <div className="md:hidden flex items-center gap-2 text-xs font-bold text-gray-900 mt-2">
        Learn More
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>

      {/* Desktop Arrow Circle */}
      <div className={`hidden md:flex absolute right-5 top-1/2 h-9 w-9 -translate-y-1/2 flex-shrink-0 rounded-full items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${desktopTheme.icon}`}>
        {title.includes("Appointment") ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V4m8 3V4M5 10h14M7 20h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" />
          </svg>
        ) : title.includes("Branches") || title.includes("Hospitals") ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16M6 20V8l6-4 6 4v12M9 20v-6h6v6M9 10h.01M12 10h.01M15 10h.01" />
          </svg>
        ) : title.includes("Doctor") || title.includes("Doctors") ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0M18 14v5m-2.5-2.5h5" />
          </svg>
        ) : title.includes("Special") ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 4c2 2.5 3 4.5 3 7a6 6 0 11-12 0c0-2.5 1.1-4.4 3.2-6.6M13 4c-.2 2.2.6 3.6 2.7 4.2M11 20c2-1.9 3-4.2 3-7M8 15c1.8.2 3.7-.7 5.6-2.6" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 4h7l3 3v13H7V4z" />
          </svg>
        )}
      </div>
    </Link>
  );
}

function TrustBadge({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "orange" | "blue";
}) {
  const iconTone =
    tone === "orange"
      ? "bg-[#ff9d68] text-white"
      : "bg-[#8ba7ff] text-white";
  const icon = label.includes("Legacy") ? (
    <path d="M10 2.5 12.1 6.8l4.7.7-3.4 3.3.8 4.7L10 13.3l-4.2 2.2.8-4.7-3.4-3.3 4.7-.7L10 2.5Z" />
  ) : label.includes("Surgeries") ? (
    <path d="M8.8 3.5h2.4v4.3h4.3v2.4h-4.3v4.3H8.8v-4.3H4.5V7.8h4.3V3.5Zm6.4 8.7 1.3 1.3-3 3-1.3-1.3 3-3Z" />
  ) : (
    <path d="M3.5 7.2c0-.9.7-1.7 1.7-1.7h2.1c.9 0 1.7.7 1.7 1.7v2.1h7.5c1.1 0 2 .9 2 2v4.2h-2v-1.4h-13v1.4h-2V4.5h2v2.7Zm0 4.9h13v-.8H8.9V7.2H5.2v4.9Z" />
  );

  return (
    <div className="group relative flex min-h-[78px] flex-col justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-3 shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#1e3a8a]/20 hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)] md:min-h-[104px] md:p-4 font-jakarta">
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#E85222]/5 transition-opacity group-hover:opacity-80" />
      <div className="relative flex min-h-[34px] w-full items-start gap-2">
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md shadow-sm ${iconTone}`}>
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            {icon}
          </svg>
        </span>
        <span className="min-w-0 text-[10px] font-bold leading-tight text-[#667085] md:text-xs lg:text-sm">
          {label}
        </span>
      </div>
      <div className="relative mt-2 flex min-w-0 items-baseline gap-1">
        <span className="text-[16px] font-black leading-none text-[#07152f] tracking-normal min-[390px]:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px]">
          {value}
        </span>
      </div>
    </div>
  );
}

function QuickCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-hospital-teal hover:shadow-md"
    >
      <h3 className="font-semibold text-hospital-navy">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <span className="mt-4 text-sm font-medium text-hospital-teal">
        Learn more →
      </span>
    </Link>
  );
}
