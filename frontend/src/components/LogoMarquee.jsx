import React from "react";

const LOGOS = [
  { name: "ARC SPACES", tag: "DIGITAL PLATFORM" },
  { name: "MONO LABS", tag: "BRAND EXPERIENCE" },
  { name: "NOVA CAPITAL", tag: "FINTECH & PRODUCT" },
  { name: "CELESTIAL DIGITAL", tag: "STRATEGY & AI" },
  { name: "ASTRRA VENTURES", tag: "CAPITAL & DESIGN" },
  { name: "NEXTFORM STUDIO", tag: "CREATIVE TECH" },
];

export default function LogoMarquee({ title = "RECENT HIRES & PARTNERS FROM" }) {
  // Duplicate list to guarantee infinite smooth loop without gaps
  const doubledLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="logo-marquee-section" aria-label={title}>
      <div className="container">
        <div className="logo-marquee__topline">
          <p className="eyebrow">{title}</p>
          <span className="mono-xs">NETWORK / 2026</span>
        </div>
      </div>

      <div className="logo-marquee__track-wrap">
        <div className="logo-marquee__track">
          {doubledLogos.map((item, index) => (
            <div key={index} className="logo-marquee__item">
              <span className="logo-marquee__dot" aria-hidden="true" />
              <span className="logo-marquee__name">{item.name}</span>
              <span className="logo-marquee__tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
