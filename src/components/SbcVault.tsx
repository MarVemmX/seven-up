"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type BrandItem = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  labelPath: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  tags: string[];
  description: string;
  specDetails: {
    origin: string;
    flavorPillars: string;
    temperature: string;
    fizzLevel: string;
  };
};

const BRANDS: BrandItem[] = [
  {
    id: "pepsi",
    name: "Pepsi Cola",
    badge: "The Bold Standard",
    tagline: "Bold, Crisp, Unrivaled Cola Freshness",
    labelPath: "/labels/pepsi.jpg",
    accentColor: "#004B93",
    glowColor: "rgba(0, 75, 147, 0.4)",
    bgGradient: "from-blue-900/60 via-blue-950/80 to-slate-950",
    tags: ["Classic Cola", "Citrus Undertones", "Ice Cold Snap"],
    description:
      "Engineered for maximum refreshment. Pepsi delivers an iconic caramelized bite balanced with crisp, bright citrus notes and a signature bold fizz that stands alone.",
    specDetails: {
      origin: "Iconic Formula",
      flavorPillars: "Caramel, Citrus, Kola Nut",
      temperature: "Best served at 3°C - 4°C",
      fizzLevel: "High Crisp Carbonation",
    },
  },
  {
    id: "sevenUp",
    name: "7UP (Seven Up)",
    badge: "The Original Uncola",
    tagline: "100% Natural Lemon & Lime Clarity",
    labelPath: "/labels/sevenup.jpg",
    accentColor: "#008B44",
    glowColor: "rgba(0, 139, 68, 0.4)",
    bgGradient: "from-emerald-900/60 via-emerald-950/80 to-slate-950",
    tags: ["100% Natural Lemon", "Key Lime Zest", "Zero Caffeine"],
    description:
      "The benchmark of citrus refreshment. 7UP blends real lemon and zesty lime oils into an invigorating, crystal-clear carbonated sparkle that resets your palate effortlessly.",
    specDetails: {
      origin: "Since 1929",
      flavorPillars: "Meyer Lemon, Lime Zest, Pure Cane Note",
      temperature: "Best served chilled over ice",
      fizzLevel: "Micro-Bubble Clarity",
    },
  },
  {
    id: "mountainDew",
    name: "Mountain Dew",
    badge: "Do The Dew",
    tagline: "Exhilarating Citrus Rush & High Energy",
    labelPath: "/labels/mountaindew.jpg",
    accentColor: "#1B5E20",
    glowColor: "rgba(118, 255, 3, 0.35)",
    bgGradient: "from-lime-950/60 via-green-950/80 to-slate-950",
    tags: ["Neon Citrus", "Adrenaline Kick", "Peak Attitude"],
    description:
      "A high-octane citrus blast engineered to charge your senses. Mountain Dew delivers a bold, punchy green taste that fuels adventurers, gamers, and adrenaline seekers.",
    specDetails: {
      origin: "Electrifying Blend",
      flavorPillars: "Neon Citrus, Tangy Punch, Pure Thrill",
      temperature: "Sub-zero chilled",
      fizzLevel: "Maximum High Impact Fizz",
    },
  },
  {
    id: "mirinda",
    name: "Mirinda Orange",
    badge: "Fruity Spark",
    tagline: "Sunburst Orange Effervescence & Joy",
    labelPath: "/labels/mirinda.jpg",
    accentColor: "#D84315",
    glowColor: "rgba(216, 67, 21, 0.4)",
    bgGradient: "from-orange-950/60 via-amber-950/80 to-slate-950",
    tags: ["Sunburst Orange", "Juicy Sweetness", "Playful Bubbles"],
    description:
      "An exuberant burst of sweet, sun-ripened orange delight. Mirinda infuses vibrant carbonation with authentic juicy citrus flavor for a lively, effervescent fruit party.",
    specDetails: {
      origin: "Sun-Kissed Fruit",
      flavorPillars: "Valencia Orange, Sweet Nectar, Tangy Zing",
      temperature: "Cold & bubbly",
      fizzLevel: "Sparkling Effervescence",
    },
  },
  {
    id: "drPepper",
    name: "Dr Pepper",
    badge: "Always One of a Kind",
    tagline: "23 Authentic Secret Flavors in Harmony",
    labelPath: "/labels/DrPepper.jpg",
    accentColor: "#5C061A",
    glowColor: "rgba(92, 6, 26, 0.45)",
    bgGradient: "from-rose-950/60 via-red-950/80 to-slate-950",
    tags: ["23 Secret Flavors", "Dark Plum & Cherry", "Smooth Vanilla"],
    description:
      "The oldest major soft drink in America and a legendary global sensation. An incomparable, proprietary blend of 23 secret flavors creating an indulgent, velvety profile.",
    specDetails: {
      origin: "Created in 1885",
      flavorPillars: "Dark Cherry, Vanilla, Spices, Licorice Note",
      temperature: "Cold or over crushed ice",
      fizzLevel: "Deep Velvety Carbonation",
    },
  },
];

export default function SbcVault() {
  const [selectedBrand, setSelectedBrand] = useState<BrandItem>(BRANDS[0]);

  return (
    <section
      id="specs"
      className="relative z-40 overflow-hidden bg-gradient-to-b from-[#001428] via-[#000E1C] to-[#001D3D] py-28 text-white px-4 md:px-8"
    >
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
        style={{ backgroundColor: selectedBrand.accentColor }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-emerald-300 backdrop-blur-md">
            <span>✨</span> 7UP Bottling Co. Portfolio Vault
          </span>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Five Legendary Drinks.
            <span className="block bg-gradient-to-r from-yellow-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
              One Unrivaled Master Bottler.
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed font-normal">
            Seven-Up Bottling Company Plc proudly crafts and distributes the planet&apos;s most sought-after refreshment brands.
            Select any beverage to inspect its official label and flavor anatomy.
          </p>
        </div>

        {/* 5-Brand Interactive Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {BRANDS.map((brand) => {
            const isSelected = selectedBrand.id === brand.id;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={clsx(
                  "relative flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md",
                  isSelected
                    ? "bg-white text-sky-950 scale-105 shadow-xl ring-4 ring-yellow-400/40"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                )}
              >
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: brand.accentColor }}
                />
                {brand.name}
              </button>
            );
          })}
        </div>

        {/* Selected Brand Feature Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-2xl shadow-2xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left: High-Res Label Showcase */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div
                className="group relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  boxShadow: `0 20px 50px ${selectedBrand.glowColor}`,
                }}
              >
                <div className="relative aspect-[1280/687] w-full bg-black/40">
                  <Image
                    src={selectedBrand.labelPath}
                    alt={`${selectedBrand.name} Authentic Can Label`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    Official 7UP Bottling Co. Can Label
                  </span>
                  <a
                    href="#carousel"
                    className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
                  >
                    View in 3D Can Studio →
                  </a>
                </div>
              </div>

              {/* Badges / Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                {selectedBrand.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/85"
                  >
                    ✨ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Brand Story & Specifications */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: selectedBrand.accentColor }}
                >
                  {selectedBrand.badge}
                </span>
                <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  SBC Certified
                </span>
              </div>

              <h3 className="mt-3 text-3xl font-black text-white md:text-5xl">
                {selectedBrand.name}
              </h3>

              <p className="mt-2 text-lg font-bold text-yellow-300 italic">
                &quot;{selectedBrand.tagline}&quot;
              </p>

              <p className="mt-4 text-base text-white/80 leading-relaxed font-normal">
                {selectedBrand.description}
              </p>

              {/* Spec Details Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3.5 border-t border-white/10 pt-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
                    Heritage &amp; Formula
                  </span>
                  <span className="mt-1 text-sm font-extrabold text-white block">
                    {selectedBrand.specDetails.origin}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
                    Serving Temp
                  </span>
                  <span className="mt-1 text-sm font-extrabold text-white block">
                    {selectedBrand.specDetails.temperature}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
                    Carbonation Tone
                  </span>
                  <span className="mt-1 text-sm font-extrabold text-emerald-300 block">
                    {selectedBrand.specDetails.fizzLevel}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
                    Key Flavor Notes
                  </span>
                  <span className="mt-1 text-sm font-extrabold text-yellow-300 block">
                    {selectedBrand.specDetails.flavorPillars}
                  </span>
                </div>
              </div>

              {/* Interactive Direct CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#carousel"
                  className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-sky-950 shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all"
                >
                  Spin {selectedBrand.name} in 3D
                </a>
                <a
                  href="#hero"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all"
                >
                  Back to Hero Showcase
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
