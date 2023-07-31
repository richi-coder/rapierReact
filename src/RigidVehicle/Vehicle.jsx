import { createRef, useEffect, useRef } from "react";
import { WheelJoint } from "./WheelJoint";
import { RigidBody } from "@react-three/rapier";
import { Box, Cylinder } from "@react-three/drei";
import { useControls } from "leva";
import Ground from "../Common/Ground";


export const Vehicle = () => {
    const { motorVel } = useControls({
        motorVel: {
            value: 1,
            min: -600,
            max: 600,
            step: 0.1
        }
    })
    const bodyRef = useRef(null);
    const wheelPositions = [
      [-0.6, 0, 0.5],
      [-0.6, 0, -0.5],
      [0.6, 0, 0.5],
      [0.6, 0, -0.5]
    ];
    const wheelRefs = useRef(
      wheelPositions.map(() => createRef())
    );

    // useEffect(() => {
    //   wheelRefs.current[0].current.addTorque({ x: 0.1, y: 0, z: 0}, true)
    // }, [])
    
  
    return (
      <group>
        <RigidBody density={2} colliders="cuboid" ref={bodyRef} type="dynamic">
          <Box scale={[1.2, 0.2, 0.5]} castShadow receiveShadow name="chassis">
            <meshStandardMaterial color={"red"} />
          </Box>
        </RigidBody>
        {wheelPositions.map((wheelPosition, index) => (
          <RigidBody
            friction={2}
            restitution={0.5}
            position={wheelPosition}
            colliders="hull"
            type="dynamic"
            key={index}
            ref={wheelRefs.current[index]}
          >
            <Cylinder
              rotation={[Math.PI / 2, 0, 0]}
              args={[0.15, 0.15, 0.1, 16]}
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
            motorVel={index > 1 ? motorVel : 0}
          />
        ))}
        <Ground />
      </group>
  )
}
