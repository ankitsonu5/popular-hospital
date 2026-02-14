import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ───────────────── location data ───────────────── */
const locations = [
  {
    slug: "gopiganj-main",
    city: "Gopiganj",
    name: "Popular Hospital – Main Branch",
    heading: "Our Flagship Centre in Gopiganj",
    title: "Popular Hospital, Gopiganj (Main Branch)",
    description:
      "The main branch of Popular Hospital in Gopiganj is equipped with state-of-the-art medical facilities, offering 24/7 emergency care, advanced diagnostics, surgical suites, and a full range of specialist departments. Located conveniently on G.T. Road near IndusInd Bank, it serves as the primary hub for comprehensive healthcare in the region.",
    address: "G.T. Road, Khagra, Near IndusInd Bank, Gopiganj, Bhadohi, UP",
    phone: "+91-9876543210",
    email: "info@popularhospital.in",
    timings: "Open 24 × 7 • OPD: 9 AM – 8 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d82.5123!3d25.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzQ0LjMiTiA4MsKwMzAnNDQuMyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.5123,82.5123&destination_place_id=popular+hospital+gopiganj",
    image: "/images/branches/One.webp",
  },
  {
    slug: "gopiganj-city-centre",
    city: "Gopiganj",
    name: "Popular Hospital – City Centre",
    heading: "Advanced Care at City Centre",
    title: "Popular Hospital, City Centre Branch",
    description:
      "Situated in the heart of Gopiganj at City Centre, this branch provides outpatient consultations, advanced pathology services, ultrasound & X-ray diagnostics, and a modern pharmacy. Our experienced team of doctors ensures fast and compassionate care for every patient.",
    address: "City Centre, Main Market Road, Gopiganj, Bhadohi, UP",
    phone: "+91-9876543211",
    email: "citycentre@popularhospital.in",
    timings: "Mon – Sat: 8 AM – 9 PM • Sun: 9 AM – 2 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d82.5200!3d25.5200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMxJzEyLjAiTiA4MsKwMzEnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.5200,82.5200&destination_place_id=popular+hospital+gopiganj+city+centre",
    image: "/images/branches/two.webp",
  },
  {
    slug: "bhadohi",
    city: "Bhadohi",
    name: "Popular Hospital – Bhadohi",
    heading: "Trusted Healthcare in Bhadohi",
    title: "Popular Hospital, Bhadohi Branch",
    description:
      "Bringing quality healthcare closer to Bhadohi, this branch features multi-speciality OPD, a 24-hour pharmacy, and modern ICU facilities. The branch is easily accessible from the main highway and serves patients from surrounding towns and villages with the same high standards of care.",
    address: "Near Bus Stand, Station Road, Bhadohi, UP 221401",
    phone: "+91-9876543212",
    email: "bhadohi@popularhospital.in",
    timings: "Open 24 × 7 • OPD: 9 AM – 7 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d82.5700!3d25.4000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzAwLjAiTiA4MsKwMzQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000002!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.4000,82.5700&destination_place_id=popular+hospital+bhadohi",
    image: "/images/branches/One.webp",
  },
  {
    slug: "aurai",
    city: "Aurai",
    name: "Popular Hospital – Aurai",
    heading: "Community Healthcare at Aurai",
    title: "Popular Hospital, Aurai Branch",
    description:
      "The Aurai branch serves as an essential healthcare outpost, providing general medicine, paediatrics, gynaecology, and emergency stabilisation services. With a dedicated team of resident doctors and nurses, we ensure the community receives timely medical attention without having to travel long distances.",
    address: "Main Road, Near Aurai Chauraha, Aurai, Bhadohi, UP",
    phone: "+91-9876543213",
    email: "aurai@popularhospital.in",
    timings: "Mon – Sat: 8 AM – 8 PM",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d82.5500!3d25.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzAwLjAiTiA4MsKwMzMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000003!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.4500,82.5500&destination_place_id=popular+hospital+aurai",
    image: "/images/branches/two.webp",
  },
  {
    slug: "jangiganj",
    city: "Jangiganj",
    name: "Popular Hospital – Jangiganj",
    heading: "Reliable Care at Jangiganj",
    title: "Popular Hospital, Jangiganj Branch",
    description:
      "Our newest branch in Jangiganj brings Popular Hospital's legacy of quality and compassion to the area. Equipped with digital X-ray, pathology lab, and consultations across general medicine, orthopaedics, and ENT, this branch ensures residents can access specialist healthcare conveniently.",
    address: "GT Road, Near Railway Crossing, Jangiganj, Bhadohi, UP",
    phone: "+91-9876543214",
    email: "jangiganj@popularhospital.in",
    timings: "Mon – Sat: 9 AM – 8 PM • Emergencies 24/7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d82.4800!3d25.4800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI4JzQ4LjAiTiA4MsKwMjgnNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000004!5m2!1sen!2sin",
    mapDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=25.4800,82.4800&destination_place_id=popular+hospital+jangiganj",
    image: "/images/branches/One.webp",
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
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* ─── Hero Banner ─── */}
      <section className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/90 via-[#0b1c43]/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <nav className="mb-4 text-sm text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{location.name}</span>
          </nav>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00B4D8] mb-2">
            {location.city}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            {location.heading}
          </h1>
        </div>
      </section>

      {/* ─── Full-Width Map ─── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 mt-10 relative z-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white">
          <iframe
            src={location.mapEmbedUrl}
            className="w-full h-[350px] sm:h-[450px] lg:h-[520px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Google Map – ${location.name}`}
          />
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border-t border-gray-100">
            <p className="text-sm text-gray-500">{location.address}</p>
            <a
              href={location.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3a8a] text-white text-sm font-semibold hover:bg-[#15307a] transition-colors shadow-md"
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
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ─── Details Below Map ─── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 mt-8 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Description Card ─── */}
          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
              {location.title}
            </h2>
            <div className="w-16 h-1 rounded-full bg-[#00B4D8] mb-6" />
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {location.description}
            </p>
          </div>

          {/* ─── Contact Card ─── */}
          <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#1e3a8a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
              </span>
              Contact &amp; Address
            </h3>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 flex-shrink-0 text-[#86868b]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {location.address}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex-shrink-0 text-[#86868b]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href={`tel:${location.phone}`}
                  className="text-[#1e3a8a] font-medium text-sm hover:underline"
                >
                  {location.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex-shrink-0 text-[#86868b]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href={`mailto:${location.email}`}
                  className="text-[#1e3a8a] font-medium text-sm hover:underline"
                >
                  {location.email}
                </a>
              </div>

              {/* Timings */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex-shrink-0 text-[#86868b]">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">{location.timings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Quick Actions Row ─── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/book"
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-2xl bg-[#E85222] text-white font-semibold text-sm hover:bg-[#d1451a] transition-colors shadow-md"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Book an Appointment
          </Link>

          <a
            href={`tel:${location.phone}`}
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-2xl bg-[#1e3a8a] text-white font-semibold text-sm hover:bg-[#15307a] transition-colors shadow-md"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Now
          </a>

          <a
            href={location.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-2xl bg-[#00B4D8] text-white font-semibold text-sm hover:bg-[#0096b4] transition-colors shadow-md"
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Get Directions
          </a>
        </div>

        {/* All Locations Link */}
        <div className="mt-6 text-center">
          <Link
            href="/#locations"
            className="inline-flex items-center gap-2 py-3 text-sm font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            View All Locations
          </Link>
        </div>

        {/* ─── Other Locations ─── */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-8">
            Other Locations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations
              .filter((l) => l.slug !== location.slug)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group relative rounded-3xl overflow-hidden h-[260px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/90 via-[#0b1c43]/30 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#00B4D8] mb-1">
                      {loc.city}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {loc.name.replace("Popular Hospital – ", "")}
                    </h3>
                    <p className="text-white/70 text-xs mt-1 line-clamp-1">
                      {loc.address}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
