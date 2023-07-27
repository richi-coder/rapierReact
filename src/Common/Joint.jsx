import { useFrame } from "@react-three/fiber";
import { usePrismaticJoint, useRevoluteJoint } from "@react-three/rapier";

export const Joint = ({ body, next, firstOne, secondOne }) => {
  const joint = useRevoluteJoint(body, next, [
    // Position of the joint in bodyA's local space
    firstOne,
    // Position of the joint in bodyB's local space
    secondOne,
    // Axis of the joint, expressed in the local-space of
    // the rigid-bodies it is attached to. Cannot be [0,0,0].
    [0, 0, 1],
  ]);

  useFrame(() => {
    // joint.current.configureMotorVelocity(20, 10)
  });

  return null;
};

export const WheelJoint = ({ body, next, firstOne, secondOne }) => {
  const joint = useRevoluteJoint(body, next, [
    // Position of the joint in bodyA's local space
    firstOne,
    // Position of the joint in bodyB's local space
    secondOne,
    // Axis of the joint, expressed in the local-space of
    // the rigid-bodies it is attached to. Cannot be [0,0,0].
    [1, 0, 0],
  ]);

  useFrame(() => {
    // joint.current.configureMotorVelocity(20, 10)
  });

  return null;
};

export const PrismaticJoint = ({ bodyA, bodyB, multidimensionalArray }) => {
  const joint = usePrismaticJoint(bodyA, bodyB, multidimensionalArray);

  return null;
};
