import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";

const services = [
  {
    number: "01",
    title: "Website Development",
    description:
      "High-performance websites engineered around your identity, audience and business goals.",
    tag: "BUILD",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Clear interfaces and intuitive journeys that make every interaction feel considered.",
    tag: "EXPERIENCE",
  },
  {
    number: "03",
    title: "Web Applications",
    description:
      "Scalable web applications that turn workflows, ideas and products into useful digital tools.",
    tag: "PRODUCT",
  },
  {
    number: "04",
    title: "Mobile Applications",
    description:
      "Purposeful mobile experiences designed for everyday use across modern devices.",
    tag: "MOBILE",
  },
  {
    number: "05",
    title: "Maintenance & Support",
    description:
      "Continuous technical care, improvements and support to keep your digital presence moving.",
    tag: "CARE",
  },
  {
    number: "06",
    title: "SEO & Digital Growth",
    description:
      "Performance and discoverability strategies that help digital products reach the right people.",
    tag: "GROWTH",
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion()) return;

    const rows = section.querySelectorAll(".service-row");
    const heading = section.querySelector(".services__heading-grid h2");
    const description = section.querySelector(".services__heading-grid p");
    const eyebrow = section.querySelector(".section-head .eyebrow");
    const count = section.querySelector(".section-head__count");

    const ctx = gsap.context(() => {
      /* ---------------------------------------------
         HEADER
      --------------------------------------------- */

      gsap.fromTo(
        [eyebrow, count],
        {
          autoAlpha: 0,
          y: 20,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        }
      );

      /* ---------------------------------------------
         MAIN HEADING
      --------------------------------------------- */

      gsap.fromTo(
        heading,
        {
          autoAlpha: 0,
          y: 80,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 84%",
            once: true,
          },
        }
      );

      /* ---------------------------------------------
         HEADING PARAGRAPH
      --------------------------------------------- */

      gsap.fromTo(
        description,
        {
          autoAlpha: 0,
          y: 45,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: description,
            start: "top 86%",
            once: true,
          },
        }
      );

      /* ---------------------------------------------
         SERVICE ROWS
         Each row enters sequentially.
      --------------------------------------------- */

      gsap.fromTo(
        rows,
        {
          autoAlpha: 0,
          y: 55,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rows[0],
            start: "top 88%",
            once: true,
          },
        }
      );

      /* ---------------------------------------------
         ROW SCROLL DRIFT
         Subtle movement while scrolling.
      --------------------------------------------- */

      rows.forEach((row, index) => {
        const title = row.querySelector(".service-row__title");
        const number = row.querySelector(".service-row__num");
        const tag = row.querySelector(".service-row__tag");
        const arrow = row.querySelector(".service-row__arrow");

        gsap.fromTo(
          title,
          {
            x: index % 2 === 0 ? -18 : 18,
          },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          number,
          {
            x: -10,
          },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          tag,
          {
            x: 12,
          },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );

        /* ---------------------------------------------
           ARROW SCROLL ROTATION / DRIFT
        --------------------------------------------- */

        gsap.fromTo(
          arrow,
          {
            rotation: -12,
          },
          {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="services section"
      ref={sectionRef}
    >
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">
            02 / SERVICES
          </p>

          <span className="section-head__count">
            06 DISCIPLINES
          </span>
        </header>

        <div className="services__heading-grid">
          <h2>
            <span data-line>
              <span data-line-inner>
                What we <em>create.</em>
              </span>
            </span>
          </h2>

          <p>
            From first concept to final product, we bring together the
            disciplines needed to make digital work feel exceptional.
          </p>
        </div>

        <div className="services__list">
          {services.map((service) => (
            <a
              className="service-row"
              key={service.number}
              href="#contact"
              aria-label={`${service.title} — start a conversation`}
            >
              <span className="service-row__num">
                {service.number}
              </span>

              <h3 className="service-row__title">
                {service.title}
              </h3>

              <span className="service-row__desc">
                {service.description}
              </span>

              <span className="service-row__tag">
                {service.tag}
              </span>

              <span
                className="service-row__arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;