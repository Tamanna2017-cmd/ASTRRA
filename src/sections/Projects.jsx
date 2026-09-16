import React from "react";

const PROJECTS = [
  {
    id: "01",
    name: "ARC SPACES",
    category: "Digital Platform",
    year: "2026",
    description:
      "A digital platform designed to make complex spaces feel clear, premium and effortless.",
    image: "/images/project-01.jpg",
  },
  {
    id: "02",
    name: "MONO LABS",
    category: "Brand Experience",
    year: "2026",
    description:
      "An expressive brand experience combining sharp identity, interaction and digital storytelling.",
    image: "/images/project-02.jpg",
  },
  {
    id: "03",
    name: "NOVA CAPITAL",
    category: "Product & Web",
    year: "2025",
    description:
      "A refined product and web experience built around clarity, trust and confident digital presence.",
    image: "/images/project-03.jpg",
  },
];

function ProjectVisual({ src, name }) {
  return (
    <div className="project-visual">
      <img
        className="project-visual-img"
        src={src}
        alt={`${name} project`}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.classList.add("project-visual-img--missing");
        }}
      />

      <div className="project-visual-fallback">
        <span className="fallback-line" />
        <span className="fallback-line fallback-line-short" />
        <span className="fallback-corner" />
      </div>

      <span className="project-visual-index">
        PROJECT / {name}
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="work">
      <div className="projects-container">

        <header className="section-head">
          <div className="section-head-top">
            <p className="section-label">04 / SELECTED WORK</p>
            <span className="section-count">03 PROJECTS</span>
          </div>

          <h2 className="section-title">
            Built for
            <br />
            <span>attention.</span>
          </h2>

          <p className="section-intro">
            Digital experiences designed to create presence,
            communicate clearly and leave a lasting impression.
          </p>
        </header>

        <div className="project-grid">
          {PROJECTS.map((project) => (
            <article className="project-card" key={project.id}>

              <ProjectVisual
                src={project.image}
                name={project.name}
              />

              <div className="project-meta">
                <div className="project-title-row">
                  <span className="project-number">
                    {project.id}
                  </span>

                  <h3 className="project-name">
                    {project.name}
                  </h3>
                </div>

                <div className="project-tags">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <p className="project-description">
                {project.description}
              </p>

              <a
                className="project-link"
                href="#contact"
                aria-label={`View ${project.name} project`}
              >
                <span>View project</span>

                <span
                  className="project-link-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>

            </article>
          ))}
        </div>

        <article className="showcase">

          <div className="showcase-header">
            <p className="showcase-label">
              PROJECT SHOWCASE / 01
            </p>

            <span className="showcase-status">
              FEATURED EXPERIENCE
            </span>
          </div>

          <div className="showcase-visual">

            <img
              className="showcase-visual-img"
              src="/images/project-showcase.jpg"
              alt="ARC SPACES featured project"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.classList.add(
                  "showcase-image--missing"
                );
              }}
            />

            <div className="showcase-overlay">

              <div className="showcase-orbit orbit-one" />
              <div className="showcase-orbit orbit-two" />
              <div className="showcase-orbit orbit-three" />

              <span className="showcase-word">
                ARC
              </span>

              <strong>SPACES</strong>

              <small>
                DIGITAL PLATFORM / 01
              </small>

            </div>
          </div>

          <div className="showcase-content">

            <div>
              <p className="showcase-kicker">
                ARC SPACES
              </p>

              <h3 className="showcase-title">
                Spaces that feel
                <br />
                <em>impossible to ignore.</em>
              </h3>
            </div>

            <div className="showcase-details">

              <p className="showcase-description">
                ARC SPACES brings strategy, interface and motion
                together into one focused digital platform.
              </p>

              <a
                className="showcase-cta"
                href="#contact"
              >
                <span>START A PROJECT</span>

                <span
                  className="showcase-cta-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>

            </div>

          </div>

        </article>

      </div>
    </section>
  );
}