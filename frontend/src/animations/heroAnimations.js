import { gsap, EASE, ScrollTrigger, reducedMotion } from "./animationConfig";

/**
 * Hero Load Reveal — Post-Intro State:
 * Both the white 3D AstraTech logo and the black information box are IMMEDIATELY 100% visible
 * on initial page load as soon as the intro curtain finishes. Zero scroll required for initial visibility.
 */
export function heroIntro(hero, options = {}) {
  const { onStart } = options;

  if (!hero) return null;

  // Set all hero elements 100% visible immediately post-intro
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
 * Hero Scroll Alignment Interaction & Together Scroll:
 * 1. Initial State (Page Load / Scroll = 0):
 *    - 3D Logo is UP (y: 0), 100% visible on left.
 *    - Black Information Box is SLIGHTLY LOWER (y: 110px), 100% visible on right inside same viewport.
 * 2. On Scroll Down:
 *    - Hero pins at top: 0 for +45vh scroll distance.
 *    - Black Box travels UP from 110px to 0px while 3D Logo stays anchored in place.
 * 3. Final Alignment & Together Scroll:
 *    - Once Black Box reaches y: 0 (aligned horizontally with 3D Logo), alignment finishes.
 *    - Hero unpins cleanly, and Logo + Black Box scroll DOWN TOGETHER as one aligned composition into the next sections.
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
      end: "+=45vh",
      pin: true,
      pinSpacing: true,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline.to(blackBox, {
    y: 0,
    ease: "power2.out",
  });

  return timeline;
}
