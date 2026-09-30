"use client";

import { motion } from "framer-motion";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useSectionReveal, createFadeInVariants } from "@/lib/motion";
import { MaskedHeading } from "@/components/ui/MaskedText";
import { Atmosphere } from "@/components/ui/Atmosphere";

export function MissionSection() {
  const { ref, controls, shouldReduceMotion } = useSectionReveal("mission");
  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  return (
    <section
      ref={ref}
      id="mission"
      aria-label="Our Mission"
      className={cn(
        "relative w-full overflow-hidden bg-[#010403] text-white selection:bg-emerald-500/25 selection:text-emerald-100 py-12 sm:py-16 md:py-20",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 3 Atmosphere: Radiant Brand Moment centered behind the statement ── */}
      <Atmosphere level="brand-moment" position="center" />

      <div className="relative mx-auto max-w-[800px] px-4 sm:px-6">
        {/* ── The Transparent Glass Card (Approx 768px x 388px proportion) ── */}
        <motion.div
          initial="hidden"
          animate={controls}
          custom={0}
          variants={fadeInVariants}
          className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/[0.09] bg-[#020906]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] hover:border-emerald-500/25 transition-colors duration-500"
        >
          {/* Top Edge Specular Reflection */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 via-white/20 to-transparent"
            aria-hidden="true"
          />

          {/* ── Internal Atmospheric Depth (Controlled diffuse lighting) ── */}
          <div
            className="pointer-events-none absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-[300px] sm:w-[420px] md:w-[480px] h-[300px] sm:h-[420px] md:h-[480px] rounded-full blur-[70px] sm:blur-[95px] md:blur-[115px] opacity-45 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 60% 45%, rgba(112, 204, 77, 0.35) 0%, rgba(112, 204, 77, 0.16) 35%, rgba(112, 204, 77, 0.04) 65%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {/* Secondary softer fill on the right side */}
          <div
            className="pointer-events-none absolute -bottom-16 right-0 w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full blur-[80px] sm:blur-[100px] opacity-20 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at center, rgba(112, 204, 77, 0.18) 0%, rgba(112, 204, 77, 0.04) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Subtle dark gradient overlay from left to preserve extreme text contrast */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent"
            aria-hidden="true"
          />

          {/* ── Card Content (Refined compact height & padding) ── */}
          <div className="relative z-10 flex min-h-[300px] sm:min-h-[350px] md:min-h-[380px] flex-col items-center justify-center px-6 sm:px-10 md:px-14 py-14 sm:py-16 md:py-20 text-center">
            {/* Eyebrow */}
            <motion.p
              initial="hidden"
              animate={controls}
              custom={0.12}
              variants={fadeInVariants}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-emerald-400/90 uppercase select-none mb-5 sm:mb-6 md:mb-7"
            >
              OUR MISSION
            </motion.p>

            {/* Main Mission Statement (Calm, deliberate masked line reveal) */}
            <MaskedHeading
              as="h2"
              lines={["Make every business", "impossible to overlook."]}
              controls={controls}
              delay={0.24}
              duration={1.05}
              className="text-2xl sm:text-[32px] md:text-[38px] lg:text-[42px] font-medium leading-[1.22] sm:leading-[1.18] tracking-[-0.025em] text-[#edf4f0] max-w-xs sm:max-w-md md:max-w-xl mx-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
