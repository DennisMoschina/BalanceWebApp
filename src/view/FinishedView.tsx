import {Component} from "react";
import {Link} from "react-router-dom";
import {setCurrentLevelIndex} from "../model/world/levels.ts";

interface FinishedProps {
    levelIndex: number;
    time: number;
    playAgain: () => void;
}

class FinishedView extends Component<FinishedProps, {}> {
    render() {
        return (
            <div className="finishedView">
                <h1>Congratulations</h1>
                <h2>You finished level {this.props.levelIndex + 1} in {this.props.time} seconds</h2>
                <div style={{padding: "10px"}}>
                    <button className="startButton" onClick={this.props.playAgain}>
                        Play again
                    </button>
                </div>
                <div style={{padding: "10px"}}>
                    <Link className="viewLevels" to="/levels">Select another level</Link>
                </div>
                <div style={{padding: "10px"}}>
                    <button className="startButton" onClick={() => {
                        setCurrentLevelIndex(this.props.levelIndex + 1);
                        this.props.playAgain();
                    }} >
                        Next level
                    </button>
                </div>
            </div>
        );
    }
}

export default FinishedView;