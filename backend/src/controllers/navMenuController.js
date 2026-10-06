import NavMenu from "../models/NavMenu.js";

const COLUMNS_GROUP = "Mega-menu Columns (poora column hide/show)";

// Header.tsx ke specialtiesContent se match karta hai
const SUPER_SPECIALTIES = [
  ["Cardiology", "/departments/cardiology"],
  ["Cardiothoracic & Vascular Surgery (CTVS)", "/departments/ctvs"],
  ["Neurosurgery", "/departments/neurosurgery"],
  ["Gastroenterology", "/departments/gastroenterology"],
  ["Nephrology", "/departments/nephrology"],
  ["Oncology", "/departments/oncology"],
  ["Urology", "/departments/urology"],
  ["Burns & Plastic Surgery", "/departments/burns-plastic-surgery"],
  ["Interventional Radiology", "/departments/interventional-radiology"],
  ["Pediatric Surgery", "/departments/pediatric-surgery"],
  ["Pediatric Cardiology", "/departments/pediatric-cardiology"],
];

const CORE_SPECIALTIES = [
  ["Laparoscopy & General Surgery", "/departments/general-surgery"],
  ["Obstetrics & Gynaecology", "/departments/gynaecology"],
  ["Pediatrics And Neonatology", "/departments/pediatrics"],
  ["Orthopedics & Joint Replacement", "/departments/orthopedics"],
  ["General Medicine", "/departments/general-medicine"],
  ["IVF & Fertility", "/departments/ivf-fertility"],
  ["ENT", "/departments/ent"],
  ["Dietetics & Nutrition", "/departments/dietetics-nutrition"],
  ["Ophthalmology", "/departments/ophthalmology"],
  ["Dental", "/departments/dental"],
  ["Respiratory Medicine", "/departments/respiratory"],
  ["Pain Medicine", "/departments/pain-management"],
  ["Psychiatry Department", "/departments/psychiatry"],
  ["Advanced Diabetic Foot Unit", "/departments/diabetic-foot"],
];

const toItems = (list, group) =>
  list.map(([label, href]) => ({ label, href, hidden: false, group }));

// Default menu structure (Header.tsx se match karta hai)
const DEFAULT_MENUS = [
  {
    menuKey: "about-us",
    label: "About Us",
    hidden: false,
    items: [
      { label: "Overview", href: "/about", hidden: false },
      { label: "Our Vision", href: "/about/our-vision-2030", hidden: false },
      { label: "Our Mission", href: "/about/mission", hidden: false },
      { label: "From Chairman's Desk", href: "/about/chairman-desk", hidden: false },
      { label: "From Vice Chairman's Desk", href: "/about/vice-chairman-desk", hidden: false },
      { label: "From MD's Desk", href: "/about/md-desk", hidden: false },
      { label: "Leadership Team", href: "/about/leadership", hidden: false },
      { label: "Management Team", href: "/about/management-team", hidden: false },
      { label: "Awards & Recognition", href: "/about/awards-recognition", hidden: false },
      { label: "Infrastructure & Technology", href: "/about/infrastructure-technology", hidden: false },
      { label: "Social Responsibility (SR)", href: "/about/csr", hidden: false },
      { label: "Cashless Empanelment", href: "/about/cashless-empanelment", hidden: false },
    ],
  },
  {
    menuKey: "popular-finds",
    label: "Popular Finds",
    hidden: false,
    items: [
      { label: "Our Doctors", href: "/doctors", hidden: false },
      { label: "Our Locations", href: "/our-locations", hidden: false },
      { label: "Patients Testimonial", href: "/stories", hidden: false },
      { label: "International Patients", href: "/services/international-patients", hidden: false },
      { label: "Free OPD and Offer", href: "/services/free-opd-offer", hidden: false },
    ],
  },
  {
    menuKey: "departments",
    label: "Departments",
    hidden: false,
    items: [
      { label: "Super Specialties", href: "/departments/super", hidden: false, group: COLUMNS_GROUP },
      { label: "Specialties", href: "/departments/core", hidden: false, group: COLUMNS_GROUP },
      ...toItems(SUPER_SPECIALTIES, "Super Specialties"),
      ...toItems(CORE_SPECIALTIES, "Specialties"),
    ],
  },
  {
    menuKey: "services",
    label: "Services",
    hidden: false,
    items: [
      { label: "Emergency And Trauma Care", href: "/services/emergency", hidden: false },
      { label: "Blood Bank", href: "/services/blood-bank", hidden: false },
      { label: "Ambulance", href: "/services/ambulance", hidden: false },
      { label: "Preventive Health Check Up", href: "/services/wellness-packages", hidden: false },
      { label: "Pharmacy", href: "/services/pharmacy", hidden: false },
      { label: "Pathological Services", href: "/services/pathology", hidden: false },
      { label: "Radiological Services", href: "/services/radiology", hidden: false },
      { label: "Home Care Services", href: "/services/home-care", hidden: false },
    ],
  },
  {
    menuKey: "media-blog",
    label: "Media & Blog",
    hidden: false,
    items: [
      { label: "News", href: "/media/news", hidden: false },
      { label: "Blog", href: "/blog", hidden: false },
      { label: "Press", href: "/media/coverage", hidden: false },
      { label: "Events", href: "/media/events", hidden: false },
    ],
  },
];

// Existing DB ko default structure ke saath merge karo.
// Naye items add hote hain; pehle se hidden items hidden hi rehte hain (href se match).
let synced = false;
async function ensureSynced() {
  if (synced) return;
  const existing = await NavMenu.find();
  const byKey = new Map(existing.map((m) => [m.menuKey, m]));

  for (const def of DEFAULT_MENUS) {
    const cur = byKey.get(def.menuKey);
    if (!cur) {
      await NavMenu.create(def);
      continue;
    }
    const hiddenByHref = new Map(cur.items.map((i) => [i.href, !!i.hidden]));
    const merged = def.items.map((i) => ({
      label: i.label,
      href: i.href,
      group: i.group || "",
      hidden: hiddenByHref.has(i.href) ? hiddenByHref.get(i.href) : false,
    }));
    const same =
      merged.length === cur.items.length &&
      merged.every((m, idx) => {
        const c = cur.items[idx];
        return (
          c.label === m.label &&
          c.href === m.href &&
          (c.group || "") === m.group &&
          !!c.hidden === m.hidden
        );
      });
    if (!same) {
      cur.items = merged;
      await cur.save();
    }
  }
  synced = true;
}

// GET /api/nav-menus — public (website header + URL guard ke liye)
export const getPublicNavMenus = async (req, res) => {
  try {
    await ensureSynced();
    const menus = await NavMenu.find().sort({ menuKey: 1 });
    res.set("Cache-Control", "no-store");
    res.json(menus);
  } catch (error) {
    console.error("getPublicNavMenus error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/cms/nav-menus — admin (full data)
export const getAdminNavMenus = async (req, res) => {
  try {
    await ensureSynced();
    const menus = await NavMenu.find().sort({ menuKey: 1 });
    res.json(menus);
  } catch (error) {
    console.error("getAdminNavMenus error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /api/cms/nav-menus/:menuKey/toggle — poore group ko hide/unhide
export const toggleMenuGroup = async (req, res) => {
  try {
    const { menuKey } = req.params;
    const { hidden } = req.body;

    const menu = await NavMenu.findOneAndUpdate(
      { menuKey },
      { hidden: !!hidden },
      { new: true, upsert: false }
    );

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    res.json({ ok: true, menu });
  } catch (error) {
    console.error("toggleMenuGroup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /api/cms/nav-menus/:menuKey/items/:itemIndex/toggle — individual item hide/unhide
export const toggleMenuItem = async (req, res) => {
  try {
    const { menuKey, itemIndex } = req.params;
    const { hidden } = req.body;
    const idx = parseInt(itemIndex, 10);

    const menu = await NavMenu.findOne({ menuKey });
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    if (!menu.items[idx]) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    menu.items[idx].hidden = !!hidden;
    await menu.save();

    res.json({ ok: true, menu });
  } catch (error) {
    console.error("toggleMenuItem error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/cms/nav-menus/reset — default data restore karo
export const resetNavMenus = async (req, res) => {
  try {
    await NavMenu.deleteMany({});
    await NavMenu.insertMany(DEFAULT_MENUS);
    synced = true;
    const menus = await NavMenu.find().sort({ menuKey: 1 });
    res.json({ ok: true, menus });
  } catch (error) {
    console.error("resetNavMenus error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
