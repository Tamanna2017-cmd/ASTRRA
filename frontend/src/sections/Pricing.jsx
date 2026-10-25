import React, { useState } from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Layers } from "lucide-react";
import Button from "../components/Button";

const PLANS = [
  {
    id: "essential",
    name: "ESSENTIAL",
    price: "₹9,999",
    period: "one-time investment",
    subtitle: "For businesses getting their professional online presence started.",
    popular: false,
    badge: "FOUNDATIONAL",
    categories: [
      {
        title: "Website",
        items: [
          "Responsive design",
          "Up to 7–8 pages",
          "Custom business layout",
          "Mobile + tablet + desktop optimization",
          "Contact / enquiry form",
          "Google Maps integration",
        ],
      },
      {
        title: "Business",
        items: [
          "Domain",
          "Hosting",
          "SSL Certificate",
          "Business email integration",
          "WhatsApp integration",
          "Social media integration",
        ],
      },
      {
        title: "Launch & Support",
        items: [
          "Basic SEO setup",
          "Speed optimization",
          "Bug fixing",
          "Website deployment",
          "Launch support",
        ],
      },
    ],
  },
  {
    id: "business",
    name: "BUSINESS",
    price: "₹14,999",
    period: "most popular choice",
    subtitle: "For growing businesses that need a more engaging and informative website.",
    popular: true,
    badge: "RECOMMENDED",
    includesAllFrom: "Everything in Essential +",
    categories: [
      {
        title: "Design",
        items: [
          "Up to 10–12 pages",
          "Custom UI/UX",
          "Animated sections",
          "Interactive elements",
          "Image / video galleries",
          "Testimonials section",
          "FAQ section",
        ],
      },
      {
        title: "Business Features",
        items: [
          "Services / product showcase",
          "Enquiry forms",
          "Google Maps",
          "Social media integration",
          "WhatsApp CTA",
          "Basic analytics integration",
        ],
      },
      {
        title: "Growth",
        items: [
          "Basic SEO",
          "Meta titles & descriptions",
          "Search-friendly structure",
          "Performance optimization",
          "3-month content update support",
          "Technical support",
        ],
      },
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "₹19,999",
    period: "full custom suite",
    subtitle: "For businesses that want a highly customized digital experience.",
    popular: false,
    badge: "HIGH CONVICTION",
    includesAllFrom: "Everything in Business +",
    categories: [
      {
        title: "Premium Design",
        items: [
          "Fully custom UI/UX",
          "Advanced animations",
          "Premium interactions",
          "Custom illustrations / visual sections",
          "Advanced responsive experience",
        ],
      },
      {
        title: "Advanced Functionality",
        items: [
          "Custom modules",
          "Advanced enquiry forms",
          "Booking / appointment enquiry",
          "Dynamic sections",
          "Industry-specific functionality",
        ],
      },
      {
        title: "SEO & Performance",
        items: [
          "Advanced SEO setup",
          "Google Search Console setup",
          "Analytics setup",
          "Performance optimization",
          "Image optimization",
          "Technical SEO structure",
        ],
      },
      {
        title: "Support",
        items: [
          "6-month technical support",
          "3-month content update support",
          "Priority bug fixing",
          "Post-launch assistance",
        ],
      },
    ],
  },
];

export default function Pricing() {
  const [activePlan, setActivePlan] = useState("business");

  return (
    <section id="plans" className="pricing-section section" aria-label="Website Plans">
      <div className="container">
        {/* Section Header */}
        <header className="section-head section-head--dark">
          <p className="eyebrow" data-reveal>
            08 / WEBSITE PLANS
          </p>
          <span className="section-head__count" data-reveal>
            TRANSPARENT PRICING
          </span>
        </header>

        <div className="pricing__intro mt-10 mb-14 max-w-[780px]" data-reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#f4f3ef] leading-[1.05]">
            Choose the plan that{" "}
            <em className="italic font-serif text-[#c8a96b]">fits your business.</em>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#96958d] font-normal leading-relaxed max-w-[580px]">
            Engineered digital architecture from day one. Full-stack deployment, custom design,
            domain & hosting, and continuous launch support tailored to your milestone.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing__grid grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isFeatured = plan.popular;
            return (
              <div
                key={plan.id}
                onMouseEnter={() => setActivePlan(plan.id)}
                className={`relative flex flex-col justify-between rounded-2xl transition-all duration-300 p-7 sm:p-9 ${
                  isFeatured
                    ? "bg-[#0e0e0c] border-2 border-[#c8a96b] shadow-[0_0_50px_rgba(200,169,107,0.15)] ring-1 ring-[#c8a96b]/30"
                    : "bg-[#0a0a09]/80 border border-white/10 hover:border-[#c8a96b]/40 hover:bg-[#0d0d0b]"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase ${
                      isFeatured
                        ? "bg-[#c8a96b] text-[#0a0a09] font-semibold"
                        : "bg-white/5 text-[#c8a96b] border border-[#c8a96b]/30"
                    }`}
                  >
                    {isFeatured && <Sparkles className="w-3 h-3" />}
                    {plan.badge}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-[#6d6c65] uppercase">
                    {plan.period}
                  </span>
                </div>

                {/* Plan Title & Price */}
                <div className="border-b border-white/10 pb-6 mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f4f3ef] flex items-center justify-between">
                    <span>{plan.name}</span>
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-light text-[#f4f3ef] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono text-[#96958d] uppercase tracking-wider">
                      / project
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[#b9b8b0] leading-relaxed">
                    {plan.subtitle}
                  </p>

                  {/* Inherit Pill */}
                  {plan.includesAllFrom && (
                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c8a96b]/10 border border-[#c8a96b]/30 text-[#ddc084] text-xs font-medium">
                      <Zap className="w-3.5 h-3.5 text-[#c8a96b]" />
                      <span>{plan.includesAllFrom}</span>
                    </div>
                  )}
                </div>

                {/* Categories & Features */}
                <div className="flex-1 space-y-6 mb-8">
                  {plan.categories.map((category) => (
                    <div key={category.title} className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#c8a96b] font-semibold">
                          {category.title}
                        </span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#b9b8b0] leading-snug group"
                          >
                            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-white/5 text-[#c8a96b] group-hover:bg-[#c8a96b] group-hover:text-[#0a0a09] transition-colors">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <a
                    href="#contact"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-mono tracking-widest uppercase transition-all duration-300 font-semibold ${
                      isFeatured
                        ? "bg-[#c8a96b] text-[#0a0a09] hover:bg-[#ddc084] shadow-lg shadow-[#c8a96b]/20 hover:scale-[1.01]"
                        : "bg-white/5 hover:bg-white/10 text-[#f4f3ef] border border-white/10 hover:border-[#c8a96b]/50"
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0c0c0b] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c8a96b]/10 border border-[#c8a96b]/30 flex items-center justify-center text-[#c8a96b]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-[#f4f3ef]">
                Need custom scope or bespoke enterprise features?
              </h4>
              <p className="text-xs sm:text-sm text-[#96958d] mt-0.5">
                We craft tailored digital suites for complex platforms, web applications, and custom systems.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap px-6 py-3 rounded-lg border border-[#c8a96b] text-[#c8a96b] hover:bg-[#c8a96b] hover:text-[#0a0a09] text-xs font-mono tracking-widest uppercase transition-all font-semibold"
          >
            Request Custom Scope ↗
          </a>
        </div>
      </div>
    </section>
  );
}
