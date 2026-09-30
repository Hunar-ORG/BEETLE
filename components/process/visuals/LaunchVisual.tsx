"use client";

import Image from "next/image";

export function LaunchVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full items-center">
      {/* ── Launch Image 1: Deployment & Global Edge Infrastructure ── */}
      <div className="relative w-full aspect-[1589/990] flex items-center justify-center">
        <Image
          src="/images/projects/Launch1.png"
          alt="Deployment phase: global telemetry and edge infrastructure distribution"
          width={1589}
          height={990}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ── Launch Image 2: Performance Telemetry & Web Vitals Benchmark ── */}
      <div className="relative w-full aspect-[1536/1024] flex items-center justify-center">
        <Image
          src="/images/projects/Launch2.png"
          alt="Performance insights and Lighthouse benchmark verification"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
