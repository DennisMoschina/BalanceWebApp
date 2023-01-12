import Level from "./Level.ts";
import * as Cannon from "cannon";
import * as THREE from "three";


export const levels: Level[] = [
    new Level(
        new Cannon.Body({
            mass: 0,
            shape: new Cannon.Box(new Cannon.Vec3(10, 10, 0.1)),
            position: new Cannon.Vec3(0, 0, 0),
            type: Cannon.Body.STATIC,
            restitution: 0.1
        }),
        new Cannon.Vec3(-5, 0, 3),
        new Cannon.Vec3(5, 0, 0),
        {
            geometry: new THREE.BoxGeometry(20, 20, 0.2),
            material: new THREE.MeshLambertMaterial({color: "green"})
        }
    ),


];