import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { reducedMotion } from "../animations/animationConfig";

/**
 * 3D AstraTech Company Logo (Three.js WebGL)
 * Features the authentic company logo texture with 3D depth, metallic gold/white specular lighting,
 * slow continuous vertical rotation, and smooth mouse tilt interaction.
 */
export default function Logo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Dimensions
    const width = mountNode.clientWidth || 380;
    const height = mountNode.clientHeight || 380;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldDirectional = new THREE.DirectionalLight(0xddc084, 3.0);
    goldDirectional.position.set(5, 5, 6);
    scene.add(goldDirectional);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const backGlow = new THREE.PointLight(0xc8a96b, 3.5, 10);
    backGlow.position.set(0, 0, -1);
    scene.add(backGlow);

    // Group for 3D Logo Mesh
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Load AstraTech Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/astrra-logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Aspect ratio of texture image
      const imageAspect = texture.image.width / texture.image.height || 3.5;
      const planeWidth = 3.6;
      const planeHeight = planeWidth / imageAspect;

      // Front Logo Plane Material
      const logoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.25,
        metalness: 0.75,
        emissive: 0x221a0f,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);
      const frontMesh = new THREE.Mesh(geometry, logoMaterial);
      logoGroup.add(frontMesh);

      // Back-to-back 3D depth layer
      const backMesh = new THREE.Mesh(geometry, logoMaterial);
      backMesh.position.z = -0.06;
      backMesh.rotation.y = Math.PI;
      logoGroup.add(backMesh);

      // Outer glowing rim ring
      const ringGeometry = new THREE.RingGeometry(
        planeWidth * 0.58,
        planeWidth * 0.6,
        64
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xc8a96b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.z = -0.03;
      logoGroup.add(ringMesh);
    });

    // Mouse tilt variables
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = mountNode.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 0.4;
      targetMouseY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let reqId;
    const isReduced = reducedMotion();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isReduced) {
        // Slow continuous 3D rotation on Y-axis
        logoGroup.rotation.y += 0.007;

        // Smooth mouse tilt lerp
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        logoGroup.rotation.x = currentMouseY;
        logoGroup.rotation.z = -currentMouseX * 0.5;

        // Gentle vertical floating pulse
        logoGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountNode) return;
      const newWidth = mountNode.clientWidth;
      const newHeight = mountNode.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountNode);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-logo-3d-wrap" ref={mountRef} aria-hidden="true" />
  );
}
