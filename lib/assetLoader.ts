"use client";

/**
 * BEETLE Asset Preloader & Priority Tiering System
 *
 * Tier 1 (Critical): Website logo, fonts, above-the-fold elements.
 * Tier 2 (Important Below-The-Fold): Process, Design, Build, Launch, Mission.
 * Tier 3 (Lower Priority / On-Demand): Team photos, project carousel, detail assets.
 */

export const CRITICAL_ASSETS = [
  "/brand/beetle-wordmark.svg",
  "/brand/beetle-mark.svg",
];

export const BELOW_THE_FOLD_ASSETS = [
  "/images/projects/discover1.png",
  "/images/projects/discover2.png",
  "/images/projects/Design1.png",
  "/images/projects/Design2.png",
  "/images/projects/mission.png",
  "/images/projects/Build1.png",
  "/images/projects/Build2.png",
  "/images/projects/Launch1.png",
  "/images/projects/Launch2.png",
  "/images/projects/our process.png",
];

let preloadingStarted = false;

/**
 * Progressively preloads below-the-fold images after the hero is revealed.
 * Uses requestIdleCallback and paced intervals so network & main thread
 * are never saturated, eliminating scroll jitter and sudden frame drops.
 */
export function startProgressiveAssetPreload() {
  if (typeof window === "undefined" || preloadingStarted) return;
  preloadingStarted = true;

  let currentIndex = 0;

  function loadNext() {
    if (currentIndex >= BELOW_THE_FOLD_ASSETS.length) return;

    const url = BELOW_THE_FOLD_ASSETS[currentIndex++];
    const img = new window.Image();

    const onDone = () => {
      // Paced idle pause between image fetches to keep scrolling 60fps butter-smooth
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setTimeout(loadNext, 120));
      } else {
        setTimeout(loadNext, 120);
      }
    };

    img.onload = onDone;
    img.onerror = () => {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[Beetle Asset Preloader] Could not preload: ${url}`);
      }
      onDone();
    };

    img.src = url;
  }

  // Kick off gracefully after hero reveal settles
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => setTimeout(loadNext, 200));
  } else {
    setTimeout(loadNext, 300);
  }
}
