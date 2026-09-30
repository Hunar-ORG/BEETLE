"use client";

import { motion } from "framer-motion";
import { Focus, Compass, Layers } from "lucide-react";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useSectionReveal, createFadeInVariants, EASE_CURVE, DURATION_HEADING } from "@/lib/motion";
import { Atmosphere } from "@/components/ui/Atmosphere";

interface Principle {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRINCIPLES: Principle[] = [
  {
    title: "MAKE IT CLEAR",
    description: "Good design makes the right things easy to understand.",
    icon: Focus,
  },
  {
    title: "DESIGN WITH INTENT",
    description:
      "Every detail should strengthen the way your business is seen.",
    icon: Compass,
  },
  {
    title: "BUILT TO LAST",
    description:
      "Fast, responsive, thoughtful technology behind a lasting experience.",
    icon: Layers,
  },
];

export function AboutPrinciples() {
  const { ref, controls, shouldReduceMotion } = useSectionReveal("about");
  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  // Masked reveal variant for "Presence" centerpiece
  const maskedPresenceVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : DURATION_HEADING,
        delay: shouldReduceMotion ? 0 : 0.08,
        ease: EASE_CURVE,
      },
    },
  };

  return (
    <section
      ref={ref}
      aria-label="Our Leading Principle — Presence"
      className={cn(
        "relative w-full overflow-x-clip overflow-y-visible bg-transparent text-white selection:bg-emerald-500/25 selection:text-emerald-100",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 2 Atmosphere: Subtle bottom spill into next section ── */}
      <Atmosphere level="atmospheric" position="bottom" />

      <div className="relative z-10 mx-auto max-w-4xl lg:max-w-5xl px-6 sm:px-8 md:px-12 py-20 sm:py-24 md:py-28 lg:py-32">
        {/* ── HERO OF SECTION: Eyebrow + Presence + Supporting Statement ── */}
        <div id="about" className="flex flex-col items-center text-center scroll-mt-28 md:scroll-mt-32">
          {/* 1. Small eyebrow */}
          <motion.div
            initial="hidden"
            animate={controls}
            custom={0}
            variants={fadeInVariants}
            className="flex items-center justify-center gap-2 text-xs sm:text-[13px] font-medium tracking-[0.26em] text-emerald-400 uppercase select-none"
          >
            <span
              className="inline-block h-3.5 w-px bg-emerald-400/80 mr-1"
              aria-hidden="true"
            />
            OUR LEADING PRINCIPLE
          </motion.div>

          {/* 2. Large centerpiece: "Presence" (Hero of section, masked reveal) */}
          <div className="relative mt-5 sm:mt-6 md:mt-8 w-full select-none overflow-hidden pt-1 pb-4 -mb-4">
            <motion.h2
              initial="hidden"
              animate={controls}
              variants={maskedPresenceVariants}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] 2xl:text-[176px] font-medium leading-[0.92] tracking-[-0.035em] text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)] will-change-transform"
            >
              Presence
            </motion.h2>
          </div>

          {/* 3. Supporting statement (Subordinate, compact 2 lines) */}
          <motion.p
            initial="hidden"
            animate={controls}
            custom={0.2}
            variants={fadeInVariants}
            className="mt-6 sm:mt-7 md:mt-8 max-w-xl text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-normal leading-[1.42] tracking-[-0.015em] text-white/75"
          >
            Your website is often your first impression.
            <br className="hidden sm:inline" /> Make it one worth remembering.
          </motion.p>
        </div>

        {/* ── OPEN EDITORIAL PRINCIPLES (FLUXON-INSPIRED OPEN LIST) ──── */}
        <div className="mt-20 sm:mt-24 md:mt-28 space-y-12 sm:space-y-14 md:space-y-16 w-full">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.article
                key={principle.title}
                initial="hidden"
                animate={controls}
                custom={shouldReduceMotion ? 0 : 0.28 + 0.1 * index}
                variants={fadeInVariants}
                className="group flex flex-col md:flex-row md:items-baseline md:justify-between transition-colors duration-250"
              >
                {/* LEFT: small refined line icon + principle title */}
                <div className="flex items-center gap-3.5 sm:gap-4 md:w-[44%] lg:w-[42%] shrink-0">
                  <span className="flex items-center justify-center text-emerald-400 shrink-0 group-hover:translate-x-1 transition-transform duration-300 ease-out">
                    <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.65]" />
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-[22px] font-medium tracking-[-0.01em] text-white uppercase group-hover:text-emerald-100 transition-colors duration-250">
                    {principle.title}
                  </h3>
                </div>

                {/* RIGHT: short description */}
                <div className="mt-2.5 md:mt-0 md:w-[56%] lg:w-[58%] md:pl-6 lg:pl-10">
                  <p className="text-base sm:text-[17px] md:text-[18px] font-normal leading-[1.6] text-white/65 max-w-md md:ml-auto">
                    {principle.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
