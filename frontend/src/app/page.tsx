"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { fetchBranches, type Branch } from "@/lib/api";

export default function HomePage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
    phone: "",
    query: "",
    agreeTerms: false,
  });

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Robust video loading check
  useEffect(() => {
    // Check immediately for cached video
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    // Fallback: If video takes too long, just show whatever we have
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 5000); // 5 second fallback

    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Approximate card width + gap
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    fetchBranches()
      .then(setBranches)
      .catch(() => setBranches([]));
  }, []);

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
      <section className="relative w-full overflow-hidden bg-gray-900 mt-16 sm:mt-[72px] md:mt-20 lg:mt-0">
        <div className="relative w-full">
          {/* Video Loading Placeholder */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
               <div className="w-16 h-16 md:w-24 md:h-24 opacity-60 animate-pulse">
                  <Image src="/logo.png" alt="Loading" width={100} height={100} className="object-contain" />
               </div>
            </div>
          )}

          <video
            ref={videoRef}
            className={`w-full h-[650px] md:h-auto object-cover md:object-contain block transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            onLoadedData={() => setIsVideoLoaded(true)}
            onCanPlay={() => setIsVideoLoaded(true)}
            onPlaying={() => setIsVideoLoaded(true)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0b1c43]/90 via-[#0b1c43]/50 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-start pb-24 md:pb-0 pt-0 md:pt-28 lg:pt-64 xl:pt-[22rem] 2xl:pt-[22rem] min-[1920px]:pt-[42rem] z-20 px-4 text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-bold text-white font-heading mb-2 drop-shadow-lg tracking-tight leading-tight">
              आपकी सेहत, <br className="sm:hidden" /> हमारी प्राथमिकता
            </h1>

            <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-3">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 2xl:px-10 2xl:py-5 bg-[#E85222] hover:bg-[#d1451a] text-white rounded-full font-bold text-sm md:text-base lg:text-base 2xl:text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group flex-1 sm:flex-none whitespace-nowrap"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="md:hidden">Book</span>
                <span className="hidden md:inline">Book Appointment</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-center gap-2 px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 2xl:px-10 2xl:py-5 bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-[#0b1c43] rounded-full font-bold text-sm md:text-base lg:text-base 2xl:text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group flex-1 sm:flex-none whitespace-nowrap"
              >
                <span className="md:hidden">Services</span>
                <span className="hidden md:inline">Explore Services</span>
                <svg className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Notification Ticker */}
          <div className="absolute bottom-0 w-full bg-[#0b1c43] text-white py-3 overflow-hidden border-t border-b border-[#1e3a8a]/30 z-20 group cursor-pointer transition-colors hover:bg-[#0e2455]">
            <Link href="/updates" className="absolute inset-0 z-30" aria-label="View all updates"></Link>
            <div className="absolute left-0 top-0 bottom-0 bg-[#0b1c43] z-10 px-4 flex items-center shadow-[4px_0_24px_rgba(11,28,67,1)] group-hover:bg-[#0e2455] transition-colors">
              <div className="flex items-center gap-2 text-[#E85222] font-bold tracking-widest text-xs uppercase font-heading">
                <span className="w-2 h-2 rounded-full bg-[#E85222] animate-pulse"></span>

                Updates
              </div>
            </div>
            <div className="flex whitespace-nowrap animate-scroll-left group-hover:[animation-play-state:paused] pl-32">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 mx-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-3 text-sm font-medium tracking-wide text-gray-200 group-hover:text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E85222] text-white uppercase tracking-wider">New</span>
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
          </div>
        </div>
      </section>

      <section className="relative mt-6 md:-mt-32 lg:-mt-52 z-30 pb-12 md:pb-10">
        <div className="mx-auto max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl 2xl:max-w-[1600px]">
          <div className="grid grid-cols-2 gap-4 md:flex md:items-stretch md:bg-white md:rounded-full md:overflow-hidden md:shadow-xl md:gap-0">
            <SimpleCard
              href="/visitor-info"
              title="Visitor Information"
              isFirst={true}
              variant="blue"
            />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="/doctors" title="Find a Doctor" variant="green" />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="#our-locations" title="Our Locations" variant="blue" />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="/contact" title="Connect with Us" isLast={true} variant="green" />
          </div>
        </div>
      </section>



      {/* About Section */}
      <section className="mt-20 pt-0 pb-16 sm:pt-0 sm:pb-20 md:py-20 bg-white" aria-labelledby="about-us">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-stretch">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-hospital-teal mb-2 block">
                  About Popular Hospital
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading" style={{ color: '#0b1c43' }}>
                  We Provide Finest Patient's Care & Amenities
                </h2>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  POPULAR HOSPITAL(a Unit of POPULAR MEDICARE LTD), one of Varanasi’s best Super Speciality Institute that redefines standards of excellence in healthcare delivery by bringing together the best of infrastructure, technology, training, education and medical intelligentsia.
                </p>
                {/* Feature List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    "Seamless Care",
                    "Warm and Welcoming Environment",
                    "Comprehensive Care",
                    "Expert Doctors",
                    "Patient-Centered Care",
                    "Personalized Approach",
                    "Cutting-Edge Technology",
                    "Positive Reviews",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-hospital-teal flex-shrink-0"
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
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  POPULAR HOSPITAL is a 450 bedded Super Speciality Hospital in Varanasi providing all kinds of Medical, Surgical & Diagnostic services to the patients of Eastern UP, Bihar, Jharkhand, Chhattisgarh and MP for more than 31 years. We provide best services in one roof like Cardiology, Nephrology, Medicine, General Surgery, Neurology, Obs & Gynecology, Urology, Oncology, Pediatric, Orthopedic, ENT, Dental department.
                </p>
                {/* Button */}
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-6 py-3 text-white rounded-full font-medium transition-colors font-heading"
                  style={{ backgroundColor: "#E85222" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d1451a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#E85222";
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span>More About Us</span>
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative flex items-stretch">
              <div className="relative rounded-2xl overflow-hidden w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center">
                <Image
                  src="/about-section-image.png"
                  alt="Popular Hospital - Expert Care"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </div>
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
              Specialized Departments.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", image: "/images/departments-images/cardiology.jpeg" },
              { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", image: "/images/departments-images/neuro-surgery.jpeg" },
              { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", image: "/images/departments-images/gastroenterology.jpeg" },
              { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", image: "/images/departments-images/AdobeStock_1010757604.jpeg" },
              { title: "Radiology", desc: "Advanced imaging services including X-ray, MRI, and CT Scan.", image: "/images/departments-images/radiology.jpeg" },
              { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", image: "/images/departments-images/oncology.jpeg" },
              { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", image: "/images/departments-images/urology.jpeg" },
              { title: "Burns & Plastic", desc: "Reconstructive and cosmetic surgery services.", image: "/images/departments-images/AdobeStock_222372294.jpeg" },
              { title: "Laparoscopic", desc: "Minimally invasive general surgical procedures.", image: "/images/departments-images/laparoscopic.jpeg" },
              { title: "Obstetrics", desc: "Care for pregnancy, childbirth, and women's health.", image: "/images/hospital-sample.jpg" },
              { title: "Paediatrics", desc: "Medical care for infants, children, and adolescents.", image: "/images/departments-images/paediatrics.jpeg" },
              { title: "Orthopaedic", desc: "Treatment for bones, joints, ligaments, and nerves.", image: "/images/departments-images/orthopaedic.jpeg" },
              { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", image: "/images/departments-images/general-medicine.jpeg" },
              { title: "ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", image: "/images/departments-images/ent.jpeg" },
              { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", image: "/images/departments-images/ophthalmology.jpeg" },
              { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", image: "/images/departments-images/dental-care.jpeg" },
              { title: "Pulmonology", desc: "Respiratory and lung health specialists.", image: "/images/departments-images/pulmonology.jpeg" },
              { title: "Pathology", desc: "Advanced diagnostic laboratory services.", image: "/images/departments-images/pathology.jpeg" },
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
                    <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-3">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-end">
                    <Link
                      href={service.title === 'Pathology' ? '/specialties/pathology' : service.title === 'Radiology' ? '/specialties/radiology' : `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
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
              href="/services"
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
              <img
                src="/images/model-of-care-center.jpg"
                alt="Model of Care"
                className="w-full h-full object-cover"
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
                <img
                  src="/images/model-of-care-center.jpg"
                  alt="Surgery Team"
                  className="w-full h-full object-cover"
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

      {/* Why Popular Hospital Section */}
      <section className="py-24 bg-white" aria-labelledby="why-popular">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-12">

          {/* Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="inline-block bg-[#f3e8ff] text-[#6b21a8] px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-widest mb-6 border border-[#e9d5ff]">
              WHY CHOOSE POPULAR HOSPITAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] font-heading leading-tight">
              Leading the Way in <span className="text-[#1d1d1f]">Medical Excellence & Compassionate Care.</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
              Your health is our priority. We provide world-class medical treatment with a personal touch at every step of your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* Left Column - Main Promo Image */}
            <div className="lg:col-span-5 relative h-full min-h-[500px] lg:min-h-[auto]">
              <div className="relative h-full w-full bg-[#8b5cf6] rounded-3xl overflow-hidden shadow-2xl group">
                {/* Main Image - Full Cover */}
                <Image
                  src="/images/departments-images/general-medicine.jpeg"
                  alt="Expert Medical Care"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4c1d95]/90 via-[#5b21b6]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-60"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20">
                  {/* Centered Call Badge */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white backdrop-blur-md bg-white/10 px-6 py-3 rounded-2xl border border-white/20 text-center shadow-2xl hover:scale-105 transition-transform duration-300 group-hover:bg-white/20">
                    <p className="text-xs font-bold text-purple-100 mb-1 uppercase tracking-wider">Need help? Call now</p>
                    <p className="text-xl sm:text-2xl font-black flex items-center justify-center gap-2 drop-shadow-md whitespace-nowrap">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.82-6.62-6.65l1.97-1.57c.26-.26.35-.63.24-1.01a17.9 17.9 0 01-.56-3.53.995.995 0 00-1-1H4.05c-.55 0-1.05.52-1.05 1.15 0 9.05 7.6 16.9 16.9 16.9.55 0 1.15-.5 1.15-1.05v-3.95c0-.55-.52-1.05-1.04-1.05z" /></svg>
                      +91-7800001895
                    </p>
                  </div>

                  {/* Bottom Section - Floating Stats */}
                  <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-xl border border-white/50">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">Experience</p>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">25+ Years of Excellence</p>
                        </div>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">Doctors</p>
                          <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">50+ Expert Doctors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  title: "Exceptional Healthcare",
                  desc: "We provide top-notch healthcare services, backed by highly experienced doctors and cutting-edge medical technology.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  )
                },
                {
                  title: "Multi-Specialty Hospital",
                  desc: "Our hospital offers a comprehensive range of specialties, including cardiology, neurology, gastroenterology, orthopedics, and more, ensuring that we meet the diverse healthcare needs of our patients.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  )
                },
                {
                  title: "Compassionate Care",
                  desc: "We believe that healthcare is not just about treating illnesses, but also about providing compassionate care to our patients. Our staff is trained to provide personalized care, making our patients feel comfortable and cared for during their hospital stay.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  )
                },
                {
                  title: "State-of-the-Art Facilities",
                  desc: "Our hospital is equipped with the latest diagnostic tools and equipment, ensuring accurate and timely diagnosis of illnesses. We also have a fully equipped operation theatre, intensive care unit, and emergency department, providing 24/7 medical care to our patients.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  )
                },
                {
                  title: "Patient-Centric Approach",
                  desc: "We prioritize our patients' needs and comfort, ensuring that they receive the best possible care and treatment throughout their hospital stay.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  )
                },
                {
                  title: "Trusted Healthcare",
                  desc: "With over 30 years of experience, we have earned a reputation as a trusted healthcare provider in the community. We are committed to maintaining the highest standards of healthcare and strive to exceed our patients' expectations.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  )
                },
              ].map((feature, idx) => (
                <div key={idx} className="bg-gray-50/50 hover:bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 group flex flex-col items-start h-full">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#5b21b6]/20 group-hover:text-[#5b21b6] text-gray-600 transition-all duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2 font-heading group-hover:text-[#5b21b6] transition-colors">{feature.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Patients Speak Testimonial Section */}
      <section
        className="py-16 sm:py-20 bg-white"
        aria-labelledby="patients-speak"
      >
        <div className="mx-auto w-full max-w-[1666px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-12 font-heading">
            Patients Speak
          </h2>


          {/* Custom 5-Column Video Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 h-auto lg:h-[600px] items-stretch">

            {/* Column 1: Far Left (Centered Single Card) */}
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-two.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full aspect-[4/5]"
              >
                <video
                  src="/videos/testimonial-two.mp4"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-sm font-bold leading-tight mb-0.5">Mauritian Patient</h3>
                  <p className="text-gray-300 text-xs">Mr Fazil Hosany</p>
                </div>
              </button>
            </div>

            {/* Column 2: Inner Left (Two Stacked Cards) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-three.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2"
              >
                <video
                  src="/videos/testimonial-three.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-base font-bold leading-tight mb-0.5">Liver Failure</h3>
                  <p className="text-gray-300 text-xs">Baby Bhavika</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedVideo("/videos/testimonial-one.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2"
              >
                <video
                  src="/videos/testimonial-one.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-base font-bold leading-tight mb-0.5">Jaw Cancer</h3>
                  <p className="text-gray-300 text-xs">Dr. Abhilasha Agarwal</p>
                </div>
              </button>
            </div>

            {/* Column 3: Center (Tall Featured Card) */}
            <div className="h-[400px] lg:h-full">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-one.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-full"
              >
                <video
                  src="/videos/testimonial-one.mp4"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Large Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 p-8 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-bold font-heading mb-2 drop-shadow-md">Pre-term Babies</h3>
                  <p className="text-gray-200 text-lg font-medium">Ms Sakshi</p>
                </div>
              </button>
            </div>

            {/* Column 4: Inner Right (Two Stacked Cards) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-three.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2"
              >
                <video
                  src="/videos/testimonial-three.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-base font-bold leading-tight mb-0.5">Neurosurgical Treatment</h3>
                  <p className="text-gray-300 text-xs">Mr. Devender Jeet Singh</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedVideo("/videos/testimonial-two.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full h-1/2"
              >
                <video
                  src="/videos/testimonial-two.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-100 transition-transform">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-base font-bold leading-tight mb-0.5">Bone Marrow</h3>
                  <p className="text-gray-300 text-xs">Patient Father Mr Haider</p>
                </div>
              </button>
            </div>

            {/* Column 5: Far Right (Centered Single Card) */}
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setSelectedVideo("/videos/testimonial-three.mp4")}
                className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 w-full aspect-[4/5]"
              >
                <video
                  src="/videos/testimonial-three.mp4"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-sm font-bold leading-tight mb-0.5">Kidney Donor</h3>
                  <p className="text-gray-300 text-xs">Ms Paluk Sunger</p>
                </div>
              </button>
            </div>

          </div>

          <div className="mt-12 text-center">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-[#E85222] font-semibold text-xl hover:gap-3 transition-all"
            >
              View All Patient Stories
              <span className="w-8 h-8 rounded-full bg-[#E85222] text-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </div>

        </div>
        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                {selectedVideo?.includes("youtube") || selectedVideo?.includes("vimeo") ? (
                  <iframe
                    src={selectedVideo}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={selectedVideo || ""}
                    className="absolute inset-0 w-full h-full"
                    controls
                    autoPlay
                  ></video>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Our Locations Section - Apple Style */}
      <section id="our-locations" className="py-24 bg-[#f5f5f7] overflow-hidden">
        <div className="mx-auto max-w-[1666px] px-6 sm:px-8 lg:px-12 relative">
          {/* Section Header */}
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e3a8a] tracking-tight font-heading">
              Our Locations. <span className="text-[#6e6e73]">Always within reach.</span>
            </h2>

            {/* Navigation Buttons */}
            <div className="hidden sm:flex gap-4 mb-2">
              <button
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full bg-[#d2d2d7] hover:bg-[#86868b] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Previous locations"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-[#d2d2d7] hover:bg-[#86868b] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Next locations"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              {
                slug: "varanasi-main",
                city: "Varanasi",
                name: "Popular Hospital",
                address: "N-10 / 60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh, India",
                theme: "light",
                bgGradient: "bg-[#fbfbfd]",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "/images/branches/varanasi-main/1.webp"
              },
              {
                slug: "varanasi-city-centre",
                city: "Varanasi",
                name: "City Hospital",
                address: "Chandrika Nagar Colony, Sigra, Varanasi, Uttar Pradesh, India",
                theme: "light",
                bgGradient: "bg-[#fbfbfd]",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "/images/branches/varanasi-sigra/1.webp"
              },
              {
                slug: "mirzapur",
                city: "Mirzapur",
                name: "Popular Hospital",
                address: "Near Natwan Police Chowki, Jangi Road, Mirzapur Uttar Pradesh, India",
                theme: "light",
                bgGradient: "bg-[#fbfbfd]",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "/images/branches/mirzapur/1.webp"
              },
              {
                slug: "gopiganj",
                city: "Gopiganj",
                name: "Popular Hospital",
                address: "G.T. Road, Parao, Near Indus Ind Bank, Gopiganj, Uttar Pradesh, India",
                theme: "light",
                bgGradient: "bg-[#fbfbfd]",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "/images/branches/gopiganj/1.webp"
              },
              {
                slug: "bachhaon",
                city: "Bachhaon",
                name: "Popular Hospital",
                address: "Chunar Road, Bachhaon, Varanasi, Uttar Pradesh India",
                theme: "light",
                bgGradient: "bg-[#fbfbfd]",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "/images/branches/bachhaon/1.webp"
              }
            ].map((location, index) => (
              <div
                key={location.slug}
                className="relative flex-shrink-0 w-[85vw] sm:w-[380px] h-[480px] sm:h-[520px] rounded-[32px] overflow-hidden snap-center group transition-transform duration-500 hover:scale-[1.02] shadow-xl border border-gray-100/10"
              >
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-base font-semibold tracking-wide uppercase text-[#00B4D8] drop-shadow-sm">
                      {location.city}
                    </span>
                    <h3 className="mt-2 text-3xl font-bold leading-tight font-heading text-white drop-shadow-md">
                      {location.name}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-white/80 drop-shadow-sm">
                      {location.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/locations/${location.slug}`}
                      className="px-6 py-3 rounded-full font-medium transition-colors bg-white text-black hover:bg-gray-100"
                    >
                      Get Directions
                    </Link>
                  </div>
                </div>

                {/* Background Image with Dark Gradient Overlay */}
                <div className="absolute inset-0 z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50" />
                </div>

                <img
                  src={location.image}
                  alt={location.name}
                  className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24x7 Services Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden" aria-labelledby="24-7-services">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 mix-blend-multiply"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl translate-y-1/2 mix-blend-multiply"></div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center mb-16 text-center">

            {/* Header Lockup */}
            <div className="relative inline-block mb-6">
              <div className="flex items-center justify-center gap-4">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e3a8a] font-heading tracking-tight">
                  24x7 Services
                </h2>
              </div>
            </div>

            {/* Clean Divider */}
            <div className="w-24 h-1.5 bg-[#E85222] rounded-full mx-auto mb-8 shadow-sm"></div>

            {/* Subtitle */}
            <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              We cover a big variety of medical services, ensuring you have access to critical care whenever you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency",
                desc: "Equipped With the State of the Art facility to manage all types of Trauma, Medical Queries, or Surgical emergencies. Our Emergency Department.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                )
              },
              {
                title: "Blood Bank",
                desc: "The 24hour Blood Bank present within the campus is equipped with an ultramodern collection centre, component lab and single donor plateletpheresis (SDP).",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                )
              },
              {
                title: "Ambulance",
                desc: "Popular Hospital has Air Ambulance services. It also provides ground ambulance services to shift patient from one hospital to another hospital.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                customIcon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                ),
                customIcon2: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                )
              },
              {
                title: "Diagnostics & Imaging",
                desc: "The Pathology Laboratory at Popular Hospital is fully licensed. The laboratory supplements its testing capability by using reference laboratories that provide high quality service.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                )
              },
              {
                title: "ICU Service",
                desc: "Intensive care Unit is needed if someone is seriously ill and requires intensive treatment and close monitoring, or surgery intensive care can help them to recover.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                )
              },
              {
                title: "Pharmacy",
                desc: "Hospital Pharmacy is situated in the campus of all the hospitals to facilitate patients fulfilling their emergency needs as well as the medicines as prescribed inside the hospital.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                )
              },
            ].map((service, idx) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 text-center text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(232,82,34,0.15)] hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#0b1c43] group relative overflow-hidden flex flex-col h-full"
              >

                <div className="flex justify-center mb-6">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center group-hover:bg-[#E85222] transition-colors duration-300">
                    <svg className="w-8 h-8 text-[#0b1c43] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.customIcon2 || service.icon}
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4 font-heading text-[#0b1c43] group-hover:text-[#E85222] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                  {service.desc}
                </p>

                <button className="mt-auto px-6 py-2 border-2 border-[#E85222] text-[#E85222] text-sm font-bold rounded-full hover:bg-[#E85222] hover:text-white transition-all duration-300 uppercase tracking-wide mx-auto">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Banner */}
      <section
        className="py-12 sm:py-16 bg-[#0b1c43]"
        aria-labelledby="appointment-banner"
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
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
                  Open For Appointments
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
            {/* Article Card 1 */}
            <article className="bg-[#EFF6FF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden">
                <Image
                  src="/images/latestnews/one.jpg"
                  alt="Medical Network"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-heading leading-tight">
                  Best Medical Network Directory For Physicians & Clients
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
                  Tips for Maintaining a Healthy Heart Hypertension, commonly
                  known as high blood...
                </p>
                <Link
                  href="/news/best-medical-network-directory"
                  className="inline-flex items-center gap-2 text-[#E85222] font-medium hover:text-[#d1451a] transition-colors text-sm sm:text-base"
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

            {/* Article Card 2 */}
            <article className="bg-[#EFF6FF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden">
                <Image
                  src="/images/latestnews/two.jpg"
                  alt="Regular Checkups"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-heading leading-tight">
                  The Importance of Regular Health Checkups
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
                  Tips for Maintaining a Healthy Heart Hypertension, commonly
                  known as high blood...
                </p>
                <Link
                  href="/news/importance-of-regular-health-checkups"
                  className="inline-flex items-center gap-2 text-[#E85222] font-medium hover:text-[#d1451a] transition-colors text-sm sm:text-base"
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

            {/* Article Card 3 */}
            <article className="bg-[#EFF6FF] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden">
                <Image
                  src="/images/latestnews/three.jpg"
                  alt="Stress Management"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-heading leading-tight">
                  Managing Better Stress for Better Mental Health
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
                  Tips for Maintaining a Healthy Heart Hypertension, commonly
                  known as high blood...
                </p>
                <Link
                  href="/news/managing-stress-for-better-mental-health"
                  className="inline-flex items-center gap-2 text-[#E85222] font-medium hover:text-[#d1451a] transition-colors text-sm sm:text-base"
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

      {/* Frequently Asked Questions Section */}
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
                question:
                  "Why is Popular Hospital recognised as one of the leading multispeciality hospital groups in India?",
                answer:
                  "Popular Hospital has earned recognition as one of India's leading multispeciality hospital groups through our commitment to excellence in healthcare delivery, state-of-the-art medical infrastructure, world-class technology, and a team of highly skilled medical professionals. We consistently maintain high standards of patient care, clinical outcomes, and medical innovation across all our specialties.",
              },
              {
                question:
                  "Which regions across India does Popular Hospital serve?",
                answer:
                  "Popular Hospital serves patients across multiple regions in India, with a network of hospitals strategically located in key cities and regions. Our presence spans major metropolitan areas and tier-2 cities, ensuring accessible, quality healthcare services to communities nationwide. Please visit our locations page to find the nearest Popular Hospital facility to you.",
              },
              {
                question:
                  "What distinguishes Popular Hospital as a top-rated hospital group in India?",
                answer:
                  "Popular Hospital stands out as a top-rated hospital group due to our comprehensive multispeciality services, advanced medical technology, internationally trained medical professionals, patient-centric approach, and consistent track record of successful clinical outcomes. We are also recognized for our commitment to medical research, innovation, and maintaining the highest standards of healthcare quality and safety.",
              },
              {
                question:
                  "How does Popular Hospital qualify as a premier multispeciality healthcare network in India?",
                answer:
                  "Popular Hospital qualifies as a premier multispeciality healthcare network through our extensive range of medical specialties, cutting-edge diagnostic and treatment facilities, comprehensive patient care services, and our ability to handle complex medical cases across various disciplines. Our integrated approach to healthcare, combined with our experienced medical teams and modern infrastructure, positions us as a leading healthcare provider in India.",
              },
              {
                question:
                  "What multispeciality healthcare services are offered at Popular Hospital in India?",
                answer:
                  "Popular Hospital offers a comprehensive range of multispeciality healthcare services including cardiology, oncology, neurology, orthopedics, gastroenterology, urology, nephrology, pulmonology, endocrinology, gynecology, pediatrics, and many more. We also provide advanced surgical procedures, critical care services, emergency medicine, diagnostic imaging, laboratory services, and preventive healthcare programs.",
              },
              {
                question:
                  "How can I book an appointment at Popular Hospital in India?",
                answer:
                  "You can book an appointment at Popular Hospital through multiple convenient methods: online through our website's appointment booking portal, by calling our patient care helpline, through our mobile app, or by visiting any of our hospital locations in person. Our online booking system allows you to select your preferred doctor, specialty, date, and time slot for your consultation.",
              },
              {
                question:
                  "Can I consult a specialist at Popular Hospital without a referral?",
                answer:
                  "Yes, you can directly consult a specialist at Popular Hospital without needing a referral. We offer walk-in consultations as well as scheduled appointments with specialists across all departments. Our patient care team can help guide you to the right specialist based on your health concerns.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 ${openFaqIndex === index
                  ? "border-[#2a7a8c] shadow-md"
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
                  <span className="text-sm sm:text-base font-medium text-[#1a3a5c] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${openFaqIndex === index
                      ? "border-[#2a7a8c] bg-[#2a7a8c] rotate-45"
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
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 sm:py-24 bg-white" aria-labelledby="contact-us">
        <div className="mx-auto w-full max-w-[1366px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_2fr] gap-8 lg:gap-12 items-stretch">
            {/* Left Column - Informational Cards */}
            <div className="flex flex-col gap-6 w-full lg:h-full">
              {/* OUR LOCATIONS Card */}
              <Link href="#our-locations" className="block flex-1 hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-purple-50 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl border border-purple-300 bg-transparent p-4 sm:p-5 md:p-6 flex items-center justify-center">
                    <div className="flex items-center justify-center gap-4 w-full h-full">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700"
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
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-heading">
                          OUR LOCATIONS
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          N-10 / 60, A-2, B.L.W. ROAD, KAKARMATTA, VARANASI 221004,UTTAR PRADESH, INDIA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* CONNECT WITH US Card */}
              <div className="bg-pink-50 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm flex-1 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl border border-pink-300 bg-transparent p-4 sm:p-5 md:p-6 flex items-center justify-center">
                  <div className="flex items-center justify-center gap-4 w-full h-full">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700"
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
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-heading">
                        CONNECT WITH US
                      </h3>
                      <div className="text-gray-700 text-sm sm:text-base space-y-1">
                        <p>CALL: +91-7800001896</p>
                        <p>CALL: +91-7800001895</p>
                        <p>EMAIL : info@popularhospitals.in</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VISITING HOURS Card */}
              <div className="bg-green-50 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm flex-1 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl border border-green-300 bg-transparent p-4 sm:p-5 md:p-6 flex items-center justify-center">
                  <div className="flex items-center justify-center gap-4 w-full h-full">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-heading">
                        VISITING HOURS
                      </h3>
                      <div className="text-gray-700 text-sm sm:text-base space-y-1">
                        <p>Sunday: 08:00 AM - 10:00 PM</p>
                        <p>Monday - Friday: 06:00 AM - 12:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-orange-50 rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-heading">
                Send Us A Message Anytime
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Your email address will not be published. Required fields are
                marked*
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  console.log("Form submitted:", formData);
                }}
                className="space-y-5"
              >
                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Message*
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Please write your message here"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none"
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Please enter name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Please enter email"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Please enter phone"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>

                {/* Website Field */}
                {/* Query Field */}
                <div>
                  <label
                    htmlFor="query"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Query*
                  </label>
                  <input
                    id="query"
                    type="text"
                    required
                    value={formData.query}
                    onChange={(e) =>
                      setFormData({ ...formData, query: e.target.value })
                    }
                    placeholder="Please enter your query"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
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
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    I agree with the terms.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#E85222" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d1451a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#E85222";
                  }}
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Send Message Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFF6FF] py-12">
        <div className="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-lg font-medium sm:text-left text-[#1a3a5c]">
            Need to talk to us? Call our helpline 24/7
          </p>
          <a
            href="tel:18001234567"
            className="text-2xl font-bold text-[#2957A4] underline hover:no-underline"
          >
            1800-123-4567
          </a>
        </div>
      </section>
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
  const desktopClasses = `md:bg-white md:rounded-none md:shadow-none md:min-h-0 md:p-0 md:flex-row md:items-center md:justify-center md:gap-1 lg:gap-3 md:px-2 lg:px-4 md:py-2 lg:py-4 md:w-auto md:flex-1 md:min-w-0 md:border-r md:border-gray-100 md:last:border-0 md:hover:bg-[#FBF8ED]`;

  return (
    <Link
      href={href}
      className={`${mobileClasses} ${desktopClasses} transition-all group`}
    >
      {/* Mobile Icon & Content */}
      <div className="flex flex-col items-start gap-2 md:hidden">
        <div className={`p-2 rounded-full ${isBlue ? 'bg-white/50' : 'bg-white/50'} text-gray-800`}>
          {/* Icons based on title for mobile */}
          {title.includes('Visitor') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : title.includes('Doctor') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          ) : title.includes('Location') ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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
