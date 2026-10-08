"use client";

import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type SodaBurstRef = {
  trigger: (position?: THREE.Vector3 | [number, number, number], color?: string) => void;
};

const PARTICLE_COUNT = 40;
const tempObject = new THREE.Object3D();

const SodaBurst = forwardRef<SodaBurstRef, {}>((_, ref) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, () => ({
      pos: new THREE.Vector3(0, 0, 0),
      vel: new THREE.Vector3(0, 0, 0),
      size: Math.random() * 0.05 + 0.02,
      life: 0,
      maxLife: Math.random() * 0.5 + 0.3,
    }))
  );

  const [active, setActive] = useState(false);
  const [burstColor, setBurstColor] = useState<string>("#ffffff");

  // Zero out all particle instance matrices on mount so no giant default spheres appear
  useEffect(() => {
    if (!meshRef.current) return;
    tempObject.scale.set(0, 0, 0);
    tempObject.updateMatrix();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useImperativeHandle(ref, () => ({
    trigger: (pos = [0, 0, 0], color = "#ffffff") => {
      setBurstColor(color);
      const origin = Array.isArray(pos) ? new THREE.Vector3(...pos) : pos;

      particles.forEach((p) => {
        p.pos.copy(origin);
        p.vel.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.2) * 4 + 1.5,
          (Math.random() - 0.5) * 3
        );
        p.life = 1.0;
      });

      if (ringRef.current) {
        ringRef.current.position.copy(origin);
        ringRef.current.scale.set(0.05, 0.05, 0.05);
        (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8;
      }

      setActive(true);
    },
  }));

  useFrame((_, delta) => {
    if (!active) return;

    let stillAlive = false;

    particles.forEach((p, i) => {
      if (p.life > 0) {
        stillAlive = true;
        p.life -= delta / p.maxLife;

        // Apply gravity
        p.vel.y -= 9.8 * delta * 0.4;
        p.pos.addScaledVector(p.vel, delta);

        tempObject.position.copy(p.pos);
        const scaleProgress = Math.max(0, p.life);
        tempObject.scale.setScalar(p.size * scaleProgress);
        tempObject.updateMatrix();

        meshRef.current?.setMatrixAt(i, tempObject.matrix);
      } else {
        tempObject.scale.set(0, 0, 0);
        tempObject.updateMatrix();
        meshRef.current?.setMatrixAt(i, tempObject.matrix);
      }
    });

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (ringRef.current) {
      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      if (ringMat.opacity > 0) {
        ringRef.current.scale.addScalar(delta * 3);
        ringMat.opacity = Math.max(0, ringMat.opacity - delta * 1.5);
      }
    }

    if (!stillAlive) {
      setActive(false);
    }
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color={burstColor}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial
          color={burstColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
});

SodaBurst.displayName = "SodaBurst";

export default SodaBurst;
