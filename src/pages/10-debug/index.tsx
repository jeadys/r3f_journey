import { Box, OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls, folder, button } from "leva";

const TweakableBox = () => {
  const [{ scale, color, wireframe, position }, set] = useControls(
    "Box",
    () => ({
      scale: {
        value: 1,
        min: 0.4,
        max: 4,
        step: 0.2,
      },
      position: [0, 0, 0],

      material: folder({
        color: "#333",
        wireframe: false,
      }),
      reset: button(() => {
        set({
          scale: 1,
          position: [0, 0, 0],
          color: "#333",
          wireframe: false,
        });
      }),
    })
  );

  return (
    <Box scale={scale} position={position}>
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </Box>
  );
};

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight color={0xffffff} intensity={0.5} />
      <directionalLight
        color={0x00fffc}
        intensity={0.3}
        position={[3, 0.25, 0]}
      />

      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial />
        </mesh>
      </group>

      <TweakableBox />
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
