import Image from 'next/image';

const mdData = {
  name: "Dr. Kiran Kaushik",
  role: "MANAGING DIRECTOR",
  qualifications: "POPULAR GROUP OF HOSPITALS & ACADEMICS",
  subtitle: "MBBS, MD (OBS & GYNAE), MS-BHU",
  extra: "SR. OBS., GYNAE. & FERTILITY EXPERT",
  image: "/images/leadership/kiran.png",
  message: [
    "It gives me immense pleasure to share that our hospital has completed 30 years of providing exceptional healthcare services to our community. Over the years, we have strived to set new standards in patient care and have become a trusted name in the healthcare industry of Purvanchal region.",
    "We have come a long way since our humble beginnings, starting as a single hospital and expanding to multiple adjoining districts like Mirzapur, Chunar and Bhadohi locations, providing world-class healthcare services. We have always believed in providing comprehensive and latest healthcare facilities to our patients. This has led to patients' and their families trust on our hospitals and our growth & success.",
    "At our hospital, we understand the importance of providing timely medical attention, that is why we offer round-the-clock emergency support services like ICU Ambulance, Radiology, Pathology, Pharmacy and Component Blood Bank including SDP. Our team of highly skilled doctors and healthcare professionals are always ready to provide prompt medical care to our patients in need.",
    "Our commitment to excellence and dedication to providing the best healthcare services have led us to become a Multi Super Specialty hospital. We offer a wide range of specialized services under one roof, including Emergency and Critical Care, Cardiac Sciences, Neurosciences, Gastroenterology, Nephrology Including Dialysis, Oncology, Urology, Burns & Plastic Surgery, Laparoscopic, Minimal Access, Laser & General Surgery, Obstetrics, Gynaecology & Fertility, Pediatrics & Neonatology, Trauma, Orthopedics & Joint Replacement, General Medicine, ENT, Ophthalmology and Dental Surgery, 24X7.",
    "Our state-of-the-art facilities and advanced medical equipment help us provide accurate diagnoses and effective treatments to our patients. We keep upgrading our equipment & adopt latest techniques to improve performance, service delivery and success rate. Continuous medical education sessions are conducted to help our doctors keep abreast with new developments in medicine. Other non-medical staff members also benefit from similar training sessions.",
    "As we continue to grow and evolve, our focus will always remain on providing the best healthcare services to our patients. We are committed to meet the ever-changing healthcare needs of our community and ensure that our patients receive the highest quality care possible.",
    "Thank you for your continued trust and support in our hospital. We look forward to serve you and your loved ones for many years to come."
  ]
};

export const metadata = {
  title: "From MD's Desk | Popular Hospital",
  description: "A message from our Managing Director, Dr. Kiran Kaushik, on her vision for excellence in healthcare.",
};

export default function MDDeskPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about_popular/from_chairman's_desk.png"
            alt="MD Desk Banner"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Perspective</span>
          <h1 className="text-3xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tight">From MD's Desk</h1>
          <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 lg:py-24">

        {/* Float-based layout: image floats left, text wraps around and below */}
        <div className="clearfix">

          {/* Floating image + name card block */}
          <div className="float-left w-full sm:w-[380px] lg:w-[460px] mr-10 mb-6 space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src={mdData.image}
                alt={mdData.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-black text-[#0b1c43] font-heading mb-1 uppercase tracking-tight">
                {mdData.name}
              </h2>
              <p className="text-hospital-orange font-bold text-xs tracking-widest uppercase">{mdData.role}</p>
            </div>
          </div>

          {/* Text area — wraps around image and continues below */}
          <div className="relative pt-2">
            <div className="absolute top-0 left-0 w-16 h-1 bg-hospital-teal rounded-full"></div>
            <div className="mt-8 mb-6">
              <h3 className="text-3xl md:text-4xl font-black text-[#0b1c43] font-heading leading-tight">
                A Commitment to <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]">Clinical Excellence</span>
              </h3>
            </div>

            <div className="space-y-6">
              {mdData.message.map((para, i) => (
                <p key={i} className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-gray-100 italic text-gray-400 text-lg">
              Touching thousands of lives with compassion, excellence, and modern medical science.
            </div>

            <div className="mt-12 group">
              <span className="text-hospital-teal font-signature text-3xl mb-2 italic block">Kiran Kaushik</span>
              <div className="w-20 h-0.5 bg-gray-100 group-hover:bg-hospital-teal transition-all duration-500 mb-2"></div>
              <p className="text-sm font-black text-[#0b1c43] uppercase tracking-widest">{mdData.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-wider">Managing Director</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
