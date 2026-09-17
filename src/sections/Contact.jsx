import React from "react";
import Button from "../components/Button";

/**
 * Contact — only the information the project provides:
 * email + LinkedIn. Clean rows, subtle hover states.
 */
export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            08 / CONTACT
          </p>
          <span className="section-head__count" data-reveal>
            START A CONVERSATION
          </span>
        </header>

        <div className="contact__grid">
          <div>
            <h2 className="contact__heading">
              <span data-line data-reveal>
                <span data-line-inner>Make your</span>
              </span>
              <span data-line data-reveal>
                <span data-line-inner>
                  space <em>digitally.</em>
                </span>
              </span>
            </h2>

            <p className="contact__desc" data-reveal>
              Have a project in mind? Write to us — we read everything and
              reply with intent.
            </p>
          </div>

          <div className="contact__rows" data-reveal-stagger>
            <a className="contact__row" href="mailto:hello@astrratech.com">
              <span>hello@astrratech.com</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              className="contact__row"
              href="#"
              aria-label="ASTRRA TECH on LinkedIn"
            >
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>

            <Button href="mailto:hello@astrratech.com" variant="gold" className="contact__cta">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
