import { Suspense, createRef, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Box,
  Plane,
} from "@react-three/drei";
import { Joint, WheelJoint } from "../Common/Joint";
import Support from "./Support";
import Wheel from "./Wheel";
import { useControls } from "leva";
import FixedBlock from "../Common/FixedBlock";
import Ground from "../Common/Ground";

function FourLinkSuspension() {
  const { supportHeight } = useControls({
    supportHeight: {
      value: 8,
      max: 10,
      min: -10,
      step: 0.05,
    },
  });
  const bodyRef = useRef(null);
  const wheelRef = useRef(null);

  // These arrays contain [ [position], [rotation] ]
  const chassis = [
    [4.08, 0, 0],
    [0, 0, 0],
  ];

  const arms = [
    [
      [0, 0, 0],
      [0, 0, Math.PI / 2],
    ], // upper arm
    [
      [0, 0, 0],
      [0, 0, 0],
    ], // upright
    [
      [0, 0, 0],
      [0, 0, Math.PI / 2],
    ], // lower arm
  ];
  const upright = [
    [7.5, 2, 0],
    [0, 0, 0],
  ];

  const armsRefs = useRef(arms.map(() => createRef()));
  
  useEffect(() => {
    armsRefs.current[1].current.setEnabledRotations(false, false, false);
  }, [])

  return (
    <group>
        <group>
          <FixedBlock reference={bodyRef} fixedBlockProps={chassis} />

          {/* ARMS */}
          {arms.map((arm, index) => (
            <RigidBody
              key={index}
              type={"dynamic"}
              ref={armsRefs.current[index]}
            >
              <Box
                position={arm[0]}
                rotation={arm[1]}
                args={[0.5, 5, 0.5]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial
                  color={index % 2 === 0 ? "green" : "blue"}
                />
              </Box>
            </RigidBody>
          ))}

          {/* WHEEL */}
          <Wheel wheelRef={wheelRef} />

          {/* JOINTING */}
          <Joint
            body={bodyRef}
            next={armsRefs.current[0]}
            firstOne={[3, 2.5, 0]}
            secondOne={[2.5, 0, 0]}
          />
          <Joint
            body={bodyRef}
            next={armsRefs.current[2]}
            firstOne={[3, -2.5, 0]}
            secondOne={[2.5, 0, 0]}
          />
          <Joint
            body={armsRefs.current[0]}
            next={armsRefs.current[1]}
            firstOne={[-3, 0, 0]}
            secondOne={[0, 2.5, 0]}
          />
          <Joint
            body={armsRefs.current[2]}
            next={armsRefs.current[1]}
            firstOne={[-3, 0, 0]}
            secondOne={[0, -2.5, 0]}
          />
          <WheelJoint
            body={armsRefs.current[1]}
            next={wheelRef}
            firstOne={[2, 0, 0]}
            secondOne={[0, 0, 0]}
          />
        </group>

        {/* SUPPORT */}
        <Support supportHeight={supportHeight} />

        </group>
  );
}

export default FourLinkSuspension;
