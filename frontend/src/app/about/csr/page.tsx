import Image from 'next/image';

export default function CSRPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* ─── Hero Section ─── */}
      <div className="relative bg-[#0b1c43] text-white overflow-hidden min-h-[300px] md:min-h-[380px] flex flex-col justify-center py-12 sm:py-16">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
                alt="CSR Banner"
                fill
                className="object-cover opacity-40 mix-blend-overlay"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/80 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 sm:px-4 max-w-4xl mx-auto">
            <span className="text-hospital-orange font-bold text-xs uppercase tracking-[0.3em] mb-4 block drop-shadow-md">Our Impact</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading mb-4 text-white uppercase tracking-tight drop-shadow-md">Social Responsibility</h1>
            <div className="w-12 h-1 bg-hospital-orange mx-auto rounded-full mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-blue-100/70 leading-relaxed max-w-2xl mx-auto font-light">
                Healing beyond the hospital walls. Committed to creating a healthier, more equitable world through dedicated community outreach.
            </p>
        </div>
      </div>
    </div>
  );
}
