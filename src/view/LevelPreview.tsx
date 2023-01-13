import React, {Component} from "react";
import ViewGL from "./ViewGL.ts";
import Level from "../model/world/Level.ts";

class LevelPreview extends Component {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
    private viewGL: ViewGL;

    private props: { level: Level };

    private timer: NodeJS.Timer;

    constructor(props: { level: Level }) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewGL = new ViewGL(canvas, this.props.level);

        this.viewGL.camera.position.set(0, -10, 10);
        this.viewGL.camera.rotateX(Math.PI / 4);

        this.handleResize();

        this.timer = setInterval(() => {
            this.rotatePlane();
        }, 1000 / 60);
    }

    componentWillUnmount() {
    }

    handleResize = () => {
        this.viewGL.onWindowResize(window.innerWidth / 3, window.innerHeight / 3);
    };

    private rotatePlane() {
        this.viewGL.plane.rotateZ(0.002);
    }

    render() {
        return (
            <div className="canvasContainer" >
                <canvas ref={this.canvasRef} />
            </div>
        );
    }
}

export default LevelPreview;