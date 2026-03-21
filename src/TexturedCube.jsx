import * as THREE from "three";
import { useEffect, useRef } from "react";

function TexturedCube() {
  const mountRef = useRef(null);

  useEffect(() => {
     if (mountRef.current.children.length > 0) {
      mountRef.current.innerHTML = ""; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // 3 images repeated across 6 faces
    const materials = [
      new THREE.MeshBasicMaterial({ map: loader.load("/name.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/seatnum.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/sec.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/ku.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/ubit.png") }),
      new THREE.MeshBasicMaterial({ map: loader.load("/cube.png") }),
    ];

    const cube = new THREE.Mesh(new THREE.BoxGeometry(), materials);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
}

export default TexturedCube;

