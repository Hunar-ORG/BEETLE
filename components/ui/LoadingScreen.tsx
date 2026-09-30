"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { startProgressiveAssetPreload } from "@/lib/assetLoader";

export function LoadingScreen() {
  const [progress, setProgress] = useState(18);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Always force scroll position to the very top (Hero section) on initial load / reload
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    let mounted = true;
    let logoReady = false;
    let fontsReady = false;

    const completeIfReady = () => {
      if (logoReady && fontsReady && mounted) {
        setProgress(100);
        // Brief natural settle so the 100% completion is perceived smoothly
        setTimeout(() => {
          if (mounted) {
            setIsReady(true);
          }
        }, 140);
      }
    };

    // 1. Critical Logo Preload
    const img = new window.Image();
    img.onload = () => {
      if (!mounted) return;
      logoReady = true;
      setProgress((prev) => Math.max(prev, 60));
      completeIfReady();
    };
    img.onerror = () => {
      if (!mounted) return;
      logoReady = true;
      completeIfReady();
    };
    img.src = "/brand/beetle-wordmark.svg";

    // 2. Critical Fonts Preload
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!mounted) return;
          fontsReady = true;
          setProgress((prev) => Math.max(prev, 85));
          completeIfReady();
        })
        .catch(() => {
          if (!mounted) return;
          fontsReady = true;
          completeIfReady();
        });
    } else {
      fontsReady = true;
      completeIfReady();
    }

    // 3. Fallback safety timer: guarantees the interface never hangs even under high latency
    const fallbackTimer = setTimeout(() => {
      if (mounted && !isReady) {
        setProgress(100);
        setIsReady(true);
      }
    }, 1200);

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
    };
  }, [isReady]);

  const handleExitComplete = () => {
    setIsMounted(false);
    // Begin progressive background loading of below-the-fold assets immediately
    startProgressiveAssetPreload();
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isReady && (
        <motion.div
          key="beetle-initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className={cn(
            "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#010403] select-none",
            plusJakartaSans.className
          )}
          aria-label="Loading BEETLE"
          role="status"
          aria-live="polite"
        >
          {/* Subtle restrained atmospheric core (non-distracting, perfectly matched brand green) */}
          <div
            className="pointer-events-none absolute w-[260px] h-[260px] rounded-full blur-[80px] opacity-15 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, rgba(112, 204, 77, 0.40) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Logo Mark / Wordmark */}
          <div className="relative z-10 flex items-center justify-center mb-6">
            <Image
              src="/brand/beetle-wordmark.svg"
              alt="BEETLE"
              width={140}
              height={30}
              priority
              className="h-6 sm:h-7 w-auto select-none"
            />
          </div>

          {/* Minimal Status Label */}
          <p className="relative z-10 text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.28em] text-white/40 uppercase mb-3.5">
            INITIALIZING...
          </p>

          {/* Progress Indicator */}
          <div className="relative z-10 w-36 sm:w-44 h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#70cc4d] rounded-full"
              initial={{ width: "18%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.22 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
