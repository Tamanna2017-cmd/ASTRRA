import { gsap, EASE, reducedMotion } from "./animationConfig";

/**
 * Hero load sequence — runs once after the preloader completes.
 * Staggered, editorial, controlled: label -> headline lines ->
 * supporting copy -> CTAs -> meta elements.
 * Elements are pre-hidden on mount (see Hero.jsx) so nothing flashes.
 */
export function heroIntro(hero, options = {}) {
  const { onStart } = options;

  if (reducedMotion()) {
    gsap.set(hero.querySelectorAll("[data-hero-line] span"), { yPercent: 0 });
    gsap.set(
      hero.querySelectorAll("[data-hero-label], [data-hero-logo], [data-hero-copy], [data-hero-cta], [data-hero-meta]"),
      { autoAlpha: 1, y: 0 }
    );
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: EASE.outExpo },
    onStart,
  });

  tl.fromTo(
    "[data-hero-label]",
    { autoAlpha: 0, y: 18 },
    { autoAlpha: 1, y: 0, duration: 0.9 },
    0
  )
    .fromTo(
      "[data-hero-line] span",
      { yPercent: 115 },
      { yPercent: 0, duration: 1.35, stagger: 0.11 },
      0.12
    )
    .fromTo(
      "[data-hero-logo]",
      { autoAlpha: 0, y: 24, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 },
      0.45
    )
    .fromTo(
      "[data-hero-copy]",
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 1 },
      0.62
    )
    .fromTo(
      "[data-hero-cta]",
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 },
      0.74
    )
    .fromTo(
      "[data-hero-meta]",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.1, stagger: 0.07 },
      0.85
    );

  return tl;
}

/**
 * Pre-hide the hero's animated elements as soon as it mounts (preloader
 * still covers the screen) so the intro reveals from a clean slate
 * with no flash of unstyled content.
 */
export function prehideHero(hero) {
  if (reducedMotion()) return;
  gsap.set(hero.querySelectorAll("[data-hero-line] span"), { yPercent: 115 });
  gsap.set(
    hero.querySelectorAll("[data-hero-label], [data-hero-logo], [data-hero-copy], [data-hero-cta], [data-hero-meta]"),
    { autoAlpha: 0 }
  );
}

export function heroScrollDrift(hero) {
  if (reducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to("[data-hero-content]", { y: -60, ease: "none" }, 0)
    .to("[data-hero-bg]", { y: 40, ease: "none" }, 0);

  return tl;
}

