import {
  Box,
  OrbitControls,
  Sphere,
  Torus,
  useCubeTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { AmbientLight } from "three";

const BasicTorus = () => {
  const { color, opacity, reflectivity } = useControls("Torus", {
    color: "#fff",
    opacity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    reflectivity: 1,
  });

  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "./hdri/forest-cave/" }
  );

  return (
    <>
      <Torus args={[2, 0.5, 32, 128]}>
        <meshBasicMaterial
          color={color}
          envMap={texture}
          reflectivity={reflectivity}
          opacity={opacity}
          transparent
          depthWrite={true}
          wireframe
        />
      </Torus>
      ;
    </>
  );
};

const Scene = () => {
  const { color } = useControls("Fog", { color: "#000" });
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <pointLight color={0xffffff} intensity={2} position={[5, 5, 0]} />

      <fog attach={"fog"} args={[color, 2, 10]} />
      <Box position={[0, 0, -1]} />
      <BasicTorus />
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
