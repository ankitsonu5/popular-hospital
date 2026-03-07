
import { Metadata } from 'next';
import ENTClient from './ENTClient';

export const metadata: Metadata = {
  title: 'ENT (Ear, Nose & Throat) | Popular Hospital',
  description: 'Expert ENT services for ear, nose, and throat disorders. Advanced surgical and medical care by Dr. Anshuman Singh and team.',
};

export default function ENTPage() {
  return <ENTClient />;
}
