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

// Resizing
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //Update Camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})


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
camera.position.set(0, 12, -20)

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
 ** LIGHTS **
 ************/

 //Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/************
 ** MESHES **
 ************/
//testSphere

//Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, color) =>
{
    
    //Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry,material)

    // Position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    // Randomize cube rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    // Add cube to scene
    scene.add(cube)

}

//drawCube (0, 'red')
//drawCube (1, 'green')
//drawCube (2, 'yellow')
//drawCube (3, 'blue')

/********
 ** UI **
 ********/
// UI
//const ui = new dat.GUI()


/********************
 ** TEXT ALALYSIS  **
 ********************/
// SourceText
const sourceText = "Long long ago, before there were pickle jars, there was pickle kingdom. A place where every pickle lived, as well as the pickle princess. One day, a tragedy struck. The vinegar river that had supplied the kingdom with its pickle flavor, had dried up! The pickle princess bravely led each pickle into jars, so they would be safe and flavorful forever."

// Variables
let parsedText, tokenizedText

// Parse and tokenize sourceText
const tokenizeSourceText = () =>
{
    // Strip periods and downcase sourceText
   parsedText = sourceText.replaceAll(".","").toLowerCase()

   // Tokenize text
   tokenizedText = parsedText.split(/[^\w']+/)

}

//Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    //Use a for loop to go through the tokenizedText array
    for (let i = 0; i<tokenizedText.length; i++)
    {
        // if tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === term){
            // convert i into height which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2


            // call drawCube function 100 times using converted height value
            for(let a = 0; a < 100; a++)
            drawCube(height, color)
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText("pickle", "green")
findSearchTermInTokenizedText("princess", "fuchsia")
findSearchTermInTokenizedText("kingdom", "gold")

/********************
 ** ANIMATION LOOP **
 ********************/

 const clock = new THREE.Clock()

 const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()