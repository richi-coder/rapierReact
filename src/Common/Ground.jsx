import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Ground() {
  return (
    <RigidBody colliders={'cuboid'}>
      <Plane
        position={[0, -10, 0]}
        args={[1500, 1500]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhongMaterial color="blue" />
      </Plane>
    </RigidBody>
  );
}
