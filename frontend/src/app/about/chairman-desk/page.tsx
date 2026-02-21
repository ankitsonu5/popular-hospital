import Image from 'next/image';

const chairmanData = {
  name: "Dr. A.K. Kaushik",
  role: "CHAIRMAN",
  qualifications: "POPULAR GROUP OF HOSPITALS",
  subtitle: "MBBS, MS (GEN. SURGERY)",
  extra: "INSTITUTE OF MEDICAL SCIENCES, BHU, VARANASI",
  image: "/images/leadership/dr-ak-kaushik.jpg",
  message: [
    "With ever changing trends in medical care Popular Hospital has also evolved in the last four decades. Popular Hospital today is a comprehensive superspecialty hospital with tertiary care services. We aim to provide excellent nursing care which is the backbone of good health care. We have a team of dedicated and highly skilled doctors who are committed towards their services to mankind. A good service can only be rendered when ample individual attention is given to cater to the health concerns. On this Popular Hospital built on, which was sound, and however tough the going got, we never compromised on this. Popular Hospital is a hospital of experienced and ethical physicians with a clear vision and with their sincere effort it has been possible for us to mountain standards comparable with those of renowned hospitals in the city.",
    "The task before me is a daunting and demanding task to ensure that the accreditation status of all our training programmes is regained and maintained. In the recent past the Hospital has given priority to improving the quality and standard of service In the coming year, the Popular Hospital will focus on two initiatives to improve patient care services: Making the hospital more patient-friendly (through SMS reminders to patients, walk ins for those patients who need to be seen urgently, courtesy and better rapport with patients and their relatives). Maximizing effective use of resources (through higher turnover and decreased waiting time for consultations / procedures / surgery, utilization management, shorter length of hospital stay and day care).",
    "In keeping with its tertiary-care character, the hospital has expanded and upgraded its critical care facilities and high-tech equipments. The various specialities and sub-specialities have also continuously improved our in-house capacity and have made Varanasi largely sufficient in terms of medical care. I hope that, with the dedication of our staff, Popular Hospital will work towards a higher level of excellence, keep abreast with the ever changing medical technology, in the Varanasi."
  ]
};

export const metadata = {
  title: "From Chairman's Desk | Popular Hospital",
  description: "A message from our Founder & Chairman, Dr. A.K. Kaushik, on the vision and evolution of Popular Hospital.",
};

export default function ChairmanDeskPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative bg-[#0b1c43] text-white py-12 md:py-16">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Foundation</span>
          <h1 className="text-3xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tight">From Chairman's Desk</h1>
          <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Chairman Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src={chairmanData.image}
                  alt={chairmanData.name}
                  fill
                  className="object-cover"
                  priority
                />
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="text-2xl font-black text-[#0b1c43] font-heading mb-1 uppercase tracking-tight">
                  {chairmanData.name}
                </h2>
                <p className="text-hospital-orange font-bold text-xs tracking-widest uppercase mb-6">{chairmanData.role}</p>

            </div>
          </div>

          {/* Right: Message Area */}
          <div className="lg:col-span-7 flex flex-col pt-4">
             <div className="bg-white p-2 md:p-4 relative">
                <div className="absolute top-0 left-0 w-16 h-1 bg-hospital-teal rounded-full"></div>
                <div className="mt-8 space-y-8">
                  {chairmanData.message.map((para, i) => (
                    <p key={i} className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-16 pt-12 border-t border-gray-100 italic text-gray-400 text-lg">
                    Touching thousands of lives with compassion, excellence, and modern medical science.
                </div>

                <div className="mt-12 group">
                   <span className="text-hospital-teal font-signature text-3xl mb-2 italic block">A.K. Kaushik</span>
                   <div className="w-20 h-0.5 bg-gray-100 group-hover:bg-hospital-teal transition-all duration-500 mb-2"></div>
                   <p className="text-sm font-black text-[#0b1c43] uppercase tracking-widest">{chairmanData.name}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-wider">Founder & Chairman</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
