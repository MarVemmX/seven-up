"use client";

import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[150] px-4 py-3 sm:px-6 sm:py-4 pointer-events-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Real 7UP Logo */}
        <a
          href="#"
          className="pointer-events-auto relative block h-10 w-24 sm:h-14 sm:w-32 md:h-20 md:w-44 transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/logo.png"
            alt="7UP"
            fill
            priority
            className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
          />
        </a>

        {/* Sharp Button */}
        <a
          href="#carousel"
          className="pointer-events-auto border-2 border-white bg-black/70 px-3.5 py-1.5 sm:px-6 sm:py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-95"
        >
          Explore Lineup
        </a>
      </div>
    </header>
  );
}
