import { generatePageMetadata } from "@/lib/seoApi";

const defaultMetadata = {
  title: 'Updates',
  description: 'Learn more about Updates at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Updates | Popular Hospital Varanasi',
    description: 'Learn more about Updates at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata() {
  return generatePageMetadata("/updates", defaultMetadata);
}
