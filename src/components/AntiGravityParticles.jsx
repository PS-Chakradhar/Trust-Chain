import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

function CursorParticle({ target, color, delay }) {
  const ref = useRef();
  const position = useRef([0, 0, 0]);
  
  useFrame(() => {
    if (ref.current) {
      position.current[0] += (target[0] - position.current[0]) * delay;
      position.current[1] += (target[1] - position.current[1]) * delay;
      position.current[2] += (target[2] - position.current[2]) * delay;
      
      ref.current.position.set(
        position.current[0],
        position.current[1],
        position.current[2]
      );
    }
  });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function TrailParticle({ target, color }) {
  const ref = useRef();
  const position = useRef([0, 0, 0]);
  
  useFrame(() => {
    if (ref.current) {
      position.current[0] += (target[0] - position.current[0]) * 0.15;
      position.current[1] += (target[1] - position.current[1]) * 0.15;
      position.current[2] += (target[2] - position.current[2]) * 0.15;
      
      ref.current.position.set(
        position.current[0],
        position.current[1],
        position.current[2]
      );
    }
  });
  
  return (
    <Trail
      width={0.5}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Trail>
  );
}

function ParticleField({ mousePosition }) {
  const particlesRef = useRef();
  const count = 50;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.94;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0.67;
      } else {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.53;
      }
    }
    
    return { positions, velocities, colors };
  }, []);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] += particles.velocities[i * 3];
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
      
      if (Math.abs(positions[i * 3]) > 7) particles.velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 7) particles.velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) particles.velocities[i * 3 + 2] *= -1;
      
      const dx = mousePosition.current[0] - positions[i * 3];
      const dy = mousePosition.current[1] - positions[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) * 0.002;
        positions[i * 3] -= dx * force;
        positions[i * 3 + 1] -= dy * force;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowingOrb({ position, color, speed }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
      ref.current.position.x = position[0] + Math.cos(t * speed * 0.7) * 0.3;
    }
  });
  
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={position} scale={1.3}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

function AntiGravityBackground() {
  const mouseRef = useRef([0, 0, 0]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = -(e.clientY / window.innerHeight - 0.5) * 10;
      mouseRef.current = [x, -y, 0];
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setMounted(true);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div style={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={1.2} />
        <pointLight position={[-5, -5, -5]} color="#ff00aa" intensity={0.6} />
        <pointLight position={[0, 0, 3]} color="#00ff88" intensity={0.4} />
        
        <ParticleField mousePosition={mouseRef} />
        
        <TrailParticle target={mouseRef.current} color="#00f0ff" />
        
        <GlowingOrb position={[-3, 1.5, -2]} color="#00f0ff" speed={1} />
        <GlowingOrb position={[3, -1, -2]} color="#ff00aa" speed={0.8} />
        <GlowingOrb position={[-1, -2, -3]} color="#00ff88" speed={1.2} />
        <GlowingOrb position={[2, 2, -4]} color="#00f0ff" speed={0.6} />
        <GlowingOrb position={[-2, -1.5, -2.5]} color="#ff00aa" speed={1} />
      </Canvas>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    pointerEvents: 'none',
  },
};

export default AntiGravityBackground;