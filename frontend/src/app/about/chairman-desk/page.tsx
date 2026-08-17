import Image from "next/image";
import ChairmanSchema from "@/components/schema/ChairmanSchema";
import DynamicSchema from "@/components/schema/DynamicSchema";

const chairmanData = {
  name: "Dr. A.K. Kaushik",
  role: "CHAIRMAN",
  qualifications: "POPULAR GROUP OF HOSPITALS",
  subtitle: "MBBS, MS (GEN. SURGERY)",
  extra: "INSTITUTE OF MEDICAL SCIENCES, BHU, VARANASI",
  image: "/images/dr_ak_kaushik.png",
  message: [
    "With ever changing trends in medical care Popular Hospital has also evolved in the last four decades. Popular Hospital today is a comprehensive superspecialty hospital with tertiary care services. We aim to provide excellent nursing care which is the backbone of good health care. We have a team of dedicated and highly skilled doctors who are committed towards their services to mankind. A good service can only be rendered when ample individu al attention is given to cater to the health concerns. On this Popular Hospital built on, which was sound, and however tough the going got, we never compromised on this. Popular Hospital is a hospital of experienced and ethical physicians with a clear vision and with their sincere effort it has been possible for us to mountain standards comparable with those of renowned hospitals in the city.",
    "The task before me is a daunting and demanding task to ensure that the accreditation status of all our training programmes is regained and maintained. In the recent past the Hospital has given priority to improving the quality and standard of service In the coming year, the Popular Hospital will focus on two initiatives to improve patient care services: Making the hospital more patient-friendly (through SMS reminders to patients, walk ins for those patients who need to be seen urgently, courtesy and better rapport with patients and their relatives). Maximizing effective use of resources (through higher turnover and decreased waiting time for consultations / procedures / surgery, utilization management, shorter length of hospital stay and day care).",
    "In keeping with its tertiary-care character, the hospital has expanded and upgraded its critical care facilities and high-tech equipments. The various specialities and sub-specialities have also continuously improved our in-house capacity and have made Varanasi largely sufficient in terms of medical care. I hope that, with the dedication of our staff, Popular Hospital will work towards a higher level of excellence, keep abreast with the ever changing medical technology, in the Varanasi.",
  ],
};


import { generatePageMetadata } from "@/lib/seoApi";

export async function generateMetadata() {
  return generatePageMetadata("/about/chairman-desk", {
  title: "From Chairman's Desk | Popular Hospital",
  description:
    "A message from our Founder & Chairman, Dr. A.K. Kaushik, on the vision and evolution of Popular Hospital.",
  alternates: {
    canonical: "https://www.popularhospital.in/about/chairman-desk",
  },
});
}


export default function ChairmanDeskPage() {
  return (
    <>
      <DynamicSchema pageKey="chairman" fallback={<ChairmanSchema />} />
      <div className="bg-white min-h-screen pb-20">
        {/* Hero Header */}
        <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[180px] md:min-h-[220px] flex flex-col justify-center py-10">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/banners/about_us_cmd_md.jpg"
              alt="Chairman Desk Banner"
              fill
              className="object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c43]/70 via-[#0b1c43]/40 to-[#0b1c43]/70" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
              Foundation
            </span>
            <h1 className="text-3xl md:text-5xl xl:text-2xl font-black font-heading mb-3 text-white uppercase tracking-tight">
              From Chairman&apos;s Desk
            </h1>
            <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1366px] xl:max-w-5xl min-[1920px]:max-w-[1366px] px-4 py-12 lg:py-16 xl:py-10">
          <div className="bg-white relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Column: Chairman Info & Photo */}
              <div className="lg:col-span-5 mb-10 lg:mb-0">
                <div className="space-y-6 sticky top-24 mt-4 lg:mt-6 w-[85%] md:w-3/4 lg:w-[90%] xl:w-[85%] mx-auto">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white p-3 pt-6">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.35rem]">
                      <Image
                        src={chairmanData.image}
                        alt={chairmanData.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="bg-[#1e5eb2] p-8 rounded-3xl border border-blue-400/20 shadow-xl text-white">
                    <h2 className="text-2xl md:text-3xl xl:text-xl font-black font-heading mb-2 uppercase tracking-tight">
                      {chairmanData.name}
                    </h2>
                    <p className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-4">
                      {chairmanData.role} - {chairmanData.qualifications}
                    </p>

                    <div className="space-y-1 text-xs md:text-sm font-medium uppercase opacity-90 leading-snug">
                      <p>{chairmanData.subtitle}</p>
                      <p>INSTITUTE OF MEDICAL SCIENCES</p>
                      <p>BHU, VARANASI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content Area */}
              <div className="lg:col-span-7 relative pt-2">
                <div className="mb-6 xl:mb-4 2xl:mb-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-5xl font-black text-[#0b1c43] font-heading leading-tight italic">
                    A Vision for Excellence <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-hospital-teal to-[#2563eb]">
                      in Modern Healthcare
                    </span>
                  </h3>
                </div>

                <div className="space-y-4 md:space-y-4.5">
                  {chairmanData.message.map((para, i) => (
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
    </>
  );
}
