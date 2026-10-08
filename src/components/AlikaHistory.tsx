"use client";

import React from "react";
import Image from "next/image";

export default function AlikaHistory() {
  return (
    <section className="relative z-40 bg-[#006838] py-14 sm:py-20 md:py-24 text-white px-4 sm:px-6 md:px-12 border-y-2 border-white/20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 items-center">
          {/* Left: Alika 7UP Figure Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-sm aspect-[965/1629] border-4 border-white bg-black/30 p-2 shadow-2xl">
              <div className="relative size-full overflow-hidden bg-gradient-to-b from-emerald-800 to-green-950">
                <Image
                  src="/Alika.png"
                  alt="Alika 7UP - Iconic Figure in 7UP History"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  priority
                />
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 border border-white/40 bg-black/80 p-2.5 sm:p-3 text-center backdrop-blur-md">
                <span className="block text-xs font-black tracking-widest uppercase text-yellow-300">
                  Alika 7UP
                </span>
                <span className="block text-[10px] sm:text-[11px] font-bold text-white/80 uppercase tracking-wider">
                  The Historic Face of 7UP
                </span>
              </div>
            </div>
          </div>

          {/* Right: History & Heritage Story */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
              An Important Part of 7UP History
            </span>

            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Alika &amp; The 7UP Legacy
            </h2>

            <div className="mt-4 sm:mt-6 border-l-4 border-yellow-400 pl-4 py-1 text-left">
              <p className="text-base sm:text-lg md:text-xl font-bold italic text-white/95">
                &quot;The Difference is Clear.&quot;
              </p>
              <p className="text-xs font-semibold text-yellow-300 uppercase tracking-widest mt-1">
                The Iconic Voice of a Generation
              </p>
            </div>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal text-left">
              In the golden era of 7UP advertising across Nigeria and West Africa, <strong>Alika</strong> became an unforgettable household icon.
              With his signature cool persona, glasses, and unmistakable wit, Alika brought the crisp, uplifting spirit of 7UP into millions of homes.
            </p>

            <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed font-normal text-left">
              Representing optimism, humor, and pure refreshment, Alika remains an enduring symbol of Seven-Up Bottling Company&apos;s rich cultural heritage.
            </p>

            {/* Sharp Cards Grid */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
              <div className="border border-white/30 bg-black/25 p-4 shadow-md">
                <span className="text-xs font-black uppercase tracking-wider text-yellow-300 block">
                  Cultural Icon
                </span>
                <span className="mt-1 text-sm font-bold text-white block">
                  The Face of 7UP Commercials
                </span>
              </div>
              <div className="border border-white/30 bg-black/25 p-4 shadow-md">
                <span className="text-xs font-black uppercase tracking-wider text-yellow-300 block">
                  Enduring Heritage
                </span>
                <span className="mt-1 text-sm font-bold text-white block">
                  Seven-Up Bottling Co. Archive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
