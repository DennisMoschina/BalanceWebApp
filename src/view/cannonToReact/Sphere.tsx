import Cannon from 'cannon';
import React, {RefObject, useRef} from "react";
import {Mesh} from 'three';


/**
 * This is a React component that renders a Cannon.js sphere.
 * @param sphere The sphere to render.
 */
class Sphere extends React.Component<{ sphere: Cannon.Body }> {
    private readonly sphereRef: RefObject<Mesh>;
    private readonly sphere: Cannon.Body;
    private readonly color: string;

    constructor(props: { sphere: Cannon.Body, color: string }) {
        super(props);
        this.sphereRef = React.createRef();
        this.color = props.color;
        this.sphere = props.sphere
    }

    render() {
        return (
            <mesh ref={this.sphereRef} castShadow>
                <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}/>
                <meshStandardMaterial color={this.color}/>
            </mesh>
        );
    }
}

export default Sphere;