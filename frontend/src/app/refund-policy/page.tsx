import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Popular Hospital",
  description:
    "Understand the refund and cancellation policies for appointments, admissions, and services at Popular Hospital.",
  alternates: {
    canonical: "https://popularhospital.in/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[300px] bg-gray-900 overflow-hidden">
        {/* Background Image / Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hospital-teal/80 to-transparent" />

        {/* Content */}
        <div className="relative h-full max-w-[1366px] mx-auto px-6 flex flex-col justify-center">
          <nav className="flex mb-4 text-sm text-gray-300 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">|</span>
            <span className="text-white">Refund Policy</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
            Refund Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-[1366px] mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
            <p className="text-sm">
              Online payments through Popular Hospital are securely redirected
              to the payment service provider for processing before returning to
              the hospital's site. Currently, the following payment methods are
              accepted:
            </p>

            {/* Refund Table */}
            <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-[15px] font-bold text-gray-800 border-r border-gray-200 text-center">
                      Cancellation Time
                    </th>
                    <th className="px-6 py-4 text-[15px] font-bold text-gray-800 text-center">
                      Refund Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-[14px] text-gray-700 border-r border-gray-200 text-center italic">
                      More than 24 hours before the scheduled appointment
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700 text-center italic">
                      100% of the total amount refunded
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-[14px] text-gray-700 border-r border-gray-200 text-center italic">
                      Within 24 hours of the scheduled appointment
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-700 text-center italic">
                      70% of the total amount refunded
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section className="text-sm">
              <p>
                To initiate a refund, please send an email at{" "}
                <span className="font-bold">********</span>, clearly mentioning
                your{" "}
                <span className="font-bold italic">
                  Reference Number, UHID, and Bill Number,
                </span>{" "}
                along with the reason for the refund request. After processing
                your request, you will receive a refund reference number for
                future correspondence with your bank.
              </p>
            </section>

            <section className="text-sm space-y-3">
              <p className="font-bold text-gray-800">Please note:</p>
              <ul className="space-y-2 list-none marker:text-hospital-teal">
                <li className="flex gap-2">
                  <span className="text-gray-400 font-bold">&gt;</span>
                  <span className="text-gray-500 italic text-[13px]">
                    Refund or cancellation requests will not be accepted for
                    payments made against bills or services already received.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 font-bold">&gt;</span>
                  <span className="text-gray-500 italic text-[13px]">
                    Cash refunds are not permitted under any circumstances.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-hospital-teal mb-6">
                General Terms and Conditions
              </h2>
              <ol className="space-y-4 list-decimal pl-5 text-[14px]">
                <li>
                  This agreement is governed by the laws of India and falls
                  under the exclusive jurisdiction of the courts in New Delhi.
                </li>
                <li>
                  If any clause of this agreement is deemed invalid or
                  unenforceable under applicable law, it shall be replaced with
                  a valid provision that reflects the original intent as closely
                  as possible, while the remaining terms shall remain effective.
                </li>
                <li>
                  By using this website, you acknowledge that your association
                  with Popular Hospital is strictly on a principal-to-principal
                  basis. You agree not to represent yourself as an agent,
                  employee, or authorized representative of Popular Hospital in
                  any form.
                </li>
                <li>
                  You confirm that you are 18 years of age or older and legally
                  capable of entering into a binding agreement as per Indian
                  law.
                </li>
              </ol>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
