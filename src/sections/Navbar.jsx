import React, { useEffect, useRef, useState } from "react";
import { gsap } from "../animations/animationConfig";
import LiveClocks from "../components/LiveClocks";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

/**
 * Premium fixed navbar: official company logo asset, real-time NYC/LA clocks,
 * glassmorphism compression on scroll, and full-screen mobile menu.
 */
export default function Navbar({ ready = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  /* Scroll state: compress + glass after leaving the top */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  /* Entrance after the preloader finishes */
  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(
      ".navbar",
      { y: -84, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay: 0.15 }
    );
  }, [ready]);

  /* Staggered link entrance each time the mobile menu opens */
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const links = menuRef.current.querySelectorAll(".mobile-menu__link");
    gsap.fromTo(
      links,
      { y: 44, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.25 }
    );
  }, [open]);

  return (
    <>
      <header
        className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
        id="navbar"
      >
        <a href="#top" className="brand" aria-label="ASTRRA TECH home">
          <img
            src="/astrra-logo.png"
            alt="ASTRRA TECH"
            className="brand__logo-img"
          />
        </a>

        <LiveClocks className="navbar__clocks" />

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-cta">
          <span>Start a Project</span>
          <span aria-hidden="true">↗</span>
        </a>

        <button
          className={`menu-toggle${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        ref={menuRef}
        className={`mobile-menu${open ? " mobile-menu--open" : ""}`}
        id="mobile-menu"
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__header">
            <img
              src="/astrra-logo.png"
              alt="ASTRRA TECH"
              className="mobile-menu__logo-img"
            />
            <p className="eyebrow mobile-menu__label">MENU</p>
          </div>

          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="mobile-menu__link"
              onClick={() => setOpen(false)}
            >
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}

          <a
            href="#contact"
            className="mobile-menu__link mobile-menu__cta"
            onClick={() => setOpen(false)}
          >
            Start a Project
            <span aria-hidden="true">↗</span>
          </a>

          <div className="mobile-menu__footer">
            <LiveClocks />
          </div>
        </div>
      </div>
    </>
  );
}

