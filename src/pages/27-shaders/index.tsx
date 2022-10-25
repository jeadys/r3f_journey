import { shaderMaterial } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";

const waveShaderMaterial = shaderMaterial(
  {},
  glsl`
  void main()
  {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  glsl``
);
extend({ waveShaderMaterial });
const Scene = () => {
  return (
    <>
      <mesh>
        <planeGeometry args={[5, 5]} />
        <waveShaderMaterial />
        {/* <meshStandardMaterial color={"lightblue"} /> */}
      </mesh>
    </>
  );
};

export default function Index() {
  return (
    <Canvas>
      <ambientLight />
      <Scene />
    </Canvas>
  );
}
