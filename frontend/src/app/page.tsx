'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchBranches, type Branch } from '@/lib/api';

export default function HomePage() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    fetchBranches()
      .then(setBranches)
      .catch(() => setBranches([]));
  }, []);

  const branchCount = branches.length;

  return (
    <>
      <section className="relative h-screen min-h-[100dvh] overflow-hidden bg-gradient-to-br from-hospital-navy to-teal-900 text-white">
        <video
          className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hospital-navy/70 bg-gradient-to-b from-hospital-navy/80 to-teal-900/80" aria-hidden />
        <div className="container-narrow relative z-10 flex h-full min-h-0 flex-col justify-center py-20 sm:py-28">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-teal-100">
            Quality healthcare with compassion. Book appointments, find doctors, and visit our branches for the best care.
          </p>
          <div className="mt-8 flex-wrap gap-4 sm:flex">
            <Link href="/book" className="btn-primary bg-white text-hospital-navy hover:bg-gray-100">
              Book Appointment
            </Link>
            <Link href="/doctors" className="btn-secondary border-teal-400 text-white hover:bg-teal-800/50">
              Find a Doctor
            </Link>
            <Link href="/branches" className="btn-secondary border-teal-400 text-white hover:bg-teal-800/50">
              Our Branches
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="quick-actions">
        <div className="container-narrow">
          <h2 id="quick-actions" className="section-heading mb-10 text-center">
            How can we help you?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <QuickCard href="/book" title="Book Appointment" description="Book OPD or consultant appointment online." />
            <QuickCard href="/doctors" title="Find a Doctor" description="Search by speciality and branch." />
            <QuickCard href="/opd" title="OPD Timings" description="View OPD schedule and walk-in info." />
            <QuickCard href="/branches" title="Our Branches" description={`${branchCount} locations to serve you.`} />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="why-us">
        <div className="container-narrow">
          <h2 id="why-us" className="section-heading mb-10 text-center">
            Why Popular Hospital?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-hospital-teal">{branchCount}+</div>
              <h3 className="mt-2 font-semibold text-gray-900">Branches</h3>
              <p className="mt-1 text-sm text-gray-600">Multiple locations for your convenience.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-hospital-teal">24/7</div>
              <h3 className="mt-2 font-semibold text-gray-900">Emergency Care</h3>
              <p className="mt-1 text-sm text-gray-600">Round-the-clock emergency and ambulance.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-hospital-teal">Multi-Speciality</div>
              <h3 className="mt-2 font-semibold text-gray-900">Expert Doctors</h3>
              <p className="mt-1 text-sm text-gray-600">Wide range of specialities under one roof.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="locations">
        <div className="container-narrow">
          <h2 id="locations" className="section-heading mb-6">
            Our Locations
          </h2>
          <p className="mb-10 text-gray-600">
            Find a branch near you. Each location offers OPD, diagnostics, and specialist care.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.slice(0, 6).map((branch) => (
              <Link
                key={branch.id}
                href={`/branches/${branch.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-hospital-teal hover:shadow-md"
              >
                <h3 className="font-semibold text-hospital-navy group-hover:text-hospital-teal">{branch.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{branch.address}, {branch.city}</p>
                {branch.phone && (
                  <p className="mt-2 text-sm font-medium text-hospital-teal">{branch.phone}</p>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/branches" className="btn-primary">
              View All Branches
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-hospital-teal py-12 text-white">
        <div className="container-narrow flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-lg font-medium sm:text-left">
            Need to talk to us? Call our helpline 24/7
          </p>
          <a href="tel:18001234567" className="text-2xl font-bold underline hover:no-underline">
            1800-123-4567
          </a>
        </div>
      </section>
    </>
  );
}

function QuickCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-hospital-teal hover:shadow-md"
    >
      <h3 className="font-semibold text-hospital-navy">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <span className="mt-4 text-sm font-medium text-hospital-teal">Learn more →</span>
    </Link>
  );
}
