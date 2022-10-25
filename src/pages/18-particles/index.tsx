import {
  Box,
  OrbitControls,
  PointMaterial,
  Sphere,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useCallback, useMemo, useRef } from "react";

const Particles = () => {
  const particleTextures = useTexture({
    alphaMap: "./textures/particles/3.png",
  });
  const bufferRef = useRef<any>(null);

  const { particleSpeed, particleFrequency, particleAmplitude, particleColor } =
    useControls("Particles", {
      particleSpeed: {
        value: 15,
        min: 10,
        max: 100,
      },
      particleFrequency: {
        value: 0.002,
        min: 0.001,
        max: 0.005,
      },
      particleAmplitude: {
        value: 3,
        min: 1,
        max: 10,
      },
      particleColor: {
        value: "lightblue",
      },
    });
  let particleShift = 0;

  const graph = useCallback(
    (x: number, z: number) => {
      return (
        Math.sin(particleFrequency * (x ** 2 + z ** 2 + particleShift)) *
        particleAmplitude
      );
    },
    [particleSpeed, particleFrequency, particleAmplitude, particleColor]
  );

  const particleCount = 200;
  const particleSeperator = 3;

  let particlePositions = useMemo(() => {
    let particlePositions: number[] = [];

    for (let xi = 0; xi < particleCount; xi++) {
      for (let zi = 0; zi < particleCount; zi++) {
        let x = particleSeperator * (xi - particleCount / 2);
        let z = particleSeperator * (zi - particleCount / 2);
        let y = graph(x, z);
        particlePositions.push(x, y, z);
      }
    }

    return new Float32Array(particlePositions);
  }, [graph]);

  useFrame(() => {
    particleShift += particleSpeed;
    const particlePositions = bufferRef.current.array;

    let i = 0;

    for (let xi = 0; xi < particleCount; xi++) {
      for (let zi = 0; zi < particleCount; zi++) {
        let x = particleSeperator * (xi - particleCount / 2);
        let z = particleSeperator * (zi - particleCount / 2);
        particlePositions[i + 1] = graph(x, z);
        i += 3;
      }
    }
    bufferRef.current.needsUpdate = true;
  });

  return (
    <>
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            ref={bufferRef}
            attach="attributes-position"
            array={particlePositions}
            itemSize={3}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          {...particleTextures}
          color={particleColor}
          size={0.5}
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
    <Canvas camera={{ position: [70, 50, 0] }}>
      <OrbitControls />
      <ambientLight />

      <Particles />
    </Canvas>
  );
}
