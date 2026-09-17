import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { reducedMotion } from "../animations/animationConfig";

/**
 * 3D AstraTech Company Logo (Three.js WebGL)
 * 1. Features pure white AstraTech logo mark with crisp legibility.
 * 2. Unclipped complete circular tech halo ring animation surrounding the logo.
 * 3. Calibrated camera FOV and container padding to guarantee zero top, bottom, or side cropping.
 * 4. Smooth 3D yawing perspective (oscillating -18° to +18°) so text is ALWAYS forward-facing & 100% readable.
 */
export default function Logo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Viewport Dimensions
    const width = mountNode.clientWidth || 420;
    const height = mountNode.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Calibrated camera z position & FOV to fit the complete circular ring with ample margins
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    camera.position.z = 5.6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // High-Contrast Clean White Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 3.8);
    frontLight.position.set(1.5, 3.5, 6);
    scene.add(frontLight);

    const goldAccent = new THREE.DirectionalLight(0xddc084, 1.6);
    goldAccent.position.set(-4, -2, 3);
    scene.add(goldAccent);

    // Main 3D Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Load AstraTech Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/astrra-logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;

      if (renderer.capabilities) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }

      const imageAspect = texture.image.width / texture.image.height || 3.5;
      const planeWidth = 3.5;
      const planeHeight = planeWidth / imageAspect;

      // Pure White 3D Logo Material
      const logoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.1,
        emissive: 0xffffff,
        emissiveIntensity: 0.35,
        side: THREE.FrontSide,
      });

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);

      // Front Logo Mesh
      const frontMesh = new THREE.Mesh(geometry, logoMaterial);
      logoGroup.add(frontMesh);

      // Complete Unclipped Circular Tech Halo Ring (Fits comfortably within camera frustum)
      const haloRadius = planeWidth * 0.52;
      const ringGeometry = new THREE.RingGeometry(haloRadius, haloRadius + 0.045, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xc8a96b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.38,
      });
      const haloRing = new THREE.Mesh(ringGeometry, ringMaterial);
      haloRing.position.z = -0.12;
      logoGroup.add(haloRing);

      // Outer Orbital Accent Ring
      const outerRadius = haloRadius + 0.14;
      const outerRingGeo = new THREE.RingGeometry(outerRadius, outerRadius + 0.015, 64);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0xddc084,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.position.z = -0.16;
      logoGroup.add(outerRing);
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
      targetMouseX = x * 0.28;
      targetMouseY = y * 0.28;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let reqId;
    const isReduced = reducedMotion();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isReduced) {
        const time = Date.now() * 0.0012;

        // Controlled 3D Yaw Rotation (oscillates -18° to +18° so text is ALWAYS forward-facing & readable)
        logoGroup.rotation.y = Math.sin(time) * 0.32;

        // Smooth Mouse Tilt
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        logoGroup.rotation.x = currentMouseY * 0.7 + Math.cos(time * 0.8) * 0.04;
        logoGroup.rotation.z = -currentMouseX * 0.35;

        // Subtle vertical floating motion inside bounds
        logoGroup.position.y = Math.sin(time * 1.3) * 0.05;
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
