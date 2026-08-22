import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDepartment, fetchDoctors, getImageUrl } from "@/lib/api";
import DoctorSlider from "@/components/DoctorSlider";
import GetCallBackButton from "@/components/GetCallBackButton";

export const revalidate = 60;


type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dept = await fetchDepartment(slug);
  if (!dept) return { title: "Department | Popular Hospital" };
  return {
    title: dept.meta_title || `${dept.name} | Popular Hospital`,
    description: dept.meta_description || dept.description?.slice(0, 160) || "",
  };
}

const SectionHeader = ({
  title,
  highlight,
}: {
  title: string;
  highlight?: string;
}) => (
  <div className="mb-6 2xl:mb-8">
    <h2 className="text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
      {title} <span className="text-[#1e3a8a]">{highlight}</span>
    </h2>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-[#1e3a8a]" />
      <div className="h-[2px] w-12 bg-gray-300" />
    </div>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 text-gray-800 mb-2 group text-base md:text-lg 2xl:text-xl font-medium">
    <span className="text-[#1e3a8a] mt-1 font-bold group-hover:translate-x-1 transition-transform">
      ›
    </span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const [dept, doctors] = await Promise.all([
    fetchDepartment(slug),
    fetchDoctors({ speciality: slug }),
  ]);

  if (!dept) notFound();

  const bannerColor = dept.banner_color || "#0b1c43";
  const hasUsp = dept.usp_items && dept.usp_items.length > 0;
  const hasLists = dept.lists && dept.lists.length > 0;

  return (
    <main className="min-h-screen bg-white">
      {/* ═══════ HERO ═══════ */}
      <section
        className="relative min-h-[150px] md:min-h-[200px] xl:min-h-[150px] 2xl:min-h-[250px] w-full overflow-hidden flex items-center py-8 md:py-10 xl:py-6 2xl:py-12 uppercase tracking-tight"
        style={{ backgroundColor: bannerColor }}
      >
        {dept.banner_image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={dept.banner_image}
              alt={dept.name}
              fill
              className="object-cover object-center opacity-70 mix-blend-overlay"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${bannerColor}, ${bannerColor}e6, transparent)`,
              }}
            />
          </div>
        )}

        <div className="relative z-10 mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4 h-full flex flex-col justify-center">
          <div className="animate-fade-in-up max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30 backdrop-blur-sm">
              {dept.banner_subtitle || "Department of"}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-3xl 2xl:text-6xl font-bold text-white mb-6 leading-tight font-heading break-words">
              {dept.department_display_name || dept.name}
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="bg-[#E85222] hover:bg-[#E85222] text-white px-8 py-3.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-[#E85222]/30 flex items-center gap-2"
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
                Book An Appointment
              </Link>
              <GetCallBackButton
                department={dept.name}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold backdrop-blur-sm transition-all border border-white/20 flex items-center gap-2"
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
                Get a Call Back
              </GetCallBackButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DESCRIPTION + DOCTOR SIDEBAR ═══════ */}
      <section className="py-16 xl:py-10 2xl:py-20 bg-gray-50/50">
        <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <SectionHeader
                title="Department of"
                highlight={dept.department_display_name || dept.name}
              />
              {dept.description && (
                <div
                  className="prose prose-blue max-w-none text-gray-800 space-y-4 mb-10 leading-relaxed text-base md:text-lg xl:text-[15px] 2xl:text-xl font-medium text-justify"
                  dangerouslySetInnerHTML={{ __html: dept.description }}
                />
              )}

              {/* USP Items */}
              {hasUsp && (
                <div className="mt-8 space-y-6">
                  {dept.usp_items!.map((usp, idx) => (
                    <div key={idx} className="border-l-4 border-blue-600 pl-4">
                      <h4 className="font-bold text-[#0b1c43] text-lg mb-1">
                        {usp.title}
                      </h4>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {usp.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Doctor Sidebar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="sticky top-24 w-full h-fit">
                <DoctorSlider
                  doctors={doctors.map((d) => ({
                    name: d.name,
                    qualifications: d.qualification,
                    designation:
                      typeof d.designation === "object"
                        ? d.designation?.name
                        : d.designation,
                    slug: d.slug,
                    image_url: d.image_url ? getImageUrl(d.image_url) : "",
                  }))}
                  departmentName={dept.department_display_name || dept.name}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LIST SECTIONS ═══════ */}
      {hasLists &&
        dept.lists!.map((section, idx) => {
          const isEven = idx % 2 === 0;
          const hasImage = !!section.image;
          const isImageRight = section.layout === "image-right";
          const isImageLeft = section.layout === "image-left";

          if ((isImageRight || isImageLeft) && hasImage) {
            return (
              <section
                key={idx}
                className={`py-20 xl:py-12 2xl:py-24 ${isEven ? "bg-white" : "bg-gray-50"} overflow-hidden`}
              >
                <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 items-center">
                    <div
                      className={
                        isImageLeft
                          ? "order-2 lg:order-2"
                          : "order-2 lg:order-1"
                      }
                    >
                      <SectionHeader
                        title={section.title}
                        highlight={section.highlight}
                      />
                      <ul className="grid grid-cols-1 gap-x-8 mt-6">
                        {section.items.map((item, i) => (
                          <ListItem key={i} text={item} />
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`${isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"} mb-12 lg:mb-0 relative`}
                    >
                      <div className="relative w-full aspect-square max-w-md mx-auto">
                        <div className="absolute inset-0 bg-blue-50 rounded-3xl" />
                        <div className="relative h-full w-full overflow-hidden shadow-lg rounded-3xl border-4 border-white">
                          <Image
                            src={section.image!}
                            alt={section.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section
              key={idx}
              className={`py-16 xl:py-10 2xl:py-20 ${isEven ? "bg-white" : "bg-gray-50/50"}`}
            >
              <div className="mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4">
                <SectionHeader
                  title={section.title}
                  highlight={section.highlight}
                />
                <ul
                  className={`grid ${section.layout === "two-col" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-x-8 mt-6`}
                >
                  {section.items.map((item, i) => (
                    <ListItem key={i} text={item} />
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
    </main>
  );
}
