import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function FSAEchassis({ reference, }) {
  return (
    <RigidBody ref={reference} type='dynamic' density={0}>
        <Box
            args={[0.8,0.3,1.7]}
            position={[0,0.1,0]}
            >
            <meshPhongMaterial color='yellow' />
        </Box>
    </RigidBody>
  )
}
