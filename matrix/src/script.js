import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Particle from './particle'

let cameraProperties = {
    frustumFar: 270,
    frustumNear: 1
}

let pointProperties = {
    totalPoints: 10000,
    horizontalSpread: 50,
    hightStart: 40
}


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, cameraProperties.frustumNear, cameraProperties.frustumFar)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.dragToLook = true
controls.object = camera
controls.movementSpeed = 0.01;


let vertices = []


let points = new THREE.Points()
const material = new THREE.PointsMaterial({ color: 'green', size: 1 });
const geometry = new THREE.BufferGeometry();

function makePoint() {
    const x = THREE.MathUtils.randFloatSpread(pointProperties.horizontalSpread);
    const y = pointProperties.hightStart
    const z = THREE.MathUtils.randFloat(0, -cameraProperties.frustumFar);
    return new THREE.Vector3(x, y, z)
}

function makePoints() {

    if (vertices.length > 0) {
        scene.remove(points)
    }

    vertices = []

    for (let i = 0; i < pointProperties.totalPoints; i++) {
        const p = makePoint()
        vertices.push(p.x, p.y, p.z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    points = new THREE.Points(geometry, material);
    scene.add(points);

}

// makePoints()
gui.add(pointProperties, 'hightStart').min(0).max(40).step(1).onChange(() => {
    // makePoints()
})
gui.add(pointProperties, 'horizontalSpread').min(5).max(100).step(1).onChange(() => {
    // makePoints()
})
gui.add(cameraProperties, 'frustumFar').min(10).max(500).step(10).onChange(() => {
    // makePoints()
    camera.far = cameraProperties.frustumFar
    camera.updateProjectionMatrix();
})







const axesHelper = new THREE.AxesHelper()
    // scene.add(axesHelper)



/**
 * Animate
 */
const clock = new THREE.Clock()
let particles = []

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update();

    const p = makePoint()
    const p2 = makePoint()
    const p3 = makePoint()
    const particle = new Particle(p)
    const particle2 = new Particle(p2)
        // const particle3 = new Particle(p3)

    particles.push(particle)
    particles.push(particle2)
        // particles.push(particle3)
    for (let i = 0; i < particle.meshes.length; i++) {
        scene.add(particle.meshes[i])
    }

    for (let i = 0; i < particle2.meshes.length; i++) {
        scene.add(particle2.meshes[i])
    }


    for (let i = 0; i < particles.length; i++) {
        particles[i].update(elapsedTime, scene);
        if (particles[i].lifeTime > particles[i].endOfLife) {
            particles.splice(i, 1);
        }
    }

    // const p = makePoint()
    // vertices.push(p.x, p.y, p.z)
    // geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    // points = new THREE.Points(geometry, material);
    // scene.add(points);

    // for (let i = 0; i < vertices.length; i++) {


    // if (i % 3 == 0)
    // vertices[i + 1] -= 0.05


    // }



    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}


tick()