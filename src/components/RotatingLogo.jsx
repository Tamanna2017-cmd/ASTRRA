import React, { useEffect, useRef } from "react";
import { reducedMotion } from "../animations/animationConfig";

/**
 * 3D Rotating Logo Silhouette
 * Renders the official company logo in a 3D perspective coin-spin animation.
 * Features subtle mouse lerp tilt interaction for depth.
 */
export default function RotatingLogo() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const render = () => {
      if (cardRef.current) {
        // Lerp tilt towards target mouse coordinates
        currentTiltX += (mouseY * -12 - currentTiltX) * 0.05;
        currentTiltY += (mouseX * 15 - currentTiltY) * 0.05;

        // Combine continuous spin with mouse tilt
        cardRef.current.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="hero-rotating-logo" ref={containerRef} aria-hidden="true">
      <div className="hero-rotating-logo__3d-wrap">
        <div className="hero-rotating-logo__card" ref={cardRef}>
          <div className="hero-rotating-logo__side hero-rotating-logo__side--front">
            <img
              src="/astrra-logo.png"
              alt="ASTRRA TECH"
              className="hero-rotating-logo__img"
            />
            <div className="hero-rotating-logo__ring" />
          </div>
          <div className="hero-rotating-logo__side hero-rotating-logo__side--back">
            <img
              src="/astrra-logo.png"
              alt="ASTRRA TECH"
              className="hero-rotating-logo__img"
            />
            <div className="hero-rotating-logo__ring" />
          </div>
        </div>
      </div>
    </div>
  );
}
