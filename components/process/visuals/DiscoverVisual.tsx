"use client";

import { Search, PenTool, SlidersHorizontal, Layers, Target, Compass } from "lucide-react";

export function DiscoverVisual() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full">
      {/* ── Left Panel: 3D Isometric Spatial / Audience Market Map ── */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#060a08]/90 p-3 sm:p-4 backdrop-blur-md shadow-2xl overflow-hidden relative min-h-[300px] sm:min-h-[340px]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3 z-10">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-black/40 px-2.5 py-1.5 text-xs text-white/70">
            <Search className="h-3.5 w-3.5 text-emerald-400" />
            <span className="truncate text-[11px] sm:text-xs text-white/50">
              Search market segments, audience nodes, competitors...
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1.5 text-[10px] sm:text-[11px] font-mono text-emerald-300 hover:bg-emerald-900/40 transition-colors shrink-0"
          >
            <PenTool className="h-3 w-3 text-emerald-400" />
            <span>Draw Area</span>
          </button>
        </div>

        {/* 3D Isometric Spatial Scene (SVG) */}
        <div className="relative flex-1 my-3 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 540 260"
            className="w-full h-full max-h-[220px] select-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="emeraldColumn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00dc82" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#00dc82" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="amberColumn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="mintColumn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
              </linearGradient>
              <pattern id="isoGrid" width="30" height="18" patternUnits="userSpaceOnUse">
                <path
                  d="M 30 0 L 0 18 M 0 0 L 30 18"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>

            {/* Grid Floor */}
            <rect width="100%" height="100%" fill="url(#isoGrid)" />

            {/* Iso Roads / Terrain lines */}
            <path
              d="M-20,180 L280,30 L560,170"
              stroke="rgba(0, 220, 130, 0.18)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M30,240 L340,85 L580,210"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              fill="none"
            />

            {/* Building 1 (Amber Market Cluster) */}
            <g transform="translate(130, 95)">
              <polygon points="0,30 35,12 70,30 35,48" fill="#d97706" opacity="0.35" />
              <polygon points="0,30 35,48 35,90 0,72" fill="#b45309" opacity="0.45" />
              <polygon points="70,30 35,48 35,90 70,72" fill="#f59e0b" opacity="0.4" />
              {/* Vertical beacon */}
              <line x1="35" y1="30" x2="35" y2="-30" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="35" cy="-30" r="3" fill="#fbbf24" />
            </g>

            {/* Building 2 (Tall Central Emerald Flagship) */}
            <g transform="translate(230, 45)">
              <polygon points="0,40 45,15 90,40 45,65" fill="#00dc82" opacity="0.4" />
              <polygon points="0,40 45,65 45,130 0,105" fill="#047857" opacity="0.55" />
              <polygon points="90,40 45,65 45,130 90,105" fill="#10b981" opacity="0.5" />
              {/* Needle */}
              <line x1="45" y1="40" x2="45" y2="-45" stroke="#00dc82" strokeWidth="3" />
              <circle cx="45" cy="-45" r="4" fill="#6ee7b7" />
            </g>

            {/* Building 3 (Foreground Emerald Hub) */}
            <g transform="translate(350, 110)">
              <polygon points="0,35 40,15 80,35 40,55" fill="#059669" opacity="0.35" />
              <polygon points="0,35 40,55 40,95 0,75" fill="#064e3b" opacity="0.5" />
              <polygon points="80,35 40,55 40,95 80,75" fill="#10b981" opacity="0.4" />
              <line x1="40" y1="35" x2="40" y2="-20" stroke="#34d399" strokeWidth="2" />
              <circle cx="40" cy="-20" r="3" fill="#a7f3d0" />
            </g>

            {/* Coordinate Pill Badges */}
            <g transform="translate(90, 70)">
              <rect width="84" height="18" rx="9" fill="#18181b" stroke="#f59e0b" strokeWidth="1" />
              <text x="42" y="12" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle">
                SEG-AMBER-02
              </text>
            </g>

            <g transform="translate(225, 10)">
              <rect width="92" height="18" rx="9" fill="#022c22" stroke="#00dc82" strokeWidth="1" />
              <text x="46" y="12" fill="#6ee7b7" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                BEETLE-HQ-01
              </text>
            </g>

            <g transform="translate(345, 95)">
              <rect width="82" height="18" rx="9" fill="#18181b" stroke="#10b981" strokeWidth="1" />
              <text x="41" y="12" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                PEER-DIST-09
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-2.5 text-[10px] sm:text-[11px] font-mono text-white/50 z-10">
          <div className="flex items-center gap-2">
            <span>Market Reach:</span>
            <div className="h-1.5 w-20 sm:w-28 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
            </div>
            <span className="text-emerald-400 font-bold">78%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Confidence:</span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-300">High Trust</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Strategy & Sticky Note Matrix ── */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#070b09]/90 p-3 sm:p-4 backdrop-blur-md shadow-2xl">
        {/* Top Matrix Tabs */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 text-[10px] sm:text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-white/70">
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>DISCOVERY MATRIX</span>
          </span>
          <div className="flex items-center gap-3 text-white/40">
            <span className="text-emerald-400 border-b border-emerald-400 pb-0.5">MISSION</span>
            <span>PRICING</span>
          </div>
        </div>

        {/* Matrix Rows with Sticky Notes */}
        <div className="my-3 space-y-2.5">
          {/* Row 1: Competitor B */}
          <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-2.5">
            <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mb-1.5">
              <span>TIER C // COMMODITY</span>
              <span className="text-amber-400/80">$99/yr standard</span>
            </div>
            <div className="rounded bg-[#1a1714] border border-amber-500/20 p-2 text-[11px] text-amber-200/90 leading-snug">
              &quot;Generic templates with low brand distinction and noisy messaging.&quot;
            </div>
          </div>

          {/* Row 2: Competitor A */}
          <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-2.5">
            <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mb-1.5">
              <span>TIER B // AVERAGE INCUMBENT</span>
              <span className="text-white/60">$140/yr basic</span>
            </div>
            <div className="rounded bg-[#101915] border border-emerald-500/20 p-2 text-[11px] text-emerald-200/80 leading-snug">
              &quot;Reliable utility, but overlooked visual identity and slow page load.&quot;
            </div>
          </div>

          {/* Row 3: BEETLE Target Positioning */}
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-2.5 shadow-[0_0_20px_rgba(0,220,130,0.15)]">
            <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400 font-bold mb-1.5">
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>BEETLE STRATEGY // CATEGORY FLAGSHIP</span>
              </span>
              <span>10X IMPACT</span>
            </div>
            <div className="rounded bg-[#021c12] border border-emerald-400/30 p-2 text-[11px] text-emerald-100 font-medium leading-snug">
              &ldquo;Impossible to overlook. High-speed performance and cinematic editorial authority.&rdquo;
            </div>
          </div>
        </div>

        {/* Bottom Strategy Footnote */}
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>PILLARS: 03 MAPPED</span>
          <span className="text-emerald-400">READY FOR DESIGN &rarr;</span>
        </div>
      </div>
    </div>
  );
}
