"use client";

import Image from "next/image";
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
        {/* ── The Rounded Card Container ── */}
        <motion.div
          initial="hidden"
          animate={controls}
          custom={0}
          variants={fadeInVariants}
          className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/[0.09] bg-[#020906]/85 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] hover:border-emerald-500/25 transition-colors duration-500 p-6 sm:p-10 md:p-12 pb-8 sm:pb-10 md:pb-12"
        >
          {/* Top Edge Specular Reflection */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 via-white/20 to-transparent"
            aria-hidden="true"
          />

          {/* Subtle inner dark gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-[#010503]/50"
            aria-hidden="true"
          />

          {/* ── Card Content: Upper Left Aligned Text ── */}
          <div className="relative z-10 flex flex-col items-start text-left">
            {/* Eyebrow Label */}
            <motion.p
              initial="hidden"
              animate={controls}
              custom={0.1}
              variants={fadeInVariants}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-emerald-400 uppercase select-none mb-3 sm:mb-4 text-left"
            >
              OUR MISSION
            </motion.p>

            {/* Main Mission Statement (Left-aligned, crisp white, dominant) */}
            <MaskedHeading
              as="h2"
              lines={["Make every business", "impossible to overlook."]}
              controls={controls}
              delay={0.2}
              duration={1.05}
              className="text-2xl sm:text-[32px] md:text-[38px] lg:text-[42px] font-medium leading-[1.2] sm:leading-[1.18] tracking-[-0.025em] text-[#edf4f0] text-left drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* ── Lower Portion: Centered 3D Mission Image with Ambient Green Glow ── */}
          <motion.div
            initial="hidden"
            animate={controls}
            custom={0.3}
            variants={fadeInVariants}
            className="relative z-10 mt-8 sm:mt-10 md:mt-12 flex items-center justify-center w-full"
          >
            {/* Subtle green ambient glow behind the mission image */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[540px] h-[120%] rounded-full blur-[60px] sm:blur-[80px] opacity-40 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(112, 204, 77, 0.40) 0%, rgba(112, 204, 77, 0.15) 45%, rgba(112, 204, 77, 0.02) 70%, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* 3D Target & Binoculars Mission Graphic */}
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] aspect-[1536/1024]">
              <Image
                src="/images/projects/mission.png"
                alt="Make every business impossible to overlook"
                fill
                sizes="(max-width: 640px) 340px, (max-width: 768px) 460px, 540px"
                className="object-contain pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                priority={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
