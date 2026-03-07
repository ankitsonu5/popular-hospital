import type { Metadata } from 'next';
import PediatricSurgeryClient from './PediatricSurgeryClient';

export const metadata: Metadata = {
  title: 'Pediatric Surgery | Popular Hospital',
  description: 'Specialized surgical care for newborns, infants, and children. Dedicated Paediatric Surgeons and NICU support ensuring gentle, safe care.',
};

export default function PediatricSurgeryPage() {
  return <PediatricSurgeryClient />;
}
