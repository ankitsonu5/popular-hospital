import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Mock data shared between listing and detail for demo
const blogPosts = {
  "best-ent-hospital-uttar-pradesh": {
    title: "Best ENT Hospital in Uttar Pradesh: Advanced Care for Ear, Nose & Throat",
    date: "May 15, 2025",
    author: "Dr. A.K. Kaushik",
    category: "ENT Care",
    content: `
      <p>Popular Hospital is recognized as the premier destination for ENT care in Uttar Pradesh. Our ENT department is equipped with cutting-edge technology to diagnose and treat a wide range of conditions affecting the ear, nose, throat, head, and neck.</p>
      <h3>Advanced Diagnostic Facilities</h3>
      <p>We use state-of-the-art diagnostic tools including fiber optic endoscopes, operating microscopes, and advanced audiological testing to ensure accurate diagnosis. This allows our specialists to create highly personalized treatment plans for every patient.</p>
      <h3>Surgical Excellence</h3>
      <p>Our surgeons specialize in minimally invasive procedures, which offer numerous benefits including reduced pain, shorter hospital stays, and faster recovery times. From routine tonsillectomies to complex skull base surgeries, our team delivers excellence in every procedure.</p>
      <blockquote>"Our goal is to restore quality of life through precise diagnosis and compassionate surgical care." - Dr. Kaushik</blockquote>
      <p>We also provide specialized care for speech and hearing disorders, with a dedicated team of audiologists and speech therapists working alongside our ENT surgeons.</p>
    `,
    image: "/images/latestnews/one.jpg"
  },
  "pediatric-emergency-hospital-24-7": {
    title: "Pediatric Emergency Hospital: 24/7 Specialized Care For Your Little Ones",
    date: "May 12, 2025",
    author: "Pediatric Dept",
    category: "Pediatrics",
    content: `
      <p>Children are not just small adults; they have unique medical needs. At Popular Hospital, we understand this distinction and have built a pediatric emergency wing that is entirely focused on providing specialized care for infants, children, and adolescents.</p>
      <h3>Child-Friendly Environment</h3>
      <p>Our emergency room is designed to reduce the stress and anxiety that children often feel during medical emergencies. With colorful decor and a gentle approach, our staff ensures that your child feels safe while receiving life-saving care.</p>
      <h3>Expert Pediatric Specialists</h3>
      <p>Our team consists of board-certified pediatricians and nurses trained in pediatric advanced life support. We are available 24/7 to handle everything from minor fractures to critical life-threatening conditions.</p>
    `,
    image: "/images/latestnews/two.jpg"
  },
  "orthopedic-care-robotic-surgery": {
    title: "Revolutionizing Orthopedic Care: Robotic-Assisted Surgery in Varanasi",
    date: "May 10, 2025",
    author: "Ortho Specialists",
    category: "Orthopedics",
    content: `
      <p>Popular Hospital is proud to introduce robotic-assisted surgery for orthopedic procedures, a major leap forward in medical technology for the region of Varanasi.</p>
      <h3>Why Robotic-Assisted Surgery?</h3>
      <p>Robotic assistance allows surgeons to perform joint replacements and complex bone surgeries with unprecedented precision. This technology provides a 3D view of the joint and helps in positioning the implants with sub-millimeter accuracy.</p>
      <h3>Benefits for Patients</h3>
      <p>Patients who undergo robotic-assisted surgery often experience less post-operative pain, faster discharge from the hospital, and a quicker return to their daily activities. The precision leads to better long-term outcomes for joint functionality.</p>
    `,
    image: "/images/latestnews/three.jpg"
  },
  "laparoscopic-surgery-recovery": {
    title: "Laparoscopic Surgery: Fewer Scars, Faster Recovery Options",
    date: "May 08, 2025",
    author: "General Surgery Team",
    category: "Surgery",
    content: `
      <p>Laparoscopic surgery, also known as minimally invasive surgery, has transformed the way many routine and complex surgical procedures are performed at Popular Hospital.</p>
      <h3>The Minimally Invasive Advantage</h3>
      <p>Instead of one large incision, laparoscopic surgery uses several small incisions. This significantly reduces the risk of infection, minimizes scarring, and results in much less trauma to the body's tissues.</p>
      <h3>Common Laparoscopic Procedures</h3>
      <p>Our expert surgical team regularly performs laparoscopic procedures for gallbladder removal, hernia repairs, appendectomies, and various gynecological surgeries. Most patients can go home within 24-48 hours after their procedure.</p>
    `,
    image: "/images/latestnews/one.jpg"
  }
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) notFound();

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-[900px] px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 flex gap-2 text-sm text-gray-400 font-bold uppercase tracking-widest">
           <Link href="/blog" className="hover:text-[#E85222] transition-colors">Blog</Link>
           <span>/</span>
           <span className="text-[#1a3a5c]">{post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#1a3a5c] mb-6 leading-[1.15] font-heading">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 py-6 border-y border-slate-100">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-[#2a7a8c] rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               </div>
               <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Written By</p>
                 <p className="text-[#1a3a5c] font-black">{post.author}</p>
               </div>
             </div>
             <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Published On</p>
               <p className="text-[#1a3a5c] font-black">{post.date}</p>
             </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
           <Image 
             src={post.image} 
             alt={post.title} 
             fill 
             className="object-cover"
           />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
           <div 
             dangerouslySetInnerHTML={{ __html: post.content }} 
             className="[&>h3]:text-2xl [&>h3]:font-black [&>h3]:text-[#1a3a5c] [&>h3]:mt-10 [&>h3]:mb-4 [&>p]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-[#E85222] [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:text-[#1a3a5c] [&>blockquote]:my-10"
           />
        </div>

        {/* Footer Share / Back */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8">
           <Link href="/blog" className="flex items-center gap-2 text-[#1a3a5c] font-black uppercase tracking-widest text-sm hover:text-[#E85222] transition-colors">
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              Back to Articles
           </Link>
           <div className="flex gap-4">
              <span className="text-gray-400 font-bold text-sm uppercase self-center mr-2">Share:</span>
              {[1, 2, 3].map((i) => (
                <button key={i} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white transition-all">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.783h-2.954v-3.429h2.954v-2.527c0-2.925 1.787-4.516 4.396-4.516 1.25 0 2.324.093 2.637.135v3.057h-1.81c-1.419 0-1.694.675-1.694 1.662v2.19h3.384l-.441 3.429h-2.943v8.783h6.128c.731 0 1.324-.593 1.324-1.324v-21.351c0-.732-.593-1.325-1.324-1.325z"/></svg>
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
