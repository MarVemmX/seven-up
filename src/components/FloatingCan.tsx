"use client";

import { forwardRef, ReactNode, useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

import { SodaCanProps } from "@/components/SodaCan";
import GlassBottle from "@/components/GlassBottle";
import SodaBurst, { SodaBurstRef } from "@/components/SodaBurst";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  scale?: number;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FLAVOR_COLORS: Record<string, string> = {
  blackCherry: "#E30044",
  grape: "#9028A0",
  lemonLime: "#A1E000",
  strawberryLemonade: "#FF3B6B",
  watermelon: "#4AE04A",
};

const FloatingCan = forwardRef<THREE.Group, FloatingCanProps>(
  (
    {
      flavor = "blackCherry",
      scale,
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    const tiltGroupRef = useRef<THREE.Group>(null);
    const burstRef = useRef<SodaBurstRef>(null);
    const scaleGroupRef = useRef<THREE.Group>(null);

    // Mouse-follow parallax tilt effect
    useFrame((state, delta) => {
      if (!tiltGroupRef.current) return;
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      // Target rotation angles based on cursor offset
      const targetRotX = -mouseY * 0.25;
      const targetRotY = mouseX * 0.3;

      tiltGroupRef.current.rotation.x = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      tiltGroupRef.current.rotation.y = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    });

    const handlePointerOver = () => {
      if (scaleGroupRef.current) {
        gsap.to(scaleGroupRef.current.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.3,
          ease: "back.out(2)",
        });
      }
    };

    const handlePointerOut = () => {
      if (scaleGroupRef.current) {
        gsap.to(scaleGroupRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e: any) => {
      e.stopPropagation();
      if (scaleGroupRef.current) {
        gsap.fromTo(
          scaleGroupRef.current.rotation,
          { z: -0.2 },
          { z: 0.2, duration: 0.15, repeat: 3, yoyo: true, ease: "sine.inOut" }
        );
      }
      if (burstRef.current) {
        burstRef.current.trigger(
          [e.point.x || 0, e.point.y || 0, e.point.z || 0],
          FLAVOR_COLORS[flavor] || "#FFFFFF"
        );
      }
    };

    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          <group ref={tiltGroupRef}>
            <group
              ref={scaleGroupRef}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              onClick={handleClick}
            >
              {children}
              <GlassBottle flavor={flavor} scale={scale} />
            </group>
          </group>
          <SodaBurst ref={burstRef} />
        </Float>
      </group>
    );
  }
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
