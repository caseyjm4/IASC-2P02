import * as THREE from "three"

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('powderblue')


// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 3
    
)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
 ************/
//testSphere
const sphereGeometry = new THREE.SphereGeometry(0.5)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

// secondSphere
const sphereGeometry2 = new THREE.SphereGeometry(0.5)
const sphereMaterial2 = new THREE.MeshNormalMaterial()
const secondSphere = new THREE.Mesh(sphereGeometry2, sphereMaterial2)

scene.add(secondSphere)

/********************
 ** ANIMATION LOOP **
 ********************/

 const clock = new THREE.Clock()

 const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    testSphere.position.y = Math.sin(elapsedTime)

    // Animate secondSphere
    secondSphere.position.z = Math.sin(elapsedTime)
    secondSphere.position.x = Math.cos(elapsedTime)


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()