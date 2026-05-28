export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
const uploadsBaseUrl =
  process.env.NEXT_PUBLIC_UPLOADS_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser: use relative paths or Next.js rewrites
  return apiBaseUrl || process.env.BACKEND_API_URL || "http://localhost:5100";
};

export const api = (path: string) => {
  const p = path.replace(/^\//, "");
  if (typeof window !== "undefined") return `/api-backend/${p}`;
  return `${getBaseUrl()}/api/${p}`;
};

export const getImageUrl = (
  path: string,
  absolute = false,
  options?: { preferRelativeUploads?: boolean },
) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // Ensure we have a leading slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const finalPath = normalizedPath.startsWith("/uploads")
    ? normalizedPath
    : normalizedPath.startsWith("/images")
      ? normalizedPath
      : path.startsWith("/")
        ? normalizedPath // root-relative public path — don't mangle
        : `/uploads${normalizedPath}`; // bare filename — treat as upload

  if (finalPath.startsWith("/uploads")) {
    if (options?.preferRelativeUploads) {
      return finalPath;
    }

    if (uploadsBaseUrl) {
      return `${uploadsBaseUrl.replace(/\/$/, "")}${finalPath}`;
    }
  }

  // Only return absolute URL when explicitly requested.
  // Default: local/public images stay relative so Next.js can serve them.
  if (absolute && apiBaseUrl) {
    return `${apiBaseUrl.replace(/\/$/, "")}${finalPath}`;
  }

  return finalPath;
};

// For VIDEO files: always use relative path through Next.js rewrite proxy
// This ensures proper HTTPS streaming without mixed-content issues
export const getMediaUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath.startsWith("/uploads")
    ? normalizedPath
    : `/uploads${normalizedPath}`;
};

export async function fetchBranches(): Promise<Branch[]> {
  try {
    const res = await fetch(api("/branches"), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch branches:", e);
    return [];
  }
}

export async function fetchBranch(idOrSlug: string): Promise<Branch | null> {
  try {
    const res = await fetch(api(`/branches/${idOrSlug}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch branch:", e);
    return null;
  }
}

export async function fetchDoctors(params?: {
  speciality?: string;
  branch?: string;
  search?: string;
}): Promise<Doctor[]> {
  try {
    const sp = new URLSearchParams();
    if (params?.speciality) sp.set("speciality", params.speciality);
    if (params?.branch) sp.set("branch", params.branch);
    if (params?.search) sp.set("search", params.search);
    const q = sp.toString();
    const res = await fetch(api(`/doctors${q ? `?${q}` : ""}`), {
      next: { revalidate: 10 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch doctors:", e);
    return [];
  }
}

export async function fetchDoctor(idOrSlug: string): Promise<Doctor | null> {
  try {
    const res = await fetch(api(`/doctors/${idOrSlug}`), {
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch doctor:", e);
    return null;
  }
}

export async function fetchSpecialities(): Promise<Speciality[]> {
  try {
    const res = await fetch(api("/doctors/specialities"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch specialities:", e);
    return [];
  }
}

export async function fetchDepartment(
  slug: string,
): Promise<Department | null> {
  try {
    const res = await fetch(api(`/doctors/specialities/${slug}`), {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch department:", e);
    return null;
  }
}

export async function fetchDepartmentGallery(
  departmentSlug: string,
): Promise<DepartmentGalleryItem[]> {
  try {
    const res = await fetch(api(`/department-gallery/${departmentSlug}`), {
      next: { revalidate: 30 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch department gallery:", e);
    return [];
  }
}

export async function fetchOpdSlots(
  doctorId: string,
  branchId: string,
  date: string,
): Promise<{ date: string; slots: string[] }> {
  try {
    const res = await fetch(
      api(
        `/opd/slots?doctor_id=${doctorId}&branch_id=${branchId}&date=${date}`,
      ),
    );
    if (!res.ok) return { date, slots: [] };
    return res.json();
  } catch (e) {
    console.error("Failed to fetch slots:", e);
    return { date, slots: [] };
  }
}

export async function createBooking(
  data: BookingInput,
): Promise<{ id: number; message: string }> {
  const res = await fetch(api("/bookings"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Booking failed");
  }
  return res.json();
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(api("/news"), { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch news:", e);
    return [];
  }
}

export async function fetchNewsItem(slug: string): Promise<NewsItem | null> {
  try {
    const res = await fetch(api(`/news/${slug}`), { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch news item:", e);
    return null;
  }
}

export async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    const res = await fetch(api("/blogs"), { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch blogs:", e);
    return [];
  }
}

export async function fetchBlogItem(slug: string): Promise<BlogItem | null> {
  try {
    const res = await fetch(api(`/blogs/${slug}`), {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch blog item:", e);
    return null;
  }
}

export async function fetchBlogCategoriesMetrics(): Promise<
  { _id: string; count: number; latestTitle: string }[]
> {
  try {
    const res = await fetch(api("/blogs/metrics"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch blog categories metrics:", e);
    return [];
  }
}

export async function fetchBlogSearch(query: string): Promise<BlogItem[]> {
  try {
    const res = await fetch(
      api(`/blogs/search?q=${encodeURIComponent(query)}`),
    );
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to search blogs:", e);
    return [];
  }
}

export async function fetchCoverage(): Promise<CoverageItem[]> {
  try {
    const res = await fetch(api("/coverage"), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch coverage:", e);
    return [];
  }
}

export async function fetchCoverageItem(
  slug: string,
): Promise<CoverageItem | null> {
  try {
    const res = await fetch(api(`/coverage/${slug}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch coverage item:", e);
    return null;
  }
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(api("/events"), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch events:", e);
    return [];
  }
}

export async function fetchEventItem(slug: string): Promise<EventItem | null> {
  try {
    const res = await fetch(api(`/events/${slug}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch event item:", e);
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
  category?: "super_specialty" | "specialty";
}

export interface UspItem {
  title: string;
  content: string;
}

export interface ListSection {
  title: string;
  highlight?: string;
  items: string[];
  image?: string;
  layout?: "default" | "image-right" | "image-left" | "two-col";
}

export interface Department {
  _id: string;
  name: string;
  slug: string;
  department_display_name?: string;
  category?: "super_specialty" | "specialty";
  banner_image?: string;
  banner_color?: string;
  banner_subtitle?: string;
  description?: string;
  usp_items?: UspItem[];
  lists?: ListSection[];
  meta_title?: string;
  meta_description?: string;
  sortIndex?: number;
}

export interface Doctor {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  speciality_id?: string;
  speciality_name?: string;
  speciality_slug?: string;
  speciality?: {
    _id: string;
    name: string;
    slug: string;
    department_display_name?: string;
  };
  qualification?: string;
  experience_years?: number;
  experience_location?: string;
  bio?: string;
  image_url?: string;
  youtube_video_url?: string;
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

export interface DepartmentGalleryItem {
  _id: string;
  department?: {
    _id: string;
    name: string;
    slug: string;
    department_display_name?: string;
  };
  type: "image" | "video";
  title?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface BookingInput {
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  doctor: string;
  branch: string;
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
  contentTablet?: string;
  contentMobile?: string;
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
  contentTablet?: string;
  contentMobile?: string;
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
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  readingTime?: number;
  updatedAt?: string;
  dateModified?: string;
}
export async function fetchCareers(): Promise<CareerItem[]> {
  try {
    const res = await fetch(api("/careers"), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch careers:", e);
    return [];
  }
}

export async function fetchCareerItem(id: string): Promise<CareerItem | null> {
  try {
    const res = await fetch(api(`/careers/${id}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch career item:", e);
    return null;
  }
}

export async function fetchUpdates(
  all: boolean = false,
): Promise<UpdateItem[]> {
  try {
    const url = all ? api("/updates?all=true") : api("/updates");
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch updates:", e);
    return [];
  }
}

export async function fetchUpdateItem(id: string): Promise<UpdateItem | null> {
  try {
    const res = await fetch(api(`/updates/${id}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch update item:", e);
    return null;
  }
}

export interface CareerItem {
  _id: string;
  category: "Medico" | "Non-Medical" | "Admin";
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
  imageUrl?: string;
  linkUrl?: string;
}

export interface HeroBanner {
  _id: string;
  type: "image" | "video";
  desktopMediaUrl: string;
  mobileMediaUrl?: string;
  order: number;
  isActive: boolean;
}

export async function fetchHeroBanners(): Promise<HeroBanner[]> {
  try {
    const res = await fetch(api("/hero-banners"), { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch hero banners:", e);
    return [];
  }
}

export interface PatientStory {
  _id: string;
  title?: string;
  name: string;
  videoUrl: string;
  thumbnailUrl: string;
  homeThumbnailUrl?: string;
  order: number;
  isActive: boolean;
}

export async function fetchPatientStories(): Promise<PatientStory[]> {
  try {
    const res = await fetch(api("/patient-stories"), { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch patient stories:", e);
    return [];
  }
}
