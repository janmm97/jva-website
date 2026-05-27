"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const trustBadges = ["5 years experience", "50+ workflows shipped", "Global clients", "Series B AI experience"];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref        = useRef<HTMLDivElement>(null);
  const isInView   = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={sectionRef} id="results" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-jva-deep">
      <motion.div style={{ y: blob1Y }} className="absolute top-[-15%] left-[-5%] w-[45vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-accent/28 blur-[140px]" />
      </motion.div>
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[-10%] right-[-10%] w-[40vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-bright/20 blur-[130px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="mb-14">
          <SectionLabel className="mb-4">Results</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4">Real Business. Real Outcomes.</h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
          className="bg-jva-dark border border-[rgba(196,181,232,0.20)] rounded-2xl p-8 lg:p-12 mb-12"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.30), 0 24px 60px rgba(0,0,0,0.30), 0 0 80px rgba(155,111,208,0.15)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-jva-lavender/50 uppercase tracking-widest">Case Study</span>
            <span className="text-jva-purple/60">·</span>
            <span className="text-xs text-jva-lavender/50 uppercase tracking-widest">E-Commerce · Operations Automation</span>
          </div>
          <blockquote className="text-jva-white text-lg lg:text-xl leading-relaxed font-light mb-8 max-w-2xl">
            &ldquo;Helped an online store go from scattered manual operations to a seven-figure revenue milestone — through systems, not headcount.&rdquo;
          </blockquote>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "7", suffix: "-Figure", label: "Revenue milestone" },
              { value: 50,  suffix: "+ hrs",   label: "Saved per month" },
              { value: 0,   suffix: " tools",  label: "Replaced — just added" },
            ].map((stat, i) => (
              <div key={i} className="bg-black/30 rounded-xl p-4 border border-[rgba(196,181,232,0.14)] text-center">
                <div className="text-2xl lg:text-3xl font-black font-display text-jva-white mb-1">
                  {typeof stat.value === "number"
                    ? <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    : stat.value + stat.suffix}
                </div>
                <div className="text-jva-lavender/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16,1,0.3,1] }}
          className="mb-12"
        >
          <p className="text-jva-lavender/50 text-sm mb-6">What our first clients are saying</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="border border-dashed border-jva-purple/30 rounded-2xl p-6 text-center">
                <p className="text-jva-lavender/30 text-sm">Testimonial coming soon</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-[rgba(196,181,232,0.12)]"
        >
          {trustBadges.map((badge, i) => (
            <span key={badge} className="flex items-center gap-4 text-jva-lavender/60 text-sm">
              {badge}
              {i < trustBadges.length - 1 && <span className="text-jva-purple/60">·</span>}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
