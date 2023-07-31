import { BrowserRouter, Route, Routes } from "react-router-dom";
import FourLinkSuspension from "./FourLinkSuspension/FourLinkSuspension";
import LinearSuspension from "./LinearSuspension/LinearSuspension";
import Navigation from "./Navigation/Navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { folder, useControls } from "leva";
import { Physics } from "@react-three/rapier";
import Ground from "./Common/Ground";
import { Vehicle } from "./RigidVehicle/Vehicle";

export default function App() {
    const maxValue = 20;
    const { xCamera, yCamera, zCamera } = useControls('Camera', {
        'cameraPosition': folder({
            xCamera: {
                max: maxValue,
                min: -maxValue,
                step: 0.1,
                value: 9
            },
            yCamera: {
                max: maxValue,
                min: -maxValue,
                step: 0.1,
                value: 0
            },
            zCamera: {
                max: maxValue,
                min: -maxValue,
                step: 0.1,
                value: 4
            }
        }),
    })
  return (
    <BrowserRouter>
      <Navigation />
      <Canvas frameloop="demand" className="w-full h-full">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Stats />
        <PerspectiveCamera makeDefault fov={50} position={[xCamera, yCamera, zCamera]} rotation={[0,0,0]} />
        <Physics debug gravity={[0,-10,-0]}>
            <Routes>
            <Route path="/fourlinksuspension" element={<FourLinkSuspension />} />
            <Route path="/linearsuspension" element={<LinearSuspension />} />
            <Route path="/rigidvehicle" element={<Vehicle />} />
            </Routes>
        </Physics>
      </Canvas>
    </BrowserRouter>
  );
}
