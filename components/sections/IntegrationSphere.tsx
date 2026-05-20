"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

interface Chip {
  name: string;
  src: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}

const chips: Chip[] = [
  { name: "n8n",         src: "/assets/tools-logo/n8n.light.svg",           top: "4%",   left: "30%",  delay: 0 },
  { name: "Claude Code", src: "/assets/tools-logo/claudecode.light.svg",    top: "10%",  right: "8%",  delay: 0.08 },
  { name: "Notion",      src: "/assets/tools-logo/notion.light.svg",        top: "32%",  right: "-2%", delay: 0.16 },
  { name: "Zapier",      src: "/assets/tools-logo/zapier.light.svg",        bottom: "28%", right: "2%", delay: 0.24 },
  { name: "OpenAI",      src: "/assets/tools-logo/openai.light.svg",              bottom: "8%",  right: "28%", delay: 0.32 },
  { name: "Shopify",     src: "/assets/tools-logo/shopify.light.svg",       bottom: "2%",  left: "36%", delay: 0.12 },
  { name: "Gemini",      src: "/assets/tools-logo/gemini.light.svg",        bottom: "24%", left: "0%",  delay: 0.20 },
  { name: "Anthropic",   src: "/assets/tools-logo/anthropic.light.svg",     top: "35%",  left: "-2%",  delay: 0.28 },
  { name: "Perplexity",  src: "/assets/tools-logo/perplexity.light.svg",    top: "14%",  left: "8%",   delay: 0.04 },
];

function ToolChip({ chip, index, revealed }: { chip: Chip; index: number; revealed: boolean }) {
  return (
    <AnimatePresence>
      {revealed && (
        <motion.div
          key={chip.name}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ delay: chip.delay, duration: 0.4, ease: "easeOut" as const }}
          style={{
            position: "absolute",
            top: chip.top,
            bottom: chip.bottom,
            left: chip.left,
            right: chip.right,
          }}
        >
          <motion.div
            animate={{ y: [0, index % 2 === 0 ? -6 : -8, 0] }}
            transition={{
              duration: 3 + (index % 3) * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: chip.delay + 0.5,
            }}
            className="flex items-center gap-2 bg-jva-dark/95 backdrop-blur border border-jva-purple/40 rounded-xl px-3 py-2 shadow-lg shadow-black/30 whitespace-nowrap"
          >
            <img
              src={chip.src}
              alt={chip.name}
              className="h-5 w-5 object-contain flex-shrink-0"
            />
            <span className="text-jva-white text-xs font-medium font-display">
              {chip.name}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function IntegrationSphere() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-jva-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <SectionLabel className="mb-5">Integrations</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display leading-[1.05] tracking-tight mb-5">
              One system,
              <br />
              every tool.
            </h2>
            <p className="text-jva-lavender text-lg leading-relaxed mb-8 max-w-md">
              Build automations across every platform you already use.
              n8n, Claude Code, Notion, Shopify, and more — all connected
              through one intelligent system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                See how it works →
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-8 border-t border-jva-purple/20">
              <div>
                <div className="text-2xl font-black font-display text-jva-white">50+</div>
                <div className="text-jva-lavender/60 text-xs mt-0.5">Workflows built</div>
              </div>
              <div className="w-px h-8 bg-jva-purple/30" />
              <div>
                <div className="text-2xl font-black font-display text-jva-white">18+</div>
                <div className="text-jva-lavender/60 text-xs mt-0.5">Tools integrated</div>
              </div>
              <div className="w-px h-8 bg-jva-purple/30" />
              <div>
                <div className="text-2xl font-black font-display text-jva-white">∞</div>
                <div className="text-jva-lavender/60 text-xs mt-0.5">Automations possible</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Orb + chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="relative flex flex-col items-center justify-center gap-4"
          >
            <div className="relative w-full max-w-[520px] aspect-square mx-auto">

              {/* Ambient glow */}
              <div className="absolute inset-[15%] rounded-full bg-jva-accent/[15%] blur-[60px]" aria-hidden="true" />

              {/* Pulse ring — visible only when not yet revealed */}
              {!revealed && (
                <motion.div
                  className="absolute inset-[20%] rounded-full border border-jva-purple/40 pointer-events-none"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              )}

              {/* The orb — clickable */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-[8%] flex items-center justify-center ${!revealed ? "cursor-pointer" : ""}`}
                onClick={() => !revealed && setRevealed(true)}
                role={!revealed ? "button" : undefined}
                aria-label={!revealed ? "Click to explore integrations" : undefined}
              >
                <img
                  src="/assets/logo/jva-orb-svg.svg"
                  alt="JVA integration hub"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Tool chips */}
              {chips.map((chip, i) => (
                <ToolChip key={chip.name} chip={chip} index={i} revealed={revealed} />
              ))}
            </div>

            {/* Hint label */}
            <AnimatePresence>
              {!revealed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
