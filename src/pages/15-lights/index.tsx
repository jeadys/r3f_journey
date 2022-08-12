import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import { Mesh } from "three";

type SpinningMeshProps = {
  position: [x: number, y: number, z: number];
  args: [width: number, height: number, depth: number];
  color: string | number;
};

const SpinningMesh = ({ position, args, color }: SpinningMeshProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default function index() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 0]} intensity={1.5} />
        <pointLight position={[2, 3, 4]} intensity={0.5} />

        <group>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial attach="material" color={"white"} />
          </mesh>
        </group>

        <SpinningMesh
          position={[-1.5, 0, 0]}
          args={[0.75, 0.75, 0.75]}
          color={0xff0000}
        />
        <SpinningMesh
          position={[0, 0, 0]}
          args={[0.75, 0.75, 0.75]}
          color={0x00ff00}
        />
        <SpinningMesh
          position={[1.5, 0, 0]}
          args={[0.75, 0.75, 0.75]}
          color={0x0000ff}
        />
      </Canvas>
      ;
    </>
  );
}
