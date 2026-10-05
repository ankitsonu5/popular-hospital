import { NextResponse, type NextRequest } from "next/server";

// Blocks pages that the admin hid from the Nav Menu Manager, so they cannot be
// opened by typing the URL either (response is a real 404).

const BACKEND = process.env.BACKEND_API_URL || "http://localhost:5100";
const CACHE_MS = 5000;

// Single-segment parents whose children are separate menu entries -> exact match only.
const EXACT_ONLY = new Set(["/about"]);
const COLUMNS_GROUP_PREFIX = "Mega-menu Columns";

interface MenuItem {
  label: string;
  href: string;
  hidden?: boolean;
  group?: string;
}
interface Menu {
  hidden?: boolean;
  items?: MenuItem[];
}
interface Entry {
  href: string;
  hidden: boolean;
}

let cache: { at: number; entries: Entry[] } | null = null;

function toEntries(menus: Menu[]): Entry[] {
  const entries: Entry[] = [];
  for (const menu of menus) {
    const items = menu.items || [];
    const hiddenColumns = new Set(
      items
        .filter((i) => i.group?.startsWith(COLUMNS_GROUP_PREFIX) && i.hidden)
        .map((i) => i.label)
    );
    for (const item of items) {
      entries.push({
        href: item.href,
        hidden: !!(menu.hidden || item.hidden || (item.group && hiddenColumns.has(item.group))),
      });
    }
  }
  return entries;
}

async function getEntries(): Promise<Entry[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.entries;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch(`${BACKEND}/api/nav-menus`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (res.ok) {
      const menus = (await res.json()) as Menu[];
      if (Array.isArray(menus)) {
        cache = { at: Date.now(), entries: toEntries(menus) };
        return cache.entries;
      }
    }
  } catch {
    // backend down -> fail open (use last known data if any)
  }
  return cache?.entries ?? [];
}

export async function proxy(request: NextRequest) {
  let path = request.nextUrl.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  const entries = await getEntries();
  if (entries.length === 0) return NextResponse.next();

  // Most specific (longest) matching menu entry decides.
  let best: Entry | null = null;
  for (const e of entries) {
    const match = path === e.href || (!EXACT_ONLY.has(e.href) && path.startsWith(e.href + "/"));
    if (match && (!best || e.href.length > best.href.length)) best = e;
  }

  if (best?.hidden) {
    // Rewrite to a non-existent path -> Next renders the 404 page with a 404 status.
    return NextResponse.rewrite(new URL("/__page-hidden__", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api-backend|uploads|images|videos|admin-dashboard|admin-login|reset-admin-password|favicon|.*\\..*).*)",
  ],
};
