import { generatePageMetadata } from "@/lib/seoApi";

const defaultMetadata = {
  title: 'Second Opinion',
  description: 'Learn more about Second Opinion at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Second Opinion | Popular Hospital Varanasi',
    description: 'Learn more about Second Opinion at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return generatePageMetadata("/second-opinion", defaultMetadata);
}
