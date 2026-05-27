import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects — JVA",
  description:
    "Self-serve Claude Code skills. Email triage, UGC content generation, and more.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <Projects />
    </main>
  );
}
