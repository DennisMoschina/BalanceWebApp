import {Body, Vec3} from 'cannon';
import * as THREE from 'three';

class Level {
    readonly plane: Body;
    readonly rendering: { geometry: THREE.BufferGeometry; material: THREE.Material };
    readonly finishPosition: Vec3;
    readonly startPosition: Vec3;

    constructor(plane: Body,
                startPosition: Vec3,
                finishPosition: Vec3,
                rendering: {geometry: THREE.BufferGeometry, material: THREE.Material}) {
        this.plane = plane;
        this.rendering = rendering;
        this.startPosition = startPosition;
        this.finishPosition = finishPosition;
    }
}

export default Level;