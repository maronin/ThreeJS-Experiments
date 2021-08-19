import * as THREE from 'three'
import { Vector2 } from 'three';



const material0 = new THREE.MeshBasicMaterial({
    color: 'green',
    transparent: true,
    opacity: 0 / 6 + 0.1,
    wireframe: true
});

const material1 = new THREE.MeshBasicMaterial({
    color: 'green',
    transparent: true,
    opacity: 1 / 6 + 0.1,
    wireframe: true
});

const material2 = new THREE.MeshBasicMaterial({
    color: 'green',
    transparent: true,
    opacity: 2 / 6 + 0.1,
    wireframe: true
});

const material3 = new THREE.MeshBasicMaterial({
    color: 'green',
    transparent: true,
    opacity: 3 / 6 + 0.1,
    wireframe: true
});

const material4 = new THREE.MeshBasicMaterial({
    color: 0x35A850,
    transparent: true,
    opacity: 4 / 6 + 0.1,
    wireframe: true
});

const material5 = new THREE.MeshBasicMaterial({
    color: 0x0E6B24,
    transparent: true,
    opacity: 5 / 6 + 0.1,
    wireframe: true
});
const material6 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    wireframe: true

});

const materials = [
    new THREE.PointsMaterial({ color: 0xffffff }),
    new THREE.PointsMaterial({ color: 0x66FF99, transparent: true, opacity: 0.8 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.6 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.5 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.4 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.3 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.2 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.2 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.1 }),
    new THREE.PointsMaterial({ color: 0x00cc44, transparent: true, opacity: 0.1 }),
]

let material = new THREE.PointsMaterial()
export default class Particle {
    constructor(p, ppp) {
        this.particlesPerSecond = ppp
        this.particleLifeTime = 1
        this.position = new THREE.Vector3(p.x, p.y, p.z)
        this.delay = 0.05
        this.clock = new THREE.Clock()
        this.lifeTime = 0
        this.endOfLife = 3
        this.points = []
        const geometry = new THREE.BufferGeometry();

        for (let i = 0; this.particlesPerSecond > i; i++) {
            const vertices = []
            vertices.push(this.position.x, this.position.y, this.position.z)
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            const point = new THREE.Points(geometry, materials[i])
            this.points.push(point)
        }
    }

    update(elapsedTime, scene) {
        this.lifeTime = this.clock.getElapsedTime()

        for (let i = 0; i < this.points.length; i++) {

            if ((this.lifeTime) > (i * this.delay)) {
                this.points[i].position.y -= this.delay * 4
            }

        }

        if (this.lifeTime > this.endOfLife) {
            for (let i = 0; i < this.points.length; i++) {
                if ((this.lifeTime) > (i * this.delay)) {
                    scene.remove(this.points[i])
                }
            }
        }
    }
}