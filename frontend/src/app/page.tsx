import { Metadata } from "next";
import HomeClient from "./HomeClient";
import HospitalSchema from "@/components/schema/HospitalSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";
import {
  fetchNews,
  fetchBranches,
  fetchEvents,
  fetchSpecialities,
  fetchHeroBanners,
  fetchPatientStories,
} from "@/lib/api";

// Always fetch fresh data so new banners appear immediately after admin upload
export const dynamic = "force-dynamic";

import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("/", {
    title: "Best Multi Super Speciality Hospital in Varanasi | Popular Hospital",
    description:
      "Varanasi's best multi super speciality hospital — 450+ beds, 28 departments, 24/7 emergency & cashless treatment. Book appointment today.",
    alternates: {
      canonical: "https://www.popularhospital.in",
    },
  });
}

export default async function HomePage() {
  const [
    newsData,
    branchesData,
    eventsData,
    specialitiesData,
    bannersData,
    patientStoriesData,
  ] = await Promise.all([
    fetchNews(),
    fetchBranches(),
    fetchEvents(),
    fetchSpecialities(),
    fetchHeroBanners(),
    fetchPatientStories(),
  ]);

  return (
    <>
      <DynamicSchema pageKey="home" fallback={<HospitalSchema />} />
      <HomeClient
        latestNews={newsData.slice(0, 3)}
        branches={branchesData}
        latestEvents={eventsData.slice(0, 3)}
        specialities={specialitiesData}
        heroBanners={bannersData}
        patientStories={patientStoriesData.slice(0, 7)}
      />
    </>
  );
}
