/*
 * @Author: 晴天
 * @Date: 2024-02-01 08:43:56
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:44:11
 * @FilePath: \pet-frontend\src\views\Test\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import React, { Suspense } from 'react'
import { Box } from '@mui/material'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
// @ts-expect-error TS_E
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Header from '../../components/Header'

const Model: React.FC = () => {
  const gltf = useLoader(GLTFLoader, './Poimandres.gltf')
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  )
}

const CanvasDom: React.FC = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model />
        <OrbitControls />
        <Environment preset="sunset" background />
      </Suspense>
    </Canvas>
  )
}

const Test = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="测试" subtitle="测试小标题" />
      </Box>
      <Box height="60vh">
        <CanvasDom />
      </Box>
    </Box>
  )
}

export default Test
