import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-hospital-navy text-white">
      <div className="container-narrow py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Popular Hospital</h3>
            <p className="text-sm text-gray-300">
              Quality healthcare with compassion. Your health is our priority.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/doctors" className="hover:text-white">Find Doctors</Link></li>
              <li><Link href="/book" className="hover:text-white">Book Appointment</Link></li>
              <li><Link href="/opd" className="hover:text-white">OPD</Link></li>
              <li><Link href="/branches" className="hover:text-white">Our Branches</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="tel:18001234567" className="hover:text-white">1800-123-4567</a></li>
              <li><a href="mailto:info@popularhospital.com" className="hover:text-white">info@popularhospital.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Emergency</h3>
            <p className="text-sm text-gray-300">24/7 Emergency & Ambulance</p>
            <a href="tel:18001234567" className="mt-2 inline-block font-medium text-white underline hover:no-underline">
              1800-123-4567
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-600 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Popular Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
