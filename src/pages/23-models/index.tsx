import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { sRGBEncoding } from "three";
import { Ship } from "../../components/Ship";

const ShipPresentation = () => {
  const { rotationY } = useControls("Ship", {
    rotations: folder({
      rotationY: {
        value: 0,
        min: -Math.PI,
        max: Math.PI,
      },
    }),
  });

  return (
    <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2.3}>
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 150 }}
        rotation={[0, 3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Ship scale={0.1} rotation-y={rotationY} />
      </PresentationControls>
    </Float>
  );
};

export default function Index() {
  const { position, intensity } = useControls("Lights", {
    directional: folder({
      position: {
        value: [0.25, 3, 2.25],
      },
      intensity: {
        value: 1,
        min: 0,
        max: 10,
      },
    }),
  });

  return (
    <Canvas camera={{ position: [1, 3, 1.5] }}>
      <OrbitControls />
      <ambientLight />
      <directionalLight position={position} intensity={intensity} />
      <Environment
        background={false}
        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path="./hdri/umhlanga-sunrise/"
        encoding={sRGBEncoding}
      />

      <ShipPresentation />

      <ContactShadows position={[0, -0.3, 0]} blur={2.5} scale={20} far={10} />
    </Canvas>
  );
}
