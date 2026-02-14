import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

/* ───────────────── article data ───────────────── */
const articles = [
  {
    slug: "best-medical-network-directory",
    title: "Best Medical Network Directory For Physicians & Clients",
    date: "February 10, 2026",
    category: "Healthcare",
    author: "Dr. A.K. Kaushik",
    authorRole: "Chairman, Popular Group of Hospital",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Popular Hospital has always been at the forefront of building a comprehensive and accessible medical network that connects physicians, specialists, and patients across the region. Our Medical Network Directory is designed to bridge the gap between healthcare providers and those in need of quality medical care.",
      "The directory serves as a one-stop resource for physicians looking to collaborate, refer patients, or find specialists within the Popular Hospital network. With detailed profiles of each department and specialist, the directory ensures that every patient receives the right care from the right doctor at the right time.",
      "Our network spans across multiple branches in Gopiganj, Bhadohi, Aurai, and Jangiganj, ensuring that quality healthcare is never far away. Each facility in our network is equipped with state-of-the-art medical equipment and staffed by highly trained medical professionals.",
      "The Medical Network Directory also facilitates seamless communication between departments, enabling faster consultations, second opinions, and coordinated treatment plans. This integrated approach has significantly improved patient outcomes and reduced treatment delays.",
      "For clients and patients, the directory provides easy access to information about available services, doctor schedules, and appointment booking. This transparency in healthcare delivery is a cornerstone of our commitment to patient-centric care at Popular Hospital.",
    ],
    contentHindi:
      "पॉपुलर हॉस्पिटल ने हमेशा एक व्यापक और सुलभ चिकित्सा नेटवर्क बनाने में अग्रणी भूमिका निभाई है जो चिकित्सकों, विशेषज्ञों और रोगियों को पूरे क्षेत्र में जोड़ता है। हमारी मेडिकल नेटवर्क डायरेक्टरी स्वास्थ्य सेवा प्रदाताओं और गुणवत्तापूर्ण चिकित्सा देखभाल की आवश्यकता वाले लोगों के बीच की खाई को पाटने के लिए डिज़ाइन की गई है।",
  },
  {
    slug: "importance-of-regular-health-checkups",
    title: "The Importance of Regular Health Checkups",
    date: "February 8, 2026",
    category: "Wellness",
    author: "Dr. Kiran Kaushik",
    authorRole: "MD, Popular Group of Hospital",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Regular health checkups are one of the most important steps you can take to maintain your overall health and wellbeing. At Popular Hospital, we strongly advocate for preventive healthcare as the most effective way to detect potential health issues before they become serious problems.",
      "Hypertension, commonly known as high blood pressure, is a silent killer that can go unnoticed for years. Regular health checkups help in early detection and prevention of serious conditions including cardiovascular diseases, diabetes, and various forms of cancer.",
      "Our comprehensive health checkup packages are designed to provide a thorough assessment of your health status. These packages include blood tests, imaging studies, cardiac evaluations, and consultations with specialists who can provide personalized health recommendations.",
      "Studies have shown that people who undergo regular health checkups have significantly better health outcomes compared to those who only seek medical attention when symptoms appear. Early detection of conditions like diabetes, cholesterol imbalance, and thyroid disorders can lead to more effective and less invasive treatments.",
      "Popular Hospital offers a range of health checkup packages tailored for different age groups, genders, and risk factors. Our state-of-the-art diagnostic facilities ensure accurate results, while our experienced medical team provides comprehensive health guidance based on your individual health profile.",
    ],
    contentHindi:
      "नियमित स्वास्थ्य जांच आपके समग्र स्वास्थ्य और कल्याण को बनाए रखने के लिए सबसे महत्वपूर्ण कदमों में से एक है। पॉपुलर हॉस्पिटल में, हम निवारक स्वास्थ्य सेवा की दृढ़ता से वकालत करते हैं क्योंकि यह संभावित स्वास्थ्य समस्याओं का पता लगाने का सबसे प्रभावी तरीका है।",
  },
  {
    slug: "managing-stress-for-better-mental-health",
    title: "Managing Better Stress for Better Mental Health",
    date: "February 5, 2026",
    category: "Mental Health",
    author: "Dr. Priya Sharma",
    authorRole: "Head of Psychiatry, Popular Hospital",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "In today's fast-paced world, stress has become an unavoidable part of life. However, chronic stress can have devastating effects on both physical and mental health. At Popular Hospital's Psychiatry Department, we are committed to helping patients develop effective strategies for managing stress and improving their mental wellbeing.",
      "Stress affects the body in numerous ways — it can lead to headaches, sleep disorders, digestive problems, weakened immunity, and even cardiovascular issues. Understanding the connection between stress and physical health is the first step toward better management.",
      "Our mental health team employs evidence-based approaches including cognitive behavioral therapy (CBT), mindfulness-based stress reduction, and relaxation techniques to help patients cope with stress. These methods have been proven effective in reducing anxiety, improving mood, and enhancing overall quality of life.",
      "We also emphasize the importance of lifestyle modifications in stress management. Regular exercise, balanced nutrition, adequate sleep, and maintaining social connections are all crucial factors in building resilience against stress.",
      "Popular Hospital's Psychiatry Department offers confidential counseling sessions, group therapy programs, and wellness workshops to support individuals and families dealing with stress and mental health challenges. We believe that seeking help is a sign of strength, not weakness.",
    ],
    contentHindi:
      "आज की तेज़-तर्रार दुनिया में तनाव जीवन का एक अनिवार्य हिस्सा बन गया है। हालांकि, पुराने तनाव का शारीरिक और मानसिक स्वास्थ्य दोनों पर विनाशकारी प्रभाव पड़ सकता है। पॉपुलर हॉस्पिटल के मनोचिकित्सा विभाग में, हम मरीजों को तनाव प्रबंधन और मानसिक कल्याण में सुधार की प्रभावी रणनीतियां विकसित करने में मदद करने के लिए प्रतिबद्ध हैं।",
  },
  {
    slug: "advances-in-cardiac-surgery",
    title: "Advances in Cardiac Surgery at Popular Hospital",
    date: "January 28, 2026",
    category: "Cardiology",
    author: "Dr. Rajesh Verma",
    authorRole: "Head of Cardiology, Popular Hospital",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Popular Hospital continues to lead the way in cardiac surgery with the latest minimally invasive techniques, robotic-assisted procedures, and state-of-the-art catheterization labs that ensure faster recovery for patients.",
      "Our cardiology department has successfully performed thousands of cardiac procedures, ranging from simple angioplasties to complex open-heart surgeries. The introduction of advanced technology has significantly reduced surgery times, hospital stays, and post-operative complications.",
      "Minimally invasive cardiac surgery (MICS) is one of our specialties. Unlike traditional open-heart surgery, MICS involves smaller incisions, less pain, reduced blood loss, and faster return to normal activities. Patients undergoing MICS at Popular Hospital typically experience a 50% shorter recovery period.",
      "Our cardiac catheterization laboratory is equipped with the latest imaging technology, allowing our cardiologists to perform precise diagnostic and interventional procedures. From coronary angiography to stent placement, our team provides comprehensive cardiac care under one roof.",
      "Prevention remains at the core of our cardiac care philosophy. We offer comprehensive cardiac health screening programs, lifestyle counseling, and cardiac rehabilitation services to help patients maintain optimal heart health and prevent future cardiac events.",
    ],
    contentHindi:
      "पॉपुलर हॉस्पिटल नवीनतम न्यूनतम इनवेसिव तकनीकों, रोबोटिक-सहायता प्रक्रियाओं और अत्याधुनिक कैथीटेराइज़ेशन लैब्स के साथ कार्डियक सर्जरी में अग्रणी बना हुआ है जो मरीजों की तेज़ रिकवरी सुनिश्चित करते हैं।",
  },
  {
    slug: "understanding-diabetes-management",
    title: "Understanding Diabetes Management: A Complete Guide",
    date: "January 22, 2026",
    category: "Wellness",
    author: "Dr. Meena Gupta",
    authorRole: "Senior Endocrinologist, Popular Hospital",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Diabetes is a growing health concern in India, with over 77 million adults affected by this chronic condition. At Popular Hospital, we are committed to providing comprehensive diabetes management services that empower patients to take control of their health.",
      "Effective diabetes management involves a multi-faceted approach including proper diet control, regular exercise, medication adherence, and continuous blood sugar monitoring. Our team of endocrinologists, dietitians, and diabetes educators work together to create personalized management plans for each patient.",
      "Diet plays a crucial role in managing blood sugar levels. Our expert dietitians help patients understand the glycemic index of foods, plan balanced meals, and make healthier food choices that don't compromise on taste or nutrition. We believe that dietary changes should be sustainable and enjoyable.",
      "Regular physical activity is another cornerstone of diabetes management. Even moderate exercise like brisk walking for 30 minutes a day can significantly improve insulin sensitivity and help maintain healthy blood sugar levels. Our physiotherapy team designs customized exercise programs for patients based on their fitness level and health conditions.",
      "Popular Hospital's Diabetes Care Center offers advanced diagnostic testing, insulin pump therapy, continuous glucose monitoring (CGM), and comprehensive foot care services. We also conduct diabetes awareness camps and educational workshops in the community to promote early detection and prevention.",
    ],
    contentHindi:
      "मधुमेह भारत में एक बढ़ती स्वास्थ्य चिंता है, जिसमें 7.7 करोड़ से अधिक वयस्क इस पुरानी बीमारी से प्रभावित हैं। पॉपुलर हॉस्पिटल में, हम व्यापक मधुमेह प्रबंधन सेवाएं प्रदान करने के लिए प्रतिबद्ध हैं जो मरीजों को अपने स्वास्थ्य पर नियंत्रण लेने में सशक्त बनाती हैं।",
  },
  {
    slug: "pediatric-care-excellence",
    title: "Excellence in Pediatric Care: Caring for Your Little Ones",
    date: "January 15, 2026",
    category: "Pediatrics",
    author: "Dr. Anita Singh",
    authorRole: "Head of Pediatrics, Popular Hospital",
    heroImage: "/about-section-image.png",
    gallery: [
      "/about-section-image.png",
      "/about-section-image.png",
      "/about-section-image.png",
    ],
    content: [
      "Our pediatric department is committed to providing comprehensive healthcare for children from infancy through adolescence. At Popular Hospital, we understand that children are not just small adults — they have unique healthcare needs that require specialized attention, expertise, and compassion.",
      "From routine vaccinations and developmental assessments to complex surgical procedures, our pediatric team offers the full spectrum of child healthcare services. Our child-friendly facilities are designed to make hospital visits less stressful for both children and their parents.",
      "The Neonatal Intensive Care Unit (NICU) at Popular Hospital is equipped with advanced life-support systems and monitoring equipment to provide critical care for premature and critically ill newborns. Our neonatal team has successfully treated thousands of high-risk newborns, giving them the best possible start in life.",
      "We place great emphasis on preventive pediatric care. Our well-child programs include comprehensive immunization schedules, growth monitoring, nutritional counseling, and early developmental screening to ensure that every child reaches their full potential.",
      "Popular Hospital's pediatric department also runs specialized clinics for childhood asthma, allergies, obesity, and developmental disorders. Our multidisciplinary approach ensures that each child receives holistic care addressed to their individual needs, with dedicated support for families throughout the treatment journey.",
    ],
    contentHindi:
      "हमारा बाल रोग विभाग शैशवावस्था से किशोरावस्था तक बच्चों के लिए व्यापक स्वास्थ्य देखभाल प्रदान करने के लिए प्रतिबद्ध है। पॉपुलर हॉस्पिटल में, हम समझते हैं कि बच्चे केवल छोटे वयस्क नहीं हैं — उनकी अनूठी स्वास्थ्य देखभाल आवश्यकताएं हैं जिनके लिए विशेष ध्यान, विशेषज्ञता और करुणा की आवश्यकता होती है।",
  },
];

/* ───────────────── static params ───────────────── */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

/* ───────────────── metadata ───────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} – Popular Hospital News`,
    description: article.content[0],
  };
}

/* ───────────────── page component ───────────────── */
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  // Get related articles (other articles excluding current)
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#0b1c43] py-20 sm:py-24 lg:py-28 overflow-hidden">
        {/* Subtle Background Image */}
        <Image
          src={article.heroImage}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-[#0b1c43]/70" />
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav
            className="mb-6 text-sm text-white/60"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/media/news"
              className="hover:text-white transition-colors"
            >
              News
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">
              {article.title}
            </span>
          </nav>

          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#00B4D8] text-white text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ─── Article Content ─── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">

        {/* Article Body */}
        <article className="prose prose-lg max-w-none">
          {/* First 2 paragraphs */}
          {article.content.slice(0, 2).map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}

          {/* ─── Image Gallery ─── */}
          <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose">
            {article.gallery.map((img, index) => (
              <div
                key={index}
                className="relative h-52 sm:h-60 lg:h-72 rounded-2xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={img}
                  alt={`${article.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Remaining paragraphs */}
          {article.content.slice(2).map((paragraph, index) => (
            <p
              key={index + 2}
              className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}


        </article>

        {/* ─── Share & Actions Strip ─── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Tags:</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {article.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              Popular Hospital
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              Healthcare
            </span>
          </div>
          <Link
            href="/media/news"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1e3a8a] text-white text-sm font-semibold hover:bg-[#15307a] transition-colors shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to All News
          </Link>
        </div>
      </section>

      {/* ─── Related Articles ─── */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/news/${related.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={related.heroImage}
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#1e3a8a]/90 text-white text-[10px] font-semibold backdrop-blur-sm uppercase tracking-wider">
                      {related.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-gray-400 font-medium mb-2">
                    {related.date}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#1e3a8a] transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[#E85222] font-semibold text-sm">
                    Read More
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
