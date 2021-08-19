import * as THREE from 'three'

const geometry = new THREE.PlaneBufferGeometry(0.5, 0.5);

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



export default class Particle {
    constructor(p) {
        this.particlesPerSecond = 6
        this.particleLifeTime = 1
        this.position = new THREE.Vector3(p.x, p.y, p.z)
        this.delay = 0.05
        this.clock = new THREE.Clock()
        this.lifeTime = 0
        this.endOfLife = 4
        this.meshes = []
        let material = new THREE.PointsMaterial()

        for (let i = this.particlesPerSecond; i > 0; i--) {
            if (i == 0) material = material0
            if (i == 1) material = material1
            if (i == 2) material = material2
            if (i == 3) material = material3
            if (i == 4) material = material4
            if (i == 5) material = material5
            if (i == 6) material = material6

            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.copy(this.position)
            this.meshes.push(mesh)
        }
    }

    update(elapsedTime, scene) {
        this.lifeTime = this.clock.getElapsedTime()

        for (let i = 0; i < this.meshes.length; i++) {

            if ((this.lifeTime) > (i * this.delay)) {
                this.meshes[i].position.y -= this.delay * 5
            }

        }

        if (this.lifeTime > this.endOfLife) {
            for (let i = 0; i < this.meshes.length; i++) {
                if ((this.lifeTime) > (i * this.delay)) {
                    scene.remove(this.meshes[i])
                }
            }
        }
    }
}