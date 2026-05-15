"use client";

import { useEffect, useState } from "react";
import LocationSlider from "@/components/home/LocationSlider";
import { fetchBranches, type Branch } from "@/lib/api";

export default function OurLocationsPage() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    fetchBranches().then(setBranches);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <LocationSlider branches={branches} />
    </main>
  );
}
