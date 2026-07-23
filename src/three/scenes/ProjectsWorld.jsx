import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import WorldEnvironment from '../WorldEnvironment';
import { KEYFRAMES } from '../../config/scenes';

const worldZ = KEYFRAMES[4].worldZ;

function NodeCluster({ x, color, satellites = 6, radius = 1.4 }) {
  const groupRef = useRef();
  const nodePositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < satellites; i++) {
      const a = (i / satellites) * Math.PI * 2;
      const r = radius * (0.7 + Math.random() * 0.5);
      arr.push([Math.cos(a) * r, Math.sin(a * 1.3) * r * 0.6, Math.sin(a) * r]);
    }
    return arr;
  }, [satellites, radius]);

  const lineGeo = useMemo(() => {
    const pts = [];
    nodePositions.forEach((p) => {
      pts.push(0, 0, 0, p[0], p[1], p[2]);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [nodePositions]);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  return (
    <group ref={groupRef} position={[x, 0.5, worldZ]}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.3} />
      </mesh>
      {nodePositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function ProjectsWorld() {
  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color="#4fd1c5" particleCount={100} spread={[24, 6, 14]} floorY={-1.6} floorSize={[40, 20]} />
      <NodeCluster x={-7} color="#4fd1c5" />
      <NodeCluster x={0} color="#ffcc33" satellites={7} />
      <NodeCluster x={7} color="#ff5a36" satellites={5} />
    </group>
  );
}
