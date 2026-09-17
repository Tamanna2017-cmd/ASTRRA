import React from "react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <a className="footer__brand" href="#top" aria-label="Back to top">
              ASTRRA <small>TECH</small>
            </a>
            <p className="footer__tagline">Make Your Space Digitally.</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {NAV.map(({ label, href }) => (
              <a className="footer__link" key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© 2026 ASTRRA TECH</p>
          <p>DIGITAL EXPERIENCES / BRAND / TECHNOLOGY</p>
          <a className="footer__link" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}