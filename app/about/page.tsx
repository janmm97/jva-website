import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About — JVA",
  description:
    "The story behind JVA: from virtual assistant to AI automation agency.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <About />
    </main>
  );
}
