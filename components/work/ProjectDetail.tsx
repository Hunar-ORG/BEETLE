"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Project } from "@/data/projects";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Atmosphere } from "@/components/ui/Atmosphere";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: (customDelay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        delay: shouldReduceMotion ? 0 : customDelay,
        ease: easeCurve,
      },
    }),
  };

  return (
    <article
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#010403] text-white selection:bg-emerald-500/25 selection:text-emerald-100 pb-24 sm:pb-32 -mt-[80px] md:-mt-[96px] pt-[104px] md:pt-[124px]",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 2 Atmosphere: Soft top illumination behind navbar, quiet around visuals ── */}
      <Atmosphere level="atmospheric" position="top" />

      <div className="relative mx-auto max-w-5xl lg:max-w-6xl px-6 sm:px-10 lg:px-16 pt-3 sm:pt-5">
        {/* Back Link */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInVariants}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium tracking-wide text-white/60 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Our Work</span>
          </Link>
        </motion.div>

        {/* ── Category & Title ── */}
        <header className="mb-8 sm:mb-12">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeInVariants}
            className="text-xs sm:text-[13px] font-semibold tracking-[0.24em] text-emerald-400 uppercase select-none mb-3"
          >
            {project.category}
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeInVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.14] tracking-[-0.03em] text-[#edf4f0]"
          >
            {project.name}
          </motion.h1>
        </header>

        {/* ── Large Project Screenshot in Premium Frame ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.24}
          variants={fadeInVariants}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.09] bg-[#020705] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
        >
          {/* Top Edge Specular Reflection */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 via-white/20 to-transparent z-20"
            aria-hidden="true"
          />

          {/* Minimal Browser Header */}
          <div className="relative z-10 flex h-8 sm:h-9 w-full items-center justify-between border-b border-white/[0.07] bg-[#030906]/95 px-4 backdrop-blur-md">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>

            <div className="flex h-5 items-center gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] px-3 font-mono text-[10px] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              <span>{project.slug}.beetle</span>
            </div>

            <div className="w-10" aria-hidden="true" />
          </div>

          {/* Image / Placeholder */}
          <div className="relative h-[calc(100%-32px)] sm:h-[calc(100%-36px)] w-full overflow-hidden bg-[#010403]">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} website full preview`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1120px"
                className="object-cover object-top"
              />
            ) : (
              /* Intentional empty frame — waiting for real project screenshot */
              <div className="absolute inset-0 flex items-center justify-center select-none">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background:
                      "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,220,130,0.18) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col items-center gap-3 opacity-30">
                  <div className="w-px h-8 bg-emerald-400/60" aria-hidden="true" />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-emerald-400/80">
                    {project.slug}
                  </span>
                  <div className="w-px h-8 bg-emerald-400/60" aria-hidden="true" />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Short Project Description ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.32}
          variants={fadeInVariants}
          className="mt-8 sm:mt-12 max-w-2xl"
        >
          <p className="text-base sm:text-lg md:text-xl font-normal leading-[1.65] text-white/70">
            {project.description}
          </p>
        </motion.div>
      </div>
    </article>
  );
}
