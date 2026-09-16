import React from "react";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-top">

          <div className="footer-brand-block">

            <a
              className="footer-brand"
              href="#top"
              aria-label="ASTRRA TECH home"
            >
              ASTRRA
              <span>TECH</span>
            </a>

            <p className="footer-tagline">
              MAKE YOUR SPACE DIGITALLY.
            </p>

          </div>

          <nav
            className="footer-nav"
            aria-label="Footer navigation"
          >

            <a
              className="footer-link"
              href="#work"
            >
              Work
            </a>

            <a
              className="footer-link"
              href="#contact"
            >
              Contact
            </a>

            <a
              className="footer-link"
              href="#top"
            >
              Back to top ↑
            </a>

          </nav>

        </div>

        <div className="footer-bottom">

          <p className="footer-copy">
            © 2026 ASTRRA TECH
          </p>

          <p className="footer-note">
            DIGITAL EXPERIENCES / BRAND / TECHNOLOGY
          </p>

        </div>

      </div>

    </footer>
  );
}