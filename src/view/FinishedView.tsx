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
                        <img className="buttonIcon" src={process.env.PUBLIC_URL + "/gobackward.png"} alt="play" />
                        Play again
                    </button>
                </div>
                <div style={{padding: "10px"}}>
                    <Link className="viewLevels" to="/levels">
                        <img className="buttonIcon" src={process.env.PUBLIC_URL + "/map.fill.png"} alt="map" />
                        Select another level
                    </Link>
                </div>
                <div style={{padding: "10px"}}>
                    <button className="startButton" onClick={() => {
                        setCurrentLevelIndex(this.props.levelIndex + 1);
                        this.props.playAgain();
                    }} >
                        <img className="buttonIcon" src={process.env.PUBLIC_URL + "/forward.frame.fill.png"} alt="next" />
                        Next level
                    </button>
                </div>
            </div>
        );
    }
}

export default FinishedView;