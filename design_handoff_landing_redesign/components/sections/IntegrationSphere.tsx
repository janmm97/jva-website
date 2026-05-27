"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

interface Chip {
  name: string;
  src: string;
  top?: string; bottom?: string; left?: string; right?: string;
  delay: number;
}

// White-fill SVGs on a dark chip bg — .light.svg variants are correct for dark surfaces.
const chips: Chip[] = [
  { name: "n8n",         src: "/assets/tools-logo/n8n.light.svg",           top: "4%",    left: "30%",  delay: 0 },
  { name: "Claude Code", src: "/assets/tools-logo/claudecode.light.svg",    top: "10%",   right: "8%",  delay: 0.08 },
  { name: "Notion",      src: "/assets/tools-logo/notion.light.svg",        top: "32%",   right: "-2%", delay: 0.16 },
  { name: "Zapier",      src: "/assets/tools-logo/zapier.light.svg",        bottom: "28%",right: "2%",  delay: 0.24 },
  { name: "OpenAI",      src: "/assets/tools-logo/openai.light.svg",        bottom: "8%", right: "28%", delay: 0.32 },
  { name: "Shopify",     src: "/assets/tools-logo/shopify.light.svg",       bottom: "2%", left: "36%",  delay: 0.12 },
  { name: "Gemini",      src: "/assets/tools-logo/gemini.light.svg",        bottom: "24%",left: "0%",   delay: 0.20 },
  { name: "Anthropic",   src: "/assets/tools-logo/anthropic.light.svg",     top: "35%",   left: "-2%",  delay: 0.28 },
  { name: "Perplexity",  src: "/assets/tools-logo/perplexity.light.svg",    top: "14%",   left: "8%",   delay: 0.04 },
];

// Chip with WHITE background + dark text so the label is visible on the orb-gradient bg.
function ToolChip({ chip, index, revealed }: { chip: Chip; index: number; revealed: boolean }) {
  return (
    <AnimatePresence>
      {revealed && (
        <motion.div
          key={chip.name}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ delay: chip.delay, duration: 0.4, ease: "easeOut" }}
          style={{ position: "absolute", top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right }}
        >
          <motion.div
            animate={{ y: [0, index % 2 === 0 ? -6 : -8, 0] }}
            transition={{ duration: 3 + (index % 3) * 0.8, repeat: Infinity, ease: "easeInOut", delay: chip.delay + 0.5 }}
            className="flex items-center gap-2 bg-white border border-black/10 rounded-xl px-3 py-2 shadow-lg shadow-black/30 whitespace-nowrap"
          >
            <img src={chip.src} alt={chip.name} className="h-[18px] w-[18px] object-contain flex-shrink-0" />
            {/* Dark text — white chip on dark bg requires inversion from the old design */}
            <span className="text-[#1F192F] text-xs font-semibold font-display">{chip.name}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function IntegrationSphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });
  const [revealed, setRevealed] = useState(false);

  // Parallax: sample scroll progress as section enters/exits the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bloom1Y = useTransform(scrollYProgress, [0, 1], ["8%",  "-8%"]);
  const bloom2Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const starsY  = useTransform(scrollYProgress, [0, 1], ["4%",  "-4%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1F192F 0%, #2A2342 18%, #3B3454 50%, #5A4F7C 78%, #8375A1 100%)",
        color: "#FAFAFA",
      }}
    >
      {/* Parallax starfield */}
      <motion.div style={{ y: starsY }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {([
          [12,18,1.0,0.4],[28,8,0.6,0.3],[42,22,1.2,0.5],[58,12,0.8,0.35],[71,28,1.0,0.4],
          [85,15,0.6,0.25],[92,40,1.0,0.4],[7,55,0.8,0.3],[18,68,0.6,0.25],[33,42,1.2,0.5],
          [52,72,0.8,0.3],[68,55,1.0,0.4],[82,68,0.6,0.25],[95,75,0.8,0.3],[5,82,1.0,0.4],
        ] as [number,number,number,number][]).map(([x,y,s,o], i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, opacity: o }} />
        ))}
      </motion.div>

      {/* Parallax blooms */}
      <motion.div style={{ y: bloom1Y }}
        className="absolute bottom-[-30%] left-0 right-0 pointer-events-none flex justify-center" aria-hidden="true">
        <div className="w-[70%] aspect-[1/0.6] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(155,111,208,0.55), rgba(155,111,208,0) 65%)", filter: "blur(60px)" }} />
      </motion.div>
      <motion.div style={{ y: bloom2Y }}
        className="absolute top-[-20%] right-[-10%] pointer-events-none" aria-hidden="true">
        <div className="w-[40vw] aspect-square rounded-full"
          style={{ background: "rgba(107,63,160,0.25)", filter: "blur(120px)" }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          >
            {/* Custom eyebrow — uses lavender on this section */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-4 h-px bg-jva-lavender" />
              <span className="text-jva-lavender text-xs font-medium uppercase tracking-[0.18em]">Integrations</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display leading-[1.05] tracking-tight mb-5 text-white">
              One system,<br />every tool.
            </h2>

            <p className="text-jva-lavender text-lg leading-relaxed mb-8 max-w-md font-light">
              Build automations across every platform you already use.
              n8n, Claude Code, Notion, Shopify, and more — all connected through one intelligent system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => setRevealed(r => !r)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white cursor-pointer transition-all duration-200"
                style={{
                  background: "#9B6FD0",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 6px 24px rgba(155,111,208,0.40)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#B088DC"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#9B6FD0"; }}
              >
                {revealed ? "Hide integrations" : "See how it works"} →
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              {[
                { value: "50+", label: "Workflows built" },
                { value: "18+", label: "Tools integrated" },
                { value: "∞",   label: "Automations possible" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-black font-display text-white">{s.value}</div>
                    <div className="text-jva-lavender/60 text-xs mt-0.5">{s.label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/10" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16,1,0.3,1] }}
            className="relative flex flex-col items-center gap-4"
          >
            <div className="relative w-full max-w-[520px] aspect-square mx-auto">
              {/* Ambient glow */}
              <div className="absolute inset-[10%] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(155,111,208,0.45), transparent 65%)", filter: "blur(50px)" }}
                aria-hidden="true" />

              {/* Pulse ring */}
              {!revealed && (
                <motion.div
                  className="absolute inset-[20%] rounded-full border border-[rgba(196,181,232,0.55)] pointer-events-none orb-pulse"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.10, 0.45] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              )}

              {/* The orb — cutout PNG, not the broken SVG */}
              <motion.div
                className="absolute inset-[4%] flex items-center justify-center cursor-pointer"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => setRevealed(r => !r)}
                role="button"
                aria-label={revealed ? "Click to hide integrations" : "Click to explore integrations"}
              >
                <img
                  src="/assets/logo/jva-orb-cutout.png"
                  alt="JVA integration hub"
                  className="w-full h-full object-contain select-none"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(15,10,30,0.50)) drop-shadow(0 0 80px rgba(155,111,208,0.45))" }}
                  draggable={false}
                />
              </motion.div>

              {chips.map((chip, i) => (
                <ToolChip key={chip.name} chip={chip} index={i} revealed={revealed} />
              ))}
            </div>

            <AnimatePresence>
              {!revealed && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-jva-lavender/40 text-xs tracking-widest uppercase font-display pointer-events-none select-none"
                >
                  Click the orb to explore
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
