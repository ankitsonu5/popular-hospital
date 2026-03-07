
import { Metadata } from 'next';
import OrthopedicsClient from './OrthopedicsClient';

export const metadata: Metadata = {
  title: 'Orthopedics & Joint Replacement | Popular Hospital',
  description: 'Advanced orthopedic care including joint replacement, sports medicine, trauma surgery, and spine treatments with cutting-edge technology.',
};

export default function OrthopedicsPage() {
  return <OrthopedicsClient />;
}
