import {Component} from "react";

class TimerView extends Component {
    state: {
        timer: number
    } = { timer: 0};


    render() {
        return (
            <div>
                <h1>{this.state.timer} Seconds</h1>
            </div>
        );
    }
}

export default TimerView;