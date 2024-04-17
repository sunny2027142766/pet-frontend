/* eslint-disable import/extensions */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/extensions */
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const Model = () => {
  const fileUrl = "/models/shiba/scene.gltf";
  const meshs = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    meshs.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshs}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};
