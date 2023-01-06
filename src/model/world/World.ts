import * as Cannon from 'cannon';

export class World {
    private readonly _world: Cannon.World;

    get world(): Cannon.World {
        return this._world;
    }

    private _plane: Cannon.Body;
    private _ball: Cannon.Body;

    set plane(plane: Cannon.Body) {
        if (this._plane) {
            this.world.removeBody(this._plane);
        }

        this._plane = plane;
        this.world.addBody(plane);
    }

    set ball(ball: Cannon.Body) {
        if (this._ball) {
            this.world.removeBody(this._ball);
        }
        this._ball = ball;
        this.world.addBody(ball);
    }

    get ball(): Cannon.Body {
        return this._ball;
    }

    get plane(): Cannon.Body {
        return this._plane;
    }

    constructor() {
        this._world = new Cannon.World();
        this.world.gravity.set(0, 0, -9.82);

        this.ball = new Cannon.Body({
            mass: 1,
            position: new Cannon.Vec3(0, 0, 3),
            shape: new Cannon.Sphere(1),
            restitution: 1,
        });

        this.plane = new Cannon.Body({
            mass: 0,
            shape: new Cannon.Plane(),
            position: new Cannon.Vec3(0, 0, 0),
            type: Cannon.Body.STATIC,
            restitution: 0.1
        });
    }

    update(timeStep: number = 1 / 60) {
        this.world.step(timeStep);
        console.log(this.ball.position.z);
    }
}