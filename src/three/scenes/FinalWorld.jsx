import WorldEnvironment from '../WorldEnvironment';
import Skateboard from '../Skateboard';
import { KEYFRAMES } from '../../config/scenes';

const { worldZ, accent } = KEYFRAMES[10];

export default function FinalWorld() {
  return (
    <group>
      <WorldEnvironment worldZ={worldZ} color={accent} particleCount={40} spread={[8, 3, 8]} floorY={-1.4} />
      <Skateboard position={[0, 0, worldZ]} tilt={[0.08, 0]} idle />
    </group>
  );
}
