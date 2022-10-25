import {
  OrbitControls,
  Plane,
  Sphere,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import React, { useRef } from "react";
import { Clock, LinearEncoding, Mesh, SpotLight, SpotLightHelper } from "three";

const clock = new Clock();

const AnimatedSphere = () => {
  const sphereRef = useRef<Mesh>(null);

  const { radius, radiusSpeed, bounceHeight, bounceSpeed } = useControls(
    "Animation",
    {
      radius: {
        value: 2,
        min: 1,
        max: 5,
      },
      radiusSpeed: {
        value: 2,
        min: 1,
        max: 10,
      },
      bounceHeight: {
        value: 2,
        min: 1,
        max: 5,
      },
      bounceSpeed: {
        value: 2,
        min: 1,
        max: 10,
      },
    }
  );

  useFrame(() => {
    if (!sphereRef.current) {
      return;
    }
    const elapsedTime = clock.getElapsedTime();
    sphereRef.current.position.x = Math.cos(elapsedTime * radiusSpeed) * radius;
    sphereRef.current.position.z = Math.sin(elapsedTime * radiusSpeed) * radius;
    sphereRef.current.position.y = Math.abs(
      Math.sin(elapsedTime * bounceSpeed) * bounceHeight
    );
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]} castShadow>
      <meshStandardMaterial color={0xffff00} />
    </Sphere>
  );
};

const Terrain = () => {
  const terrainTexture = useTexture({
    map: "./textures/wood-cabinet-worn-long/wood_cabinet_worn_long_diff_1k.jpg",
    displacementMap:
      "./textures/wood-cabinet-worn-long/wood_cabinet_worn_long_disp_1k.jpg",
    normalMap:
      "./textures/wood-cabinet-worn-long/wood_cabinet_worn_long_nor_gl_1k.jpg",
    aoMap:
      "./textures/wood-cabinet-worn-long/wood_cabinet_worn_long_arm_1k.jpg",
    roughnessMap:
      "./textures/wood-cabinet-worn-long/wood_cabinet_worn_long_arm_1k.jpg",
    metalnessMap:
      "./textures/wood-cabinet-worn-long/wood_cabinet_worn_long_arm_1k.jpg",
  });

  return (
    <Plane
      args={[10, 10, 128, 128]}
      position-y={-2}
      rotation-x={-Math.PI / 2}
      receiveShadow
    >
      <meshStandardMaterial
        {...terrainTexture}
        normalMap-encoding={LinearEncoding}
      />
    </Plane>
  );
};

const Scene = () => {
  const spotLightRef = useRef<SpotLight>(null!);
  useHelper(spotLightRef, SpotLightHelper, "red");

  const { distance, intensity, angle, position } = useControls("Lights", {
    spotlight: folder({
      distance: { value: 8.5, min: 1, max: 10 },
      intensity: { value: 1, min: 0, max: 5 },
      angle: { value: Math.PI / 6, min: 0.1, max: 1 },
      position: { value: [0, 5, 0] },
    }),
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <spotLight
        ref={spotLightRef}
        position={position}
        distance={distance}
        intensity={intensity}
        angle={angle}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        // shadow-radius={100}
        // shadow-camera-near={0.1}
        // shadow-camera-far={20}
        // shadow-camera-left={-10}
        // shadow-camera-right={10}
        // shadow-camera-top={10}
        // shadow-camera-bottom={-10}
      />

      <Terrain />
      <AnimatedSphere />
    </>
  );
};

export default function index() {
  return (
    <Canvas camera={{ position: [5, 5, 0] }} shadows>
      <Scene />
    </Canvas>
  );
}
