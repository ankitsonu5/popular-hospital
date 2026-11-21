import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
  Users,
  ChevronDown,
  ArrowRight,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { CImage } from "@/components/content/Editable";
import {
  cardiologyFaqs,
  conditionsTreated,
  diagnosticTests,
  heartSymptoms,
  patientJourney,
  preventionTips,
  procedures,
  warningSigns,
  whenToSeeCardiologist,
  whyChoose,
} from "./cardiologyContent";

function SectionHeading({ pre, accent }: { pre: string; accent: string }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-1 h-8 rounded-full bg-[#1e3a8a] inline-block" />
        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#0b1c43] font-heading">
          {pre} <span className="text-[#1e3a8a]">{accent}</span>
        </h2>
      </div>
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-100 to-transparent mb-6" />
    </>
  );
}

/** Wide banner image used at the top of a section. Replaceable from admin via `k`. */
function SectionBanner({
  k,
  src,
  alt,
  caption,
  position = "object-center",
}: {
  k: string;
  src: string;
  alt: string;
  caption?: string;
  position?: string;
}) {
  return (
    <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-sm">
      <CImage
        k={k}
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1536px) 1280px, (min-width: 1024px) 1024px, 100vw"
        className={`object-cover ${position}`}
      />
      {caption && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c43]/85 via-[#0b1c43]/40 to-transparent" />
          <p className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 max-w-md text-white text-lg md:text-2xl font-bold font-heading leading-snug">
            {caption}
          </p>
        </>
      )}
    </div>
  );
}

/** Image that fills its column, used in side-by-side layouts. */
function SideImage({ k, src, alt }: { k: string; src: string; alt: string }) {
  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-full min-h-[16rem] rounded-3xl overflow-hidden shadow-sm">
      <CImage
        k={k}
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

const container = "mx-auto w-full max-w-5xl 2xl:max-w-7xl px-4";

export function SymptomsSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Heart Symptoms" accent="You Should Not Ignore" />
        <p className="text-gray-700 leading-relaxed text-base md:text-[17px] font-medium mb-8">
          Heart disease often starts with small warning signs. If you notice any
          of these symptoms, especially if they keep coming back, get checked by
          a cardiologist.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <SideImage
              k="departments-cardiology_img_symptoms"
              src="/images/wellness_packages/cardian_screening_two.jpg"
              alt="Person holding chest due to heart pain"
            />
          </div>
          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {heartSymptoms.map((s) => (
              <li
                key={s.title}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-[#E85222] flex-shrink-0" />
                  <h3 className="font-bold text-[#0b1c43] text-[15px]">
                    {s.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ConditionsSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Heart Conditions" accent="We Treat" />
        <SectionBanner
          k="departments-cardiology_img_conditions"
          src="/images/banners/cardiology_banner.png"
          alt="3D illustration of the human heart"
          caption="Complete care for every heart condition, from BP to complex blockages"
          position="object-[center_35%]"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditionsTreated.map((c) => (
            <div
              key={c.title}
              className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse className="w-5 h-5 text-[#E85222] flex-shrink-0" />
                <h3 className="font-bold text-[#0b1c43] text-[15px]">
                  {c.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
              {"href" in c && c.href && (
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#1e3a8a] hover:text-[#E85222]"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProceduresSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Advanced Cardiac" accent="Procedures" />
        <SectionBanner
          k="departments-cardiology_img_procedures"
          src="/images/banners/cardiothoracic_banner.png"
          alt="Cardiac procedure in progress in the cath lab"
          caption="Two modern cath labs with the latest technology"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {procedures.map((p, i) => (
            <div
              key={p.title}
              className="flex gap-4 p-5 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-blue-50/40"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1e3a8a] text-white text-sm font-bold flex items-center justify-center">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-bold text-[#0b1c43] mb-1">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EmergencySection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-[#0b1c43] text-white">
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E85222] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
              <AlertTriangle className="w-4 h-4" /> 24x7 Cardiac Emergency
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Heart Attack? Every Minute Counts
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              Treatment in the first hour (the &quot;golden hour&quot;) after a
              heart attack saves the most heart muscle. Popular Hospital has
              cardiologists, two modern cath labs and a cardiac care unit
              available round the clock for emergency angiography and primary
              angioplasty, so a blocked artery can be opened without delay.
            </p>
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-6 border border-white/10">
              <CImage
                k="departments-cardiology_img_emergency"
                src="/images/banners/Emergency_24_bg.jpg"
                alt="Emergency team rushing a cardiac patient"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+917800001895"
                className="bg-[#E85222] hover:bg-[#d4461b] px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> Emergency: +91-7800001895
              </a>
              <a
                href="tel:+919519999280"
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> Ambulance: +91-9519999280
              </a>
              <a
                href="tel:+919519001056"
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> Cardiac Coordinator:
                +91-9519001056
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4">
              Warning signs of a heart attack
            </h3>
            <ul className="space-y-3">
              {warningSigns.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-white/90 text-[15px]"
                >
                  <AlertTriangle className="w-5 h-5 text-[#E85222] flex-shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-xs mt-5">
              Do not drive yourself or wait for symptoms to pass. Call for help
              and reach the nearest cardiac emergency right away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhenToSeeSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-white">
      <div className={container}>
        <SectionHeading pre="When Should You" accent="See a Cardiologist?" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
            {whenToSeeCardiologist.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-gray-700 text-[15px] font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-[#1e3a8a] flex-shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
          <div className="lg:col-span-2 rounded-2xl bg-blue-50 border border-blue-100 overflow-hidden flex flex-col">
            <div className="relative w-full h-44">
              <CImage
                k="departments-cardiology_img_checkup"
                src="/images/wellness_packages/cardiac_screening.jpg"
                alt="Cardiac monitor during a heart check-up"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <Stethoscope className="w-8 h-8 text-[#1e3a8a] mb-3" />
              <h3 className="font-bold text-[#0b1c43] text-lg mb-2">
                Get a heart check-up before symptoms start
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Many heart problems give no warning. If you are over 40 or have
                diabetes, BP, high cholesterol or a family history of heart
                disease, a check-up with ECG, 2D Echo and a lipid profile can
                pick up problems early.
              </p>
              <Link
                href="/book"
                className="self-start mt-auto bg-[#E85222] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const journeyIcons = [
  MessagesSquare,
  ClipboardList,
  Users,
  HeartPulse,
  ShieldCheck,
];

export function PatientJourneySection() {
  const last = patientJourney.length - 1;
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Your Treatment" accent="Journey" />
        <p className="text-gray-700 leading-relaxed text-base md:text-[17px] font-medium mb-8 max-w-3xl">
          From your first visit to full recovery, one dedicated heart team
          stays with you at every step.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Image panel */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[22rem] sm:min-h-[24rem] shadow-lg shadow-blue-900/10">
            <CImage
              k="departments-cardiology_img_journey"
              src="/images/facilities/2.jpeg"
              alt="Cardiac care unit at Popular Hospital"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c43] via-[#0b1c43]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
              <p className="text-xl md:text-2xl font-bold font-heading leading-snug">
                One heart team with you, from the first consultation to
                recovery
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Cardiac Care Unit", "24x7 Monitoring", "Trained Cardiac Nurses"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold bg-white/15 border border-white/25 backdrop-blur-sm rounded-full px-3 py-1"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Vertical timeline */}
          <ol className="lg:col-span-7 relative">
            {patientJourney.map((step, i) => {
              const Icon = journeyIcons[i] ?? HeartPulse;
              const isLast = i === last;
              return (
                <li key={step.title} className="relative flex gap-5 pb-5 last:pb-0 group">
                  {/* connector line */}
                  {!isLast && (
                    <span className="absolute left-7 top-14 bottom-0 w-[2px] bg-gradient-to-b from-[#1e3a8a]/40 to-[#E85222]/40" />
                  )}
                  <span
                    className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${
                      isLast
                        ? "bg-[#E85222] text-white shadow-[#E85222]/30"
                        : "bg-[#0b1c43] text-white shadow-blue-900/20"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-current text-[11px] font-bold flex items-center justify-center text-[#0b1c43]">
                      {i + 1}
                    </span>
                  </span>
                  <div
                    className={`flex-1 rounded-2xl border p-4 md:p-5 transition-all group-hover:shadow-md group-hover:-translate-y-0.5 ${
                      isLast
                        ? "bg-orange-50/70 border-orange-100"
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#E85222] mb-0.5">
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-bold text-[#0b1c43] text-base md:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA strip */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#0b1c43] to-[#1e3a8a] text-white p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#E85222] flex-shrink-0" />
            <div>
              <p className="font-bold text-lg leading-tight">
                Start your heart care journey today
              </p>
              <p className="text-white/70 text-sm">
                Talk to our cardiac coordinator or book an OPD consultation.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/book"
              className="flex items-center gap-2 bg-[#E85222] hover:bg-[#d4461b] px-5 py-2.5 rounded-full font-semibold transition-colors"
            >
              <CalendarDays className="w-4 h-4" /> Book Consultation
            </Link>
            <a
              href="tel:+919519001056"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" /> +91-9519001056
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PreventionSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Keep Your Heart" accent="Healthy" />
        <SectionBanner
          k="departments-cardiology_img_prevention"
          src="/images/banners/dietetics_nutrition.jpg"
          alt="Heart-healthy fruits and vegetables"
          caption="Most heart disease risk can be controlled with steady habits"
        />
        <p className="text-gray-700 leading-relaxed text-base md:text-[17px] font-medium mb-8">
          Heart disease is increasingly seen in people in their 30s and 40s.
          These simple steps lower your risk.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preventionTips.map((t) => (
            <div
              key={t.title}
              className="p-5 rounded-2xl border border-slate-200/70 bg-white shadow-sm"
            >
              <h3 className="font-bold text-[#0b1c43] mb-1">{t.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Frequently Asked" accent="Questions" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="hidden lg:block lg:sticky lg:top-28 h-[28rem]">
            <SideImage
              k="departments-cardiology_img_faq"
              src="/images/wellness_packages/cardiac-health.jpg"
              alt="Doctor holding a heart symbol"
            />
          </div>
          <div className="lg:col-span-2 space-y-3">
            {cardiologyFaqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl bg-white border border-slate-200/70 shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-semibold text-[#0b1c43] [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <ChevronDown className="w-5 h-5 text-[#1e3a8a] flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 -mt-1 text-gray-600 leading-relaxed text-[15px]">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DiagnosticsSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-white">
      <div className={container}>
        <SectionHeading pre="Non-Invasive Heart" accent="Tests" />
        <SectionBanner
          k="departments-cardiology_img_diagnostics"
          src="/images/facilities/4.jpeg"
          alt="In-house diagnostic and imaging facility"
          caption="Accurate diagnosis in-house, often on the same day"
        />
        <p className="text-gray-700 leading-relaxed text-base md:text-[17px] font-medium mb-8">
          The right test gives the right diagnosis. These tests are painless,
          need no surgery and are done in-house, so your cardiologist can
          decide on treatment quickly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnosticTests.map((t) => (
            <div
              key={t.title}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-blue-50/40 border border-slate-200/70"
            >
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-5 h-5 text-[#1e3a8a] flex-shrink-0" />
                <h3 className="font-bold text-[#0b1c43] text-[15px]">
                  {t.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Why Choose Popular Hospital for" accent="Heart Care?" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <SideImage
              k="departments-cardiology_img_whychoose"
              src="/images/facilities/5.jpeg"
              alt="Cardiac and surgical team at work at Popular Hospital"
            />
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChoose.map((w) => (
              <div
                key={w.title}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#E85222] flex-shrink-0" />
                  <h3 className="font-bold text-[#0b1c43] text-[15px]">
                    {w.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{w.desc}</p>
                {"href" in w && w.href && (
                  <Link
                    href={w.href}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#1e3a8a] hover:text-[#E85222]"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisitUsSection() {
  return (
    <section className="py-16 xl:py-12 2xl:py-20 bg-white border-t border-slate-100">
      <div className={container}>
        <SectionHeading pre="Visit Our" accent="Heart Care Centre" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 rounded-2xl bg-[#0b1c43] text-white p-6 md:p-8 space-y-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E85222] flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold mb-1">Popular Hospital</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  N-10/60, A-2, B.L.W. Road, Kakarmatta,
                  <br />
                  Varanasi 221004, Uttar Pradesh
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#E85222] flex-shrink-0 mt-1" />
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-white/60">Appointments: </span>
                  <a href="tel:+917800001895" className="font-semibold hover:underline">
                    +91-7800001895
                  </a>{" "}
                  /{" "}
                  <a href="tel:+917800001896" className="font-semibold hover:underline">
                    96
                  </a>
                </p>
                <p>
                  <span className="text-white/60">Cardiac Coordinator: </span>
                  <a href="tel:+919519001056" className="font-semibold hover:underline">
                    +91-9519001056
                  </a>
                </p>
                <p>
                  <span className="text-white/60">Ambulance: </span>
                  <a href="tel:+919519999280" className="font-semibold hover:underline">
                    +91-9519999280
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#E85222] flex-shrink-0 mt-1" />
              <a
                href="mailto:info@popularhospital.com"
                className="text-sm font-semibold hover:underline"
              >
                info@popularhospital.com
              </a>
            </div>
            <p className="text-white/70 text-sm border-t border-white/10 pt-4">
              Cardiac emergency services are available 24x7. Walk in to the
              emergency department or call us on the way.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/book"
                className="bg-[#E85222] px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Book Appointment
              </Link>
              <a
                href="https://maps.google.com/?q=Popular+Hospital+Kakarmatta+Varanasi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 relative w-full h-80 lg:h-auto min-h-[20rem] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              title="Popular Hospital Kakarmatta, Varanasi on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.4870425895786!2d82.96961447605928!3d25.28784347765103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e3230c1e626e5%3A0xe53be0a651f67f2e!2sPopular%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
