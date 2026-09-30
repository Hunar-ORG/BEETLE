"use client";

import Image from "next/image";

export function DesignVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full items-center">
      {/* ── Design Image 1: 3D Configurator & Packaging Studio ── */}
      <div className="relative w-full aspect-[1536/1024] flex items-center justify-center">
        <Image
          src="/images/projects/Design1.png"
          alt="Design phase: 3D packaging configurator and visual design system"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ── Design Image 2: Digital Workspace & Prototype Viewport ── */}
      <div className="relative w-full aspect-[1736/906] flex items-center justify-center">
        <Image
          src="/images/projects/Design2.png"
          alt="Design phase: Digital layout architecture and interactive prototype"
          width={1736}
          height={906}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
