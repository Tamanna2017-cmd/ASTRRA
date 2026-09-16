import React from "react";

const TESTIMONIALS = [
  {
    quote:
      "ASTRRA didn't just redesign our website. They changed how we think about our digital presence.",
    author: "Founder",
    company: "Technology Company",
  },
];

export default function Testimonials() {
  return (
    <section
      className="testimonials"
      aria-label="Client testimonials"
    >
      <div className="testimonials-container">

        <header className="section-head">

          <div className="section-head-top">
            <p className="section-label">
              05 / CLIENT VOICES
            </p>

            <span className="section-count">
              TRUST / 01
            </span>
          </div>

        </header>

        {TESTIMONIALS.map((testimonial, index) => (
          <figure
            className="testimonials-figure"
            key={testimonial.author}
          >

            <div className="testimonial-topline">
              <span>CLIENT TESTIMONIAL</span>

              <span>
                0{index + 1} / 01
              </span>
            </div>

            <blockquote className="quote">

              <span
                className="quote-mark"
                aria-hidden="true"
              >
                “
              </span>

              <p className="quote-text">
                {testimonial.quote}
              </p>

            </blockquote>

            <figcaption className="quote-author">

              <span className="quote-line" />

              <span>
                {testimonial.author}
                <br />
                {testimonial.company}
              </span>

            </figcaption>

          </figure>
        ))}

      </div>
    </section>
  );
}