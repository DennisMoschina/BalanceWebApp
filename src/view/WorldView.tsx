import React from 'react';
import ViewGL from './ViewGL.ts';
import {World} from "../model/world/World.ts";

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
    }

    componentWillUnmount() {
        this.stopPhysicsLoop();
    }



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