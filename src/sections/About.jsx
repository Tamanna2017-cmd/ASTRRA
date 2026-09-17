const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <header className="section-head section-head--dark">
          <p className="eyebrow" data-reveal>
            01 / ABOUT ASTRRA
          </p>
          <span className="section-head__count" data-reveal>
            DIGITAL STUDIO
          </span>
        </header>

        <div className="about__grid">
          <h2 className="about__heading">
            <span data-line data-reveal>
              <span data-line-inner>We shape ideas</span>
            </span>
            <span data-line data-reveal>
              <span data-line-inner>
                into <em>experiences.</em>
              </span>
            </span>
          </h2>

          <div className="about__copy" data-reveal>
            <p className="lead">
              ASTRRA TECH creates purposeful digital experiences where
              strategy, design and technology meet.
            </p>
            <p>
              We build websites, products and applications that feel
              distinctive, work intuitively and perform in the real world.
            </p>

            <div className="about__facts">
              <div className="about__fact">
                <span>01</span>
                <p>Strategy-led</p>
              </div>
              <div className="about__fact">
                <span>02</span>
                <p>Design-focused</p>
              </div>
              <div className="about__fact">
                <span>03</span>
                <p>Technology-driven</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about__statement" data-reveal-stagger>
          <span>IDEA</span>
          <i aria-hidden="true" />
          <strong>IMPACT</strong>
          <i aria-hidden="true" />
          <span>EVOLUTION</span>
        </div>
      </div>
    </section>
  );
};

export default About;
