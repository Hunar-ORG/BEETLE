"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { scrollToSectionTarget } from "@/lib/motion";

/**
 * Site-wide Footer Configuration
 * Centralized data-driven links for easy maintenance and expansion.
 */
export const FOOTER_CONFIG = {
  company: [
    { label: "About us", href: "/#about" },
    { label: "Our work", href: "/#work" },
    { label: "Our process", href: "/#process" },
    { label: "Get in touch", href: "/#contact" },
  ],
  connect: [
    {
      label: "LinkedIn",
      // Placeholder: replace with actual company LinkedIn URL when live
      href: "https://www.linkedin.com",
      isExternal: true,
      icon: Linkedin,
    },
    {
      label: "Instagram",
      // Placeholder: replace with actual company Instagram URL when live
      href: "https://www.instagram.com",
      isExternal: true,
      icon: Instagram,
    },
    {
      label: "Email",
      // Placeholder: replace with actual company email when live
      href: "mailto:hello@beetle.design",
      isExternal: true,
      icon: Mail,
    },
  ],
} as const;

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const currentYear = 2026;
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const handleNav = (href: string) => {
    scrollToSectionTarget(href, { pathname, router });
  };

  return (
    <footer
      aria-label="Site Footer"
      className={cn(
        "relative w-full overflow-hidden bg-[#010403] text-white border-t border-white/[0.06] selection:bg-emerald-500/25 selection:text-emerald-100",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 1 Atmosphere: Fading light gently settling to black ── */}
      <Atmosphere level="fade" />

      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, ease: easeCurve }}
        className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16"
      >
        {/* ── Main Footer Grid: Brand on Left, Columns on Right ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-14 md:gap-8 items-start">
          {/* Left Column: Large Brand Presence */}
          <div className="md:col-span-6 lg:col-span-7">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav("/");
              }}
              className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded-sm"
              aria-label="BEETLE — Home"
            >
              <Image
                src="/brand/beetle-wordmark.svg"
                alt="BEETLE"
                width={170}
                height={36}
                className="h-8 sm:h-9 md:h-10 w-auto select-none group-hover:opacity-90 transition-opacity"
              />
            </a>
          </div>

          {/* Right Area: Navigation Columns */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12">
            {/* Column 1: Company */}
            <div>
              <span className="block text-[11px] sm:text-xs font-mono font-medium tracking-[0.22em] text-white/40 uppercase mb-5 sm:mb-6">
                COMPANY
              </span>
              <ul className="space-y-3 sm:space-y-3.5">
                {FOOTER_CONFIG.company.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(item.href);
                      }}
                      className="text-sm sm:text-base font-normal text-white/75 hover:text-emerald-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Connect */}
            <div>
              <span className="block text-[11px] sm:text-xs font-mono font-medium tracking-[0.22em] text-white/40 uppercase mb-5 sm:mb-6">
                CONNECT
              </span>
              <ul className="space-y-3 sm:space-y-3.5">
                {FOOTER_CONFIG.connect.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.isExternal && !item.href.startsWith("mailto:") ? "_blank" : undefined}
                        rel={item.isExternal && !item.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-normal text-white/75 hover:text-emerald-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded-sm"
                      >
                        <Icon className="h-4 w-4 text-white/40 hover:text-emerald-400 transition-colors" />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Divider & Legal Line ── */}
        <div className="mt-16 sm:mt-24 md:mt-28 pt-8 sm:pt-10 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/40">
          <span>&copy; {currentYear} BEETLE. All rights reserved.</span>
          <span className="text-[11px] text-white/25">Built to be seen.</span>
        </div>
      </motion.div>
    </footer>
  );
}
