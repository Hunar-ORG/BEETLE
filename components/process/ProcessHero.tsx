"use client";

import { motion, useReducedMotion, AnimationControls } from "framer-motion";
import { Download, Monitor, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
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
      <div id="process" className="relative mx-auto max-w-4xl px-6 sm:px-10 text-center mb-16 sm:mb-20 md:mb-24 scroll-mt-28 md:scroll-mt-32">
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

      {/* ── 2. Large Central Visual Moment: Creative Studio Session Panel ── */}
      <motion.div
        initial="hidden"
        animate={controls || "visible"}
        custom={0.34}
        variants={fadeInVariants}
        className="relative mx-auto max-w-5xl lg:max-w-6xl px-4 sm:px-6 md:px-8 mb-24 sm:mb-32 md:mb-40"
      >
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.09] bg-[#020805] shadow-[0_24px_80px_rgba(0,0,0,0.75)]">
          {/* Top Edge Specular Reflection */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 via-white/20 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Atmospheric Ambient Lighting inside panel */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[300px] sm:h-[420px] rounded-full blur-[130px] opacity-25 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at center, rgba(112, 204, 77, 0.4) 0%, rgba(112, 204, 77, 0.12) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Studio Panel Chrome Header */}
          <div className="relative z-10 flex h-8 sm:h-9 w-full items-center justify-between border-b border-white/[0.07] bg-[#030a06]/95 px-4 sm:px-6 backdrop-blur-md select-none">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/40 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>BEETLE STUDIO // WORKBENCH SESSION</span>
            </div>

            <div className="flex items-center gap-3 text-white/30 text-[9px] font-mono">
              <span className="hidden sm:inline">LIVE REVIEW</span>
            </div>
          </div>

          {/* Studio Workspace Composition (Cinematic visual representation) */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[480px] w-full p-6 sm:p-10 md:p-14 flex flex-col justify-between select-none">
            {/* Background Subtle Architectural Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden="true"
            />

            {/* Top Workspace Meta Indicators */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-emerald-400 uppercase">
                  ACTIVE ENVIRONMENT
                </span>
                <span className="text-xs sm:text-sm text-white/70 font-medium mt-0.5">
                  Design Architecture & Systems Review
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-white/50">
                <Monitor className="h-3 w-3 text-emerald-400" />
                <span>4K DISPLAY 01</span>
              </div>
            </div>

            {/* Center: The Illuminated Workspace Display Viewport */}
            <div className="relative z-10 my-6 sm:my-8 mx-auto w-full max-w-3xl rounded-xl border border-white/[0.08] bg-[#010503]/90 p-4 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4 text-[9px] sm:text-[10px] font-mono text-white/40">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-white/80">CORE CANVAS</span>
                </div>
                <span>GRID: 12-COL // 1440PX</span>
              </div>

              {/* Wireframe & Layout Blueprint Elements */}
              <div className="space-y-3">
                <div className="h-7 w-3/4 rounded bg-white/[0.06] border border-white/[0.04] flex items-center px-3">
                  <span className="font-mono text-[9px] text-emerald-400/90 tracking-wider">
                    H1 // 56PX / 1.14 / WARM OFF-WHITE
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="h-16 rounded border border-white/[0.06] bg-emerald-950/20 p-2 flex flex-col justify-between">
                    <span className="font-mono text-[8px] text-white/40">HERO FRAME</span>
                    <span className="font-mono text-[8px] text-emerald-400">LIQUID BG</span>
                  </div>
                  <div className="h-16 rounded border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col justify-between">
                    <span className="font-mono text-[8px] text-white/40">SHOWCASE</span>
                    <span className="font-mono text-[8px] text-white/50">CAROUSEL STAGE</span>
                  </div>
                  <div className="h-16 rounded border border-white/[0.06] bg-white/[0.02] p-2 flex flex-col justify-between">
                    <span className="font-mono text-[8px] text-white/40">TYPOGRAPHY</span>
                    <span className="font-mono text-[8px] text-white/50">PLUS JAKARTA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Workbench Status Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06] font-mono text-[9px] sm:text-[10px] text-white/45">
              <div className="flex items-center gap-3">
                <span>STAGE: MULTI-DEVICE HARMONIZATION</span>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400/90">PIXEL ACCURACY: 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                <span>BEETLE CREATIVE PROTOCOL</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
