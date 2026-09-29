export type Block =
  | { type: "para"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: { title: string; text: string }[] }
  | { type: "callout"; text: string }
  | { type: "flow"; steps: string[] }
  | { type: "pills"; items: string[] }
  | { type: "tags"; items: string[] }
  | { type: "lines"; items: string[] }
  | { type: "quote"; text: string };

export type Section = { heading: string; blocks: Block[] };

export const managementTeam = [
  {
    slug: "dr-manuj-mittal",
    name: "Dr. Manuj Mittal",
    role: "Group Vice Chairman",
    org: "Popular Group of Hospitals, Varanasi",
    image: "/images/leadership/dr-manuj-mittal.jpg",
    tagline:
      "Healthcare Group Vice Chairman | Global Healthcare Strategist | Healthcare Growth Architect | International Healthcare Leader",
    positions: [
      "Group Vice Chairman – Popular Group of Hospitals, Varanasi",
      "Group Director and Head International, Park Group of Hospitals",
      "Chairman – International Chamber of Healthcare & Medical Tourism (ICHMT) Foundation",
      "Chairman – Swasth Bharat Bhavya Mission",
      "CEO – Vedancure Healthcare LLP",
      "CEO – Microsystems Technologies & Healthcare",
    ],
    summary:
      "A healthcare strategist, institutional transformation leader and healthcare growth architect with extensive experience across hospital management, international healthcare, medical tourism, technology and organizational growth.",
  },
];

export const drManujMittalSections: Section[] = [
  {
    heading: "Executive Leadership Profile",
    blocks: [
      {
        type: "para",
        text: "Dr. Manuj Mittal is a healthcare strategist, institutional transformation leader and healthcare growth architect with extensive experience across hospital management, healthcare business development, international healthcare, medical tourism, technology, digital transformation, strategic partnerships and organizational growth.",
      },
      {
        type: "para",
        text: "As Group Vice Chairman of Popular Group of Hospitals, Varanasi, Dr. Mittal provides strategic leadership across the Group with a broad mandate covering business growth, institutional transformation, operational excellence, revenue enhancement, EBITDA improvement, brand development, patient acquisition, digital transformation, technology adoption, strategic partnerships and long-term organizational development.",
      },
      {
        type: "para",
        text: "His role extends beyond individual hospital operations. He is focused on building the entire healthcare group as a high-performance, technology-enabled, financially sustainable and professionally managed healthcare institution, with an ambition to create a nationally recognized healthcare brand from Eastern Uttar Pradesh.",
      },
      { type: "para", text: "His leadership philosophy brings together five critical dimensions:" },
      {
        type: "callout",
        text: "Clinical Excellence + Patient Experience + Technology + Operational Discipline + Sustainable Growth",
      },
    ],
  },
  {
    heading: "Group Transformation & Business Growth",
    blocks: [
      {
        type: "para",
        text: "At Popular Group of Hospitals, Dr. Mittal is focused on developing a comprehensive growth architecture for the Group covering:",
      },
      {
        type: "bullets",
        items: [
          "Hospital business transformation and institutional development",
          "OPD and IPD growth",
          "Revenue and EBITDA enhancement",
          "Bed occupancy optimization",
          "Patient acquisition and conversion",
          "Doctor engagement and physician partnerships",
          "Corporate and institutional business",
          "Government and PSU healthcare business",
          "TPA and insurance business development",
          "Railway, ECHS and other institutional referrals",
          "Diagnostics and laboratory growth",
          "Pharmacy business development",
          "Oncology and other high-value clinical specialties",
          "Medical technology and advanced healthcare infrastructure",
          "Digital marketing and brand transformation",
          "AI-enabled hospital management",
          "Business intelligence and data-driven decision-making",
          "Process automation and operational monitoring",
          "Recruitment, manpower planning and organizational strengthening",
          "New hospital and service-line development",
          "Strategic alliances and external partnerships",
          "Regional expansion and market development",
        ],
      },
      {
        type: "para",
        text: "The objective is to transform the Group from a conventional hospital network into a fully integrated healthcare enterprise with multiple engines of sustainable growth.",
      },
    ],
  },
  {
    heading: "Building a High-Performance Healthcare Organization",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal’s approach is based on the belief that hospital growth cannot depend solely on increasing patient numbers. Sustainable growth requires simultaneous improvement across clinical performance, patient experience, operational efficiency, financial performance, technology and brand reputation.",
      },
      { type: "para", text: "His strategic framework therefore focuses on:" },
      {
        type: "numbered",
        items: [
          {
            title: "Revenue Growth",
            text: "Creating multiple and sustainable revenue streams across OPD, IPD, diagnostics, pharmacy, critical care, surgery, oncology, corporate healthcare, insurance, government panels and international patients.",
          },
          {
            title: "EBITDA Improvement",
            text: "Improving hospital profitability through better capacity utilization, procurement discipline, manpower optimization, revenue-cycle management, specialty development and reduction of operational leakages.",
          },
          {
            title: "Patient Acquisition",
            text: "Building structured referral ecosystems involving doctors, corporates, government institutions, PSUs, TPAs, insurance companies, community organizations and digital platforms.",
          },
          {
            title: "Patient Conversion",
            text: "Improving the journey from enquiry to OPD, OPD to investigation, investigation to admission and admission to treatment completion.",
          },
          {
            title: "Capacity Utilization",
            text: "Maximizing utilization of existing hospital infrastructure, operating theatres, ICU capacity, diagnostic equipment, specialty services and clinical manpower before pursuing unnecessary capital expansion.",
          },
          {
            title: "Brand Transformation",
            text: "Positioning the hospital group as a trusted, modern and technology-driven healthcare institution with strong clinical capabilities and exceptional patient experience.",
          },
          {
            title: "Digital Transformation",
            text: "Using AI, automation, CRM, digital marketing, dashboards, business intelligence and real-time analytics to make hospital management more measurable and responsive.",
          },
        ],
      },
    ],
  },
  {
    heading: "Strategic Leadership Across the Entire Healthcare Value Chain",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal’s leadership encompasses the complete healthcare business ecosystem:",
      },
      {
        type: "flow",
        steps: [
          "Patient Acquisition",
          "OPD",
          "Diagnostics",
          "Clinical Consultation",
          "Admission",
          "Surgery / Treatment",
          "Pharmacy",
          "Discharge",
          "Follow-up",
          "Patient Loyalty",
          "Referrals",
        ],
      },
      {
        type: "para",
        text: "This integrated approach enables hospitals to move from fragmented departmental performance toward group-wide business intelligence and coordinated institutional growth.",
      },
    ],
  },
  {
    heading: "International Healthcare & Global Business Leadership",
    blocks: [
      {
        type: "para",
        text: "Prior to his current leadership role, Dr. Mittal served as Group Director and Head International at Park Group of Hospitals, where his responsibilities included international expansion, international patient services, medical tourism, cross-border healthcare partnerships, strategic alliances and global business development.",
      },
      {
        type: "para",
        text: "His international healthcare experience encompasses relationship development with:",
      },
      {
        type: "bullets",
        items: [
          "International hospitals and healthcare groups",
          "Governments and government-linked institutions",
          "Embassies and diplomatic networks",
          "Insurance companies and TPAs",
          "International patient facilitators",
          "Corporate organizations",
          "Investors and strategic partners",
          "Healthcare technology organizations",
          "Medical institutions and universities",
          "International healthcare associations",
          "Overseas referral networks",
        ],
      },
      {
        type: "para",
        text: "He has worked toward developing healthcare institutions as internationally connected medical destinations, with particular emphasis on patient mobility, healthcare partnerships, medical tourism and cross-border healthcare collaboration.",
      },
    ],
  },
  {
    heading: "Global Healthcare Diplomacy",
    blocks: [
      {
        type: "para",
        text: "As Chairman of the International Chamber of Healthcare & Medical Tourism Foundation (ICHMT), Dr. Mittal works at the intersection of healthcare, international collaboration, medical tourism, healthcare diplomacy, policy advocacy, investment and institutional partnerships.",
      },
      { type: "para", text: "ICHMT provides a platform for collaboration between:" },
      {
        type: "pills",
        items: [
          "Hospitals",
          "Governments",
          "Healthcare Institutions",
          "Insurance Organizations",
          "Investors",
          "Technology Companies",
          "International Healthcare Leaders",
        ],
      },
      {
        type: "para",
        text: "His broader objective is to strengthen India’s position as a trusted destination for ethical, affordable, high-quality and technology-enabled healthcare.",
      },
    ],
  },
  {
    heading: "National Healthcare Development",
    blocks: [
      {
        type: "para",
        text: "As Chairman of Swasth Bharat Bhavya Mission, Dr. Mittal contributes to a broader healthcare vision focused on healthcare accessibility, preventive healthcare, public health awareness, community outreach and strengthening India’s healthcare ecosystem.",
      },
      {
        type: "para",
        text: "His healthcare philosophy extends beyond tertiary hospital treatment toward:",
      },
      {
        type: "flow",
        steps: [
          "Prevention",
          "Awareness",
          "Early Detection",
          "Accessible Treatment",
          "Rehabilitation",
          "Long-Term Wellness",
        ],
      },
    ],
  },
  {
    heading: "Healthcare Technology & AI",
    blocks: [
      {
        type: "para",
        text: "A distinctive component of Dr. Mittal’s leadership is the integration of technology with healthcare business strategy.",
      },
      { type: "para", text: "He advocates the use of:" },
      {
        type: "bullets",
        items: [
          "Artificial Intelligence",
          "Hospital Information Systems",
          "Business Intelligence",
          "Predictive Analytics",
          "Digital CRM",
          "Automated patient communication",
          "Digital marketing analytics",
          "Revenue dashboards",
          "Operational dashboards",
          "Process automation",
          "Telehealth and digital healthcare",
          "Data-driven management",
          "Technology-enabled patient experience",
        ],
      },
      {
        type: "para",
        text: "His objective is to move healthcare organizations from intuition-based management to measurable, real-time and data-driven management.",
      },
    ],
  },
  {
    heading: "Healthcare Consulting & Entrepreneurship",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal is the CEO of Vedancure Healthcare LLP, working across healthcare consulting, hospital advisory, healthcare innovation, medical tourism, business transformation and growth acceleration.",
      },
      {
        type: "para",
        text: "He is also associated with Microsystems Technologies & Healthcare, working across healthcare IT, AI-enabled healthcare solutions, automation, medical transcription, business process management, digital healthcare transformation and healthcare outsourcing.",
      },
      {
        type: "para",
        text: "Public corporate records also identify Manuj Mittal as a designated partner of Vedancure Healthcare LLP.",
      },
    ],
  },
  {
    heading: "Corporate, Government & Institutional Business",
    blocks: [
      {
        type: "para",
        text: "A major area of Dr. Mittal’s strategic focus is developing hospitals beyond conventional walk-in patient acquisition.",
      },
      {
        type: "para",
        text: "He works toward building long-term institutional relationships with:",
      },
      {
        type: "bullets",
        items: [
          "Large corporations",
          "PSUs",
          "Mining and industrial organizations",
          "Government departments",
          "Railways",
          "ECHS",
          "Insurance companies",
          "TPAs",
          "Banks and financial institutions",
          "Educational institutions",
          "Manufacturing organizations",
          "Employee welfare programs",
          "Community organizations",
        ],
      },
      {
        type: "para",
        text: "The objective is to establish hospitals as preferred healthcare partners for large institutions and entire employee/family ecosystems.",
      },
    ],
  },
  {
    heading: "Physician & Clinical Network Development",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal places significant emphasis on creating strong relationships between hospitals and the wider medical community.",
      },
      { type: "para", text: "His approach includes:" },
      {
        type: "bullets",
        items: [
          "Physician engagement",
          "Referral-network development",
          "Specialist partnerships",
          "Clinical outreach",
          "CME and professional engagement",
          "Second-opinion programs",
          "Institutional referral systems",
          "Doctor relationship management",
          "Regional clinical networks",
        ],
      },
      {
        type: "para",
        text: "The goal is to build a healthcare ecosystem in which hospitals, doctors, diagnostic centers and referring institutions work together around the patient.",
      },
    ],
  },
  {
    heading: "Brand & Market Development",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal views healthcare branding as an institutional responsibility rather than simply advertising.",
      },
      { type: "para", text: "His strategic approach combines:" },
      {
        type: "callout",
        text: "Clinical Reputation + Patient Experience + Digital Presence + Community Trust + Physician Relationships + Institutional Partnerships",
      },
      {
        type: "para",
        text: "He focuses on strengthening the hospital’s visibility across traditional media, digital platforms, social media, corporate relationships, community outreach and referral ecosystems.",
      },
    ],
  },
  {
    heading: "Organizational Leadership",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal believes that sustainable institutional growth requires the development of strong teams.",
      },
      { type: "para", text: "His leadership focus includes:" },
      {
        type: "bullets",
        items: [
          "Leadership development",
          "Accountability systems",
          "KPI-based performance",
          "Cross-functional coordination",
          "Manpower planning",
          "Talent acquisition",
          "Training and capability building",
          "Performance management",
          "Departmental ownership",
          "Execution discipline",
          "Leadership succession",
        ],
      },
      {
        type: "para",
        text: "His objective is to create organizations where every department understands its contribution to patient care, institutional performance and financial sustainability.",
      },
    ],
  },
  {
    heading: "Healthcare Growth Architect",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal is positioned as a Healthcare Growth Architect, combining strategic vision with execution across the healthcare enterprise.",
      },
      { type: "para", text: "His core areas of expertise include:" },
      {
        type: "tags",
        items: [
          "Hospital Business Transformation",
          "Strategic Planning",
          "Revenue & EBITDA Growth",
          "OPD & IPD Growth",
          "Patient Acquisition & Conversion",
          "Healthcare Marketing & Brand Transformation",
          "AI & Digital Transformation",
          "Business Intelligence & Analytics",
          "Physician Engagement",
          "Corporate & Government Business Development",
          "Insurance & TPA Business",
          "International Healthcare & Medical Tourism",
          "Strategic Partnerships",
          "Healthcare Technology",
          "Operational Excellence",
          "Investment & Expansion Strategy",
          "Organizational Leadership",
        ],
      },
    ],
  },
  {
    heading: "Vision for Popular Group of Hospitals",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal’s long-term vision is to help build Popular Group of Hospitals into one of India’s most respected and professionally managed regional healthcare groups, with strong clinical capabilities, advanced technology, excellent patient experience and sustainable financial performance.",
      },
      {
        type: "para",
        text: "The vision is to develop the Group as a healthcare ecosystem rather than simply a collection of hospitals. This includes strengthening:",
      },
      {
        type: "pills",
        items: [
          "Hospitals",
          "Diagnostics",
          "Pharmacy",
          "Oncology",
          "Emergency Care",
          "Critical Care",
          "Specialty Centres",
          "Digital Healthcare",
          "Corporate Healthcare",
          "Insurance & TPA",
          "Government Business",
          "International Patients",
          "Preventive Healthcare",
        ],
      },
      {
        type: "para",
        text: "The ultimate objective is to create a scalable healthcare platform capable of serving patients across Eastern Uttar Pradesh, neighbouring regions and international markets.",
      },
    ],
  },
  {
    heading: "Leadership Philosophy",
    blocks: [
      { type: "para", text: "Dr. Mittal believes:" },
      {
        type: "quote",
        text: "Healthcare leadership is not only about treating patients; it is about building institutions capable of delivering better healthcare to millions of patients for generations.",
      },
      { type: "para", text: "His leadership philosophy is built around:" },
      {
        type: "lines",
        items: [
          "Patient First.",
          "People First.",
          "Execution First.",
          "Technology with Purpose.",
          "Growth with Responsibility.",
          "Profitability with Integrity.",
          "Innovation with Human Touch.",
        ],
      },
    ],
  },
  {
    heading: "Future of Healthcare",
    blocks: [
      {
        type: "para",
        text: "Dr. Mittal believes the next generation of healthcare organizations will be defined by the convergence of:",
      },
      {
        type: "callout",
        text: "Clinical Excellence + Artificial Intelligence + Data + Technology + Operational Discipline + Patient Experience + Financial Sustainability + Global Connectivity",
      },
      {
        type: "para",
        text: "His mission is to help create healthcare institutions that are clinically excellent, technologically advanced, operationally efficient, financially sustainable, globally connected and deeply trusted by patients and society.",
      },
    ],
  },
  {
    heading: "Leadership Signature",
    blocks: [
      {
        type: "callout",
        text: "Strategy • Innovation • Growth • Technology • Healthcare Excellence",
      },
      {
        type: "pills",
        items: ["Patient Value", "Institutional Performance", "Sustainable Growth"],
      },
      {
        type: "para",
        text: "Dr. Manuj Mittal is committed to building healthcare organizations that do not merely grow in size, but grow in quality, capability, reputation, impact and long-term institutional value.",
      },
    ],
  },
];
