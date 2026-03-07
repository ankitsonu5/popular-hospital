import type { Metadata } from 'next';
import NephrologyClient from './NephrologyClient';

export const metadata: Metadata = {
  title: 'Department of Nephrology | Popular Hospital',
  description: 'Comprehensive kidney care including Hemodialysis, Peritoneal Dialysis, Kidney Transplantation, CRRT, and management of Chronic Kidney Disease.',
};

export default function NephrologyPage() {
  return <NephrologyClient />;
}