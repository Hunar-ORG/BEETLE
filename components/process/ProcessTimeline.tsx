"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/process";
import { ProcessStep } from "./ProcessStep";

export function ProcessTimeline() {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.8,
          ease: easeCurve,
        }}
        className="mb-16 sm:mb-24 md:mb-28 text-left md:text-center"
      >
        <span className="inline-block text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] text-emerald-400 uppercase mb-4">
          OUR PROCESS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white/95">
          How we build your presence<span className="text-emerald-400">.</span>
        </h2>
      </motion.div>

      {/* ── Continuous Timeline Sequence ── */}
      <div className="relative">
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStep
            key={step.number}
            step={step}
            index={index}
            isLast={index === PROCESS_STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
