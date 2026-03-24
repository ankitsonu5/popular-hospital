export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser: use Next.js rewrite /api-backend -> backend
  return apiBaseUrl;
};

export const api = (path: string) => {
  const p = path.replace(/^\//, '');
  if (typeof window !== 'undefined') return `/api-backend/${p}`;
  return `${getBaseUrl()}/api/${p}`;
};

export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Ensure we have a leading slash
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Special case: if database contains /uploads/images/... but images are in public/images/...
  if (normalizedPath.startsWith('/uploads/images')) {
      normalizedPath = normalizedPath.replace('/uploads', '');
  }

  // If the path points to /images (local public asset)
  if (normalizedPath.startsWith('/images')) {
      return normalizedPath; // Always use local path for public assets
  }

  // If the path already includes /uploads, keep it as is
  if (normalizedPath.startsWith('/uploads')) {
      if (typeof window !== 'undefined') return normalizedPath;
      return `${apiBaseUrl}${normalizedPath}`;
  }

  // Otherwise, assume it's an uploaded file that needs the prefix
  if (normalizedPath && !normalizedPath.startsWith('/')) {
    normalizedPath = '/' + normalizedPath;
  }

  if (typeof window !== 'undefined') return `/uploads${normalizedPath}`;
  return `${apiBaseUrl}/uploads${normalizedPath}`;
};

export async function fetchBranches(): Promise<Branch[]> {
  try {
    const res = await fetch(api('/branches'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch branches:', e);
    return [];
  }
}

export async function fetchBranch(idOrSlug: string): Promise<Branch | null> {
  try {
    const res = await fetch(api(`/branches/${idOrSlug}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch branch:', e);
    return null;
  }
}

export async function fetchDoctors(params?: { speciality?: string; branch?: string; search?: string }): Promise<Doctor[]> {
  try {
    const sp = new URLSearchParams();
    if (params?.speciality) sp.set('speciality', params.speciality);
    if (params?.branch) sp.set('branch', params.branch);
    if (params?.search) sp.set('search', params.search);
    const q = sp.toString();
    const res = await fetch(api(`/doctors${q ? `?${q}` : ''}`), { next: { revalidate: 10 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch doctors:', e);
    return [];
  }
}

export async function fetchDoctor(idOrSlug: string): Promise<Doctor | null> {
  try {
    const res = await fetch(api(`/doctors/${idOrSlug}`), { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch doctor:', e);
    return null;
  }
}

export async function fetchSpecialities(): Promise<Speciality[]> {
  try {
    const res = await fetch(api('/doctors/specialities'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch specialities:', e);
    return [];
  }
}

export async function fetchOpdSlots(doctorId: number, branchId: number, date: string): Promise<{ date: string; slots: string[] }> {
  try {
    const res = await fetch(api(`/opd/slots?doctor_id=${doctorId}&branch_id=${branchId}&date=${date}`));
    if (!res.ok) return { date, slots: [] };
    return res.json();
  } catch (e) {
    console.error('Failed to fetch slots:', e);
    return { date, slots: [] };
  }
}

export async function createBooking(data: BookingInput): Promise<{ id: number; message: string }> {
  const res = await fetch(api('/bookings'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Booking failed');
  }
  return res.json();
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(api('/news'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch news:', e);
    return [];
  }
}

export async function fetchNewsItem(slug: string): Promise<NewsItem | null> {
  try {
    const res = await fetch(api(`/news/${slug}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch news item:', e);
    return null;
  }
}

export async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    const res = await fetch(api('/blogs'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch blogs:', e);
    return [];
  }
}

export async function fetchBlogItem(slug: string): Promise<BlogItem | null> {
  try {
    const res = await fetch(api(`/blogs/${slug}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch blog item:', e);
    return null;
  }
}

export async function fetchBlogCategoriesMetrics(): Promise<{_id: string, count: number, latestTitle: string}[]> {
  try {
    const res = await fetch(api('/blogs/metrics'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch blog categories metrics:', e);
    return [];
  }
}

export async function fetchBlogSearch(query: string): Promise<BlogItem[]> {
  try {
    const res = await fetch(api(`/blogs/search?q=${encodeURIComponent(query)}`));
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to search blogs:', e);
    return [];
  }
}

export async function fetchCoverage(): Promise<CoverageItem[]> {
  try {
    const res = await fetch(api('/coverage'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch coverage:', e);
    return [];
  }
}

export async function fetchCoverageItem(slug: string): Promise<CoverageItem | null> {
  try {
    const res = await fetch(api(`/coverage/${slug}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch coverage item:', e);
    return null;
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(api('/events'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch events:', e);
    return [];
  }
}

export async function fetchEventItem(slug: string): Promise<EventItem | null> {
  try {
    const res = await fetch(api(`/events/${slug}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch event item:', e);
    return null;
  }
}

export interface CoverageItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  source: string;
  image: string;
  gallery?: string[];
  content?: string | string[];
  isActive: boolean;
}

export interface EventItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  thumbnail: string;
  gallery: string[];
  description: string;
  isActive: boolean;
}

export interface Branch {
  _id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  description?: string;
  heading?: string;
  title?: string;
  timings?: string;
  image_one?: string;
  image_two?: string;
  image_three?: string;
  image_four?: string;
  mapEmbedUrl?: string;
  mapDirectionsUrl?: string;
  facilities?: string;
}

export interface Speciality {
  _id: string;
  id?: number;
  name: string;
  slug: string;
  department_display_name?: string;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  speciality_id?: string;
  speciality_name?: string;
  speciality_slug?: string;
  speciality?: { _id: string; name: string; slug: string; department_display_name?: string };
  qualification?: string;
  experience_years?: number;
  experience_location?: string;
  bio?: string;
  image_url?: string;
  consultation_fee?: number;
  available_days?: string;
  opd_timings?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  branch_ids?: string;
  designation?: string | { _id: string; name: string };
}

export interface BookingInput {
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  doctor_id: number;
  branch_id: number;
  slot_date: string;
  slot_time: string;
  notes?: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string; // HTML string from TinyMCE
  image: string;
  author?: string;
}

export interface CommentItem {
  _id?: string;
  name: string;
  email: string;
  website?: string;
  comment: string;
  date: string;
  replies?: {
    _id?: string;
    admin: boolean;
    text: string;
    date: string;
  }[];
}

export interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string; // Changed from string[] to string for HTML
  image: string;
  author?: string;
  category?: string;
  isUncategorized?: boolean;
  comments?: CommentItem[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  focusKeyword?: string;
  imageAlt?: string;
}
export async function fetchCareers(): Promise<CareerItem[]> {
  try {
    const res = await fetch(api('/careers'), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch careers:', e);
    return [];
  }
}

export async function fetchCareerItem(id: string): Promise<CareerItem | null> {
  try {
    const res = await fetch(api(`/careers/${id}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch career item:', e);
    return null;
  }
}

export async function fetchUpdates(all: boolean = false): Promise<UpdateItem[]> {
  try {
    const url = all ? api('/updates?all=true') : api('/updates');
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error('Failed to fetch updates:', e);
    return [];
  }
}

export async function fetchUpdateItem(id: string): Promise<UpdateItem | null> {
  try {
    const res = await fetch(api(`/updates/${id}`), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error('Failed to fetch update item:', e);
    return null;
  }
}

export interface CareerItem {
  _id: string;
  category: 'Medico' | 'Non-Medical' | 'Admin';
  department: string;
  designation: string;
  location: string;
  position: string;
  postedOn: string;
  lastDate: string;
  description: string;
  isActive: boolean;
}

export interface UpdateItem {
  _id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  iconType: string;
  isImportant: boolean;
  isActive: boolean;
  pdfUrl?: string;
}
