import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Ground2() {
  return (
    <RigidBody colliders={'cuboid'}>
      <Plane
        position={[0, -0.5, 0]}
        args={[50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhongMaterial color="gray" />
      </Plane>
    </RigidBody>
  );
}
