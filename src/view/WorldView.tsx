import React from 'react';
import ViewGL from './ViewGL.ts';
import {World} from "../model/world/World.ts";
import * as Cannon from 'cannon';

export default class WorldView extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
    private viewGL: ViewGL;
    props: { world: World };

    private readonly sampleRate = 60;

    private physicsLoopInterval: NodeJS.Timer;

    constructor(props: { world: World }) {
        super(props);
        this.canvasRef = React.createRef();
    }

    startPhysicsLoop() {
        // run the physics loop at a fixed time step
        this.physicsLoopInterval = setInterval(() => {
            this.updateWorld();
        }, 1000 / this.sampleRate);
    }

    stopPhysicsLoop() {
        clearInterval(this.physicsLoopInterval);
    }

    updateWorld() {
        this.props.world.update(1 / this.sampleRate);
        this.viewGL.plane.position.copy(this.props.world.plane.position);
        this.viewGL.plane.quaternion.copy(this.props.world.plane.quaternion);
        this.viewGL.sphere.position.copy(this.props.world.ball.position);
        this.viewGL.sphere.quaternion.copy(this.props.world.ball.quaternion);
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewGL = new ViewGL(canvas, this.props.world);

        this.handleResize();
        this.startPhysicsLoop()

        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        this.stopPhysicsLoop();
        window.removeEventListener('mousemove', this.handleMouseMove);
    }


    handleMouseMove = (e: React.MouseEvent) => {
        const mouseX = e.clientX - window.innerWidth / 2;
        const mouseY = -(e.clientY - window.innerHeight / 2);
        let direction = new Cannon.Vec3(mouseX, mouseY, 0);

        console.log("before", direction);

        //create a vector pointing ninety degrees to the left of the direction vector
        const left = new Cannon.Vec3(0, 0, 1);
        direction = left.cross(direction);

        console.log("after", direction);

        const rotation = new Cannon.Quaternion();
        rotation.setFromAxisAngle(direction, 0.01);
        this.props.world.plane.quaternion = rotation;
    };

    handleResize = () => {
        this.viewGL.onWindowResize(window.innerWidth, window.innerHeight);
    };

    render() {
        return (
            <div className="canvasContainer">
                <canvas ref={this.canvasRef} />
            </div>
        );
    }
}