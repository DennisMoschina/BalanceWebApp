import * as THREE from 'three';

class ViewGL {
    private readonly scene: THREE.Scene;
    private readonly renderer: THREE.WebGLRenderer;
    private readonly camera: THREE.PerspectiveCamera;

    readonly sphere: THREE.Mesh;
    readonly plane: THREE.Mesh;

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

        // add a light source so that the shadow can be seen
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1, 100);
        directionalLight.position.set(0, 0, 5);
        directionalLight.castShadow = true;

        // add a hemisphere light to simulate the sky
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);

        this.scene.add(this.sphere);
        this.scene.add(this.plane);

        this.scene.add(directionalLight);
        this.scene.add(hemisphereLight);

        this.scene.add(this.camera);

        this.camera.position.z = 20;

        this.update();
    }

    // ******************* PUBLIC EVENTS ******************* //

    onWindowResize(vpW, vpH) {
        this.camera.aspect = vpW / vpH;
        this.renderer.setSize(vpW, vpH);
        this.camera.updateProjectionMatrix();
    }

    // ******************* RENDER LOOP ******************* //
    update() {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));
    }
}

export default ViewGL;