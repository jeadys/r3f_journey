import { OrbitControls, Plane, useHelper, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";
import { PointLight, PointLightHelper } from "three";

const Terrain = () => {
  const terrainTexture = useTexture({
    map: "../textures/leaves-forest-ground/leaves_forest_ground_diff_1k.jpg",
    displacementMap:
      "../textures/leaves-forest-ground/leaves_forest_ground_disp_1k.jpg",
    aoMap: "../textures/leaves-forest-ground/leaves_forest_ground_arm_1k.jpg",
    roughnessMap:
      "../textures/leaves-forest-ground/leaves_forest_ground_arm_1k.jpg",
    metalnessMap:
      "../textures/leaves-forest-ground/leaves_forest_ground_arm_1k.jpg",
    normalMap:
      "../textures/leaves-forest-ground/leaves_forest_ground_nor_gl_1k.jpg",
  });

  const { aoMapIntensity } = useControls("Terrain", {
    aoMapIntensity: {
      value: 1,
      max: 2,
      min: 0,
      step: 0.5,
    },
  });

  return (
    <Plane args={[10, 10, 128, 128]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        {...terrainTexture}
        aoMapIntensity={aoMapIntensity}
      />
    </Plane>
  );
};

const Scene = () => {
  const lightRef = useRef<PointLight>(null);
  useHelper(lightRef, PointLightHelper, 1, "green");

  const { pointLightcolor } = useControls("Lights", {
    material: folder({
      pointLightcolor: "#333",
    }),
  });

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <pointLight
        ref={lightRef}
        color={pointLightcolor}
        intensity={5.5}
        position={[5, 5, 0]}
      />

      <Terrain />
    </>
  );
};

export default function Demo() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <Scene />
    </Canvas>
  );
}
