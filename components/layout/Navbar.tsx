"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { prepareSectionForReplay, smoothScrollTo } from "@/lib/motion";

const NAV_LINKS = [
  { label: "About us", href: "/#about" },
  { label: "Our work", href: "/#work" },
  { label: "Our process", href: "/#process" },
  { label: "Get in touch", href: "/#contact" },
] as const;

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Smooth scroll to anchor with immediate click-time hiding and synchronized reveal
  const scrollToSection = useCallback((href: string) => {
    if (typeof window === "undefined") return;

    const isHome = href === "/" || href === "/#home" || href === "#home";
    const id = isHome ? "hero" : href.replace(/^\/?#/, "");

    // On subpages, navigate client-side back to homepage with hash without page reload
    if (pathname !== "/") {
      router.push(isHome ? "/" : `/#${id}`);
      return;
    }

    const target = isHome ? document.documentElement : document.getElementById(id);
    if (!target) return;

    // Update history URL without reloading or breaking browser history
    if (window.location.hash !== (isHome ? "" : `#${id}`)) {
      window.history.replaceState(null, "", isHome ? "/" : `/#${id}`);
    }

    const navbarHeight = 96;
    const targetTop = isHome
      ? 0
      : Math.max(0, target.getBoundingClientRect().top + window.scrollY - navbarHeight);

    const isAlreadyInView = isHome
      ? window.scrollY < 20
      : Math.abs(window.scrollY - targetTop) < 30;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. HIDE AT CLICK TIME (the instant nav is clicked, before scroll begins)
    prepareSectionForReplay(id, isAlreadyInView);

    // 2. Reduced motion: instant jump
    if (prefersReduced) {
      window.scrollTo(0, targetTop);
      return;
    }

    // 3. Already in view: prepareSectionForReplay handles intentional 120ms replay
    if (isAlreadyInView) {
      return;
    }

    // 4. Programmatic scroll: smooth, decisive, capped between 0.6s and 0.85s
    smoothScrollTo(targetTop);
  }, [pathname, router]);

  // Direct load or client navigation with hash (e.g. returning from /work/[slug] or direct URL entry)
  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;
    const hash = window.location.hash;
    if (hash && hash !== "#" && hash !== "#home") {
      const timer = setTimeout(() => {
        scrollToSection(hash);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [pathname, scrollToSection]);

  // Mobile menu click: unlock scroll lock first, then close and scroll
  const handleMobileNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      document.body.style.overflow = "";
      setTimeout(() => {
        scrollToSection(href);
      }, 160);
    },
    [scrollToSection]
  );

  // Detect scroll to adjust glass effect subtly
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex flex-col items-center w-full px-4 pt-5 md:pt-9 pointer-events-none">
        {/* ── Relative Navbar Wrapper ── */}
        <div className="relative flex flex-col items-center w-full max-w-[640px] md:w-auto pointer-events-auto">
          {/* Compact floating pill container matching Fluxon proportions */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative flex h-[60px] w-full items-center justify-between md:justify-start rounded-2xl px-6 md:px-7 transition-all duration-300",
              "glass-nav glass-nav-glow",
              scrolled
                ? "bg-[rgba(6,20,15,0.45)] shadow-xl shadow-black/40"
                : "bg-[rgba(6,20,15,0.28)]",
            )}
          >
            {/* Subtle internal glass gloss reflection across upper half */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[48%] rounded-t-2xl overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-gradient-to-b from-white/[0.14] via-emerald-400/[0.02] to-transparent" />
            </div>

            {/* ── Logo ────────────────────────────────────────── */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); scrollToSection("/"); }}
              className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-md transition-opacity duration-200 hover:opacity-80"
              aria-label="BEETLE — back to top"
            >
              <span className="text-[15px] font-bold tracking-[0.2em] text-white">
                BEETLE
              </span>
            </a>

            {/* ── Desktop nav links ────────────────────────────── */}
            <ul className="hidden items-center gap-6 md:ml-10 md:flex lg:gap-8" role="navigation">
              {NAV_LINKS.map(({ label, href }) => {
                const isGetInTouch = label === "Get in touch";
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(href); }}
                      className={cn(
                        isGetInTouch
                          ? "rounded-lg px-4 py-2 text-[14px] font-semibold tracking-wide text-white bg-[#00a865] hover:bg-[#00bf74] hover:shadow-[0_0_16px_rgba(0,200,120,0.35)] transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c878]/50"
                          : "nav-link text-[14px] font-medium tracking-wide text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm",
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* ── Mobile hamburger button (matching Reference 3) ── */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-overlay"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "flex md:hidden items-center justify-center w-10 h-10 rounded-xl",
                "border border-white/20 bg-white/[0.06] text-white/90 hover:text-white transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
              )}
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </motion.nav>
        </div>
      </header>

      {/* ── Fullscreen Immersive Mobile Menu Overlay (Matching Reference 4) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#010403]/96 backdrop-blur-2xl px-6 py-6 sm:px-10 sm:py-8 overflow-y-auto md:hidden"
          >
            {/* Ambient emerald backlight in the mobile menu overlay */}
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full blur-[120px] opacity-25"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0, 200, 120, 0.40) 0%, rgba(0, 143, 90, 0.18) 50%, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* ── Header row in overlay: Logo on left, Framed Close button on right ── */}
            <div className="relative z-10 flex items-center justify-between w-full pt-1">
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); handleMobileNavClick("/"); }}
                className="flex items-center gap-1.5 focus-visible:outline-none"
                aria-label="BEETLE — back to top"
              >
                <span className="text-[16px] font-bold tracking-[0.2em] text-white">
                  BEETLE
                </span>
              </a>

              {/* Framed close button matching Reference 4 */}
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl",
                  "border border-white/20 bg-white/[0.08] text-white/90 hover:text-white transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
                )}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* ── Editorial Links with Large Typography (Matching Reference 4) ── */}
            <div className="relative z-10 flex flex-col justify-center my-auto py-10 pl-2">
              <ul className="flex flex-col space-y-7 sm:space-y-8">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const isGetInTouch = label === "Get in touch";
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.04,
                        duration: 0.22,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <a
                        href={href}
                        onClick={(e) => { e.preventDefault(); handleMobileNavClick(href); }}
                        className={cn(
                          "block text-3xl sm:text-4xl font-medium tracking-tight transition-colors duration-200",
                          isGetInTouch
                            ? "text-emerald-400 hover:text-emerald-300"
                            : "text-white/90 hover:text-white",
                        )}
                      >
                        {label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* ── Bottom supporting note in mobile overlay ── */}
            <div className="relative z-10 pt-5 border-t border-white/10">
              <p className="text-xs text-white/40 tracking-wide font-normal">
                The digital partner for businesses ready to build a stronger online presence.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
