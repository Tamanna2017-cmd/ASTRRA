import { gsap, EASE, reducedMotion, ScrollTrigger } from "./animationConfig";

/**
 * Hero load sequence — runs once after the preloader completes.
 * Reveals 3D logo canvas, split-column layout, and dark info card elements.
 */
export function heroIntro(hero, options = {}) {
  const { onStart } = options;

  if (reducedMotion() || !hero) {
    gsap.set(
      hero.querySelectorAll(
        "[data-hero-3d], [data-hero-card], [data-hero-label], [data-hero-copy], [data-hero-cta], [data-hero-meta]"
      ),
      { autoAlpha: 1, y: 0 }
    );
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: EASE.outExpo },
    onStart,
  });

  tl.fromTo(
    "[data-hero-3d]",
    { autoAlpha: 0, scale: 0.92 },
    { autoAlpha: 1, scale: 1, duration: 1.2 },
    0
  )
    .fromTo(
      "[data-hero-card]",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.1 },
      0.18
    )
    .fromTo(
      "[data-hero-meta]",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.9, stagger: 0.08 },
      0.45
    );

  return tl;
}

/**
 * Pre-hide the hero's animated elements as soon as it mounts so the intro
 * reveals from a clean slate with no flash of unstyled content.
 */
export function prehideHero(hero) {
  if (reducedMotion() || !hero) return;
  gsap.set(
    hero.querySelectorAll(
      "[data-hero-3d], [data-hero-card], [data-hero-meta]"
    ),
    { autoAlpha: 0 }
  );
}

/**
 * Pinned Scroll Interaction:
 * - Pins the split composition for a controlled scroll distance (~90vh).
 * - As user scrolls, the Black Information Card moves upward from an offset state (y: 130px)
 *   to align side-by-side with the 3D logo.
 * - Updates the 3D logo rotation in sync with scroll progress.
 * - Releases cleanly so normal page scrolling continues into the next section.
 */
export function heroPinnedScroll(hero, onProgressUpdate) {
  if (reducedMotion() || !hero) return null;

  const pinWrapper = hero.querySelector("[data-hero-pinned]");
  const infoCard = hero.querySelector("[data-hero-card]");

  if (!pinWrapper || !infoCard) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=90vh",
      pin: pinWrapper,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        onProgressUpdate && onProgressUpdate(self.progress);
      },
    },
  });

  // Black Info Card moves upward from offset to perfect alignment with 3D logo
  tl.fromTo(
    infoCard,
    { y: 130 },
    { y: 0, ease: "none" },
    0
  );

  return tl;
}
