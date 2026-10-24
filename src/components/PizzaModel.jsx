import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Creates authentic procedural canvas texture for the Neapolitan crust
 */
function createCrustTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0.0, '#d98b47');
  grad.addColorStop(0.2, '#e8a863');
  grad.addColorStop(0.5, '#ce7b38');
  grad.addColorStop(0.8, '#e09a54');
  grad.addColorStop(1.0, '#d98b47');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Semolina flour dusting
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const r = Math.random() * 1.8 + 0.4;
    ctx.fillStyle = `rgba(255, 248, 235, ${Math.random() * 0.22 + 0.05})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Neapolitan wood-fired charred maculatura blisters
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const radius = Math.random() * 14 + 3;
    const innerRadius = radius * (Math.random() * 0.4 + 0.4);

    const charGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    charGrad.addColorStop(0.0, '#1c0f08');
    charGrad.addColorStop(innerRadius / radius, '#3a190b');
    charGrad.addColorStop(0.8, '#703013');
    charGrad.addColorStop(1.0, 'transparent');

    ctx.fillStyle = charGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Creates tomato sauce base texture with herbs and olive oil
 */
function createSauceTexture(isTruffle = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (isTruffle) {
    // White / crema di funghi base for Truffle pizza
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    grad.addColorStop(0.0, '#dfd5c4');
    grad.addColorStop(0.6, '#c5b7a0');
    grad.addColorStop(1.0, '#9c8d75');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  } else {
    // Rich San Marzano sauce
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
    grad.addColorStop(0.0, '#a62413');
    grad.addColorStop(0.6, '#911b0c');
    grad.addColorStop(1.0, '#6e1207');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
  }

  // Micro herb and pepper specks
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const dist = Math.hypot(x - 256, y - 256);
    if (dist < 240) {
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(38, 64, 25, 0.7)' : 'rgba(235, 120, 60, 0.4)';
      ctx.fillRect(x, y, Math.random() * 2 + 1, Math.random() * 2 + 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Basil Leaf Component
function BasilLeaf({ position, rotation, scale = 1 }) {
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.55, 0.32, 12, 8);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = -Math.sin((x + 0.27) * Math.PI / 0.55) * 0.08 - (y * y) * 0.35;
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh position={position} rotation={rotation} scale={scale} geometry={geometry} castShadow>
      <meshStandardMaterial
        color="#2e7d32"
        roughness={0.4}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Pepperoni / Salame Disc
function PepperoniDisc({ position, rotation, scale = 1 }) {
  const geometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.38, 0.36, 0.035, 32);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const dist = Math.sqrt(x * x + z * z);
        pos.setY(i, y + dist * 0.04);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh position={position} rotation={rotation} scale={scale} geometry={geometry} castShadow>
      <meshStandardMaterial
        color="#b03120"
        roughness={0.38}
        metalness={0.08}
      />
    </mesh>
  );
}

// Mushroom Slice
function MushroomSlice({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.03, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#6d5e52" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[0.09, 0.03, 0.14]} />
        <meshStandardMaterial color="#9c8c7e" roughness={0.65} />
      </mesh>
    </group>
  );
}

// Cherry Tomato Half
function CherryTomato({ position, rotation, scale = 1 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      <meshStandardMaterial color="#c62828" roughness={0.2} metalness={0.1} />
    </mesh>
  );
}

// Whole Burrata Crown (for Burrata Garden variant)
function BurrataCrown({ position = [0, 0.25, 0] }) {
  return (
    <group position={position}>
      {/* Plump creamy mozzarella dome */}
      <mesh castShadow>
        <sphereGeometry args={[0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
        <meshStandardMaterial color="#fffef7" roughness={0.25} metalness={0.02} />
      </mesh>
      {/* Burrata knot / tied top */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 0.16, 16]} />
        <meshStandardMaterial color="#f7f3e4" roughness={0.3} />
      </mesh>
      {/* Balsamic drizzle drops */}
      <mesh position={[0.22, 0.25, 0.2]} rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#1a120b" roughness={0.1} metalness={0.2} />
      </mesh>
      <mesh position={[-0.2, 0.28, -0.15]}>
        <sphereGeometry args={[0.04, 12, 8]} />
        <meshStandardMaterial color="#1a120b" roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  );
}

export default function PizzaModel({ isMobile = false, variant = 'margherita' }) {
  const groupRef = useRef();
  const transitionRef = useRef(0);

  // Procedural textures
  const crustTexture = useMemo(() => createCrustTexture(), []);
  const redSauceTexture = useMemo(() => createSauceTexture(false), []);
  const whiteSauceTexture = useMemo(() => createSauceTexture(true), []);

  const activeSauceTexture = variant === 'truffle-mushroom' ? whiteSauceTexture : redSauceTexture;

  // Organic irregular Neapolitan cornicione
  const crustGeometry = useMemo(() => {
    const geom = new THREE.TorusGeometry(2.1, 0.38, 24, 64);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(y, x);
      const noise = Math.sin(angle * 7) * 0.04 + Math.cos(angle * 13) * 0.025;
      pos.setX(i, x + (x / 2.1) * noise);
      pos.setY(i, y + (y / 2.1) * noise);
      pos.setZ(i, z + noise * 0.8);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Cheese pools
  const cheesePools = useMemo(() => [
    { pos: [0.1, 0.06, 0.2], r: 0.9, angle: 0.2 },
    { pos: [-0.85, 0.06, -0.4], r: 0.75, angle: 1.1 },
    { pos: [0.95, 0.06, -0.6], r: 0.8, angle: -0.8 },
    { pos: [-0.6, 0.06, 0.8], r: 0.7, angle: 0.5 },
    { pos: [0.7, 0.06, 0.75], r: 0.78, angle: 2.1 },
    { pos: [0, 0.06, -1.05], r: 0.72, angle: -1.5 },
    { pos: [-1.15, 0.06, 0.2], r: 0.65, angle: 0.9 },
  ], []);

  // Toppings layouts based on active pizza variant
  const showPepperoni = variant === 'diavola';
  const showBurrata = variant === 'burrata-garden';
  const showMushrooms = variant === 'truffle-mushroom' || variant === 'margherita';
  const showTomatoes = variant !== 'truffle-mushroom';

  // Pepperoni coordinates
  const pepperonis = useMemo(() => [
    { pos: [-0.9, 0.1, 0.4], rot: [0.08, 0.4, -0.06], s: 1.05 },
    { pos: [0.85, 0.1, 0.35], rot: [-0.05, 1.2, 0.08], s: 0.98 },
    { pos: [0.1, 0.1, -0.95], rot: [0.07, -0.6, 0.05], s: 1.1 },
    { pos: [-0.4, 0.1, -0.75], rot: [-0.04, 2.1, -0.05], s: 1.0 },
    { pos: [0.95, 0.1, -0.65], rot: [0.05, -1.8, 0.04], s: 0.95 },
    { pos: [-0.2, 0.1, 0.95], rot: [-0.06, 0.8, -0.08], s: 1.05 },
    { pos: [0.65, 0.1, 1.05], rot: [0.08, -0.9, 0.05], s: 0.92 },
    { pos: [0.15, 0.1, 0.15], rot: [0.03, 1.5, -0.04], s: 1.08 },
    { pos: [-0.75, 0.1, -0.15], rot: [0.05, -0.8, 0.02], s: 1.0 },
  ], []);

  // Basil leaves
  const basilLeaves = useMemo(() => [
    { pos: [0.25, 0.14, 0.45], rot: [-Math.PI / 2 + 0.1, 0.3, 0.4], s: 1.1 },
    { pos: [-0.55, 0.13, 0.05], rot: [-Math.PI / 2 - 0.1, -0.4, 1.2], s: 1.0 },
    { pos: [0.45, 0.13, -0.4], rot: [-Math.PI / 2 + 0.15, 0.8, -0.6], s: 1.05 },
    { pos: [-0.3, 0.14, -0.85], rot: [-Math.PI / 2 - 0.08, -0.5, 2.1], s: 0.95 },
    { pos: [0.75, 0.13, 0.8], rot: [-Math.PI / 2 + 0.12, 0.2, -1.3], s: 0.9 },
    { pos: [-0.85, 0.14, 0.75], rot: [-Math.PI / 2 - 0.15, -0.2, 0.8], s: 0.95 },
  ], []);

  // Mushrooms
  const mushrooms = useMemo(() => [
    { pos: [-0.65, 0.11, 0.65], rot: [0, 0.8, 0], s: 1.05 },
    { pos: [0.4, 0.11, 0.85], rot: [0, -1.4, 0], s: 1.1 },
    { pos: [-0.15, 0.11, -0.35], rot: [0, 2.5, 0], s: 0.95 },
    { pos: [0.6, 0.11, -0.9], rot: [0, -0.3, 0], s: 1.15 },
    { pos: [-0.75, 0.11, -0.45], rot: [0, 1.2, 0], s: 1.0 },
    { pos: [0.1, 0.11, 0.55], rot: [0, -0.5, 0], s: 0.9 },
  ], []);

  const tomatoes = useMemo(() => [
    { pos: [0.55, 0.12, -0.1], rot: [0.1, 0, 0.1], s: 1.1 },
    { pos: [-0.45, 0.12, 0.45], rot: [-0.1, 0, 0.2], s: 1.0 },
    { pos: [-0.85, 0.12, -0.2], rot: [0, 0.1, -0.1], s: 0.95 },
    { pos: [0.2, 0.12, -0.7], rot: [0.15, 0.2, -0.1], s: 1.05 },
  ], []);

  // Trigger brief celebratory spin on variant change
  useEffect(() => {
    transitionRef.current = 1.0;
  }, [variant]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Fade out variant spin boost
    if (transitionRef.current > 0) {
      transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, 0, delta * 3);
    }

    // Sinusoidal float
    const floatY = Math.sin(time * 1.1) * 0.08;
    groupRef.current.position.y = floatY;

    if (!isMobile) {
      const targetRotX = 0.52 - state.pointer.y * 0.18;
      const targetRotZ = state.pointer.x * 0.14;
      const spinBoost = transitionRef.current * 1.8;
      const targetRotY = time * 0.15 + state.pointer.x * 0.25 + spinBoost;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3.5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2.5);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 3.5);
    } else {
      groupRef.current.rotation.x = 0.55;
      groupRef.current.rotation.y = time * 0.12;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Outer Neapolitan Cornicione */}
      <mesh
        geometry={crustGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          map={crustTexture}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* Dough Under-Disc */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.15, 2.15, 0.14, 48]} />
        <meshStandardMaterial color="#d4904d" roughness={0.9} />
      </mesh>

      {/* Sauce Base (Red or White Truffle) */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.02, 48]} />
        <meshStandardMaterial
          map={activeSauceTexture}
          roughness={0.42}
          metalness={0.04}
        />
      </mesh>

      {/* Melted Fior di Latte Mozzarella Pools */}
      {cheesePools.map((cheese, index) => (
        <mesh
          key={`cheese-${index}`}
          position={cheese.pos}
          rotation={[-Math.PI / 2, 0, cheese.angle]}
          scale={[1, 0.85, 1]}
          receiveShadow
        >
          <circleGeometry args={[cheese.r, 24]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#fbf6e2" : "#f5ebd0"}
            roughness={0.32}
            metalness={0.02}
          />
        </mesh>
      ))}

      {/* Spicy Pepperoni / Salame Discs (Diavola) */}
      {showPepperoni && pepperonis.map((pep, index) => (
        <PepperoniDisc
          key={`pep-${index}`}
          position={pep.pos}
          rotation={pep.rot}
          scale={pep.s}
        />
      ))}

      {/* Whole Burrata Crown (Burrata Garden) */}
      {showBurrata && <BurrataCrown position={[0, 0.22, 0]} />}

      {/* Sliced Forest Mushrooms (Truffle & Classic) */}
      {showMushrooms && mushrooms.map((mush, index) => (
        <MushroomSlice
          key={`mush-${index}`}
          position={mush.pos}
          rotation={mush.rot}
          scale={mush.s}
        />
      ))}

      {/* Cherry Tomatoes */}
      {showTomatoes && tomatoes.map((tom, index) => (
        <CherryTomato
          key={`tom-${index}`}
          position={tom.pos}
          rotation={tom.rot}
          scale={tom.s}
        />
      ))}

      {/* Fresh Basil Leaves */}
      {basilLeaves.map((basil, index) => (
        <BasilLeaf
          key={`basil-${index}`}
          position={basil.pos}
          rotation={basil.rot}
          scale={basil.s}
        />
      ))}
    </group>
  );
}
