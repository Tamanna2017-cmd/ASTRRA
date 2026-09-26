import React, { useEffect, useRef } from "react";
import { reducedMotion } from "../animations/animationConfig";

/**
 * Animated Halftone / Dither Canvas
 * Loads /astrra-background.jpg, samples brightness grid, and renders an animated
 * printed-style halftone dot pattern with subtle particle shimmer wave.
 * Pre-processed for 60fps performance. Responsive to viewport changes.
 */
export default function HalftoneCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let gridPoints = [];
    let imgWidth = 0;
    let imgHeight = 0;
    let isLoaded = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/astrra-hero-bg.jpg";

    const processImageGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Create an offscreen canvas to sample image brightness
      const sampleScale = 0.25; // sample down for speed
      const sw = Math.floor(w * sampleScale);
      const sh = Math.floor(h * sampleScale);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = sw;
      offCanvas.height = sh;
      const offCtx = offCanvas.getContext("2d");

      if (!offCtx) return;

      // Draw image to cover aspect ratio
      const imgAspect = img.width / img.height;
      const screenAspect = sw / sh;
      let renderW = sw;
      let renderH = sh;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > screenAspect) {
        renderW = sh * imgAspect;
        offsetX = (sw - renderW) / 2;
      } else {
        renderH = sw / imgAspect;
        offsetY = (sh - renderH) / 2;
      }

      offCtx.drawImage(img, offsetX, offsetY, renderW, renderH);

      const imgData = offCtx.getImageData(0, 0, sw, sh);
      const data = imgData.data;

      // Build grid points
      const step = Math.max(12, Math.floor(w / 120)); // Grid dot spacing
      gridPoints = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const sampleX = Math.floor((x / w) * sw);
          const sampleY = Math.floor((y / h) * sh);
          const index = (sampleY * sw + sampleX) * 4;

          const r = data[index] || 0;
          const g = data[index + 1] || 0;
          const b = data[index + 2] || 0;

          // Calculate luminance (0 to 1)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          if (luminance > 0.04) {
            gridPoints.push({
              x,
              y,
              baseRadius: (step * 0.45) * Math.pow(luminance, 0.75),
              maxRadius: step * 0.5,
              luminance,
              r,
              g,
              b,
              phase: Math.random() * Math.PI * 2,
            });
          }
        }
      }

      isLoaded = true;
    };

    img.onload = () => {
      imgWidth = img.width;
      imgHeight = img.height;
      processImageGrid();
    };

    let startTime = performance.now();
    let isScrolling = false;
    let scrollTimer = null;

    const handleScroll = () => {
      isScrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    const render = (time) => {
      if (!isLoaded || !canvas || !ctx) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (isScrolling || document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const elapsed = (time - startTime) * 0.0015;
      const isMotionReduced = reducedMotion();

      for (let i = 0; i < gridPoints.length; i++) {
        const pt = gridPoints[i];

        // Animated sine shimmer dot radius modulation
        const wave = isMotionReduced ? 0 : Math.sin(elapsed * 1.5 + pt.x * 0.008 + pt.y * 0.008 + pt.phase) * 0.22;
        const currentRadius = Math.max(0.6, pt.baseRadius * (1 + wave));

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, currentRadius, 0, Math.PI * 2);

        // Gold tone halftone color blending
        const alpha = Math.min(0.85, 0.2 + pt.luminance * 0.65);
        if (pt.luminance > 0.6) {
          ctx.fillStyle = `rgba(221, 192, 132, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(${Math.floor(pt.r * 0.9 + 50)}, ${Math.floor(pt.g * 0.8 + 40)}, ${Math.floor(pt.b * 0.6 + 20)}, ${alpha})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      if (img.complete) {
        processImageGrid();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="halftone-canvas"
      aria-hidden="true"
    />
  );
}
