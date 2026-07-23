import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import WorldEnvironment from '../WorldEnvironment';
import { KEYFRAMES } from '../../config/scenes';

const { worldZ, accent } = KEYFRAMES[9];

export default function CurrentWorld() {
  const ref = useRef();
  const ringRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.08;
      ref.current.rotation.y = t * 0.12;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.2;
  });
  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={60} spread={[9, 4, 9]} floorY={-1.6} />
      <mesh ref={ref} position={[0, 0.3, worldZ]}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshStandardMaterial color={accent} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0.3, worldZ]}>
        <torusGeometry args={[1.5, 0.01, 8, 60]} />
        <meshBasicMaterial color="#ff5a36" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
