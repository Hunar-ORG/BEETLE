"use client";

import Image from "next/image";

export function BuildVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full items-center">
      {/* ── Build Image 1: Engineering Architecture & Code ── */}
      <div className="relative w-full aspect-[1682/935] flex items-center justify-center">
        <Image
          src="/images/projects/Build1.png"
          alt="Engineering and architecture phase: technical implementation and code structure"
          width={1682}
          height={935}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ── Build Image 2: Staging & Responsive Component Assembly ── */}
      <div className="relative w-full aspect-[1444/1089] flex items-center justify-center">
        <Image
          src="/images/projects/Build2.png"
          alt="Component staging and responsive engineering workspace"
          width={1444}
          height={1089}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
