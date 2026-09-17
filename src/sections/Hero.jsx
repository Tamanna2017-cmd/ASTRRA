import React, { useEffect, useRef, useState } from "react";
import {
  heroIntro,
  heroPinnedScroll,
  prehideHero,
} from "../animations/heroAnimations";
import Logo3DCanvas from "../components/Logo3DCanvas";
import Magnetic from "../components/Magnetic";

/**
 * Redesigned Interactive Split Hero Composition:
 * - Left: Interactive 3D AstraTech Logo Canvas (Three.js WebGL model with continuous rotation & mouse parallax)
 * - Right: Premium Black Information Card with company copy & CTAs
 * - Scroll Interaction: Pinned layout where the black card slides vertically into alignment with the 3D logo as user scrolls.
 * - Zero blank gap top layout under navbar.
 */
export default function Hero({ start = true }) {
  const heroRef = useRef(null);
  const played = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Pre-hide hero elements on mount before preloader curtain lifts */
  useEffect(() => {
    prehideHero(heroRef.current);
  }, []);

  /* Trigger intro and pinned scroll when preloader finishes */
  useEffect(() => {
    if (!start || played.current) return;
    played.current = true;

    const introTl = heroIntro(heroRef.current);
    const scrollTl = heroPinnedScroll(heroRef.current, (progress) => {
      setScrollProgress(progress);
    });

    return () => {
      introTl && introTl.kill();
      scrollTl && scrollTl.scrollTrigger && scrollTl.scrollTrigger.kill();
      scrollTl && scrollTl.kill();
    };
  }, [start]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      {/* Pinned Scroll Container */}
      <div className="hero__pinned-wrapper" data-hero-pinned>
        {/* Futuristic Background Network Glow Layer */}
        <div className="hero__bg" aria-hidden="true" data-hero-bg>
          <img src="/astrra-hero-bg.jpg" alt="" className="hero__bg-img" />
          <div className="hero__bg-overlay" />
        </div>

        {/* Topline Metadata */}
        <div className="hero__topline" data-hero-meta>
          <span>ASTRRA TECH / DIGITAL STUDIO</span>
          <span className="hero__status">
            <i aria-hidden="true" /> BUILDING DIGITAL SPACES
          </span>
        </div>

        {/* Main 2-Column Interactive Split Composition */}
        <div className="hero__split-grid">
          {/* Left Column: 3D Interactive Logo Canvas */}
          <div className="hero__left-col" data-hero-3d>
            <Logo3DCanvas scrollProgress={scrollProgress} />
          </div>

          {/* Right Column: Premium Dark Information Card */}
          <div className="hero__right-col">
            <div className="hero__info-card" data-hero-card>
              <div className="hero__card-header">
                <span className="eyebrow hero__eyebrow">
                  DIGITAL TECHNOLOGY STUDIO
                </span>
                <span className="hero__badge">EST. 2026</span>
              </div>

              <h1 className="hero__card-title">
                Make your space <em>digitally.</em>
              </h1>

              <p className="hero__card-copy">
                We transform ideas, businesses and traditional spaces into refined
                digital experiences built to move forward.
              </p>

              <div className="hero__card-actions">
                <Magnetic>
                  <a href="#contact" className="btn btn--gold">
                    <span>Start Your Project</span>
                    <span className="btn__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </Magnetic>
                <a href="#services" className="text-link">
                  Explore Services <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="hero__card-footer">
                <span>CREATIVE TECHNOLOGY</span>
                <span>A / T — STUDIO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="hero__index" data-hero-meta>
          <span>SCROLL TO ALIGN &amp; EXPLORE</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
