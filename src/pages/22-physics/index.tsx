import {
  Box,
  Cloud,
  Environment,
  OrbitControls,
  Plane,
  Sky,
  Sphere,
  useCubeTexture,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";
import {
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  LinearEncoding,
  Mesh,
  Vector2,
} from "three";

import { Physics, RigidBody, RigidBodyApi } from "@react-three/rapier";

type PhysicsSphereTypes = {
  restitution: number;
  position: [x: number, y: number, z: number];
  color: number | string;
  scale: number;
};

const PhysicsSphere = ({
  restitution,
  position,
  color,
  scale,
}: PhysicsSphereTypes) => {
  return (
    <>
      <RigidBody
        shape={"ball"}
        colliders={"ball"}
        type={"dynamic"}
        restitution={restitution}
        // gravityScale={1}
      >
        <Sphere args={[scale, 32, 32]} castShadow position={position}>
          <meshBasicMaterial color={color} />
        </Sphere>
      </RigidBody>
    </>
  );
};

const TerrainLights = () => {
  const { position, intensity, color } = useControls("directionalLight", {
    position: {
      value: [-40, 40, -5],
    },
    intensity: {
      value: 1,
      min: 0.1,
      max: 2,
    },
    color: {
      value: "white",
    },
  });

  const directionalLightRef = useRef<DirectionalLight>(null);
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "red");
  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={position}
        intensity={intensity}
        color={color}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={100}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      ;
    </>
  );
};

const Terrain = () => {
  const terrainTextures = useTexture({
    map: "./textures/marble-01/marble_01_diff_1k.jpg",
    displacementMap: "./textures/marble-01/marble_01_disp_1k.jpg",
    normalMap: "./textures/marble-01/marble_01_nor_gl_1k.jpg",
    aoMap: "./textures/marble-01/marble_01_arm_1k.jpg",
    roughnessMap: "./textures/marble-01/marble_01_arm_1k.jpg",
  });

  return (
    <>
      <RigidBody type="fixed">
        <Box
          args={[100, 100, 2, 128, 128]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial
            {...terrainTextures}
            normalMap-encoding={LinearEncoding}
            displacementScale={0.2}
            aoMapIntensity={2}
            roughness={-10}
            normalScale={new Vector2(1, 1)}
          />
        </Box>
      </RigidBody>
    </>
  );
};

type TerrainWallsProps = {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
};

const TerrainWalls = ({ position, rotation }: TerrainWallsProps) => {
  const terrainTextures = useTexture({
    map: "./textures/marble-01/marble_01_diff_1k.jpg",
    displacementMap: "./textures/marble-01/marble_01_disp_1k.jpg",
    normalMap: "./textures/marble-01/marble_01_nor_gl_1k.jpg",
    aoMap: "./textures/marble-01/marble_01_arm_1k.jpg",
    roughnessMap: "./textures/marble-01/marble_01_arm_1k.jpg",
  });

  return (
    <>
      <RigidBody type="fixed" position={position} rotation={rotation}>
        <Box args={[100, 50, 2, 128, 128]} rotation={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial
            {...terrainTextures}
            normalMap-encoding={LinearEncoding}
            displacementScale={0.2}
            aoMapIntensity={2}
            roughness={-10}
            normalScale={new Vector2(1, 1)}
          />
        </Box>
      </RigidBody>
    </>
  );
};

export default function Index() {
  return (
    <Canvas camera={{ position: [-40, 60, 40] }} shadows>
      <OrbitControls />
      <Cloud scale={2.5} position={[20, 20, 5]} />
      <Cloud scale={1.5} position={[-20, 20, 5]} />
      <Sky />
      <ambientLight />
      <TerrainLights />

      <Physics>
        <PhysicsSphere
          restitution={2}
          position={[5, 10, 10]}
          color="hotpink"
          scale={5}
        />
        <PhysicsSphere
          restitution={2}
          position={[1, 8, 3]}
          color="lightblue"
          scale={5}
        />
        <PhysicsSphere
          restitution={2}
          position={[1, 10, 7]}
          color="lightgreen"
          scale={5}
        />
        <Terrain />
        <TerrainWalls position={[0, 25, 50]} rotation={[0, 0, 0]} />
        <TerrainWalls position={[0, 25, -50]} rotation={[0, 0, 0]} />
        <TerrainWalls position={[50, 25, 0]} rotation={[0, Math.PI * 0.5, 0]} />
        <TerrainWalls
          position={[-50, 25, 0]}
          rotation={[0, Math.PI * 0.5, 0]}
        />
      </Physics>
    </Canvas>
  );
}
