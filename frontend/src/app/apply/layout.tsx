import { generatePageMetadata } from "@/lib/seoApi";

const defaultMetadata = {
  title: 'Apply',
  description: 'Learn more about Apply at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Apply | Popular Hospital Varanasi',
    description: 'Learn more about Apply at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return generatePageMetadata("/apply", defaultMetadata);
}
