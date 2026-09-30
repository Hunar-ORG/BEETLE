"use client";

import { motion } from "framer-motion";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/data/projects";
import { ProjectCarousel } from "@/components/work/ProjectCarousel";
import { useSectionReveal, createFadeInVariants, DURATION_HEADING } from "@/lib/motion";
import { MaskedHeading } from "@/components/ui/MaskedText";
import { Atmosphere } from "@/components/ui/Atmosphere";

export function WorkSection() {
  const { ref, controls, shouldReduceMotion } = useSectionReveal("work");
  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  return (
    <section
      ref={ref}
      id="work"
      aria-label="Our Work"
      className={cn(
        "relative w-full bg-[#010403] text-white selection:bg-emerald-500/25 selection:text-emerald-100 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 scroll-mt-16 md:scroll-mt-20",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 2 Atmosphere: Soft green spill entering from bottom, black dominates ── */}
      <Atmosphere level="atmospheric" position="bottom" />

      {/* ── Section Intro: Compact Editorial ── */}
      <div className="relative mx-auto max-w-5xl px-6 sm:px-10 mb-10 sm:mb-12 md:mb-14 text-center">
        <motion.p
          initial="hidden"
          animate={controls}
          custom={0}
          variants={fadeInVariants}
          className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-emerald-400 uppercase select-none mb-2 sm:mb-2.5"
        >
          OUR WORK
        </motion.p>

        <MaskedHeading
          as="h2"
          lines={["Built to be seen."]}
          controls={controls}
          delay={0.08}
          duration={DURATION_HEADING}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-[1.15] tracking-[-0.03em] text-[#edf4f0]"
        />

        <motion.p
          initial="hidden"
          animate={controls}
          custom={0.18}
          variants={fadeInVariants}
          className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-[15px] text-white/60 font-normal max-w-md mx-auto"
        >
          A selection of websites we&apos;ve built for businesses and brands.
        </motion.p>
      </div>

      {/* ── Data-Driven Project Carousel ── */}
      <motion.div
        initial="hidden"
        animate={controls}
        custom={0.24}
        variants={fadeInVariants}
      >
        <ProjectCarousel projects={PROJECTS} />
      </motion.div>
    </section>
  );
}
