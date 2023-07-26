import { Suspense, createRef, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  RoundedBox,
  Stats,
} from "@react-three/drei";
import { Joint, WheelJoint } from "./Joint";
import Support from "./Support";
import Wheel from "./Wheel";
import { useControls } from "leva";

function App() {
  const { supportHeight } = useControls({
    supportHeight: {
      value: 8,
      max: 20,
      min: -20,
      step: 0.1
    }
  })
  const bodyRef = useRef(null);
  const wheelRef = useRef(null);

  // These arrays contain [ [position], [rotation] ]
  const chassis = [
    [4.08,0,0],
    [0,0,0]
  ]

  const wheel = [
    []
  ]

  const arms = [
    [
      [0, 0, -0.5],
      [0, 0, Math.PI/2],
    ], // upper arm
    [
      [0, 0, 0],
      [0, 0, 0],
    ], // upright
    [
      [0, 0, -0.5],
      [0, 0, Math.PI/2],
    ], // lower arm
  ];
  const upright = [
    [7.5, 2, 0],
    [0, 0, 0],
  ];

  const armsRefs = useRef(arms.map(() => createRef()));

  return (
    <div id="container">
      <Canvas frameloop="demand">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Physics debug gravity={[0, -10, 0]} colliders={'cuboid'}>
            <group>
              <RigidBody ref={bodyRef} type="fixed">
                <Box
                  args={[2,10,5]}
                  castShadow
                  receiveShadow
                  name="chassis"
                  position={chassis[0]}
                  rotation={chassis[1]}
                >
                  <meshStandardMaterial color={"red"} />
                </Box>
              </RigidBody>
           
            {/* ARMS */}
            {arms.map((arm, index) => (
              <RigidBody key={index} type={'dynamic'} ref={armsRefs.current[index]}>
                <Box
                  position={arm[0]}
                  rotation={arm[1]}
                  args={[0.5, 5, 0.5]}
                  castShadow
                  receiveShadow
                >
                  <meshStandardMaterial color={index % 2 === 0 ? 'green' : 'blue'} />
                </Box>
              </RigidBody>
            ))}

            {/* WHEEL */}
            <Wheel wheelRef={wheelRef} />
            

            {/* JOINTING */}
            <Joint 
                body={bodyRef}
                next={armsRefs.current[0]}
                firstOne={[3,2.5,0]}
                secondOne={[2.5,0,0]}
            />
            <Joint 
                body={bodyRef}
                next={armsRefs.current[2]}
                firstOne={[3,-2.5,0]}
                secondOne={[2.5,0,0]}
            />
            <Joint 
                body={armsRefs.current[0]}
                next={armsRefs.current[1]}
                firstOne={[-2.5,0,0]}
                secondOne={[0,2.5,0]}
            />
            <Joint 
                body={armsRefs.current[2]}
                next={armsRefs.current[1]}
                firstOne={[-2.5,0,0]}
                secondOne={[0,-2.5,0]}
            />
            <WheelJoint 
                body={armsRefs.current[1]}
                next={wheelRef}
                firstOne={[2,0,0]}
                secondOne={[0,0,0]}
            />
            </group>

            {/* SUPPORT */}
            <Support supportHeight={supportHeight} />
            
            {/* GROUND */}
            <RigidBody colliders={false}>
              <Plane
                position={[0, -10, 0]}
                args={[50, 50]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <meshPhongMaterial color="blue" />
              </Plane>
            </RigidBody>
          </Physics>
          <OrbitControls />
          <Stats />
          <PerspectiveCamera makeDefault fov={50} position={[-5, -1, -15]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
