/*
 * @Author: 晴天
 * @Date: 2024-02-01 08:43:56
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-20 09:22:01
 * @FilePath: \pet-frontend\src\views\Test\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import React, { Suspense, useRef } from 'react'
import { Box } from '@mui/material'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
// @ts-expect-error TS_E
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Header from '../../components/Header'
import { Mesh } from 'three'

const Model: React.FC = () => {
  const fileUrl = '/shiba/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)

  useFrame(() => {
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}
const DogModel: React.FC = () => {
  const fileUrl = '/dog/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

const CanvasDom: React.FC = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <DogModel />
      </Suspense>
    </Canvas>
  )
}

const Test = () => {
  return (
    <Box component="div" m="20px">
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Header title="测试" subtitle="测试小标题" />
      </Box>
      <Box component="div" height="60vh">
        <CanvasDom />
      </Box>
    </Box>
  )
}

export default Test
