import React, { useEffect, useRef, useState } from "react";
import { createPreloader } from "../animations/preloaderAnimation";
import { reducedMotion } from "../animations/animationConfig";

/**
 * Cinematic Studio Intro Preloader:
 * Features ONLY the centered transparent white ASTRRA TECH logo asset.
 * Smooth entrance (opacity 0->1, scale 0.92->1, y 20->0), hold,
 * exit (scale 1->1.04, opacity 1->0), and curtain reveal into the hero.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const brandRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add("is-loading");

    const finish = () => {
      document.body.classList.remove("is-loading");
      onDone && onDone();
      if (reducedMotion()) {
        setHidden(true);
      } else {
        window.setTimeout(() => setHidden(true), 900);
      }
    };

    if (reducedMotion()) {
      finish();
      return;
    }

    const tl = createPreloader({
      root: rootRef.current,
      brand: brandRef.current,
      onComplete: finish,
    });

    return () => {
      tl && tl.kill();
      document.body.classList.remove("is-loading");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div ref={brandRef} className="preloader__brand-wrap">
        <img
          src="/astrra-logo.png"
          alt="ASTRRA TECH"
          className="preloader__logo-img"
        />
      </div>
    </div>
  );
}


