//css
import "./Intro.css"

//r3f
import { Suspense } from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Earth from "../../gltfcomponents/Earth"



export default function Intro() {
    return (
        <div className="intro-container">
            <div className="earth">
                <Canvas position={[0, 0, 0]}>
                    <Suspense>
                        <ambientLight position={[0, 20, 10]} intensity={2} />
                        <Earth />
                        <OrbitControls enableRotate={true} enableZoom={false} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="intro-text">
                <h2> Explore the business world with Bizlinks </h2>
                <p>Connect all your links in one place, meet other entreprenours and explore their businesses.</p>
            </div>
        </div>
    )
}
