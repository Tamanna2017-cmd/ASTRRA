import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../animations/animationConfig";
import PixelFlowField from "@/components/ui/pixel-flow-field";

/**
 * Fixed interactive background featuring PixelFlowField.
 * Replaces the previous static image and halftone canvas with the generative pixel flow field.
 */
export default function FixedBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || reducedMotion()) return;

    // Subtle smooth parallax on scroll
    const scrollAnimation = gsap.to(bg, {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    return () => {
      if (scrollAnimation) {
        scrollAnimation.scrollTrigger?.kill();
        scrollAnimation.kill();
      }
    };
  }, []);

  return (
    <div className="fixed-background" aria-hidden="true">
      <div ref={bgRef} className="fixed-background__image">
        <PixelFlowField
          className="h-full w-full"
          text="ASTRRA"
          shape="square"
          cellSize={9}
          gap={3}
          speed={0.8}
          colors={[
            "var(--bg-soft, #0c0c0b)",
            "var(--gold, #c8a96b)",
            "var(--gold-bright, #ddc084)",
          ]}
        />
      </div>
      <div className="fixed-background__overlay" />
    </div>
  );
}
