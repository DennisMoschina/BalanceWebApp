import * as Cannon from 'cannon';

export class World {
    private readonly _world: Cannon.World;

    onFellOff = () => {};

    onFinished = () => {};

    get world(): Cannon.World {
        return this._world;
    }

    private _plane: Cannon.Body;
    private _ball: Cannon.Body;
    private _finish: Cannon.Body;
    private _startPosition: Cannon.Vec3;
    private _finishPosition: Cannon.Vec3;

    private finishOnPlaneConstraint: Cannon.LockConstraint;

    set plane(plane: Cannon.Body) {
        if (this._plane) {
            this.world.removeBody(this._plane);
        }

        this._plane = plane;
        this.world.addBody(plane);
        this.putFinishOnPlane()
    }

    set ball(ball: Cannon.Body) {
        if (this._ball) {
            this.world.removeBody(this._ball);
        }
        this._ball = ball;
        this.world.addBody(ball);
    }

    set startPosition(position: Cannon.Vec3) {
        this._startPosition = position;
        this.ball.position.copy(position);
    }

    set finishPosition(position: Cannon.Vec3) {
        position.z += 2.5
        this._finishPosition = position;
        this.finish.position.copy(position);
    }

    private set finish(finish: Cannon.Body) {
        if (this._finish) {
            this.world.removeBody(this._finish);
        }

        this._finish = finish;

        this._finish.collisionResponse = false;
        this._finish.addEventListener('collide', (event) => {
            if (this.ball === event.body) {
                this.onFinished();
            }
        });
        this.world.addBody(finish);
        this.putFinishOnPlane();
    }

    get ball(): Cannon.Body {
        return this._ball;
    }

    get plane(): Cannon.Body {
        return this._plane;
    }

    get finish(): Cannon.Body {
        return this._finish;
    }

    get startPosition(): Cannon.Vec3 {
        return this._startPosition;
    }

    get finishPosition(): Cannon.Vec3 {
        return this._finishPosition;
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
            shape: new Cannon.Box(new Cannon.Vec3(10, 10, 0.1)),
            position: new Cannon.Vec3(0, 0, 0),
            type: Cannon.Body.STATIC,
            restitution: 0.1
        });

        this.finish = new Cannon.Body({
            mass: 0,
            shape: new Cannon.Cylinder(1, 1, 5, 32),
            position: new Cannon.Vec3(5, 0, 2.5),
        });
    }

    update(timeStep: number = 1 / 60) {
        this.world.step(timeStep);
        this.checkFellOff();
    }

    reset() {
        console.log("resetting");
        this.ball.position.copy(this.startPosition);
        this.ball.velocity.set(0, 0, 0);
        console.log("ball: ", this.ball.position, "start: ", this.startPosition);
    }

    rotate(quaternion: Cannon.Quaternion) {
        this.plane.quaternion = quaternion;

        this.finish.quaternion = quaternion;
        // TODO: transform finish
        //quaternion.vmult(this.finish.position, this.finish.position);
    }

    private checkFellOff() {
        let aabb = this.plane.aabb;
        let lowestPoint = new Cannon.Vec3(0, 0, aabb.lowerBound.z);

        if (this.ball.position.z < lowestPoint.z - 30) {
            this.onFellOff()
        }
    }

    private putFinishOnPlane() {
        this.plane.quaternion = new Cannon.Quaternion();

        this.world.removeConstraint(this.finishOnPlaneConstraint);
        if (this.finish && this.plane) {
            //this.finishOnPlaneConstraint = new Cannon.LockConstraint(this.plane, this.finish);
            //this.world.addConstraint(this.finishOnPlaneConstraint);
        }
    }
}