import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { CHAPTERS, KEYFRAMES, chapterVisibility } from '../config/scenes';

function AccentLight({ span, worldZ, color, x = 0 }) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame(() => {
    if (!ref.current) return;
    const vis = chapterVisibility(scroll.offset, span);
    ref.current.intensity = 5 * (0.1 + vis * 1.1);
  });
  return (
    <pointLight ref={ref} position={[x, 1.6, worldZ + 3]} color={color} distance={16} decay={2} intensity={0.5} />
  );
}

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#9099aa" />
      <directionalLight position={[3, 6, 4]} intensity={0.9} />
      {CHAPTERS.map((ch) => {
        const midIdx = Math.round((ch.span[0] + ch.span[1]) / 2);
        const kf = KEYFRAMES[midIdx];
        return <AccentLight key={ch.id} span={ch.span} worldZ={kf.worldZ} color={kf.accent} x={kf.pos[0] * 0.4} />;
      })}
    </>
  );
}
