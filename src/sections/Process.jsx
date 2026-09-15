const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand the problem, audience, context and opportunity before defining the direction.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We turn research into a clear digital strategy, structure and roadmap for the experience.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We shape the visual language, interface and interaction system around the people using it.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "We transform the approved experience into responsive, reliable and performance-focused technology.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "We prepare, test and release the experience, then keep improving it as it grows.",
  },
];

const Process = () => {
  return (
    <section id="process" className="astrra-process" data-section="process">
      <div className="astrra-process__container">
        <div className="astrra-process__header" data-animate="heading">
          <div className="astrra-process__eyebrow">
            <span className="astrra-process__eyebrow-line" />
            <span>04 / HOW WE WORK</span>
          </div>

          <div className="astrra-process__heading-grid">
            <h2>
              From thought
              <br />
              to <em>form.</em>
            </h2>
            <p>
              A focused process keeps ambitious ideas clear, collaborative and
              ready for the real world.
            </p>
          </div>
        </div>

        <div className="astrra-process__track">
          <div className="astrra-process__track-line" />

          {steps.map((step, index) => (
            <article
              className="astrra-process__step"
              key={step.number}
              data-animate="process-step"
            >
              <div className="astrra-process__marker">
                <span>{step.number}</span>
              </div>

              <div className="astrra-process__step-content">
                <span className="astrra-process__step-index">
                  STEP {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
