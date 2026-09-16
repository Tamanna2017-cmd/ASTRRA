import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="hala-contact">
      <div className="hala-contact-top">
        <span>06 / START A CONVERSATION</span>

        <div className="hala-contact-links">
          <a href="mailto:hello@astrratech.com">
            hello@astrratech.com ↗
          </a>
          <a href="#" aria-label="ASTRRA TECH LinkedIn">
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="hala-contact-body">
        <div>
          <p>HAVE A PROJECT IN MIND?</p>
          <h2>
            Let&apos;s build
            <br />
            what&apos;s next.
          </h2>
        </div>

        <a
          className="hala-contact-email"
          href="mailto:hello@astrratech.com"
        >
          GET IN TOUCH ↗
        </a>
      </div>
    </section>
  );
}
