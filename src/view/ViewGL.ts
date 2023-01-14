import * as THREE from 'three';

class ViewGL {
    private static readonly PLANE_FILLING_RATION = 0.9;

    private readonly scene: THREE.Scene;
    private readonly renderer: THREE.WebGLRenderer;
    readonly camera: THREE.PerspectiveCamera;

    readonly sphere: THREE.Mesh;
    readonly plane: THREE.Mesh;
    readonly finish: THREE.Mesh;

    constructor(canvasRef) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
        });

        //enable shadows
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshLambertMaterial({color: "white"});
        this.sphere = new THREE.Mesh(sphereGeometry, material);
        this.sphere.castShadow = true;

        // add a plane which will receive the shadow
        // const planeGeometry = new THREE.PlaneGeometry(5, 5, 32, 32);
        const planeGeometry = new THREE.BoxGeometry(20, 20, 0.2);
        const planeMaterial = new THREE.MeshLambertMaterial({color: "green"});
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.receiveShadow = true;

        const finishGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);
        finishGeometry.rotateX(Math.PI / 2);
        const finishMaterial = new THREE.MeshBasicMaterial({color: "cyan"});
        this.finish = new THREE.Mesh(finishGeometry, finishMaterial);

        // add a light source so that the shadow can be seen
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1, 100);
        directionalLight.position.set(0, 0, 20);
        directionalLight.castShadow = true;

        // add a hemisphere light to simulate the sky
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);

        this.scene.add(this.sphere);
        this.scene.add(this.plane);
        this.scene.add(this.finish);

        this.scene.add(directionalLight);
        this.scene.add(hemisphereLight);

        this.scene.add(this.camera);

        this.camera.position.z = 20;

        this.update();
    }

    // ******************* PUBLIC EVENTS ******************* //

    onWindowResize(vpW, vpH) {

        this.camera.position.z = this.calculateCameraDistance();

        this.camera.aspect = vpW / vpH;
        this.renderer.setSize(vpW, vpH);
        this.camera.updateProjectionMatrix();
    }

    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));
    }

    renderPlaneWith(geometry: THREE.BufferGeometry, material: THREE.Material) {
        this.plane.material = material;
        this.plane.geometry = geometry;
        this.camera.position.z = this.calculateCameraDistance();
    }

    lookFromAngle(angle: number) {
        this.camera.position.y = -this.calculateCameraDistance() * Math.cos(angle);
        this.camera.position.z = this.calculateCameraDistance() * Math.sin(angle);
        this.camera.lookAt(0, 0, 0);
    }

    private calculateCameraDistance(): number {
        this.plane.geometry.computeBoundingBox();
        const size = this.plane.geometry.boundingBox.getSize(new THREE.Vector3());
        const width = size.x;
        const height = size.y;

        const alpha = this.camera.fov / 2;
        const aspectRatio = this.camera.aspect;
        const beta = aspectRatio * alpha;
        const newRatio = 2 - ViewGL.PLANE_FILLING_RATION;
        //change the camera's distance so that the whole plane fits in the viewport
        const widthBasedDistance = newRatio * width / (2 * Math.tan(beta * Math.PI / 180));
        const heightBasedDistance = newRatio * height / (2 * Math.tan(alpha * Math.PI / 180));

        return Math.max(widthBasedDistance, heightBasedDistance);
    }
}

export default ViewGL;