"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Zap, Repeat, User } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";
const FULL_TIME_AVAILABLE = false;
const FULL_TIME_URL = "https://calendly.com/janmm-va/30min";

const services = [
  { icon: Zap,    price: "From $1,500", period: "one-time",  title: "One-Time Workflow Setup",   description: "We audit, design, and build a custom automation system for your operations — then hand you the keys. One investment. Zero recurring fees.", cta: "Submit Your Workflow Idea →", featured: false, available: true },
  { icon: Repeat, price: "From $2,000", period: "/mo",       title: "Workflow Setup + Retainer", description: "Build it once, then optimize it forever. Monthly partnership: new automations added, systems maintained, results continuously improved.",   cta: "Submit Your Workflow Idea →", featured: true,  badge: "Most Popular", available: true },
  { icon: User,   price: "Custom pricing", period: "",       title: "Full-Time VA Contract",     description: "A dedicated AI-powered virtual assistant, exclusive to your company. Embedded in your operations. Builds and runs your systems full-time.",  cta: "Not Available →", featured: false, badge: "Not Available", available: FULL_TIME_AVAILABLE },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const isInView   = useInView(gridRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={sectionRef} id="services" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-jva-deep">
      {/* Parallax blooms */}
      <motion.div style={{ y: blob1Y }} className="absolute top-[-10%] left-[-10%] w-[40vw] aspect-square rounded-full pointer-events-none"
        aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-accent/30 blur-[140px]" />
      </motion.div>
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[-15%] right-[-5%] w-[35vw] aspect-square rounded-full pointer-events-none"
        aria-hidden="true">
        <div className="w-full h-full rounded-full bg-jva-bright/25 blur-[130px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="mb-14">
          <SectionLabel className="mb-4">Our Services</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display mb-4 max-w-2xl">
            AI Solutions That Give You Your Time Back
          </h2>
          <p className="text-jva-lavender text-lg max-w-xl font-light">
            Done-for-you workflow systems — designed, built, and deployed around your business.
          </p>
        </div>

        <motion.div
          ref={gridRef}
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title}
                variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] as const } } }}
              >
                <GlowCard featured={service.featured} className="h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="p-8 h-full flex flex-col">
                    {service.badge && (
                      <div className="mb-4">
                        <Badge variant={service.available ? "featured" : "default"}>{service.badge}</Badge>
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${service.featured ? "bg-jva-bright/20" : "bg-jva-purple/30"}`}>
                      <Icon size={20} className={service.featured ? "text-white" : "text-jva-bright"} />
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl font-black font-display text-jva-white">{service.price}</span>
                      {service.period && <span className="text-jva-lavender/60 text-sm ml-1">{service.period}</span>}
                    </div>
                    <h3 className="text-lg font-bold font-display text-jva-white mb-3">{service.title}</h3>
                    <p className="text-jva-lavender/80 text-sm leading-relaxed flex-1 mb-6">{service.description}</p>
                    {service.available ? (
                      <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant={service.featured ? "primary" : "outline"}>{service.cta}</Button>
                    ) : (
                      <Button href={FULL_TIME_URL} target="_blank" rel="noopener noreferrer" variant="outline" className="opacity-40 cursor-not-allowed pointer-events-none">Not Available</Button>
                    )}
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
