import { useFrame } from "@react-three/fiber";
import { useRapier } from "@react-three/rapier"
import { useRef } from "react";

const boxDimension = 5;

function VanillaBox() {
    const { world, rapier} = useRapier()
    let rigidBodyDesc = rapier.RigidBodyDesc.dynamic()
                                .setTranslation(0.0, 50, 0.0)
                                .setAdditionalMassProperties(
                                    5000,                        // Mass.
                                    { x: 0.0, y: 1.0, z: 0.0 }, // Center of mass.
                                    { x: 0.3, y: 0.2, z: 0.1 }, // Principal angular inertia.
                                    { w: 1.0, x: 0.0, y: 0.0, z: 0.0 } // Principal angu
                                    );
    let rigidBody = world.createRigidBody(rigidBodyDesc)
    let colliderDesc = rapier.ColliderDesc.cuboid(boxDimension,boxDimension,boxDimension);
    let collider = world.createCollider(colliderDesc, rigidBody);
    

    useFrame(() => {
        console.log(rigidBody.translation());
    })
    
  return (
    <mesh position={[10,0,0]}>
        <boxGeometry args={[boxDimension,boxDimension]} />
        <meshBasicMaterial color='blue' />
    </mesh>
  )
}

export default VanillaBox