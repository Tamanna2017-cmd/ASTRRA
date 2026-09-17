import { gsap, EASE, reducedMotion } from "./animationConfig";

/**
 * Hero load entrance sequence — runs when preloader finishes.
 * Staggered reveal of initial elements (3D logo, black box card, headline, copy, CTAs).
 */
export function heroIntro(hero, options = {}) {
  const { onStart } = options;

  if (reducedMotion()) {
    gsap.set(hero.querySelectorAll("[data-hero-line] span"), { yPercent: 0 });
    gsap.set(
      hero.querySelectorAll("[data-hero-3d-logo], [data-hero-black-box], [data-hero-meta]"),
      { autoAlpha: 1 }
    );
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: EASE.outExpo },
    onStart,
  });

  tl.fromTo(
    "[data-hero-3d-logo]",
    { autoAlpha: 0, scale: 0.9, y: 15 },
    { autoAlpha: 1, scale: 1, y: 0, duration: 1.1 },
    0
  )
    .fromTo(
      "[data-hero-black-box]",
      { autoAlpha: 0, scale: 0.96 },
      { autoAlpha: 1, scale: 1, duration: 1.1 },
      0.15
    )
    .fromTo(
      "[data-hero-line] span",
      { yPercent: 115 },
      { yPercent: 0, duration: 1.2, stagger: 0.1 },
      0.25
    )
    .fromTo(
      "[data-hero-copy]",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.9 },
      0.55
    )
    .fromTo(
      "[data-hero-cta]",
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.08 },
      0.68
    )
    .fromTo(
      "[data-hero-meta]",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.0, stagger: 0.06 },
      0.75
    );

  return tl;
}

/**
 * Pre-hide hero elements on mount before intro triggers.
 */
export function prehideHero(hero) {
  if (reducedMotion()) return;
  gsap.set(hero.querySelectorAll("[data-hero-line] span"), { yPercent: 115 });
  gsap.set(
    hero.querySelectorAll("[data-hero-3d-logo], [data-hero-black-box], [data-hero-meta]"),
    { autoAlpha: 0 }
  );
}

/**
 * Hero Scroll Alignment Interaction:
 * 1. Initial state (Scroll = 0): 3D Logo is UP (y:0), Black Box is slightly DOWN (translateY: 110px).
 * 2. On scroll: Hero stays pinned for +50vh, Black Box travels UP to y: 0, reaching exact horizontal alignment with 3D Logo.
 * 3. On alignment complete: Hero unpins naturally and normal page scrolling continues down the website.
 */
export function heroScrollAlignment(hero) {
  if (reducedMotion() || !hero) return null;

  const blackBox = hero.querySelector("[data-hero-black-box]");
  if (!blackBox) return null;

  // Set initial lower offset for Black Information Box
  gsap.set(blackBox, { y: 110 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=55vh",
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
    },
  });

  timeline.to(blackBox, {
    y: 0,
    ease: "power2.out",
  });

  return timeline;
}
