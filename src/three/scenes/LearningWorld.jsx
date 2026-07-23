import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import WorldEnvironment from '../WorldEnvironment';
import { KEYFRAMES } from '../../config/scenes';

const { worldZ, accent } = KEYFRAMES[2];

function WireShape({ geometry, position, speed = 0.2, color = accent, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

export default function LearningWorld() {
  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={90} spread={[12, 6, 12]} floorY={-1.8} />

      {/* graph-paper plane */}
      <mesh position={[0, 1.2, worldZ - 3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.08} />
      </mesh>

      <WireShape geometry={<icosahedronGeometry args={[1.1, 0]} />} position={[-1.6, 0.6, worldZ]} speed={0.15} scale={1} />
      <WireShape
        geometry={<torusKnotGeometry args={[0.55, 0.16, 100, 12]} />}
        position={[1.8, -0.2, worldZ + 1.4]}
        speed={0.25}
        color="#ff5a36"
      />
      <WireShape geometry={<octahedronGeometry args={[0.7, 0]} />} position={[0.4, 1.4, worldZ - 1.6]} speed={0.3} color="#ffcc33" />
    </group>
  );
}
