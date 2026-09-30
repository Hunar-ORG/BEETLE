"use client";

import Image from "next/image";
import { motion, useReducedMotion, AnimationControls } from "framer-motion";
import { Download } from "lucide-react";
import { createFadeInVariants, DURATION_HEADING } from "@/lib/motion";
import { MaskedHeading } from "@/components/ui/MaskedText";

interface ProcessHeroProps {
  controls?: AnimationControls;
}

export function ProcessHero({ controls }: ProcessHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  return (
    <div className="relative w-full">
      {/* ── 1. The BEETLE Method Opening Block ── */}
      <div id="process" className="relative mx-auto max-w-4xl px-6 sm:px-10 text-center mb-12 sm:mb-16 md:mb-20 scroll-mt-28 md:scroll-mt-32">
        {/* Eyebrow */}
        <motion.p
          initial="hidden"
          animate={controls || "visible"}
          custom={0}
          variants={fadeInVariants}
          className="text-xs sm:text-[13px] font-semibold tracking-[0.28em] text-emerald-400 uppercase select-none mb-4 sm:mb-5"
        >
          OUR PROCESS
        </motion.p>

        {/* Main Heading */}
        <MaskedHeading
          as="h2"
          lines={["The BEETLE Method"]}
          controls={controls}
          delay={0.08}
          duration={DURATION_HEADING}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-medium leading-[1.12] tracking-[-0.03em] text-[#edf4f0]"
        />

        {/* Supporting Text */}
        <motion.p
          initial="hidden"
          animate={controls || "visible"}
          custom={0.18}
          variants={fadeInVariants}
          className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-white/65 font-normal leading-relaxed max-w-2xl mx-auto"
        >
          A clear, thoughtful process for turning your business into a stronger
          digital presence.
        </motion.p>

        {/* Download PDF Button (Visually complete placeholder) */}
        <motion.div
          initial="hidden"
          animate={controls || "visible"}
          custom={0.26}
          variants={fadeInVariants}
          className="mt-7 sm:mt-8 flex justify-center"
        >
          <a
            href="#download-method"
            onClick={(e) => {
              e.preventDefault();
              // Future PDF integration hook
            }}
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-emerald-500/35 bg-emerald-500/[0.08] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-medium tracking-[0.16em] text-emerald-300 backdrop-blur-md transition-all duration-300 hover:border-emerald-400/60 hover:bg-emerald-500/18 hover:text-white hover:shadow-[0_0_24px_rgba(112,204,77,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 select-none"
          >
            <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span>DOWNLOAD PDF</span>
          </a>
        </motion.div>
      </div>

      {/* ── 2. Process Visual Diagram ── */}
      <motion.div
        initial="hidden"
        animate={controls || "visible"}
        custom={0.34}
        variants={fadeInVariants}
        className="relative mx-auto max-w-5xl lg:max-w-6xl px-4 sm:px-6 md:px-8 flex justify-center"
      >
        <div className="relative w-full max-w-4xl lg:max-w-5xl aspect-[1536/1024] flex justify-center">
          <Image
            src="/images/projects/our process.png"
            alt="The BEETLE Method process diagram showing Discover, Design, Build, and Launch stages"
            width={1536}
            height={1024}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
            className="h-auto w-full object-contain select-none pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  );
}
