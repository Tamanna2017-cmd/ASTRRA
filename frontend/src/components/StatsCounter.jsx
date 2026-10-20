import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";

const STATS = [
  { prefix: "", target: 50, suffix: "+", label: "Digital Products Built" },
  { prefix: "", target: 10, suffix: "+", label: "Core Disciplines" },
  { prefix: "$", target: 5, suffix: "M+", label: "Client Value Created" },
  { prefix: "", target: 99, suffix: "%", label: "Client Satisfaction Rate" },
];

export default function StatsCounter() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion()) return;

    const statItems = el.querySelectorAll(".stat-item");

    const ctx = gsap.context(() => {
      statItems.forEach((item) => {
        const valEl = item.querySelector(".stat-item__num");
        const target = Number(item.dataset.target) || 0;
        const prefix = item.dataset.prefix || "";
        const suffix = item.dataset.suffix || "";

        const counterObj = { value: 0 };

        gsap.to(counterObj, {
          value: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (valEl) {
              valEl.textContent = `${prefix}${Math.floor(counterObj.value)}${suffix}`;
            }
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section section" ref={containerRef} aria-label="ASTRRA Statistics">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            01.5 / IMPACT IN NUMBERS
          </p>
          <span className="section-head__count" data-reveal>
            RECORD / 2026
          </span>
        </header>

        <div className="stats-grid" data-reveal-stagger>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              data-target={stat.target}
              data-prefix={stat.prefix}
              data-suffix={stat.suffix}
            >
              <div className="stat-item__num">
                {stat.prefix}0{stat.suffix}
              </div>
              <p className="stat-item__label">{stat.label}</p>
              <span className="stat-item__corner" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
