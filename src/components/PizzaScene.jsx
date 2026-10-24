import React, { Suspense, useState, useEffect, Component, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import PizzaModel from './PizzaModel';
import FloatingIngredients3D from './FloatingIngredients3D';

/**
 * Error boundary for graceful 3D fallback
 */
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Pizza 3D Scene rendered fallback:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Smooth Camera Controller that introduces mouse parallax depth (Kumo Matcha style)
 */
function CameraRig({ isMobile }) {
  useFrame((state, delta) => {
    if (isMobile) return;
    // Parallax sway based on cursor
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.8, delta * 2.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2.8 + state.pointer.y * 0.5, delta * 2.5);
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
}

/**
 * Fallback visual when WebGL is unavailable
 */
function PizzaFallback({ isMobile }) {
  return (
    <div className="pizza-fallback-container">
      <div className="pizza-fallback-plate">
        <img
          src="/images/culinary-flatlay.png"
          alt="FORNO Artisan Pizza Culinary Board"
          className="pizza-fallback-img"
          loading="eager"
        />
        <div className="pizza-fallback-glow" />
      </div>
      <div className="pizza-fallback-badge">
        <span>Baked at 485°C</span>
      </div>
    </div>
  );
}

function SceneLoader() {
  return (
    <div className="pizza-scene-loader">
      <div className="scene-spinner" />
      <span className="scene-loader-text">Igniting the Fire...</span>
    </div>
  );
}

export default function PizzaScene({ variant = 'margherita' }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasWebGL) {
    return <PizzaFallback isMobile={isMobile} />;
  }

  return (
    <div className="pizza-scene-wrapper" aria-label="Interactive 3D Pizza and Floating Ingredients">
      <SceneErrorBoundary fallback={<PizzaFallback isMobile={isMobile} />}>
        <Suspense fallback={<SceneLoader />}>
          <Canvas
            shadows
            camera={{
              position: [0, 2.8, isMobile ? 5.6 : 4.8],
              fov: isMobile ? 50 : 42,
            }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
          >
            {/* Parallax Camera Controller */}
            <CameraRig isMobile={isMobile} />

            {/* Ambient Lighting */}
            <ambientLight intensity={1.2} color="#fffcf5" />

            {/* Warm Key Light */}
            <directionalLight
              position={[5, 7, 5]}
              intensity={2.0}
              color="#fff3e0"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={15}
              shadow-bias={-0.0001}
            />

            {/* Fireplace Hearth Rim Glow */}
            <directionalLight
              position={[-4, 2, -3]}
              intensity={1.8}
              color="#ff7b39"
            />

            {/* Soft Cool Counter-Fill */}
            <directionalLight
              position={[-3, 4, 3]}
              intensity={0.5}
              color="#d9e6f2"
            />

            {/* Floating Background 3D Ingredients & Fire Embers (Kumo Matcha Style) */}
            <FloatingIngredients3D variant={variant} />

            {/* Main Interactive 3D Pizza */}
            <PizzaModel isMobile={isMobile} variant={variant} />

            {/* Realistic Contact Shadow */}
            <ContactShadows
              position={[0, -1.05, 0]}
              opacity={0.65}
              scale={7.5}
              blur={2.4}
              far={3.5}
              color="#2a1a10"
            />
          </Canvas>
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
}
