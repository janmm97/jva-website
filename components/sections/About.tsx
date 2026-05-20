"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

const timeline = [
  { year: "2020", event: "Started as VA" },
  { year: "2021", event: "First 7-figure e-commerce win" },
  { year: "2022", event: "50+ automations built (n8n)" },
  { year: "2023", event: "Into vibe coding: Replit → Cursor → Claude Code" },
  { year: "2024", event: "Joined AI infrastructure company (Series B)" },
  { year: "2025", event: "JVA launched" },
];

const stats = [
  { value: "50+", label: "workflows built" },
  { value: "5 yrs", label: "in operations" },
  { value: "Series B", label: "AI company" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-jva-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <SectionLabel className="mb-6">The Founder</SectionLabel>

            <p className="text-jva-lavender/60 text-sm mb-4">
              Built by someone who&apos;s been in the trenches.
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-6 leading-tight">
              Started as a VA.
              <br />
              Built 50+ automations.
              <br />
              <span className="text-jva-bright">Now building JVA.</span>
            </h2>

            <div className="space-y-4 text-jva-lavender/80 text-base leading-relaxed mb-8">
              <p>
                In 2020, Jan started from scratch — no agency, no coaching, no
                roadmap. Just a laptop and the drive to figure it out.
              </p>
              <p>
                He helped an e-commerce store hit its first seven-figure
                revenue. Then discovered n8n, built 50+ automations for real
                businesses, and got into vibe coding with Replit, Cursor, and
                Claude Code.
              </p>
              <p>
                Today, Jan works at one of the fastest-growing AI infrastructure
                companies in the world. JVA is built on everything he&apos;s
                learned — not theory, but real systems for real outcomes.
              </p>
            </div>

            <Button
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mb-10"
            >
              Read the full story
            </Button>

            {/* Timeline */}
            <div className="space-y-3">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-jva-accent font-mono text-sm font-bold w-10 shrink-0 pt-0.5">
                    {item.year}
                  </span>
                  <span className="text-jva-lavender/70 text-sm">{item.event}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
            className="flex flex-col items-center gap-6"
          >
            {/* Orb with glow */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-jva-accent/20 blur-[60px]" />
              <img
                src="/assets/logo/jva-orb-svg.svg"
                alt="JVA"
                className="relative w-72 lg:w-96 drop-shadow-2xl"
              />
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-jva-deep border border-jva-purple/30 rounded-xl p-4 text-center"
                >
                  <div className="text-jva-white font-black font-display text-lg leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-jva-lavender/60 text-xs leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
