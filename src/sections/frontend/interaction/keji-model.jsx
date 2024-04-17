/* eslint-disable import/extensions */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/extensions */
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const KejiModel = () => {
  const fileUrl = "/models/keji/scene.gltf";
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, fileUrl);
  // console.log(gltf)
  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};
