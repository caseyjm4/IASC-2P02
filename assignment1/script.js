import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
 }

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/

// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects

const octaGeometry = new THREE.OctahedronGeometry
const octaMaterial = new THREE.MeshNormalMaterial
const octahedron = new THREE.Mesh( octaGeometry, octaMaterial )
octahedron.position.set(8, 4, 3)
octahedron.castShadow = true
scene.add(octahedron)

const boxGeometry = new THREE.BoxGeometry
const boxMaterial = new THREE.MeshNormalMaterial
const box = new THREE.Mesh(boxGeometry, boxMaterial )
box.position.set(8, 3, -3)
box.castShadow = true
scene.add(box)

const tetraGeometry = new THREE.TetrahedronGeometry();
const tetraMaterial = new THREE.MeshNormalMaterial
const tetrahedron = new THREE.Mesh(tetraGeometry,tetraMaterial)
tetrahedron.position.set(6, 2, 0)
tetrahedron.castShadow = true
scene.add(tetrahedron)


// cones
const coneGeometry = new THREE.ConeGeometry(1.2, 3)
const coneMaterial = new THREE.MeshNormalMaterial()

// cone 1
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
cone.position.set(8, -1, -3)
cone.scale.set(1, 1.8, 1.3)
cone.castShadow = true
scene.add(cone)

// cone 2
const cone2 = new THREE.Mesh(coneGeometry, coneMaterial)
cone2.position.set(6, -2, -1)
cone2.scale.set(1, 2.5, 1.2)
cone2.castShadow = true
scene.add(cone2)

// cone 3
const cone3 = new THREE.Mesh(coneGeometry, coneMaterial)
cone3.position.set(12, -1, 1)
cone3.scale.set(1, 2.6, 2)
cone3.castShadow = true
scene.add(cone3)

// cone 4
const cone4 = new THREE.Mesh(coneGeometry, coneMaterial)
cone4.position.set(10, -1, 3)
cone4.scale.set(1, 2.5, 2)
cone4.castShadow = true
scene.add(cone4)


/************
 ** LIGHTS **
 ************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

// Directional Light Helper

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}
// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}
// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/*******************
 ** LIGHT CONTROL **
 *******************/

function resetDirectionalLight()
{
    directionalLight.position.set(20, 4.1, 0)
}

/********
 ** UI **
 ********/
/*
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

lightPositionFolder
    .add(directionalLight.position, 'z')   
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z') 
    */
/********************
 ** ANIMATION LOOP **
 ********************/

 const clock = new THREE.Clock()

 const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

        // part-one
        if(domObject.part === 1)
        {
            resetDirectionalLight()
            camera.position.set(6, 0, 0)
            camera.lookAt(0, 0, 0)
           
        }

        // part-two
        if(domObject.part === 2)
        {
            resetDirectionalLight()
            camera.position.set(15.609, 6.882, -20.89,)
            camera.lookAt(0, 0, 0,)
        }

    // first-change
    if (domObject.firstChange)
    {
        box.rotation.y = elapsedTime
        box.rotation.z = elapsedTime
        
        octahedron.rotation.y = elapsedTime
        octahedron.rotation.z = elapsedTime
        
        tetrahedron.rotation.y = elapsedTime
        tetrahedron.rotation.z = elapsedTime
        
    }

    // second-change
    if (domObject.secondChange)
    {
        directionalLight.position.set(38, 4.1, 0)
    }

    // third-change
    if (domObject.thirdChange)
    {
        directionalLight.position.set(38, 4.1, 0)
    }

    // fourth-change
    if (domObject.fourthChange)
    {
        box.position.y = (Math.sin(elapsedTime) + 1) * 2
        octahedron.position.y = (Math.sin(elapsedTime) + 1) * 2
        tetrahedron.position.y = (Math.sin(elapsedTime) + 1) * 2
    }

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}
animation()

