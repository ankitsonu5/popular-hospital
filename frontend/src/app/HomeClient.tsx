"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { fetchBranches, fetchNews, fetchEvents, getImageUrl, fetchSpecialities, type Branch, type NewsItem, type EventItem, type Speciality } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicTestimonials = dynamic(() => import('@/components/home/Testimonials'), {
  ssr: false, // Client side interactivity only needed
  loading: () => <div className="h-[600px] w-full bg-gray-50 animate-pulse rounded-xl" />
});

const DynamicLocationSlider = dynamic(() => import('@/components/home/LocationSlider'), {
  ssr: false,
  loading: () => <div className="h-[520px] w-full bg-[#f5f5f7] animate-pulse" />
});

const DynamicEmergencyServices = dynamic(() => import('@/components/home/EmergencyServices'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-slate-50 animate-pulse" />
});

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Republic of the)", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Korea", "Republic of Moldova", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Türkiye", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United Republic of Tanzania", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Yemen", "Zambia", "Zimbabwe"
];

interface HomeClientProps {
  latestNews: NewsItem[];
  latestEvents: EventItem[];
  branches: Branch[];
  specialities: Speciality[];
}

export default function HomeClient({ latestNews, latestEvents, branches, specialities }: HomeClientProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringAwards, setIsHoveringAwards] = useState(false);
  const [isInternationalModalOpen, setIsInternationalModalOpen] = useState(false);
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

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    { 
      type: 'image', 
      src: '/images/slide_images/slide_one.png?v=update',
      mobileSrc: '/images/slide_images/slide_one_mobile.png?v=update'
    },
    { 
      type: 'image', 
      src: '/images/slide_images/slide_three.png?v=update',
      mobileSrc: '/images/slide_images/slide_three_mobile.png?v=update'
    },
    { 
      type: 'image', 
      src: '/images/slide_images/slide_two.png?v=update',
      mobileSrc: '/images/slide_images/slide_two_mobile.png?v=update'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // No video logic needed

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

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
      <section 
        className="relative w-full overflow-hidden bg-white flex-shrink-0 mt-[64px] sm:mt-[80px] md:mt-0 h-[calc(100dvh-64px)] sm:h-[calc(100dvh-80px)] md:h-[100dvh] min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-80px)] md:min-h-[100dvh]" 
      >
        {/* Slider Background */}
        <div className="absolute inset-0 z-0 bg-white">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
                <div className="relative w-full h-full">
                  <Image
                    src={isMobile ? (slide.mobileSrc || slide.src) : slide.src}
                    alt={`Hospital Slide ${index + 1}`}
                    fill
                    className="object-cover object-top transition-transform duration-[10000ms]"
                    style={{ transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' }}
                    priority={index === 0}
                    loading={index === 0 ? undefined : 'lazy'}
                    sizes="100vw"
                  />
                  {/* Very subtle gradient for text shadow if needed */}
                  <div className="absolute inset-0 bg-black/10 z-10" />
                </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 flex justify-between px-4 sm:px-20 lg:px-24 pointer-events-none">
          <button
            onClick={prevSlide}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#E85222] transition-all pointer-events-auto transform hover:scale-110 active:scale-95 group shadow-2xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E85222] text-white flex items-center justify-center hover:bg-[#d1451a] shadow-xl transition-all pointer-events-auto transform hover:scale-110 active:scale-95 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Content Overlay - Hindi Text */}
        <div className={`md:hidden relative z-20 h-full flex flex-col items-center justify-end pb-24 sm:pb-32 px-4 text-center transition-all duration-700 opacity-100 translate-y-0`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tracking-tight leading-[1.1] notranslate animate-fade-in-up">
            आपकी सेहत, <br className="sm:hidden" /> हमारी प्राथमिकता
          </h1>
        </div>
      </section>

      {/* Standalone Notification Ticker */}
      <section className="relative w-full bg-[#0b1c43] text-white py-3 overflow-hidden border-y border-[#1e3a8a]/30 group cursor-pointer transition-colors hover:bg-[#0e2455] z-20">
        <Link href="/updates" className="absolute inset-0 z-40" aria-label="View all updates"></Link>
        <div className="absolute left-0 top-0 bottom-0 bg-[#0b1c43] z-10 px-4 flex items-center shadow-[4px_0_24px_rgba(11,28,67,1)] group-hover:bg-[#0e2455] transition-colors">
          <div className="flex items-center gap-2 text-[#E85222] font-bold tracking-widest text-xs uppercase font-heading">
            <span className="w-2 h-2 rounded-full bg-[#E85222] animate-pulse"></span>
            Updates
          </div>
        </div>
        <div className="flex whitespace-nowrap animate-scroll-left group-hover:[animation-play-state:paused] pl-32">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="flex items-center gap-3 text-sm font-medium tracking-wide text-gray-200 group-hover:text-white">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E85222] text-white uppercase tracking-wider">New</span>
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
      <section className="relative mt-12 sm:mt-16 md:-mt-28 lg:-mt-32 xl:-mt-40 2xl:-mt-48 z-30 pb-0 md:pb-10">
        <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-6xl xl:max-w-6xl 2xl:max-w-[1600px]">
          <div className="grid grid-cols-2 gap-4 md:flex md:items-stretch md:bg-white md:rounded-full md:overflow-hidden md:shadow-xl md:gap-0">
            <SimpleCard
              href="/our-locations"
              title="Our Branches"  
              isFirst={true}
              variant="blue"
            />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="/book" title="Book an Appointment" variant="green" />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="/doctors" title="Find Your Doctor" variant="blue" />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="/patient-reports" title="Patient Report" isLast={true} variant="green" />
          </div>
        </div>
      </section>




      {/* About Section */}
      <section className="relative mt-12 md:mt-20 py-16 sm:py-24 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] overflow-hidden" aria-labelledby="about-us">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-hospital-teal/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E85222]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="relative mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">   
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>                
                <h2 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-heading leading-tight tracking-tight text-[#0b1c43] mb-6 drop-shadow-sm">
                 About <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#1e3a8a]">Popular Hospital</span>
                </h2>
                
                <p className="text-gray-600 text-[17px] sm:text-[19px] leading-relaxed font-medium">
                  <span className="text-[#0b1c43] font-bold">POPULAR HOSPITAL</span> (a Unit of POPULAR MEDICARE LTD), one of Varanasi's best Multi Super Speciality Hospital that redefines standards of excellence in healthcare delivery by bringing together the best of infrastructure, technology, training, education and medical intelligentsia.
                </p>
              </div>

              {/* Feature List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Seamless Care",
                  "Warm & Welcoming",
                  "Comprehensive Care",
                  "Expert Doctors",
                  "Patient-Centered",
                  "Personalized Approach",
                  "Cutting-Edge Tech",
                  "Positive Reviews",
                ].map((feature, idx) => (
                  <div key={idx} className="group flex items-center gap-4 p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-hospital-teal/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-xl bg-hospital-teal/10 text-hospital-teal flex items-center justify-center group-hover:bg-hospital-teal group-hover:text-white transition-colors duration-300 shadow-inner">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-bold text-[15px] tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
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
                    Discover More<span className="hidden sm:inline"> About Us</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#E85222] transition-colors shadow-sm shrink-0">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </span>
                </Link>
                
                {/* Contact Info (Circular Button on Mobile, Full Box on Desktop) */}
                <a href="tel:+917800001895" className="flex items-center justify-center sm:justify-start gap-4 bg-white sm:px-6 w-12 h-12 sm:w-auto sm:h-auto sm:py-3 rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-shadow shrink-0 group">
                   <div className="w-full h-full sm:w-10 sm:h-10 rounded-full sm:bg-hospital-teal/10 flex items-center justify-center text-hospital-teal group-hover:bg-hospital-teal group-hover:text-white sm:group-hover:bg-hospital-teal/10 sm:group-hover:text-hospital-teal transition-colors shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                   </div>
                   <div className="hidden sm:flex flex-col justify-center items-start min-w-0">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">24/7 Helpline</p>
                      <div className="flex items-center justify-start gap-2 w-full">
                         <span className="text-[14px] lg:text-[15px] xl:text-[16px] font-black text-[#0b1c43] tracking-tight">+91-7800001895</span>
                         <span className="text-gray-300 font-bold text-[14px] shrink-0">/</span>
                         <span className="text-[14px] lg:text-[15px] xl:text-[16px] font-black text-[#0b1c43] tracking-tight shrink-0">96</span>
                      </div>
                   </div>
                </a>
              </div>
            </div>

            {/* Right Side - Image with Floating Elements */}
            <div className="relative mt-16 lg:mt-0 lg:ml-12">
              <div className="relative group">
                {/* Main Image Frame (Reduced hover glow expansion) */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-hospital-teal/30 to-[#E85222]/30 rounded-[3rem] blur-2xl transition-all duration-500 opacity-40"></div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden w-full aspect-[4/5] border-[8px] border-white group-hover:-translate-y-0.5 transition-transform duration-500 bg-gray-100">
                  <Image
                    src="/about-section-image.png"
                    alt="Popular Hospital - Expert Care"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Subtle Light Reflection Inner Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                  
                  {/* Inner Overlay Gradient for depth (More subtle) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating Stats Badge 1 */}
                <div className="absolute top-12 -left-6 sm:-left-12 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/50 hover:scale-105 transition-transform duration-300 z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-hospital-teal/10 text-hospital-teal flex items-center justify-center shrink-0 shadow-inner">
                         <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                      </div>
                      <div>
                         <p className="text-2xl sm:text-3xl font-black text-[#0b1c43]">450+</p>
                         <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Beds Facility</p>
                      </div>
                   </div>
                </div>

                {/* Floating Stats Badge 2 */}
                <div className="absolute bottom-12 -right-6 sm:-right-8 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border border-white/50 hover:scale-105 transition-transform duration-300 z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E85222]/10 text-[#E85222] flex items-center justify-center shrink-0 shadow-inner">
                         <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <div>
                         <p className="text-2xl sm:text-3xl font-black text-[#0b1c43]">32+</p>
                         <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Years Exp.</p>
                      </div>
                   </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Popular Hospital Section */}
      <section className="relative py-24 bg-white overflow-hidden" aria-labelledby="why-popular">
        {/* Decorative Grid Lines Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right, #0b1c43 1px, transparent 1px), linear-gradient(to bottom, #0b1c43 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>

        <div className="relative mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[3px] bg-gradient-to-r from-[#E85222] to-hospital-teal rounded-full"></span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0b1c43] font-heading leading-[1.15] tracking-tight">
                Why <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]">Popular Hospital</span>
              </h2>
            </div>
            <div className="lg:max-w-md">
              <p className="text-gray-500 text-[17px] leading-relaxed border-l-4 border-hospital-teal/40 pl-6 py-1">
                With a legacy of over 3 decades, Popular Hospital remains committed to prioritizing your health through world-class treatments and a deeply personalized touch.
              </p>
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
                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#E85222] to-[#d1451a] flex items-center justify-center shrink-0 shadow-lg">
                          <svg className="w-5 h-5 sm:w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                       </div>
                       <div className="flex flex-col justify-center gap-0.5">
                          <a href="tel:+917800001895" className="text-[18px] min-[370px]:text-[20px] sm:text-[22px] tracking-tight hover:text-[#E85222] transition-colors leading-none">+91-7800001895</a>
                          <a href="tel:+917800001896" className="text-[18px] min-[370px]:text-[20px] sm:text-[22px] tracking-tight hover:text-[#E85222] transition-colors leading-none">+91-7800001896</a>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6 mt-1 sm:mt-2 relative">
                       <div>
                          <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">32<span className="text-[#E85222]">+</span></p>
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-wider mt-1 opacity-80">Years Exp</p>
                       </div>
                       <div>
                          <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">50<span className="text-hospital-teal">+</span></p>
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-wider mt-1 opacity-80">Specialists</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {[
                {
                  title: "Exceptional Healthcare",
                  desc: "Top-notch healthcare services backed by experienced doctors and cutting-edge technology.",
                  icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                },
                {
                  title: "Multi-Super Specialty Hospital",
                  desc: "Comprehensive specialties including cardiology, neurology, orthopedics, and gastroenterology.",
                  icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                },
                {
                  title: "Compassionate Care",
                  desc: "Personalized attention ensuring that patients feel comfortable and cared for during their stay.",
                  icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                },
                {
                  title: "State-of-the-Art Tech",
                  desc: "Equipped with the latest diagnostic tools, modern operation theatres, and intensive care units.",
                  icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                },
                {
                  title: "Patient-Centric",
                  desc: "We prioritize your needs and comfort, ensuring optimal treatment sequences without stress.",
                  icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                },
                {
                  title: "Trusted For Decades",
                  desc: "A sprawling legacy of exceeding patient expectations while upholding the highest medical standards.",
                  icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                },
              ].map((feature, idx) => (
                <div key={idx} className="group relative bg-[#f8fafc] p-6 sm:p-8 rounded-[2rem] border-2 border-transparent hover:border-hospital-teal/20 hover:bg-white transition-all duration-300 pointer-events-auto cursor-default overflow-hidden">
                   {/* Decorative gradient blob inside card */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-hospital-teal/10 to-transparent rounded-full blur-2xl group-hover:bg-hospital-teal/20 transition-colors duration-500"></div>
                   
                   <div className="relative z-10 flex flex-col h-full">
                     <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 text-[#0b1c43] group-hover:bg-gradient-to-br group-hover:from-hospital-teal group-hover:to-[#1e40af] group-hover:text-white transition-all duration-300 mb-6">
                       {feature.icon}
                     </div>
                     <div>
                       <h3 className="text-[19px] font-bold text-[#0b1c43] mb-3 font-heading leading-tight group-hover:text-hospital-teal transition-colors duration-300">{feature.title}</h3>
                       <p className="text-gray-500 text-[15px] leading-relaxed font-medium">{feature.desc}</p>
                     </div>
                   </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section
        className="py-20 bg-[#f5f5f7]" // Apple-like light gray background
        aria-labelledby="our-services"
      >
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#666] mb-3 block">
              Excellence in Care
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1e3a8a] font-heading tracking-tight">
              Our Departments.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", image: "/images/departments-images/cardiology.jpeg", href: "/departments/cardiology" },
              { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", image: "/images/departments-images/neuro-surgery.jpeg", href: "/departments/neurosurgery" },
              { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", image: "/images/departments-images/gastroenterology.jpeg", href: "/departments/gastroenterology" },
              { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", image: "/images/departments-images/AdobeStock_1010757604.jpeg", href: "/departments/nephrology" },
              { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", image: "/images/departments-images/oncology.jpeg", href: "/departments/oncology" },
              { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", image: "/images/departments-images/urology.jpeg", href: "/departments/urology" },
              { title: "Burns & Plastic Surgery", desc: "Reconstructive and cosmetic surgery services.", image: "/images/departments-images/AdobeStock_222372294.jpeg", href: "/departments/burns-plastic-surgery" },
              { title: "Laparoscopic & General Surgery", desc: "Department of Laparoscopic & General Surgery", image: "/images/departments-images/laparoscopic.jpeg", href: "/departments/general-surgery" },
              { title: "Obstetrics and Gynecology", desc: "Care for pregnancy, childbirth, and women's health.", image: "/images/departments-images/gynecology.jpeg", href: "/departments/gynaecology" },
              { title: "Paediatrics", desc: "Medical care for infants, children, and adolescents.", image: "/images/departments-images/paediatrics.jpeg", href: "/departments/pediatrics" },
              { title: "Orthopaedic", desc: "Treatment for bones, joints, ligaments, and nerves.", image: "/images/departments-images/orthopaedic.jpeg", href: "/departments/orthopedics" },
              { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", image: "/images/departments-images/general-medicine.jpeg", href: "/departments/general-medicine" },
              { title: "ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", image: "/images/departments-images/ent.jpeg", href: "/departments/ent" },
              { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", image: "/images/departments-images/ophthalmology.jpeg", href: "/departments/ophthalmology" },
              { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", image: "/images/departments-images/dental-care.jpeg", href: "/departments/dental" },
              { title: "Pulmonology", desc: "Respiratory and lung health specialists.", image: "/images/departments-images/pulmonology.jpeg", href: "/departments/respiratory" },
            ].slice(0, 8).map((service, idx) => (
              <div
                key={service.title}
                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Image Section */}
                <div className="w-full h-48 relative flex-shrink-0 bg-gray-100">
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
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Department
                    </span>
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3 font-heading leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed font-medium line-clamp-3">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-end">
                    <Link
                      href={service.href}
                      className="w-10 h-10 rounded-full bg-[#E85222] flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all shadow-lg group-hover:bg-[#d14011]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#0066cc]/10 text-[#0066cc] hover:bg-[#0066cc] hover:text-white rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md group"
            >
              <span>View all departments</span>
              <div className="w-8 h-8 rounded-full bg-[#0066cc]/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(#9ca3af 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2
            id="model-of-care"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-12 lg:mb-20 text-center font-heading"
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
          <div className="hidden lg:block relative w-full h-[700px] max-w-[1000px] mx-auto">
            {/* Center Image Container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden border-[12px] border-white shadow-2xl">
                <Image
                  src="/images/model-of-care-center.jpg"
                  alt="Surgery Team"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            </div>

            {/* Dashed Orbit Ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-gray-400 z-0"></div>

            {/* Node 1: Top (Exceptional clinical talent) */}
            <div className="absolute left-1/2 top-4 transform -translate-x-1/2 flex flex-col items-center z-20 w-64 text-center">
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
            <div className="absolute top-[20%] right-[3%] flex flex-col items-start z-20 w-64 text-left">
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
            <div className="absolute bottom-[20%] right-[3%] flex flex-col items-start z-20 w-64 text-left">
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
            <div className="absolute bottom-[20%] left-[3%] flex flex-col items-end z-20 w-64 text-right">
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
            <div className="absolute top-[20%] left-[3%] flex flex-col items-end z-20 w-64 text-right">
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


      {/* Patients Speak Testimonial Section (Dynamically Loaded) */}
      <DynamicTestimonials />

      {/* Our Locations Section - Dynamically Loaded */}
      <DynamicLocationSlider branches={branches} />

      {/* 24x7 Services Section - Dynamically Loaded */}
      <DynamicEmergencyServices />

      {/* Appointment Booking Banner */}
      <section
        className="py-12 sm:py-16 bg-[#0b1c43] relative overflow-hidden"
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

        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left Side - Icon, Heading, and Description */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 flex-1">
              {/* Calendar with Stethoscope Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center relative">
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
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-heading"
                >
                  Book for an Appointments
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl">
                  We are delighted to announce that our doors are open, and we
                  are now accepting appointments to serve you better.
                </p>
              </div>
            </div>

            {/* Right Side - Make Appointment Button */}
            <div className="flex-shrink-0">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full border border-[#FFAB73] bg-transparent text-white font-medium hover:bg-[#FFAB73]/10 transition-colors font-heading text-sm sm:text-base md:text-lg"
              >
                <span>Make Appointment</span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFAB73]"
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
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <h2
            id="latest-news"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-12 font-heading"
          >
            Latest News & Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestNews.map((article) => (
              <article key={article.slug} className="bg-[#EFF6FF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden shrink-0">
                  <Image
                    src={getImageUrl(article.image) || "/about-section-image.png"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-heading leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt || "Read more about this article inside..."}
                  </p>
                  <Link
                    href={`/news/${article.slug}`}
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e3a8a] text-white font-semibold text-sm hover:bg-[#15307a] transition-colors shadow-md hover:shadow-lg"
            >
              <span>View All News & Articles</span>
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

        <div className="relative mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">

              <h2
                id="latest-events"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] font-heading"
              >
                Latest Events
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestEvents.map((event) => (
              <article 
                key={event.slug} 
                className="bg-[#EFF6FF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full"
              >
                {/* Event Image Container */}
                <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden shrink-0">
                  <Image
                    src={getImageUrl(event.thumbnail) || "/about-section-image.png"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white px-4 py-2.5 rounded-xl shadow-md border-l-4 border-[#E85222] flex items-center gap-3">
                    <p className="text-[#0b1c43] font-black text-xl leading-none">
                      {new Date(event.date).getDate()}
                    </p>
                    <div className="w-[1.5px] h-6 bg-gray-100"></div>
                    <div className="flex flex-col">
                      <p className="text-[#1e3a8a] font-bold text-xs uppercase tracking-wider leading-none">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </p>
                      <p className="text-[#E85222] font-semibold text-[10px] mt-1 leading-none">
                        {new Date(event.date).getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-heading leading-tight line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2 flex-1">
                    {event.description?.replace(/<[^>]*>/g, '') || "Experience our latest medical workshops and community health programs..."}
                  </p>
                  
                  <Link
                    href={`/media/events/${event.slug}`}
                    className="inline-flex items-center gap-2 text-[#E85222] font-medium hover:text-[#d1451a] transition-colors text-sm sm:text-base mt-auto w-max group/btn"
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e3a8a] text-white font-semibold text-sm hover:bg-[#15307a] transition-colors shadow-md hover:shadow-lg"
            >
              <span>View All Events</span>
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
        </div>
      </section>


      {/* Cashless Empanelment Section */}
      <section className="py-14 sm:py-16 bg-white border-t border-gray-100">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1c43] font-heading tracking-tight">
              Cashless <span className="text-hospital-teal">Empanelment</span>
            </h2>
            <div className="w-16 h-1 bg-[#E85222] mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 mt-4 text-base max-w-2xl mx-auto">
              We are empanelled with leading insurance companies and government schemes to offer you seamless cashless treatment.
            </p>
          </div>

          {/* Logos Grid */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { src: "/images/cashless_empanelment/AAI.png", alt: "AAI" },
              { src: "/images/cashless_empanelment/NCL.png", alt: "NCL" },
              { src: "/images/cashless_empanelment/Indian_oil.png", alt: "Indian Oil" },
              { src: "/images/cashless_empanelment/SBI_general.png", alt: "SBI General Insurance" },
              { src: "/images/cashless_empanelment/pmjay.png", alt: "PM-JAY Ayushman Bharat" },
              { src: "/images/cashless_empanelment/BHEL.png", alt: "BHEL" },
              { src: "/images/cashless_empanelment/hindalco.png", alt: "Hindalco" },
              { src: "/images/cashless_empanelment/iffco-tokio.png", alt: "IFFCO-Tokio" },
              { src: "/images/cashless_empanelment/vidal_health.png", alt: "Vidal Health" },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="group flex items-center justify-center bg-white border border-gray-100 rounded-2xl p-5 w-[210px] h-[135px] shadow-sm hover:shadow-md hover:border-hospital-teal/30 transition-all duration-300"
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e3a8a] text-white font-semibold text-sm hover:bg-[#15307a] transition-colors shadow-md hover:shadow-lg"
            >
              <span>View All Partners</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-[#EFF6FF]"
        aria-labelledby="faq-section"
      >
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mb-10">
            <h2
              id="faq-section"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4 font-heading"
            >
              Frequently Asked Questions - Popular Hospital
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-4xl">
              Explore detailed answers to commonly asked questions about
              healthcare services, specialist consultations, treatment
              processes, and patient care at Popular Hospital, one of India&apos;s
              leading multispeciality hospital networks.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question: "What medical specialties are available at Popular Hospital?",
                answer: "Popular Hospital is a multi-specialty facility offering advanced treatment in Cardiology, Neurology, Orthopedics, Nephrology, Urology, Gastroenterology, and General Surgery."
              },
              {
                question: "Does the hospital provide 24/7 emergency services?",
                answer: "Yes, Popular Hospital offers round-the-clock Emergency and Trauma care, supported by a dedicated emergency medical team and advanced life-support ambulances (+91-7800001895)."
              },
              {
                question: "How can I schedule an appointment with a specialist?",
                answer: "Appointments can be booked via the hospital's official website or by calling our helpline. Physical walk-ins at the reception are also available for OPD consultations."
              },
              {
                question: "Is cashless treatment available for insured patients?",
                answer: "Yes, the hospital has tie-ups with major Third Party Administrators (TPAs) and private insurance companies, providing cashless hospitalization for eligible policyholders."
              },
              {
                question: "Does the hospital support the Ayushman Bharat Yojana (PM-JAY)?",
                answer: "Yes, Popular Hospital is an empanelled provider for the Ayushman Bharat scheme, offering free treatment to eligible cardholders as per government norms."
              },
              {
                question: "What diagnostic facilities are available on-site?",
                answer: "The hospital features a comprehensive diagnostic wing equipped with MRI, CT Scan, X-ray, Ultrasound, and a fully automated Pathology laboratory for quick and accurate results."
              },
              {
                question: "Are there specialized critical care units?",
                answer: "Yes, the facility includes state-of-the-art Intensive Care Units (ICU), Neonatal ICUs (NICU), and Pediatric ICUs (PICU) for patients requiring constant monitoring."
              },
              {
                question: "Where is Popular Hospital located in Varanasi?",
                answer: "The hospital is located at Kakarmatta, near DLW Ground, Varanasi, Uttar Pradesh. It is well-connected and accessible from all major parts of the city."
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
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 transition-colors"
                  aria-expanded={openFaqIndex === index}
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${openFaqIndex === index ? 'text-[#E85222]' : 'text-[#1a3a5c]'}`}>
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a3a5c] text-white rounded-full font-bold hover:bg-[#2a7a8c] transition-all hover:scale-105 shadow-lg shadow-slate-200"
            >
              <span>View All Frequently Asked Questions</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 sm:py-24 bg-gray-50" aria-labelledby="contact-us">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Brand Quote & Info (Refined Modern Style) */}
            <div className="flex flex-col gap-10 order-2 lg:order-1">
              {/* Branding Block from Image */}
              <div className="bg-[#0b1c43] text-white rounded-3xl p-10 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-[#0b1c43]/20">
                <div className="relative z-10">
                  <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black italic leading-[1.15] tracking-tight mb-8 font-heading">
                    Committed To Build A<br />
                    <span className="text-[#FA9A3E]">Positive, Safe, Patient</span><br />
                    Focused Culture.
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl font-medium">
                    Today the hospital is recognised as a world renowned institution, not only providing outstanding care and treatment, our goal is to deliver quality care in a respectful & compassionate manner. We strive to be the first and best choice for healthcare.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
                    <Link 
                      href="/doctors"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-3.5 bg-[#FA9A3E] text-white rounded-xl text-lg font-bold hover:bg-[#e88a2d] transition-all duration-300 shadow-lg shadow-[#FA9A3E]/20"
                    >
                      Find a Doctor
                    </Link>

                    <button 
                      onClick={() => setIsInternationalModalOpen(true)}
                      className="w-full sm:w-auto flex flex-col items-center justify-center px-8 py-3 border-2 border-white/20 hover:border-[#FA9A3E] text-white rounded-xl transition-all duration-300 group bg-white/5 backdrop-blur-sm"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FA9A3E] group-hover:text-white mb-0.5">For International Patients</span>
                      <span className="text-xs font-bold whitespace-nowrap">Send Your Inquiry to Assist You</span>
                    </button>
                  </div>

                  {/* Modernized Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                      "Fractures and dislocations",
                      "Home medicine review",
                      "High Quality Care",
                      "Desensitisation injections",
                      "Health Assessments"
                    ].map((service) => (
                      <div key={service} className="flex items-center gap-4 group cursor-default">
                        <div className="w-2.5 h-2.5 rounded-full bg-hospital-teal shadow-[0_0_10px_rgba(45,212,191,0.5)] group-hover:scale-125 transition-transform"></div>
                        <span className="text-xl font-bold tracking-tight italic font-heading opacity-90 group-hover:opacity-100 transition-opacity">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simplified Connect With Us Box */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col sm:flex-row items-center gap-8 group">
                <div className="flex-shrink-0 w-20 h-20 bg-pink-50 rounded-xl flex items-center justify-center text-[#E85222] group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-black text-[#0b1c43] mb-4 font-heading tracking-tight uppercase italic underline decoration-[#E85222]/30 underline-offset-8">
                    Connect With Us
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                      <p className="text-gray-600 font-bold hover:text-[#E85222] transition-colors cursor-default">
                        <span className="text-[#E85222] mr-2">CALL:</span> +91-7800001896
                      </p>
                      <p className="text-gray-600 font-bold hover:text-[#E85222] transition-colors cursor-default">
                        <span className="text-[#E85222] mr-2">CALL:</span> +91-7800001895
                      </p>
                    </div>
                    <p className="text-gray-600 font-bold hover:text-[#E85222] transition-colors cursor-default">
                      <span className="text-[#E85222] mr-2">EMAIL:</span> info@popularhospitals.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-[#FFFAF5] rounded-3xl border border-[#F3E6D8] p-8 sm:p-10 lg:p-12 shadow-sm order-1 lg:order-2 self-stretch">
              <p className="text-[#0b1c43] text-md sm:text-md font-medium mb-1 leading-relaxed">
                We will confirm your appointment within 2 hours
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5x1 font-black text-[#0b1c43] mb-10 font-heading tracking-tight">
                Request An Appointment
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted:", formData);
                }}
                className="space-y-6"
              >
                {/* Name */}
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all text-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <select
                      value={formData.timing}
                      onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm focus:border-[#E85222] focus:ring-4 focus:ring-[#E85222]/10 focus:outline-none transition-all text-gray-500 pr-10"
                    >
                      <option value="">Select Timing</option>
                      <option value="09:30-11:00">9:30 AM - 11:00 AM</option>
                      <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                      <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
                      <option value="15:00-17:00">3:00 PM - 5:00 PM</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Department & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#E85222] focus:ring-0 accent-[#E85222] cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-sm font-medium text-gray-600 cursor-pointer">
                    I agree with the <Link href="/terms" className="text-[#E85222] hover:underline">terms and conditions</Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#E85222] text-white font-bold rounded-xl overflow-hidden transition-all hover:bg-[#d1451a] shadow-lg shadow-[#E85222]/20 uppercase tracking-widest"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Send Message Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <section 
        className="py-20 sm:py-24 bg-[#F8FAFC] relative overflow-hidden group/section border-t border-gray-100"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseEnter={() => setIsHoveringAwards(true)}
        onMouseLeave={() => setIsHoveringAwards(false)}
      >
        <Link href="/about/awards-recognition" className="block relative cursor-pointer">
          <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
            
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1c43] font-heading tracking-tight inline-flex items-center gap-4">
                Awards & <span className="text-[#1D4ED8]">Recognitions</span>
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
                  <div className="absolute inset-0 bg-[#1D4ED8]/5 rounded-full scale-[1.15] blur-2xl group-hover/section:bg-[#1D4ED8]/10 transition-colors" />
                  
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-2 border border-blue-100 shadow-2xl bg-white overflow-hidden ring-12 ring-blue-50/50">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/images/dr_ak_kaushik.png"
                        alt="DR. A.K. KAUSHIK"
                        fill
                        className="object-cover transform group-hover/section:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center p-3">
                    <svg className="w-full h-full text-[#1D4ED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-black text-[#0b1c43] font-heading tracking-tight uppercase italic underline decoration-[#1D4ED8]/30 decoration-4 underline-offset-8">
                    DR. A.K.KAUSHIK
                  </h3>
                  <p className="mt-6 text-gray-500 font-bold leading-relaxed tracking-wide uppercase text-sm">
                    Chairman & Director<br />
                    Popular Group of Hospitals
                  </p>
                </div>
              </div>

              {/* Right Column - Awards Gallery Grid */}
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-all duration-500">
                    <Image
                      src="/images/awards/award1.png"
                      alt="Hospital Award"
                      fill
                      className="object-cover transform group-hover/section:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-all duration-500">
                    <Image
                      src="/images/awards/award2.png"
                      alt="Medical Achievement"
                      fill
                      className="object-cover transform group-hover/section:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="relative h-64 sm:h-80 col-span-2 rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-all duration-500">
                    <Image
                      src="/images/awards/award3.png"
                      alt="Hospital Recognition Ceremony"
                      fill
                      className="object-cover transform group-hover/section:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Mobile Call to Action */}
                <div className="lg:hidden text-center mt-2 px-6 py-4 bg-white shadow-xl rounded-full border border-blue-50">
                  <p className="text-[#1D4ED8] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3">
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Click to view detailed</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                </svg>
             </div>
          </div>
        </Link>
      </section>

      {/* ─── Why We Are The Best Section (Achievements) ─── */}
      <section className="bg-[#0b3c8a] py-20 sm:py-24 text-white">
        <div className="mx-auto w-full max-w-[1366px] px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 font-heading max-w-5xl mx-auto leading-tight italic">
            Popular Hospital Is The Best Hospital In Varanasi. <br className="hidden md:block" />
            <span className="text-[#FA9A3E] not-italic">Here&apos;s The Reason Why?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:max-w-5xl mx-auto border border-white/20 rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
             {/* Stat 1: Patients */}
             <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 border-b md:border-r border-white/10 group hover:bg-white/10 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h2l1-4 2 8 1-4h2" />
                   </svg>
                </div>
                <div className="text-left">
                   <div className="text-xl sm:text-2xl font-bold font-heading leading-tight text-white mb-1">Lacs of Happy</div>
                   <div className="text-lg sm:text-xl font-medium text-white/80">Patients</div>
                </div>
             </div>

             {/* Stat 2: Doctors */}
             <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 border-b border-white/10 group hover:bg-white/10 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-16 h-16 text-white" stroke="currentColor" fill="none" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="10" cy="7" r="4" />
                      <path d="M14 11h2a2 2 0 012 2v6" />
                   </svg>
                </div>
                <div className="text-left">
                   <div className="text-xl sm:text-2xl font-bold font-heading leading-tight text-white mb-1">Excellent Team of</div>
                   <div className="text-lg sm:text-xl font-medium text-white/80">Qualified Doctors</div>
                </div>
             </div>

             {/* Stat 3: Beds */}
             <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 md:border-r border-white/10 group hover:bg-white/10 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M3 7v11m18-11v11M3 13h18M5 8h14M7 9v4m10-4v4" />
                   </svg>
                </div>
                <div className="text-left">
                   <div className="text-5xl sm:text-6xl font-black font-heading leading-tight text-[#FA9A3E] mb-1">450</div>
                   <div className="text-lg sm:text-xl font-bold tracking-[0.1em] text-white/80 uppercase">Beds</div>
                </div>
             </div>

             {/* Stat 4: Locations */}
             <div className="flex items-center gap-6 sm:gap-10 p-10 lg:p-14 group hover:bg-white/10 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                   <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <circle cx="12" cy="11" r="3" strokeWidth={1.5} />
                   </svg>
                </div>
                <div className="text-left">
                   <div className="text-xl sm:text-2xl font-bold font-heading leading-tight text-white mb-1">Convenient Multiple</div>
                   <div className="text-lg sm:text-xl font-medium text-white/80">Locations</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFF6FF] py-12">
        <div className="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-lg font-medium sm:text-left text-[#1a3a5c]">
            Need to talk to us? Call our helpline 24/7
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+917800001895"
              className="text-2xl font-bold text-[#2957A4] underline hover:no-underline"
            >
              +91-7800001895
            </a>
            <span className="text-2xl font-bold text-[#1a3a5c] font-heading">/</span>
            <a
              href="tel:+917800001896"
              className="text-2xl font-bold text-[#2957A4] underline hover:no-underline"
            >
              96
            </a>
          </div>
        </div>
      </section>

      {/* International Patient Inquiry Modal */}
      {isInternationalModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-[450px] bg-[#333333] rounded-sm p-1 shadow-2xl animate-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsInternationalModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#FA9A3E] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-[#444444] p-8">
              <h2 className="text-2xl font-bold text-white text-center mb-8 tracking-tight font-heading">Book An Appointment</h2>
              
              <form className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    placeholder="Contact"
                    className="w-full bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.5-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                    </svg>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Age"
                    className="w-full bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>

                <div className="relative">
                  <select className="w-full bg-white px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-500 max-h-48 overflow-y-auto">
                    <option>-Select Country-</option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="w-full bg-white px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-500">
                    <option>Department</option>
                    {specialities.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white text-lg font-bold uppercase transition-all hover:bg-black/90 tracking-widest mt-6"
                >
                  Submit Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SimpleCard({
  href,
  title,
  isFirst = false,
  isLast = false,
  variant = 'blue',
}: {
  href: string;
  title: string;
  isFirst?: boolean;
  isLast?: boolean;
  variant?: 'blue' | 'green';
}) {
  const isBlue = variant === 'blue';

  // Mobile styles matching the reference image (Blue/Green cards)
  const mobileClasses = `flex flex-col items-start justify-between p-4 rounded-2xl w-full min-h-[140px] shadow-sm ${isBlue ? 'bg-[#E0EEF7]' : 'bg-[#E4F5E6]'
    }`;

  // Desktop styles maintaining the original white bar look
  const desktopClasses = `md:bg-white md:rounded-none md:shadow-none md:min-h-0 md:p-0 md:flex-row md:items-center md:justify-center md:gap-1 lg:gap-3 md:px-2 lg:px-4 md:py-1.5 lg:py-3 md:w-auto md:flex-1 md:min-w-0 md:border-r md:border-gray-100 md:last:border-0 md:hover:bg-[#FBF8ED]`;

  return (
    <Link
      href={href}
      className={`${mobileClasses} ${desktopClasses} transition-all group`}
    >
      {/* Mobile Icon & Content */}
      <div className="flex flex-col items-start gap-2 md:hidden">
        <div className={`p-2 rounded-full ${isBlue ? 'bg-white/50' : 'bg-white/50'} text-gray-800`}>
          {/* Icons based on title for mobile */}
          {title.includes('Login') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          ) : title.includes('Appointment') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          ) : title.includes('Report') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          ) : title.includes('Departments') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          )}
        </div>
        <span className="text-sm font-bold font-heading uppercase tracking-wider text-gray-900">
          {title}
        </span>
      </div>

      {/* Desktop Title */}
      <span className="hidden md:block text-sm lg:text-lg font-medium font-heading whitespace-nowrap text-gray-800 group-hover:text-gray-900">
        {title}
      </span>

      {/* Mobile "Learn More" */}
      <div className="md:hidden flex items-center gap-2 text-xs font-bold text-gray-900 mt-2">
        Learn More
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </div>

      {/* Desktop Arrow Circle */}
      <div className="hidden md:flex flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-gray-800 items-center justify-center bg-white group-hover:bg-hospital-teal group-hover:border-hospital-teal group-hover:text-white transition-all">
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5"
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
      </div>
    </Link>
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
  