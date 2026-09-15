const About = () => {
  return (
    <section id="about" className="astrra-about" data-section="about">
      <div className="astrra-about__container">
        <div className="astrra-about__eyebrow" data-animate="label">
          <span className="astrra-about__eyebrow-line" />
          <span>01 / ABOUT ASTRRA</span>
        </div>

        <div className="astrra-about__grid">
          <div className="astrra-about__heading" data-animate="heading">
            <span className="astrra-about__kicker">DIGITAL STUDIO</span>
            <h2>
              We shape
              <br />
              ideas into
              <br />
              <em>experiences.</em>
            </h2>
          </div>

          <div className="astrra-about__copy" data-animate="content">
            <p className="astrra-about__lead">
              ASTRRA TECH creates purposeful digital experiences where
              strategy, design and technology meet.
            </p>

            <p>
              We build websites, digital products and applications that are
              made to feel distinctive, work intuitively and perform in the
              real world.
            </p>

            <div className="astrra-about__facts">
              <div>
                <span>01</span>
                <p>Strategy-led</p>
              </div>
              <div>
                <span>02</span>
                <p>Design-focused</p>
              </div>
              <div>
                <span>03</span>
                <p>Technology-driven</p>
              </div>
            </div>
          </div>
        </div>

        <div className="astrra-about__statement" data-animate="statement">
          <span>IDEA</span>
          <i />
          <strong>IMPACT</strong>
          <i />
          <span>EVOLUTION</span>
        </div>
      </div>
    </section>
  );
};

export default About;
