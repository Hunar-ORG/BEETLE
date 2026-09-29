"use client";

import { useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";
import { useAnimation, useInView, useReducedMotion, Variants, animate } from "framer-motion";

/**
 * Shared Motion Design Tokens & Language
 * Strictly maintains BEETLE's restrained editorial easing & durations.
 */
export const EASE_CURVE = [0.16, 1, 0.3, 1] as const;

export const DURATION_HEADING = 0.95;
export const DURATION_BODY = 0.75;
export const DURATION_FAST = 0.55;

export const BEETLE_PREPARE_EVENT = "beetle:prepare-replay";
export const BEETLE_REPLAY_EVENT = "beetle:replay-section";

let activeScrollAnimation: { stop: () => void } | null = null;

if (typeof window !== "undefined") {
  const cancelOnUserInteraction = () => {
    if (activeScrollAnimation) {
      activeScrollAnimation.stop();
      activeScrollAnimation = null;
    }
  };
  window.addEventListener("wheel", cancelOnUserInteraction, { passive: true });
  window.addEventListener("touchstart", cancelOnUserInteraction, { passive: true });
}

/**
 * Smooth programmatic scroll using Motion's exact easing curve and a capped duration.
 * Settles decisively in 0.60s - 0.85s regardless of distance.
 */
export function smoothScrollTo(
  targetY: number,
  options?: { duration?: number; onComplete?: () => void }
) {
  if (typeof window === "undefined") return;

  if (activeScrollAnimation) {
    activeScrollAnimation.stop();
    activeScrollAnimation = null;
  }

  const startY = window.scrollY;
  const distance = Math.abs(targetY - startY);

  if (distance < 5) {
    options?.onComplete?.();
    return;
  }

  const duration = options?.duration ?? Math.min(Math.max(distance * 0.00045, 0.6), 0.85);

  activeScrollAnimation = animate(startY, targetY, {
    duration,
    ease: EASE_CURVE,
    onUpdate: (latest) => {
      window.scrollTo(0, latest);
    },
    onComplete: () => {
      activeScrollAnimation = null;
      options?.onComplete?.();
    },
  });
}

/**
 * Hides the destination section immediately at click time (before the scroll starts),
 * and sets up viewport entrance detection during the scroll.
 */
export function prepareSectionForReplay(sectionId: string, isAlreadyInView: boolean = false) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(BEETLE_PREPARE_EVENT, { detail: { sectionId, isAlreadyInView } })
  );
}

export function triggerSectionReplay(sectionId: string) {
  prepareSectionForReplay(sectionId, true);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reusable Section Reveal Hook
 *
 * 1. NATURAL SCROLL: Triggers once on first viewport entry (useInView with once: true).
 *    Scrolling past and returning does NOT replay.
 * 2. HIDE AT CLICK TIME: Destination section hides immediately at the moment of click,
 *    before scroll begins. It is never seen rendered and then vanished.
 * 3. START ENTRANCE DURING SCROLL: Starts when the section enters viewport (crossing ~85%
 *    of viewport height) or after a 320ms fallback timer, so the reveal is mostly complete
 *    by the time the scroll settles.
 * 4. ALREADY IN VIEW: Replays cleanly after a tiny 120ms delay.
 * 5. RAPID CLICKS: If user clicks another destination mid-scroll, any pending section is
 *    immediately revealed, preventing stuck hidden states.
 * 6. REDUCED MOTION: Degrades immediately to visible with no hide/replay motion.
 */
export function useSectionReveal(
  sectionId: string,
  options?: { margin?: string; initialVisible?: boolean }
) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();
  const [hasRevealed, setHasRevealed] = useState(options?.initialVisible ?? false);
  const [replayKey, setReplayKey] = useState(0);

  const isPendingReplayRef = useRef(false);
  const entranceStartedRef = useRef(false);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Viewport detection for natural scroll (once only)
  const isInView = useInView(ref, {
    once: true,
    margin: (options?.margin as any) || "-60px",
  });

  const triggerEntrance = useCallback(() => {
    if (entranceStartedRef.current) return;
    entranceStartedRef.current = true;
    isPendingReplayRef.current = false;

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    controls.start("visible");
    setReplayKey((k) => k + 1);
  }, [controls]);

  // Natural scroll entrance
  useEffect(() => {
    if (isInView && !hasRevealed) {
      setHasRevealed(true);
      controls.start("visible");
    }
  }, [isInView, hasRevealed, controls]);

  // Initial visible for hero or top elements
  useIsomorphicLayoutEffect(() => {
    if (options?.initialVisible) {
      controls.start("visible");
    }
  }, []);

  // Intentional navigation replay listener
  useEffect(() => {
    const handlePrepare = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string; isAlreadyInView: boolean }>;
      const targetId = customEvent.detail?.sectionId;
      const isAlreadyInView = customEvent.detail?.isAlreadyInView ?? false;

      // Rapid-click guard: if another section was pending replay and user clicked new section,
      // reveal previous immediately so it is never stuck hidden
      if (targetId !== sectionId) {
        if (isPendingReplayRef.current) {
          triggerEntrance();
        }
        return;
      }

      if (shouldReduceMotion) {
        controls.set("visible");
        return;
      }

      // HIDE AT CLICK TIME (before scroll begins)
      controls.stop();
      controls.set("hidden");
      isPendingReplayRef.current = true;
      entranceStartedRef.current = false;

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Short distances / already-in-view section: reveal after 120ms intentional delay
      if (isAlreadyInView) {
        fallbackTimerRef.current = setTimeout(() => {
          triggerEntrance();
        }, 120);
        return;
      }

      // Start entrance during scroll when heading/top crosses roughly 75-85% of viewport height
      if (typeof window !== "undefined" && "IntersectionObserver" in window && ref.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
              triggerEntrance();
            }
          },
          { rootMargin: "0px 0px -15% 0px", threshold: 0 }
        );
        observerRef.current.observe(ref.current);
      }

      // Fallback timer: start entrance after 320ms whichever comes first
      fallbackTimerRef.current = setTimeout(() => {
        triggerEntrance();
      }, 320);
    };

    window.addEventListener(BEETLE_PREPARE_EVENT, handlePrepare);
    return () => {
      window.removeEventListener(BEETLE_PREPARE_EVENT, handlePrepare);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sectionId, controls, shouldReduceMotion, triggerEntrance]);

  return {
    ref,
    controls,
    replayKey,
    shouldReduceMotion,
    hasRevealed,
  };
}

/**
 * Shared motion variants adhering strictly to the BEETLE motion language:
 * - subtle blur-to-sharp (blur(4px) -> blur(0px))
 * - controlled vertical movement (12-24px)
 * - zero bounce, zero spring overshoot
 */
export const createFadeInVariants = (shouldReduceMotion: boolean | null): Variants => ({
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 20,
    filter: shouldReduceMotion ? "none" : "blur(4px)",
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: shouldReduceMotion ? 0.01 : DURATION_BODY,
      delay: shouldReduceMotion ? 0 : customDelay,
      ease: EASE_CURVE,
    },
  }),
});
