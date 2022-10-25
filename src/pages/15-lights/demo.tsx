import {
  OrbitControls,
  Plane,
  TorusKnot,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";

const Scene = () => {
  const matcap = useTexture("../matcaps/matcap.jpg");
  const torusKnotBasicRef = useRef<Mesh>();
  const torusKnotStandardRef = useRef<Mesh>();
  const torusKnotLambertRef = useRef<Mesh>();
  const torusKnotMatcapRef = useRef<Mesh>();

  useFrame(() => {
    [
      torusKnotBasicRef,
      torusKnotStandardRef,
      torusKnotLambertRef,
      torusKnotMatcapRef,
    ].forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.rotateX(0.001);
      ref.current.rotateY(0.002);
      ref.current.rotateZ(0.003);
    });
  });

  const directionalLightRef = useRef<DirectionalLight>(null!);
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "green");
  const { intensity } = useControls({
    intensity: { value: 1, max: 1, min: 0, step: 0.1 },
  });

  return (
    <>
      {/* <hemisphereLight args={["#fff", "#333", intensity]} /> */}
      {/* <ambientLight intensity={intensity} /> */}
      <directionalLight ref={directionalLightRef} position={[0, 5, 5]} />

      <Plane scale={10} rotation-x={-Math.PI / 2} position-y={-2} />
      <TorusKnot ref={torusKnotBasicRef} position={[-2, 0, -2]}>
        <meshBasicMaterial color={"#cc2222"} />
      </TorusKnot>

      <TorusKnot ref={torusKnotStandardRef} position={[-2, 0, 2]}>
        <meshStandardMaterial color={"#cc2222"} />
      </TorusKnot>

      <TorusKnot ref={torusKnotLambertRef} position={[2, 0, 2]}>
        <meshLambertMaterial color={"hotpink"} />
      </TorusKnot>

      <TorusKnot ref={torusKnotMatcapRef} position={[2, 0, -2]}>
        <meshMatcapMaterial matcap={matcap} />
      </TorusKnot>
    </>
  );
};

export default function Demo() {
  return (
    <Canvas camera={{ position: [4, 7, 0] }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  );
}
