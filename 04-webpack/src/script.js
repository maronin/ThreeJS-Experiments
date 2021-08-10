import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene();

// Red Cube
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const redBox = new THREE.Mesh(boxGeometry, boxMaterial);

const windowSize = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height);
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

const canvas = document.querySelector('.webgl')

scene.add(redBox)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(windowSize.width, windowSize.height);

renderer.render(scene, camera)