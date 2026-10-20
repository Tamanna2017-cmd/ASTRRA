import { gsap, reducedMotion } from "./animationConfig";

/**
 * 2x2 Halftone Grid Reveal Preloader Sequence:
 * 1. Instant full-viewport 2x2 grid on load (no fade-in needed for the grid itself).
 * 2. Hold for ~1.1s so the layout registers.
 * 3. Main headline ("Make your space digitally.") slides/fades up from bottom, overlapping the grid.
 * 4. Grid cells fade out / headline background covers them (~0.5s).
 * 5. Preloader finishes: signal website reveal (onRevealStart), unlock body scroll, hero takes over.
 * 6. Total duration ~2.35s (strictly within the 2.5–3s limit).
 */
export function createPreloader({
  root,
  grid,
  headline,
  onRevealStart,
  onComplete,
} = {}) {
  if (reducedMotion()) {
    onRevealStart && onRevealStart();
    onComplete && onComplete();
    return null;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      onComplete && onComplete();
    },
  });

  // Ensure initial visibility of root and grid without any fade-in lag
  gsap.set(root, { autoAlpha: 1, visibility: "visible" });
  gsap.set(grid, { autoAlpha: 1 });
  gsap.set(headline, { autoAlpha: 0, y: 70 });

  // 1. Hold for ~1.15s
  tl.to({}, { duration: 1.15 })

    // 2. Main headline text slides & fades up from bottom, overlapping the grid
    .to(
      headline,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
      }
    )

    // 3. Grid cells fade out / headline background covers them
    .to(
      grid,
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.35"
    )

    // 4. Brief cinematic hold on headline before hand-off
    .to({}, { duration: 0.25 })

    // 5. Signal page reveal right before preloader fades out
    .call(() => {
      onRevealStart && onRevealStart();
    })

    // 6. Preloader curtain fades away cleanly to unveil the ready Hero
    .to(root, {
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.out",
    });

  return tl;
}
