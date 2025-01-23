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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const canvas = document.querySelector("canvas");

    if (!canvas) {
      console.error("Canvas element not found");
    } else {
      const renderer = new THREE.WebGLRenderer({ canvas: canvas });
      renderer.setClearColor(0xF0F0F0);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 1;

      function resize() {
        if (!canvas) {
          console.error("Canvas element not found");
        } else {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (width !== canvas.width || height !== canvas.height) {
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          }
        }
      }

      function render(time: number) {
        time *= 0.001;
        resize();
        cube.rotation.x = time;
        cube.rotation.y = time * 0.31;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render(-1);
    }

  }

}
