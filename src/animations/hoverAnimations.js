import { gsap, reducedMotion } from "./animationConfig";

/**
 * Magnetic attraction for premium CTAs. The element eases toward the cursor
 * while hovered and springs back on leave. Also drives the global
 * cursor-hover state so the custom cursor responds.
 */
export function magnetic(el, options = {}) {
  if (!el || reducedMotion()) return () => {};

  const {
    strength = 0.28,
    scale = 1.02,
    onEnter,
    onLeave,
  } = options;

  const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    xTo(relX * strength);
    yTo(relY * strength);
  };

  const enter = () => {
    document.body.classList.add("cursor-hover");
    if (scale) gsap.to(el, { scale, duration: 0.4, ease: "power3.out" });
    onEnter && onEnter();
  };

  const leave = () => {
    document.body.classList.remove("cursor-hover");
    xTo(0);
    yTo(0);
    gsap.to(el, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    onLeave && onLeave();
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseenter", enter);
  el.addEventListener("mouseleave", leave);

  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseenter", enter);
    el.removeEventListener("mouseleave", leave);
  };
}

/** Arrow inside a magnetic/interactive element drifts on hover. */
export function arrowDrift(el, selector = "[data-arrow]") {
  if (!el) return () => {};
  const arrow = el.querySelector(selector);
  if (!arrow) return () => {};

  const enter = () =>
    gsap.to(arrow, { x: 5, y: -5, duration: 0.35, ease: "power3.out" });
  const leave = () =>
    gsap.to(arrow, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });

  el.addEventListener("mouseenter", enter);
  el.addEventListener("mouseleave", leave);
  return () => {
    el.removeEventListener("mouseenter", enter);
    el.removeEventListener("mouseleave", leave);
  };
}
