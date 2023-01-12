import React, {Component} from "react";
import {World} from "../model/world/World.ts";
import WorldView from "./WorldView.tsx";
import TimerView from "./TimerView.tsx";
import Level from "../model/world/Level.ts";
import {levels} from "../model/world/levels.ts";


class GameView extends Component {
    private worldViewRef = React.createRef<WorldView>();
    private timerViewRef = React.createRef<TimerView>();

    private readonly world: World;

    private gameTimer: NodeJS.Timer;

    state: {
        running: boolean
        time: number
    }

    constructor(props: any) {
        super(props);

        this.state = {
            running: false,
            time: 0
        }
        this.world = new World();
        this.world.onFellOff = this.onLose;
        this.world.onFinished = this.onWin;
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {!this.state.running ? <div className="overlay" style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                }}>
                    <button className="startButton" onClick={this.startGame}>
                        Start
                    </button>
                </div> : null}
                <div style={{
                    position: "absolute",
                    textAlign: "center",
                    width: "100%",
                }}>
                    <TimerView ref={this.timerViewRef} time={this.state.time} />
                </div>
                <WorldView ref={this.worldViewRef} world={this.world} />
            </div>
        );
    }

    private startGame = () => {
        this.world.reset();
        this.setState({
            running: true
        });
        this.worldViewRef.current?.startSimulation();
        this.resetTimer();
        this.startTimer();
    }

    private onLose = () => {
        this.world.reset();
        this.setState({time: 0});
        this.startTimer();
    }

    private onWin = () => {
        this.stopTimer();
        this.worldViewRef.current?.stopSimulation();
        this.setState({running: false});
    }

    private startTimer = () => {
        this.resetTimer();
        this.gameTimer = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            })
            this.timerViewRef.current.setState({ timer: this.state.time });
        }, 1000);
    }

    private resetTimer = () => {
        this.setState({ time: 0 });
    }

    private stopTimer = () => {
        clearInterval(this.gameTimer);
    }

    private setLevel(level: Level) {
        this.worldViewRef.current?.setLevel(level);
    }
}

export default GameView;