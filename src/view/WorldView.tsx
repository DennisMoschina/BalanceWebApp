import React from 'react';
import ViewGL from './ViewGL.ts';
import {World} from "../model/world/World.ts";
import * as Cannon from 'cannon';
import DeviceOrientationWrapper from "../model/motion/DeviceOrientationWrapper.ts";
import Level from "../model/world/Level.ts";


export default class WorldView extends React.Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
    private viewGL: ViewGL;
    props: { world: World };

    private readonly sampleRate = 60;

    private physicsLoopInterval: NodeJS.Timer;

    private wrapper: DeviceOrientationWrapper;

    constructor(props: { world: World }) {
        super(props);
        this.canvasRef = React.createRef();
    }

    private startPhysicsLoop() {
        // run the physics loop at a fixed time step
        this.physicsLoopInterval = setInterval(() => {
            this.updateWorld();
        }, 1000 / this.sampleRate);
    }

    private stopPhysicsLoop() {
        clearInterval(this.physicsLoopInterval);
    }

    updateWorld() {
        this.props.world.update(1 / this.sampleRate);
        this.viewGL.plane.position.copy(this.props.world.plane.position);
        this.viewGL.plane.quaternion.copy(this.props.world.plane.quaternion);
        this.viewGL.sphere.position.copy(this.props.world.ball.position);
        this.viewGL.sphere.quaternion.copy(this.props.world.ball.quaternion);
        this.viewGL.finish.position.copy(this.props.world.finish.position);
        this.viewGL.finish.quaternion.copy(this.props.world.finish.quaternion);
    }

    // ******************* COMPONENT LIFECYCLE ******************* //
    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewGL = new ViewGL(canvas, this.props.world);

        this.handleResize();
        this.props.world.onFellOff = () => { this.props.world.reset() };
    }

    componentWillUnmount() {
        this.stopPhysicsLoop();
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    startSimulation = () => {
        this.startPhysicsLoop()

        if (navigator.maxTouchPoints > 0) {
            this.wrapper = new DeviceOrientationWrapper();
            this.wrapper.enable(event => {
                this.rotatePlane(new Cannon.Quaternion(event.beta * Math.PI / 360, event.gamma * Math.PI / 360, 0));
            });
        } else {
            window.addEventListener('mousemove', this.handleMouseMove);
        }
    }

    stopSimulation = () => {
        this.stopPhysicsLoop();
        if (this.wrapper) {
            this.wrapper.disable();
        }
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
        this.rotatePlane(rotation);
    };

    private rotatePlane(quaternion: Cannon.Quaternion) {
        this.props.world.rotate(quaternion);
    }

    handleResize = () => {
        this.viewGL.onWindowResize(window.innerWidth, window.innerHeight);
    };

    render() {
        return (
            <div className="canvasContainer" >
                <canvas ref={this.canvasRef} />
            </div>
        );
    }

    setLevel(level: Level) {
        this.viewGL.renderPlaneWith(level.rendering.geometry, level.rendering.material);
        this.props.world.plane = level.plane;
    }
}