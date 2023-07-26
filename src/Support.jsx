import { RoundedBox } from "@react-three/drei";
import { useRapier } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { createSupport } from "./createSupport";

export default function Support({ supportHeight }) {
    const vanillaRapier = useRapier();
    const colliderRef = useRef();

    colliderRef.current = useMemo(() => createSupport(vanillaRapier), [])
    console.log(colliderRef.current.rigidBodyDesc.translation);

    useEffect(() => {
      colliderRef.current.rigidBody.setTranslation({x: 0, y: supportHeight, z: 0}, true)
      
    }, [supportHeight])
    

  return (
      <RoundedBox scale={[2,2,2]} position={[ 0, supportHeight - 15, 0]} args={[15, 3, 5]}>
        <meshPhongMaterial color="black" />
      </RoundedBox>
  );
}