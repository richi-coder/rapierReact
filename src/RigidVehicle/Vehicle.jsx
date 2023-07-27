import { createRef, useEffect, useRef } from "react";
import { WheelJoint } from "./WheelJoint";
import { RigidBody } from "@react-three/rapier";
import { Box, Cylinder } from "@react-three/drei";
import { useControls } from "leva";


export const Vehicle = () => {
    const { motorVel } = useControls({
        motorVel: {
            value: 1,
            min: -60,
            max: 60,
            step: 0.1
        }
    })
    const bodyRef = useRef(null);
    const wheelPositions = [
      [-3, 0, 2],
      [-3, 0, -2],
      [3, 0, 2],
      [3, 0, -2]
    ];
    const wheelRefs = useRef(
      wheelPositions.map(() => createRef())
    );

    useEffect(() => {
      wheelRefs.current.map(wheelRef => {
        wheelRef.current.setAdditionalMass(5)
      })
    }, [])
    
  
    return (
      <group>
        <RigidBody colliders="cuboid" ref={bodyRef} type="dynamic">
          <Box scale={[6, 1, 1.9]} castShadow receiveShadow name="chassis" density={2}>
            <meshStandardMaterial color={"red"} />
          </Box>
        </RigidBody>
        {wheelPositions.map((wheelPosition, index) => (
          <RigidBody
            position={wheelPosition}
            colliders="hull"
            type="dynamic"
            key={index}
            ref={wheelRefs.current[index]}
          >
            <Cylinder
              rotation={[Math.PI / 2, 0, 0]}
              args={[1, 1, 1, 32]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial color={"grey"} />
            </Cylinder>
          </RigidBody>
        ))}
        {wheelPositions.map((wheelPosition, index) => (
          <WheelJoint
            key={index}
            body={bodyRef}
            wheel={wheelRefs.current[index]}
            bodyAnchor={wheelPosition}
            wheelAnchor={[0, 0, 0]}
            rotationAxis={[0, 0, 1]}
            motorVel={motorVel}
          />
        ))}
      </group>
  )
}
