import { Suspense, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
// @ts-expect-error TS_E
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'

const Model = () => {
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
const DogModel = () => {
  const fileUrl = '/dog/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)
  console.log(gltf)

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
  console.log(gltf)

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
        backgroundColor: '#000'
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Model /> */}
        <DogModel />
        <KejiModel />
      </Suspense>
    </Canvas>
  )
}

const Interaction = () => {
  return <CanvasDom />
}

export default Interaction
