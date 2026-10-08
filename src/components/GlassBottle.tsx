"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import {
  FlavorKey,
  flavorTextures,
  normalizeFlavor,
  SodaCanProps,
} from "@/components/SodaCan";

export const BOTTLE_CONFIGS: Record<
  FlavorKey,
  {
    glassColor: string;
    glassAttenuation: string;
    liquidColor: string;
    liquidTransmission: number;
    capColor: string;
    capRimColor: string;
  }
> = {
  sevenUp: {
    glassColor: "#007A3D", // Iconic vintage 7UP emerald green glass
    glassAttenuation: "#004822",
    liquidColor: "#A6FFB8", // Sparkling lemon-lime citrus fizz
    liquidTransmission: 0.85,
    capColor: "#D31027", // Iconic 7UP red crown cap
    capRimColor: "#E0E0E0",
  },
  pepsi: {
    glassColor: "#EAF3FB", // Crystal flint glass
    glassAttenuation: "#003366",
    liquidColor: "#1B0D05", // Rich deep cola
    liquidTransmission: 0.15,
    capColor: "#004B93", // Bold blue cap
    capRimColor: "#D0D0D0",
  },
  mountainDew: {
    glassColor: "#156322", // Forest green glass
    glassAttenuation: "#0D3815",
    liquidColor: "#99EE00", // Electric neon citrus
    liquidTransmission: 0.7,
    capColor: "#1B5E20",
    capRimColor: "#D0D0D0",
  },
  mirinda: {
    glassColor: "#FFF3E0", // Clear glass
    glassAttenuation: "#C34A00",
    liquidColor: "#FF5E00", // Sunburst orange
    liquidTransmission: 0.45,
    capColor: "#E65100",
    capRimColor: "#D0D0D0",
  },
  drPepper: {
    glassColor: "#2A1418", // Dark amber/ruby glass
    glassAttenuation: "#1F0A0E",
    liquidColor: "#33080F", // Deep burgundy
    liquidTransmission: 0.2,
    capColor: "#6B0D1A",
    capRimColor: "#D0D0D0",
  },
};

/**
 * Procedural 21-crimp crown bottle cap geometry
 */
function createCrownCapGeometry(): THREE.BufferGeometry {
  const segments = 84; // 21 flutes * 4 segments
  const geom = new THREE.CylinderGeometry(0.245, 0.265, 0.08, segments, 2, false);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < 0) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(z, x);
      const wave = Math.sin(angle * 21) * 0.012; // 21 flutes!
      const r = Math.sqrt(x * x + z * z);
      const newR = r + wave;
      pos.setX(i, Math.cos(angle) * newR);
      pos.setZ(i, Math.sin(angle) * newR);
    }
  }
  geom.computeVertexNormals();
  return geom;
}

export type GlassBottleProps = SodaCanProps;

export function GlassBottle({
  flavor = "sevenUp",
  scale = 0.82,
  ...props
}: GlassBottleProps) {
  const labels = useTexture(flavorTextures);

  // Ensure textures don't flip upside-down
  Object.values(labels).forEach((tex) => {
    if (tex) {
      tex.flipY = false;
    }
  });

  const resolvedFlavor = normalizeFlavor(flavor);
  const label = labels[resolvedFlavor];
  const config = BOTTLE_CONFIGS[resolvedFlavor] || BOTTLE_CONFIGS.sevenUp;

  // 1. Classic Contoured Bottle Glass Geometry (Outer + Inner Wall)
  const glassGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    // Outer profile (from base punt to top lip)
    points.push(new THREE.Vector2(0, -1.45));
    points.push(new THREE.Vector2(0.18, -1.48));
    points.push(new THREE.Vector2(0.38, -1.5));
    points.push(new THREE.Vector2(0.48, -1.48));
    points.push(new THREE.Vector2(0.53, -1.42));
    points.push(new THREE.Vector2(0.55, -1.3));
    points.push(new THREE.Vector2(0.55, -0.6));
    points.push(new THREE.Vector2(0.54, 0.0));
    points.push(new THREE.Vector2(0.53, 0.25));
    points.push(new THREE.Vector2(0.5, 0.45));
    points.push(new THREE.Vector2(0.44, 0.7));
    points.push(new THREE.Vector2(0.35, 0.95));
    points.push(new THREE.Vector2(0.26, 1.15));
    points.push(new THREE.Vector2(0.22, 1.3));
    points.push(new THREE.Vector2(0.21, 1.5));
    points.push(new THREE.Vector2(0.24, 1.58));
    points.push(new THREE.Vector2(0.255, 1.62));
    points.push(new THREE.Vector2(0.24, 1.66));
    points.push(new THREE.Vector2(0.22, 1.7));
    points.push(new THREE.Vector2(0.25, 1.74));
    points.push(new THREE.Vector2(0.24, 1.78));
    points.push(new THREE.Vector2(0.2, 1.8));

    // Inner profile (inner hollow wall for realistic glass refraction)
    points.push(new THREE.Vector2(0.15, 1.8));
    points.push(new THREE.Vector2(0.15, 1.7));
    points.push(new THREE.Vector2(0.15, 1.5));
    points.push(new THREE.Vector2(0.16, 1.3));
    points.push(new THREE.Vector2(0.2, 1.15));
    points.push(new THREE.Vector2(0.28, 0.95));
    points.push(new THREE.Vector2(0.37, 0.7));
    points.push(new THREE.Vector2(0.44, 0.45));
    points.push(new THREE.Vector2(0.47, 0.25));
    points.push(new THREE.Vector2(0.48, 0.0));
    points.push(new THREE.Vector2(0.48, -0.6));
    points.push(new THREE.Vector2(0.47, -1.3));
    points.push(new THREE.Vector2(0.42, -1.4));
    points.push(new THREE.Vector2(0.15, -1.4));
    points.push(new THREE.Vector2(0, -1.38));

    const geom = new THREE.LatheGeometry(points, 64);
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 2. Liquid Volume Inside Bottle
  const liquidGeometry = useMemo(() => {
    const liquidPoints: THREE.Vector2[] = [
      new THREE.Vector2(0, -1.37),
      new THREE.Vector2(0.41, -1.39),
      new THREE.Vector2(0.46, -1.29),
      new THREE.Vector2(0.47, -0.6),
      new THREE.Vector2(0.47, 0.0),
      new THREE.Vector2(0.46, 0.24),
      new THREE.Vector2(0.43, 0.44),
      new THREE.Vector2(0.36, 0.69),
      new THREE.Vector2(0.27, 0.94),
      new THREE.Vector2(0.19, 1.14),
      new THREE.Vector2(0.15, 1.29),
      new THREE.Vector2(0.14, 1.35),
      new THREE.Vector2(0, 1.35), // Top liquid level
    ];
    const geom = new THREE.LatheGeometry(liquidPoints, 48);
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 3. Label Band Geometry (wraps mid-bottle section)
  const labelGeometry = useMemo(() => {
    // Height: 0.95, radius matches body contour closely (0.552)
    const geom = new THREE.CylinderGeometry(0.535, 0.552, 0.95, 64, 1, true);
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 4. Crown Bottle Cap Geometry
  const crownCapGeometry = useMemo(() => createCrownCapGeometry(), []);

  // 5. Rising effervescent carbonation bubbles
  const bubbleCount = 45;
  const bubblesData = useMemo(() => {
    return Array.from({ length: bubbleCount }, () => {
      const radius = Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: -1.3 + Math.random() * 2.5,
        z: Math.sin(angle) * radius,
        speed: 0.4 + Math.random() * 0.6,
        size: 0.012 + Math.random() * 0.018,
      };
    });
  }, []);

  const bubblesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!bubblesRef.current) return;
    for (let i = 0; i < bubbleCount; i++) {
      const b = bubblesData[i];
      b.y += delta * b.speed;
      if (b.y > 1.32) {
        b.y = -1.3;
      }
      dummy.position.set(b.x, b.y, b.z);
      dummy.scale.setScalar(b.size);
      dummy.updateMatrix();
      bubblesRef.current.setMatrixAt(i, dummy.matrix);
    }
    bubblesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group {...props} scale={scale} rotation={[0, -Math.PI, 0]}>
      {/* Liquid Core */}
      <mesh geometry={liquidGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={config.liquidColor}
          transmission={config.liquidTransmission}
          roughness={0.1}
          ior={1.33} // Water/soda IOR
          thickness={0.8}
          transparent={true}
          opacity={0.92}
        />
      </mesh>

      {/* Sparkling Micro-Bubbles inside Liquid */}
      <instancedMesh
        ref={bubblesRef}
        args={[undefined, undefined, bubbleCount]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.65} />
      </instancedMesh>

      {/* Iconic Glass Bottle Shell (Physical Glass Transmission) */}
      <mesh geometry={glassGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={config.glassColor}
          attenuationColor={config.glassAttenuation}
          attenuationDistance={0.7}
          transmission={0.92}
          roughness={0.06}
          ior={1.52} // Real soda-lime glass IOR
          thickness={0.7}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          transparent={true}
          opacity={1.0}
        />
      </mesh>

      {/* Authentic Label Wrap on Bottle Body */}
      <mesh
        geometry={labelGeometry}
        position={[0, -0.15, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={label}
          roughness={0.25}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Metallic Crown Bottle Cap */}
      <group position={[0, 1.76, 0]}>
        {/* Crimped Skirt */}
        <mesh geometry={crownCapGeometry} castShadow receiveShadow>
          <meshStandardMaterial
            color={config.capColor}
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>
        {/* Cap Top Seal Disc */}
        <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.245, 32]} />
          <meshStandardMaterial
            color={config.capColor}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        {/* Inner Crimp Rim Highlight */}
        <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.23, 0.26, 32]} />
          <meshStandardMaterial
            color={config.capRimColor}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  );
}

export default GlassBottle;
