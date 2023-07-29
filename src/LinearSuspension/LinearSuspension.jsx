import FixedBlock from "../Common/FixedBlock";
import { PrismaticJoint } from "../Common/Joint";
import { createRef, useEffect, useRef } from "react";
import { springForce } from "./springForce";
import { useFrame } from "@react-three/fiber";
import LinearWheel from "./LinearWheel";
import FSAEchassis from "../Common/FSAEchassis";
import Ground2 from "../Common/Ground2";

export default function LinearSuspension() {
    const fixedBlockRef = useRef()
    const chassisRef = useRef()
    const wheelRef = useRef()
    const yPosition = 0;
    let force = 0

    const multidimensionalArray = [
        [// FL wheel
        [0.8,0,0.8],
        [0,0,0],
        [0,1,0]
        ],
        [// FR wheel
        [-0.8,0,0.8],
        [0,0,0],
        [0,1,0]
        ],
        [// RL wheel
        [0.8,0,-0.8],
        [0,0,0],
        [0,1,0]
        ],
        [// RR wheel
        [-0.8,0,-0.8],
        [0,0,0],
        [0,1,0]
        ],
    ]

    const wheelsRef = useRef(multidimensionalArray.map(() => createRef()))

    useEffect(() => {
        // first Position
        // wheelRef.current.setAdditionalMass(20)
        wheelsRef.current.map(wheelRef => {
            wheelRef.current.setAdditionalMass(20)
        })
        chassisRef.current.setLinearDamping(3)
        // chassisRef.current.setAdditionalMass(120)
        // chassisRef.current.setAdditionalPrincipalAngularInertia({ x: 0.3, y: 0.2, z: 0.1 })
        chassisRef.current.setAdditionalMassProperties(
            120,                        // Mass.
            { x: 0.0, y: 0.1, z: 0.0 }, // Center of mass.
            { x: 0.0003, y: 0.0002, z: 0.0001 }, // Principal angular inertia.
            { w: 1.0, x: 0.0, y: 0.0, z: 0.0 } // Principal angular inertia frame (unit quaternion).
        );
    }, [])
    

    useFrame(() => {
        // SPRING FORCE APPLIED HERE!
      force = springForce(6000, chassisRef.current.translation().y);
    //   wheelRef.current.resetForces(true)
    //   wheelRef.current.addForce({x: 0, y: force, z: 0}, true)
    //   console.log(wheelRef.current.translation().y.toFixed(2), 'translation');
    //   console.log(force, 'force');
    chassisRef.current.resetForces(true)
    chassisRef.current.addForceAtPoint({x: 0, y: force, z: 0}, {x: 0, y: 10, z: 0}, true)

    wheelsRef.current.map(wheelRef => {
        wheelRef.current.addForceAtPoint({x: 0, y: -force/4, z: 0}, { x: 0, y: 0, z: 0}, true)
    })
    
    })


  return (
    <group>
        {/* <FixedBlock reference={fixedBlockRef} fixedBlockProps={[[0,-5,0], [0,0,0]]} /> */}
        <Ground2 />
        <FSAEchassis reference={chassisRef} />
        {/* WHEELS CREATION */}
        {
            multidimensionalArray.map((item, index) => (
                <LinearWheel key={index} reference={wheelsRef.current[index]} yPosition={yPosition} />
            ))
        }
        {/* <LinearWheel reference={wheelRef} yPosition={yPosition} /> */}
        {
            multidimensionalArray.map((item, index) => (
                <PrismaticJoint key={index+'joint'} bodyA={chassisRef} bodyB={wheelsRef.current[index]} multidimensionalArray={multidimensionalArray[index]}  />
            ))
        }
        {/* <PrismaticJoint bodyA={chassisRef} bodyB={wheelRef} multidimensionalArray={multidimensionalArray[0]}  /> */}
    </group>
  );
}
