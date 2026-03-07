import type { Metadata } from 'next';
import GastroenterologyClient from './GastroenterologyClient';

export const metadata: Metadata = {
  title: 'Gastroenterology & Hepatology | Popular Hospital',
  description: 'Advanced care for digestive and liver diseases. Specializing in Endoscopy, Colonoscopy, ERCP, and GI Cancer treatment.',
};

export default function GastroenterologyPage() {
  return <GastroenterologyClient />;
}
