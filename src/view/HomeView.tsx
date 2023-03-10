import {Component} from "react";
import {Link} from "react-router-dom";

export class HomeView extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the Balance Game</h1>
                <p>
                    This is a game about balancing a ball through a parkour course.
                </p>

                <div style={{margin: "10px"}}>
                    <Link className="startPlaying" to="/play">
                        <img className="buttonIcon" src={process.env.PUBLIC_URL + "/play.fill.png"} alt="play" />
                        Start Playing
                    </Link>
                </div>
                <div style={{margin: "10px"}}>
                    <Link className="viewLevels" to="/levels">
                        <img className="buttonIcon" src={process.env.PUBLIC_URL + "/map.fill.png"} alt="map" />
                        View Levels
                    </Link>
                </div>

                <h2>Controls</h2>
                <p>
                    The controls change, depending on what device you are using.
                </p>
                <h3>Desktop</h3>
                <p>
                    Use the mouse to tilt the plane. The plane tilts towards your mouse, something like if
                    the mouse was heavy.
                </p>
                <h3>Mobile</h3>
                <p>
                    If you are using a mobile device, you can tilt the plane by tilting your device.
                </p>
                <p>
                    Tipp: For a better experience I recommend you to turn off 'auto-rotate' on your device.
                </p>
            </div>
        );
    }
}