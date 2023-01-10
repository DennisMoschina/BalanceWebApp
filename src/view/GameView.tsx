import React, {Component} from "react";
import {World} from "../model/world/World.ts";
import WorldView from "./WorldView.tsx";


class GameView extends Component {
    private worldViewRef = React.createRef<WorldView>();
    private world: World;

    state: {
        running: boolean
    }

    constructor(props: any) {
        super(props);

        this.state = {
            running: false
        }
        this.world = new World();
        this.world.onFellOff = this.onLose;
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {!this.state.running ? <div className="overlay">
                    <button className="startButton" onClick={this.startGame}>
                        Start
                    </button>
                </div> : null}
                <WorldView ref={this.worldViewRef} world={this.world} />
            </div>
        );
    }

    private startGame = () => {
        this.setState({
            running: true
        });
        this.worldViewRef.current?.startSimulation();
    }

    private onLose = () => {
        this.world.reset();
    }
}

export default GameView;