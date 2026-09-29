"use client";

import React from "react";
import { motion, useReducedMotion, Variants, AnimationControls } from "framer-motion";
import { EASE_CURVE, DURATION_HEADING } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MaskedHeadingProps {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  duration?: number;
  controls?: AnimationControls;
}

/**
 * MASKED LINE REVEAL (Accessibility Compliant)
 *
 * Each line sits inside an `overflow-hidden` container and glides upward into view.
 * - Animates by lines, NEVER by characters.
 * - Includes bottom margin/padding allowance so descenders (y, g, p, j, q) are never clipped.
 * - Screen readers read standard semantic text without disruption.
 * - Degrades to instant/clean appearance when prefers-reduced-motion is active.
 */
export function MaskedHeading({
  lines,
  as: Component = "h2",
  className,
  lineClassName,
  delay = 0,
  duration = DURATION_HEADING,
  controls,
}: MaskedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? 0 : "118%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        ease: EASE_CURVE,
      },
    },
  };

  return (
    <Component className={cn("block select-none", className)}>
      <motion.span
        className="block"
        variants={containerVariants}
        initial="hidden"
        animate={controls || "visible"}
      >
        {lines.map((line, idx) => (
          <span
            key={idx}
            className="block overflow-hidden pt-0.5 pb-2 -mb-2"
            style={{ display: "block" }}
          >
            <motion.span
              variants={lineVariants}
              className={cn("block will-change-transform", lineClassName)}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
