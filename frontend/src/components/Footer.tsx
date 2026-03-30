import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#0b1c43]">
      <div className="bg-[#0b1c43] text-white rounded-t-[2.5rem] px-6 pt-12 pb-8 sm:px-10 sm:pt-16 sm:pb-10 md:px-16 lg:pt-20 lg:pb-12 mx-auto max-w-[1366px] relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
          style={{ 
            backgroundImage: 'url(/images/footer-pattern.svg)', 
            backgroundSize: '60px 60px',
            backgroundRepeat: 'repeat'
          }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
          {/* Column 1: Logo & Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-horizontal.png"
                alt="Popular Hospital"
                width={200}
                height={60}
                className="h-12 w-auto object-contain bg-white rounded-md px-2 py-1"
                priority
                sizes="200px"
              />
            </Link>
            
            <div className="space-y-6 text-[17px] text-gray-200">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Locations:</h4>
                <p className="leading-relaxed font-medium">
                  N-10 / 60, A-2,
                  <br />
                  B.L.W. ROAD, KAKARMATTA,
                  <br />
                  VARANASI 221004, <br />
                  UTTAR PRADESH, INDIA
                </p>
              </div>

              <div className="pt-4 space-y-2 border-t border-white/10 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Contact Us:</span>
                  <a href="tel:+917800001896" className="text-white hover:text-hospital-teal transition-colors font-bold">+91-7800001896</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Contact Us:</span>
                  <a href="tel:+917800001895" className="text-white hover:text-hospital-teal transition-colors font-bold">+91-7800001895</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">EMAIL:</span>
                  <a href="mailto:info@popularhospitals.in" className="text-white hover:text-hospital-teal transition-colors font-bold break-all">info@popularhospitals.in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Community */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-6">Community</h3>
            <ul className="space-y-3 text-[17px] text-gray-200">
              <li><Link href="/doctors" className="hover:text-white transition-colors">Doctors</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">Patient Stories</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/media/news" className="hover:text-white transition-colors">Latest News</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/sitemap" className="hover:text-white transition-colors">Site Map</Link></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-6">Quick Links</h3>
            <ul className="space-y-3 text-[17px] text-gray-200">
              <li><Link href="/book" className="hover:text-white transition-colors">Book an Appointment</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/payment-policy" className="hover:text-white transition-colors">Payment Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/services/health-packages" className="hover:text-white transition-colors">Health Packages</Link></li>
              <li><Link href="/updates" className="hover:text-white transition-colors">Updates</Link></li>
              <li><Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
              <li><Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link></li>
            </ul>
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-2">Social Media:</h4>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.facebook.com/popularhospitals/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-hospital-teal transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a href="https://www.instagram.com/popular_hospitals/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-hospital-teal transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://x.com/popular_vns" target="_blank" rel="noopener noreferrer" className="text-white hover:text-hospital-teal transition-colors" aria-label="X (Twitter)">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://youtube.com/@populargroupofhospitals?si=2WBF3-gr2RQTqMiY" target="_blank" rel="noopener noreferrer" className="text-white hover:text-hospital-teal transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186c-.273-1.016-1.077-1.815-1.921-2.083-1.6-.454-8.076-.454-8.076-.454s-6.475 0-8.076.454c-.844.268-1.648 1.067-1.921 2.083-.454 1.6-.454 4.936-.454 4.936s0 3.336.454 4.936c.273 1.016 1.077 1.815 1.921 2.083 1.6.454 8.076.454 8.076.454s6.475 0 8.076-.454c.844-.268 1.648-1.067 1.921-2.083.454-1.6.454-4.936.454-4.936s0-3.336-.454-4.936zM10 15V9l5 3-5 3z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/popularhospitals" target="_blank" rel="noopener noreferrer" className="text-white hover:text-hospital-teal transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" /></svg>
                </a>
                <a href="https://in.pinterest.com/popularhospitalvaranasi/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-hospital-teal transition-colors" aria-label="Pinterest">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 0 5.397 0 12.017c0 5.078 3.158 9.412 7.614 11.173-.104-.947-.198-2.403.041-3.438.216-.928 1.396-5.913 1.396-5.913s-.356-.713-.356-1.767c0-1.655.959-2.89 2.153-2.89 1.015 0 1.506.763 1.506 1.678 0 1.022-.65 2.548-.985 3.961-.281 1.185.594 2.152 1.761 2.152 2.112 0 3.731-2.227 3.731-5.441 0-2.844-2.043-4.832-4.962-4.832-3.38 0-5.364 2.535-5.364 5.155 0 1.021.393 2.115.884 2.712.097.118.113.22.083.341-.091.378-.293 1.189-.332 1.355-.053.218-.173.264-.399.159-1.486-.692-2.415-2.865-2.415-4.608 0-3.754 2.727-7.202 7.864-7.202 4.13 0 7.338 2.943 7.338 6.874 0 4.103-2.587 7.404-6.178 7.404-1.207 0-2.343-.627-2.731-1.369l-.744 2.831c-.269 1.026-1.002 2.313-1.492 3.111C10.513 23.834 11.252 24 12.017 24c6.62 0 12.016-5.396 12.016-12.017C24.033 5.397 18.636 0 12.017 0z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Mobile App Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-3xl py-8 px-6 sm:px-7 shadow-xl relative overflow-hidden group">
               {/* Decorative Glow */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-hospital-orange/20 rounded-full blur-3xl transition-colors group-hover:bg-hospital-orange/30" />
               
               <h3 className="text-3xl lg:text-4xl font-bold font-heading mb-4 text-white">Download App</h3>
               <p className="text-lg text-gray-300 leading-relaxed">
                 Access healthcare facilities at your fingertips.
               </p> 

               <div className="mt-6">
                 <a 
                   href="https://play.google.com/store/apps/details?id=com.tenwek&pcampaignid=web_share" 
                   className="flex items-center justify-center gap-3 bg-black border border-gray-700 hover:bg-gray-900 text-white px-6 py-2 sm:py-2.5 rounded-xl shadow-xl transition-all group/btn w-full"
                 >
                   <Image
                     src="/images/android_app.png"
                     alt="Google Play"
                     width={36}
                     height={36}
                     className="w-7 h-7 sm:w-9 sm:h-9 transition-transform group-hover/btn:scale-110 object-contain"
                   />
                   <div className="flex flex-col leading-none text-left">
                     <span className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-300 mb-0.5 tracking-wider">GET IT ON</span>
                     <span className="text-lg sm:text-xl font-semibold tracking-tight">Google Play</span>
                   </div>
                 </a>
               </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-500/30 text-center text-sm sm:text-base text-gray-300 relative z-10">
          <p>© 2026 Popular Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}