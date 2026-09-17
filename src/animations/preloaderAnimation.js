import { gsap, reducedMotion } from "./animationConfig";

/**
 * Full-page preloader sequence:
 * 1. Full-screen dark background.
 * 2. Transparent white logo reveals: opacity 0->1, scale 0.92->1, y 15->0 (power3.out).
 * 3. Short hold.
 * 4. Logo exits: scale 1->1.04, opacity 1->0.
 * 5. Preloader curtain lifts: yPercent 0->-100 to unveil hero from top.
 */
export function createPreloader({
  root,
  brand,
  subtitle,
  counterEl,
  onComplete,
} = {}) {
  if (reducedMotion()) {
    onComplete && onComplete();
    return null;
  }

  const counterObj = { value: 0 };
  const lineEl = root ? root.querySelector(".preloader__line") : null;

  const tl = gsap.timeline({ onComplete });

  tl.fromTo(
    brand,
    { autoAlpha: 0, scale: 0.92, y: 15 },
    { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
    0.1
  )
    .fromTo(
      subtitle,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
      0.4
    )
    .fromTo(
      counterEl,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4 },
      0.3
    )
    .fromTo(
      lineEl,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
      0.3
    )
    .to(
      counterObj,
      {
        value: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterEl) {
            counterEl.textContent = String(Math.round(counterObj.value)).padStart(3, "0");
          }
        },
      },
      0.3
    )
    /* Logo exit animation: scale 1 -> 1.04, opacity 1 -> 0 */
    .to(
      [brand, subtitle, counterEl, lineEl],
      { autoAlpha: 0, scale: 1.04, duration: 0.5, ease: "power2.in" },
      "+=0.3"
    )
    /* Preloader layer slides away */
    .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.15");

  return tl;
}


