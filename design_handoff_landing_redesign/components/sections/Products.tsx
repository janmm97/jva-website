"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

function EmailTriagePreview() {
  return (
    <div className="bg-black/40 rounded-xl border border-[rgba(196,181,232,0.14)] p-4 font-mono text-xs mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-jva-lavender/70">Email Triage — 8:00 AM</span>
        <span className="text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />Live
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="text-[#FB7185]">●</span><span className="text-jva-lavender/90">URGENT</span>
          <span className="text-jva-lavender/50 truncate flex-1">Client invoice overdue</span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="text-[#FBBF24]">●</span><span className="text-jva-lavender/90">ACTION</span>
          <span className="text-jva-lavender/50 truncate flex-1">Proposal review needed</span>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-jva-purple/20 border border-jva-purple/30">
          <span className="text-jva-bright">●</span><span className="text-jva-lavender/90">FYI</span>
          <span className="text-jva-lavender/50 truncate flex-1">Weekly report digest</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[rgba(196,181,232,0.10)] text-jva-lavender/50 flex items-center gap-2">
        <span className="text-jva-bright">▶</span>Voice summary sent to Slack
      </div>
    </div>
  );
}

function UGCPreview() {
  const steps = [
    { done: true,  label: "Script generated" },
    { done: true,  label: "Avatar rendered (HeyGen)" },
    { done: true,  label: "Voice cloned (ElevenLabs)" },
    { done: false, label: "B-roll generating..." },
  ];
  return (
    <div className="bg-black/40 rounded-xl border border-[rgba(196,181,232,0.14)] p-4 font-mono text-xs mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-jva-lavender/70">UGC Pipeline — Running</span>
        <span className="text-jva-bright flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-jva-bright inline-block animate-pulse" />Active
        </span>
      </div>
      <div className="space-y-1.5">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-jva-lavender/70">
            <span className={s.done ? "text-green-400" : "text-amber-400"}>{s.done ? "✓" : "⟳"}</span>
            <span className={s.done ? "text-jva-lavender/80" : "text-jva-lavender/50"}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-[rgba(196,181,232,0.10)] text-jva-lavender/50">Output: 47s video ready</div>
    </div>
  );
}

const products = [
  { status: "Available Now", statusVariant: "success" as const, title: "Email Triage Agent",                     description: "Never drown in email again. Twice a day, your agent pulls unread emails, labels them by priority, and sends you a voice summary in Slack — reading only the urgent ones.",                                                                                          preview: <EmailTriagePreview />, tools: ["Gmail","ElevenLabs","Slack","Claude Code"],                      cta: "Get this skill →", ctaHref: "https://github.com/janmm97/Email-Triage-Brief", comingSoon: false },
  { status: "Available Now", statusVariant: "success" as const, title: "Automated Social Media Content Pipeline", description: "A full team of AI agents — content strategist, script writer, prompt engineer, and video director — working together to produce scroll-stopping videos from scratch. Your brand voice goes in, ready-to-post content comes out.",                             preview: <UGCPreview />,         tools: ["Notion","OpenRouter","ElevenLabs","HeyGen","Kie AI"],      cta: "Get this skill →", ctaHref: BOOKING_URL,                                   comingSoon: false },
  { status: "Coming Soon",   statusVariant: "warning" as const, title: "Meeting Brief Notes",                     description: "Drop in a meeting recording and get a clean, structured brief back — key decisions, action items, owners, and deadlines. No more re-listening, no more missed follow-ups.",                                                                                  preview: null,                   tools: [],                                                          cta: "Join waitlist →", ctaHref: BOOKING_URL,                                    comingSoon: true  },
];

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const isInView   = useInView(gridRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} id="products" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-jva-dark">
      <motion.div style={{ y: blob1Y }} className="absolute top-[20%] right-[-15%] w-[45vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-accent/30 blur-[140px]" />
      </motion.div>
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[-10%] left-[-10%] w-[40vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-bright/20 blur-[130px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="mb-14">
          <SectionLabel className="mb-4">Claude Code Skills</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4 max-w-2xl">Tools You Own. Systems That Run.</h2>
          <p className="text-jva-lavender text-lg max-w-xl font-light">Self-serve automation skills you can deploy today — customize once, run forever.</p>
        </div>
        <motion.div ref={gridRef}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((p) => (
            <motion.div key={p.title}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] as const } } }}
              className={p.comingSoon ? "opacity-75" : ""}
            >
              <GlowCard className="h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-4"><Badge variant={p.statusVariant}>{p.status}</Badge></div>
                  <h3 className="text-xl font-bold font-display text-jva-white mb-3">{p.title}</h3>
                  <p className="text-jva-lavender/80 text-sm leading-relaxed mb-4">{p.description}</p>
                  {p.preview}
                  {p.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tools.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-jva-purple/20 border border-[rgba(196,181,232,0.15)] text-jva-lavender/80">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto">
                    <Button href={p.ctaHref} target="_blank" rel="noopener noreferrer" variant="outline">{p.cta}</Button>
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
