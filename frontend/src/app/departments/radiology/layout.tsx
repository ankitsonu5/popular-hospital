import { generatePageMetadata } from "@/lib/seoApi";

const defaultMetadata = {
  title: 'Radiology',
  description: 'Learn more about Radiology at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Radiology | Popular Hospital Varanasi',
    description: 'Learn more about Radiology at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return generatePageMetadata("/departments/radiology", defaultMetadata);
}
