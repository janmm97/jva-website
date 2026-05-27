"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToolTickerStrip } from "@/components/sections/LogoTicker";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const PARTICLES: [number, number, number, number][] = [
  [8,12,1.2,0.25],[15,45,0.8,0.15],[22,78,1.4,0.3],[31,23,1.0,0.2],[38,67,0.6,0.12],
  [45,34,1.3,0.28],[52,89,0.9,0.18],[59,11,1.1,0.22],[66,56,0.7,0.14],[73,82,1.5,0.32],
  [80,29,0.8,0.16],[87,63,1.2,0.26],[94,47,1.0,0.2],[4,91,0.6,0.12],[11,38,1.4,0.3],
  [18,72,0.9,0.18],[25,15,1.1,0.24],[32,53,0.7,0.14],[39,86,1.3,0.28],[46,41,0.8,0.16],
  [53,24,1.2,0.22],[60,69,1.0,0.2],[67,7,0.6,0.12],[74,93,1.4,0.3],[81,48,0.9,0.18],
  [88,31,1.1,0.24],[95,76,0.7,0.14],[3,59,1.3,0.28],[10,17,0.8,0.16],[17,84,1.2,0.25],
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map(([x, y, size, opacity], i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            background: "#ffffff",
            opacity: opacity * 0.75,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [arcVisible, setArcVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setArcVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex flex-col overflow-hidden pt-20"
    >
      <Particles />

      {/* Vertical grid guides */}
      <div
        className="hero-grid-overlay absolute inset-0 z-0 grid h-full w-full pointer-events-none"
        aria-hidden="true"
        style={{ gridTemplateColumns: "clamp(28px,10vw,120px) 1fr clamp(28px,10vw,120px)" }}
      >
        <div />
        <div className="hero-grid-center" />
        <div />
      </div>

      {/* Arc */}
      <div
        className={`hero-arc absolute pointer-events-none rounded-[100%] ${arcVisible ? "arc-visible" : ""}`}
        aria-hidden="true"
      />

      {/* Atmospheric blooms */}
      <figure className="hero-bloom-left pointer-events-none absolute left-[4vw] top-16 z-0 hidden aspect-square w-[32vw] rounded-full opacity-40 blur-[110px] md:block" aria-hidden="true" />
      <figure className="hero-bloom-right pointer-events-none absolute bottom-[-50px] right-[7vw] z-0 hidden aspect-square w-[30vw] rounded-full opacity-30 blur-[110px] md:block" aria-hidden="true" />
      <figure className="hero-arc-glow pointer-events-none absolute bottom-[-70%] left-1/2 z-0 aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-0 pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl text-center px-6"
        >
          {/* Pill badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(196,181,232,0.30)] bg-[rgba(42,35,66,0.55)] backdrop-blur-sm px-4 py-1.5">
              <span className="bg-jva-accent text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                New
              </span>
              <span className="text-jva-lavender text-sm tracking-wide">
                AI Automation + Products
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.0] tracking-tight font-display"
          >
            Work less.
            <br />
            Scale more.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-jva-lavender/90 text-lg md:text-xl font-light leading-relaxed max-w-[520px]"
          >
            AI workflows and automation tools built for small business owners
            who are done doing everything manually.
          </motion.p>

          {/* CTA pair */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Submit Your Workflow Idea →
            </Button>
            <Button
              href="#services"
              variant="outline"
              size="lg"
            >
              See services
            </Button>
          </motion.div>
        </motion.div>

        {/* Tool ticker — spacer separates it from the CTA row */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="w-full mt-20"
        >
          <ToolTickerStrip />
        </motion.div>
      </div>
    </section>
  );
}
