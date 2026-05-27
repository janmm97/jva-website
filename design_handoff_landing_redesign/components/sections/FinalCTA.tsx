"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref        = useRef<HTMLDivElement>(null);
  const isInView   = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-20 overflow-hidden bg-jva-deep">
      {/* Central parallax bloom */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-jva-bright/30 blur-[160px]" />
      </motion.div>
      <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] rounded-full bg-jva-accent/25 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center w-full z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          className="flex flex-col items-center gap-6"
        >
          <Badge>Ready when you are</Badge>
          <h2 className="text-5xl lg:text-7xl font-black font-display leading-none">
            Ready to get
            <br />
            <span className="text-jva-bright">your time back?</span>
          </h2>
          <p className="text-jva-lavender text-lg max-w-xl leading-relaxed font-light">
            Tell us about your workflow. We&apos;ll map out exactly what to automate first — and what it means for your business.
          </p>
          <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" size="lg">
            Submit Your Workflow Idea →
          </Button>
          <p className="text-jva-lavender/50 text-sm">No commitment. No pitch deck. Just a real conversation.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-jva-purple/20 text-center"
        >
          <p className="text-jva-lavender/40 text-sm">
            Also building{" "}
            <span className="text-jva-lavender/70">Climbr</span> — an AI career coach &amp; job tracker.{" "}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="text-jva-bright underline ml-1 hover:text-jva-lavender transition-colors">
              Get early access →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
