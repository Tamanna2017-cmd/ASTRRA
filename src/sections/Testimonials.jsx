import React, { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote:
      "ASTRRA didn't just redesign our website. They changed how we think about our digital presence.",
    author: "Founder & CEO",
    company: "Arc Spaces Platform",
  },
  {
    quote:
      "The motion language and engineering precision ASTRRA brought to our web app set a brand new benchmark for our industry.",
    author: "Head of Product",
    company: "Mono Labs",
  },
  {
    quote:
      "Working with ASTRRA TECH transformed our digital touchpoints into an intuitive, high-converting digital experience.",
    author: "Managing Partner",
    company: "Nova Capital",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, active]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      className="testimonials section"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        <header className="section-head section-head--dark">
          <p className="eyebrow" data-reveal>
            06 / CLIENT VOICES
          </p>
          <span className="section-head__count" data-reveal>
            TRUST / 0{active + 1} OF 0{TESTIMONIALS.length}
          </span>
        </header>

        <div className="testimonials__carousel">
          {TESTIMONIALS.map((t, index) => (
            <figure
              className={`testimonials__figure ${index === active ? "is-active" : ""}`}
              key={index}
              style={{ display: index === active ? "block" : "none" }}
            >
              <div className="testimonials__topline" data-reveal>
                <span>CLIENT TESTIMONIAL</span>
                <span>0{index + 1} / 0{TESTIMONIALS.length}</span>
              </div>

              <blockquote className="testimonials__quote">
                <span className="testimonials__mark" aria-hidden="true" data-reveal-fade>
                  “
                </span>
                <p className="testimonials__text" data-reveal>
                  {t.quote}
                </p>
              </blockquote>

              <figcaption className="testimonials__author" data-reveal>
                <i aria-hidden="true" />
                <span>
                  {t.author}
                  <br />
                  {t.company}
                </span>
              </figcaption>
            </figure>
          ))}

          <div className="testimonials__controls">
            <button
              onClick={prevSlide}
              className="testimonials__btn"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="testimonials__dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`testimonials__dot ${i === active ? "is-active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="testimonials__btn"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}