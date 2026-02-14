import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

/* ───────────────── coverage detail data ───────────────── */
const coverageDetails = [
  {
    slug: "dr-akshat-ini-cet-2025",
    title:
      "Hearty congratulations to Dr. Akshat Kaushik for his outstanding 8th All India Rank in INI-CET 2025",
    date: "January 15, 2025",
    source: "Dainik Jagran",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Dr. Akshat Kaushik, son of Dr. A.K. Kaushik, Chairman of Popular Group of Hospitals, has secured an outstanding 8th All India Rank in INI-CET 2025. This remarkable achievement is a proud moment for the entire Popular Hospital family and the Bhadohi community.",
      "INI-CET (Institute of National Importance Combined Entrance Test) is one of the most competitive medical entrance examinations in India, taken by thousands of medical graduates aspiring for super-specialty courses at premier institutions like AIIMS, JIPMER, PGIMER, and NIMHANS.",
      "Dr. Akshat's exceptional performance reflects the academic culture and values instilled by the Kaushik family, who have dedicated their lives to advancing healthcare in the region. His success serves as an inspiration for young medical students across Uttar Pradesh.",
      "The Popular Hospital family extends its heartiest congratulations to Dr. Akshat Kaushik and wishes him a bright future in his medical career. This achievement further strengthens the hospital's legacy of excellence in healthcare education and practice.",
    ],
  },
  {
    slug: "dr-akshat-good-rank-cet",
    title:
      "Congratulations to Dr. Akshat for securing a good rank in CET",
    date: "December 20, 2024",
    source: "Amar Ujala",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Dr. Akshat Kaushik has once again made the Popular Hospital family proud by securing an excellent rank in the CET examination. His dedication to academic excellence continues to inspire young medical professionals across the region.",
      "The CET examination is a highly competitive entrance test for postgraduate medical courses, and Dr. Akshat's consistent performance in these examinations is a testament to his hard work and commitment to medical education.",
      "Dr. A.K. Kaushik, Chairman of Popular Group of Hospitals, expressed his pride in his son's achievement, stating that this success reaffirms the importance of combining clinical practice with academic excellence.",
      "The entire medical fraternity of Popular Hospital congratulates Dr. Akshat on this achievement and looks forward to his continued contributions to the field of medicine.",
    ],
  },
  {
    slug: "ivf-news-amar-ujala",
    title: "IVF News In Amar Ujala",
    date: "November 10, 2024",
    source: "Amar Ujala",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Popular Hospital's IVF department has been featured in Amar Ujala for its cutting-edge fertility treatments and successful outcomes. The hospital has helped numerous couples achieve their dream of parenthood through advanced assisted reproductive technologies.",
      "The IVF Center at Popular Hospital is equipped with state-of-the-art laboratory facilities, laminar airflow systems, and the latest embryology equipment. The center offers a comprehensive range of fertility services including IVF, ICSI, IUI, and embryo freezing.",
      "Under the guidance of experienced fertility specialists, the center has achieved consistently high success rates that are comparable to the best IVF centers in the country. The team follows a patient-centric approach, providing emotional support alongside medical treatment.",
      "The Amar Ujala coverage highlighted the hospital's commitment to making advanced fertility treatments accessible and affordable for couples in the region, eliminating the need for patients to travel to metropolitan cities for IVF treatment.",
    ],
  },
  {
    slug: "dengue-ward-inauguration",
    title: "Popular Hospital inaugurated dengue ward",
    date: "September 4, 2024",
    source: "Amar Ujala",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "In response to the growing dengue cases in the region, Popular Hospital has inaugurated a dedicated dengue ward equipped with specialized monitoring equipment, trained staff, and comprehensive treatment protocols to provide the best care for dengue patients.",
      "The new dengue ward features advanced platelet monitoring systems, isolation facilities, and a dedicated nursing team trained in managing dengue fever complications including Dengue Hemorrhagic Fever (DHF) and Dengue Shock Syndrome (DSS).",
      "Dr. A.K. Kaushik, Chairman of Popular Group of Hospitals, inaugurated the ward and emphasized the hospital's commitment to being prepared for seasonal disease outbreaks. The ward has been designed to handle a surge in patients during the monsoon season.",
      "The inauguration was covered by Amar Ujala and other regional media outlets, highlighting Popular Hospital's proactive approach to public health challenges and its role as a leading healthcare provider in the region.",
    ],
  },
  {
    slug: "dr-kaushik-felicitated-by-cm",
    title:
      "Dr. A.K. Kaushik, Chairman Popular Group of Hospitals was felicitated by Chief Minister Sh. Yogi Adityanath ji",
    date: "August 15, 2024",
    source: "Hindustan",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Dr. A.K. Kaushik, Chairman of Popular Group of Hospitals, was honored and felicitated by the Chief Minister of Uttar Pradesh, Shri Yogi Adityanath ji, for his outstanding contribution to healthcare services in the region.",
      "The felicitation ceremony recognized Dr. Kaushik's decades-long commitment to providing quality healthcare to the people of Bhadohi, Varanasi, and surrounding districts. Under his leadership, Popular Hospital has grown from a single facility to a network of multi-specialty hospitals.",
      "Chief Minister Yogi Adityanath praised Dr. Kaushik's efforts in making advanced medical treatments accessible to rural and semi-urban populations, noting that Popular Hospital has significantly reduced the need for patients to travel to big cities for specialized care.",
      "This recognition from the state's highest office is a testament to the trust and reputation that Popular Hospital has built over the years through its unwavering dedication to healthcare excellence and community service.",
    ],
  },
  {
    slug: "orthopaedics-milestone-press-conference",
    title:
      "Press conference on 29 April 2023 about New Milestone in Orthopaedics Department of Popular Hospital",
    date: "April 29, 2023",
    source: "Press Conference",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Popular Hospital held a press conference to announce a new milestone achieved by the Orthopaedics Department. The department has successfully performed advanced joint replacement surgeries and complex trauma procedures using the latest techniques and technology.",
      "The press conference highlighted the department's adoption of computer-navigated joint replacement surgery, which offers greater precision, faster recovery, and longer-lasting results compared to conventional methods. The hospital is among the few facilities in the region to offer this advanced technology.",
      "Dr. A.K. Kaushik shared the vision of making Popular Hospital a center of excellence for orthopedic care, with plans to introduce robotic-assisted surgery and 3D-printed implants in the near future.",
      "Media representatives from various regional and national publications attended the press conference and covered the event extensively, bringing attention to the hospital's advancements in orthopedic surgery.",
    ],
  },
  {
    slug: "successful-knee-transplant",
    title:
      "Successful B/L Knee Transplant of A Couple At Popular Hospital",
    date: "March 12, 2023",
    source: "Dainik Jagran",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "In a remarkable medical achievement, Popular Hospital successfully performed bilateral knee transplant surgery on a couple simultaneously. The surgeries were carried out by a team of expert orthopedic surgeons under the leadership of the Orthopaedics Department head.",
      "Both the husband and wife had been suffering from severe osteoarthritis in both knees, which had significantly impacted their mobility and quality of life. The decision to perform both surgeries simultaneously was made to reduce overall hospital stay and recovery time.",
      "The procedures were completed successfully using the latest minimally invasive techniques, and both patients were able to walk with support within 48 hours of surgery. Their recovery has been remarkable, and they are now leading active, pain-free lives.",
      "This inspiring story was covered by Dainik Jagran and garnered widespread attention, showcasing Popular Hospital's expertise in complex orthopedic procedures and its patient-centric approach to care.",
    ],
  },
  {
    slug: "safe-motherhood-day",
    title: "Safe Motherhood Day Celebrations at Popular Hospital Varanasi",
    date: "February 14, 2023",
    source: "Amar Ujala",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Popular Hospital Varanasi celebrated Safe Motherhood Day with a series of awareness programs, free health checkups for expecting mothers, and educational sessions on maternal health. The event was attended by hundreds of women from the community.",
      "The celebrations included interactive sessions on prenatal care, nutrition during pregnancy, importance of institutional deliveries, and postpartum care. Expert gynecologists and obstetricians from Popular Hospital conducted these sessions and addressed queries from attendees.",
      "Free ultrasound screenings, blood tests, and health assessments were provided to expecting and new mothers as part of the hospital's commitment to maternal and child health. The hospital also distributed prenatal care kits to participants.",
      "The event was covered by Amar Ujala and highlighted Popular Hospital's ongoing efforts to promote safe motherhood practices in the community. The hospital's maternity ward is one of the busiest in the region, delivering over thousands of babies safely each year.",
    ],
  },
];

/* ───────────────── static params ───────────────── */
export function generateStaticParams() {
  return coverageDetails.map((c) => ({ slug: c.slug }));
}

/* ───────────────── metadata ───────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = coverageDetails.find((c) => c.slug === slug);
  if (!item) return { title: "Coverage Not Found" };
  return {
    title: `${item.title} – Media Coverage | Popular Hospital`,
    description: item.content[0],
  };
}

/* ───────────────── page component ───────────────── */
export default async function MediaCoverageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = coverageDetails.find((c) => c.slug === slug);
  if (!item) notFound();

  // Get related coverage items
  const relatedItems = coverageDetails
    .filter((c) => c.slug !== item.slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 lg:py-28 overflow-hidden">
        {/* Subtle Background Image */}
        <Image
          src={item.heroImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-[#0b1c43]/70" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/media/coverage"
              className="hover:text-white transition-colors"
            >
              Media Coverage
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{item.title}</span>
          </nav>

          {/* Source + Date */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#00B4D8] text-white text-xs font-bold uppercase tracking-wider">
              {item.source}
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {item.title}
          </h1>
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
        <article className="prose prose-lg max-w-none">
          {/* First 2 paragraphs */}
          {item.content.slice(0, 2).map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}

          {/* ─── Image Gallery ─── */}
          <div
            className={`my-10 grid gap-4 not-prose ${
              item.gallery.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-3"
            }`}
          >
            {item.gallery.map((img, index) => (
              <div
                key={index}
                className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={img}
                  alt={`${item.title} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Remaining paragraphs */}
          {item.content.slice(2).map((paragraph, index) => (
            <p
              key={index + 2}
              className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* ─── Actions Strip ─── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Source:</span>
            <span className="px-3 py-1 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-bold">
              {item.source}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {item.date}
            </span>
          </div>
          <Link
            href="/media/coverage"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1e3a8a] text-white text-sm font-semibold hover:bg-[#15307a] transition-colors shadow-md"
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
            Back to Media Coverage
          </Link>
        </div>
      </section>

      {/* ─── More Coverage ─── */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-8">
            More Media Coverage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((related) => (
              <Link
                key={related.slug}
                href={`/media/coverage/${related.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={related.heroImage}
                    alt={related.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/90 text-[#1e3a8a] text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {related.source}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] text-gray-400 font-medium mb-1.5">
                    {related.date}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors line-clamp-2 flex-1">
                    {related.title}
                  </h3>
                  <span className="mt-2 pt-2 border-t border-gray-50 inline-flex items-center gap-1 text-[#E85222] font-semibold text-[11px]">
                    View Details
                    <svg
                      className="w-3 h-3 transition-transform group-hover:translate-x-1"
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
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
