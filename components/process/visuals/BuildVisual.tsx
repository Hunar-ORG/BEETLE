"use client";

import { Code2, GitBranch, MessageSquare, Send, Users } from "lucide-react";

export function BuildVisual() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full">
      {/* ── Left Panel: Collaborative Architecture Canvas with Live Cursors ── */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#070b09]/95 p-3 sm:p-4 backdrop-blur-md shadow-2xl relative overflow-hidden min-h-[300px] sm:min-h-[340px]">
        {/* Canvas Top Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5 z-10 text-[10px] sm:text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-bold text-white tracking-wider">ARCHITECTURE CANVAS</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Collaborator Avatars */}
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#070b09] bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-[8px] font-bold text-black">
                JH
              </div>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#070b09] bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center text-[8px] font-bold text-black">
                DG
              </div>
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-[#070b09] bg-gradient-to-tr from-blue-400 to-indigo-600 flex items-center justify-center text-[8px] font-bold text-white">
                AK
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 rounded bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 hover:bg-emerald-900/50 transition-colors"
            >
              <Users className="h-3 w-3" />
              <span>Sync (3)</span>
            </button>
          </div>
        </div>

        {/* Canvas Body with Dotted Background & Architecture Graph */}
        <div className="relative flex-1 my-3 rounded-lg border border-white/[0.04] bg-[#030604] p-3 overflow-hidden">
          {/* Subtle Canvas Dot Grid */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            {/* Schema Entity Node */}
            <div className="rounded-lg border border-white/[0.08] bg-[#0c120f] p-2.5 text-[10px] font-mono shadow-md">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1 mb-1.5 text-emerald-300 font-bold">
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  <span>workspaces</span>
                </span>
                <span className="text-[8px] text-white/40">SCHEMA</span>
              </div>
              <div className="space-y-1 text-white/60 text-[9px]">
                <div className="flex justify-between">
                  <span>id</span>
                  <span className="text-emerald-400/80">string [pk]</span>
                </div>
                <div className="flex justify-between">
                  <span>createdAt</span>
                  <span className="text-white/40">timestamp</span>
                </div>
                <div className="flex justify-between">
                  <span>edgeCluster</span>
                  <span className="text-amber-400/80">region_eu</span>
                </div>
              </div>
            </div>

            {/* Floating Terraform / Edge Code Snippet Card */}
            <div className="rounded-lg border border-emerald-500/30 bg-[#06140e] p-2.5 text-[9px] font-mono shadow-xl relative">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
                <Code2 className="h-3 w-3" />
                <span># Edge Lambda Pipeline</span>
              </div>
              <div className="text-emerald-200/90 leading-relaxed font-mono">
                <p>resource &quot;edge_cache&quot; &quot;prod&quot; &#123;</p>
                <p className="pl-2">latency = &quot;sub-15ms&quot;</p>
                <p className="pl-2">revalidate = 86400</p>
                <p>&#125;</p>
              </div>

              {/* Cursor 1: Jenna H. */}
              <div className="absolute -top-3 -right-2 flex items-center gap-1 z-20 pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold text-black shadow">
                  Jenna H.
                </span>
              </div>
            </div>
          </div>

          {/* Cursor 2: Declan G. */}
          <div className="absolute bottom-3 left-10 flex items-center gap-1 z-20 pointer-events-none">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-emerald-400 text-black drop-shadow">
              <polygon points="0,0 0,14 4,10 8,15 11,13 7,8 13,8" />
            </svg>
            <span className="rounded bg-emerald-400 px-1.5 py-0.5 text-[8px] font-bold text-black shadow">
              Declan G.
            </span>
          </div>
        </div>

        {/* Bottom Build Status Bar */}
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40 z-10">
          <span>PIPELINE: VERCEL EDGE & NEXT.JS</span>
          <span className="text-emerald-400">BUILD PASSING // 100%</span>
        </div>
      </div>

      {/* ── Right Panel: Staged Component Inspector & Team Thread ── */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#090e0b]/90 p-3 sm:p-4 backdrop-blur-md shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 text-[10px] sm:text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-white/70">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>COMPONENT STAGING</span>
          </span>
          <span className="text-emerald-400 font-bold">ACTIVE TEST</span>
        </div>

        {/* Visual Component Frame with Resize Anchor Handles */}
        <div className="my-3 rounded-lg border-2 border-emerald-400/80 bg-black/60 p-4 relative flex items-center justify-center shadow-[0_0_20px_rgba(0,220,130,0.12)]">
          {/* Corner Transform Handles */}
          <span className="absolute -top-1.5 -left-1.5 h-3 w-3 rounded-sm border border-emerald-400 bg-white" />
          <span className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-sm border border-emerald-400 bg-white" />
          <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-sm border border-emerald-400 bg-white" />
          <span className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-sm border border-emerald-400 bg-white" />

          <div className="text-center py-2">
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              BEETLE Hero Stage
            </span>
            <div className="text-[9px] font-mono text-emerald-400/80 mt-0.5">
              100% Fluid / Zero Layout Shift
            </div>
          </div>
        </div>

        {/* Live Collaborator Comment Box */}
        <div className="rounded-lg border border-white/[0.06] bg-[#050806] p-2.5 space-y-2 text-[10px] font-mono">
          <div className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center text-[8px] shrink-0 mt-0.5">
              JH
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-medium">Jenna H.</span>
                <span className="text-[8px] text-white/40">Just now</span>
              </div>
              <p className="text-white/70 font-sans text-[11px] leading-snug mt-0.5">
                &ldquo;What if we used a server component here for instant edge loading?&rdquo;
              </p>
            </div>
          </div>

          {/* Reply Row */}
          <div className="flex items-center gap-2 rounded bg-white/[0.03] border border-white/[0.06] px-2 py-1.5 text-white/50">
            <div className="h-4 w-4 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center text-[7px] shrink-0">
              DG
            </div>
            <span className="flex-1 text-[10px] text-emerald-300 font-sans truncate">
              Implemented. 0ms initial server execution &check;
            </span>
            <Send className="h-3 w-3 text-emerald-400 shrink-0" />
          </div>
        </div>

        {/* Bottom Indicator */}
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>CODE REVIEW: 0 REMAINING</span>
          <span className="text-emerald-400">READY FOR DEPLOY &rarr;</span>
        </div>
      </div>
    </div>
  );
}
