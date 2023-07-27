import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function FixedBlock({ reference, fixedBlockProps }) {
  return (
    <RigidBody ref={reference} type="fixed">
      <Box
        args={[2, 10, 5]}
        castShadow
        receiveShadow
        name="chassis"
        position={fixedBlockProps[0]}
        rotation={fixedBlockProps[1]}
      >
        <meshStandardMaterial color={"red"} />
      </Box>
    </RigidBody>
  );
}
