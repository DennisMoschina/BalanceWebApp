import React, { Component } from "react";
import {levels, setCurrentLevelIndex} from "../model/world/levels.ts";
import LevelPreview from "./LevelPreview.tsx";
import {useNavigate} from "react-router-dom";

class LevelSelectorView extends Component {
    render() {
        const { navigate } = this.props;

        return (
            <div>
                <h1>Levels</h1>
                { levels.map((level, index) => {
                    return (
                        <div key={index} style={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                        }}>
                            <div className="levelPanel" >
                                <h2>Level {index + 1}</h2>
                                <div className="levelPreview">
                                    <LevelPreview key={index} level={level} />
                                </div>
                                <button className="startPlaying" onClick={() => {
                                    setCurrentLevelIndex(index);
                                    navigate("/play");
                                }}>
                                    Select
                                </button>
                            </div>
                        </div>
                    )
                }) }
            </div>
        );
    }
}

export default function (props) {
    const navigate = useNavigate();
    return <LevelSelectorView {...props} navigate={navigate} />;
};