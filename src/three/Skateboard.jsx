import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DECK_LEN = 3.0;
const DECK_W = 0.78;
const DECK_T = 0.085;
const HALF_W = DECK_W / 2;

function buildDeckGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-HALF_W * 0.55, -DECK_LEN / 2);
  shape.quadraticCurveTo(-HALF_W, -DECK_LEN / 2 + 0.28, -HALF_W, -DECK_LEN / 2 + 0.6);
  shape.lineTo(-HALF_W, DECK_LEN / 2 - 0.6);
  shape.quadraticCurveTo(-HALF_W, DECK_LEN / 2 - 0.28, -HALF_W * 0.55, DECK_LEN / 2);
  shape.lineTo(HALF_W * 0.55, DECK_LEN / 2);
  shape.quadraticCurveTo(HALF_W, DECK_LEN / 2 - 0.28, HALF_W, DECK_LEN / 2 - 0.6);
  shape.lineTo(HALF_W, -DECK_LEN / 2 + 0.6);
  shape.quadraticCurveTo(HALF_W, -DECK_LEN / 2 + 0.28, HALF_W * 0.55, -DECK_LEN / 2);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: DECK_T,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.016,
    bevelSegments: 3,
    curveSegments: 16,
  });
  geo.rotateX(-Math.PI / 2);
  geo.center();

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const lenFrac = Math.min(Math.abs(z) / (DECK_LEN / 2), 1);
    const kick = Math.pow(Math.max(lenFrac - 0.6, 0) / 0.4, 2) * 0.05;
    const concave = Math.pow(x / HALF_W, 2) * 0.012;
    pos.setY(i, y + kick + concave);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function makeGripTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 1024;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1c1f26';
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 16000; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const a = 0.12 + Math.random() * 0.4;
    ctx.fillStyle = `rgba(210,215,225,${a})`;
    ctx.fillRect(x, y, 1.4, 1.4);
  }
  ctx.strokeStyle = 'rgba(255,90,54,0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(c.width * 0.5, c.height * 0.08);
  for (let y = c.height * 0.08; y <= c.height * 0.92; y += 40) {
    const x = c.width * 0.5 + Math.sin(y * 0.02) * 18;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeUndersideTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 1024;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, c.height);
  g.addColorStop(0, '#11151c');
  g.addColorStop(0.5, '#0c0e13');
  g.addColorStop(1, '#151016');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.save();
  ctx.translate(c.width / 2, c.height / 2);
  ctx.strokeStyle = '#ff5a36';
  ctx.lineWidth = 6;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(0, 0, 90, 0.6, 2.6);
  ctx.stroke();
  ctx.strokeStyle = '#4fd1c5';
  ctx.lineWidth = 5;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.arc(0, 0, 140, 2.2, 4.4);
  ctx.stroke();
  ctx.strokeStyle = '#ffcc33';
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(0, 0, 190, -1.2, 1.3);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 9) {
    ctx.moveTo(Math.cos(a) * 40, Math.sin(a) * 40);
    ctx.lineTo(Math.cos(a) * 60, Math.sin(a) * 60);
  }
  ctx.stroke();
  ctx.restore();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Truck({ zPos }) {
  const metalMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xb9bfc9, roughness: 0.35, metalness: 0.85 }),
    []
  );
  const wheelMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xffcc33, roughness: 0.5, metalness: 0.1 }),
    []
  );
  return (
    <group position={[0, -DECK_T / 2 - 0.02, zPos]}>
      <mesh material={metalMat} geometry={useMemo(() => new THREE.BoxGeometry(0.3, 0.045, 0.16), [])} />
      <mesh
        material={metalMat}
        position={[0, -0.075, 0]}
        geometry={useMemo(() => new THREE.BoxGeometry(0.82, 0.07, 0.09), [])}
      />
      <mesh
        material={metalMat}
        position={[0, -0.025, 0.045]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={useMemo(() => new THREE.CylinderGeometry(0.018, 0.018, 0.11, 8), [])}
      />
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            material={metalMat}
            position={[side * 0.41, -0.075, 0]}
            rotation={[0, 0, Math.PI / 2]}
            geometry={useMemo(() => new THREE.CylinderGeometry(0.014, 0.014, 0.16, 8), [])}
          />
          <mesh
            material={wheelMat}
            position={[side * 0.46, -0.075, 0]}
            rotation={[0, 0, Math.PI / 2]}
            geometry={useMemo(() => new THREE.CylinderGeometry(0.13, 0.13, 0.085, 20), [])}
          />
        </group>
      ))}
    </group>
  );
}

export default function Skateboard({
  position = [0, 0, 0],
  scale = 1,
  interactive = false,
  idle = true,
  tilt = [0.12, 0],
  onFlip,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const spin = useRef(0);
  const spinVelocity = useRef(0);

  const deckGeo = useMemo(() => buildDeckGeometry(), []);
  const deckMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x14161c, roughness: 0.55, metalness: 0.08 }),
    []
  );
  const gripTex = useMemo(() => makeGripTexture(), []);
  const gripMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: gripTex, roughness: 0.95, metalness: 0 }),
    [gripTex]
  );
  const underTex = useMemo(() => makeUndersideTexture(), []);
  const underMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: underTex,
        roughness: 0.5,
        metalness: 0.1,
        emissive: new THREE.Color('#ff5a36'),
        emissiveMap: underTex,
        emissiveIntensity: 0.5,
      }),
    [underTex]
  );
  const gripPlaneGeo = useMemo(() => new THREE.PlaneGeometry(DECK_W * 0.92, DECK_LEN * 0.92), []);
  const underPlaneGeo = useMemo(() => new THREE.PlaneGeometry(DECK_W * 0.92, DECK_LEN * 0.92), []);

  function handleClick(e) {
    e.stopPropagation();
    if (!interactive) return;
    spinVelocity.current += 22;
    if (onFlip) onFlip();
  }

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (idle && groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.045;
      groupRef.current.rotation.y = t * 0.18;
    }
    if (Math.abs(spinVelocity.current) > 0.001) {
      spin.current += spinVelocity.current * dt;
      spinVelocity.current *= Math.pow(0.001, dt);
    } else {
      spinVelocity.current = 0;
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = tilt[0];
      groupRef.current.rotation.z = tilt[1] + spin.current;
    }
    if (interactive && underMat) {
      underMat.emissiveIntensity = hovered ? 0.85 : 0.5;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={handleClick}
      onPointerOver={interactive ? () => setHovered(true) : undefined}
      onPointerOut={interactive ? () => setHovered(false) : undefined}
    >
      <mesh geometry={deckGeo} material={deckMat} />
      <mesh geometry={gripPlaneGeo} material={gripMat} rotation={[-Math.PI / 2, 0, 0]} position={[0, DECK_T / 2 + 0.006, 0]} />
      <mesh geometry={underPlaneGeo} material={underMat} rotation={[Math.PI / 2, 0, 0]} position={[0, -DECK_T / 2 - 0.006, 0]} />
      <Truck zPos={DECK_LEN / 2 - 0.42} />
      <Truck zPos={-(DECK_LEN / 2 - 0.42)} />
    </group>
  );
}
