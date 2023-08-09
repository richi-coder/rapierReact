import { Box } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier"
import { useEffect } from "react";
import Ground from "../Common/Ground";

export default function RayCasting() {
    const vanillaRapier = useRapier();
    const world = vanillaRapier.world;
    const RAPIER = vanillaRapier.rapier;
    
    // useEffect(() => {
        let ray = new RAPIER.Ray({ x: 0.0, y: -1.0, z: 0.0 }, { x: 0.0, y: 1.0, z: 0.0 });
        let maxToi = 4.0;
        let solid = false;
        
        let hit = world.castRay(ray, maxToi, solid);

        if (hit != null) {
            // The first collider hit has the handle `hit.colliderHandle` and it hit after
            // the ray travelled a distance equal to `ray.dir * toi`.
            let hitPoint = ray.pointAt(hit.toi); // Same as: `ray.origin + ray.dir * toi`
            console.log("Collider", hit.colliderHandle, "hit at point", hitPoint);
        }
        
    // }, [])
    

  return (
    <>
    <RigidBody >
        <Box
            position={[0,5,0]}
        >
            <meshPhongMaterial color='green' />
        </Box>
    </RigidBody>
    <Ground />
    </>
  )
}
