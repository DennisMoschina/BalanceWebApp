import DeviceOrientationSensor from '../model/motion/DeviceOrientationSensor.ts';
import React, { Component } from 'react';

// create a component to display the alpha beta gamma values from the device orientation sensor
class DeviceOrientationView extends Component {
// create a state to store the alpha beta gamma values
    state = {
        alpha: 0,
        beta: 0,
        gamma: 0
    };
    // create a reference to the sensor
    sensor: DeviceOrientationSensor ;

    // start the sensor when the component is mounted
    componentDidMount() {
        this.sensor = new DeviceOrientationSensor((alpha, beta, gamma) => {
            // update the state with the new values
            this.setState({alpha, beta, gamma});
        })

        this.sensor.start();
        // print start
        console.log("start");
    }

    // stop the sensor when the component is unmounted
    componentWillUnmount() {
        this.sensor.stop();
    }

    // render the component
    render() {
        console.log("rendering");
        // Check for DeviceOrientationEvent support
        if (!('DeviceOrientationEvent' in window)) {
            console.error('DeviceOrientationEvent is not supported');
            return (
                <div>
                    <h1>DeviceOrientationEvent is not supported</h1>
                </div>
            );
        }

        // get the values from the state
        const {alpha, beta, gamma} = this.state;
        // render the component
        return (
            <div>
                <h1>Device Orientation</h1>
                <p>Alpha: {alpha}</p>
                <p>Beta: {beta}</p>
                <p>Gamma: {gamma}</p>
            </div>
        );
    }
}

export default DeviceOrientationView;