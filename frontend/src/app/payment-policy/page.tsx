import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Policy | Popular Hospital",
  description:
    "Review the accepted payment methods and financial policies for medical services at Popular Hospital.",
  alternates: {
    canonical: "https://popularhospital.in/payment-policy",
  },
};

export default function PaymentPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[300px] bg-gray-900 overflow-hidden">
        {/* Background Image / Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1600&auto=format&fit=crop")',
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
            <span className="text-white">Payment Policy</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
            Payment Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-[1366px] mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
            <p>
              When you initiate a payment for any service or product on the
              Popular Hospital website, your transaction may be redirected to a
              third-party payment processor. In such cases, the transaction will
              be subject to the terms and conditions of the respective
              third-party provider. Popular Hospital is not responsible if a
              transaction fails to complete, if the bank, card issuer, or
              third-party service fails to meet its obligations, or if any loss
              arises due to the authorization being declined or accepted.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">
                Payment Gateway & Methods
              </h2>
              <div className="space-y-4">
                <p>
                  Online payments through Popular Hospital are securely
                  redirected to the payment service provider for processing
                  before returning to the hospital's site. Currently, the
                  following payment methods are accepted:
                </p>
                <ul className="space-y-2 list-none marker:text-hospital-teal">
                  <li className="flex gap-3">
                    <span className="text-hospital-teal font-bold">&gt;</span>
                    <span>
                      Visa, MasterCard, Maestro, and Amex credit cards
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-hospital-teal font-bold">&gt;</span>
                    <span>Select debit cards</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-hospital-teal font-bold">&gt;</span>
                    <span>Net banking</span>
                  </li>
                </ul>
                <p>
                  After clicking on the payment button, the transaction is
                  processed, and a Transaction ID is generated to confirm your
                  payment. This Transaction ID acts as official proof of
                  payment.
                </p>
                <p>
                  Invoices for paid OPD appointments are prepared at the billing
                  counter upon the patient's or attendant's arrival.
                  Additionally, an email and SMS containing the invoice number
                  are sent to the registered email ID and mobile number provided
                  during booking. This SMS must be presented at the hospital
                  counter to collect a printed copy of the invoice and access
                  the services.
                </p>
                <p>
                  A payment is only considered successful once a Transaction ID
                  has been issued. If you do not receive one, you should attempt
                  the payment again or use an alternative method.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">
                Responsibility of the User
              </h2>
              <div className="space-y-4">
                <p>
                  If a confirmation page, email, or SMS is not received after
                  submitting payment information, it is your responsibility to
                  verify the status with your bank or Popular Hospital's
                  Customer Service. Only you can identify any issues that may
                  occur during the payment process. Popular Hospital will not be
                  liable for any monetary or other losses arising from assuming
                  that a payment was not completed due to lack of confirmation.
                </p>
                <p>
                  For credit or debit card transactions, both the card and the
                  cardholder must be present at the billing counter to validate
                  the payment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-hospital-teal mb-4">
                Confirmation and Evidence of Transaction
              </h2>
              <div className="space-y-4">
                <p>
                  <strong className="text-gray-900">
                    Non-Paid Appointments:
                  </strong>{" "}
                  After booking, you will receive an SMS confirmation on the
                  registered mobile number. This must be shown at the billing
                  counter to receive a printed invoice.
                </p>
                <p>
                  <strong className="text-gray-900">Paid Appointments:</strong>{" "}
                  SMS confirmation of booking and payment is sent to the
                  registered mobile number. Invoices are generated upon arrival
                  at the billing counter. Printed duplicate copies of invoices
                  can also be requested at the counter if needed.
                </p>
                <p>
                  All transaction records maintained by Popular Hospital,
                  whether digitally or otherwise, including the exact time of
                  the transaction, are considered conclusive evidence of payment
                  authenticity and accuracy. These records are binding and serve
                  as proof for all purposes, ensuring clarity and accountability
                  for both the hospital and patients.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
