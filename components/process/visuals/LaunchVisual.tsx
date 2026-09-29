"use client";

import { Activity, ArrowUpRight, BarChart3, Globe, ShieldCheck } from "lucide-react";

export function LaunchVisual() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full">
      {/* ── Left Panel: Live Geographic Telemetry Map & Real-time Metrics ── */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#060a08]/95 p-3 sm:p-4 backdrop-blur-md shadow-2xl relative overflow-hidden min-h-[300px] sm:min-h-[340px]">
        {/* Top Mini KPI Metric Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 z-10">
          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2 text-[10px] font-mono">
            <span className="text-white/40 block text-[9px]">CONVERSIONS</span>
            <div className="text-white font-bold text-xs sm:text-sm mt-0.5">$18.4K</div>
            <span className="text-emerald-400 text-[9px] flex items-center gap-0.5">
              <ArrowUpRight className="h-2.5 w-2.5" /> +24%
            </span>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2 text-[10px] font-mono">
            <span className="text-white/40 block text-[9px]">LIVE VISITORS</span>
            <div className="text-white font-bold text-xs sm:text-sm mt-0.5">14.2K</div>
            <span className="text-emerald-400 text-[9px] flex items-center gap-0.5">
              <ArrowUpRight className="h-2.5 w-2.5" /> +18%
            </span>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2 text-[10px] font-mono">
            <span className="text-white/40 block text-[9px]">EDGE LATENCY</span>
            <div className="text-emerald-300 font-bold text-xs sm:text-sm mt-0.5">12ms</div>
            <span className="text-white/40 text-[9px]">Global Avg</span>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2 text-[10px] font-mono">
            <span className="text-white/40 block text-[9px]">UPTIME SLA</span>
            <div className="text-emerald-400 font-bold text-xs sm:text-sm mt-0.5">99.99%</div>
            <span className="text-emerald-400 text-[9px]">Zero Downtime</span>
          </div>
        </div>

        {/* Geographic Telemetry Map Graphic (SVG) */}
        <div className="relative flex-1 my-3 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 500 210"
            className="w-full h-full max-h-[190px] select-none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00dc82" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00dc82" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Stylized Simplified Continental Outlines */}
            <path
              d="M 40,50 Q 80,30 140,40 Q 180,70 170,120 Q 120,160 80,140 Q 30,110 40,50 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.8"
            />
            <path
              d="M 220,40 Q 290,20 360,35 Q 400,80 380,130 Q 310,160 250,130 Q 200,90 220,40 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.8"
            />
            <path
              d="M 120,140 Q 160,170 150,200 Q 120,200 100,160 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.8"
            />

            {/* Global Telemetry Pulse Hubs */}
            {/* San Francisco / US West */}
            <circle cx="70" cy="80" r="24" fill="url(#pulseGlow)" />
            <circle cx="70" cy="80" r="10" fill="#00dc82" fillOpacity="0.4" />
            <circle cx="70" cy="80" r="4" fill="#00dc82" />

            {/* New York / US East */}
            <circle cx="150" cy="70" r="32" fill="url(#pulseGlow)" />
            <circle cx="150" cy="70" r="14" fill="#00dc82" fillOpacity="0.35" />
            <circle cx="150" cy="70" r="5" fill="#6ee7b7" />

            {/* London / Western Europe */}
            <circle cx="260" cy="55" r="28" fill="url(#pulseGlow)" />
            <circle cx="260" cy="55" r="12" fill="#00dc82" fillOpacity="0.4" />
            <circle cx="260" cy="55" r="4.5" fill="#00dc82" />

            {/* Tokyo / East Asia */}
            <circle cx="390" cy="75" r="26" fill="url(#pulseGlow)" />
            <circle cx="390" cy="75" r="11" fill="#00dc82" fillOpacity="0.4" />
            <circle cx="390" cy="75" r="4" fill="#6ee7b7" />

            {/* Data flow curved paths */}
            <path
              d="M 70,80 Q 110,60 150,70 Q 205,50 260,55 Q 325,50 390,75"
              fill="none"
              stroke="#00dc82"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              strokeOpacity="0.5"
            />
          </svg>

          {/* Overlay Status Pill */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-black/70 px-2.5 py-1 text-[9px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>GLOBAL TRAFFIC ACTIVE</span>
          </div>
        </div>

        {/* Bottom Status Footnote */}
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40 z-10">
          <span className="flex items-center gap-1 text-emerald-400">
            <Globe className="h-3 w-3" />
            <span>EDGE NETWORK: 310+ POPs</span>
          </span>
          <span>LATENCY: OPTIMAL</span>
        </div>
      </div>

      {/* ── Right Panel: Insights, Volume Charts & Lighthouse Performance ── */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/[0.08] bg-[#070b09]/95 p-3 sm:p-4 backdrop-blur-md shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 text-[10px] sm:text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-white/70">
            <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
            <span>PERFORMANCE INSIGHTS</span>
          </span>
          <span className="rounded bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 text-white/50 text-[9px]">
            Real-time
          </span>
        </div>

        {/* Conversion Volume Bar Chart */}
        <div className="my-2.5 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[9px] font-mono text-white/40 block">ANNUALIZED IMPACT</span>
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                $14,652,082
              </span>
            </div>
            <span className="text-emerald-400 font-mono text-[10px]">+48.2% vs Old Site</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-14 sm:h-16 flex items-end gap-1.5 pt-2 px-1">
            {[42, 55, 48, 65, 58, 78, 70, 88, 82, 95, 90, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className="w-full rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    background:
                      i >= 9
                        ? "linear-gradient(to top, #00dc82, #6ee7b7)"
                        : "rgba(255, 255, 255, 0.12)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3 Circular Donut Gauges (Lighthouse Scores) */}
        <div className="rounded-lg border border-white/[0.06] bg-black/40 p-2.5">
          <span className="text-[9px] font-mono text-white/40 block mb-2">
            CORE WEB VITALS BENCHMARK
          </span>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Donut 1 */}
            <div className="flex flex-col items-center">
              <div className="relative h-10 w-10 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00dc82"
                    strokeWidth="3.5"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-bold text-white">100</span>
              </div>
              <span className="text-[8px] font-mono text-white/50 mt-1">SPEED</span>
            </div>

            {/* Donut 2 */}
            <div className="flex flex-col items-center">
              <div className="relative h-10 w-10 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00dc82"
                    strokeWidth="3.5"
                    strokeDasharray="98, 100"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-bold text-white">98</span>
              </div>
              <span className="text-[8px] font-mono text-white/50 mt-1">SEO</span>
            </div>

            {/* Donut 3 */}
            <div className="flex flex-col items-center">
              <div className="relative h-10 w-10 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00dc82"
                    strokeWidth="3.5"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-bold text-white">100</span>
              </div>
              <span className="text-[8px] font-mono text-white/50 mt-1">BEST PRAC</span>
            </div>
          </div>
        </div>

        {/* Bottom Launch Signoff */}
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            <span>CONFIDENTLY LIVE</span>
          </span>
          <span className="text-white/60">BEETLE VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
