import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services — JVA",
  description:
    "Done-for-you AI workflow systems. One-time setup, retainer, or full-time VA contract.",
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <Services />
    </main>
  );
}
