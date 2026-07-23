import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { KEYFRAMES, SEGMENTS } from '../config/scenes';
import { useProgress } from '../store/useProgress';
import { lerp } from './utils';

const V = KEYFRAMES.map((k) => ({
  pos: new THREE.Vector3(...k.pos),
  look: new THREE.Vector3(...k.look),
}));

export default function CameraRig({ reducedMotion = false }) {
  const scroll = useScroll();
  const { camera, scene } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  const smooth = useRef(0);
  const lastOffset = useRef(0);

  useFrame(() => {
    const target = scroll.offset;
    const smoothing = reducedMotion ? 1 : 0.09;
    smooth.current += (target - smooth.current) * smoothing;
    const offset = smooth.current;

    const scaled = offset * SEGMENTS;
    const idx0 = Math.max(0, Math.min(SEGMENTS - 1, Math.floor(scaled)));
    const idx1 = idx0 + 1;
    const lt = scaled - idx0;

    camera.position.lerpVectors(V[idx0].pos, V[idx1].pos, lt);
    lookAt.current.lerpVectors(V[idx0].look, V[idx1].look, lt);
    camera.fov = lerp(KEYFRAMES[idx0].fov, KEYFRAMES[idx1].fov, lt);
    camera.updateProjectionMatrix();
    camera.lookAt(lookAt.current);

    if (scene.fog) {
      scene.fog.density = lerp(KEYFRAMES[idx0].fog, KEYFRAMES[idx1].fog, lt);
    }

    const velocity = offset - lastOffset.current;
    lastOffset.current = offset;

    if (Math.abs(offset - useProgress.getState().offset) > 0.0005) {
      useProgress.setState({ offset, velocity });
    }
  });

  return null;
}
