import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CameraRig from './three/CameraRig';
import Lights from './three/Lights';
import ChapterGate from './three/ChapterGate';
import BoardWorld from './three/scenes/BoardWorld';
import OriginWorld from './three/scenes/OriginWorld';
import LearningWorld from './three/scenes/LearningWorld';
import BuildWorld from './three/scenes/BuildWorld';
import ProjectsWorld from './three/scenes/ProjectsWorld';
import ToolkitWorld from './three/scenes/ToolkitWorld';
import JourneyWorld from './three/scenes/JourneyWorld';
import CurrentWorld from './three/scenes/CurrentWorld';
import FinalWorld from './three/scenes/FinalWorld';
import HUD from './hud/HUD';
import ChapterOverlays from './content/ChapterOverlays';
import { ASPHALT, PAGES } from './config/scenes';

export default function App() {
  const [ready, setReady] = useState(false);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: ASPHALT }}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: '#08090c',
          opacity: ready ? 0 : 1,
          visibility: ready ? 'hidden' : 'visible',
          transition: 'opacity .7s ease, visibility .7s ease',
          pointerEvents: 'none',
        }}
      />

      <Canvas
        camera={{ position: [0, 0.6, 5.6], fov: 42, near: 0.1, far: 220 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <color attach="background" args={[ASPHALT]} />
        <fogExp2 attach="fog" args={[ASPHALT, 0.035]} />
        <ScrollControls pages={PAGES} damping={0.2}>
          <CameraRig reducedMotion={reducedMotion} />
          <Lights />
          <Suspense fallback={null}>
            <ChapterGate span={[0, 0]}>
              <BoardWorld />
            </ChapterGate>
            <ChapterGate span={[1, 1]}>
              <OriginWorld />
            </ChapterGate>
            <ChapterGate span={[2, 2]}>
              <LearningWorld />
            </ChapterGate>
            <ChapterGate span={[3, 3]}>
              <BuildWorld />
            </ChapterGate>
            <ChapterGate span={[4, 6]}>
              <ProjectsWorld />
            </ChapterGate>
            <ChapterGate span={[7, 7]}>
              <ToolkitWorld />
            </ChapterGate>
            <ChapterGate span={[8, 8]}>
              <JourneyWorld />
            </ChapterGate>
            <ChapterGate span={[9, 9]}>
              <CurrentWorld />
            </ChapterGate>
            <ChapterGate span={[10, 10]}>
              <FinalWorld />
            </ChapterGate>
          </Suspense>
        </ScrollControls>
        {!reducedMotion && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.55} luminanceThreshold={0.35} luminanceSmoothing={0.25} mipmapBlur radius={0.6} />
          </EffectComposer>
        )}
      </Canvas>

      <ChapterOverlays />
      <HUD ready={ready} />
    </div>
  );
}
