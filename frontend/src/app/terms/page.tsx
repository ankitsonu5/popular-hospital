import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Popular Hospital',
  description: 'Read the terms and conditions for using Popular Hospital website and our healthcare services.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[300px] bg-gray-900 overflow-hidden">
        {/* Background Image / Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hospital-teal/80 to-transparent" />
        
        {/* Content */}
        <div className="relative h-full max-w-[1366px] mx-auto px-6 flex flex-col justify-center">
          <nav className="flex mb-4 text-sm text-gray-300 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">|</span>
            <span className="text-white">Terms & Conditions</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
            Terms & Conditions
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-[1366px] mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
            <p>
              The Terms and Conditions for Popular Hospital govern the use of its website <a href="https://www.popularhospital.in" className="text-hospital-teal hover:underline">www.popularhospital.in</a> and related online services. By using the website, users agree to comply with these terms, which cover website access, data handling, liability, and online transactions. The purpose of these terms is to ensure transparency, data security, and smooth online operations for patients and visitors.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Description of Services</h2>
              <p>
                Popular Hospital provides information and services through its website, including online appointment booking, bill payments, and other healthcare-related transactions. Users must follow the stated terms and accept updates that may be posted from time to time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Applicability</h2>
              <p>
                These terms apply to all online transactions conducted via the Popular Hospital website or its authorized links, including payments and advance bookings for hospital services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Information Provided by Users</h2>
              <ul className="space-y-4 list-none">
                <li className="flex gap-3">
                  <span className="text-hospital-teal font-bold">&gt;</span>
                  <span>When using the website's services, users must share accurate and complete information such as patient details and payment information. Providing false or misleading information can lead to cancellation of appointments or payments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-hospital-teal font-bold">&gt;</span>
                  <span>Popular Hospital uses the information provided for processing appointments, ensuring billing accuracy, and, with consent, for analysis and marketing purposes. Users authorize the hospital to contact them via phone, SMS, WhatsApp, or email for appointment updates and service-related communication.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-hospital-teal font-bold">&gt;</span>
                  <span>Users are responsible for giving correct contact details to receive confirmations. The consultation time shown is indicative and may vary. Appointments are meant for first consultations only, and senior citizen discounts require valid proof. Late arrivals may result in slot forfeiture, and the patient will be treated as a walk-in.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Availability</h2>
              <p>
                Popular Hospital operates its website from India. Services and products mentioned may be specific to India and might not apply elsewhere. Users outside India should confirm availability with the hospital before proceeding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Limitation of Liability</h2>
              <div className="space-y-4">
                <p>
                  The hospital does not guarantee that the website content is error-free or always updated. While efforts are made to maintain accuracy, Popular Hospital disclaims responsibility for any technical errors, inaccuracies, or typographical mistakes.
                </p>
                <p>
                  The hospital and its affiliates will not be liable for damages - direct, indirect, incidental, or consequential - arising from the use or inability to use the website. This includes losses from viruses, unauthorized access, mechanical failures, or delays.
                </p>
                <p>
                  Users understand that online transactions may be vulnerable to fraud or hacking despite security measures. Popular Hospital is not liable for such incidents or for failed transactions where the user's bank account is debited but the transaction remains incomplete. In such cases, users should contact their bank directly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Data Protection</h2>
              <div className="space-y-4">
                <p>
                  Popular Hospital values user privacy and may use cookies to track visitor preferences and trends. By using the website, users consent to the placement of cookies on their device.
                </p>
                <p>
                  The hospital commits to maintaining the confidentiality of user data and taking reasonable precautions to prevent data loss or damage. Personal medical information will only be disclosed to authorized personnel involved in treatment or financial evaluation, or if required by law enforcement or government agencies through official notice.
                </p>
                <p>
                  For data analysis, the hospital may use anonymous statistics to improve services. Users requiring website-based authentication must safeguard their login credentials. They are solely responsible for keeping their user ID and password confidential and are advised to change passwords periodically. Using shared or public computers for transactions is discouraged due to security risks.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Gateway Security</h2>
              <div className="space-y-4">
                <p>
                  Popular Hospital ensures that its online payment gateway is as secure and convenient as possible. However, despite strong safeguards, breaches of security may still occur. The hospital is not responsible for any loss due to such breaches.
                </p>
                <p>
                  Users are responsible for maintaining antivirus protection and secure systems while making payments. If a user's negligence leads to interception of data or financial loss, Popular Hospital will not be held accountable.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">Modifications to Terms</h2>
              <p>
                Popular Hospital reserves the right to modify or update the Terms and Conditions without prior notice. Users are advised to review the latest version regularly on the website. Continuing to use the website after modifications implies acceptance of the updated terms.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
