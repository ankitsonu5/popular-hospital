const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser: use Next.js rewrite /api-backend -> backend
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
};

const api = (path: string) => {
  const p = path.replace(/^\//, '');
  if (typeof window !== 'undefined') return `/api-backend/${p}`;
  return `${getBaseUrl()}/api/${p}`;
};

export async function fetchBranches(): Promise<Branch[]> {
  const res = await fetch(api('/branches'), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch branches');
  return res.json();
}

export async function fetchBranch(idOrSlug: string): Promise<Branch | null> {
  const res = await fetch(api(`/branches/${idOrSlug}`), { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchDoctors(params?: { speciality?: string; branch?: string; search?: string }): Promise<Doctor[]> {
  const sp = new URLSearchParams();
  if (params?.speciality) sp.set('speciality', params.speciality);
  if (params?.branch) sp.set('branch', params.branch);
  if (params?.search) sp.set('search', params.search);
  const q = sp.toString();
  const res = await fetch(api(`/doctors${q ? `?${q}` : ''}`), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch doctors');
  return res.json();
}

export async function fetchDoctor(idOrSlug: string): Promise<Doctor | null> {
  const res = await fetch(api(`/doctors/${idOrSlug}`), { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchSpecialities(): Promise<Speciality[]> {
  const res = await fetch(api('/doctors/specialities'), { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch specialities');
  return res.json();
}

export async function fetchOpdSlots(doctorId: number, branchId: number, date: string): Promise<{ date: string; slots: string[] }> {
  const res = await fetch(api(`/opd/slots?doctor_id=${doctorId}&branch_id=${branchId}&date=${date}`));
  if (!res.ok) throw new Error('Failed to fetch slots');
  return res.json();
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

export interface Branch {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  description?: string;
  image_url?: string;
  facilities?: string;
}

export interface Speciality {
  id: number;
  name: string;
  slug: string;
}

export interface Doctor {
  id: number;
  name: string;
  slug: string;
  speciality_id: number;
  speciality_name?: string;
  speciality_slug?: string;
  qualification?: string;
  experience_years?: number;
  bio?: string;
  image_url?: string;
  consultation_fee?: number;
  available_days?: string;
  branch_ids?: string;
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
