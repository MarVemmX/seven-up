"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FlavorKey } from "@/components/SodaCan";

export const SBC_DRINKS = [
  {
    id: "pepsi",
    name: "Pepsi Cola",
    shortName: "Pepsi",
    flavorKey: "pepsi" as FlavorKey,
    labelImage: "/labels/pepsi.jpg",
    accentColor: "#004B93",
    bgColor: "#DCEEFB",
  },
  {
    id: "sevenUp",
    name: "7UP (Seven Up)",
    shortName: "7UP",
    flavorKey: "sevenUp" as FlavorKey,
    labelImage: "/labels/sevenup.jpg",
    accentColor: "#008B44",
    bgColor: "#DCFCE7",
  },
  {
    id: "mountainDew",
    name: "Mountain Dew",
    shortName: "Mountain Dew",
    flavorKey: "mountainDew" as FlavorKey,
    labelImage: "/labels/mountaindew.jpg",
    accentColor: "#1B5E20",
    bgColor: "#FEF9C3",
  },
  {
    id: "mirinda",
    name: "Mirinda Orange",
    shortName: "Mirinda",
    flavorKey: "mirinda" as FlavorKey,
    labelImage: "/labels/mirinda.jpg",
    accentColor: "#D84315",
    bgColor: "#FFEDD5",
  },
  {
    id: "drPepper",
    name: "Dr Pepper",
    shortName: "Dr Pepper",
    flavorKey: "drPepper" as FlavorKey,
    labelImage: "/labels/DrPepper.jpg",
    accentColor: "#5C061A",
    bgColor: "#FFE4E6",
  },
];

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Synchronize active section drink index as user scrolls, reported directly by pinned Scene timeline
  const handleFlavorIndexChange = useCallback((newIndex: number) => {
    setCurrentDrinkIndex(newIndex % SBC_DRINKS.length);
  }, []);

  const openModalFor = (index: number) => {
    setCurrentDrinkIndex(index % SBC_DRINKS.length);
    setIsModalOpen(true);
  };

  // Modal open animation
  useGSAP(() => {
    if (isModalOpen) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [isModalOpen]);

  // Keyboard shortcut to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const closeModal = () => {
    if (modalRef.current && backdropRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setIsModalOpen(false),
      });
    } else {
      setIsModalOpen(false);
    }
  };

  const activeDrink = SBC_DRINKS[currentDrinkIndex] || SBC_DRINKS[0];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-[#DCEEFB] text-sky-950 transition-colors duration-500"
    >
      <div>
        <div className="relative z-[100] grid">
          {/* Pinned 3D Can View - pointer-events-none ensures clicks reach underlying section can columns */}
          <View className="alternating-text-view pointer-events-none absolute left-0 top-0 h-screen w-full">
            <Scene
              currentFlavor={activeDrink.flavorKey}
              onFlavorIndexChange={handleFlavorIndexChange}
              onCanClick={() => setIsModalOpen(true)}
            />
          </View>

          {/* Sticky Header Inspection Button - always visible and clickable across all scroll spots */}
          <div className="pointer-events-none sticky top-6 z-[120] flex w-full justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="pointer-events-auto border-2 border-sky-950 bg-white/90 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-sky-950 shadow-2xl backdrop-blur-md transition-all hover:bg-sky-950 hover:text-white active:scale-95"
            >
              Click Can to Inspect {activeDrink.shortName} Label
            </button>
          </div>

          {/* Alternating Text Sections */}
          {slice.primary.text_group.map((item, index) => {
            const drink = SBC_DRINKS[index % SBC_DRINKS.length];
            const isCanOnRight = index % 2 === 0;

            return (
              <div
                key={asText(item.heading)}
                className="alternating-section relative grid h-screen place-items-center gap-x-12 md:grid-cols-2 pointer-events-none"
              >
                {/* Text Content Card */}
                <div
                  className={clsx(
                    isCanOnRight ? "col-start-1" : "md:col-start-2",
                    "pointer-events-auto border-2 border-black/15 bg-white/40 p-8 backdrop-blur-lg transition-transform hover:scale-[1.01] max-md:bg-white/50 shadow-xl",
                  )}
                >
                  <div className="mb-2 inline-block border border-sky-950/30 bg-white/60 px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest text-sky-900">
                    SBC Lineup • 0{index + 1}
                  </div>
                  <h2 className="text-balance text-4xl font-black uppercase md:text-5xl lg:text-6xl text-sky-950">
                    <PrismicText field={item.heading} />
                  </h2>
                  <div className="mt-4 text-lg font-medium leading-relaxed text-sky-900/90">
                    <PrismicRichText field={item.body} />
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => openModalFor(index)}
                      className="border-2 border-sky-950 bg-sky-950 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-white hover:text-sky-950 shadow-md active:scale-95"
                    >
                      Inspect {drink.shortName} Label
                    </button>
                  </div>
                </div>

                {/* Interactive Clickable Can Hit-Area in the Can Column - self-stretch to catch clicks across entire half */}
                <div
                  onClick={() => openModalFor(index)}
                  className={clsx(
                    isCanOnRight ? "md:col-start-2" : "md:col-start-1",
                    "pointer-events-auto flex h-full min-h-[60vh] w-full self-stretch justify-self-stretch cursor-pointer flex-col items-center justify-end pb-24 group select-none",
                  )}
                  title={`Click can to inspect ${drink.name} label`}
                >
                  <div className="border-2 border-sky-950 bg-white/90 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-sky-950 shadow-xl backdrop-blur-md transition-all group-hover:bg-sky-950 group-hover:text-white group-hover:scale-105 active:scale-95">
                    Click Can to Inspect {drink.shortName} Label
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Liquid Glass Label Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          {/* Liquid Glass Blurred Backdrop */}
          <div
            ref={backdropRef}
            onClick={closeModal}
            className="absolute inset-0 bg-sky-950/70 backdrop-blur-xl"
          />

          {/* Liquid Glass Panel with Sharp Borders */}
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl overflow-hidden border-2 border-white/40 bg-white/10 p-6 md:p-8 text-white backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 0 35px rgba(255, 255, 255, 0.12)",
            }}
          >
            {/* Liquid glass light sheen highlight */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-white/5" />
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Top Bar: Brand Spec Header & Close Button */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b-2 border-white/20 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="border border-white/40 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/90">
                    SBC Specification • 330ml Can
                  </span>
                  <span
                    className="border border-white/40 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: activeDrink.accentColor }}
                  >
                    {activeDrink.shortName}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                  {activeDrink.name} Label
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="flex items-center gap-2 border-2 border-white/60 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-sky-950 active:scale-95"
              >
                ✕ Close
              </button>
            </div>

            {/* Label Display with Liquid Glass Frame */}
            <div className="relative z-10 mt-6 overflow-hidden border-2 border-white/30 bg-black/40 shadow-2xl backdrop-blur-md">
              {/* Ambient backlight matching brand */}
              <div
                className="pointer-events-none absolute -inset-6 opacity-30 blur-2xl transition-all duration-500"
                style={{ backgroundColor: activeDrink.accentColor }}
              />

              {/* Authentic Soda Label Image */}
              <div className="relative aspect-[1280/687] w-full overflow-hidden bg-black/25">
                <img
                  src={activeDrink.labelImage}
                  alt={`${activeDrink.name} Official Label`}
                  className="h-full w-full object-contain block select-none"
                />

                {/* Liquid Glass Gloss Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-white/10" />
                <div className="pointer-events-none absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/15 to-transparent blur-xs -skew-y-3" />
              </div>
            </div>

            {/* Bottom Bar: Switch Label Tabs */}
            <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-white/20 pt-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                Switch Label:
              </span>
              <div className="flex flex-wrap gap-2">
                {SBC_DRINKS.map((drink, idx) => (
                  <button
                    key={drink.id}
                    onClick={() => setCurrentDrinkIndex(idx)}
                    className={clsx(
                      "border px-3 py-1.5 text-xs uppercase tracking-wider transition-all",
                      idx === currentDrinkIndex
                        ? "border-white bg-white font-black text-sky-950 shadow-md"
                        : "border-white/30 bg-white/10 font-bold text-white/80 hover:bg-white/25 hover:text-white",
                    )}
                  >
                    {drink.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default AlternatingText;
