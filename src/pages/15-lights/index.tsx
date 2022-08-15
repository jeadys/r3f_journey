import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import {
  BoxHelper,
  DirectionalLightHelper,
  HemisphereLightHelper,
  Mesh,
  PointLightHelper,
  SpotLightHelper,
} from "three";

type SpinningMeshProps = {
  position: [x: number, y: number, z: number];
  args: [width: number, height: number, depth: number];
  color?: string | number;
};

const SpinningMesh = ({ position, args, color }: SpinningMeshProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene = () => {
  const hemisphereLighRef = useRef(null);
  useHelper(hemisphereLighRef, HemisphereLightHelper, 0.2);

  const directionalLightRef = useRef(null);
  useHelper(directionalLightRef, DirectionalLightHelper, 0.2);

  const pointLightRef = useRef(null);
  useHelper(pointLightRef, PointLightHelper, 0.2);

  const spotLightRef = useRef(null);
  useHelper(spotLightRef, SpotLightHelper, 0.2);

  return (
    <>
      <OrbitControls />
      <ambientLight color={0xffffff} intensity={0.5} />
      <directionalLight
        color={0x00fffc}
        intensity={0.3}
        position={[3, 0.25, 0]}
        ref={directionalLightRef}
      />
      <hemisphereLight
        color={0xff0000}
        groundColor={0x0000ff}
        intensity={2}
        ref={hemisphereLighRef}
      />
      <pointLight
        color={0xff9000}
        intensity={1.5}
        position={[1, -0.5, 1]}
        decay={2}
        distance={10}
        ref={pointLightRef}
      />

      <rectAreaLight
        color={0x4e00ff}
        intensity={10}
        width={1}
        height={1}
        position={[-1.5, 0, 1.5]}
      />

      <spotLight
        color={0x78ff00}
        intensity={0.5}
        distance={10}
        angle={Math.PI * 0.1}
        penumbra={0.25}
        decay={1}
        position={[0, 2, 3]}
        ref={spotLightRef}
      />

      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial />
        </mesh>
      </group>

      <SpinningMesh
        position={[-1.5, 0, 0]}
        args={[0.75, 0.75, 0.75]}
        color={0xffffff}
      />
      <SpinningMesh
        position={[0, 0, 0]}
        args={[0.75, 0.75, 0.75]}
        color={0xffffff}
      />
      <SpinningMesh
        position={[1.5, 0, 0]}
        args={[0.75, 0.75, 0.75]}
        color={0xffffff}
      />
    </>
  );
};

export default function index() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}
