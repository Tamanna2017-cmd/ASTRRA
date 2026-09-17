import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";
import HalftoneCanvas from "./HalftoneCanvas";

export default function FixedBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;

    if (!bg || reducedMotion()) return;

    // Slow continuous cinematic scroll & mouse parallax
    const scrollAnimation = gsap.to(bg, {
      y: 100,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    let mouseX = 0;
    let mouseY = 0;

    const move = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(bg, {
        x: mouseX * -15,
        y: mouseY * -10,
        duration: 1.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isDesktop) {
      window.addEventListener("mousemove", move, { passive: true });
    }

    return () => {
      if (scrollAnimation) {
        scrollAnimation.scrollTrigger?.kill();
        scrollAnimation.kill();
      }
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="fixed-background" aria-hidden="true">
      <div ref={bgRef} className="fixed-background__image">
        <img
          src="/astrra-hero-bg.jpg"
          alt=""
          className="fixed-background__bg-img"
        />
        <HalftoneCanvas />
      </div>
      <div className="fixed-background__overlay" />
    </div>
  );
}
