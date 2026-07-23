import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import WorldEnvironment from '../WorldEnvironment';
import { CHAPTERS, KEYFRAMES, chapterLocalProgress } from '../../config/scenes';
import { smoothstep, lerp } from '../utils';

const span = CHAPTERS[3].span;
const { worldZ, accent } = KEYFRAMES[3];

const GRID = [6, 6, 1];
const COUNT = GRID[0] * GRID[1] * GRID[2];
const CUBE = 0.26;
const GAP = 0.06;

function buildTargets() {
  const targets = [];
  const step = CUBE + GAP;
  const offX = ((GRID[0] - 1) * step) / 2;
  const offY = ((GRID[1] - 1) * step) / 2;
  for (let x = 0; x < GRID[0]; x++) {
    for (let y = 0; y < GRID[1]; y++) {
      for (let z = 0; z < GRID[2]; z++) {
        targets.push([x * step - offX, y * step - offY, z * step]);
      }
    }
  }
  return targets;
}

function buildScatter(seedTargets) {
  return seedTargets.map(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 10,
  ]);
}

export default function BuildWorld() {
  const scroll = useScroll();
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const targets = useMemo(() => buildTargets(), []);
  const scatter = useMemo(() => buildScatter(targets), [targets]);
  const rotSeed = useMemo(() => targets.map(() => Math.random() * Math.PI * 2), [targets]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const local = smoothstep(chapterLocalProgress(scroll.offset, span) * 1.3);
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const s = scatter[i];
      const g = targets[i];
      const px = lerp(s[0], g[0], local);
      const py = lerp(s[1], g[1], local);
      const pz = lerp(s[2], g[2] - 1.4, local) + worldZ;
      dummy.position.set(px, py, pz);
      const rot = lerp(rotSeed[i] + t * 0.15, 0, local);
      dummy.rotation.set(rot * 0.6, rot, rot * 0.3);
      dummy.scale.setScalar(lerp(0.4, 1, local));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={80} spread={[12, 6, 12]} floorY={-1.7} />
      <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
        <boxGeometry args={[CUBE, CUBE, CUBE]} />
        <meshStandardMaterial color="#181b22" roughness={0.5} metalness={0.15} emissive={accent} emissiveIntensity={0.12} />
      </instancedMesh>
    </group>
  );
}
