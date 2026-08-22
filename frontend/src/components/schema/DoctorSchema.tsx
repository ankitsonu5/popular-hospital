// ─────────────────────────────────────────────
// DoctorSchema.tsx
// 2 named exports:
//   1. DoctorSchema      → /doctors/[slug] (individual doctor page)
//   2. DoctorsListSchema → /doctors        (listing page)
// ─────────────────────────────────────────────

const HOSPITAL = {
  "@type": "Hospital",
  "@id": "https://www.popularhospital.in/#hospital",
  name: "Popular Hospital",
  url: "https://www.popularhospital.in/",
};

const HOSPITAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "N-10/60, A-2, B.L.W. Road, Kakarmatta",
  addressLocality: "Varanasi",
  addressRegion: "Uttar Pradesh",
  postalCode: "221004",
  addressCountry: "IN",
};

// ─── 1. Individual Doctor Page Schema ────────
interface OpdTimings {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

interface DoctorSchemaProps {
  name: string;
  slug: string;
  description?: string;
  qualification?: string;
  designation?: string;
  speciality?: string;
  experienceYears?: number | string;
  experienceLocation?: string;
  consultationFee?: number | string;
  image?: string;
  opdTimings?: OpdTimings;
}

export function DoctorSchema({
  name,
  slug,
  description,
  qualification,
  designation,
  speciality,
  experienceYears,
  experienceLocation,
  consultationFee,
  image,
  opdTimings,
}: DoctorSchemaProps) {
  const doctorUrl = `https://www.popularhospital.in/doctors/${slug}`;

  const buildAvailability = () => {
    if (!opdTimings) return undefined;
    const dayMap: Record<string, string> = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    };
    const specs = Object.entries(opdTimings)
      .filter(([, timing]) => timing && timing !== "-")
      .map(([day, timing]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[day],
        description: timing,
      }));
    return specs.length > 0 ? specs : undefined;
  };

  const availability = buildAvailability();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${doctorUrl}#physician`,
        name,
        url: doctorUrl,
        image: image ?? "https://www.popularhospital.in/logo.png",
        priceRange: "$$",
        telephone: "+91-7800001895",
        address: HOSPITAL_ADDRESS,
        ...(description && { description }),
        ...(designation && { jobTitle: designation }),
        ...(qualification && {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: qualification,
          },
        }),
        ...(speciality && { medicalSpecialty: speciality }),
        ...(experienceYears && {
          hasOccupation: {
            "@type": "Occupation",
            name: speciality
              ? `${speciality} Specialist`
              : "Medical Specialist",
            occupationLocation: { "@type": "City", name: "Varanasi" },
            yearsOfExperience: experienceYears,
            ...(experienceLocation && { description: experienceLocation }),
          },
        }),
        worksFor: { ...HOSPITAL, address: HOSPITAL_ADDRESS },
        hospitalAffiliation: HOSPITAL,
        availableService: {
          "@type": "Service",
          name: "OPD Consultation",
          serviceType: "Medical Consultation",
          provider: HOSPITAL,
        },
        ...(consultationFee && {
          makesOffer: {
            "@type": "Offer",
            name: "OPD Consultation",
            price: String(consultationFee),
            priceCurrency: "INR",
            seller: HOSPITAL,
          },
        }),
        ...(availability && { openingHoursSpecification: availability }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${doctorUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.popularhospital.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Find a Doctor",
            item: "https://www.popularhospital.in/doctors",
          },
          { "@type": "ListItem", position: 3, name, item: doctorUrl },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 2. Doctors Listing Page Schema ──────────
export function DoctorsListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.popularhospital.in/doctors#collectionpage",
        name: "Find a Doctor - Popular Hospital Varanasi",
        description:
          "Search and book doctors by speciality at Popular Hospital Varanasi. View profiles, qualifications, OPD timings, and consultation fees of 100+ expert doctors.",
        url: "https://www.popularhospital.in/doctors",
        isPartOf: { "@id": "https://www.popularhospital.in/#website" },
        about: HOSPITAL,
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.popularhospital.in/doctors#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.popularhospital.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Find a Doctor",
            item: "https://www.popularhospital.in/doctors",
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": "https://www.popularhospital.in/doctors#itemlist",
        name: "Doctors at Popular Hospital Varanasi",
        description: "Complete list of 100+ expert doctors across 28 departments at Popular Hospital Varanasi.",
        numberOfItems: 100,
        itemListOrder: "https://schema.org/ItemListUnordered",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
