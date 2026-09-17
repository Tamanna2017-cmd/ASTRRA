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
  onRevealStart,
} = {}) {
  if (reducedMotion()) {
    onComplete && onComplete();
    return null;
  }

  const tl = gsap.timeline({ onComplete });

  tl.fromTo(
    brand,
    { autoAlpha: 0, scale: 0.88, filter: "blur(6px)" },
    { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out" },
    0.15
  )
    /* Short premium hold */
    .to({}, { duration: 0.45 })
    /* Logo exit transition */
    .to(
      brand,
      { autoAlpha: 0, scale: 1.05, duration: 0.45, ease: "power2.in" }
    )
    /* Signal website reveal right as curtain lifts */
    .call(() => {
      onRevealStart && onRevealStart();
    })
    /* Full-screen viewport curtain lifts away */
    .to(root, { yPercent: -100, duration: 0.85, ease: "power4.inOut" });

  return tl;
}



