import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";

/**
 * Global smooth-scroll layer.
 * Lenis drives the scroll position while GSAP/ScrollTrigger stays synchronized.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (reducedMotion()) return;

    const lenis = new Lenis({
      duration: 0.75,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(1000, 16);

    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');

      if (!link) return;

      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      e.preventDefault();

      lenis.scrollTo(target, {
        offset: -70,
        duration: 0.75,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}