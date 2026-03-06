import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Departments | Popular Hospital',
  description: 'Explore the specialized medical departments at Popular Hospital.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
