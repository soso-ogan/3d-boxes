import { Scene, AxesHelper, GridHelper } from "three";

export function setupHelpers(scene: Scene) {
    const axesHelper = new AxesHelper(10);
    axesHelper.position.set(-40, 20, 0); //lift up from grid
    scene.add(axesHelper);
    const gridHelper = new GridHelper(100);
    gridHelper.position.y = 1;
    scene.add(gridHelper);
}