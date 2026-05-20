"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Repeat, User } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

const services = [
  {
    icon: Zap,
    price: "From $1,500",
    period: "one-time",
    title: "One-Time Workflow Setup",
    description:
      "We audit, design, and build a custom automation system for your operations — then hand you the keys. One investment. Zero recurring fees.",
    cta: "Get started →",
    featured: false,
  },
  {
    icon: Repeat,
    price: "From $2,000",
    period: "/mo",
    title: "Workflow Setup + Retainer",
    description:
      "Build it once, then optimize it forever. Monthly partnership: new automations added, systems maintained, results continuously improved.",
    cta: "Book a call →",
    featured: true,
    badge: "Most Popular",
  },
  {
    icon: User,
    price: "Custom pricing",
    period: "",
    title: "Full-Time VA Contract",
    description:
      "A dedicated AI-powered virtual assistant, exclusive to your company. Embedded in your operations. Builds and runs your systems full-time.",
    cta: "Let's talk →",
    featured: false,
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-jva-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <SectionLabel className="mb-4">Our Services</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4 max-w-2xl">
            AI Solutions That Give You Your Time Back
          </h2>
          <p className="text-jva-lavender text-lg max-w-xl">
            Done-for-you workflow systems — designed, built, and deployed around
            your business.
          </p>
        </div>

        <motion.div
          ref={ref}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
                }}
                className="group"
              >
                <GlowCard
                  featured={service.featured}
                  className="h-full hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="p-8 h-full flex flex-col">
                    {service.badge && (
                      <div className="mb-4">
                        <Badge variant="featured">{service.badge}</Badge>
                      </div>
                    )}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${
                        service.featured
                          ? "bg-jva-accent/30"
                          : "bg-jva-purple/30"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={service.featured ? "text-white" : "text-jva-bright"}
                      />
                    </div>

                    <div className="mb-2">
                      <span className="text-2xl font-black font-display text-jva-white">
                        {service.price}
                      </span>
                      {service.period && (
                        <span className="text-jva-lavender/60 text-sm ml-1">
                          {service.period}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold font-display text-jva-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-jva-lavender/80 text-sm leading-relaxed flex-1 mb-6">
                      {service.description}
                    </p>

                    <Button
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={service.featured ? "primary" : "outline"}
                    >
                      {service.cta}
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
