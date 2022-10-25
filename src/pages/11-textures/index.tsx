import {
  Environment,
  OrbitControls,
  Plane,
  Sphere,
  useCubeTexture,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { LinearEncoding, PointLight, PointLightHelper, Vector2 } from "three";

const AnimatedSphere = () => {
  const cubeTexture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "./hdri/forest-cave/" }
  );

  return (
    <Sphere args={[1, 32, 32]} position-y={2}>
      <meshBasicMaterial envMap={cubeTexture} />
    </Sphere>
  );
};

const Terrain = () => {
  const terrainTexture = useTexture({
    map: "./textures/aerial-rocks-01/aerial_rocks_01_diff_1k.jpg",
    displacementMap: "./textures/aerial-rocks-01/aerial_rocks_01_disp_1k.jpg",
    aoMap: "./textures/aerial-rocks-01/aerial_rocks_01_arm_1k.jpg",
    roughnessMap: "./textures/aerial-rocks-01/aerial_rocks_01_arm_1k.jpg",
    metalnessMap: "./textures/aerial-rocks-01/aerial_rocks_01_arm_1k.jpg",
    normalMap: "./textures/aerial-rocks-01/aerial_rocks_01_nor_gl_1k.jpg",
  });

  const {
    displacementScale,
    aoMapIntensity,
    roughness,
    metalness,
    normalScale,
  } = useControls({
    displacementScale: {
      value: 1,
      min: -5,
      max: 5,
    },
    aoMapIntensity: {
      value: 1,
      min: 0,
      max: 10,
    },
    roughness: {
      value: 1,
      min: 0,
      max: 1,
    },
    metalness: {
      value: 1,
      min: 0,
      max: 1,
    },
    normalScale: [1, 1],
  });

  return (
    <>
      <Plane args={[10, 10, 128, 128]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          {...terrainTexture}
          normalMap-encoding={LinearEncoding}
          displacementScale={displacementScale}
          aoMapIntensity={aoMapIntensity}
          roughness={roughness}
          metalness={metalness}
          normalScale={new Vector2(normalScale[0], normalScale[1])}
        />
      </Plane>
    </>
  );
};

const Scene = () => {
  const ligthRef = useRef<PointLight>(null!);
  useHelper(ligthRef, PointLightHelper, 1, "red");

  return (
    <>
      <ambientLight />
      <pointLight ref={ligthRef} position={[5, 5, 0]} />
      <OrbitControls />
      <Environment
        background={true}
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path="./hdri/forest-cave/"
      />
      <AnimatedSphere />
      <Terrain />
    </>
  );
};

export default function Index() {
  return (
    <>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <Scene />
      </Canvas>
    </>
  );
}
