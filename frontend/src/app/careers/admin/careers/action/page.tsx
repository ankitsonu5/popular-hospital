export { default } from "@/app/admin-dashboard/careers/action/page";



import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/careers/admin/careers/action", {
  title: 'Action',
  description: 'Learn more about Action at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  openGraph: {
    title: 'Action | Popular Hospital Varanasi',
    description: 'Learn more about Action at Popular Hospital Varanasi. Best multi super speciality hospital offering top-notch healthcare services.',
  }
});
}


