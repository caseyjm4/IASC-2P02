import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 ** SETUP **
 ***********/
const sizes= {
width: window.innerWidth,
height: window.innerHeight,
aspectratio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/


//testDodecahedron
const dodecahedronGeometry = new THREE.DodecahedronGeometry(1)
const dodecahedronMaterial = new THREE.MeshNormalMaterial()
const testDodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial)

scene.add(testDodecahedron)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial ({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})

const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

// UI Object 
const uiObject = {
    speed: 1,
    distance: 1,
    rotationSpeed: 1
}
// plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

// testDodecahedron UI
const DodecahedronFolder = ui.addFolder('Dodecahedron')

    DodecahedronFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')

    DodecahedronFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')

   DodecahedronFolder
    .add(uiObject, 'rotationSpeed')
    .min(0)
    .max(10)
    .step(0.1)
    .name('Rotation Speed')


/********************
 ** ANIMATION LOOP **
 ********************/

 const clock = new THREE.Clock()

 const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Dodecahedron
    testDodecahedron.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    testDodecahedron.rotation.y = elapsedTime * uiObject.rotationSpeed 

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()