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
          bottom: "-480px",
          maskImage:
            "linear-gradient(180deg, black 0%, black calc(100% - 450px), rgba(0, 0, 0, 0.85) calc(100% - 370px), rgba(0, 0, 0, 0.45) calc(100% - 290px), rgba(0, 0, 0, 0.12) calc(100% - 220px), transparent calc(100% - 150px))",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black calc(100% - 450px), rgba(0, 0, 0, 0.85) calc(100% - 370px), rgba(0, 0, 0, 0.45) calc(100% - 290px), rgba(0, 0, 0, 0.12) calc(100% - 220px), transparent calc(100% - 150px))",
          background: `
            radial-gradient(ellipse 85% 440px at 50% calc(100% - 450px), rgba(112, 204, 77, 0.35) 0%, rgba(112, 204, 77, 0.24) 20%, rgba(112, 204, 77, 0.12) 40%, rgba(112, 204, 77, 0.04) 65%, rgba(112, 204, 77, 0.008) 85%, transparent 100%),
            radial-gradient(ellipse 115% 660px at 50% calc(100% - 450px), rgba(112, 204, 77, 0.16) 0%, rgba(112, 204, 77, 0.09) 25%, rgba(112, 204, 77, 0.035) 50%, rgba(112, 204, 77, 0.01) 75%, transparent 100%),
            linear-gradient(180deg, #010403 0%, #010403 calc(100% - 680px), #020704 calc(100% - 450px), #010503 calc(100% - 260px), #010403 100%)
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
