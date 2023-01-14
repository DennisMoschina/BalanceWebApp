import React, {Component} from "react";
import {World} from "../model/world/World.ts";
import WorldView from "./WorldView.tsx";
import TimerView from "./TimerView.tsx";
import Level from "../model/world/Level.ts";
import {levels, currentLevelIndex} from "../model/world/levels.ts";
import FinishedView from "./FinishedView.tsx";


class GameView extends Component {
    private worldViewRef = React.createRef<WorldView>();
    private timerViewRef = React.createRef<TimerView>();

    private readonly world: World;

    private gameTimer: NodeJS.Timer;

    state: {
        running: boolean
        time: number
        finished: boolean
    }

    constructor(props: any) {
        super(props);

        this.state = {
            running: false,
            time: 0,
            finished: false
        }
        this.world = new World();
        this.world.onFellOff = this.onLose;
        this.world.onFinished = this.onWin;
    }

    componentDidMount() {
        this.setLevel(levels[currentLevelIndex]);
    }

    render() {
        return (
            <div>
                {!this.state.running && !this.state.finished ? <div className="gameOverlay" >
                    <button className="startButton centered" onClick={this.startGame}>
                        <img className="buttonIcon" src={process.env.PUBLIC_URL + "/play.fill.png"} alt="play" />
                        Start
                    </button>
                </div> :
                this.state.finished ? <div className="gameOverlay" >
                    <FinishedView className="gameOverlay centered"
                                  time={this.state.time}
                                  levelIndex={currentLevelIndex}
                                  playAgain={this.startGame}
                    />
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

    startGame = () => {
        this.setLevel(levels[currentLevelIndex]);
        this.world.reset();
        this.setState({
            running: true,
            finished: false
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
        this.setState({running: false, finished: true});
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