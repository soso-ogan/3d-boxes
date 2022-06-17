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
    SphereGeometry,
    Vector3,
} from 'three';
import { randFloat, randInt } from 'three/src/math/MathUtils';
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

    //-------------------------------------------------------------------------
    //ADDING MULTIPLE THINGS TO THE SCENE
    //-------------------------------------------------------------------------
    //added orange floor to scene
    const myOrangeFloor = orangeFloor()
    myOrangeFloor.position.y = -1
    scene.add(myOrangeFloor)

    //add pinetrees to scene
    for (let i = 0; i < 250; i++) {
        const pineTree = createPineTree()
        pineTree.scale.multiplyScalar(randFloat(1 / 5, 1))
        scene.add(pineTree)
    }
    //add grass to scene
    for (let i = 0; i < 100; i++) {
        const grass = createGrass()
        // scene.add(pineTree)
        scene.add(grass)
    }
    //add stars to the scene
    for (let i = 0; i < 1050; i++) {
        const star = createStar()

        scene.add(star)
    }
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

function orangeFloor(): Mesh {

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

function createDonut(): Mesh {

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
    myShape.rotation.x = Math.PI / 2;
    return myShape
    // scene.add(myShape);
    //documentation for donut
    //https://threejs.org/docs/?q=geometr#api/en/geometries/TorusGeometry
}
function randomAroundZero(half: number): number {
    return Math.random() * half * 2 - half
};

function createPineTree(): Group {

    const topOfTreeGeometry = new ConeGeometry(8, 12, 8);
    const middleOfTreeGeometry = new ConeGeometry(13, 17, 8);
    const bottomOfTreeGeometry = new ConeGeometry(17, 22, 8);
    const treeTruncGeometry = new CylinderGeometry(5, 5, 20, 30);

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

    const truncOfTree = new Mesh(treeTruncGeometry, truncMaterial)
    truncOfTree.position.y = -10
    fullPineTree.add(truncOfTree)

    fullPineTree.position.y = 5
    fullPineTree.scale.set(.25, .25, .25)
    fullPineTree.position.x = randomAroundZero(50)
    fullPineTree.position.z = randomAroundZero(50)
    return fullPineTree
}

function createGrass(): Mesh {
    const grassColour1 = new Color(0x2F9C95)
    const grassColour2 = new Color(0x40C9A2)
    const grassColour3 = new Color(0xA3F7B5)
    const grassColours = [grassColour1, grassColour2, grassColour3]
    const randomGrassColour = grassColours[randInt(0, grassColours.length - 1)]
    const grassMaterial = new MeshStandardMaterial({
        color: randomGrassColour
    })
    const grassGeometry = new BoxGeometry(.15, randomAroundZero(4), .15)
    const grassMesh = new Mesh(grassGeometry, grassMaterial)
    grassMesh.position.y = 2
    grassMesh.position.x = randomAroundZero(50)
    grassMesh.position.z = randomAroundZero(50)
    return grassMesh
}

function createStar(): Mesh {
    const starColour = new Color('white')
    const starMaterial = new MeshStandardMaterial({
        color: starColour
    })
    const starGeometry = new SphereGeometry(randFloat(.5, .8))
    const starMesh = new Mesh(starGeometry, starMaterial)
    const vector = new Vector3(0, 0, 0).randomDirection();
    const scale = randFloat(250, 300)
    const vecDir = vector.clone().multiplyScalar(scale)
    starMesh.position.x = vecDir.x
    starMesh.position.y = vecDir.y
    starMesh.position.z = vecDir.z
    return starMesh
}