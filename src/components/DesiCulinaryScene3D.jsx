import React, { Suspense, useRef, useMemo, useState, useEffect, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Star Anise (Badian Khatai) Spice Component
 */
function StarAnise({ position, rotation, scale = 1 }) {
  const groupRef = useRef();

  // Create 8 star petals
  const petals = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: (i * Math.PI * 2) / 8,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += 0.004;
    groupRef.current.rotation.y += 0.006;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Center hub */}
      <mesh castShadow>
        <sphereGeometry args={[0.15, 12, 10]} />
        <meshStandardMaterial color="#4a2511" roughness={0.7} />
      </mesh>
      {/* 8 boat-shaped pods */}
      {petals.map((p, idx) => (
        <group key={idx} rotation={[0, p.angle, 0]}>
          <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
            <cylinderGeometry args={[0.07, 0.04, 0.38, 8]} />
            <meshStandardMaterial color="#5a2d13" roughness={0.65} />
          </mesh>
          {/* Seed inside pod */}
          <mesh position={[0.26, 0.04, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#c59b6d" roughness={0.3} metalness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * 3D Whole Red Dried Chili (Gol Lal Mirch)
 */
function DriedChili({ position, rotation, scale = 1 }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.007;
    meshRef.current.rotation.z += 0.005;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Chili Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.16, 0.55, 12]} />
        <meshStandardMaterial color="#991515" roughness={0.28} metalness={0.08} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.32, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.18, 8]} />
        <meshStandardMaterial color="#3e4a28" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * 3D Green Cardamom Pod (Hari Elaichi)
 */
function CardamomPod({ position, rotation, scale = 1 }) {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.006;
    meshRef.current.rotation.y += 0.008;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow>
      <sphereGeometry args={[0.18, 16, 12]} />
      <meshStandardMaterial color="#68783d" roughness={0.5} metalness={0.05} />
    </mesh>
  );
}

/**
 * 3D Fresh Coriander / Mint Leaf
 */
function CorianderLeaf({ position, rotation, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(t * 1.2 + position[0]) * 0.2;
    meshRef.current.position.y += Math.sin(t * 0.8 + position[2]) * 0.0015;
  });

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.42, 0.32, 6, 6);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, -Math.sin(x * 3) * 0.05 - y * y * 0.2);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color="#2e7d32"
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Traditional Royal Brass / Copper Handi (Deg) Centerpiece
 */
function TraditionalBrassHandi() {
  const handiRef = useRef();

  useFrame((state, delta) => {
    if (!handiRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating simmer
    handiRef.current.position.y = Math.sin(t * 1.1) * 0.06;
    handiRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={handiRef} position={[0, -0.2, 0]}>
      {/* Handi Belly (Traditional rounded cauldron) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.5, 36, 24, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65]} />
        <meshStandardMaterial
          color="#b86b2d"
          roughness={0.25}
          metalness={0.78}
        />
      </mesh>

      {/* Handi Neck & Flared Lip */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[1.2, 0.95, 0.32, 36]} />
        <meshStandardMaterial
          color="#c87834"
          roughness={0.28}
          metalness={0.75}
        />
      </mesh>

      {/* Flared Brass Rim */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <torusGeometry args={[1.22, 0.08, 16, 48]} />
        <meshStandardMaterial
          color="#e08e45"
          roughness={0.2}
          metalness={0.82}
        />
      </mesh>

      {/* Sizzling Desi Murgh Chanay Curry & Desi Ghee Tarka Surface */}
      <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.15, 36]} />
        <meshStandardMaterial
          color="#c84e1b"
          roughness={0.32}
          metalness={0.15}
        />
      </mesh>

      {/* Golden Desi Ghee Tarka Sheen */}
      <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 24]} />
        <meshStandardMaterial
          color="#df8a28"
          roughness={0.18}
          metalness={0.25}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Fresh Garnish on top: Ginger Juliennes & Sliced Green Chilies */}
      <mesh position={[0.2, 0.5, 0.15]} rotation={[0, 0.6, 0]}>
        <boxGeometry args={[0.35, 0.03, 0.04]} />
        <meshStandardMaterial color="#f5e6b5" roughness={0.4} />
      </mesh>
      <mesh position={[-0.25, 0.5, -0.1]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.03, 0.04]} />
        <meshStandardMaterial color="#f5e6b5" roughness={0.4} />
      </mesh>

      {/* Green Chili Ring */}
      <mesh position={[-0.1, 0.51, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.03, 8, 16]} />
        <meshStandardMaterial color="#388e3c" roughness={0.3} />
      </mesh>

      {/* Coriander Sprig on Tarka */}
      <CorianderLeaf position={[0.15, 0.52, -0.1]} rotation={[-Math.PI / 2, 0, 0.8]} scale={0.7} />
      <CorianderLeaf position={[-0.18, 0.52, 0.05]} rotation={[-Math.PI / 2, 0, -1.2]} scale={0.65} />
    </group>
  );
}

/**
 * Live Rising Golden Tarka & Wood Embers
 */
function TarkaSparks({ count = 65 }) {
  const pointsRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      spd[i] = Math.random() * 0.4 + 0.25;
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
      pos[i * 3 + 1] += speeds[i] * 0.016;
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 2.5) * 0.003;

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
        size={0.075}
        color="#ffa726"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Camera Parallax Rig
 */
function CameraRig({ isMobile }) {
  useFrame((state, delta) => {
    if (isMobile) return;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.75, delta * 2.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2.2 + state.pointer.y * 0.45, delta * 2.2);
    state.camera.lookAt(0, 0.1, 0);
  });
  return null;
}

export default function DesiCulinaryScene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="pizza-scene-wrapper" aria-label="3D Desi Culinary Atmosphere with Floating Spices">
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{
            position: [0, 2.2, isMobile ? 5.8 : 4.6],
            fov: isMobile ? 52 : 44,
          }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
        >
          <CameraRig isMobile={isMobile} />

          {/* Warm Ambient Heritage Lighting */}
          <ambientLight intensity={1.25} color="#fff8e7" />

          {/* Warm Golden Key Light */}
          <directionalLight
            position={[5, 7, 5]}
            intensity={2.2}
            color="#ffe0b2"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Sizzling Tarka Hearth Glow */}
          <directionalLight
            position={[-4, 2, -3]}
            intensity={1.9}
            color="#ff6f00"
          />

          {/* Soft Fill */}
          <directionalLight
            position={[-3, 4, 3]}
            intensity={0.6}
            color="#e0e8f0"
          />

          {/* Central Royal Brass Handi (No Pizza!) */}
          <TraditionalBrassHandi />

          {/* Floating 3D Aromatic Spices (Kumo Matcha Parallax Atmosphere) */}
          <StarAnise position={[-3.2, 1.4, -0.8]} scale={0.95} />
          <StarAnise position={[3.4, -1.1, -0.5]} scale={0.88} />
          <StarAnise position={[-2.4, -1.8, 0.6]} scale={0.75} />

          <DriedChili position={[-3.6, -0.4, -1.2]} rotation={[0.4, 0.8, -0.3]} scale={1.1} />
          <DriedChili position={[3.1, 1.6, -0.9]} rotation={[-0.3, 1.2, 0.5]} scale={1.05} />
          <DriedChili position={[2.6, -1.9, 0.4]} rotation={[0.8, -0.5, 0.2]} scale={0.9} />

          <CardamomPod position={[-2.8, 1.9, -1.5]} scale={1.1} />
          <CardamomPod position={[3.8, 0.3, -1.2]} scale={1.0} />
          <CardamomPod position={[-3.5, -1.2, -0.3]} scale={0.95} />
          <CardamomPod position={[2.2, 2.2, -1.6]} scale={0.9} />

          <CorianderLeaf position={[-3.0, 0.8, 0.2]} rotation={[0.2, 0.5, 0.1]} scale={1.2} />
          <CorianderLeaf position={[3.5, -0.5, 0.1]} rotation={[-0.3, 0.8, -0.4]} scale={1.1} />
          <CorianderLeaf position={[-2.1, 2.4, -0.9]} rotation={[0.4, -0.3, 0.7]} scale={1.0} />
          <CorianderLeaf position={[2.7, 1.9, -0.5]} rotation={[-0.5, 0.4, 0.3]} scale={1.15} />

          {/* Rising Golden Tarka Embers */}
          <TarkaSparks count={60} />

          {/* Contact Shadow Under Handi */}
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.75}
            scale={7}
            blur={2.4}
            far={3.5}
            color="#2a1205"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
