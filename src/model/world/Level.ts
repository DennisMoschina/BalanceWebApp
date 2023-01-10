import {Body} from 'cannon';
import * as THREE from 'three';

class Level {
    readonly plane: Body;
    readonly rendering: { geometry: THREE.BufferGeometry; material: THREE.Material };

    constructor(plane: Body, rendering: {geometry: THREE.BufferGeometry, material: THREE.Material}) {
        this.plane = plane;
        this.rendering = rendering;
    }
}

export default Level;