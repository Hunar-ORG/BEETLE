"use client";

import { motion } from "framer-motion";
import { plusJakartaSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useSectionReveal, createFadeInVariants } from "@/lib/motion";
import { Atmosphere } from "@/components/ui/Atmosphere";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-01",
    name: "Team Member 01",
    role: "Co-Founder",
  },
  {
    id: "member-02",
    name: "Team Member 02",
    role: "Co-Founder",
  },
  {
    id: "member-03",
    name: "Team Member 03",
    role: "Co-Founder",
  },
  {
    id: "member-04",
    name: "Team Member 04",
    role: "Co-Founder",
  },
];

export function TeamSection() {
  const { ref, controls, shouldReduceMotion } = useSectionReveal("team");
  const fadeInVariants = createFadeInVariants(shouldReduceMotion);

  return (
    <section
      ref={ref}
      id="team"
      aria-label="Meet the team"
      className={cn(
        "relative w-full overflow-hidden bg-[#010403] text-white selection:bg-emerald-500/25 selection:text-emerald-100",
        plusJakartaSans.className
      )}
    >
      {/* ── Level 1-2 Atmosphere: Extremely restrained subtle ambient field ── */}
      <Atmosphere level="subtle" bleedClass="left-1/4 top-1/3" />

      <div className="relative mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-10 lg:px-16 pt-16 sm:pt-24 md:pt-28 pb-14 sm:pb-20 md:pb-24">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={controls}
          custom={0}
          variants={fadeInVariants}
          className="mb-8 sm:mb-12 md:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white">
            Meet the team
          </h2>
        </motion.div>

        {/* ── Team Grid (Desktop: 4 cols, Tablet: 2 cols, Mobile: 2 cols compact editorial grid) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 sm:gap-x-7 lg:gap-x-8 gap-y-6 sm:gap-y-9 lg:gap-y-10 w-full">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.article
              key={member.id}
              initial="hidden"
              animate={controls}
              custom={shouldReduceMotion ? 0 : 0.08 * (index + 1)}
              variants={fadeInVariants}
              className="group flex flex-col"
            >
              {/* Image / Portrait Area */}
              <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.07] via-[#02140d]/60 to-[#010805] border border-white/[0.08] transition-all duration-300 ease-out group-hover:border-emerald-500/30 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Neutral architectural studio portrait placeholder */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-2.5 sm:p-5 lg:p-6 select-none">
                    {/* Soft inner ambient studio glow */}
                    <div
                      className="absolute inset-0 bg-radial-[ellipse_at_top] from-emerald-500/10 via-transparent to-transparent opacity-60"
                      aria-hidden="true"
                    />

                    {/* Minimalist portrait silhouette graphic */}
                    <div className="relative z-10 flex flex-col items-center opacity-40 group-hover:opacity-60 transition-all duration-300 group-hover:scale-105">
                      <div className="w-11 h-11 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border border-white/20 bg-white/[0.04] mb-2 sm:mb-3 flex items-center justify-center">
                        <span className="font-mono text-[10px] sm:text-xs text-white/50 tracking-widest">
                          0{index + 1}
                        </span>
                      </div>
                      <div className="w-16 sm:w-22 lg:w-28 h-6 sm:h-8 lg:h-10 rounded-t-full border-t border-x border-white/15 bg-white/[0.02]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div className="mt-2.5 sm:mt-4 flex flex-col">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold tracking-[-0.01em] text-white group-hover:text-emerald-50 transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs lg:text-[13px] font-medium tracking-[0.14em] uppercase text-emerald-400/90">
                  {member.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
