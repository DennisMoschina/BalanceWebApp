import Cannon from 'cannon';
import React, {RefObject, useRef} from "react";
import { Mesh, DoubleSide } from 'three';


/**
 * This is a React component that renders a Cannon.js plane.
 * @param plane The plane to render.
 */
class Plane extends React.Component<{ plane: Cannon.Body }> {
    private readonly planeRef: RefObject<Mesh>;
    private readonly plane: Cannon.Body;
    private readonly color: string;

    constructor(props: { plane: Cannon.Body, color: string }) {
        super(props);
        this.planeRef = React.createRef();
        this.color = props.color;
        this.plane = props.plane
    }

    render() {
        return (
            <mesh ref={this.planeRef} receiveShadow>
                <planeBufferGeometry attach="geometry" args={[100, 100]} />
                <meshStandardMaterial color={this.color} />
            </mesh>
        );
    }
}


export default Plane;