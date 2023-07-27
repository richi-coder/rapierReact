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
        // wheelsRef.map(wheelRef => {
        //     wheelRef.current.setAdditionalMass(20)
        // })
        chassisRef.current.setLinearDamping(2.8)
        chassisRef.current.setAdditionalMass(120)
    }, [])
    

    useFrame(() => {
    //     // SPRING FORCE APPLIED HERE!
      force = springForce(6000, chassisRef.current.translation().y);
    //   wheelRef.current.resetForces(true)
    //   wheelRef.current.addForce({x: 0, y: force, z: 0}, true)
    //   console.log(wheelRef.current.translation().y.toFixed(2), 'translation');
    //   console.log(force, 'force');
    chassisRef.current.resetForces(true)
    chassisRef.current.addForceAtPoint({x: 0, y: force, z: 0}, {x: 0, y: 10, z: 0}, true)
    
    })


  return (
    <group>
        {/* <FixedBlock reference={fixedBlockRef} fixedBlockProps={[[0,-5,0], [0,0,0]]} /> */}
        <Ground2 />
        <FSAEchassis reference={chassisRef} />
        {/* WHEELS CREATION */}
        {
            multidimensionalArray.map((item, index) => (
                <LinearWheel reference={wheelsRef.current[index]} yPosition={yPosition} />
            ))
        }
        {/* <LinearWheel reference={wheelRef} yPosition={yPosition} /> */}
        {
            multidimensionalArray.map((item, index) => (
                <PrismaticJoint bodyA={chassisRef} bodyB={wheelsRef.current[index]} multidimensionalArray={multidimensionalArray[index]}  />
            ))
        }
        {/* <PrismaticJoint bodyA={chassisRef} bodyB={wheelRef} multidimensionalArray={multidimensionalArray[0]}  /> */}
    </group>
  );
}
