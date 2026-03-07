import type { Metadata } from 'next';
import GeneralSurgeryClient from './GeneralSurgeryClient';

export const metadata: Metadata = {
  title: 'Laparoscopy & General Surgery | Popular Hospital',
  description: 'Advanced laparoscopic (keyhole) and general surgical procedures with state-of-the-art technology and expert surgeons.',
};

export default function GeneralSurgeryPage() {
  return <GeneralSurgeryClient />;
}
