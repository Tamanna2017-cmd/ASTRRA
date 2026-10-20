import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../animations/animationConfig";

/**
 * Custom cursor: gold dot follows instantly, ring trails with ease.
 * Only active on fine-pointer devices; hidden otherwise.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    /* Keep offscreen until the first mouse move */
    gsap.set([dot, ring], { x: -100, y: -100 });

    const setDot = gsap.quickTo(dot, "x", { duration: 0.08 });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08 });
    const setRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e) => {
      setDot(e.clientX);
      setDotY(e.clientY);
      setRing(e.clientX);
      setRingY(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
