"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

const plans = [
  {
    name: "One-Time Setup",
    price: { monthly: "$1,500 – $3,000", annual: "$1,500 – $3,000" },
    period: "one-time",
    features: [
      "Full operations audit",
      "Custom workflow design",
      "Build + QA testing",
      "Documentation & handoff",
      "2 weeks post-launch support",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Setup + Retainer",
    price: { monthly: "From $2,000", annual: "From $1,700" },
    period: "/mo",
    badge: "Most Popular",
    features: [
      "Everything in One-Time Setup",
      "Ongoing optimization",
      "New automations monthly",
      "Priority support",
      "Monthly performance review",
      "Access to new product skills",
    ],
    cta: "Book a call",
    featured: true,
  },
  {
    name: "Full-Time VA Contract",
    price: { monthly: "Custom", annual: "Custom" },
    period: "exclusive contract",
    features: [
      "Dedicated AI VA, full-time",
      "Exclusive to your company",
      "Complete ops management",
      "Custom agentic workflow builds",
      "Weekly sync + reporting",
      "First access to all new products",
    ],
    cta: "Let's talk",
    featured: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-jva-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <SectionLabel className="mb-4">Pricing</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4 max-w-2xl">
            The Right Investment for Where You Are
          </h2>
          <p className="text-jva-lavender text-lg mb-8">
            No hidden fees. No lock-in surprises. Just clear value.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-jva-deep rounded-full p-1 border border-jva-purple/30">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                !annual
                  ? "bg-jva-accent text-white"
                  : "text-jva-lavender/60 hover:text-jva-lavender"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                annual
                  ? "bg-jva-accent text-white"
                  : "text-jva-lavender/60 hover:text-jva-lavender"
              }`}
            >
              Annual{" "}
              <span className="text-xs text-green-400 ml-1">2 months free</span>
            </button>
          </div>
        </div>

        <motion.div
          ref={ref}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
              }}
              className="group"
            >
              <GlowCard
                featured={plan.featured}
                className="h-full hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="p-8 h-full flex flex-col">
                  {plan.badge && (
                    <div className="mb-4">
                      <Badge variant="featured">{plan.badge}</Badge>
                    </div>
                  )}

                  <h3 className="text-lg font-bold font-display text-jva-white mb-2">
                    {plan.name}
                  </h3>

                  <div className="mb-1">
                    <span className="text-3xl font-black font-display text-jva-white">
                      {annual ? plan.price.annual : plan.price.monthly}
                    </span>
                  </div>
                  <p className="text-jva-lavender/50 text-sm mb-6">{plan.period}</p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="text-jva-bright mt-0.5 shrink-0"
                        />
                        <span className="text-jva-lavender/80 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={plan.featured ? "primary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
