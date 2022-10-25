import { Box, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

const AnimatedCube = () => {
  const boxRef = useRef<Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame(() => {
    if (!boxRef.current) {
      return;
    }
    boxRef.current.rotation.x += 0.01;
  });

  return (
    <>
      <Box
        args={[1, 1, 1]}
        ref={boxRef}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <meshStandardMaterial color={hover ? "hotpink" : "orange"} />
      </Box>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <pointLight color={0xffffff} position={[5, 5, 0]} intensity={2} />
      <AnimatedCube />
    </>
  );
};

export default function Index() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}
