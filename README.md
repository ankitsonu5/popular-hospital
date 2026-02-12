# Popular Hospital Website

A modern, SEO-friendly website for **Popular Hospital** built with **Next.js** (frontend) and **Node.js** (backend), inspired by Apollo Hospitals' structure and healthcare standards.

## Features

- **Frontend (Next.js)**
  - Fast, responsive, SEO-optimized (semantic HTML, metadata, sitemap, robots)
  - **Online booking** – Book doctor appointments with date/time slots
  - **OPD** – Outpatient department info and timings
  - **Doctor search** – By speciality, branch, or name
  - **Branches** – All hospital locations with addresses and contact
  - Clean, modern layout with clear CTAs and navigation

- **Backend (Node.js + Express)**
  - REST API for branches, doctors, bookings, OPD slots
  - SQLite database via **sql.js** (pure JavaScript, no native build; data stored in `backend/data/hospital.db`)
  - Supports seamless data for booking, OPD, and doctors

- **CMS (Content Management System)**
  - Internal admin at `/admin` for non-technical staff
  - Manage **branches** (add/edit/delete)
  - Manage **doctor profiles** (name, speciality, qualification, fee, branches)
  - View **bookings**
  - Edit **site content** (hero text, footer, etc.)
  - Simple key-based auth (dev key: `popular-hospital-cms-dev`)

## Project structure

```
popular-hospital/
├── frontend/          # Next.js 14 (App Router)
│   └── src/
│       ├── app/       # Pages: home, doctors, book, OPD, branches, admin
│       ├── components/
│       └── lib/        # API client, CMS API
├── backend/           # Node.js Express API
│   └── src/
│       ├── routes/    # branches, doctors, bookings, opd, cms
│       ├── db.js      # SQLite schema + connection
│       └── seed.js    # Seed data
├── package.json       # Root scripts (run both frontend + backend)
└── README.md
```

## Setup and run

### Prerequisites

- Node.js 18+
- npm

### 1. Install dependencies

```bash
# From project root
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### 2. Seed the database (first time)

```bash
cd backend && npm run db:seed && cd ..
```

### 3. Run development

**Option A – Run both together (from root):**

```bash
npm run dev
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:4000  

**Option B – Run separately:**

```bash
# Terminal 1 – Backend
cd backend && npm run dev

# Terminal 2 – Frontend
cd frontend && npm run dev
```

Ensure the backend is running before using booking, doctor search, or CMS (frontend proxies API to `/api-backend` → backend).

### 4. CMS (admin)

1. Open http://localhost:3000/admin  
2. Log in with key: **popular-hospital-cms-dev**  
3. Use **Branches**, **Doctors**, **Bookings**, and **Content** to manage the site.

## Environment (optional)

- **Frontend** (`frontend/.env.local`):
  - `NEXT_PUBLIC_API_URL=http://localhost:4000` – Backend URL for server-side fetches
  - `NEXT_PUBLIC_SITE_URL=https://yoursite.com` – For sitemap/SEO

- **Backend** (`backend/.env`):
  - `PORT=4000`
  - `CMS_API_KEY=your-secret-key` – For production CMS (replace dev key)

## Build for production

```bash
# Backend (no build step; run with node)
cd backend && node src/index.js

# Frontend
cd frontend && npm run build && npm run start
```

## SEO and performance

- Semantic HTML and clear headings
- Metadata and Open Graph in `layout.tsx` and per-page
- Dynamic **sitemap** and **robots.txt**
- Next.js **SSR/SSG** where appropriate (e.g. branches, doctors pages)
- Responsive layout and fast loading

---

Built for Popular Hospital. Adjust branding, content, and env vars for your deployment.
