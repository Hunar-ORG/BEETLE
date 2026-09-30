"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;
  const activeProject = projects[currentIndex];

  const paginate = useCallback(
    (newIndex: number) => {
      setDirection(newIndex > currentIndex ? 1 : -1);
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i > 0 ? i - 1 : total - 1));
  }, [total]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i < total - 1 ? i + 1 : 0));
  }, [total]);

  // Keyboard navigation when section is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Copy browser URL feedback
  const handleCopyUrl = () => {
    const url = activeProject.browserUrl || `${activeProject.slug}.beetle`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Instagram-style restrained cross-slide transition tokens
  const contentVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? "30%" : "-30%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? "-20%" : "20%",
      opacity: 0,
    }),
  };

  const footerVariants = {
    enter: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? 8 : -8,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? -8 : 8,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none px-4 sm:px-6"
    >
      {/* ── 1. LARGE BROWSER FRAME ── */}
      <div className="relative w-full max-w-4xl lg:max-w-[940px] xl:max-w-[980px] rounded-2xl sm:rounded-[22px] border border-emerald-500/25 bg-[#020504] shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(16,185,129,0.03)] overflow-hidden">
        {/* Top Edge Specular Reflection */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 via-white/20 to-transparent z-30"
          aria-hidden="true"
        />

        {/* ── BROWSER TOP CHROME BAR ── */}
        <div className="relative z-20 flex h-11 sm:h-12 w-full items-center justify-between border-b border-white/[0.07] bg-[#030906]/95 px-4 sm:px-5 backdrop-blur-md">
          {/* Three Window Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2" aria-hidden="true">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/20" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/10" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/10" />
          </div>

          {/* Centered Domain Address Pill */}
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/60 px-3.5 sm:px-4 py-1 text-[11px] sm:text-xs text-white/70 font-mono tracking-wider shadow-inner">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="truncate max-w-[170px] sm:max-w-none">
              {activeProject.browserUrl || `${activeProject.slug}.beetle`}
            </span>
          </div>

          {/* Right Action / Copy Button */}
          <button
            type="button"
            onClick={handleCopyUrl}
            title={copied ? "Copied!" : "Copy URL"}
            className="flex items-center justify-end text-white/40 hover:text-white/80 transition-colors p-1"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </button>
        </div>

        {/* ── PROJECT CONTENT / CANVAS AREA ── */}
        <div
          className="relative w-full aspect-[1904/914] overflow-hidden bg-[#010403] select-none"
          style={{ aspectRatio: "1904 / 914" }}
        >
          {/* Swipeable / Draggable Project Display Layer */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              const threshold = 40;
              const velocityThreshold = 200;
              if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                next();
              } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                prev();
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeProject.slug}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 w-full h-full"
              >
                {activeProject.image ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={activeProject.image}
                      alt={`${activeProject.name} website preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 980px"
                      className="object-cover object-top select-none pointer-events-none"
                    />
                  </div>
                ) : (
                  /* ── Reference Centered Crosshair + Identifier Treatment ── */
                  <div className="relative flex items-center justify-center pointer-events-none">
                    {/* Top vertical accent line */}
                    <div className="absolute -top-16 sm:-top-20 md:-top-24 w-px h-16 sm:h-20 md:h-24 bg-gradient-to-b from-transparent via-emerald-400/40 to-emerald-400/75" />

                    {/* Left horizontal accent line */}
                    <div className="w-16 sm:w-28 md:w-40 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-emerald-400/75 mr-4 sm:mr-6" />

                    {/* Centered Identifier Text */}
                    <span className="font-mono text-xs sm:text-sm md:text-[15px] font-medium tracking-[0.26em] text-emerald-400 select-none whitespace-nowrap">
                      {activeProject.identifier || activeProject.name.toUpperCase()}
                    </span>

                    {/* Right horizontal accent line */}
                    <div className="w-16 sm:w-28 md:w-40 h-px bg-gradient-to-l from-transparent via-emerald-400/40 to-emerald-400/75 ml-4 sm:mr-6" />

                    {/* Bottom vertical accent line */}
                    <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 w-px h-16 sm:h-20 md:h-24 bg-gradient-to-t from-transparent via-emerald-400/40 to-emerald-400/75" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Circular Navigation Controls (Centered vertically on sides) ── */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous project"
            className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 backdrop-blur-md text-white/70 hover:border-emerald-400/40 hover:bg-black/80 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next project"
            className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 backdrop-blur-md text-white/70 hover:border-emerald-400/40 hover:bg-black/80 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronRight className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </button>
        </div>

        {/* ── 4. PROJECT FOOTER (INSIDE THE BROWSER FRAME) ── */}
        <div className="relative z-20 flex w-full items-center justify-between border-t border-white/[0.08] bg-[#020705]/95 px-4 sm:px-7 md:px-8 py-3.5 sm:py-5 backdrop-blur-md">
          {/* Left: Project Identity (Title + Category) */}
          <div className="min-w-0 pr-3 sm:pr-4 flex-1">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeProject.slug}
                custom={direction}
                variants={footerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-white tracking-[-0.015em] truncate">
                  {activeProject.name}
                </h3>
                <p className="text-[9.5px] sm:text-[11px] font-mono tracking-[0.14em] sm:tracking-[0.2em] uppercase text-emerald-400 font-medium mt-0.5 leading-snug">
                  {activeProject.category}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Rounded Pill "View Project ↗" Button */}
          {(() => {
            const projectDestination =
              activeProject.projectUrl || activeProject.url || `/work/${activeProject.slug}`;
            const isExternal = projectDestination.startsWith("http");

            return (
              <Link
                href={projectDestination}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 hover:bg-[#03150d] hover:border-emerald-500/40 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all duration-200 active:scale-95 shadow-sm shrink-0"
              >
                <span>View Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            );
          })()}
        </div>
      </div>

      {/* ── 8. DOT INDICATOR (BELOW BROWSER FRAME) ── */}
      <div
        className="mt-7 sm:mt-8 flex items-center justify-center gap-2.5 sm:gap-3 z-10"
        aria-label="Project selection"
      >
        {projects.map((p, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => paginate(idx)}
              aria-label={`Go to ${p.name}`}
              className={cn(
                "transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer",
                isActive
                  ? "w-2.5 h-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] scale-110"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
