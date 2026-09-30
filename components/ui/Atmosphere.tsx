"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type AtmosphereLevel =
  | "hero"          // Level 4 (★★★★★): Full hero emission
  | "brand-moment" // Level 3 (★★★): Mission, Contact (radiant brand moments)
  | "atmospheric"  // Level 2 (★★): Presence, Work, Process (subtle ambient presence)
  | "subtle"       // Level 1-2 (★-★★): Team, ProjectDetail (restrained, quiet)
  | "fade";        // Level 1 (★): Footer (fading light settling to black)

export type AtmospherePosition =
  | "bottom"      // Light rising from lower boundary
  | "top"         // Light bleeding from preceding section
  | "center"      // Diffuse atmospheric glow centered behind primary focal card
  | "split"       // Both top bleed and bottom subtle spill
  | "bleed";      // Spill bleeding over section boundary

interface AtmosphereProps {
  level: AtmosphereLevel;
  position?: AtmospherePosition;
  className?: string;
  bleedClass?: string;
}

/**
 * BEETLE Atmosphere Primitive
 * 
 * Implements the core BEETLE visual system:
 * BLACK = Structure & Canvas (#010403)
 * BEETLE GREEN = Light spilling through the black environment (#70CC4D)
 * 
 * Reusable, performant CSS-based atmosphere:
 * - Uses exact BEETLE logo green palette stops (rgba(112, 204, 77, ...))
 * - Generates soft, diffuse atmospheric fields with zero hard lines
 * - Natural inter-section bleed bridging boundaries seamlessly
 * - Zero external animation libraries or heavy WebGL runtime
 */
export function Atmosphere({
  level,
  position = "bottom",
  className,
  bleedClass,
}: AtmosphereProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden -z-10 select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* ── Level 4: HERO (★★★★★ - Strongest emission rising from bottom) ── */}
      {level === "hero" && (
        <>
          {/* Broad rising emission body */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[140vw] max-w-[1900px] h-[55vh] min-h-[380px] rounded-t-[100%] blur-[130px] sm:blur-[160px] opacity-40 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(112, 204, 77, 0.44) 0%, rgba(112, 204, 77, 0.20) 35%, rgba(112, 204, 77, 0.05) 65%, transparent 85%)",
            }}
          />
          {/* Intense lower center core glow */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-[-40px] -translate-x-1/2 w-[90vw] max-w-[1200px] h-[36vh] min-h-[260px] rounded-t-[100%] blur-[100px] sm:blur-[130px] opacity-55 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 80% 65% at 50% 100%, rgba(112, 204, 77, 0.48) 0%, rgba(112, 204, 77, 0.18) 40%, transparent 75%)",
            }}
          />
          {/* Subtle lateral atmospheric support */}
          <div
            className="pointer-events-none absolute left-[15%] bottom-[10%] w-[450px] h-[300px] rounded-full blur-[140px] opacity-25 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at center, rgba(112, 204, 77, 0.25) 0%, rgba(112, 204, 77, 0.06) 50%, transparent 75%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-[15%] bottom-[10%] w-[450px] h-[300px] rounded-full blur-[140px] opacity-25 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at center, rgba(112, 204, 77, 0.25) 0%, rgba(112, 204, 77, 0.06) 50%, transparent 75%)",
            }}
          />
        </>
      )}

      {/* ── Level 3: BRAND MOMENT (★★★ - Mission, Contact) ── */}
      {level === "brand-moment" && position === "center" && (
        <>
          {/* Central diffuse aura behind brand card */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] md:w-[1150px] h-[450px] sm:h-[550px] md:h-[650px] rounded-full blur-[150px] sm:blur-[180px] opacity-32 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(112, 204, 77, 0.35) 0%, rgba(112, 204, 77, 0.14) 40%, rgba(112, 204, 77, 0.03) 70%, transparent 85%)",
            }}
          />
          {/* Subtle center core */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[280px] sm:h-[360px] rounded-full blur-[100px] sm:blur-[120px] opacity-28 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at center, rgba(112, 204, 77, 0.38) 0%, rgba(112, 204, 77, 0.12) 50%, transparent 75%)",
            }}
          />
        </>
      )}

      {level === "brand-moment" && position === "bottom" && (
        <>
          {/* Rising ground emission for Contact section */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-[-60px] -translate-x-1/2 w-[110vw] max-w-[1500px] h-[450px] sm:h-[550px] rounded-t-[100%] blur-[140px] sm:blur-[170px] opacity-34 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 85% 65% at 50% 100%, rgba(112, 204, 77, 0.38) 0%, rgba(112, 204, 77, 0.16) 40%, rgba(112, 204, 77, 0.04) 70%, transparent 85%)",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 bottom-[-20px] -translate-x-1/2 w-[700px] sm:w-[900px] h-[280px] sm:h-[350px] rounded-t-[100%] blur-[100px] sm:blur-[130px] opacity-38 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 75% 60% at 50% 100%, rgba(112, 204, 77, 0.35) 0%, rgba(112, 204, 77, 0.10) 55%, transparent 80%)",
            }}
          />
        </>
      )}

      {/* ── Level 2: ATMOSPHERIC (★★ - Presence, Work, Process) ── */}
      {level === "atmospheric" && position === "top" && (
        /* Soft dark transition bleed at top edge (absorbing spill from previous section) */
        <div
          className="pointer-events-none absolute left-1/2 top-[-80px] -translate-x-1/2 w-[120vw] max-w-[1600px] h-[350px] sm:h-[450px] rounded-b-[100%] blur-[140px] sm:blur-[170px] opacity-24 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(112, 204, 77, 0.22) 0%, rgba(112, 204, 77, 0.06) 45%, transparent 75%)",
          }}
        />
      )}

      {level === "atmospheric" && position === "bottom" && (
        /* Gentle atmospheric spill entering from lower edge */
        <div
          className="pointer-events-none absolute left-1/2 bottom-[-60px] -translate-x-1/2 w-[100vw] max-w-[1400px] h-[320px] sm:h-[400px] rounded-t-[100%] blur-[140px] sm:blur-[170px] opacity-20 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 100%, rgba(112, 204, 77, 0.20) 0%, rgba(112, 204, 77, 0.05) 50%, transparent 75%)",
          }}
        />
      )}

      {level === "atmospheric" && position === "split" && (
        <>
          {/* Top bleed from above */}
          <div
            className="pointer-events-none absolute left-1/2 top-[-60px] -translate-x-1/2 w-[110vw] max-w-[1500px] h-[300px] sm:h-[380px] rounded-b-[100%] blur-[140px] sm:blur-[170px] opacity-20 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(112, 204, 77, 0.18) 0%, rgba(112, 204, 77, 0.04) 45%, transparent 75%)",
            }}
          />
          {/* Soft lower spill */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-[-60px] -translate-x-1/2 w-[100vw] max-w-[1400px] h-[300px] sm:h-[380px] rounded-t-[100%] blur-[140px] sm:blur-[170px] opacity-20 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 75% 55% at 50% 100%, rgba(112, 204, 77, 0.18) 0%, rgba(112, 204, 77, 0.04) 50%, transparent 75%)",
            }}
          />
        </>
      )}

      {/* ── Level 1-2: SUBTLE (★-★★ - Team, ProjectDetail) ── */}
      {level === "subtle" && (
        /* Restrained, deep, minimal presence — black heavily dominates */
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[320px] sm:h-[420px] rounded-full blur-[160px] sm:blur-[190px] opacity-12 mix-blend-screen",
            bleedClass
          )}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(112, 204, 77, 0.15) 0%, rgba(112, 204, 77, 0.03) 50%, transparent 75%)",
          }}
        />
      )}

      {/* ── Level 1: FADE (★ - Footer fading to black) ── */}
      {level === "fade" && (
        /* The light gently settles down to black */
        <div
          className="pointer-events-none absolute left-1/2 bottom-[-100px] -translate-x-1/2 w-[900px] sm:w-[1200px] h-[280px] sm:h-[360px] rounded-full blur-[170px] sm:blur-[200px] opacity-10 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 100%, rgba(112, 204, 77, 0.12) 0%, rgba(112, 204, 77, 0.02) 50%, transparent 75%)",
          }}
        />
      )}
    </div>
  );
}
