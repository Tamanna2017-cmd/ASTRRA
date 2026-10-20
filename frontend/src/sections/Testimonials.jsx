import React from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const TESTIMONIALS = [
  {
    text: "ASTRRA didn't just redesign our digital platform. They fundamentally reshaped how our users explore and experience spatial architecture.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Briana Patton",
    role: "Operations Director, Arc Spaces",
  },
  {
    text: "The motion language and engineering precision ASTRRA brought to our web app set a brand new benchmark across our entire industry.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Bilal Ahmed",
    role: "Head of Product, Mono Labs",
  },
  {
    text: "Working with ASTRRA was effortless. They handled complex WebGL shaders and real-time state with zero perceptible lag.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Saman Malik",
    role: "VP of Engineering, Kinetic AI",
  },
  {
    text: "ASTRRA TECH transformed our digital touchpoints into an intuitive, high-conviction digital experience that drove an immediate 40% jump in inquiries.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Omar Raza",
    role: "Managing Partner, Nova Capital",
  },
  {
    text: "Every micro-interaction feels deliberate. They possess an obsessive eye for detail and typographic discipline that is virtually impossible to find elsewhere.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Zainab Hussain",
    role: "Creative Director, Strata Studios",
  },
  {
    text: "The spatial fluidity and tactile animations exceeded all expectations. Our clients consistently comment on how premium our new platform feels.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Aliza Khan",
    role: "Principal Architect, Studio Form",
  },
  {
    text: "Their understanding of audio-visual harmony and modern web standards created a launch experience that trended across design communities for weeks.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Farhan Siddiqui",
    role: "Head of Growth, Aether Audio",
  },
  {
    text: "ASTRRA understands that motion is not decoration — it is communication. Our conversion rates and session duration doubled after the launch.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Sana Sheikh",
    role: "Brand Strategist, Horizon Media",
  },
  {
    text: "From initial architectural wireframes to final production bundle, ASTRRA proved that speed, aesthetic excellence, and scalable engineering can coexist.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80",
    name: "Hassan Ali",
    role: "Founder, Apex Systems",
  },
];

const firstColumn = TESTIMONIALS.slice(0, 3);
const secondColumn = TESTIMONIALS.slice(3, 6);
const thirdColumn = TESTIMONIALS.slice(6, 9);

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section" aria-label="Client testimonials">
      <div className="container">
        <header className="section-head section-head--dark">
          <p className="eyebrow" data-reveal>
            06 / CLIENT VOICES
          </p>
          <span className="section-head__count" data-reveal>
            HIGH CONVICTION
          </span>
        </header>

        <div className="testimonials__intro max-w-[680px] mt-12 mb-10" data-reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0a0a09] leading-[1.05]">
            Built with trust.<br />
            <span className="italic font-serif text-[#8a6f3c]">Proven in production.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6d6c65] font-normal leading-relaxed max-w-[540px]">
            What founders, product leaders and design directors say about partnering with ASTRRA TECH.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 testimonials__columns-mask max-h-[700px] overflow-hidden"
          data-reveal
        >
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
        </div>
      </div>
    </section>
  );
}