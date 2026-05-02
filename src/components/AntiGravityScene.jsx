import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BlockchainNetwork — Abstract 3D blockchain visualization
 * 
 * Renders softly glowing interconnected nodes/particles
 * representing a blockchain network. Scroll-linked via GSAP.
 */

function NetworkNodes({ count = 40 }) {
  const meshRef = useRef();
  const linesRef = useRef();
  
  const nodes = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      
      // Electric blue with slight variation
      const hue = 0.6 + Math.random() * 0.05;
      const color = new THREE.Color().setHSL(hue, 0.8, 0.5 + Math.random() * 0.2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 0.08 + 0.03;
      velocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.001,
      });
    }
    return { positions, colors, sizes, velocities };
  }, [count]);
  
  // Generate edges between nearby nodes
  const edges = useMemo(() => {
    const edgePositions = [];
    const threshold = 5;
    const pos = nodes.positions;
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < threshold) {
          edgePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(edgePositions);
  }, [nodes.positions, count]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const vel = nodes.velocities[i];
      positions[i * 3] += Math.sin(t * 0.5 + i * 0.3) * vel.x;
      positions[i * 3 + 1] += Math.cos(t * 0.3 + i * 0.7) * vel.y;
      
      // Contain within bounds
      if (Math.abs(positions[i * 3]) > 12) positions[i * 3] *= 0.995;
      if (Math.abs(positions[i * 3 + 1]) > 8) positions[i * 3 + 1] *= 0.995;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate entire network
    meshRef.current.rotation.y = t * 0.02;
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.02;
    }
  });
  
  return (
    <>
      {/* Nodes */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={nodes.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={nodes.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      
      {/* Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edges.length / 3}
            array={edges}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

function AmbientGlow({ position, color, size = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.scale.setScalar(
        size + Math.sin(t * 0.5 + position[0]) * 0.1
      );
    }
  });
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function BlockchainScene() {
  const { camera } = useThree();
  
  // Store initial camera position for scroll-linked pan
  useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Listen for scroll events for camera pan
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / (maxScroll || 1), 1);
      
      // Gentle camera pan based on scroll
      camera.position.x = Math.sin(progress * Math.PI * 0.5) * 2;
      camera.position.y = -progress * 1.5;
      camera.rotation.z = progress * 0.05;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera]);
  
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 5, 5]} color="#3B82F6" intensity={0.5} />
      <pointLight position={[-8, -3, -5]} color="#2563EB" intensity={0.3} />
      <pointLight position={[0, 8, 3]} color="#1D4ED8" intensity={0.2} />
      
      <NetworkNodes count={50} />
      
      {/* Ambient glow spheres */}
      <AmbientGlow position={[-5, 3, -5]} color="#3B82F6" size={3} />
      <AmbientGlow position={[6, -2, -4]} color="#2563EB" size={2.5} />
      <AmbientGlow position={[0, 5, -6]} color="#1D4ED8" size={2} />
      <AmbientGlow position={[-3, -4, -3]} color="#3B82F6" size={1.5} />
    </>
  );
}

export default BlockchainScene;