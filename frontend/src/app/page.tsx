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
    website: "",
    agreeTerms: false,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          <video
            className="w-full h-auto object-contain block"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-b from-hospital-navy/[0.125] to-teal-900/[0.125]"
            aria-hidden
          />
        </div>
      </section>

      <section className="relative mt-12 md:-mt-20 z-10 pb-0 sm:pb-0 md:pb-14">
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
            <SimpleCard href="/branches" title="Our Locations" variant="blue" />
            <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>
            <SimpleCard href="/contact" title="Connect with Us" isLast={true} variant="green" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-16 pt-0 pb-16 sm:pt-0 sm:pb-20 md:py-20 bg-white" aria-labelledby="about-us">
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
                  Embrace a world of comprehensive healthcare where your
                  well-being takes center stage. At Popular Hospital, we're
                  dedicated to providing you with personalized and compassionate
                  medical services.
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
                  Ut wisi enim ad minim veniam, quis laore nostrud exerci tation
                  ulm hedi corper turet suscipit lobortis nisl ut aliquip erat
                  volutpat autem vel eum iriure dolor in hendrerit in vulputate
                  velit.
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
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                   <span className="text-xs font-bold uppercase tracking-widest text-[#666] mb-3 block">
                     Excellence in Care
                   </span>
                   <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1d1d1f] font-heading tracking-tight">
                     Specialized Departments.
                   </h2>
                </div>
                 <Link
                    href="/services"
                    className="hidden md:flex items-center gap-2 text-[#0066cc] hover:underline font-medium text-lg transition-all"
                  >
                    View all departments
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { title: "Cardiology", desc: "Comprehensive heart care including diagnostics and surgery.", icon: "heart" },
              { title: "Neuro Surgery", desc: "Advanced surgical treatments for brain and spine disorders.", icon: "brain" },
              { title: "Gastroenterology", desc: "Expert care for digestive system and liver heath.", icon: "stomach" },
              { title: "Nephrology", desc: "Specialized kidney care and dialysis services.", icon: "kidney" },
              { title: "Radiology", desc: "Advanced imaging services including X-ray, MRI, and CT Scan.", icon: "scan" },
              { title: "Oncology", desc: "Comprehensive cancer diagnosis and treatment.", icon: "ribbon" },
              { title: "Urology", desc: "Treatment for urinary tract and male reproductive system.", icon: "bladder" },
              { title: "Burns & Plastic", desc: "Reconstructive and cosmetic surgery services.", icon: "burn" },
              { title: "Laparoscopic", desc: "Minimally invasive general surgical procedures.", icon: "scalpel" },
              { title: "Obstetrics", desc: "Care for pregnancy, childbirth, and women's health.", icon: "baby" },
              { title: "Paediatrics", desc: "Medical care for infants, children, and adolescents.", icon: "child" },
              { title: "Orthopaedic", desc: "Treatment for bones, joints, ligaments, and nerves.", icon: "bone" },
              { title: "General Medicine", desc: "Primary care for overall health and wellbeing.", icon: "pill" },
              { title: "ENT", desc: "Ear, Nose, and Throat diagnostics and surgery.", icon: "ear" },
              { title: "Ophthalmology", desc: "Advanced eye care and vision surgery.", icon: "eye" },
              { title: "Dental Care", desc: "Comprehensive dentistry and oral surgeries.", icon: "tooth" },
              { title: "Pulmonology", desc: "Respiratory and lung health specialists.", icon: "lungs" },
              { title: "Pathology", desc: "Advanced diagnostic laboratory services.", icon: "microscope" },
            ].slice(0, 8).map((service, idx) => (
              <div
                key={service.title}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[320px] overflow-hidden"
              >
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Department</span>
                  <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4 font-heading leading-tight max-w-[80%]">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[90%] font-medium">
                    {service.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-end justify-between">
                    <Link
                      href={service.title === 'Pathology' ? '/specialties/pathology' : service.title === 'Radiology' ? '/specialties/radiology' : `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="ml-auto w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all shadow-lg group-hover:bg-[#0066cc]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
              </div>
            ))}
          </div>
          
           <div className="mt-12 text-center md:hidden">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[#0066cc] font-medium text-lg"
                  >
                    View all departments
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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

      {/* Patients Speak Testimonial Section */}
      <section
        className="py-16 sm:py-20 bg-white"
        aria-labelledby="patients-speak"
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-12 font-heading">
            Patients Speak
          </h2>

          {/* Top Division - Left to Right Scroll */}
          <div className="mb-8 overflow-hidden">
            <div
              className="flex gap-6 animate-scroll-left pause-scroll"
              style={{ width: "max-content" }}
            >
              {[
                {
                  type: "text",
                  name: "Shachi",
                  text: "Dear Dr. Jayanti, I want to thank you for the exceptional care you provided during my lumpectomy. Your precise surgical skills and compassionate approach laid the foundation for my recovery and gave me hope during a challenging time.",
                  bgColor: "bg-blue-50",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-one.mp4",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-two.mp4",
                },
                {
                  type: "text",
                  name: "Rajesh Kumar",
                  text: "The entire team at Popular Hospital was professional and caring. From admission to discharge, every staff member made sure I was comfortable and well-informed about my treatment.",
                  bgColor: "bg-teal-50",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-three.mp4",
                },
              ].map((testimonial, index) => (
                <div
                  key={`top-${index}`}
                  className={`flex-shrink-0 rounded-xl shadow-md overflow-hidden ${testimonial.type === "text"
                      ? "w-[300px] sm:w-[400px] lg:w-[500px]"
                      : "w-[260px] sm:w-[300px] lg:w-[360px]"
                    }`}
                >
                  {testimonial.type === "text" ? (
                    <div
                      className={`${testimonial.bgColor} p-6 h-full flex flex-col`}
                    >
                      <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {testimonial.name}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedVideo(testimonial.videoUrl || null)
                      }
                      className="relative h-[240px] sm:h-[280px] lg:h-[320px] bg-gray-200 flex items-center justify-center cursor-pointer w-full group"
                    >
                      <video
                        src={testimonial.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[12px] border-l-[#E85222] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                {
                  type: "text",
                  name: "Shachi",
                  text: "Dear Dr. Jayanti, I want to thank you for the exceptional care you provided during my lumpectomy. Your precise surgical skills and compassionate approach laid the foundation for my recovery and gave me hope during a challenging time.",
                  bgColor: "bg-blue-50",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-one.mp4",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-two.mp4",
                },
                {
                  type: "text",
                  name: "Rajesh Kumar",
                  text: "The entire team at Popular Hospital was professional and caring. From admission to discharge, every staff member made sure I was comfortable and well-informed about my treatment.",
                  bgColor: "bg-teal-50",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-three.mp4",
                },
              ].map((testimonial, index) => (
                <div
                  key={`top-duplicate-${index}`}
                  className={`flex-shrink-0 rounded-xl shadow-md overflow-hidden ${testimonial.type === "text"
                      ? "w-[300px] sm:w-[400px] lg:w-[500px]"
                      : "w-[260px] sm:w-[300px] lg:w-[360px]"
                    }`}
                >
                  {testimonial.type === "text" ? (
                    <div
                      className={`${testimonial.bgColor} p-6 h-full flex flex-col`}
                    >
                      <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {testimonial.name}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedVideo(testimonial.videoUrl || null)
                      }
                      className="relative h-[240px] sm:h-[280px] lg:h-[320px] bg-gray-200 flex items-center justify-center cursor-pointer w-full group"
                    >
                      <video
                        src={testimonial.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[12px] border-l-[#E85222] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Division - Right to Left Scroll */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 animate-scroll-right pause-scroll"
              style={{ width: "max-content" }}
            >
              {[
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/heroMain.mp4",
                },
                {
                  type: "text",
                  name: "Niyati Shah",
                  text: "Dr. Sridhar is a lifesaver. My father was diagnosed with stage 4 lung cancer and given only six months. Thankfully, we found Dr. Sridhar, and after Cyberknife treatment, my father's condition improved significantly. We are forever grateful.",
                  bgColor: "bg-teal-100",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-one.mp4",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-two.mp4",
                },
                {
                  type: "text",
                  name: "Priya Sharma",
                  text: "The pediatric care at Popular Hospital is outstanding. My daughter received excellent treatment, and the doctors were patient and understanding with both of us. Highly recommended!",
                  bgColor: "bg-blue-100",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-three.mp4",
                },
              ].map((testimonial, index) => (
                <div
                  key={`bottom-${index}`}
                  className={`flex-shrink-0 rounded-xl shadow-md overflow-hidden ${testimonial.type === "text"
                      ? "w-[300px] sm:w-[400px] lg:w-[500px]"
                      : "w-[260px] sm:w-[300px] lg:w-[360px]"
                    }`}
                >
                  {testimonial.type === "text" ? (
                    <div
                      className={`${testimonial.bgColor} p-6 h-full flex flex-col`}
                    >
                      <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {testimonial.name}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedVideo(testimonial.videoUrl || null)
                      }
                      className="relative h-[240px] sm:h-[280px] lg:h-[320px] bg-gray-200 flex items-center justify-center cursor-pointer w-full group"
                    >
                      <video
                        src={testimonial.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[12px] border-l-[#E85222] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/heroMain.mp4",
                },
                {
                  type: "text",
                  name: "Niyati Shah",
                  text: "Dr. Sridhar is a lifesaver. My father was diagnosed with stage 4 lung cancer and given only six months. Thankfully, we found Dr. Sridhar, and after Cyberknife treatment, my father's condition improved significantly. We are forever grateful.",
                  bgColor: "bg-teal-100",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-one.mp4",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-two.mp4",
                },
                {
                  type: "text",
                  name: "Priya Sharma",
                  text: "The pediatric care at Popular Hospital is outstanding. My daughter received excellent treatment, and the doctors were patient and understanding with both of us. Highly recommended!",
                  bgColor: "bg-blue-100",
                },
                {
                  type: "video",
                  name: "Patient Review",
                  thumbnail:
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
                  videoUrl: "/videos/testimonial-three.mp4",
                },
              ].map((testimonial, index) => (
                <div
                  key={`bottom-duplicate-${index}`}
                  className={`flex-shrink-0 rounded-xl shadow-md overflow-hidden ${testimonial.type === "text"
                      ? "w-[300px] sm:w-[400px] lg:w-[500px]"
                      : "w-[260px] sm:w-[300px] lg:w-[360px]"
                    }`}
                >
                  {testimonial.type === "text" ? (
                    <div
                      className={`${testimonial.bgColor} p-6 h-full flex flex-col`}
                    >
                      <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {testimonial.name}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setSelectedVideo(testimonial.videoUrl || null)
                      }
                      className="relative h-[240px] sm:h-[280px] lg:h-[320px] bg-gray-200 flex items-center justify-center cursor-pointer w-full group"
                    >
                      <video
                        src={testimonial.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        autoPlay
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                      <div className="relative z-10 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[12px] border-l-[#E85222] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
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
      <section className="py-24 bg-[#f5f5f7] overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 relative">
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
                city: "Varanasi",
                name: "Popular Hospital",
                address: "N-10 / 60, A-2, B.L.W. Road, Kakarmatta",
                theme: "dark",
                bgGradient: "bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e]",
                textColor: "text-white",
                subTextColor: "text-gray-400",
                image: "/images/branches/One.webp"
              },
              {
                city: "Varanasi",
                name: "City Hospital",
                address: "Chandrika Nagar Colony, Sigra",
                theme: "light",
                bgGradient: "bg-white",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "/images/branches/two.png"
              },
              {
                city: "Mirzapur",
                name: "Popular Hospital",
                address: "Near Narayan Police Chowki, Jangi Road",
                theme: "dark",
                bgGradient: "bg-[#000000]",
                textColor: "text-[#f5f5f7]",
                subTextColor: "text-gray-400",
                image: "https://images.unsplash.com/photo-1516549655169-df83a253836f?q=80&w=2070&auto=format&fit=crop"
              },
              {
                city: "Gopiganj",
                name: "Popular Hospital",
                address: "G.T. Road, Khagra, Near IndusInd Bank",
                theme: "light",
                bgGradient: "bg-[#fbfbfd]",
                textColor: "text-[#1d1d1f]",
                subTextColor: "text-[#86868b]",
                image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop"
              },
              {
                city: "Bachhaon",
                name: "Popular Hospital",
                address: "Chunar Road, Bachhaon, Varanasi",
                theme: "dark",
                bgGradient: "bg-[#161617]",
                textColor: "text-white",
                subTextColor: "text-gray-500",
                image: "https://images.unsplash.com/photo-1596541223806-117580afc848?q=80&w=2028&auto=format&fit=crop"
              }
            ].map((location, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-[85vw] sm:w-[380px] h-[480px] sm:h-[520px] rounded-[32px] overflow-hidden snap-center group transition-transform duration-500 hover:scale-[1.02] shadow-xl border border-gray-100/10"
              >
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                  <div>
                    <span className={`text-base font-semibold tracking-wide uppercase ${location.theme === 'dark' ? 'text-hospital-orange' : 'text-hospital-teal'}`}>
                      {location.city}
                    </span>
                    <h3 className={`mt-2 text-3xl font-bold leading-tight font-heading ${location.textColor}`}>
                      {location.name}
                    </h3>
                    <p className={`mt-3 text-lg leading-relaxed ${location.subTextColor}`}>
                      {location.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className={`px-6 py-3 rounded-full font-medium transition-colors ${location.theme === 'dark'
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-black text-white hover:bg-gray-800'
                      }`}>
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-10">
                  <div className={`absolute inset-0 bg-gradient-to-b ${location.theme === 'dark'
                      ? 'from-black/90 via-black/50 to-transparent'
                      : 'from-white/95 via-white/60 to-transparent'
                    }`} />
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
                    {/* Calendar base */}
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M8 2v4M16 2v4M3 10h18" />
                    {/* Calendar grid lines */}
                    <path d="M8 14h8M8 18h8" strokeWidth={1} />
                    {/* Stethoscope - tube draped over calendar */}
                    <path
                      d="M6 8c0-1 1-2 2-2h1M18 8c0-1-1-2-2-2h-1"
                      strokeWidth={2}
                    />
                    <path d="M9 6c0 1 1 2 2 2h2c1 0 2-1 2-2" strokeWidth={2} />
                    {/* Stethoscope chest piece */}
                    <circle cx="10" cy="16" r="2" fill="currentColor" />
                    <circle cx="14" cy="16" r="2" fill="currentColor" />
                    <path d="M10 16h4" strokeWidth={2} />
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
                  src="/about-section-image.png"
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
                  src="/about-section-image.png"
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
                  src="/about-section-image.png"
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
              <div className="bg-purple-50 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm flex-1 flex items-center justify-center">
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
                        1485 Bayshore Blvd. Ste 154, San Francisco, CA 95124
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                        <p>CALL: +011 3253 4567</p>
                        <p>+011 3253 4569</p>
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
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Website*
                  </label>
                  <input
                    id="website"
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    placeholder="Please enter website"
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
  const desktopClasses = `md:bg-white md:rounded-none md:shadow-none md:min-h-0 md:p-0 md:flex-row md:items-center md:justify-center md:gap-3 md:px-4 md:py-4 md:w-auto md:flex-1 md:min-w-0 md:border-r md:border-gray-100 md:last:border-0 md:hover:bg-[#FBF8ED]`;

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
