import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { reducedMotion } from "../animations/animationConfig";

/**
 * 3D AstraTech Company Logo (Three.js WebGL)
 * Pure white high-contrast 3D brand logo.
 * NO background card, box, or ring attached behind the logo.
 * Features slow continuous Y-axis rotation and subtle mouse tilt physics.
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
    camera.position.z = 5.0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // High Contrast Pure White Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
    mainLight.position.set(5, 5, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
    fillLight.position.set(-5, -3, 5);
    scene.add(fillLight);

    // Group for 3D Logo Mesh ONLY (No background shapes)
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Load AstraTech Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/astrra-logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Aspect ratio of logo image
      const imageAspect = texture.image.width / texture.image.height || 3.5;
      const planeWidth = 3.6;
      const planeHeight = planeWidth / imageAspect;

      // Pure White High Contrast Logo Material
      const logoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.05,
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.1,
        emissive: 0xffffff,
        emissiveIntensity: 0.25,
        side: THREE.DoubleSide,
      });

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 16, 16);

      // Front 3D Layer
      const frontMesh = new THREE.Mesh(geometry, logoMaterial);
      logoGroup.add(frontMesh);

      // Back 3D Layer (subtle depth thickness)
      const backMesh = new THREE.Mesh(geometry, logoMaterial);
      backMesh.position.z = -0.05;
      backMesh.rotation.y = Math.PI;
      logoGroup.add(backMesh);
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
      targetMouseX = x * 0.35;
      targetMouseY = y * 0.35;
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
        logoGroup.rotation.z = -currentMouseX * 0.4;

        // Gentle floating pulse
        logoGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.06;
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
