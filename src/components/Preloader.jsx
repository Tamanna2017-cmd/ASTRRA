import React, { useEffect, useRef, useState } from "react";
import { createPreloader } from "../animations/preloaderAnimation";
import { reducedMotion } from "../animations/animationConfig";

/**
 * Premium brand preloader: features official company logo asset,
 * subtle scale/fade reveal, thin counter to 100, and curtain lift exit.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const brandRef = useRef(null);
  const counterRef = useRef(null);
  const subtitleRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add("is-loading");

    const finish = () => {
      document.body.classList.remove("is-loading");
      onDone && onDone();
      if (reducedMotion()) {
        setHidden(true);
      } else {
        window.setTimeout(() => setHidden(true), 1000);
      }
    };

    if (reducedMotion()) {
      finish();
      return;
    }

    const tl = createPreloader({
      root: rootRef.current,
      brand: brandRef.current,
      subtitle: subtitleRef.current,
      counterEl: counterRef.current,
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
        <span ref={subtitleRef} className="preloader__tagline">
          MAKE YOUR SPACE DIGITALLY
        </span>
      </div>
      <div ref={counterRef} className="preloader__counter">
        000
      </div>
      <span className="preloader__line" />
    </div>
  );
}

