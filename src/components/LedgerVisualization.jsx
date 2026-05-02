import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const TransactionNode = ({ position, label, amount, isFlagged, onClick, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.1;
    }
  });

  const color = isFlagged ? '#ff0055' : hovered ? '#00ff88' : '#00f0ff';

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.35, 1]} />
          <MeshDistortMaterial 
            color={color}
            speed={3}
            distort={hovered ? 0.5 : 0.3}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.4}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1}
          />
        </mesh>
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2"
        >
          {label}
        </Text>
        <Text
          position={[0, 0.45, 0]}
          fontSize={0.08}
          color="#8a8a9a"
          anchorX="center"
          anchorY="middle"
        >
          ₹{Number(amount).toLocaleString()}
        </Text>
      </group>
    </Float>
  );
};

const ConnectionLine = ({ start, end, color }) => {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.4} />
    </line>
  );
};

const CentralCore = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <MeshDistortMaterial 
          color="#00f0ff"
          speed={2}
          distort={0.4}
          emissive="#00f0ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const LedgerVisualization = ({ transactions = [] }) => {
  const nodes = useMemo(() => {
    if (transactions.length === 0) {
      return [
        { id: 0, position: [0, 0, 0], label: 'GENESIS', amount: '0', isFlagged: false }
      ];
    }
    
    return transactions.map((tx, index) => {
      const angle = (index / Math.max(transactions.length, 1)) * Math.PI * 2;
      const radius = 2 + Math.random() * 0.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;
      
      return {
        id: tx.id,
        position: [x, y, z],
        label: (tx.sender || 'UNKNOWN').substring(0, 8).toUpperCase(),
        amount: tx.amount,
        isFlagged: tx.is_flagged || false,
      };
    });
  }, [transactions]);

  const lines = useMemo(() => {
    const result = [];
    for (let i = 1; i < nodes.length; i++) {
      result.push({
        start: nodes[i - 1].position,
        end: nodes[i].position,
        color: nodes[i].isFlagged ? '#ff0055' : '#00ff88'
      });
    }
    return result;
  }, [nodes]);

  return (
    <div style={styles.container}>
      <Canvas 
        camera={{ position: [0, 2, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00aa" />
        
        <Sparkles 
          count={100} 
          scale={8} 
          size={2} 
          speed={0.3} 
          color="#00f0ff"
        />
        
        <CentralCore />
        
        {nodes.slice(0, 15).map((node, i) => (
          <TransactionNode
            key={node.id}
            position={node.position}
            label={node.label}
            amount={node.amount}
            isFlagged={node.isFlagged}
            index={i}
          />
        ))}
        
        {lines.slice(0, 14).map((line, i) => (
          <ConnectionLine
            key={i}
            start={line.start}
            end={line.end}
            color={line.color}
          />
        ))}
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={3}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '500px',
    borderRadius: '16px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.9), rgba(20, 20, 35, 0.9))',
    border: '1px solid rgba(0, 240, 255, 0.2)',
    boxShadow: '0 0 60px rgba(0, 240, 255, 0.1), inset 0 0 60px rgba(0, 240, 255, 0.03)',
  },
};

export default LedgerVisualization;