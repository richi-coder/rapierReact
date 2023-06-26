import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box, OrbitControls, PerspectiveCamera, Plane, Stats } from "@react-three/drei";
import VanillaBox from "./VanillaBox";

function App() {
  return (
    <div id="container">
      <Canvas>
        <Suspense fallback={null}>
          <Physics debug gravity={[0,-9.81,0]}>
            <RigidBody>
              <Box args={[5, 5, 5]} rotation={[0, 0.5, 0]} position={[0,35,0]} />
            </RigidBody>
            <RigidBody>
              <Plane args={[50,50]} rotation={[-Math.PI/2,0,0]} />
            </RigidBody>
            <VanillaBox />
          </Physics>
          <OrbitControls />
          <Stats />
          <PerspectiveCamera makeDefault fov={50} position={[40, 15, 35]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
