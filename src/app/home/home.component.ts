import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{

  ngAfterViewInit(): void {

    // Get the canvas element
    const canvas = document.querySelector<HTMLCanvasElement>("canvas");
    if (!canvas) {
      throw new Error("Canvas element with class 'canvas' not found.");
    }

    // Create the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer and attach it to the canvas
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    // Create a cube geometry and material
    const geometry1 = new THREE.BoxGeometry(4,4,4);
    const material1 = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const cube1 = new THREE.Mesh(geometry1, material1);

    // Add the cube to the scene
    cube1.position.set(9,4,-7)
    scene.add(cube1);

    // Create a cube geometry and material
    const geometry2 = new THREE.BoxGeometry(4,4,4);
    const material2 = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const cube2 = new THREE.Mesh(geometry2, material2);

    // Add the cube to the scene
    cube2.position.set(4,-7,-10)
    scene.add(cube2);

    // Create a cube geometry and material
    const geometry3 = new THREE.BoxGeometry(3,3,3);
    const material3 = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const cube3 = new THREE.Mesh(geometry3, material3);

    // Add the cube to the scene
    cube3.position.set(-9,2,-5)
    scene.add(cube3);

    const geometry4 = new THREE.BoxGeometry(2,2,2);
    const material4 = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const cube4 = new THREE.Mesh(geometry4, material4);

    // Add the cube to the scene
    cube4.position.set(-6,-3,-6)
    scene.add(cube4);

    // Animation loop
    function animate(): void {
      cube1.rotation.x += 0.003;
      cube1.rotation.y += 0.003;
      cube1.rotation.z += 0.003;
      cube2.rotation.x += 0.003;
      cube2.rotation.x += 0.003;
      cube2.rotation.z += 0.003;
      cube3.rotation.y += 0.003;
      cube3.rotation.y += 0.003;
      cube3.rotation.z += 0.003;
      cube4.rotation.y -= 0.003;
      cube4.rotation.y -= 0.003;
      cube4.rotation.z -= 0.003;
      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleWindowResize(): void {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleWindowResize, false);
  }

}
