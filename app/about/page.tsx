import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About — JVA",
  description:
    "The story behind JVA: from virtual assistant to AI automation agency.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Page header */}
      <section className="py-20 lg:py-28 bg-jva-deep relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[500px] h-[500px] rounded-full bg-jva-accent/10 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-jva-accent text-sm font-medium tracking-widest uppercase mb-4">
            The Founder
          </p>
          <h1 className="text-5xl md:text-7xl font-black font-display leading-none tracking-tight max-w-2xl">
            The story<br />behind JVA.
          </h1>
        </div>
      </section>

      <About />
      <FinalCTA />
    </main>
  );
}
