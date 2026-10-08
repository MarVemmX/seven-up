"use client";

import React from "react";
import Image from "next/image";

export default function AlikaHistory() {
  return (
    <section className="relative z-40 bg-[#006838] py-24 text-white px-6 md:px-12 border-y-2 border-white/20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Alika 7UP Figure Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[965/1629] border-4 border-white bg-black/30 p-2 shadow-2xl">
              <div className="relative size-full overflow-hidden bg-gradient-to-b from-emerald-800 to-green-950">
                <Image
                  src="/Alika.png"
                  alt="Alika 7UP - Iconic Figure in 7UP History"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 border border-white/40 bg-black/80 p-3 text-center backdrop-blur-md">
                <span className="block text-xs font-black tracking-widest uppercase text-yellow-300">
                  Alika 7UP
                </span>
                <span className="block text-[11px] font-bold text-white/80 uppercase tracking-wider">
                  The Historic Face of 7UP
                </span>
              </div>
            </div>
          </div>

          {/* Right: History & Heritage Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-yellow-300">
              An Important Part of 7UP History
            </span>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
              Alika &amp; The 7UP Legacy
            </h2>

            <div className="mt-6 border-l-4 border-yellow-400 pl-4 py-1">
              <p className="text-lg md:text-xl font-bold italic text-white/95">
                &quot;The Difference is Clear.&quot;
              </p>
              <p className="text-xs font-semibold text-yellow-300 uppercase tracking-widest mt-1">
                The Iconic Voice of a Generation
              </p>
            </div>

            <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed font-normal">
              In the golden era of 7UP advertising across Nigeria and West Africa, <strong>Alika</strong> became an unforgettable household icon.
              With his signature cool persona, glasses, and unmistakable wit, Alika brought the crisp, uplifting spirit of 7UP into millions of homes.
            </p>

            <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed font-normal">
              Representing optimism, humor, and pure refreshment, Alika remains an enduring symbol of Seven-Up Bottling Company&apos;s rich cultural heritage.
            </p>

            {/* Sharp Cards Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
