function getCmsKey(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('cms_key');
}

function cmsFetch(path: string, options: RequestInit = {}) {
  const key = getCmsKey();
  const base = typeof window !== 'undefined' ? '/api-backend/cms' : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/cms`;
  const url = typeof window !== 'undefined' ? `${window.location.origin}/api-backend/cms${path}` : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/cms${path}`;
  const headers = new Headers(options.headers);
  if (key) headers.set('x-cms-key', key);
  return fetch(url, { ...options, headers });
}

export async function cmsGetBranches() {
  const res = await cmsFetch('/branches');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function cmsCreateBranch(data: Record<string, unknown>) {
  const res = await cmsFetch('/branches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
  return res.json();
}

export async function cmsUpdateBranch(id: string, data: Record<string, unknown>) {
  const res = await cmsFetch(`/branches/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
  return res.json();
}

export async function cmsDeleteBranch(id: string) {
  const res = await cmsFetch(`/branches/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export async function cmsGetDoctors() {
  const res = await cmsFetch('/doctors');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function cmsCreateDoctor(data: Record<string, unknown>) {
  const res = await cmsFetch('/doctors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
  return res.json();
}

export async function cmsUpdateDoctor(id: string, data: Record<string, unknown>) {
  const res = await cmsFetch(`/doctors/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed');
  return res.json();
}

export async function cmsDeleteDoctor(id: string) {
  const res = await cmsFetch(`/doctors/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export async function cmsGetBookings() {
  const res = await cmsFetch('/bookings');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function cmsGetContent() {
  const res = await cmsFetch('/content');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function cmsSetContent(key: string, value: string) {
  const res = await cmsFetch('/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, value }) });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}
