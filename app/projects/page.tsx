import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";
import { IntegrationSphere } from "@/components/sections/IntegrationSphere";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Projects — JVA",
  description:
    "Self-serve Claude Code skills. Email triage, UGC content generation, and more.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      {/* Page header */}
      <section className="py-20 lg:py-28 bg-jva-deep relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[500px] h-[500px] rounded-full bg-jva-accent/10 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-jva-accent text-sm font-medium tracking-widest uppercase mb-4">
            Projects
          </p>
          <h1 className="text-5xl md:text-7xl font-black font-display leading-none tracking-tight max-w-2xl">
            Tools you own.<br />Systems that run.
          </h1>
          <p className="text-jva-lavender text-xl mt-6 max-w-xl leading-relaxed">
            Self-serve automation skills — customize once, deploy forever.
            No lock-in. No monthly fees.
          </p>
        </div>
      </section>

      <Projects />
      <IntegrationSphere />
      <FinalCTA />
    </main>
  );
}
