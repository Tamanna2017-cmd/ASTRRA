import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Interactive Logo Canvas component using Three.js:
 * - Renders a 3D metallic gold faceted emblem / ASTRRA logo geometry
 * - Features realistic gold materials, metallic reflections, rim lighting
 * - Ambient gold particle dust field
 * - Mouse parallax tilt reaction
 * - Smooth continuous Y-axis rotation and scroll-driven rotation updates
 */
export default function Logo3DCanvas({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const logoGroupRef = useRef(null);
  const targetRotationYRef = useRef(0);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear previous canvas if any
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Main 3D Logo Group
    const logoGroup = new THREE.Group();
    logoGroupRef.current = logoGroup;
    scene.add(logoGroup);

    // 1. Central Metallic Gold 3D Emblem Geometry
    // Outer faceted frame / diamond shield
    const outerGeo = new THREE.IcosahedronGeometry(1.7, 1);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xc8a96b, // Astra Gold
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    logoGroup.add(outerMesh);

    // Inner Solid Faceted Emblem Core
    const innerGeo = new THREE.OctahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xddc084, // Bright Astra Gold
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    logoGroup.add(innerMesh);

    // Orbiting Tech Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xc8a96b,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x553d10,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    logoGroup.add(ring1);

    // Orbiting Tech Ring 2
    const ring2Geo = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffdd99,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    logoGroup.add(ring2);

    // 2. Ambient Gold Floating Particle Dust
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xddc084,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 3. Lighting Setup
    // Main warm key light
    const keyLight = new THREE.DirectionalLight(0xffb74d, 3.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Golden point light at center
    const centerLight = new THREE.PointLight(0xc8a96b, 4, 10);
    centerLight.position.set(0, 0, 1);
    scene.add(centerLight);

    // Cool blue/cyan subtle rim light for high-tech contrast
    const rimLight = new THREE.DirectionalLight(0x4488ff, 1.2);
    rimLight.position.set(-5, -4, -4);
    scene.add(rimLight);

    // Soft ambient fill
    const ambientLight = new THREE.AmbientLight(0x1a150e, 1.5);
    scene.add(ambientLight);

    // Mouse movement listener for interactive parallax
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle rotation
      logoGroup.rotation.y += 0.006;
      innerMesh.rotation.x = Math.sin(elapsedTime * 0.8) * 0.2;
      innerMesh.rotation.z = Math.cos(elapsedTime * 0.6) * 0.2;
      ring1.rotation.z += 0.004;
      ring2.rotation.x += 0.003;
      particleSystem.rotation.y -= 0.0008;

      // Mouse Parallax Lerp
      currentMouseRef.current.x +=
        (targetMouseRef.current.x - currentMouseRef.current.x) * 0.05;
      currentMouseRef.current.y +=
        (targetMouseRef.current.y - currentMouseRef.current.y) * 0.05;

      logoGroup.rotation.x = currentMouseRef.current.y * 0.35;
      logoGroup.rotation.z = -currentMouseRef.current.x * 0.25;

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update rotation based on scroll progress
  useEffect(() => {
    if (logoGroupRef.current) {
      logoGroupRef.current.rotation.y = scrollProgress * Math.PI * 1.5;
    }
  }, [scrollProgress]);

  return (
    <div
      ref={mountRef}
      className="hero__3d-canvas-container"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "420px",
        position: "relative",
      }}
    />
  );
}
