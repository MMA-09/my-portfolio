import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { makeGridTexture, makeSpriteTexture } from './utils';

export default function WorldEnvironment({
  worldZ = 0,
  color = '#4fd1c5',
  particleCount = 120,
  spread = [10, 5, 16],
  floor = true,
  floorY = -1.6,
  floorSize = [30, 30],
}) {
  const gridTex = useMemo(() => {
    const tex = makeGridTexture(color);
    tex.repeat.set(floorSize[0] / 1.5, floorSize[1] / 1.5);
    return tex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, floorSize[0], floorSize[1]]);
  const spriteTex = useMemo(() => makeSpriteTexture(), []);
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * spread[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread[1] + 0.5;
      arr[i * 3 + 2] = worldZ + (Math.random() - 0.5) * spread[2];
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, worldZ]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <group>
      {floor && (
        <mesh position={[0, floorY, worldZ]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={floorSize} />
          <meshBasicMaterial map={gridTex} transparent opacity={0.28} depthWrite={false} />
        </mesh>
      )}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          map={spriteTex}
          transparent
          opacity={0.55}
          color={color}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
