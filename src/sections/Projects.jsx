import React from "react";
import LazyImage from "../components/LazyImage";

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
    <div className="project__visual" data-image-reveal>
      <LazyImage src={src} alt={`${name} project`} />
      <span className="project__index">PROJECT / {name}</span>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="projects section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            05 / SELECTED WORK
          </p>
          <span className="section-head__count" data-reveal>
            03 PROJECTS
          </span>
        </header>

        <div className="projects__intro">
          <h2>
            <span data-line data-reveal>
              <span data-line-inner>Built for</span>
            </span>
            <span data-line data-reveal>
              <span data-line-inner>
                <em>attention.</em>
              </span>
            </span>
          </h2>
          <p data-reveal>
            Digital experiences designed to create presence, communicate
            clearly and leave a lasting impression.
          </p>
        </div>

        <div className="projects__grid projects__grid--offset">
          {PROJECTS.map((project) => (
            <article className="project" key={project.id}>
              <ProjectVisual src={project.image} name={project.name} />

              <div className="project__meta">
                <h3 className="project__name">
                  <span className="project__num">{project.id}</span> {project.name}
                </h3>
                <span className="project__year">{project.year}</span>
              </div>

              <div className="project__tags">
                <span>{project.category}</span>
                <span aria-hidden="true">↗</span>
              </div>

              <p className="project__desc">{project.description}</p>

              <a className="project__link" href="#contact">
                <span>View project</span>
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}