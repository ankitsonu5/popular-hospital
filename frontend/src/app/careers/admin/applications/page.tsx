export { default } from "@/app/admin-dashboard/applications/page";



import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/careers/admin/applications", {
  title: 'Applications',
  description: 'Learn more about Applications at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Applications | Popular Hospital Varanasi',
    description: 'Learn more about Applications at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
});
}


