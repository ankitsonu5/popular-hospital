import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { fetchNews, fetchBranches, fetchEvents, fetchSpecialities } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Popular Hospital | Finest Patient Care in Varanasi',
  description: 'Popular Hospital (a Unit of POPULAR MEDICARE LTD) is one of Varanasi\'s best Super Speciality Institutes offering 24/7 world-class healthcare, expert doctors, and modern infrastructure.',
};

export default async function HomePage() {
  const [newsData, branchesData, eventsData, specialitiesData] = await Promise.all([
    fetchNews(),
    fetchBranches(),
    fetchEvents(),
    fetchSpecialities()
  ]);

  return (
    <HomeClient 
      latestNews={newsData.slice(0, 3)} 
      branches={branchesData} 
      latestEvents={eventsData.slice(0, 3)} 
      specialities={specialitiesData} 
    />
  );
}
