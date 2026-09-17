import { gsap, EASE, ScrollTrigger, reducedMotion } from "./animationConfig";

/**
 * Hero Load Reveal — Post-Intro State:
 * Both the white 3D AstraTech logo and the black information box are IMMEDIATELY 100% visible
 * on initial page load at top: 0 as soon as the intro curtain finishes. Zero scroll required.
 */
export function heroIntro(hero, options = {}) {
  const { onStart } = options;

  if (!hero) return null;

  // Immediately set all hero elements 100% visible and sharp
  gsap.set(hero.querySelectorAll("[data-hero-line] span"), { yPercent: 0 });
  gsap.set(
    hero.querySelectorAll(
      "[data-hero-3d-logo], [data-hero-black-box], [data-hero-meta], [data-hero-label], [data-hero-copy], [data-hero-cta]"
    ),
    { autoAlpha: 1, opacity: 1, visibility: "visible" }
  );

  if (reducedMotion()) return null;

  const tl = gsap.timeline({
    defaults: { ease: EASE.outExpo },
    onStart,
  });

  tl.to(hero.querySelectorAll("[data-hero-3d-logo], [data-hero-black-box]"), {
    autoAlpha: 1,
    duration: 0.2,
  });

  return tl;
}

/**
 * Ensure hero elements are visible immediately on mount.
 */
export function prehideHero(hero) {
  if (!hero) return;
  gsap.set(hero.querySelectorAll("[data-hero-line] span"), { yPercent: 0 });
  gsap.set(
    hero.querySelectorAll(
      "[data-hero-3d-logo], [data-hero-black-box], [data-hero-meta], [data-hero-label], [data-hero-copy], [data-hero-cta]"
    ),
    { autoAlpha: 1, opacity: 1, visibility: "visible" }
  );
}

/**
 * Hero Scroll Alignment Interaction:
 * 1. Initial State (Page Load / Scroll = 0):
 *    - Hero sits at top: 0 inside the initial viewport.
 *    - White 3D Logo is UP (y: 0), 100% visible.
 *    - Black Information Box is SLIGHTLY LOWER (y: 110px), 100% visible in the same viewport.
 * 2. On Scroll:
 *    - As user scrolls down through the hero section (0 to 400px), Black Box travels UP to y: 0.
 * 3. Final Alignment:
 *    - When Black Box aligns horizontally with 3D Logo (y: 0), normal page scrolling continues naturally.
 */
export function heroScrollAlignment(hero) {
  if (!hero) return null;

  const blackBox = hero.querySelector("[data-hero-black-box]");
  if (!blackBox) return null;

  if (reducedMotion()) {
    gsap.set(blackBox, { y: 0 });
    return null;
  }

  // Set initial slightly lower position for Black Information Box
  gsap.set(blackBox, { y: 110 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "top+=400 top",
      scrub: 0.6,
    },
  });

  timeline.to(blackBox, {
    y: 0,
    ease: "power2.out",
  });

  return timeline;
}
