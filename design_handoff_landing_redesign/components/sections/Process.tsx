"use client";

// Process.tsx — scroll-pinned vertical card carousel.
//
// Structure:
//   <div style={{height: "400vh"}}> ← 4× viewport scroll room
//     <div sticky top-0 h-screen>   ← pinned viewport
//       <LeftCol />                 ← eyebrow + H2 + step rail
//       <RightCol />                ← 4 absolutely-stacked cards, driven by scroll
//     </div>
//   </div>
//
// Scroll progress (0 → 1) maps to activeFloat (0 → 3).
// Each card uses useTransform to calculate yPercent, scale, opacity.

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "We understand your operations",
    body: "We map every task that's eating your time. No templates — every audit is specific to how your business actually works.",
    widget: (
      <div className="bg-black/40 rounded-xl border border-[rgba(196,181,232,0.14)] p-4 text-xs font-mono">
        <div className="text-jva-lavender/50 mb-3">Operations Audit</div>
        {["Email management", "Client onboarding", "Content scheduling", "Invoice tracking", "Reporting"].map((task) => (
          <div key={task} className="flex items-center gap-2 py-1.5">
            <span className="w-4 h-4 rounded border border-jva-accent/60 bg-jva-accent/20 flex items-center justify-center text-jva-bright text-[10px]">✓</span>
            <span className="text-jva-lavender/70">{task}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    title: "We build your custom system",
    body: "Workflows designed around your tools, your team, and your goals. Built in Claude Code, n8n, and the best AI infrastructure available.",
    widget: (
      <div className="bg-black/40 rounded-xl border border-[rgba(196,181,232,0.14)] p-4 text-xs font-mono leading-relaxed">
        <div className="text-jva-lavender/50 mb-3">workflow.json</div>
        <div><span className="text-jva-bright">trigger</span><span className="text-jva-lavender/50">: </span><span className="text-green-400">&quot;email.received&quot;</span></div>
        <div><span className="text-jva-bright">filter</span><span className="text-jva-lavender/50">: </span><span className="text-amber-400">priority &gt; 7</span></div>
        <div><span className="text-jva-bright">action</span><span className="text-jva-lavender/50">: </span><span className="text-jva-lavender/80">label + notify</span></div>
        <div><span className="text-jva-bright">output</span><span className="text-jva-lavender/50">: </span><span className="text-green-400">&quot;slack.dm&quot;</span></div>
      </div>
    ),
  },
  {
    number: "03",
    title: "We deploy and integrate",
    body: "Minimal disruption to your current operations. We plug into your existing stack — Gmail, Slack, Notion, and beyond.",
    widget: (
      <div className="bg-black/40 rounded-xl border border-[rgba(196,181,232,0.14)] p-4 text-xs">
        <div className="text-jva-lavender/50 mb-3 font-mono">Integration Map</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {["n8n","Claude","Notion","Zapier","Gmail","Slack"].map((tool) => (
            <div key={tool} className="bg-jva-accent/10 border border-jva-accent/20 rounded-lg p-2 text-jva-lavender/70">{tool}</div>
          ))}
        </div>
        <div className="mt-3 text-center text-jva-bright/60 text-xs">↕ Connected via JVA hub</div>
      </div>
    ),
  },
  {
    number: "04",
    title: "It runs. You grow.",
    body: "Retainer clients get continuous optimization. Product clients own their systems outright. Either way, you stop doing manual work.",
    widget: (
      <div className="bg-black/40 rounded-xl border border-[rgba(196,181,232,0.14)] p-4 text-xs font-mono">
        <div className="text-jva-lavender/50 mb-3">This week</div>
        <div className="flex items-end gap-1 mb-3 h-12">
          {[3,5,4,7,8,6,9].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-jva-accent to-jva-bright rounded-sm opacity-80" style={{ height: `${h * 10}%` }} />
          ))}
        </div>
        <div className="text-jva-white font-bold text-base">24 hrs saved</div>
        <div className="text-jva-bright text-xs mt-0.5">↑ +18% vs last week</div>
      </div>
    ),
  },
];

const N = steps.length;

function ProcessCard({
  step,
  index,
  activeFloat,
}: {
  step: typeof steps[number];
  index: number;
  activeFloat: MotionValue<number>;
}) {
  const yPercent = useTransform(activeFloat, (val) => (index - val) * 110);
  const scale    = useTransform(activeFloat, (val) => Math.max(0.84, 1 - Math.abs(index - val) * 0.08));
  const opacity  = useTransform(activeFloat, (val) => {
    const abs = Math.abs(index - val);
    return abs > 1.4 ? 0 : Math.max(0, 1 - abs * 0.7);
  });

  return (
    <motion.div
      style={{ yPercent, scale, opacity }}
      className="absolute inset-0"
    >
      <div
        className="h-full w-full rounded-3xl p-10 flex flex-col"
        style={{
          background: "linear-gradient(180deg, #2F2649 0%, #2A2342 100%)",
          border: "1px solid rgba(196,181,232,0.20)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.30), 0 24px 60px rgba(0,0,0,0.40), 0 0 80px rgba(155,111,208,0.18)",
        }}
      >
        <div className="text-[80px] font-black font-display leading-none mb-3"
          style={{ color: "rgba(196,181,232,0.25)" }}>{step.number}</div>
        <h3 className="text-2xl font-bold font-display text-jva-white mb-3 tracking-tight">{step.title}</h3>
        <p className="text-jva-lavender/80 text-sm leading-relaxed mb-6 font-light">{step.body}</p>
        <div className="mt-auto">{step.widget}</div>
      </div>
    </motion.div>
  );
}

function StepRail({ activeFloat }: { activeFloat: MotionValue<number> }) {
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      {steps.map((s, i) => {
        // We can't useTransform per-step easily outside the component, so we use a wrapper
        return <StepRailItem key={s.number} step={s} index={i} activeFloat={activeFloat} />;
      })}
    </div>
  );
}

function StepRailItem({
  step, index, activeFloat
}: { step: typeof steps[number]; index: number; activeFloat: MotionValue<number>}) {
  const isActive = useTransform(activeFloat, (val) => Math.round(val) === index ? 1 : 0);
  const isPast   = useTransform(activeFloat, (val) => val > index + 0.5 ? 0.45 : (Math.round(val) === index ? 1 : 0.3));

  return (
    <motion.div style={{ opacity: isPast }} className="flex items-center gap-3.5">
      <motion.div
        style={{
          background: useTransform(isActive, (v) => v > 0.5 ? "#9B6FD0" : "rgba(155,111,208,0.12)"),
          color: useTransform(isActive, (v) => v > 0.5 ? "#FFFFFF" : "#9B6FD0"),
          boxShadow: useTransform(isActive, (v) => v > 0.5 ? "0 6px 20px rgba(155,111,208,0.35)" : "none"),
        }}
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-display transition-all duration-400"
      >
        {step.number}
      </motion.div>
      <span className="text-jva-lavender/80 text-sm font-medium font-display">{step.title}</span>
    </motion.div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Compress slightly so first/last card sit comfortably at endpoints
  const activeFloat = useTransform(
    scrollYProgress,
    [0.04, 0.96],
    [0, N - 1]
  );

  const hintOpacity = useTransform(scrollYProgress, [0, 0.80, 0.90], [0.7, 0.7, 0]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${N * 100}vh` }}
      className="relative"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center"
        style={{
          background: "linear-gradient(180deg, #8375A1 0%, #5A4F7C 10%, #3B3454 30%, #2A2342 60%, #1F192F 100%)",
        }}
      >
        {/* Ambient bloom */}
        <div
          className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "rgba(155,111,208,0.18)", filter: "blur(120px)" }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <SectionLabel className="mb-4">Our Process</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black font-display leading-[1.05] tracking-tight mb-5 text-white">
                Simple. Smart.<br />Scalable.
              </h2>
              <p className="text-jva-lavender/80 text-lg mb-10 max-w-sm font-light leading-relaxed">
                Four steps from manual chaos to full autopilot.
              </p>

              <StepRail activeFloat={activeFloat} />

              {/* Scroll hint */}
              <motion.div
                style={{ opacity: hintOpacity }}
                className="flex items-center gap-2.5 mt-10 text-jva-lavender/40 text-xs uppercase tracking-widest"
              >
                <div className="relative w-[18px] h-[28px] rounded-full border border-current flex-shrink-0">
                  <div className="scroll-hint-dot" />
                </div>
                Scroll to advance
              </motion.div>
            </div>

            {/* RIGHT — Card stage */}
            <div className="relative h-[540px] w-full" style={{ perspective: "1200px" }}>
              {steps.map((step, i) => (
                <ProcessCard
                  key={step.number}
                  step={step}
                  index={i}
                  activeFloat={activeFloat}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
