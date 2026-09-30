"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  className?: string;
  isDraggingRef?: React.MutableRefObject<boolean>;
}

export function ProjectCard({
  project,
  isActive = true,
  className,
  isDraggingRef,
}: ProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (isDraggingRef?.current || !isActive) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const hasImage = !!project.image;

  return (
    <Link
      href={`/work/${project.slug}`}
      onClick={handleClick}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className={cn(
        "group relative flex flex-col w-full text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl cursor-pointer",
        className
      )}
      aria-label={`View ${project.name} (${project.category})`}
    >
      {/* ── Screenshot / Preview Frame ── */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#020705] shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:border-emerald-500/35 group-hover:shadow-[0_24px_60px_rgba(112,204,77,0.12)]">
        {/* Top Edge Specular Highlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 via-white/20 to-transparent z-20"
          aria-hidden="true"
        />

        {/* Minimal Browser Frame Header */}
        <div className="relative z-10 flex h-6 sm:h-7 w-full items-center justify-between border-b border-white/[0.06] bg-[#030906]/90 px-3 sm:px-3.5 backdrop-blur-md">
          {/* Window dots */}
          <div className="flex items-center gap-1 sm:gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/10" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/10" />
          </div>

          {/* Domain / Category Pill */}
          <div className="flex h-3.5 sm:h-4 items-center gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] px-2 font-mono text-[8.5px] sm:text-[9.5px] text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span>{project.slug}.beetle</span>
          </div>

          <div className="w-6 sm:w-8" aria-hidden="true" />
        </div>

        {/* Preview Area: real image or intentional dark placeholder */}
        <div className="relative h-[calc(100%-24px)] sm:h-[calc(100%-28px)] w-full overflow-hidden bg-[#010403] select-none pointer-events-none">
          {hasImage ? (
            <>
              <Image
                src={project.image}
                alt={`${project.name} website preview`}
                fill
                draggable={false}
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 70vw, 760px"
                priority={isActive}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] pointer-events-none select-none"
              />
              {/* Subtle vignette */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                aria-hidden="true"
              />
            </>
          ) : (
            /* Intentional empty frame — waiting for real project screenshot */
            <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
              {/* Subtle architectural grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
                aria-hidden="true"
              />
              {/* Soft emerald glow center */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,220,130,0.18) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              {/* Placeholder content — no "image here" text */}
              <div className="relative z-10 flex flex-col items-center gap-3 opacity-25 group-hover:opacity-40 transition-opacity duration-400">
                <div className="w-px h-6 bg-emerald-400/60" aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-emerald-400/80">
                  {project.slug}
                </span>
                <div className="w-px h-6 bg-emerald-400/60" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Metadata Row ── */}
      <div className="mt-3 sm:mt-3.5 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-medium tracking-[-0.02em] text-white group-hover:text-emerald-50 transition-colors duration-200">
            {project.name}
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-emerald-400/90">
            {project.category}
          </p>
        </div>

        {/* "View project" indicator */}
        <div className="flex items-center gap-1 text-xs sm:text-[13px] font-medium tracking-wide text-white/50 group-hover:text-emerald-300 transition-colors duration-200 pt-0.5">
          <span>View project</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
