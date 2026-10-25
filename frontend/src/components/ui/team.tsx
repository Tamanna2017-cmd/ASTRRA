import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { getAssetUrl } from "@/lib/utils";

const teamMembers = [
  {
    image: getAssetUrl("/madhav-jaybhaye.jpg"),
    name: "Madhav Jaybhaye",
    role: "CEO",
  },
  {
    image: getAssetUrl("/aniket-musmade.jpg"),
    name: "Aniket Prakash Musmade",
    role: "Full-stack Developer",
  },
  {
    image: getAssetUrl("/tamanna-thakur.jpg"),
    name: "Tamanna Thakur",
    role: "Graphic Designer",
  },
  {
    image: getAssetUrl("/hala-mustafa.jpg"),
    name: "Hala Mustafa",
    role: "Junior Graphic Designer & UI/UX",
  },
  {
    image: getAssetUrl("/yogita-sharma.jpg"),
    name: "Yogita Sharma",
    role: "Junior Graphic Designer",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="team-section relative w-full overflow-hidden bg-[#050505] py-16 md:py-28" aria-label="The ASTRRA Team">
      <div>
        <svg
          className="absolute right-0 bottom-0 text-white/[0.04] pointer-events-none"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Full-bleed header — counter reaches the right corner */}
      <div className="team-head relative z-10 w-full">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            07 / THE ASTRRA TEAM
          </p>
          <span className="section-head__count" data-reveal>
            PEOPLE / {String(teamMembers.length).padStart(2, "0")}
          </span>
        </header>

        <div className="mt-12" data-reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#f4f3ef] leading-[1.05]">
            The people behind<br />
            <span className="italic font-serif text-[#c8a96b]">the digital craft.</span>
          </h2>
        </div>
      </div>

      {/* Full-bleed marquee — cards animate across the entire viewport width */}
      <div className="relative z-10 w-full mt-6">
        <div className="relative">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 md:w-32 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 md:w-32 bg-gradient-to-l from-[#050505] to-transparent" />

          <Marquee className="[--gap:1.5rem] [--duration:32s]" pauseOnHover reverse={true}>
            {teamMembers.map((member) => (
              <div
                className="group/card flex w-64 md:w-72 shrink-0 flex-col"
                key={member.name}
              >
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/[0.08] shadow-lg">
                  <img
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:scale-[1.04]"
                    src={member.image}
                    loading="lazy"
                  />
                  <div className="team-card__overlay absolute inset-x-0 bottom-0">
                    <h3 className="team-card__name">{member.name}</h3>
                    <p className="team-card__role">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
