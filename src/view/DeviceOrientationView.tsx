import React, { Component } from 'react';
import DeviceOrientationWrapper from '../model/motion/DeviceOrientationWrapper.ts';

interface DeviceOrientationViewProps {
    // add props here if needed
}

interface DeviceOrientationViewState {
    alpha: number;
    beta: number;
    gamma: number;
    error: Error | null;
    enabled: boolean;
}

class DeviceOrientationView extends Component<DeviceOrientationViewProps, DeviceOrientationViewState> {
    private wrapper: DeviceOrientationWrapper;

    constructor(props: DeviceOrientationViewProps) {
        super(props);
        this.wrapper = new DeviceOrientationWrapper();
        this.state = {
            alpha: 0,
            beta: 0,
            gamma: 0,
            error: null,
            enabled: false,
        };
    }

    public componentDidMount() {
    }

    public componentWillUnmount() {
        this.wrapper.disable();
    }

    public render() {
        const { alpha, beta, gamma, error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        return (
            <div>
                <div>
                    <button onClick={this.toggle}>
                        {this.state.enabled ? 'Disable' : 'Enable'}
                    </button>
                </div>
                <div>Alpha: {alpha.toFixed(0)}</div>
                <div>Beta: {beta.toFixed(0)}</div>
                <div>Gamma: {gamma.toFixed(0)}</div>
            </div>
        );
    }

    private enable = async () => {
        try {
            await this.wrapper.enable((event) => {
                this.setState({
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma,
                });
            });
            this.setState({ enabled: true });
        } catch (error) {
            this.setState({ error });
        }
    }

    private disable = () => {
        this.wrapper.disable();
        this.setState({ enabled: false });
    }

    private toggle = () => {
        if (this.state.enabled) {
            this.disable();
        } else {
            this.enable();
        }
    }
}

export default DeviceOrientationView;
