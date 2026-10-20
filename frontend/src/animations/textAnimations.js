import { gsap, EASE, reducedMotion } from "./animationConfig";

/**
 * Masked line reveal for headings: lines slide up from behind an overflow mask.
 * Ideal for large editorial headlines.
 */
export function revealLines(targets, options = {}) {
  const {
    trigger = targets,
    start = "top 85%",
    y = "110%",
    duration = 1.2,
    stagger = 0.09,
    delay = 0,
    once = true,
  } = options;

  if (reducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    targets,
    { yPercent: y === "110%" ? 110 : y, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration,
      delay,
      stagger,
      ease: EASE.outExpo,
      scrollTrigger: once
        ? { trigger, start, once: true }
        : { trigger, start },
    }
  );
}

/**
 * Split element(s) into words and stagger them in — used for hero headline
 * and large statements where per-word motion reads more cinematic.
 */
export function revealWords(targets, options = {}) {
  const {
    trigger = targets,
    start = "top 85%",
    duration = 1,
    stagger = 0.035,
    delay = 0,
    y = 60,
  } = options;

  if (reducedMotion()) {
    gsap.set(targets, { autoAlpha: 1 });
    return null;
  }

  const split = new (require0())(targets, { type: "words" });
  return gsap.fromTo(
    split.words,
    { yPercent: 100, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 1,
      duration,
      delay,
      stagger,
      ease: EASE.outExpo,
      scrollTrigger: { trigger, start, once: true },
    }
  );
}

/* Local import indirection so tree-shaking keeps SplitText optional */
import { SplitText } from "gsap/SplitText";
function require0() {
  return SplitText;
}

/**
 * Fade + rise for supporting paragraphs, labels, lists.
 * The workhorse scroll reveal — subtle, not showy.
 */
export function fadeUp(targets, options = {}) {
  const {
    trigger = targets,
    start = "top 88%",
    y = 40,
    duration = 1.1,
    delay = 0,
    stagger = 0,
  } = options;

  if (reducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: EASE.out,
      scrollTrigger: { trigger, start, once: true },
    }
  );
}

/** Simple opacity-only fade for delicate elements (corners, indices). */
export function fadeIn(targets, options = {}) {
  const {
    trigger = targets,
    start = "top 90%",
    duration = 1.2,
    delay = 0,
    stagger = 0,
  } = options;

  if (reducedMotion()) {
    gsap.set(targets, { autoAlpha: 1 });
    return null;
  }

  return gsap.fromTo(
    targets,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration,
      delay,
      stagger,
      ease: "power2.out",
      scrollTrigger: { trigger, start, once: true },
    }
  );
}

/** Horizontal rule that draws itself from 0 -> 100% width. */
export function drawLine(targets, options = {}) {
  const { trigger = targets, start = "top 90%", duration = 1.4, delay = 0 } =
    options;

  if (reducedMotion()) {
    gsap.set(targets, { scaleX: 1 });
    return null;
  }

  return gsap.fromTo(
    targets,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration,
      delay,
      ease: EASE.inOut,
      scrollTrigger: { trigger, start, once: true },
    }
  );
}
