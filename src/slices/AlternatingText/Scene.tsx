"use client";

import { Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FlavorKey } from "@/components/SodaCan";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DRINK_FLAVORS: FlavorKey[] = [
  "pepsi",
  "sevenUp",
  "mountainDew",
  "mirinda",
  "drPepper",
];

type Props = {
  currentFlavor?: FlavorKey;
  onFlavorIndexChange?: (index: number) => void;
  onCanClick?: () => void;
};

export default function Scene({
  currentFlavor = "pepsi",
  onFlavorIndexChange,
  onCanClick,
}: Props) {
  const canRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const [internalFlavor, setInternalFlavor] = useState<FlavorKey>(currentFlavor);
  const activeIdxRef = useRef(0);

  // Synchronize internal flavor with parent prop when explicitly changed
  useEffect(() => {
    if (currentFlavor && currentFlavor !== internalFlavor) {
      setInternalFlavor(currentFlavor);
      const idx = DRINK_FLAVORS.indexOf(currentFlavor);
      if (idx !== -1) {
        activeIdxRef.current = idx;
      }
    }
  }, [currentFlavor, internalFlavor]);

  const bgColors = ["#DCEEFB", "#DCFCE7", "#FEF9C3", "#FFEDD5", "#FFE4E6"];

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            // 5 distinct brand sections:
            // 0: Pepsi (0.00 - 0.18)
            // 1: 7UP (0.18 - 0.40)
            // 2: Mountain Dew (0.40 - 0.62)
            // 3: Mirinda (0.62 - 0.85)
            // 4: Dr Pepper (0.85 - 1.00)
            let idx = 0;
            if (p >= 0.85) idx = 4;
            else if (p >= 0.62) idx = 3;
            else if (p >= 0.40) idx = 2;
            else if (p >= 0.18) idx = 1;
            else idx = 0;

            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setInternalFlavor(DRINK_FLAVORS[idx]);
              onFlavorIndexChange?.(idx);
            }
          },
        },
      });

      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;

        const isOdd = index % 2 !== 0;

        const xPosition = isDesktop ? (isOdd ? -1 : 1) : 0;
        const yRotation = isDesktop ? (isOdd ? 0.4 : -0.4) : 0;
        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: yRotation + (isOdd ? Math.PI * 2 : -Math.PI * 2),
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
          });
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group
      ref={canRef}
      position-x={isDesktop ? 1 : 0}
      rotation-y={isDesktop ? -0.3 : 0}
      onClick={() => onCanClick?.()}
    >
      <FloatingCan flavor={internalFlavor} />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}
