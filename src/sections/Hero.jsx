import React, { useEffect, useRef } from "react";
import { heroIntro, heroScrollAlignment, prehideHero } from "../animations/heroAnimations";
import Logo3D from "../components/Logo3D";
import Magnetic from "../components/Magnetic";

/**
 * Three Independent Hero Layers Architecture:
 * 1. Background Layer: Provided exclusively by <FixedBackground /> (separate full-screen layer behind everything).
 * 2. Left Foreground Element: 3D White AstraTech Logo with complete unclipped circular ring.
 * 3. Right Foreground Element: Black Information Box (contains title, headline, copy & CTAs).
 * 
 * Flow:
 * - Post-Intro: Both 3D Logo (UP) and Black Box (SLIGHTLY LOWER) are 100% visible immediately (no initial scroll needed).
 * - Scroll Interaction: Black Box moves UP until aligning with 3D Logo at y: 0.
 * - Continued Scroll: Logo + Black Box scroll down TOGETHER as one aligned hero composition into next sections.
 */
export default function Hero({ start = true }) {
  const heroRef = useRef(null);
  const played = useRef(false);

  /* Pre-hide hero elements immediately on mount */
  useEffect(() => {
    prehideHero(heroRef.current);
  }, []);

  /* Trigger intro reveal once preloader curtain lifts */
  useEffect(() => {
    if (!start || played.current) return;
    played.current = true;

    const introTl = heroIntro(heroRef.current);
    const scrollTl = heroScrollAlignment(heroRef.current);

    return () => {
      introTl && introTl.kill();
      scrollTl && scrollTl.scrollTrigger && scrollTl.scrollTrigger.kill();
      scrollTl && scrollTl.kill();
    };
  }, [start]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Top Meta Line */}
      <div className="hero__topline" data-hero-meta>
        <span>ASTRRA TECH / DIGITAL STUDIO</span>
        <span className="hero__status">
          <i aria-hidden="true" /> BUILDING DIGITAL SPACES
        </span>
      </div>

      {/* Main Viewport Content Grid */}
      <div className="hero__container">
        {/* Left Side: 3D AstraTech Logo Component (Positioned HIGHER, Unclipped Circular Ring) */}
        <div className="hero__logo-zone" data-hero-3d-logo>
          <Logo3D />
        </div>

        {/* Right Side: Black Information Box (Positioned SLIGHTLY LOWER Initially) */}
        <div className="hero__black-box" data-hero-black-box>
          <div className="hero__black-box-inner">
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
      </div>

      {/* Bottom Metadata */}
      <div className="hero__index" data-hero-meta>
        <span>SCROLL TO EXPLORE</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </div>

      <div className="hero__corner" data-hero-meta>A / T — EST. 2026</div>
    </section>
  );
}
