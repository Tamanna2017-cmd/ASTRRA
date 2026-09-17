import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";

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
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion()) return;

    const stepEls = Array.from(track.querySelectorAll(".process__step"));
    const progress = track.querySelector(".process__progress");
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    /* Rail fills as you scroll through the steps */
    const fill = gsap.fromTo(
      progress,
      isMobile ? { scaleY: 0 } : { scaleX: 0 },
      {
        ...(isMobile ? { scaleY: 1 } : { scaleX: 1 }),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
        },
      }
    );

    /* Each step activates when its marker crosses the middle of the viewport */
    const triggers = stepEls.map((step) =>
      ScrollTrigger.create({
        trigger: step,
        start: "top 62%",
        end: "bottom 40%",
        onToggle: (self) => step.classList.toggle("process__step--active", self.isActive),
      })
    );

    return () => {
      fill.scrollTrigger && fill.scrollTrigger.kill();
      fill.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="process" className="process section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            04 / PROCESS
          </p>
          <span className="section-head__count" data-reveal>
            HOW WE WORK
          </span>
        </header>

        <div className="process__heading-grid">
          <h2>
            <span data-line data-reveal>
              <span data-line-inner>
                From thought
              </span>
            </span>
            <span data-line data-reveal>
              <span data-line-inner>
                to <em>form.</em>
              </span>
            </span>
          </h2>
          <p data-reveal>
            A focused process keeps ambitious ideas clear, collaborative and
            ready for the real world.
          </p>
        </div>

        <div className="process__track" ref={trackRef}>
          <span className="process__rail" aria-hidden="true" />
          <span className="process__progress" aria-hidden="true" />

          <div className="process__steps">
            {steps.map((step, index) => (
              <article
                className={`process__step${index === 0 ? " process__step--active" : ""}`}
                key={step.number}
              >
                <span className="process__marker" aria-hidden="true" />
                <span className="process__index">
                  STEP {index + 1} / {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
