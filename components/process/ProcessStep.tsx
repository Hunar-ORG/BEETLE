"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ProcessStep as ProcessStepType } from "@/data/process";
import { cn } from "@/lib/utils";
import { DiscoverVisual } from "./visuals/DiscoverVisual";
import { DesignVisual } from "./visuals/DesignVisual";
import { BuildVisual } from "./visuals/BuildVisual";
import { LaunchVisual } from "./visuals/LaunchVisual";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isLast: boolean;
}

export function ProcessStep({ step, index, isLast }: ProcessStepProps) {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: easeCurve,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeInVariants}
      className="relative flex gap-5 sm:gap-8 md:gap-12"
    >
      {/* ── Left Column: Timeline Guide Line + Emerald Node ── */}
      <div className="relative flex flex-col items-center">
        {/* Emerald Node */}
        <div className="relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-emerald-400/40 bg-[#010403] shadow-[0_0_16px_rgba(112,204,77,0.4)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>

        {/* Continuous Guide Line linking to next step */}
        {!isLast && (
          <div
            className="w-px flex-1 bg-gradient-to-b from-emerald-400/30 via-white/[0.08] to-emerald-400/20 my-2"
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Right Column: Step Content & Curated Dual-Panel Visual Mockup ── */}
      <div className={cn("flex-1", isLast ? "pb-0" : "pb-16 sm:pb-24 md:pb-32")}>
        {/* Step Number + Title */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#edf4f0]">
            <span className="font-mono text-emerald-400 mr-3 text-xl sm:text-2xl md:text-3xl">
              {step.number}
            </span>
            {step.name}
          </h3>
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-white/40">
            {"//"} {step.tagline}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-base sm:text-lg text-white/65 font-normal leading-relaxed max-w-2xl">
          {step.description}
        </p>

        {/* High-fidelity Visual Panel for this stage */}
        <div className="mt-6 sm:mt-8 w-full select-none transition-transform duration-500 hover:scale-[1.005]">
          {step.visualType === "discover" && <DiscoverVisual />}
          {step.visualType === "design" && <DesignVisual />}
          {step.visualType === "build" && <BuildVisual />}
          {step.visualType === "launch" && <LaunchVisual />}
        </div>
      </div>
    </motion.div>
  );
}
