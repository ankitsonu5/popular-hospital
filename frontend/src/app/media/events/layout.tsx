import { generatePageMetadata } from "@/lib/seoApi";

const defaultMetadata = {
  title: 'Events',
  description: 'Learn more about Events at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Events | Popular Hospital Varanasi',
    description: 'Learn more about Events at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return generatePageMetadata("/media/events", defaultMetadata);
}
