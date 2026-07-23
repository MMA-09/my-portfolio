import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import WorldEnvironment from '../WorldEnvironment';
import { KEYFRAMES } from '../../config/scenes';

const { worldZ, accent } = KEYFRAMES[7];

const TOOLS = [
  'JAVASCRIPT / TYPESCRIPT',
  'PYTHON',
  'REACT & NEXT.JS',
  'NODE.JS',
  'POSTGRESQL',
  'SWIFT · IOS',
  'ARDUINO / C',
  'AI-ASSISTED DEV',
  'PRODUCT & UI',
];

function ToolPoint({ position, label, color }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const s = hovered ? 1.7 : 1;
      ref.current.scale.setScalar(s + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.06);
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1.1 : 0.55} />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.08em',
            color: hovered ? '#f3f1ea' : 'rgba(243,241,234,0.55)',
            whiteSpace: 'nowrap',
            transform: 'translateY(-22px)',
            transition: 'color .2s',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

export default function ToolkitWorld() {
  const groupRef = useRef();
  const positions = useMemo(() => {
    const n = TOOLS.length;
    const arr = [];
    for (let i = 0; i < n; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.1;
      arr.push([r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.7, r * Math.sin(phi) * Math.sin(theta)]);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={70} spread={[10, 5, 10]} floorY={-1.9} />
      <group ref={groupRef} position={[0, 0.4, worldZ]}>
        {positions.map((p, i) => (
          <ToolPoint key={TOOLS[i]} position={p} label={TOOLS[i]} color={i % 2 === 0 ? accent : '#ff5a36'} />
        ))}
      </group>
    </group>
  );
}
