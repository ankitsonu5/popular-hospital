import { Metadata } from 'next';
import PsychiatryClient from './PsychiatryClient';

export const metadata: Metadata = {
  title: 'Psychiatry Department | Popular Hospital',
  description: 'Expert psychiatric care in Varanasi. Treatment for depression, anxiety, schizophrenia, bipolar disorder, and specialized therapy for all ages at Popular Hospital.',
};

export default function PsychiatryPage() {
  return <PsychiatryClient />;
}
