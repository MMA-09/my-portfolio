import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Html } from '@react-three/drei';
import * as THREE from 'three';
import WorldEnvironment from '../WorldEnvironment';
import { CHAPTERS, KEYFRAMES, chapterLocalProgress } from '../../config/scenes';

const span = CHAPTERS[6].span;
const { worldZ, accent } = KEYFRAMES[8];

const PHASES = ['ROBOTICS', 'PROGRAMMING', 'HACKATHONS', 'WEB DEV', 'INTERNSHIP', 'ENTREPRENEURSHIP', 'LEADERSHIP'];

function buildCurve() {
  const pts = [
    new THREE.Vector3(-5, -0.6, worldZ + 6),
    new THREE.Vector3(-3.2, 0.2, worldZ + 4),
    new THREE.Vector3(-3.6, -0.3, worldZ + 2),
    new THREE.Vector3(-1, 0.6, worldZ + 0.5),
    new THREE.Vector3(1.2, -0.2, worldZ - 1),
    new THREE.Vector3(1, 0.5, worldZ - 3),
    new THREE.Vector3(3.5, -0.1, worldZ - 4.5),
    new THREE.Vector3(5, 0.3, worldZ - 6.5),
  ];
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
}

export default function JourneyWorld() {
  const scroll = useScroll();
  const curve = useMemo(() => buildCurve(), []);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 100, 0.045, 8, false), [curve]);
  const travelerRef = useRef();
  const markerRefs = useRef([]);

  const markerData = useMemo(
    () => PHASES.map((label, i) => ({ label, t: (i + 0.5) / PHASES.length, point: curve.getPoint((i + 0.5) / PHASES.length) })),
    [curve]
  );

  useFrame(() => {
    const local = chapterLocalProgress(scroll.offset, span);
    const p = curve.getPoint(Math.min(local, 0.999));
    if (travelerRef.current) {
      travelerRef.current.position.copy(p);
      const tangent = curve.getTangent(Math.min(local, 0.999));
      travelerRef.current.rotation.z = Math.atan2(tangent.y, tangent.x);
    }
    markerData.forEach((m, i) => {
      const ref = markerRefs.current[i];
      if (!ref) return;
      const active = local > m.t - 0.06;
      const s = active ? 1.35 : 0.85;
      ref.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    });
  });

  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={90} spread={[16, 5, 16]} floorY={-1.9} />

      <mesh geometry={tubeGeo}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} roughness={0.4} />
      </mesh>

      {markerData.map((m, i) => (
        <group key={m.label} ref={(el) => (markerRefs.current[i] = el)} position={m.point}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ff5a36" emissive="#ff5a36" emissiveIntensity={0.6} />
          </mesh>
          <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                letterSpacing: '0.1em',
                color: 'rgba(243,241,234,0.75)',
                whiteSpace: 'nowrap',
                transform: 'translateY(-20px)',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              {m.label}
            </div>
          </Html>
        </group>
      ))}

      <mesh ref={travelerRef}>
        <coneGeometry args={[0.16, 0.4, 4]} />
        <meshStandardMaterial color="#f3f1ea" emissive={accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
