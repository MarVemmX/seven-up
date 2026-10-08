"use client";

import React from "react";
import Image from "next/image";

const BRANDS = [
  { name: "Pepsi Cola", color: "from-blue-700 to-blue-950", border: "border-blue-400/40", label: "Bold Standard" },
  { name: "7UP", color: "from-emerald-700 to-green-950", border: "border-emerald-400/40", label: "The Uncola" },
  { name: "Mountain Dew", color: "from-lime-700 to-green-950", border: "border-lime-400/40", label: "Do The Dew" },
  { name: "Mirinda", color: "from-orange-600 to-amber-950", border: "border-orange-400/40", label: "Fruity Spark" },
  { name: "Dr Pepper", color: "from-rose-900 to-red-950", border: "border-rose-400/40", label: "One of a Kind" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#001428] text-white pt-10 pb-8 sm:pt-14 sm:pb-12 border-t-2 border-white/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Brand Showcase Grid - Sharp Borders & Responsive Grid */}
        <div className="mb-10 sm:mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className={`border-2 ${brand.border} bg-gradient-to-b ${brand.color} p-3 sm:p-4 text-center shadow-lg transition-transform hover:-translate-y-1 last:col-span-2 sm:last:col-span-1`}
              >
                <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/70">
                  {brand.label}
                </span>
                <span className="mt-0.5 sm:mt-1 block text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-tight">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real 7UP Logo & Company Statement */}
        <div className="border-t border-white/20 pt-8 pb-6 sm:pt-10 sm:pb-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="relative h-12 w-28 sm:h-16 sm:w-36 md:h-20 md:w-48">
            <Image
              src="/logo.png"
              alt="7UP"
              fill
              className="object-contain"
            />
          </div>
          <p className="max-w-xl text-center md:text-right text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
            Seven-Up Bottling Company Plc. Bottling the world&apos;s most iconic beverages: Pepsi, 7UP, Mountain Dew, Mirinda, and Dr Pepper.
          </p>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-white/50 gap-2.5 sm:gap-3">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Seven-Up Bottling Company. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Pepsi, 7UP, Mountain Dew, Mirinda &amp; Dr Pepper are registered trademarks.
          </p>
        </div>
      </div>
    </footer>
  );
}
