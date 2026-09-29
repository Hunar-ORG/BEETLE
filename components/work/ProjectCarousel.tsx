"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectCarouselProps {
  projects: Project[];
}

/**
 * BEETLE FIXED-VIEWPORT CENTERED-TRACK CAROUSEL
 *
 * Architecture:
 *   CarouselStage          — Outer section container (w-full)
 *     CarouselViewport     — Fixed frame (overflow: hidden, clips track, masks edges)
 *       CarouselTrack      — The ONLY element translating horizontally via Motion
 *         ProjectCard[0]   (Initial center position)
 *         ProjectCard[1]
 *         ProjectCard[2]
 *     CarouselControls     — Fixed navigation arrows centered beneath the viewport
 *
 * Center Calculation (Mathematical Exactness):
 *   active card center === viewport center
 *   cardCenter_i       = i * (cardWidth + gap) + cardWidth / 2
 *   trackX             = viewportWidth / 2 - cardCenter_i
 *                      = (viewportWidth - cardWidth) / 2 - i * (cardWidth + gap)
 */
export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  // Starts at the first project (index 0) per specification
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = projects.length;
  const shouldReduceMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Dynamic drag offset for responsive touch/swipe feedback
  const [dragOffset, setDragOffset] = useState(0);

  // Measured width of the viewport element
  const [viewportWidth, setViewportWidth] = useState(1200);

  // Responsive card width calculation:
  // Ensures active card is dominant while allowing partial neighboring cards to be visible
  const getCardWidth = (vw: number) => {
    if (vw >= 1440) return 780;
    if (vw >= 1280) return Math.min(vw * 0.58, 740);
    if (vw >= 1024) return Math.min(vw * 0.65, 680);
    if (vw >= 768)  return Math.min(vw * 0.74, 560);
    if (vw >= 480)  return Math.min(vw * 0.80, 420);
    // Mobile (375px - 479px): allows ~18px to ~30px neighbor peek on each side
    return Math.min(Math.max(vw * 0.82, 280), 320);
  };

  const getGap = (vw: number) => (vw < 640 ? 16 : 28);

  const cardWidth = getCardWidth(viewportWidth);
  const gap = getGap(viewportWidth);

  // Exact mathematical translation to keep active card centered in the viewport
  const trackX = (viewportWidth - cardWidth) / 2 - currentIndex * (cardWidth + gap);

  // Real-time ResizeObserver: recalculates dimensions on window resize or orientation change
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      if (el.clientWidth > 0) {
        setViewportWidth(el.clientWidth);
      }
    };

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Bounds & Navigation handlers
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < total - 1;

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  // Keyboard accessibility: Left/Right arrows when carousel is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      const el = viewportRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;

      if (e.key === "ArrowLeft") {
        if (canPrev) {
          e.preventDefault();
          prev();
        }
      } else if (e.key === "ArrowRight") {
        if (canNext) {
          e.preventDefault();
          next();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canPrev, canNext, prev, next]);

  // Restrained 600ms editorial easing: [0.16, 1, 0.3, 1] — no spring, bounce, or overshoot
  const slideTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center select-none">
      {/*
       * ── CAROUSEL VIEWPORT (Fixed Frame) ─────────────────────────────────
       * Stationary viewport that never resizes, jumps, or shifts vertically.
       * overflow:hidden clips the track, preventing horizontal page scroll.
       * Soft gradient masks fade partially-visible edges.
       * ────────────────────────────────────────────────────────────────────
       */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      >
        {/*
         * ── CAROUSEL TRACK (The ONLY Element That Translates) ───────────────
         * Translates horizontally via Motion's `x`.
         * Supports swipe/pan without overriding trackX with rigid dragConstraints.
         * Touch action `pan-y` ensures native vertical scrolling remains natural.
         * ──────────────────────────────────────────────────────────────────
         */}
        <motion.div
          onPanStart={() => {
            isDraggingRef.current = true;
          }}
          onPan={(_, info) => {
            const offset = info.offset.x;
            // Elastic boundary resistance when dragging past start/end
            const resisted =
              (!canPrev && offset > 0) || (!canNext && offset < 0)
                ? offset * 0.25
                : offset;
            setDragOffset(resisted);
          }}
          onPanEnd={(_, info) => {
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
            const offset = info.offset.x;
            const velocity = info.velocity.x;
            setDragOffset(0);

            if ((offset < -50 || velocity < -250) && canNext) {
              next();
            } else if ((offset > 50 || velocity > 250) && canPrev) {
              prev();
            }
          }}
          animate={{ x: trackX + dragOffset }}
          transition={
            dragOffset !== 0
              ? { duration: 0 }
              : slideTransition
          }
          className="flex items-start py-3 cursor-grab active:cursor-grabbing"
          style={{
            gap: `${gap}px`,
            width: "max-content",
            touchAction: "pan-y",
          }}
        >
          {projects.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.div
                key={project.slug}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: isActive ? 1 : 0.65,
                        scale: isActive ? 1 : 0.985,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(e) => {
                  if (!isActive && !isDraggingRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }
                }}
                className={cn(
                  "transition-all duration-300",
                  isActive ? "cursor-default" : "cursor-pointer"
                )}
                style={{ width: `${cardWidth}px`, flexShrink: 0 }}
              >
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  isDraggingRef={isDraggingRef}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/*
       * ── CAROUSEL CONTROLS (Fixed Center-Bottom Outside Track) ───────────
       * Stationary buttons centered beneath the carousel frame.
       * They NEVER move horizontally with the track.
       * Accessible button tags with disabled states and aria attributes.
       * ────────────────────────────────────────────────────────────────────
       */}
      <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3.5 z-10">
        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          aria-label="Previous project"
          aria-disabled={!canPrev}
          className={cn(
            "group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-[#020705]/80 text-white/70 backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
            canPrev
              ? "hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-300 hover:scale-105 active:scale-95 cursor-pointer"
              : "opacity-25 cursor-not-allowed border-white/5 text-white/20"
          )}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          aria-label="Next project"
          aria-disabled={!canNext}
          className={cn(
            "group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-[#020705]/80 text-white/70 backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
            canNext
              ? "hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-300 hover:scale-105 active:scale-95 cursor-pointer"
              : "opacity-25 cursor-not-allowed border-white/5 text-white/20"
          )}
        >
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
