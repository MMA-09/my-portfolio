import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import WorldEnvironment from '../WorldEnvironment';
import { CHAPTERS, KEYFRAMES, chapterLocalProgress } from '../../config/scenes';
import { lerp } from '../utils';

const span = CHAPTERS[1].span;
const { worldZ, accent } = KEYFRAMES[1];
const RADIUS = 0.9;
const TRAVEL = 5.2;

export default function OriginWorld() {
  const scroll = useScroll();
  const wheelRef = useRef();

  useFrame(() => {
    const local = chapterLocalProgress(scroll.offset, span);
    const x = lerp(-TRAVEL, TRAVEL, local);
    if (wheelRef.current) {
      wheelRef.current.position.x = x;
      wheelRef.current.rotation.z = -(x + TRAVEL) / RADIUS;
    }
  });

  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={70} spread={[14, 4, 10]} floorY={-1.3} />

      {/* the road the wheel travels */}
      <mesh position={[0, -1.28, worldZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[TRAVEL * 2 + 3, 0.5]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} />
      </mesh>

      <group ref={wheelRef} position={[-TRAVEL, -0.4, worldZ]}>
        <mesh>
          <torusGeometry args={[RADIUS, 0.32, 20, 40]} />
          <meshStandardMaterial color="#14161c" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.14]}>
          <circleGeometry args={[RADIUS - 0.28, 32]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.14]}>
          <circleGeometry args={[RADIUS - 0.28, 32]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} roughness={0.4} />
        </mesh>
        {[...Array(5)].map((_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * (RADIUS - 0.32), Math.sin(a) * (RADIUS - 0.32), 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
              <meshStandardMaterial color="#b9bfc9" metalness={0.8} roughness={0.3} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
