import { Metadata } from 'next';
import LaboratoryMedicineClient from './LaboratoryMedicineClient';

export const metadata: Metadata = {
  title: 'Laboratory Medicine | Popular Hospital',
  description: 'Advanced diagnostic services and medical research at Popular Hospital Laboratory Medicine Department.',
};

export default function LaboratoryMedicinePage() {
  return <LaboratoryMedicineClient />;
}
