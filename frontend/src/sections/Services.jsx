import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../animations/animationConfig";

const services = [
  {
    number: "01",
    title: "Websites & Digital Experiences",
    items:
      "Business websites • Preschool websites • Restaurant websites • Corporate websites • Landing pages • Portfolio websites • Redesigns • UI/UX • Responsive design",
    tag: "EXPERIENCES",
  },
  {
    number: "02",
    title: "Web Applications & Business Systems",
    items:
      "Custom web apps • Admin panels • Dashboards • CRM • Enquiry management • Appointment systems • Inventory • Order management • Business portals",
    tag: "SYSTEMS",
  },
  {
    number: "03",
    title: "Ecommerce & Digital Commerce",
    items:
      "Ecommerce • Product catalogues • Payments • Cart & checkout • Orders • Inventory • Customer accounts • Shipping • WhatsApp commerce • Ecommerce admin",
    tag: "COMMERCE",
  },
  {
    number: "04",
    title: "AI & Automation",
    items:
      "AI chatbots • AI customer support • Lead automation • WhatsApp automation • Workflow automation • AI search • Recommendations • Custom AI solutions",
    tag: "AUTOMATION",
  },
  {
    number: "05",
    title: "Digital Growth & Optimization",
    items:
      "SEO • Local SEO • Google Business Profile • Analytics • Search Console • Conversion optimization • Performance optimization • Lead generation",
    tag: "GROWTH",
  },
  {
    number: "06",
    title: "Technology & Infrastructure",
    items:
      "Cloud deployment • Hosting • Domains • Databases • APIs • SSL/security • Backups • Monitoring • Migration • Maintenance & technical support",
    tag: "INFRASTRUCTURE",
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
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: eyebrow,
            start: "top 90%",
            once: true,
          },
        }
      );

      /* ---------------------------------------------
         HEADING
      --------------------------------------------- */

      if (heading) {
        const line = heading.querySelector("[data-line]");
        const inner = heading.querySelector("[data-line-inner]");

        if (line && inner) {
          gsap.fromTo(
            inner,
            {
              y: "115%",
            },
            {
              y: "0%",
              duration: 1.15,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

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
      --------------------------------------------- */

      rows.forEach((row, index) => {
        const title = row.querySelector(".service-row__title");
        const number = row.querySelector(".service-row__num");
        const tag = row.querySelector(".service-row__tag");
        const arrow = row.querySelector(".service-row__arrow");

        if (title) {
          gsap.fromTo(
            title,
            {
              x: index % 2 === 0 ? -16 : 16,
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
        }

        if (number) {
          gsap.fromTo(
            number,
            {
              x: -8,
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
        }

        if (tag) {
          gsap.fromTo(
            tag,
            {
              x: 10,
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
        }

        if (arrow) {
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
        }
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
            From modern web experiences to intelligent automated systems, we deliver
            complete end-to-end technology solutions tailored for your business.
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

              <div className="service-row__main">
                <h3 className="service-row__title">
                  {service.title}
                </h3>
                <p className="service-row__items">
                  {service.items}
                </p>
              </div>

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