"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";
const FULL_TIME_AVAILABLE = false;
const FULL_TIME_URL = "https://calendly.com/janmm-va/30min";

const plans = [
  { name: "One-Time Setup",         price: "$1,500 – $3,000", period: "one-time",          features: ["Full operations audit","Custom workflow design","Build + QA testing","Documentation & handoff","2 weeks post-launch support"],                                                cta: "Submit Your Workflow Idea", featured: false, available: true },
  { name: "Setup + Retainer",       price: "From $2,000",     period: "/mo",     badge: "Most Popular", features: ["Everything in One-Time Setup","Ongoing optimization","New automations monthly","Priority support","Monthly performance review","Access to new product skills"], cta: "Submit Your Workflow Idea", featured: true,  available: true },
  { name: "Full-Time VA Contract",  price: "Custom",          period: "exclusive contract", badge: "Not Available",  features: ["Dedicated AI VA, full-time","Exclusive to your company","Complete ops management","Custom agentic workflow builds","Weekly sync + reporting","First access to all new products"], cta: "Not Available", featured: false, available: FULL_TIME_AVAILABLE },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const isInView   = useInView(gridRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} id="pricing" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-jva-dark">
      <motion.div style={{ y: blob1Y }} className="absolute top-[-10%] right-[-10%] w-[45vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-accent/25 blur-[140px]" />
      </motion.div>
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[-15%] left-[-10%] w-[40vw] aspect-square pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-bright/20 blur-[130px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="mb-16">
          <SectionLabel className="mb-4">Pricing</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4 max-w-2xl">The Right Investment for Where You Are</h2>
          <p className="text-jva-lavender text-lg font-light">No hidden fees. No lock-in surprises. Just clear value.</p>
        </div>
        <motion.div
          ref={gridRef}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name}
              variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] as const } } }}
            >
              <GlowCard featured={plan.featured} className="h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="p-8 h-full flex flex-col">
                  {plan.badge && (
                    <div className="mb-4">
                      <Badge variant={plan.available ? "featured" : "default"}>{plan.badge}</Badge>
                    </div>
                  )}
                  <h3 className="text-lg font-bold font-display text-jva-white mb-2">{plan.name}</h3>
                  <div className="mb-1"><span className="text-3xl font-black font-display text-jva-white">{plan.price}</span></div>
                  <p className="text-jva-lavender/50 text-sm mb-6">{plan.period}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check size={16} className="text-jva-bright mt-0.5 shrink-0" />
                        <span className="text-jva-lavender/80 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.available ? (
                    <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant={plan.featured ? "primary" : "outline"}>{plan.cta}</Button>
                  ) : (
                    <Button href={FULL_TIME_URL} target="_blank" rel="noopener noreferrer" variant="outline" className="opacity-40 cursor-not-allowed pointer-events-none">Not Available</Button>
                  )}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
