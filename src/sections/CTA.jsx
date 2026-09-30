import React from "react";
import Magnetic from "../components/Magnetic";

/**
 * Dramatic closing statement — the natural climax of the page.
 * Rotating circular "Start a project" button, gold accent headline.
 */
export default function CTA() {
  return (
    <section className="cta section" aria-label="Start a project">
      <span className="cta__ring" aria-hidden="true" />

      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            08 / LET'S WORK TOGETHER
          </p>
          <span className="section-head__count" data-reveal>
            OPEN / 2026
          </span>
        </header>

        <div className="cta__grid">
          <div>
            <h2 className="cta__heading">
              <span data-line data-reveal>
                <span data-line-inner>Let's build</span>
              </span>
              <span data-line data-reveal>
                <span data-line-inner>
                  what's <em>next.</em>
                </span>
              </span>
            </h2>

            <p className="cta__copy" data-reveal>
              Tell us what you're building, what you want to change, or where
              you want to go next — we'll shape the space it lives in.
            </p>
          </div>

          <Magnetic>
            <a href="#contact" className="cta__circle" data-reveal-fade>
              <svg
                className="cta__circle-text"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="ctaCirclePath"
                    d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                  />
                </defs>
                <text>
                  <textPath href="#ctaCirclePath">
                    START A PROJECT — ASTRRA TECH —
                  </textPath>
                </text>
              </svg>
              <span className="cta__circle-core" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only">Start a project</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}