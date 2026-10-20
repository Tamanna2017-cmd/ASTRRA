import React from "react";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import Magnetic from "../components/Magnetic";

const TAGS = [
  "Ecommerce",
  "CRM",
  "Admin Panels",
  "Booking Systems",
  "Inventory",
  "AI",
  "Automation",
  "Custom Web Applications",
];

export default function CustomSolutions() {
  return (
    <section
      id="custom-solutions"
      className="custom-solutions section relative overflow-hidden"
      aria-label="Custom Website Solutions"
    >
      <div className="container">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#11110f] via-[#0b0b0a] to-[#070707] border border-[#c8a96b]/25 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 bg-[#c8a96b]/10 rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-14">
            {/* Left Content */}
            <div className="max-w-[680px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8a96b]/10 border border-[#c8a96b]/30 text-[#ddc084] text-xs font-mono tracking-widest uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#c8a96b]" />
                <span>BUILT AROUND YOUR BUSINESS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#f4f3ef] tracking-tight leading-[1.1]">
                Don't see exactly{" "}
                <em className="italic font-serif text-[#c8a96b]">what you need?</em>
              </h2>

              <div className="mt-5 space-y-2 text-sm sm:text-base text-[#b9b8b0] leading-relaxed">
                <p className="text-[#f4f3ef] font-medium">
                  Every business works differently.
                </p>
                <p className="text-[#96958d]">
                  We can design and build a digital solution around your specific requirements.
                </p>
              </div>

              {/* Tags Cloud */}
              <div className="mt-8 flex flex-wrap gap-2.5 items-center">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#c8a96b]/15 border border-white/10 hover:border-[#c8a96b]/40 text-xs sm:text-[13px] font-mono text-[#ddc084] transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex-shrink-0 lg:self-center">
              <Magnetic>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#c8a96b] text-[#0a0a09] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#ddc084] hover:scale-[1.03] shadow-[0_10px_35px_rgba(200,169,107,0.25)]"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
