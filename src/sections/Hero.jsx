import React, { useEffect, useRef } from "react";
import { heroIntro, heroScrollDrift, prehideHero } from "../animations/heroAnimations";
import Magnetic from "../components/Magnetic";

/**
 * Single Unified Hero Composition:
 * 1. Top: Eyebrow label + MAKE YOUR SPACE DIGITALLY headline
 * 2. Center: ASTRRA TECH white transparent logo asset
 * 3. Bottom: Supporting paragraph copy + Start Project CTA
 * 4. Background: Web-development futuristic network image
 * All elements belong to one hero experience and scroll upward together.
 */
export default function Hero({ start = true }) {
  const heroRef = useRef(null);
  const played = useRef(false);

  /* Hide hero elements immediately on mount (preloader still covers the page) */
  useEffect(() => {
    prehideHero(heroRef.current);
  }, []);

  useEffect(() => {
    if (!start || played.current) return;
    played.current = true;

    const tl = heroIntro(heroRef.current);
    const drift = heroScrollDrift(heroRef.current);

    return () => {
      tl && tl.kill();
      drift && drift.scrollTrigger && drift.scrollTrigger.kill();
      drift && drift.kill();
    };
  }, [start]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Embedded Hero Background Image Layer */}
      <div className="hero__bg" aria-hidden="true" data-hero-bg>
        <img
          src="/astrra-hero-bg.jpg"
          alt=""
          className="hero__bg-img"
        />
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__topline" data-hero-meta>
        <span>ASTRRA TECH / DIGITAL STUDIO</span>
        <span className="hero__status">
          <i aria-hidden="true" /> BUILDING DIGITAL SPACES
        </span>
      </div>

      <div className="hero__content" data-hero-content>
        <p className="eyebrow hero__eyebrow" data-hero-label>
          DIGITAL TECHNOLOGY STUDIO
        </p>

        <h1 className="hero__title">
          <span className="hero__mask" data-hero-line>
            <span>MAKE YOUR</span>
          </span>
          <span className="hero__mask" data-hero-line>
            <span>
              SPACE <em>DIGITALLY.</em>
            </span>
          </span>
        </h1>

        <div className="hero__center-logo" data-hero-logo>
          <img
            src="/astrra-logo.png"
            alt="ASTRRA TECH Logo"
            className="hero__center-logo-img"
          />
        </div>

        <div className="hero__bottom">
          <p className="hero__copy" data-hero-copy>
            We transform ideas, businesses and traditional spaces into refined
            digital experiences built to move forward.
          </p>

          <div className="hero__actions">
            <span data-hero-cta>
              <Magnetic>
                <a href="#contact" className="btn btn--gold">
                  <span>Start Your Project</span>
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </Magnetic>
            </span>
            <a href="#services" className="text-link" data-hero-cta>
              Explore Services <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__index" data-hero-meta>
        <span>SCROLL TO EXPLORE</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </div>

      <div className="hero__corner" data-hero-meta>A / T — EST. 2026</div>
    </section>
  );
}
