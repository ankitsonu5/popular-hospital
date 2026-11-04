import { Metadata } from "next";
import CardiologyClient from "./CardiologyClient";
import DepartmentSchema from "@/components/schema/DepartmentSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import MedicalWebPageSchema from "@/components/schema/MedicalWebPageSchema";
import { fetchDoctors, getImageUrl } from "@/lib/api";
import { generatePageMetadata } from "@/lib/seoApi";

export const revalidate = 60;

export async function generateMetadata() {
  return generatePageMetadata("/departments/cardiology", {
    title: "Best Cardiology Hospital in Varanasi | Popular Hospital",
    description:
      "Popular Hospital is the best Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!",
    alternates: {
      canonical: "https://www.popularhospital.in/departments/cardiology",
    },
  });
}

export default async function CardiologyPage() {
  let dbDoctors: any[] = [];
  try {
    dbDoctors = await fetchDoctors({ speciality: "cardiology", includeAdditional: true });
  } catch (err) {
    console.error("Failed to fetch cardiology doctors:", err);
  }

  // Real Cardiology department doctors of Popular Hospital
  const fallbackCardiology = [
    {
      id: "dr-hari-krishan-srivastava",
      name: "Dr. Hari Krishan Srivastava",
      qualifications: "DM - Cardiology",
      designation: "Consultant Interventional Cardiologist",
      slug: "dr-hari-krishan-srivastava",
      image: "/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg",
      speciality: "Cardiology, Interventional Cardiology",
    },
    {
      id: "dr-manoj-sharma",
      name: "Dr. Manoj Sharma",
      qualifications: "MBBS, MD - Physiology, PGDCC",
      designation: "Consultant Cardiologist",
      slug: "dr-manoj-sharma",
      image: "/images/departments_doctor/dr_manoj-sharma.jpg",
      speciality: "Cardiology, Non-Invasive Cardiology",
    },
  ];

  const resolveDoctorImage = (d: any, fb?: any) => {
    const slug = (d?.slug || "").toLowerCase();
    const name = (d?.name || "").toLowerCase();
    // Photo uploaded in database takes priority
    if (d?.image_url) return getImageUrl(d.image_url);
    // Local assets only for known doctors; others render without a photo
    if (slug.includes("hari") || name.includes("hari"))
      return "/images/departments_doctor/dr-Hari-Krishan-Srivastava.jpg";
    if (slug.includes("manoj") || name.includes("manoj"))
      return "/images/departments_doctor/dr_manoj-sharma.jpg";
    if (slug.includes("priya") || name.includes("priya"))
      return "/images/departments_doctor/dr_priyanka_jaiswal.jpg";
    if (slug.includes("tejas") || name.includes("tejas"))
      return "/images/departments_doctor/dr_tejas_mahajan.jpg.jpeg";
    if (slug.includes("dinesh") || name.includes("dinesh"))
      return "/images/departments_doctor/dr-dinesh-singh.jpg";

    if (fb?.image) return fb.image;
    return "";
  };

  let doctors: any[] = [];
  if (Array.isArray(dbDoctors) && dbDoctors.length > 0) {
    doctors = dbDoctors.map((d) => {
      const fb = fallbackCardiology.find((f) => f.slug === d.slug);
      return {
        id: String(d._id || d.id || d.slug),
        _id: String(d._id || d.id || d.slug),
        name: d.name,
        qualifications:
          d.qualification || fb?.qualifications || "Cardiology Specialist",
        designation:
          typeof d.designation === "object"
            ? d.designation?.name
            : d.designation || fb?.designation,
        slug: d.slug,
        image: resolveDoctorImage(d, fb),
        speciality: d.speciality?.name || fb?.speciality || "Cardiology",
      };
    });

    // Ensure core cardiology specialists are present
    for (const fb of fallbackCardiology) {
      if (!doctors.some((d) => d.slug === fb.slug)) {
        doctors.push(fb);
      }
    }
  } else {
    doctors = fallbackCardiology;
  }

  // Remove Dr. Priya Sharma from Cardiology cards as requested
  doctors = doctors.filter(
    (d) =>
      d.slug !== "dr-priya-sharma" &&
      !d.name?.toLowerCase().includes("priya sharma"),
  );

  return (
    <>
      <DynamicSchema
        pageKey="department:cardiology"
        fallback={
          <DepartmentSchema
            name="Best Cardiology Hospital in Varanasi | Popular Hospital"
            description="Popular Hospital is the best Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
            urlSlug="cardiology"
            medicalSpecialty="Cardiovascular"
          />
        }
      />
      <MedicalWebPageSchema
        urlSlug="cardiology"
        name="Best Cardiology Hospital in Varanasi | Popular Hospital"
        description="Popular Hospital is the best Cardiology hospital in Varanasi, Uttar Pradesh. Get advanced care and cashless treatment in Purvanchal. Book an appointment today!"
        specialtyName="Cardiology"
        reviewerName="Dr. Hari Krishan Srivastava"
        dateReviewed={new Date().toISOString().split("T")[0]}
      />
      <CardiologyClient doctors={doctors} />
    </>
  );
}
