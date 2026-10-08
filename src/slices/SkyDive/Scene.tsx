"use client";

import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, Sky, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    if (
      !cloudsRef.current ||
      !canRef.current ||
      !wordsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      return;

    // Set initial positions
    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, {
      ...getXYPositions(-4),
    });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(7), z: 2 },
    );

    // Spinning can
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTl
      .to("body", {
        background: "linear-gradient(180deg, #0284c7 0%, #38bdf8 45%, #7dd3fc 75%, #bae6fd 100%)",
        overwrite: "auto",
        duration: 0.1,
      })
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      // Phase 1: Swoop into view from upper right towards center-left
      .to(
        canRef.current.position,
        {
          x: -0.4,
          y: 0.3,
          z: 0.5,
          duration: 0.35,
          ease: "power2.out",
        },
        0,
      )
      .to(
        canRef.current.rotation,
        {
          z: -0.25,
          duration: 0.35,
          ease: "power2.out",
        },
        0,
      )
      // Text Fly-through
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      // Phase 2: Smooth Trajectory Change - curve right and bank upward
      .to(
        canRef.current.position,
        {
          x: 1.3,
          y: -0.3,
          z: 0,
          duration: 0.35,
          ease: "sine.inOut",
        },
        0.35,
      )
      .to(
        canRef.current.rotation,
        {
          z: 0.4,
          duration: 0.35,
          ease: "sine.inOut",
        },
        0.35,
      )
      // Phase 3: Smooth Exit Dive - swooping out through the lower-left clouds
      .to(
        canRef.current.position,
        {
          x: -3.2,
          y: -4.5,
          z: -3,
          duration: 0.45,
          ease: "power2.in",
        },
        0.7,
      )
      .to(
        canRef.current.rotation,
        {
          z: -0.55,
          duration: 0.45,
          ease: "power2.in",
        },
        0.7,
      )
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 }, 0.6);
  });

  return (
    <group ref={groupRef}>
      {/* Real 3D Physical Atmosphere Sky */}
      <Sky
        distance={450000}
        sunPosition={[100, 40, 100]}
        inclination={0}
        azimuth={0.25}
        turbidity={8}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
        >
          <pointLight intensity={30} color="#8C0413" decay={0.6} />
        </FloatingCan>
      </group>

      {/* Volumetric Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud
          ref={cloud1Ref}
          bounds={[12, 10, 3]}
          volume={6}
          color="#ffffff"
          opacity={0.9}
          segments={40}
          concentrate="inside"
        />
        <Cloud
          ref={cloud2Ref}
          bounds={[15, 12, 4]}
          volume={8}
          color="#f0f9ff"
          opacity={0.85}
          segments={35}
        />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/* Real Sun & Atmospheric Lights */}
      <directionalLight position={[20, 40, 20]} intensity={3.5} color="#FFF7ED" castShadow />
      <ambientLight intensity={1.5} color="#BAE6FD" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
}
