import { gsap, reducedMotion } from "./animationConfig";

/**
 * Full-page preloader intro sequence:
 * 1. Full-screen dark background (#050505).
 * 2. White transparent logo entrance: opacity 0->1, scale 0.92->1, y 20px->0 (power3.out ~1.2s).
 * 3. Short cinematic hold (~0.5s).
 * 4. Logo exit: scale 1->1.04, opacity 1->0 (power2.in ~0.5s).
 * 5. Preloader curtain lifts: yPercent 0->-100 (power4.inOut ~0.85s) unveiling the hero.
 */
export function createPreloader({
  root,
  brand,
  onComplete,
} = {}) {
  if (reducedMotion()) {
    onComplete && onComplete();
    return null;
  }

  const tl = gsap.timeline({ onComplete });

  tl.fromTo(
    brand,
    { autoAlpha: 0, scale: 0.92, y: 20 },
    { autoAlpha: 1, scale: 1, y: 0, duration: 1.25, ease: "power3.out" },
    0.1
  )
    /* Short cinematic hold */
    .to({}, { duration: 0.5 })
    /* Logo exit animation: scale 1 -> 1.04, opacity 1 -> 0 */
    .to(
      brand,
      { autoAlpha: 0, scale: 1.04, duration: 0.5, ease: "power2.in" }
    )
    /* Preloader layer slides away to reveal hero composition */
    .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.15");

  return tl;
}



