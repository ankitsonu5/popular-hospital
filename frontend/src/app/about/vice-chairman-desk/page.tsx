import Image from "next/image";

const viceChairmanData = {
  name: "MANUJ MITTAL",
  role: "GROUP VICE CHAIRMAN",
  qualifications: "POPULAR GROUP OF HOSPITALS, VARANASI",
  title1: "CHAIRMAN - INTERNATIONAL CHAMBER OF HEALTHCARE AND MEDICAL TOURISM FOUNDATION",
  title2: "CHAIRMAN - SWASTH BHARAT BHAVYA MISSION",
  image: "/images/manujmittal.png",
  message: [
    "MANUJ MITTAL Group Vice Chairman-Popular Group of Hospitals| Chairman-International Chamber of Healthcare and Medical Tourism Foundation | Chairman-Swasth Bharat Bhavya Mission Manuj Mittal is an internationally recognized healthcare leader, hospital business transformation specialist, and strategic growth executive with nearly three decades of experience in hospital management, corporate healthcare, international business, medical tourism, healthcare technology, digital transformation, Artificial Intelligence (AI), and institutional leadership.",
    "He currently serves as the Group Vice Chairman, Popular Group of Hospitals, Varanasi, where he is leading the strategic transformation of the group by driving sustainable business growth, operational excellence, revenue expansion, EBITDA improvement, digital transformation, AI-enabled healthcare marketing, branding, physician engagement, patient acquisition, international collaborations, and organizational excellence.",
    "He also served as the Group Director International, Park Group of Hospitals, leading global expansion, international patient services, cross-border healthcare partnerships, medical tourism, international marketing, strategic alliances, and worldwide business development initiatives.",
    "Manuj is the Chairman of the International Chamber of Healthcare & Medical Tourism Foundation (ICHMT Foundation), a global platform dedicated to strengthening international healthcare collaboration, medical tourism, healthcare diplomacy, policy advocacy, investment promotion, and strategic partnerships between hospitals, governments, healthcare institutions, and industry leaders worldwide.",
    "He is also the Chairman of Swasth Bharat Bhavya Mission, a national healthcare initiative committed to improving healthcare accessibility, preventive healthcare, public health awareness, community outreach, and strengthening India’s healthcare ecosystem.",
    "In addition, he serves as the Chief Executive Officer (CEO) of Vedancure Healthcare LLP, providing strategic healthcare consulting, hospital advisory, healthcare innovation, medical tourism development, business transformation, and growth acceleration services for healthcare organizations.",
    "He is also the Chief Executive Officer (CEO) of Microsystems Technologies & Healthcare, a leading healthcare technology organization specializing in healthcare IT, medical transcription, business process management, AI-enabled healthcare solutions, automation, digital healthcare transformation, and global healthcare outsourcing.",
    "Widely regarded as a Hospital Growth Architect, Manuj has successfully helped healthcare organizations accelerate business growth, improve operational efficiency, optimize revenue, enhance EBITDA, strengthen market positioning, develop high-performing teams, and build sustainable healthcare enterprises.",
    "His expertise spans Hospital Business Transformation, Strategic Planning, Revenue & EBITDA Growth, OPD & IPD Expansion, Healthcare Marketing, AI-Powered Digital Transformation, Branding, Corporate & Government Business Development, International Business, Medical Tourism, Healthcare Technology, Business Intelligence, Operational Excellence, Patient Experience, Healthcare Innovation, Investment Strategy, Institutional Development, and Organizational Leadership.",
    "Throughout his distinguished career, Manuj has established strategic relationships with hospitals, healthcare groups, governments, insurance companies, TPAs, multinational corporations, investors, technology organizations, and international healthcare partners across India and globally, creating sustainable business ecosystems that drive long-term growth and value creation.",
    "Known for visionary leadership, strategic thinking, and flawless execution, he combines Artificial Intelligence, advanced healthcare marketing, business intelligence, automation, technology, and data-driven decision-making to help healthcare institutions significantly increase patient volumes, revenue, profitability, EBITDA, operational efficiency, brand equity, and organizational performance",
    "His mission is simple yet ambitious—to transform hospitals into world-class healthcare institutions that deliver clinical excellence, operational efficiency, financial sustainability, innovation, exceptional patient experience, and long-term value for patients, healthcare professionals, investors, and society."
  ],
};

export const metadata = {
  title: "From Vice Chairman's Desk | Popular Hospital",
  description:
    "A message from our Group Vice Chairman, Manuj Mittal, on strategic transformation and operational excellence at Popular Group of Hospitals.",
  alternates: {
    canonical: "https://popularhospital.in/about/vice-chairman-desk",
  },
};

export default function ViceChairmanDeskPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/about_us_cmd_md.jpg"
            alt="Vice Chairman Desk Banner"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
            Leadership & Growth
          </span>
          <h1 className="text-3xl md:text-5xl xl:text-4xl font-black font-heading mb-4 text-white uppercase tracking-tight">
            From Vice Chairman&apos;s Desk
          </h1>
          <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] px-4 py-16 lg:py-24 xl:py-12">
        <div className="bg-white relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Vice Chairman Info & Photo */}
            <div className="lg:col-span-5 mb-10 lg:mb-0">
              <div className="space-y-6 sticky top-24 w-[85%] md:w-3/4 lg:w-[90%] xl:w-[85%] mx-auto">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-slate-50">
                  <Image
                    src={viceChairmanData.image}
                    alt={viceChairmanData.name}
                    fill
                    className="object-cover object-top"
                    priority
                    unoptimized
                  />
                </div>
                <div className="bg-[#1e5eb2] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-blue-400/20 shadow-xl text-white">
                  <h2 className="text-xl md:text-2xl xl:text-xl font-black font-heading mb-1 uppercase tracking-tight">
                    {viceChairmanData.name}
                  </h2>
                  <p className="text-yellow-400 font-bold text-xs md:text-[13px] tracking-wide uppercase mb-2.5 leading-snug">
                    {viceChairmanData.role} - {viceChairmanData.qualifications}
                  </p>
                  <div className="space-y-1.5 text-[10px] md:text-[10.5px] font-normal uppercase opacity-90 leading-[1.35]">
                    <p>{viceChairmanData.title1}</p>
                    <p>{viceChairmanData.title2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content Area */}
            <div className="lg:col-span-7 relative pt-2">
              <div className="mt-2 mb-6 xl:mt-0 2xl:mb-8 text-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic">
                  <span className="block">Strategic Transformation</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]">
                    &amp; Healthcare Innovation
                  </span>
                </h3>
              </div>

              <div className="space-y-4 md:space-y-4.5">
                {viceChairmanData.message.map((para, i) => (
                  <p
                    key={i}
                    className="text-[14px] md:text-[15px] xl:text-[14.5px] 2xl:text-[15.5px] text-gray-600 leading-relaxed font-normal text-justify"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
