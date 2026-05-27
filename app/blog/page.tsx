import type { Metadata } from "next";
import { BlogContent } from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Blog — JVA",
  description:
    "Real lessons on AI automation, workflow systems, and building a smarter business.",
};

export default function BlogPage() {
  return (
    <main className="pt-20">
      <BlogContent />
    </main>
  );
}
