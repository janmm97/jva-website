"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 lg:py-40 bg-jva-deep overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-jva-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-jva-bright/5 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex flex-col items-center gap-6"
        >
          <Badge>Ready when you are</Badge>

          <h2 className="text-5xl lg:text-7xl font-black font-display leading-none">
            Ready to get
            <br />
            <span className="text-jva-bright">your time back?</span>
          </h2>

          <p className="text-jva-lavender text-lg max-w-xl leading-relaxed">
            Book a free 30-minute strategy call. We&apos;ll map out exactly what
            to automate first — and what it means for your business.
          </p>

          <Button
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Book your free strategy call →
          </Button>

          <p className="text-jva-lavender/50 text-sm">
            No commitment. No pitch deck. Just a real conversation.
          </p>
        </motion.div>

        {/* Climbr mention */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-jva-purple/20 text-center"
        >
          <p className="text-jva-lavender/40 text-sm">
            Also building{" "}
            <span className="text-jva-lavender/70">Climbr</span> — an AI
            career coach &amp; job tracker.{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-jva-bright underline ml-1 hover:text-jva-lavender transition-colors"
            >
              Get early access →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
