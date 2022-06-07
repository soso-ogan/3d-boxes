import {
    BoxGeometry, BufferGeometry, Color, ConeGeometry, CylinderGeometry, Group, Material, Mesh,
    MeshStandardMaterial, Scene
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { randFloat, randFloatSpread, randInt } from 'three/src/math/MathUtils';
import { setupCamera } from './setupCamera';
import { setupHelpers } from './setupHelpers';
import { setupLights } from './setupLights';
import { setupOrbitControls } from './setupOrbitControls';
import { setupRenderer } from './setupRenderer';
import { setupStatsPanel } from './setupStatsPanel';

export function setupThreeJSScene() {

    let dimensions = { w: window.innerWidth, h: window.innerHeight };

    const camera = setupCamera(dimensions); //can move

    const renderer = setupRenderer(camera, dimensions);
    const stats = setupStatsPanel();
    const controls = setupOrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    let scene = new Scene();

    setupLights(scene);
    setupHelpers(scene);

    createFloor(scene)

    createPineTrees(scene)

    createFieldOfGrass(scene);
    animate();

    function animate() {
        renderer.render(scene, camera);
        controls.update();
        stats.update()
        requestAnimationFrame(animate);
    }
}
setupThreeJSScene();

function createFloor(scene: Scene): void {
    const floorThickness = 0.5;
    const geometry = new BoxGeometry(100, floorThickness, 100);
    const floorColour = new Color("#274a26");
    const material = new MeshStandardMaterial({
        color: floorColour
    });
    let myFloorMesh: Mesh = new Mesh(geometry, material);
    myFloorMesh.position.y = -floorThickness / 2;//so that top of floor box touches 0 on y.
    scene.add(myFloorMesh)
}


function createPineTrees(scene: Scene): void {
    //make geometries and materials which all trees will share
    const topOfTreeGeometry = new ConeGeometry(8, 12, 8);
    const middleOfTreeGeometry = new ConeGeometry(13, 17, 8);
    const bottomOfTreeGeometry = new ConeGeometry(17, 22, 8);
    const treeTruncGeometry = new CylinderGeometry(5, 5, 20, 8);

    const treeColour = new Color(0x244F26);
    const treeTruncColour = new Color(0x522B29);
    const treeMaterial = new MeshStandardMaterial({
        color: treeColour,
    })
    const truncMaterial = new MeshStandardMaterial({
        color: treeTruncColour,
        flatShading: true
    })

    for (let i = 0; i < 150; i++) {
        const group = createOnePineTree(topOfTreeGeometry, middleOfTreeGeometry, bottomOfTreeGeometry, treeTruncGeometry, treeMaterial, truncMaterial);
        scene.add(group)
    }



}
function createOnePineTree(topOfTreeGeometry: BufferGeometry, middleOfTreeGeometry: BufferGeometry, bottomOfTreeGeometry: BufferGeometry, treeTruncGeometry: BufferGeometry, treeMaterial: Material, truncMaterial: Material): Group {

    const fullPineTree = new Group()
    const topOfPineTree = new Mesh(topOfTreeGeometry, treeMaterial)
    topOfPineTree.position.y = 40
    topOfPineTree.rotation.y = randFloatSpread(Math.PI);
    fullPineTree.add(topOfPineTree)

    const middleOfPineTree = new Mesh(middleOfTreeGeometry, treeMaterial)
    middleOfPineTree.position.y = 30
    middleOfPineTree.rotation.y = randFloatSpread(Math.PI);
    fullPineTree.add(middleOfPineTree)

    const bottomOfPineTree = new Mesh(bottomOfTreeGeometry, treeMaterial)
    bottomOfPineTree.position.y = 20
    bottomOfPineTree.rotation.y = randFloatSpread(Math.PI);
    fullPineTree.add(bottomOfPineTree)

    const truncOfTree = new Mesh(treeTruncGeometry, truncMaterial)
    truncOfTree.position.y = 10
    fullPineTree.add(truncOfTree)

    //We can use this red ball to show us where the pivot point / origin of the group is/
    // const ball = new Mesh(new SphereGeometry(10, 5, 5),
    //     new MeshStandardMaterial({ color: new Color("red"), transparent: true, opacity: 0.5 }));
    // fullPineTree.add(ball);
    fullPineTree.scale.multiplyScalar(0.25);
    fullPineTree.position.x = randFloatSpread(100)
    fullPineTree.position.z = randFloatSpread(100)

    fullPineTree.scale.multiplyScalar(randFloat(1 / 5, 1))
    //Give each tree a random turn about the y axis (so segments don't all line up)
    fullPineTree.rotation.y = randFloatSpread(Math.PI);

    //give each tree a very slight random lean
    fullPineTree.rotation.x = randFloatSpread(0.02);
    fullPineTree.rotation.z = randFloatSpread(0.02);
    return fullPineTree;

}


function createFieldOfGrass(scene: Scene): void {
    const grassColours = [0x2F9C95, 0x40C9A2, 0xA3F7B5]
    const grassMaterials: Material[] = grassColours.map(c => new MeshStandardMaterial({
        color: c
    }));

    const grassBasicLength = 2;
    const grassGeometry = new BoxGeometry(.15, grassBasicLength, .15)
    for (let i = 0; i < 10000; i++) {
        const chosenMaterial = pick(grassMaterials)
        const grassMesh = new Mesh(grassGeometry, chosenMaterial)
        grassMesh.position.x = randFloatSpread(100)
        grassMesh.position.z = randFloatSpread(100)
        grassMesh.rotation.y = randFloat(0, Math.PI * 2)
        grassMesh.rotation.z = randFloatSpread(0.2)
        grassMesh.rotation.x = randFloatSpread(0.2)

        const yScale = randFloat(0.2, 1);
        grassMesh.scale.y = yScale;
        //move it up half of its height, so it extends down to touch the ground
        grassMesh.position.y = grassBasicLength * yScale / 2;
        scene.add(grassMesh)
    }

}

function pick<ElementType>(arr: ElementType[]): ElementType {
    const index = randInt(0, arr.length - 1)
    return arr[index];
}