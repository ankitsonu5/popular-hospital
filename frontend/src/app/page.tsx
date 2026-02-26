import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Popular Hospital | Finest Patient Care in Varanasi',
  description: 'Popular Hospital (a Unit of POPULAR MEDICARE LTD) is one of Varanasi\'s best Super Speciality Institutes offering 24/7 world-class healthcare, expert doctors, and modern infrastructure.',
};

export default function HomePage() {
  return <HomeClient />;
}
