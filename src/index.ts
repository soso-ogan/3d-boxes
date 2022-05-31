import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    Color,
    BoxGeometry,
    TorusGeometry,
} from 'three';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';

export function setupThreeJSScene() {

    let dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions); //can move

    const renderer = setupRenderer(camera, dimensions);

    const controls = setupOrbitControls(camera, renderer.domElement);

    let scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);
    
    
    const myOrangeFloor = orangeFloor()
    scene.add(myOrangeFloor)
    const donut = createDonut()
    scene.add(donut)
    animate();


    function animate() {
        // myShape.rotation.y += 0.01;
        // myShape.rotation.x += 0.02;

        renderer.render(scene, camera);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        requestAnimationFrame(animate);
    }
}

setupThreeJSScene();

function orangeFloor(): Mesh{

    //shape(s)
    const geometry = new BoxGeometry(50, .5, 100);
    const colour1 = new Color(0xBB6B00);
    const material = new MeshStandardMaterial({
        color: colour1
        
    });

    let myShape: Mesh = new Mesh(geometry, material);
    myShape.position.y = 0;
    return myShape
    // scene.add(myShape);
}

function createDonut(): Mesh{

    //shape(s)
    const geometry = new TorusGeometry(10, 3, 10, 100);
    const colour1 = new Color('skyBlue');
    const material = new MeshStandardMaterial({
        color: colour1
        
    });

    let myShape: Mesh = new Mesh(geometry, material);
    myShape.position.y = 3;
    myShape.position.z = 50 - 10 - 3;
    myShape.rotation.x = Math.PI/2;
    return myShape
    // scene.add(myShape);
    //documentation for donut
    //https://threejs.org/docs/?q=geometr#api/en/geometries/TorusGeometry
}

