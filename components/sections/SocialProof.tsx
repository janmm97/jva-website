"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const trustBadges = [
  "5 years experience",
  "50+ workflows shipped",
  "Global clients",
  "Series B AI experience",
];

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-24 lg:py-32 bg-jva-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <SectionLabel className="mb-4">Results</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4">
            Real Business. Real Outcomes.
          </h2>
        </div>

        {/* Case study highlight */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="bg-jva-dark border border-jva-purple/30 rounded-2xl p-8 lg:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-jva-lavender/50 uppercase tracking-widest">Case Study</span>
                <span className="text-jva-purple/60">·</span>
                <span className="text-xs text-jva-lavender/50 uppercase tracking-widest">E-Commerce Store · Operations Automation</span>
              </div>
              <blockquote className="text-jva-white text-lg lg:text-xl leading-relaxed font-light mb-6 max-w-2xl">
                &ldquo;Helped an online store go from scattered manual operations to a
                seven-figure revenue milestone — through systems, not
                headcount.&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "7", suffix: "-Figure", label: "Revenue milestone" },
              { value: 50, suffix: "+ hrs", label: "Saved per month" },
              { value: 0, suffix: " tools", label: "Replaced — just added" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-jva-deep/60 rounded-xl p-4 border border-jva-purple/20 text-center"
              >
                <div className="text-2xl lg:text-3xl font-black font-display text-jva-white mb-1">
                  {typeof stat.value === "number" ? (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  ) : (
                    stat.value + stat.suffix
                  )}
                </div>
                <div className="text-jva-lavender/60 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" as const }}
          className="mb-12"
        >
          <p className="text-jva-lavender/50 text-sm mb-6">
            What our first clients are saying
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-dashed border-jva-purple/30 rounded-2xl p-6 text-center"
              >
                <p className="text-jva-lavender/30 text-sm">Testimonial coming soon</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-jva-purple/20"
        >
          {trustBadges.map((badge, i) => (
            <span key={badge} className="flex items-center gap-4 text-jva-lavender/60 text-sm">
              {badge}
              {i < trustBadges.length - 1 && (
                <span className="text-jva-purple/60">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
