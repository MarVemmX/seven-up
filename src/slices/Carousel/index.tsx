"use client";

import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
  sub: string;
}[] = [
  {
    flavor: "pepsi",
    color: "#0B3C85",
    name: "Pepsi Cola",
    sub: "Bold & Refreshing • The Original Icon",
  },
  {
    flavor: "sevenUp",
    color: "#006B38",
    name: "7UP (Seven Up)",
    sub: "100% Natural Lemon-Lime • Crisp & Clear",
  },
  {
    flavor: "mountainDew",
    color: "#185818",
    name: "Mountain Dew",
    sub: "Exhilarating Citrus Blast • Charge Your Senses",
  },
  {
    flavor: "mirinda",
    color: "#C34A00",
    name: "Mirinda Orange",
    sub: "Intense Orange Burst • Fruity Spark",
  },
  {
    flavor: "drPepper",
    color: "#5C061A",
    name: "Dr Pepper",
    sub: "23 Authentic Flavors • One of a Kind",
  },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        sodaCanRef.current.scale,
        {
          x: 0.85,
          y: 0.85,
          z: 0.85,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "back.inOut(2)",
        },
        0,
      )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -20, opacity: 0, scale: 0.9 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(
        ".text-wrapper",
        { duration: 0.4, y: 0, opacity: 1, scale: 1, ease: "back.out(2)" },
        0.6,
      );
  }

  return (
    <section
      id="carousel"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid min-h-[100dvh] py-8 sm:py-12 md:h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#0B3C85] opacity-60 transition-colors" />

      <WavyCircles className="wavy-circles-outer wavy-circles-inner absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#0B3C85]" />

      <h2 className="relative text-center text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight px-4">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* Can */}
        <View className="aspect-square h-[52vmin] sm:h-[62vmin] md:h-[70vmin] min-h-36 cursor-grab active:cursor-grabbing">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* Right */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="text-area relative mx-auto text-center px-4 max-w-xl">
        <div className="text-wrapper tracking-wide">
          <p className="text-2xl sm:text-4xl md:text-6xl font-black text-white drop-shadow-md">
            {FLAVORS[currentFlavorIndex].name}
          </p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-base md:text-2xl font-bold uppercase tracking-wider text-yellow-300">
            {FLAVORS[currentFlavorIndex].sub}
          </p>
        </div>
        <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-medium opacity-90 leading-relaxed">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-10 sm:size-12 md:size-16 lg:size-18 border-2 border-white bg-black/40 p-2 sm:p-3 text-white opacity-90 transition-all duration-200 hover:scale-105 hover:bg-white hover:text-black active:scale-95 shadow-2xl"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
