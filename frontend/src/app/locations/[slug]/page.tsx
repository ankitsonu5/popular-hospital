import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocationGallery } from "@/components/LocationGallery";

/* ───────────────── location data ───────────────── */
const locations = [
  {
    slug: "varanasi-main",
    city: "Varanasi",
    name: "Popular Hospital – Main Branch",
    heading: "Our Flagship Centre in Varanasi",
    title: "Popular Hospital, Varanasi (Main Branch)",
    description:
      "The main branch of Popular Hospital in Varanasi is equipped with state-of-the-art medical facilities, offering 24/7 emergency care, advanced diagnostics, surgical suites, and a full range of specialist departments. Located on B.L.W. Road, Kakarmatta, it serves as the primary hub for comprehensive healthcare in the region.",
    address: "N-10 / 60, A-2, B.L.W. Road, Kakarmatta, Varanasi, Uttar Pradesh, India",
    phone: "+91-7800001895",
    email: "info@popularhospital.in",
    timings: "Open 24 × 7 • OPD: 9 AM – 8 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5!2d82.9739!3d25.2677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e0f0f0f0f0f%3A0x0!2sPopular+Hospital+Kakarmatta!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.2677,82.9739&destination_place_id=popular+hospital+kakarmatta+varanasi",
    gallery: [
      "/images/branches/varanasi-main/1.webp",
      "/images/branches/varanasi-main/2.webp",
      "/images/branches/varanasi-main/3.webp",
      "/images/branches/varanasi-main/4.webp"
    ],
    image: "/images/branches/one.webp",
  },
  {
    slug: "varanasi-city-centre",
    city: "Varanasi",
    name: "City Hospital – Sigra",
    heading: "Advanced Care at Sigra, Varanasi",
    title: "City Hospital, Sigra Branch",
    description:
      "Situated in the heart of Varanasi at Chandrika Nagar Colony, Sigra, this branch provides outpatient consultations, advanced pathology services, ultrasound & X-ray diagnostics, and a modern pharmacy. Our experienced team of doctors ensures fast and compassionate care for every patient.",
    address: "Chandrika Nagar Colony, Sigra, Varanasi, Uttar Pradesh, India",
    phone: "+91-7800001895",
    email: "sigra@popularhospital.in",
    timings: "Mon – Sat: 8 AM – 9 PM • Sun: 9 AM – 2 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5!2d82.9900!3d25.3100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCity+Hospital+Sigra+Varanasi!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.3100,82.9900&destination_place_id=city+hospital+sigra+varanasi",
    gallery: [
      "/images/branches/varanasi-sigra/1.webp",
      "/images/branches/varanasi-sigra/2.webp",
      "/images/branches/varanasi-sigra/3.webp",
      "/images/branches/varanasi-sigra/4.webp"
    ],
    image: "/images/branches/two.webp",
  },
  {
    slug: "mirzapur",
    city: "Mirzapur",
    name: "Popular Hospital – Mirzapur",
    heading: "Trusted Healthcare in Mirzapur",
    title: "Popular Hospital, Mirzapur Branch",
    description:
      "Bringing quality healthcare closer to Mirzapur, this branch features multi-speciality OPD, a 24-hour pharmacy, and modern ICU facilities. Located near Natwan Police Chowki on Jangi Road, the branch serves patients from surrounding towns and villages with the same high standards of care.",
    address: "Near Natwan Police Chowki, Jangi Road, Mirzapur, Uttar Pradesh, India",
    phone: "+91-7800001895",
    email: "mirzapur@popularhospital.in",
    timings: "Open 24 × 7 • OPD: 9 AM – 7 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.0!2d82.5700!3d25.1500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPopular+Hospital+Mirzapur!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.1500,82.5700&destination_place_id=popular+hospital+mirzapur",
    gallery: [
      "/images/branches/mirzapur/1.webp",
      "/images/branches/mirzapur/2.webp",
      "/images/branches/mirzapur/3.webp",
      "/images/branches/mirzapur/4.webp"
    ],
    image: "/images/branches/one.webp",
  },
  {
    slug: "gopiganj",
    city: "Gopiganj",
    name: "Popular Hospital – Gopiganj",
    heading: "Community Healthcare at Gopiganj",
    title: "Popular Hospital, Gopiganj Branch",
    description:
      "The Gopiganj branch serves as an essential healthcare hub, providing general medicine, paediatrics, gynaecology, and emergency stabilisation services. Located on G.T. Road near Indus Ind Bank, our dedicated team of resident doctors and nurses ensures the community receives timely medical attention.",
    address: "G.T. Road, Parao, Near Indus Ind Bank, Gopiganj, Uttar Pradesh, India",
    phone: "+91-7800001895",
    email: "gopiganj@popularhospital.in",
    timings: "Mon – Sat: 8 AM – 8 PM • Emergencies 24/7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.0!2d82.5123!3d25.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPopular+Hospital+Gopiganj!5e0!3m2!1sen!2sin!4v1700000000003!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.5123,82.5123&destination_place_id=popular+hospital+gopiganj",
    gallery: [
      "/images/branches/gopiganj/1.webp",
      "/images/branches/gopiganj/2.webp",
      "/images/branches/gopiganj/3.webp",
      "/images/branches/gopiganj/4.webp"
    ],
    image: "/images/branches/populargopiganjfour.png",
  },
  {
    slug: "bachhaon",
    city: "Bachhaon",
    name: "Popular Hospital – Bachhaon",
    heading: "Reliable Care at Bachhaon",
    title: "Popular Hospital, Bachhaon Branch",
    description:
      "Our branch in Bachhaon brings Popular Hospital's legacy of quality and compassion to the area. Located on Chunar Road, this branch is equipped with digital X-ray, pathology lab, and consultations across general medicine, orthopaedics, and ENT, ensuring residents can access specialist healthcare conveniently.",
    address: "Chunar Road, Bachhaon, Varanasi, Uttar Pradesh, India",
    phone: "+91-7800001895",
    email: "bachhaon@popularhospital.in",
    timings: "Mon – Sat: 9 AM – 8 PM • Emergencies 24/7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d82.8500!3d25.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPopular+Hospital+Bachhaon!5e0!3m2!1sen!2sin!4v1700000000004!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.3500,82.8500&destination_place_id=popular+hospital+bachhaon",
    gallery: [
      "/images/branches/bachhaon/1.webp",
      "/images/branches/bachhaon/2.webp",
      "/images/branches/bachhaon/3.webp",
      "/images/branches/bachhaon/4.webp"
    ],
    image: "/images/branches/one.webp",
  },
];

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return { title: "Location Not Found" };
  return {
    title: `${loc.name} | Directions & Map – Popular Hospital`,
    description: loc.description,
  };
}

/* ───────────────── page component ───────────────── */
export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  return (
    <main className="bg-[#f5f5f7] min-h-screen">
      {/* ─── Contained Hero Section ─── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
            {/* Left Side: Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
              <nav className="mb-4 text-sm text-gray-500 font-medium flex items-center gap-2" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[#1e3a8a] transition-colors">
                  Home
                </Link>
                <span className="text-gray-300">/</span>
                <Link href="/#our-locations" className="hover:text-[#1e3a8a] transition-colors">
                  Locations
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-[#1e3a8a]">{location.city}</span>
              </nav>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00B4D8] text-xs font-bold uppercase tracking-widest border border-[#B2EBF2]">
                  {location.city} Branch
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] tracking-tight leading-tight mb-6 font-heading">
                {location.heading}
              </h1>

              <div className="w-20 h-1.5 rounded-full bg-[#E85222] mb-8" />

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {location.description}
              </p>

              {/* Contact Details Grid */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[#1e3a8a] border border-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1d1d1f] text-sm mb-1 uppercase tracking-wide">ADDRESS</h3>
                      <p className="text-gray-600 text-sm">{location.address}</p>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-200" />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    {/* Phone */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-green-600 border border-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1d1d1f] text-sm mb-1 uppercase tracking-wide">PHONE</h3>
                        <a href={`tel:${location.phone}`} className="text-[#1e3a8a] font-semibold text-sm hover:underline">
                          {location.phone}
                        </a>
                      </div>
                    </div>

                    {/* Timings */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-orange-500 border border-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1d1d1f] text-sm mb-1 uppercase tracking-wide">TIMINGS</h3>
                        <p className="text-gray-600 text-sm">{location.timings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#E85222] text-white rounded-full font-bold hover:bg-[#d1451a] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book an Appointment
                </Link>
                <a
                  href={`tel:${location.phone}`}
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#1e3a8a] text-white rounded-full font-bold hover:bg-[#15307a] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Gallery */}
            <LocationGallery images={location.gallery || [location.image]} name={location.name} />
          </div>
        </div>
      </section>

      {/* ─── Map Section Below ─── */}
      <section className="bg-white py-12">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">Location Map</h2>
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <iframe
                src={location.mapEmbedUrl}
                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}`}
                />
                {/* Floating Direction Button on Map */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 w-[90%] sm:w-auto">
                <a
                    href={location.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform border border-white/20 backdrop-blur-md"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    </svg>
                    Open In Google Maps
                </a>
                </div>
            </div>
        </div>
      </section>

      {/* ─── Other Locations ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1366px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">Grow with us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mt-3 font-heading">
            Our Other Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations
            .filter((l) => l.slug !== location.slug)
            .map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group relative rounded-3xl overflow-hidden h-[300px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/95 via-[#0b1c43]/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00B4D8] mb-1">
                    {loc.city}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    {loc.name.replace("Popular Hospital – ", "")}
                  </h3>
                  <div className="w-10 h-1 bg-[#E85222] rounded-full mb-2 group-hover:w-16 transition-all duration-300" />
                  <p className="text-white/80 text-sm mt-1 line-clamp-1">
                    {loc.address}
                  </p>
                  
                  <div className="mt-3 flex items-center text-white/90 text-sm font-semibold gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                    <svg className="w-4 h-4 text-[#E85222]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
