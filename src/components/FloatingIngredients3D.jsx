import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Creates floating 3D ingredients and fire embers in the background
 * inspired by the Kumo Matcha interactive 3D experience.
 */

// Basil Leaf Geometry & Material
function SingleFloatingBasil({ initialPos, speed, rotSpeed }) {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.48, 0.28, 8, 6);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = -Math.sin((x + 0.24) * Math.PI / 0.48) * 0.07 - (y * y) * 0.3;
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = initialPos[1] + Math.sin(t * speed + initialPos[0]) * 0.35;
    meshRef.current.position.x = initialPos[0] + Math.cos(t * speed * 0.7) * 0.15;
    meshRef.current.rotation.x += rotSpeed[0];
    meshRef.current.rotation.y += rotSpeed[1];
    meshRef.current.rotation.z += rotSpeed[2];
  });

  return (
    <mesh ref={meshRef} position={initialPos} geometry={geometry}>
      <meshStandardMaterial
        color="#2e7d32"
        roughness={0.4}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating Cherry Tomato
function SingleFloatingTomato({ initialPos, speed, scale }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = initialPos[1] + Math.sin(t * speed + initialPos[2]) * 0.25;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.007;
  });

  return (
    <mesh ref={meshRef} position={initialPos} scale={scale}>
      <sphereGeometry args={[0.18, 16, 12]} />
      <meshStandardMaterial color="#c62828" roughness={0.25} metalness={0.12} />
    </mesh>
  );
}

// Glowing Warm Fire Embers drifting upward
function OvenEmbers({ count = 55 }) {
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;      // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;   // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;   // z
      spd[i] = Math.random() * 0.4 + 0.2;
    }
    return [pos, spd];
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * 0.015; // float upward
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 2) * 0.004; // subtle wave

      // reset when rising too high
      if (pos[i * 3 + 1] > 4.5) {
        pos[i * 3 + 1] = -4.5;
        pos[i * 3] = (Math.random() - 0.5) * 12;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.065}
        color="#ff9d42"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function FloatingIngredients3D({ variant = 'margherita' }) {
  // Configured 3D floating background elements
  const leaves = useMemo(() => [
    { pos: [-3.8, 1.8, -1.2], speed: 0.8, rotSpeed: [0.005, 0.01, 0.004] },
    { pos: [3.6, -1.2, -0.8], speed: 0.7, rotSpeed: [-0.006, 0.008, 0.005] },
    { pos: [-3.2, -2.1, 0.5], speed: 0.9, rotSpeed: [0.008, -0.007, 0.006] },
    { pos: [3.9, 2.1, -1.5], speed: 0.65, rotSpeed: [0.004, 0.009, -0.007] },
    { pos: [-2.2, 2.6, -2.0], speed: 0.75, rotSpeed: [-0.005, 0.007, 0.004] },
    { pos: [2.5, -2.5, -1.0], speed: 0.85, rotSpeed: [0.007, -0.006, 0.008] },
    { pos: [-4.2, -0.4, -2.2], speed: 0.6, rotSpeed: [0.006, 0.005, -0.004] },
    { pos: [4.1, 0.6, -1.8], speed: 0.72, rotSpeed: [-0.008, 0.006, 0.005] },
  ], []);

  const tomatoes = useMemo(() => [
    { pos: [-3.4, 0.4, -0.5], speed: 0.8, scale: 0.85 },
    { pos: [3.2, 1.2, -0.6], speed: 0.9, scale: 0.95 },
    { pos: [2.8, -1.8, 0.2], speed: 0.7, scale: 0.8 },
    { pos: [-2.6, -1.5, -1.2], speed: 0.85, scale: 0.75 },
  ], []);

  return (
    <group>
      {/* 3D Floating Basil Leaves */}
      {leaves.map((leaf, i) => (
        <SingleFloatingBasil
          key={`floating-leaf-${i}`}
          initialPos={leaf.pos}
          speed={leaf.speed}
          rotSpeed={leaf.rotSpeed}
        />
      ))}

      {/* 3D Floating Cherry Tomatoes */}
      {tomatoes.map((tom, i) => (
        <SingleFloatingTomato
          key={`floating-tom-${i}`}
          initialPos={tom.pos}
          speed={tom.speed}
          scale={tom.scale}
        />
      ))}

      {/* Ambient Wood-Fired Embers */}
      <OvenEmbers count={50} />
    </group>
  );
}
