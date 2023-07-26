export function createSupport(vanillaRapier) {
    const { rapier } = vanillaRapier
    const world = vanillaRapier.world;

    let rigidBodyDesc = rapier.RigidBodyDesc.kinematicPositionBased()

    let rigidBody = world.createRigidBody(rigidBodyDesc);


    let colliderDesc = new rapier.ColliderDesc(new rapier.Cuboid(15, 3, 5)).setTranslation(0,-15,0)

    let collider = world.createCollider(colliderDesc, rigidBody)

    console.log('SUPPORT CREATED!', rigidBody, rigidBodyDesc);
    
    return { rigidBody, rigidBodyDesc }
}

