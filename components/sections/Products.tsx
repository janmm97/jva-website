"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

function EmailTriagePreview() {
  return (
    <div className="bg-jva-deep/80 rounded-xl border border-jva-purple/30 p-4 font-mono text-xs mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-jva-lavender/70">Email Triage — 8:00 AM</span>
        <span className="text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
          Live
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="text-red-400">●</span>
          <span className="text-jva-lavender/90">URGENT</span>
          <span className="text-jva-lavender/50 truncate flex-1">Client invoice overdue</span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="text-amber-400">●</span>
          <span className="text-jva-lavender/90">ACTION</span>
          <span className="text-jva-lavender/50 truncate flex-1">Proposal review needed</span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-jva-purple/20 border border-jva-purple/30">
          <span className="text-jva-bright">●</span>
          <span className="text-jva-lavender/90">FYI</span>
          <span className="text-jva-lavender/50 truncate flex-1">Weekly report digest</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-jva-purple/20 text-jva-lavender/50 flex items-center gap-2">
        <span className="text-jva-bright">▶</span>
        Voice summary sent to Slack
      </div>
    </div>
  );
}

function UGCPreview() {
  const steps = [
    { done: true, label: "Script generated" },
    { done: true, label: "Avatar rendered (HeyGen)" },
    { done: true, label: "Voice cloned (ElevenLabs)" },
    { done: false, label: "B-roll generating..." },
  ];
  return (
    <div className="bg-jva-deep/80 rounded-xl border border-jva-purple/30 p-4 font-mono text-xs mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-jva-lavender/70">UGC Pipeline — Running</span>
        <span className="text-jva-bright flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-jva-bright inline-block animate-pulse" />
          Active
        </span>
      </div>
      <div className="space-y-2">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 text-jva-lavender/70">
            <span className={step.done ? "text-green-400" : "text-amber-400"}>
              {step.done ? "✓" : "⟳"}
            </span>
            <span className={step.done ? "text-jva-lavender/80" : "text-jva-lavender/50"}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-jva-purple/20 text-jva-lavender/50">
        Output: 47s video ready
      </div>
    </div>
  );
}

const toolTagClasses =
  "px-2.5 py-1 rounded-full text-xs bg-jva-purple/30 border border-jva-purple/50 text-jva-lavender/80";

const products = [
  {
    status: "Available Now",
    statusVariant: "success" as const,
    title: "Email Triage Agent",
    description:
      "Never drown in email again. Twice a day, your agent pulls unread emails, labels them by priority, and sends you a voice summary in Slack — reading only the urgent ones.",
    preview: <EmailTriagePreview />,
    tools: ["Gmail", "ElevenLabs", "Slack", "Claude Code"],
    cta: "Get this skill →",
    ctaHref: "https://github.com/janmm97/Email-Triage-Brief",
    comingSoon: false,
  },
  {
    status: "Available Now",
    statusVariant: "success" as const,
    title: "Automated Social Media Content Pipeline",
    description:
      "A full team of AI agents — content strategist, script writer, prompt engineer, and video director — working together to produce scroll-stopping videos from scratch. Your brand voice goes in, ready-to-post content comes out.",
    preview: <UGCPreview />,
    tools: ["Notion", "OpenRouter", "ElevenLabs", "HeyGen", "Kie AI"],
    cta: "Get this skill →",
    ctaHref: BOOKING_URL,
    comingSoon: false,
  },
  {
    status: "Coming Soon",
    statusVariant: "warning" as const,
    title: "Meeting Brief Notes",
    description:
      "Drop in a meeting recording and get a clean, structured brief back — key decisions, action items, owners, and deadlines. No more re-listening, no more missed follow-ups.",
    preview: null,
    tools: [],
    cta: "Join waitlist →",
    ctaHref: BOOKING_URL,
    comingSoon: true,
  },
];

export function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 lg:py-32 bg-jva-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <SectionLabel className="mb-4">Claude Code Skills</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4 max-w-2xl">
            Tools You Own. Systems That Run.
          </h2>
          <p className="text-jva-lavender text-lg max-w-xl">
            Self-serve automation skills you can deploy today — customize once,
            run forever.
          </p>
        </div>

        <motion.div
          ref={ref}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
              }}
              className={`group ${product.comingSoon ? "opacity-75" : ""}`}
            >
              <GlowCard className="h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={product.statusVariant}>
                      {product.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-display text-jva-white mb-3">
                    {product.title}
                  </h3>

                  <p className="text-jva-lavender/80 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {product.preview}

                  {product.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tools.map((tool) => (
                        <span key={tool} className={toolTagClasses}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto">
                    <Button
                      href={product.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                    >
                      {product.cta}
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
