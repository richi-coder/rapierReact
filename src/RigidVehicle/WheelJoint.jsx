import { useFrame } from "@react-three/fiber";
import { useRevoluteJoint } from "@react-three/rapier";

export const WheelJoint = ({
    body,
    wheel,
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
    motorVel
  }) => {
    const joint = useRevoluteJoint(body, wheel, [
      bodyAnchor,
      wheelAnchor,
      rotationAxis
    ]);
  
    useFrame(() => {
      if (joint.current && motorVel != 0) {
        joint.current.configureMotorVelocity(motorVel, 1);
      }
    });
  
    return null;
  };