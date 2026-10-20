import React from "react";

/**
 * Editorial section header: "02 / SERVICES ————— 06 DISCIPLINES"
 * Renders above the display typography of each section.
 */
export default function SectionHead({ index, label, count, dark = false }) {
  return (
    <header className={`section-head${dark ? " section-head--dark" : ""}`}>
      <p className="eyebrow" data-reveal>
        {index} / {label}
      </p>
      {count && (
        <span className="section-head__count" data-reveal>
          {count}
        </span>
      )}
    </header>
  );
}
