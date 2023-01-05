/**
 * This class is used to get the device orientation more easily.
 *
 * @author Dennis Moschina
 * @version 1.0
 */
class DeviceOrientationSensor {
    private callback: (alpha: number, beta: number, gamma: number) => void;

    private readonly handle: (DeviceOrientationEvent) => void;

    constructor(callback: (alpha: number, beta: number, gamma: number) => void) {
        // request the permission
        const permission = DeviceOrientationEvent.requestPermission();
        // check if the permission is granted
        if (permission === 'granted') {
            // create a handle to listen for changes
            this.handle = (event: DeviceOrientationEvent) => {
                // get the values from the event
                const {alpha, beta, gamma} = event;
                // call the callback function with the values
                this.callback(alpha, beta, gamma);
            };
        }
    }

    start() {
        window.onload = () => {
            window.addEventListener('deviceorientation', this.handle);
        };
    }

    stop() {
        window.onunload = () => {
            window.removeEventListener('deviceorientation', this.handle);
        }
    }

    setCallback(callback: (alpha: number, beta: number, gamma: number) => void) {
        this.callback = callback;
    }
}
export default DeviceOrientationSensor;
