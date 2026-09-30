"use client";

import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ProcessHero } from "@/components/process/ProcessHero";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { useSectionReveal } from "@/lib/motion";
import { Atmosphere } from "@/components/ui/Atmosphere";

export function ProcessSection() {
  const { ref, controls } = useSectionReveal("process");

  return (
    <section
      ref={ref}
      aria-label="Our Process"
      className={cn(
        "relative w-full overflow-hidden bg-[#010403] text-white selection:bg-emerald-500/25 selection:text-emerald-100 pt-20 sm:pt-28 md:pt-36 pb-10 sm:pb-14 md:pb-16",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 2 Atmosphere: Soft atmospheric spill entering from below ── */}
      <Atmosphere level="atmospheric" position="bottom" />

      {/* ── 1 & 2: The BEETLE Method Opening & Central Visual Moment ── */}
      <ProcessHero controls={controls} />

      {/* ── Subtle Divider / Spacer ── */}
      <div className="mx-auto my-20 sm:my-28 md:my-36 max-w-5xl px-4 sm:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* ── 3, 4 & 5: Our Process Continuous Timeline Sequence ── */}
      <ProcessTimeline />
    </section>
  );
}
