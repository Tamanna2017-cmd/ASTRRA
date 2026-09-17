import { useEffect, useRef } from "react";
import { fadeUp, revealLines, drawLine } from "../animations/textAnimations";
import { staggerReveal } from "../animations/imageAnimations";
import { reducedMotion } from "../animations/animationConfig";

/**
 * fadeUp reveal on mount (fires via ScrollTrigger when scrolled into view).
 * Accepts a CSS selector string to animate multiple children.
 */
export function useFadeUp(selectorOrRef, options = {}) {
  const ref = useRef(null);
  const triggerRef =
    typeof selectorOrRef === "string" ? ref : selectorOrRef;

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const targets = typeof selectorOrRef === "string" ? el.querySelectorAll(selectorOrRef) : el;
    const anim = fadeUp(targets, { trigger: el, ...options });
    return () => {
      anim && anim.scrollTrigger && anim.scrollTrigger.kill();
      anim && anim.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Masked line reveal for heading elements marked with
 * <span data-line><span data-line-inner>Text</span></span> structure,
 * or falls back to splitting the heading's own lines via SplitText.
 */
export function useLineReveal(selectorOrRef, options = {}) {
  const ref = useRef(null);
  const triggerRef =
    typeof selectorOrRef === "string" ? ref : selectorOrRef;

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    if (reducedMotion()) {
      el.querySelectorAll("[data-line-inner]").forEach((n) =>
        gsapSetVisible(n)
      );
      return;
    }
    const targets = el.querySelectorAll("[data-line-inner]");
    if (!targets.length) return;
    const anim = revealLines(targets, { trigger: el, ...options });
    return () => {
      anim && anim.scrollTrigger && anim.scrollTrigger.kill();
      anim && anim.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Draw the hairline under section heads as they enter. */
export function useLineDraw(selectorOrRef, options = {}) {
  const ref = useRef(null);
  const triggerRef =
    typeof selectorOrRef === "string" ? ref : selectorOrRef;

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const targets =
      typeof selectorOrRef === "string" ? el.querySelectorAll(selectorOrRef) : el;
    const anim = drawLine(targets, { trigger: el, ...options });
    return () => {
      anim && anim.scrollTrigger && anim.scrollTrigger.kill();
      anim && anim.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Staggered reveal of direct children matching the selector. */
export function useStaggerReveal(selectorOrRef, options = {}) {
  const ref = useRef(null);
  const triggerRef =
    typeof selectorOrRef === "string" ? ref : selectorOrRef;

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const targets =
      typeof selectorOrRef === "string" ? el.querySelectorAll(selectorOrRef) : el;
    const anim = staggerReveal(targets, { trigger: el, ...options });
    return () => {
      anim && anim.scrollTrigger && anim.scrollTrigger.kill();
      anim && anim.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

function gsapSetVisible(node) {
  node.style.opacity = "1";
  node.style.transform = "none";
}
