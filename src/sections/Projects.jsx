import React from "react";
import { ExpandingCards } from "@/components/ui/expanding-cards";
import { Monitor, Cpu, Code2, Sparkles, Headphones, Layers } from "lucide-react";

const PROJECTS = [
  {
    id: "arc-spaces",
    title: "ARC SPACES — Spatial Architecture & Digital Atmosphere.",
    description:
      "A digital platform designed to make complex spaces feel clear, premium and effortless with real-time interactive spatial tours.",
    action: "View project",
    href: "#contact",
    imgSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    icon: <Monitor size={24} />,
    linkHref: "#",
  },
  {
    id: "mono-labs",
    title: "MONO LABS — Monolithic Identity & Interaction Engine.",
    description:
      "An expressive brand experience combining sharp identity, micro-interactions and cinematic digital storytelling.",
    action: "View project",
    href: "#contact",
    imgSrc:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    icon: <Cpu size={24} />,
    linkHref: "#",
  },
  {
    id: "nova-capital",
    title: "NOVA CAPITAL — Institutional Intelligence & Private Wealth.",
    description:
      "A refined product and web experience built around clarity, trust and confident digital presence.",
    action: "View project",
    href: "#contact",
    imgSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    icon: <Code2 size={24} />,
    linkHref: "#",
  },
  {
    id: "kinetic-ai",
    title: "KINETIC AI — Adaptive Real-Time Visual Synthesis.",
    description:
      "Dynamic agentic interfaces that respond synchronously to human intention with tactile motion physics and zero latency.",
    action: "View project",
    href: "#contact",
    imgSrc:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    icon: <Sparkles size={24} />,
    linkHref: "#",
  },
  {
    id: "aether-audio",
    title: "AETHER AUDIO — Acoustic Precision & Minimal Hardware.",
    description:
      "An immersive digital showroom celebrating spatial acoustics, precision manufacturing and sensory depth.",
    action: "View project",
    href: "#contact",
    imgSrc:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80",
    icon: <Headphones size={24} />,
    linkHref: "#",
  },
  {
    id: "strata-studios",
    title: "STRATA STUDIOS — Next-Gen WebGL Spatial Environments.",
    description:
      "Real-time 3D spatial showroom bringing architectural tactile materials, atmospheric sunlight and spatial fidelity into the browser.",
    action: "View project",
    href: "#contact",
    imgSrc:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    icon: <Layers size={24} />,
    linkHref: "#",
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
            06 PROJECTS
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