import {
    Scene,
    Mesh,
    MeshStandardMaterial,
    Color,
    BoxGeometry,
    TorusGeometry,
    ConeGeometry,
    Group,
    CylinderGeometry,
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
    controls.autoRotate = false;
    let scene = new Scene();

    setupLights(scene);

    setupHelpers(scene);
    
    
    const myOrangeFloor = orangeFloor()
    myOrangeFloor.position.y = -10
    scene.add(myOrangeFloor)

    // for (let i = 0; i < 100; i++){
    //     const donut = createDonut()
    //     scene.add(donut)
    // }
    scene.add(createPineTree())
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
    const geometry = new BoxGeometry(100, .5, 100);
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
    myShape.position.y = randomAroundZero(50);
    myShape.position.z = randomAroundZero(50);
    myShape.position.x = randomAroundZero(50);
    myShape.rotation.x = Math.PI/2;
    return myShape
    // scene.add(myShape);
    //documentation for donut
    //https://threejs.org/docs/?q=geometr#api/en/geometries/TorusGeometry
}
function randomAroundZero(half: number): number{
    return Math.random()*half*2 - half
};

function createPineTree(): Group {
    const topOfTreeGeometry = new ConeGeometry(8, 12, 8);
    const middleOfTreeGeometry = new ConeGeometry(13, 17, 8);
    const bottomOfTreeGeometry = new ConeGeometry(17, 22, 8);
    const treeTruncGeometry = new CylinderGeometry(5,5,20,30);

    const treeColour = new Color(0x244F26);
    const treeTruncColour = new Color(0x522B29);
    const treeMaterial = new MeshStandardMaterial({
        color: treeColour,
    })
    const truncMaterial = new MeshStandardMaterial({
        color: treeTruncColour
    })
    const fullPineTree = new Group()
    const topOfPineTree = new Mesh(topOfTreeGeometry, treeMaterial)
    topOfPineTree.position.y = 20
    fullPineTree.add(topOfPineTree)

    const middleOfPineTree = new Mesh(middleOfTreeGeometry, treeMaterial)
    middleOfPineTree.position.y = 10
    fullPineTree.add(middleOfPineTree)

    const bottomOfPineTree = new Mesh(bottomOfTreeGeometry, treeMaterial)
    bottomOfPineTree.position.y = 0
    fullPineTree.add(bottomOfPineTree)
    
    const truncOfTree = new Mesh(treeTruncGeometry, truncMaterial )
    truncOfTree.position.y = -10
    fullPineTree.add(truncOfTree)
    
    fullPineTree.position.y = 10
    return fullPineTree
}