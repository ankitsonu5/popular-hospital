import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LocationGallery } from "@/components/LocationGallery";
import { fetchBranches, fetchBranch, getImageUrl } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = await fetchBranch(slug);
  if (!loc) return { title: "Location Not Found" };
  return {
    title: `${loc.name} | Directions & Map - Popular Hospital`,
    description: loc.description,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await fetchBranch(slug);
  if (!location) notFound();

  const allBranches = await fetchBranches();

  const gallery = [
    location.image_one,
    location.image_two,
    location.image_three,
    location.image_four,
  ]
    .filter(Boolean)
    .map((img) => getImageUrl(img!));

  const mainImage = gallery[0] || "/about-section-image.png";

  return (
    <main className="locations-font-scope min-h-screen bg-white">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-0 h-[220px] bg-[#f5f7fb]" />
        <div className="absolute left-0 top-0 hidden h-full w-[38%] bg-[#1e3a8a] lg:block" />

        <div className="relative mx-auto max-w-[1366px] px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative order-2 flex flex-col justify-center rounded-2xl bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.16)] sm:p-7 lg:order-1">
              <nav
                className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-[#1e3a8a] transition-colors">
                  Home
                </Link>
                <span className="text-slate-300">/</span>
                <Link
                  href="/our-locations"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  Locations
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-[#1e3a8a]">{location.city}</span>
              </nav>

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded bg-[#1e3a8a]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#1e3a8a]">
                  {location.city} Branch
                </span>
              </div>

              <h1 className="mb-5 font-jakarta text-3xl font-black leading-tight tracking-normal text-[#1d1d1f] sm:text-4xl lg:text-5xl">
                {location.heading || location.name}
              </h1>

              <p className="mb-7 max-w-2xl text-[15px] font-semibold leading-7 text-slate-600 sm:text-base">
                {location.description}
              </p>

              <div className="mb-7 grid gap-3">
                <div className="group relative overflow-hidden rounded-xl border border-[#1e3a8a]/15 bg-gradient-to-r from-[#f8fafc] to-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#1e3a8a]" />
                  <div className="flex items-start gap-4 pl-1">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-[#1e3a8a] shadow-[0_8px_20px_rgba(30,58,138,0.10)] ring-1 ring-[#1e3a8a]/10">
                    <svg
                      className="h-5 w-5"
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
                  </div>
                  <div className="min-w-0">
                    <h2 className="mb-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#1e3a8a]">
                      Address
                    </h2>
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {location.address}
                    </p>
                  </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {location.phone && (
                    <div className="flex items-center gap-4 rounded-xl border border-[#1e3a8a]/15 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition hover:border-[#1e3a8a]/30">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef3ff] text-[#1e3a8a]">
                        <svg
                          className="h-5 w-5"
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
                      <div>
                        <h2 className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                          Phone
                        </h2>
                        <a
                          href={`tel:${location.phone}`}
                          className="text-sm font-black leading-tight text-[#1e3a8a] hover:text-[#E85222]"
                        >
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {location.timings && (
                    <div className="flex items-center gap-4 rounded-xl border border-[#E85222]/15 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition hover:border-[#E85222]/30">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#fff0eb] text-[#E85222]">
                        <svg
                          className="h-5 w-5"
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
                      <div>
                        <h2 className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                          Timings
                        </h2>
                        <p className="text-sm font-bold leading-6 text-slate-700">
                          {location.timings}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#E85222] px-5 text-sm font-black text-white shadow-[0_10px_24px_rgba(232,82,34,0.20)] transition hover:bg-[#d8471e]"
                >
                  <svg
                    className="h-5 w-5"
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
                {location.phone && (
                  <a
                    href={`tel:${location.phone}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded border border-[#1e3a8a] bg-white px-5 text-sm font-black text-[#1e3a8a] transition hover:bg-[#1e3a8a] hover:text-white"
                  >
                    <svg
                      className="h-5 w-5"
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
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <LocationGallery
                images={gallery.length > 0 ? gallery : [mainImage]}
                name={location.name}
              />
            </div>
          </div>
        </div>
      </section>

      {location.mapEmbedUrl && (
        <section className="bg-[#f8fafc] py-14">
          <div className="mx-auto max-w-[1366px] px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-black uppercase tracking-widest text-[#E85222]">
                  Visit us
                </span>
                <h2 className="mt-2 font-jakarta text-3xl font-black leading-tight text-[#1d1d1f] sm:text-4xl">
                  Map and directions
                </h2>
              </div>
              {location.mapDirectionsUrl && (
                <a
                  href={location.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#1e3a8a] px-5 text-sm font-black text-white transition hover:bg-[#284a91]"
                >
                  Open In Google Maps
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </a>
              )}
            </div>
            <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)] sm:h-[460px]">
              <iframe
                src={location.mapEmbedUrl}
                className="h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}`}
              />
            </div>
          </div>
        </section>
      )}

      {/* Other Locations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1366px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">
            Grow with us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] mt-3 font-heading">
            Our Other Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allBranches
            .filter((l: any) => l.slug !== location.slug)
            .map((loc: any) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group relative rounded-3xl overflow-hidden h-[300px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <Image
                  src={getImageUrl(loc.image_one) || "/about-section-image.png"}
                  alt={loc.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43]/95 via-[#0b1c43]/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00B4D8] mb-1">
                    {loc.city}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight mb-2">
                    {loc.name.replace(/^Popular Hospital\s[–-]\s/, "")}
                  </h3>
                  <div className="w-10 h-1 bg-[#E85222] rounded-full mb-2 group-hover:w-16 transition-all duration-300" />
                  <p className="text-white/80 text-sm mt-1 line-clamp-1">
                    {loc.address}
                  </p>

                  <div className="mt-3 flex items-center text-white/90 text-sm font-semibold gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                    <svg
                      className="w-4 h-4 text-[#E85222]"
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
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
