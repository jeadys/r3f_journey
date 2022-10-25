import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo } from "react";

const Galaxy = () => {
  const {
    particleCount,
    particleSize,
    particleRandomness,
    galaxyRadius,
    galaxyBranches,
    galaxySpin,
  } = useControls("Particles", {
    particleCount: {
      value: 20000,
      min: 200,
      max: 20000,
    },
    particleSize: {
      value: 0.01,
      max: 0.1,
      min: 0.001,
    },
    particleRandomness: {
      value: 1,
      min: -5,
      max: 5,
    },
    galaxyRadius: {
      value: 5,
      min: 1,
      max: 20,
    },
    galaxyBranches: {
      value: 6,
      min: 2,
      max: 20,
      stap: 1,
    },
    galaxySpin: {
      value: 0.5,
      min: -5,
      max: 5,
      step: 0.001,
    },
  });

  let particlePositions = useMemo(() => {
    let particlePositions: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i + 3;
      const radius = Math.random() * galaxyRadius;
      const spinAngle = radius * galaxySpin;
      const branchAngle = ((i % galaxyBranches) / galaxyBranches) * Math.PI * 2;
      if (i < 20) {
        console.log(i, branchAngle);
      }

      const randomness = (Math.random() - 0.5) * particleRandomness;

      let x = Math.cos(branchAngle + spinAngle) * radius + randomness;
      let y = randomness;
      let z = Math.sin(branchAngle + spinAngle) * radius + randomness;
      particlePositions.push(x, y, z);
    }

    return new Float32Array(particlePositions);
  }, [galaxyRadius, galaxyBranches]);

  useFrame(() => {});

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particlePositions}
            itemSize={3}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={"red"}
          size={particleSize}
          sizeAttenuation
          transparent
          alphaTest={0.001}
        />
      </points>
    </>
  );
};

export default function Index() {
  return (
    <Canvas camera={{ position: [0, 10, 0] }}>
      <OrbitControls />
      <ambientLight />
      <Galaxy />
    </Canvas>
  );
}
