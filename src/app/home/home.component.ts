import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{

  // three.js cube render animation.
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

    // Create lights
    const light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(0,0,-2); // Position the light
    scene.add(light);

    // Optionally add ambient light for softer shading
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Create a cube geometry and material

    const material1 = new THREE.MeshPhongMaterial({
      color: 0xD3D3D3, // Base color for the cube
      shininess: 30,   // Controls the shininess of the surface
      specular: 0xAAAAAA, // Highlight color
    });

    // Mesh
    const geometry1 = new THREE.BoxGeometry(4,4,4);
    const cube1 = new THREE.Mesh(geometry1, material1);

    // Add the cube to the scene
    cube1.position.set(9,4,-7)
    scene.add(cube1);

    // Create a cube geometry and material
    const geometry2 = new THREE.BoxGeometry(4,4,4);
    const cube2 = new THREE.Mesh(geometry2, material1);

    // Add the cube to the scene
    cube2.position.set(4,-7,-10)
    scene.add(cube2);

    // Create a cube geometry and material
    const geometry3 = new THREE.BoxGeometry(3,3,3);
    const cube3 = new THREE.Mesh(geometry3, material1);

    // Add the cube to the scene
    cube3.position.set(-9,2,-5)
    scene.add(cube3);

    // Geometry
    const geometry4 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cube4 = new THREE.Mesh(geometry4, material1);

    // Add the cube to the scene
    cube4.position.set(-3,4,-6)
    scene.add(cube4);

    const geometry5 = new THREE.BoxGeometry(2,2,2);
    const cube5 = new THREE.Mesh(geometry5, material1);

    // Add the cube to the scene
    cube5.position.set(-6,-3,-6)
    scene.add(cube5);

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
      cube5.rotation.y -= 0.003;
      cube5.rotation.y -= 0.003;
      cube5.rotation.z -= 0.003;
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
