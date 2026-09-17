import React, { useEffect, useRef, useState } from "react";
import { createPreloader } from "../animations/preloaderAnimation";
import { reducedMotion } from "../animations/animationConfig";

/**
 * Premium brand preloader intro: features ONLY the centered transparent white
 * ASTRRA TECH logo asset. Executes entrance, cinematic hold, and curtain exit.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const brandRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.classList.add("is-loading");

    const handleRevealStart = () => {
      document.body.classList.remove("is-loading");
      onDone && onDone();
    };

    const finish = () => {
      setHidden(true);
    };

    if (reducedMotion()) {
      handleRevealStart();
      finish();
      return;
    }

    const tl = createPreloader({
      root: rootRef.current,
      brand: brandRef.current,
      onRevealStart: handleRevealStart,
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


