"use client";

import { motion } from "framer-motion";
import { useSectionReveal, createFadeInVariants, EASE_CURVE, DURATION_HEADING } from "@/lib/motion";
import { MaskedHeading } from "@/components/ui/MaskedText";

export function Hero() {
  const { ref, controls, shouldReduceMotion } = useSectionReveal("hero", {
    initialVisible: true,
  });

  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Hero"
      className="relative isolate flex min-h-screen w-full flex-col justify-between items-center -mt-[80px] md:-mt-[96px] pt-[80px] md:pt-[96px] px-4 sm:px-6 md:px-8 text-center select-none"
    >
      {/* ── Continuous Atmospheric Field: Unified light source extending naturally through boundary into AboutPrinciples ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 select-none -z-10"
        style={{
          bottom: "-380px",
          background: `
            radial-gradient(ellipse 110% 360px at 50% calc(100% - 360px), rgba(19, 216, 192, 0.55) 0%, rgba(0, 200, 120, 0.30) 22%, rgba(0, 143, 90, 0.10) 45%, rgba(2, 20, 14, 0.03) 65%, transparent 80%),
            radial-gradient(ellipse 55% 280px at 28% calc(100% - 410px), rgba(0, 200, 120, 0.28) 0%, rgba(0, 143, 90, 0.08) 45%, transparent 68%),
            radial-gradient(ellipse 50% 260px at 74% calc(100% - 425px), rgba(19, 216, 192, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 80% 380px at 50% calc(100% - 560px), rgba(0, 143, 90, 0.25) 0%, rgba(6, 36, 28, 0.40) 50%, transparent 80%),
            radial-gradient(ellipse 40% 30% at 12% 50%, rgba(0, 143, 90, 0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 88% 48%, rgba(0, 143, 90, 0.06) 0%, transparent 65%),
            linear-gradient(180deg, #010403 0%, #020706 calc(45% - 150px), #020e08 calc(75% - 100px), #03100a calc(100% - 380px), #010805 calc(100% - 280px), #010403 calc(100% - 180px), #010403 100%)
          `,
        }}
      />
      {/* Top spacer to position headline in the primary optical center */}
      <div className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28" aria-hidden="true" />

      {/* Primary focal content: Masked Headline + Supporting Paragraph */}
      <div className="flex flex-col items-center max-w-5xl mx-auto px-2">
        <MaskedHeading
          as="h1"
          lines={["Your business.", "Built to be seen."]}
          controls={controls}
          duration={DURATION_HEADING}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium tracking-[-0.025em] text-white leading-[1.12]"
        />

        <motion.p
          initial="hidden"
          animate={controls}
          custom={0.22}
          variants={fadeInVariants}
          className="mt-6 sm:mt-7 md:mt-8 text-base sm:text-lg md:text-[19px] text-white/70 max-w-2xl sm:max-w-3xl font-normal leading-relaxed"
        >
          We build modern, high-performing websites that help businesses
          establish a stronger presence online, connect with their customers,
          and move forward with confidence.
        </motion.p>
      </div>

      {/* Lower supporting statement positioned toward the bottom of the viewport */}
      <motion.div
        initial="hidden"
        animate={controls}
        custom={0.4}
        variants={fadeInVariants}
        className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-4"
      >
        <p className="text-xs sm:text-sm text-white/50 tracking-wide font-normal max-w-xl mx-auto">
          The digital partner for businesses ready to build a stronger online
          presence.
        </p>
      </motion.div>
    </section>
  );
}
