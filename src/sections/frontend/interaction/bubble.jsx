/* eslint-disable import/extensions */
/* eslint-disable react/no-unknown-property */
// import PropTypes from "prop-types";
// import React, { useRef, useMemo } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import { Text, Plane } from "@react-three/drei";
// import * as THREE from "three";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// 创建一个简单的三角形几何形状
function Triangle({ color }) {
  // 创建一个三角形形状
  const vertices = new Float32Array([
    0,
    0,
    0, // 顶点1
    0.5,
    0,
    0, // 顶点2
    0.25,
    -0.5,
    0, // 顶点3（尾巴指向的方向）
  ]);

  // 使用BufferGeometry
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  return (
    <mesh geometry={geom}>
      <meshBasicMaterial
        attach="material"
        color={color || "white"}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
Triangle.propTypes = {
  color: PropTypes.string,
};

export default function Bubble({ message, position, visible }) {
  const meshRef = useRef();
  const textRef = useRef();
  const { viewport } = useThree();

  //   const backgroundSize = useMemo(() => {
  //     const width = textRef.current ? textRef.current.textWidth + 1 : 1;
  //     const height = textRef.current ? textRef.current.textHeight + 0.5 : 0.5;
  //     return [width, height, 0.1];
  //   }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.z += 0.01 * Math.sin(Date.now() * 0.001);
    }
  });
  return (
    visible && (
      <group position={position} ref={meshRef}>
        <Text
          color="black"
          lineHeight={1}
          letterSpacing={0.02}
          font="/fonts/bubble.ttf"
          anchorX="center"
          anchorY="middle"
          ref={textRef}
          fontSize={0.5}
          maxWidth={viewport.width / 2}
          textAlign="center"
        >
          {message}
        </Text>
        {/* <Plane
          args={backgroundSize}
          backgroundColor="white"
          //   rotation={[-Math.PI / 2, 0, 0]}
          //   position={[0.01, 0.01, 0.05]}
        >
          <meshBasicMaterial
            attach="material"
            color="black"
            transparent
            opacity={0.8}
          />
        </Plane> */}
        {/* 添加气泡尾巴 */}
        {/* <Triangle position={[0, -backgroundSize[1] / 2, 0]} color="white" /> */}
      </group>
    )
  );
}

Bubble.propTypes = {
  message: PropTypes.string,
  position: PropTypes.array,
  visible: PropTypes.bool,
};
