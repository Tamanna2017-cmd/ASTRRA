import React from "react";
import { ExpandingCards } from "@/components/ui/expanding-cards";
import { MousePointerClick, GraduationCap, Smile, Coffee } from "lucide-react";

const PROJECTS = [
  {
    id: "cafe",
    title: "CAFÉ — Modern Café Experience",
    description:
      "A welcoming digital experience designed for a modern café, showcasing its atmosphere, offerings, and brand identity through an elegant and engaging website.",
    action: "View project",
    href: "#contact",
    imgSrc: "/cafe-1.png",
    images: [
      "/cafe-1.png",
      "/cafe-2.png",
      "/cafe-3.png",
      "/cafe-4.png",
      "/cafe-5.png",
    ],
    liveUrl: "https://magenta-crisp-430131.netlify.app/",
    icon: <Coffee size={24} />,
    linkHref: "https://magenta-crisp-430131.netlify.app/",
  },
  {
    id: "wiggle",
    title: "WIGGLE — Interactive Digital Experience",
    description:
      "A playful digital experience designed to bring creativity and interaction together through an engaging, visually dynamic web interface.",
    action: "View project",
    href: "#contact",
    imgSrc: "/boing 1.png",
    images: [
      "/boing 1.png",
      "/boing 2.png",
      "/boing 3.png",
      "/boing 4.png",
      "/boing 5.png",
    ],
    liveUrl: "https://wiggle-tau.vercel.app/",
    icon: <MousePointerClick size={24} />,
    linkHref: "https://wiggle-tau.vercel.app/",
  },
  {
    id: "repo-kids",
    title: "Repo kids — School Management Experience",
    description:
      "A modern digital experience designed to make school-related information and interactions more accessible through a clean, engaging, and user-friendly interface.",
    action: "View project",
    href: "#contact",
    imgSrc: "/school 1.jpeg",
    images: [
      "/school 1.jpeg",
      "/school 2.jpeg",
      "/school 3.jpeg",
      "/school 4.jpeg",
      "/school 5.jpeg",
    ],
    liveUrl: "https://bespoke-cascaron-7b45a4.netlify.app",
    icon: <GraduationCap size={24} />,
    linkHref: "https://bespoke-cascaron-7b45a4.netlify.app",
  },
  {
    id: "kiddo",
    title: "KIDDO — Interactive Learning Experience",
    description:
      "A fun, engaging digital experience designed to make learning more interactive and enjoyable for children through a colorful, accessible, and user-friendly interface.",
    action: "View project",
    href: "#contact",
    imgSrc: "/kiddo 1.png",
    images: [
      "/kiddo 1.png",
      "/kiddo 2.png",
      "/kiddo 3.png",
      "/kiddo 4.png",
      "/kiddo 5.png",
    ],
    liveUrl: "https://exquisite-croissant-a50bba.netlify.app",
    icon: <Smile size={24} />,
    linkHref: "https://exquisite-croissant-a50bba.netlify.app",
  },
];

export default function Projects() {
  return (
    <section id="work" className="projects section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            05 / SELECTED WORK
          </p>
          <span className="section-head__count" data-reveal>
            {String(PROJECTS.length).padStart(2, "0")} PROJECTS
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

        <div className="projects__carousel-area" data-reveal>
          <ExpandingCards items={PROJECTS} defaultActiveIndex={0} />
        </div>
      </div>
    </section>
  );
}