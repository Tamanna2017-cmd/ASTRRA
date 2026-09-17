import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { reducedMotion } from "../animations/animationConfig";

/**
 * 3D AstraTech Company Logo (Three.js WebGL)
 * Features crystal-clear legibility for the "ASTRRA TECH" text mark, high-contrast pure white material,
 * attractive gold halo framing behind the logo, smooth 3D perspective yawing (oscillating -20° to +20°
 * so text is NEVER upside down/backwards), and responsive mouse tilt parallax.
 */
export default function Logo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Dimensions
    const width = mountNode.clientWidth || 400;
    const height = mountNode.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // High-contrast Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const frontMainLight = new THREE.DirectionalLight(0xffffff, 4.0);
    frontMainLight.position.set(1, 3, 6);
    scene.add(frontMainLight);

    const goldAccentLight = new THREE.DirectionalLight(0xddc084, 1.8);
    goldAccentLight.position.set(-4, -2, 3);
    scene.add(goldAccentLight);

    // Group for 3D Logo Mesh and Framing
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Load AstraTech Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/astrra-logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;

      // Anisotropy for maximum crispness
      if (renderer.capabilities) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }

      // Aspect ratio of texture image
      const imageAspect = texture.image.width / texture.image.height || 3.5;
      const planeWidth = 3.8;
      const planeHeight = planeWidth / imageAspect;

      // Pure Crisp White Material for High Legibility
      const logoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        color: 0xffffff,
        roughness: 0.08,
        metalness: 0.1,
        emissive: 0xffffff,
        emissiveIntensity: 0.35,
        side: THREE.FrontSide,
      });

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);

      // Main Front Logo Mesh
      const frontMesh = new THREE.Mesh(geometry, logoMaterial);
      logoGroup.add(frontMesh);

      // Attractive Subtle Gold Halo Ring BEHIND the logo
      const haloRadius = planeWidth * 0.58;
      const ringGeometry = new THREE.RingGeometry(haloRadius, haloRadius + 0.04, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xc8a96b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const haloRing = new THREE.Mesh(ringGeometry, ringMaterial);
      haloRing.position.z = -0.15;
      logoGroup.add(haloRing);

      // Outer accent dots for tech aesthetic framing
      const outerRingGeo = new THREE.RingGeometry(haloRadius + 0.14, haloRadius + 0.15, 64);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0xddc084,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.18,
      });
      const outerHalo = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerHalo.position.z = -0.2;
      logoGroup.add(outerHalo);
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
      targetMouseX = x * 0.3;
      targetMouseY = y * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let reqId;
    const isReduced = reducedMotion();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isReduced) {
        const time = Date.now() * 0.0012;

        // Controlled 3D Yaw Rotation (oscillates smoothly -20° to +20° so text is ALWAYS readable!)
        logoGroup.rotation.y = Math.sin(time) * 0.35;

        // Mouse tilt lerp
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;
        currentMouseY += (targetMouseY - currentMouseY) * 0.06;

        logoGroup.rotation.x = currentMouseY * 0.8 + Math.cos(time * 0.8) * 0.05;
        logoGroup.rotation.z = -currentMouseX * 0.4;

        // Subtle vertical float
        logoGroup.position.y = Math.sin(time * 1.4) * 0.07;
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
