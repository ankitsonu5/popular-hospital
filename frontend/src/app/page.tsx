import { Metadata } from "next";
import HomeClient from "./HomeClient";
import HospitalSchema from "@/components/schema/HospitalSchema";
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

export const metadata: Metadata = {
  title:
    "Popular Hospital Varanasi | Best & Top Multi Super Speciality Hospital in Varanasi",
  description:
    "Popular Hospital — the top multi super speciality hospital in Varanasi. 450+ beds, 28 departments, 100+ expert doctors including Dr. A.K. Kaushik (Chairman). 24/7 emergency, cashless treatment & advanced care. Book appointment now.",
};

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
      <HospitalSchema />
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
