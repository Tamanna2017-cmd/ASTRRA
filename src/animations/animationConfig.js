import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Shared cinematic easings (expo-out family, Aspen-like restraint) */
export const EASE = {
  out: "power3.out",
  outExpo: "expo.out",
  inOut: "power2.inOut",
  soft: "power2.out",
};

export const DUR = {
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
};

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Respect reduced motion: jump animations to their end state instantly */
export function ifReducedMotion(setAll = () => {}) {
  if (reducedMotion()) {
    setAll();
    return true;
  }
  return false;
}

/* Register all scroll-triggered animations once fonts are ready to avoid re-layout */
export function initAnimations(callback) {
  const start = () => {
    callback();
    ScrollTrigger.refresh();
  };
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start);
  } else {
    window.addEventListener("load", start);
  }
}

export { gsap, ScrollTrigger, SplitText };
