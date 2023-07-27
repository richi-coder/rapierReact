import { Cylinder } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Wheel({ wheelRef }) {
  return (
    <RigidBody type='dynamic' ref={wheelRef} colliders='trimesh'>
        <Cylinder
            args={[5,5,1.5,20]}
            rotation={[0,0,Math.PI/2]}
            position={[-4,0,0]}
        >
            <meshPhongMaterial color={'yellow'} />
        </Cylinder>
    </RigidBody>
  )
}
