import { Box, Cylinder } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function LinearWheel({ reference, yPosition }) {
  return (
    <RigidBody type="dynamic" ref={reference} density={1} colliders={'hull'}>
        <Cylinder
            args={[0.15,0.15,0.1,15]}
            rotation={[0,0,Math.PI/2]}
            position={[0,yPosition,0]}
            >
            <meshPhongMaterial color='rgb(50,100,50)' />
        </Cylinder>
    </RigidBody>
  )
}
