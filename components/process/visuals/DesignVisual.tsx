"use client";

import { Eye, Layers, Palette, RotateCw, Share2, Sparkles, Sliders } from "lucide-react";

export function DesignVisual() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full">
      {/* ── Left Column: Stacked Design Tokens & Brand Asset Mockups ── */}
      <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-3.5">
        {/* Top Card: Brand Packaging Art Mockup */}
        <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#090d0b] p-3 sm:p-3.5 relative overflow-hidden group shadow-lg">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="h-3 w-3" />
              <span>BRAND IDENTITY</span>
            </span>
            <span>SPEC // 01</span>
          </div>

          {/* Artistic Box Mockup Presentation */}
          <div className="relative h-24 sm:h-28 w-full rounded-lg bg-gradient-to-br from-[#1c1917] via-[#0c1410] to-[#040806] border border-white/[0.06] p-3 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent" />
            <div className="relative z-10 text-center">
              <span className="font-serif italic text-amber-200 text-sm sm:text-base font-bold tracking-wide">
                BEETLE
              </span>
              <p className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase mt-0.5">
                Bespoke Digital Craft
              </p>
            </div>
            {/* Diagonal Foil Accent Accent Line */}
            <div className="absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-gradient-to-tr from-emerald-500/20 to-transparent blur-md" />
          </div>
        </div>

        {/* Bottom Card: Component Token Configurator */}
        <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#070b09] p-3 sm:p-3.5 shadow-lg flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Palette className="h-3 w-3" />
              <span>TOKEN MATRIX</span>
            </span>
            <span className="text-white/40">CONFIG</span>
          </div>

          <div className="space-y-2 text-[10px] font-mono">
            {/* Color Swatches */}
            <div className="flex items-center justify-between">
              <span className="text-white/50">Palette:</span>
              <div className="flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-full bg-[#010403] border border-emerald-400 ring-2 ring-emerald-400/20" />
                <span className="h-4 w-4 rounded-full bg-[#00dc82] border border-white/20" />
                <span className="h-4 w-4 rounded-full bg-[#f59e0b] border border-white/20" />
                <span className="h-4 w-4 rounded-full bg-[#e2e8f0] border border-white/20" />
              </div>
            </div>

            {/* Material / Mode */}
            <div className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1 border border-white/[0.05]">
              <span className="text-white/50">Surface:</span>
              <span className="text-emerald-300 font-bold">Liquid Charcoal Glass</span>
            </div>

            {/* Typography Spec */}
            <div className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1 border border-white/[0.05]">
              <span className="text-white/50">Scale:</span>
              <span className="text-white/80">Major Third // 1.25</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-white/40">
            <span>TOKENS SYNCED</span>
            <span className="text-emerald-400">100% COVERAGE</span>
          </div>
        </div>
      </div>

      {/* ── Right Column: Interactive 3D Studio Configurator Tool ── */}
      <div className="lg:col-span-8 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#060a08]/90 p-3 sm:p-4 backdrop-blur-md shadow-2xl relative overflow-hidden min-h-[300px] sm:min-h-[340px]">
        {/* Top Studio Toolbar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5 z-10 text-[10px] sm:text-[11px] font-mono">
          <div className="flex items-center gap-2 text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white tracking-wider">BEETLE STUDIO</span>
            <span className="text-white/30 hidden sm:inline">/</span>
            <span className="text-white/40 hidden sm:inline">3D Viewport</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-white/60">
              Download Wireframe
            </span>
            <button
              type="button"
              className="flex items-center gap-1 rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 hover:bg-emerald-900/50 transition-colors"
            >
              <Share2 className="h-3 w-3" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace: Inspector + 3D Viewport */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-2.5 flex-1 items-center">
          {/* Left Inspector Sidebar */}
          <div className="sm:col-span-4 rounded-lg border border-white/[0.06] bg-black/40 p-2.5 space-y-2 text-[10px] font-mono">
            <div className="flex items-center justify-between text-white/50 border-b border-white/[0.05] pb-1">
              <span>INSPECTOR</span>
              <Sliders className="h-3 w-3 text-emerald-400" />
            </div>

            <div>
              <span className="text-white/40 text-[9px] block">DIMENSIONS</span>
              <div className="text-white/80 font-medium">1440 x 900 // Liquid</div>
            </div>

            <div>
              <span className="text-white/40 text-[9px] block">INTERACTION</span>
              <div className="text-emerald-300 font-medium">Kinetic Spring Ease</div>
            </div>

            <div className="rounded border border-emerald-500/20 bg-emerald-950/30 p-1.5 flex items-center justify-between text-emerald-300">
              <span>STATUS:</span>
              <span className="font-bold">APPROVED</span>
            </div>
          </div>

          {/* Right 3D Viewport Scene (SVG 3D Wireframe / Isometric Box) */}
          <div className="sm:col-span-8 relative flex items-center justify-center min-h-[160px] sm:min-h-[190px]">
            <svg
              viewBox="0 0 320 200"
              className="w-full h-full max-h-[190px] select-none"
              aria-hidden="true"
            >
              <defs>
                {/* 3D Box Gradients */}
                <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#064e3b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Orbital 360-degree Rotation Arc */}
              <ellipse
                cx="160"
                cy="145"
                rx="120"
                ry="38"
                fill="none"
                stroke="rgba(112, 204, 77, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* 3D Isometric Product / Website Cube */}
              <g transform="translate(160, 105)">
                {/* Top Polygon */}
                <polygon points="0,-48 64,-16 0,16 -64,-16" fill="url(#topFace)" stroke="#00dc82" strokeWidth="1" />
                {/* Left Polygon */}
                <polygon points="-64,-16 0,16 0,80 -64,48" fill="url(#leftFace)" stroke="#047857" strokeWidth="1" />
                {/* Right Polygon */}
                <polygon points="0,16 64,-16 64,48 0,80" fill="url(#rightFace)" stroke="#10b981" strokeWidth="1" />

                {/* Surface Graphics & Branding */}
                <text x="0" y="-12" fill="#a7f3d0" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  BEETLE
                </text>
                <text x="-32" y="38" fill="#6ee7b7" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(26, -32, 38)">
                  02 // DESIGN
                </text>
                <text x="32" y="38" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(-26, 32, 38)">
                  RESPONSIVE
                </text>
              </g>

              {/* Interactive Angle Slider Markers */}
              <circle cx="50" cy="140" r="4" fill="#00dc82" />
              <circle cx="270" cy="140" r="4" fill="#00dc82" />
            </svg>

            {/* Orbit Navigation Overlay Controls */}
            <div className="absolute bottom-1 right-2 flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-black/60 px-2 py-1 text-[9px] font-mono text-white/50">
              <RotateCw className="h-3 w-3 text-emerald-400" />
              <span>360&deg; Orbit Active</span>
            </div>
          </div>
        </div>

        {/* Bottom Viewport Status */}
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40 z-10">
          <span>HIGH-FIDELITY PROTOTYPE</span>
          <span className="text-emerald-400">READY FOR CODE &rarr;</span>
        </div>
      </div>
    </div>
  );
}
