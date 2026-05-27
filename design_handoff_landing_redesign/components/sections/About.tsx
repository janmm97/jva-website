"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-jva-mid">
      <motion.div style={{ y: blob1Y }} className="absolute top-[15%] right-[-12%] w-[45vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-accent/25 blur-[140px]" />
      </motion.div>
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[-20%] left-[5%] w-[35vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-bright/18 blur-[120px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
        >
          <SectionLabel className="mb-6">The Founder</SectionLabel>
          <p className="text-jva-lavender/60 text-sm mb-4">Built by someone who&apos;s been in the trenches.</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-6 leading-tight">
            Started as a VA.<br />
            Built 50+ automations.<br />
            <span className="text-jva-bright">Now building JVA.</span>
          </h2>
          <div className="space-y-4 text-jva-lavender/80 text-base leading-relaxed mb-8 max-w-2xl">
            <p>In 2020, Jan started from scratch — no agency, no coaching, no roadmap. Just a laptop and the drive to figure it out.</p>
            <p>He helped an e-commerce store hit its first seven-figure revenue. Then discovered n8n, built 50+ automations for real businesses, and got into vibe coding with Replit, Cursor, and Claude Code.</p>
            <p>Today, Jan works at one of the fastest-growing AI infrastructure companies in the world. JVA is built on everything he&apos;s learned — not theory, but real systems for real outcomes.</p>
          </div>
          <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant="outline">Read the full story</Button>
        </motion.div>
      </div>
    </section>
  );
}
