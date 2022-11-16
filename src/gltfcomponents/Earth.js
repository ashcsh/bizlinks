//react
import { useRef } from 'react'

//react-three-fiber / drei
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"

export default function Earth(props) {

  //refs
  const group = useRef()
  const cloud = useRef()
  const earth = useRef()

  const { nodes, materials } = useGLTF('/earth.gltf')

  //rotate "animation"
  useFrame(() => {
    if (!group.current) {
        return;
    }
    cloud.current.rotation.y += 0.009;
    earth.current.rotation.y += -0.009;
    earth.current.rotation.x += 0.005;
})
  return (
    //actual component
    <group ref={group} {...props} dispose={null} scale={2.4} >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-1.54, -0.06, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clouds_1">
                <mesh ref={cloud} name="Object_4" geometry={nodes.Object_4.geometry} material={materials.Clouds} />
              </group>
              <group name="Planet_2">
                <mesh ref={earth} name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Planet} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}