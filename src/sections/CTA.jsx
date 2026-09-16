import React from "react";

export default function Contact() {
  return (
    <section
      className="contact"
      id="contact"
    >

      <div className="contact-container">

        <header className="section-head">

          <div className="section-head-top">

            <p className="section-label">
              06 / START A CONVERSATION
            </p>

            <span className="section-count">
              OPEN / 24
            </span>

          </div>

          <p className="contact-small">
            HAVE A PROJECT IN MIND?
          </p>

        </header>

        <div className="contact-main">

          <div className="contact-copy">

            <h2 className="contact-heading">
              Let&apos;s build
              <br />
              what&apos;s next.
            </h2>

            <p className="contact-description">
              Tell us what you&apos;re building,
              what you want to change, or where
              you want to go next.
            </p>

          </div>

          <div className="contact-actions">

            <a
              className="contact-email"
              href="mailto:hello@astrratech.com"
            >
              <span>
                hello@astrratech.com
              </span>

              <span aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact-social"
              href="#"
              aria-label="ASTRRA TECH on LinkedIn"
            >
              <span>LinkedIn</span>

              <span aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact-cta"
              href="mailto:hello@astrratech.com"
              aria-label="Get in touch by email"
            >
              <span>
                GET IN TOUCH
              </span>

              <span
                className="contact-cta-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}