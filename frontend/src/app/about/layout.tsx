

export const metadata = {
  title: 'About',
  description: 'Learn more about About at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'About | Popular Hospital Varanasi',
    description: 'Learn more about About at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="about-font-scope">{children}</div>;
}
