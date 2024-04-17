/* eslint-disable import/extensions */
/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types";
import { useRef, Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three"; // 确保 THREE 被正确导入

const DogModel = ({ playAnimation }) => {
  const fileUrl = "/models/dog/scene.gltf";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);
  const mixerRef = useRef(null);
  const actionsRef = useRef([]);

  useEffect(() => {
    mixerRef.current = new THREE.AnimationMixer(gltf.scene);
    actionsRef.current = gltf.animations.map((clip) =>
      mixerRef.current.clipAction(clip)
    );
    actionsRef.current.forEach((action) => action.play()); // Play all animations initially
    return () => actionsRef.current.forEach((action) => action.stop());
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  useEffect(() => {
    if (playAnimation) {
      actionsRef.current.forEach((action) => action.play());
    } else {
      actionsRef.current.forEach((action) => action.stop());
    }
  }, [playAnimation]);

  return (
    <mesh
      ref={mesh}
      scale={[2, 2, 2]} // 将模型放大两倍
      position={[0, -1, 0]} // 将模型下移1单位
      rotation={[0, Math.PI, 0]} // 将模型旋转180度
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
};

DogModel.propTypes = {
  playAnimation: PropTypes.bool,
};

export default function Interaction({ playAnimation }) {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "calc(100vh - 100px)",
        backgroundColor: "rgba(0, 158, 171, 0.12)",
        borderRadius: 8,
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <DogModel playAnimation={playAnimation} />
      </Suspense>
    </Canvas>
  );
}

Interaction.propTypes = {
  playAnimation: PropTypes.bool,
};
