import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Services — JVA",
  description:
    "Done-for-you AI workflow systems. One-time setup, retainer, or full-time VA contract.",
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Page header */}
      <section className="py-20 lg:py-28 bg-jva-deep relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[500px] h-[500px] rounded-full bg-jva-accent/10 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-jva-accent text-sm font-medium tracking-widest uppercase mb-4">
            Our Services
          </p>
          <h1 className="text-5xl md:text-7xl font-black font-display leading-none tracking-tight max-w-2xl">
            AI that works<br />for your business.
          </h1>
          <p className="text-jva-lavender text-xl mt-6 max-w-xl leading-relaxed">
            Done-for-you workflow systems designed, built, and deployed
            around your operations.
          </p>
        </div>
      </section>

      <Services />
      <Process />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
