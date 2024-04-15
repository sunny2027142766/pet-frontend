import { Suspense, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
// @ts-expect-error TS_E
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import { PandasIcon, TouchIcon, InterActionIcon } from './icons'

const Model = () => {
  const fileUrl = '/shiba/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.01
  // })

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}
const DogModel = () => {
  const fileUrl = '/dog/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)
  // console.log(gltf)

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

const KejiModel = () => {
  const fileUrl = '/keji/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)
  // console.log(gltf)
  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

const CanvasDom = () => {
  return (
    <Canvas
      style={{
        width: '100%',
        height: 'calc(100vh - 64px - 65px)',
        background: '#c6e5db'
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
        {/* <DogModel /> */}
        {/* <KejiModel /> */}
      </Suspense>
    </Canvas>
  )
}

const HandleButtons = () => {
  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="default"
        shape="square"
        style={{ right: 24, bottom: 100 }}
        icon={<InterActionIcon style={{ fontSize: '20px' }} />}
        tooltip={<div>宠物互动</div>}
      >
        <FloatButton tooltip={<div>宠物展示</div>} icon={<PandasIcon style={{ fontSize: '20px' }} />} />
        <FloatButton tooltip={<div>抚摸</div>} icon={<TouchIcon style={{ fontSize: '20px' }} />} />
      </FloatButton.Group>
    </>
  )
}

const Interaction = () => {
  return (
    <>
      <CanvasDom />
      <HandleButtons />
    </>
  )
}

export default Interaction
