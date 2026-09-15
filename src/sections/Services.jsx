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
  return (
    <section id="services" className="astrra-services" data-section="services">
      <div className="astrra-services__container">
        <div className="astrra-services__header" data-animate="heading">
          <div className="astrra-services__eyebrow">
            <span className="astrra-services__eyebrow-line" />
            <span>02 / SERVICES</span>
          </div>

          <div className="astrra-services__heading-grid">
            <h2>
              What we
              <br />
              <em>create.</em>
            </h2>
            <p>
              From first concept to final product, we bring together the
              disciplines needed to make digital work feel exceptional.
            </p>
          </div>
        </div>

        <div className="astrra-services__grid">
          {services.map((service) => (
            <article
              className="astrra-services__card"
              key={service.number}
              data-animate="service-card"
            >
              <div className="astrra-services__card-top">
                <span>{service.number}</span>
                <span>{service.tag}</span>
              </div>

              <div className="astrra-services__card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <div className="astrra-services__card-bottom">
                <span className="astrra-services__card-line" />
                <span className="astrra-services__card-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
