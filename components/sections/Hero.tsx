"use client";

import { motion } from "framer-motion";
import { ToolTickerStrip } from "@/components/sections/LogoTicker";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const PARTICLES = [
  [8,12,1.2,0.25],[15,45,0.8,0.15],[22,78,1.4,0.3],[31,23,1.0,0.2],[38,67,0.6,0.12],
  [45,34,1.3,0.28],[52,89,0.9,0.18],[59,11,1.1,0.22],[66,56,0.7,0.14],[73,82,1.5,0.32],
  [80,29,0.8,0.16],[87,63,1.2,0.26],[94,47,1.0,0.2],[4,91,0.6,0.12],[11,38,1.4,0.3],
  [18,72,0.9,0.18],[25,15,1.1,0.24],[32,53,0.7,0.14],[39,86,1.3,0.28],[46,41,0.8,0.16],
  [53,24,1.2,0.22],[60,69,1.0,0.2],[67,7,0.6,0.12],[74,93,1.4,0.3],[81,48,0.9,0.18],
  [88,31,1.1,0.24],[95,76,0.7,0.14],[3,59,1.3,0.28],[10,17,0.8,0.16],[17,84,1.2,0.25],
  [24,42,1.0,0.2],[35,61,0.6,0.12],[42,95,1.4,0.3],[49,28,0.9,0.18],[56,73,1.1,0.22],
  [63,5,0.7,0.14],[70,50,1.3,0.28],[77,88,0.8,0.16],[84,33,1.2,0.26],[91,64,1.0,0.2],
  [6,79,0.6,0.12],[13,22,1.4,0.3],[20,57,0.9,0.18],[27,94,1.1,0.24],[34,39,0.7,0.14],
  [41,71,1.3,0.28],[48,13,0.8,0.16],[55,46,1.2,0.25],[62,83,1.0,0.2],[69,27,0.6,0.12],
  [76,60,1.4,0.3],[83,8,0.9,0.18],[90,97,1.1,0.22],[2,43,0.7,0.14],[9,66,1.3,0.28],
  [16,19,0.8,0.16],[23,52,1.2,0.26],[30,87,1.0,0.2],[37,35,0.6,0.12],[44,74,1.4,0.3],
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map(([x, y, size, opacity], i) => (
        <div
          key={i}
          className="particle"
          style={{
            "--px": `${x}%`,
            "--py": `${y}%`,
            "--psize": `${size}px`,
            "--popacity": String(opacity),
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}


export function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex flex-col overflow-hidden pt-20"
    >
      <Particles />

      {/* Vertical grid column lines */}
      <div
        className="hero-grid-overlay absolute left-0 top-0 z-0 grid h-full w-full pointer-events-none"
        aria-hidden="true"
      >
        <div />
        <div className="hero-grid-center" />
        <div />
      </div>

      {/* Arc sphere at the bottom */}
      <div
        className="hero-arc absolute -translate-x-1/2 rounded-[100%] border border-[#9B6FD0]/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Left soft bloom */}
      <figure className="hero-bloom-left pointer-events-none absolute left-[4vw] top-[64px] z-0 hidden aspect-square w-[32vw] rounded-full opacity-40 blur-[100px] md:block" aria-hidden="true" />
      {/* Right soft bloom */}
      <figure className="hero-bloom-right pointer-events-none absolute bottom-[-50px] right-[7vw] z-0 hidden aspect-square w-[30vw] rounded-full opacity-40 blur-[100px] md:block" aria-hidden="true" />

      {/* Bottom accent glow behind arc */}
      <figure
        className="hero-arc-glow pointer-events-none absolute bottom-[-70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10 pb-[8vh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-7 max-w-4xl text-center px-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-jva-purple/50 bg-jva-dark/70 backdrop-blur-sm px-4 py-1.5">
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
            className="text-[clamp(3rem,9vw,6.5rem)] font-black leading-[1.0] tracking-tight font-display"
          >
            Work less.
            <br />
            Scale more.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            className="text-jva-lavender text-lg md:text-xl font-light leading-relaxed max-w-[520px]"
          >
            AI workflows and automation tools built for small business owners
            who are done doing everything manually.
          </motion.p>
        </motion.div>

        {/* Tool carousel — full width, below subtitle */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <ToolTickerStrip />
        </motion.div>
      </div>
    </section>
  );
}
