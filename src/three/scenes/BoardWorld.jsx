import WorldEnvironment from '../WorldEnvironment';
import Skateboard from '../Skateboard';
import { KEYFRAMES } from '../../config/scenes';

const { worldZ, accent } = KEYFRAMES[0];

export default function BoardWorld({ onFlip }) {
  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={140} spread={[10, 5, 12]} floorY={-1.5} />
      <Skateboard position={[0, -0.85, worldZ]} interactive idle tilt={[0.12, 0]} onFlip={onFlip} />
    </group>
  );
}
