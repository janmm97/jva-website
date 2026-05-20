"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "We understand your operations",
    body: "We map every task that's eating your time. No templates — every audit is specific to how your business actually works.",
    widget: (
      <div className="bg-jva-deep/60 rounded-xl border border-jva-purple/30 p-4 text-xs font-mono">
        <div className="text-jva-lavender/50 mb-3">Operations Audit</div>
        {["Email management", "Client onboarding", "Content scheduling", "Invoice tracking", "Reporting"].map(
          (task, i) => (
            <div key={task} className="flex items-center gap-2 py-1.5">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.3 }}
                className="w-4 h-4 rounded border border-jva-accent/60 bg-jva-accent/20 flex items-center justify-center text-jva-bright text-xs"
              >
                ✓
              </motion.span>
              <span className="text-jva-lavender/70">{task}</span>
            </div>
          )
        )}
      </div>
    ),
  },
  {
    number: "02",
    title: "We build your custom system",
    body: "Workflows designed around your tools, your team, and your goals. Built in Claude Code, n8n, and the best AI infrastructure available.",
    widget: (
      <div className="bg-jva-deep/60 rounded-xl border border-jva-purple/30 p-4 text-xs font-mono overflow-hidden">
        <div className="text-jva-lavender/50 mb-3">workflow.json</div>
        <div className="space-y-1">
          <div><span className="text-jva-bright">trigger</span><span className="text-jva-lavender/50">: </span><span className="text-green-400">"email.received"</span></div>
          <div><span className="text-jva-bright">filter</span><span className="text-jva-lavender/50">: </span><span className="text-amber-400">priority &gt; 7</span></div>
          <div><span className="text-jva-bright">action</span><span className="text-jva-lavender/50">: </span><span className="text-jva-lavender/80">label + notify</span></div>
          <div><span className="text-jva-bright">output</span><span className="text-jva-lavender/50">: </span><span className="text-green-400">"slack.dm"</span></div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "We deploy and integrate",
    body: "Minimal disruption to your current operations. We plug into your existing stack — Gmail, Slack, Notion, and beyond.",
    widget: (
      <div className="bg-jva-deep/60 rounded-xl border border-jva-purple/30 p-4 text-xs">
        <div className="text-jva-lavender/50 mb-3 font-mono">Integration Map</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {["n8n", "Claude", "Notion", "Zapier", "Gmail", "Slack"].map((tool) => (
            <div key={tool} className="bg-jva-purple/20 rounded-lg p-2 border border-jva-purple/30 text-jva-lavender/70">
              {tool}
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-jva-bright/60 text-xs">↕ Connected via JVA hub</div>
      </div>
    ),
  },
  {
    number: "04",
    title: "It runs. You grow.",
    body: "Retainer clients get continuous optimization. Product clients own their systems outright. Either way, you stop doing manual work.",
    widget: (
      <div className="bg-jva-deep/60 rounded-xl border border-jva-purple/30 p-4 text-xs font-mono">
        <div className="text-jva-lavender/50 mb-3">This week</div>
        <div className="flex items-end gap-1 mb-2 h-10">
          {[3, 5, 4, 7, 8, 6, 9].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-jva-accent to-jva-bright rounded-sm opacity-70"
              style={{ height: `${h * 10}%` }}
            />
          ))}
        </div>
        <div className="text-jva-white font-bold text-base">24 hrs saved</div>
        <div className="text-jva-bright text-xs">↑ +18% vs last week</div>
      </div>
    ),
  },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 bg-jva-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <SectionLabel className="mb-4">Our Process</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4">
            Simple. Smart. Scalable.
          </h2>
          <p className="text-jva-lavender text-lg max-w-xl">
            Four steps from manual chaos to full autopilot.
          </p>
        </div>

        <motion.div
          ref={ref}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
              }}
              className="bg-jva-dark border border-jva-purple/20 rounded-2xl p-8 hover:border-jva-purple/40 transition-colors duration-300"
            >
              <div className="text-jva-accent/40 font-black font-display text-5xl mb-4 leading-none">
                {step.number}
              </div>
              <h3 className="text-xl font-bold font-display text-jva-white mb-2">
                {step.title}
              </h3>
              <p className="text-jva-lavender/70 text-sm leading-relaxed mb-6">
                {step.body}
              </p>
              {step.widget}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
