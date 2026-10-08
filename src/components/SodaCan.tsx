"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

export const flavorTextures = {
  pepsi: "/labels/pepsi.jpg",
  sevenUp: "/labels/sevenup.jpg",
  mountainDew: "/labels/mountaindew.jpg",
  mirinda: "/labels/mirinda.jpg",
  drPepper: "/labels/DrPepper.jpg",
} as const;

export type FlavorKey = keyof typeof flavorTextures;

export function normalizeFlavor(flavor?: string): FlavorKey {
  if (!flavor) return "pepsi";
  const f = flavor.toLowerCase().replace(/[-_ ]/g, "");
  if (f.includes("pepsi") || f.includes("cherry")) return "pepsi";
  if (f.includes("seven") || f.includes("7") || f.includes("lemon")) return "sevenUp";
  if (f.includes("dew") || f.includes("mountain") || f.includes("grape")) return "mountainDew";
  if (f.includes("mirinda") || f.includes("orange") || f.includes("strawberry")) return "mirinda";
  if (f.includes("pepper") || f.includes("dr") || f.includes("water")) return "drPepper";
  return "pepsi";
}

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: FlavorKey | string;
  scale?: number;
};

export function SodaCan({
  flavor = "pepsi",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");

  const labels = useTexture(flavorTextures);

  // Fix upside-down labels for all textures
  Object.values(labels).forEach((tex) => {
    if (tex) {
      tex.flipY = false;
    }
  });

  const resolvedFlavor = normalizeFlavor(flavor);
  const label = labels[resolvedFlavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
