import React, { useEffect, useRef, Component } from 'react';
import { World } from '../model/world/World.ts';
import {Physics, usePlane, useSphere} from "@react-three/cannon";
import {Canvas, useFrame} from "@react-three/fiber";
import Sphere from "./cannonToReact/Sphere.tsx";
import * as Cannon from 'cannon';
import Plane from "./cannonToReact/Plane.tsx";


const PPlane = () => {
    const [ref, api] = usePlane(() => ({
        mass: 1,
        position: [0, 0, 0],
        type: "Static",
        rotation: [-Math.PI / 2, 0, 0]
    }));
    useFrame(({ mouse }) => {
        api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
    });
    return (
        <mesh scale={200} ref={ref} receiveShadow>
            <planeBufferGeometry />
            <meshStandardMaterial color="white" />
        </mesh>
    );
};

class WorldView extends Component {
    private world: World;

    constructor(props: World) {
        super(props);

        this.world = props
    }

    /*
    componentDidMount() {
        this.worldRef = React.createRef();
        console.log("mounted");
    }
     */

    render() {
        const plane = new Cannon.Body({
            mass: 0,
            shape: new Cannon.Plane(),
            position: [0, 0, 0],
            type: "Static",
            rotation: [-Math.PI / 2, 0, 0]
        });
        return (
            <Canvas camera={{ position: [0, 20, 0], fov: 90 }} shadows>
                <color attach="background" args={["#eeeeee"]} />
                <fog attach="fog" args={["#94ebd8", 0, 40]} />
                <ambientLight intensity={0.1} />
                <directionalLight intensity={0.1} castShadow />
                <pointLight
                    castShadow
                    intensity={3}
                    args={[0xff0000, 1, 100]}
                    position={[-1, 3, 1]}
                />
                <spotLight
                    castShadow
                    intensity={1}
                    args={["blue", 1, 100]}
                    position={[-1, 4, -1]}
                    penumbra={1}
                />
                <Physics>
                    <Sphere sphere={this.world.ball} color={"white"} />
                    <Plane plane={plane} />
                </Physics>
            </Canvas>
        )
    }
}

export default WorldView;
