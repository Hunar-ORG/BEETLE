"use client";

import Image from "next/image";

export function DiscoverVisual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full">
      {/* ── Discover Image 1: Market Intelligence & Insights ── */}
      <div className="relative w-full aspect-[1536/1024] flex items-center justify-center">
        <Image
          src="/images/projects/discover1.png"
          alt="Discovery research and market insights dashboard"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* ── Discover Image 2: Audience Mapping & Property Search ── */}
      <div className="relative w-full aspect-[1536/1024] flex items-center justify-center">
        <Image
          src="/images/projects/discover2.png"
          alt="Discovery audience mapping and property intelligence platform"
          width={1536}
          height={1024}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
          className="h-auto w-full object-contain select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
