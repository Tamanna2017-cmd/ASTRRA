import { gsap, EASE, reducedMotion } from "./animationConfig";

/**
 * Clip-path curtain reveal for large imagery — the signature editorial
 * image entrance. Image starts slightly scaled for depth.
 */
export function imageReveal(target, options = {}) {
  const {
    trigger = target,
    start = "top 82%",
    duration = 1.5,
    scale = 1.25,
  } = options;

  if (reducedMotion()) {
    gsap.set(target, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 });
    const img = target.querySelector("img");
    if (img) gsap.set(img, { scale: 1 });
    return null;
  }

  const img = target.querySelector("img");
  const tl = gsap.timeline({
    scrollTrigger: { trigger, start, once: true },
  });

  tl.fromTo(
    target,
    { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 },
    { clipPath: "inset(0% 0% 0% 0%)", duration, ease: EASE.inOut }
  );

  if (img) {
    tl.fromTo(
      img,
      { scale },
      { scale: 1, duration: duration * 1.25, ease: EASE.outExpo },
      0
    );
  }

  return tl;
}

/** Gentle continuous parallax drift for hero/section visuals. */
export function parallax(targets, options = {}) {
  const {
    trigger = targets,
    start = "top bottom",
    end = "bottom top",
    y = 80,
    scale,
  } = options;

  if (reducedMotion()) return null;

  const vars = {
    y,
    ease: "none",
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
      invalidateOnRefresh: true,
    },
  };
  if (scale) vars.scale = scale;

  return gsap.to(targets, vars);
}

/** Slow scale-down settle for full-bleed visuals as they scroll in. */
export function scaleReveal(target, options = {}) {
  const { trigger = target, start = "top bottom", end = "top 15%" } = options;

  if (reducedMotion()) return null;

  return gsap.fromTo(
    target,
    { scale: 1.18 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger, start, end, scrub: true },
    }
  );
}

/** Section-wide stagger reveal: fades and lifts children in sequence. */
export function staggerReveal(targets, options = {}) {
  const {
    trigger,
    start = "top 82%",
    y = 34,
    duration = 0.9,
    stagger = 0.08,
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
      stagger,
      ease: EASE.out,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        once: true,
      },
    }
  );
}
